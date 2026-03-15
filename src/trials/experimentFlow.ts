import surveyPlugin from "@jspsych/plugin-survey";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import type { JsPsych } from "jspsych";
import { instructionTexts } from "./instructionTexts";
import { demographicPages, languageBackgroundPages } from "./questionnaires";
import { practiceStimuli, stimuli } from "../stimuli/stimuli";
import { studyConfig } from "../experiment/config";

type LanguageCode = "de" | "tr";
type ParticipantGroup = "monolingual" | "late_bilingual" | "ineligible";
type TaskVersion = "coupled" | "mixed" | "monolingual" | null;
type InstructionMode = "de" | "tr" | "both";

type StudyItem = {
  word: string;
  language: LanguageCode;
  itemStatus: "TBR" | "TBF";
};

type TestItem = {
  word: string;
  language: LanguageCode;
  target: "old" | "new";
  itemStatus: "TBR" | "TBF" | null;
};

type TestModeSelection = {
  trials: Set<string>;
  group: ParticipantGroup;
  nativeLanguage: LanguageCode;
};

type ParticipantState = {
  participantId: string;
  group: ParticipantGroup;
  nativeLanguage: LanguageCode | null;
  taskVersion: TaskVersion;
  tbrLanguage: LanguageCode | null;
  tbfLanguage: LanguageCode | null;
  eligible: boolean;
  studyItems: StudyItem[];
  practiceItems: StudyItem[];
  testItems: TestItem[];
  testModeSelection: TestModeSelection | null;
};

const keyMap = { old: "f", new: "j" };
const timings = {
  fixationMs: 500,
  wordMs: 4000,
  cueMs: 1000,
  isiMs: 500,
  distractorMs: 60000,
};

const cueHtml = {
  TBR: '<div class="cue cue-remember">&#10003;</div>',
  TBF: '<div class="cue cue-forget">&#10007;</div>',
};

const surveyDefaults = {
  showQuestionNumbers: false,
};

const createParticipantState = (): ParticipantState => ({
  participantId: "",
  group: "ineligible",
  nativeLanguage: null,
  taskVersion: null,
  tbrLanguage: null,
  tbfLanguage: null,
  eligible: false,
  studyItems: [],
  practiceItems: [],
  testItems: [],
  testModeSelection: null,
});

const makeParticipantId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `p_${Math.random().toString(36).slice(2, 10)}`;
};

const getButtonLabels = (mode: InstructionMode) => {
  if (mode === "de") {
    return { next: "Weiter", prev: "Zurück", complete: "Weiter" };
  }
  if (mode === "tr") {
    return { next: "Devam", prev: "Geri", complete: "Devam" };
  }
  return {
    next: "Weiter / Devam",
    prev: "Zurück / Geri",
    complete: "Weiter / Devam",
  };
};

const wrapInstructions = (html: string) =>
  `<div class="instructions">${html}</div>`;

const bilingualBlock = (label: string, html: string) => `
  <div class="language-block">
    <h3>${label}</h3>
    ${html}
  </div>
`;

const getInstructionHtml = (key: string, mode: InstructionMode) => {
  if (mode === "both") {
    return wrapInstructions(
      `${bilingualBlock("Deutsch", instructionTexts[`${key}_de`])}
       ${bilingualBlock("Turkce", instructionTexts[`${key}_tr`])}`,
    );
  }
  const text =
    mode === "de"
      ? instructionTexts[`${key}_de`]
      : instructionTexts[`${key}_tr`];
  return wrapInstructions(text);
};

const buildInstructionSurvey = (html: string, mode: InstructionMode) => {
  const buttons = getButtonLabels(mode);
  return {
    ...surveyDefaults,
    pageNextText: buttons.next,
    pagePrevText: buttons.prev,
    completeText: buttons.complete,
    pages: [
      {
        name: "instructions",
        elements: [
          {
            type: "html",
            name: "instruction_text",
            html,
          },
        ],
      },
    ],
  };
};

const makeInstructionTrial = (
  key: string,
  modeGetter: () => InstructionMode,
  block: string,
) => ({
  type: surveyPlugin,
  data: { block },
  survey_json: {},
  on_start: (trial: any) => {
    const mode = modeGetter();
    trial.survey_json = buildInstructionSurvey(
      getInstructionHtml(key, mode),
      mode,
    );
  },
});

const stripRequired = (pages: any[]) =>
  pages.map((page: any) => ({
    ...page,
    elements: page.elements?.map((el: any) => ({
      ...el,
      isRequired: false,
    })),
  }));

const makeBackgroundSurvey = (jsPsych: JsPsych, state: ParticipantState) => {
  const isTest = studyConfig.testMode;
  const pages = isTest
    ? stripRequired([...demographicPages, ...languageBackgroundPages])
    : [...demographicPages, ...languageBackgroundPages];

  return {
    type: surveyPlugin,
    data: { block: "background" },
    survey_json: {
      ...surveyDefaults,
      pageNextText: "Weiter / Devam",
      pagePrevText: "Zurück / Geri",
      completeText: "Weiter / Devam",
      pages,
    },
    on_finish: (data: any) => {
      const response = data?.response ?? {};
      // In test mode the group was already set by the selector
      if (!state.testModeSelection) {
        assignParticipant(jsPsych, state, response);
      }
    },
  };
};

const assignParticipant = (
  jsPsych: JsPsych,
  state: ParticipantState,
  response: Record<string, any>,
) => {
  const native = response.native_language as LanguageCode | "other" | undefined;
  const spokenRaw = response.languages_spoken;
  const spoken: string[] = Array.isArray(spokenRaw) ? spokenRaw : [];
  const speaksDe = spoken.includes("de");
  const speaksTr = spoken.includes("tr");
  const ageAcqDe = Number(response.age_acquisition_de);
  const ageAcqTr = Number(response.age_acquisition_tr);

  const nativeOk = native === "de" || native === "tr";

  let group: ParticipantGroup = "ineligible";
  if (nativeOk && speaksDe && speaksTr) {
    // Speaks both: check if L2 was acquired after age 7
    const l2Age = native === "de" ? ageAcqTr : ageAcqDe;
    if (l2Age > 7) {
      group = "late_bilingual";
    }
  } else if (
    nativeOk &&
    ((native === "de" && speaksDe && !speaksTr) ||
      (native === "tr" && speaksTr && !speaksDe))
  ) {
    group = "monolingual";
  }

  state.group = group;
  state.nativeLanguage = nativeOk ? native : null;
  state.eligible = group !== "ineligible";
  state.participantId = state.participantId || makeParticipantId();

  if (group === "late_bilingual") {
    const version = jsPsych.randomization.sampleWithoutReplacement(
      ["coupled", "mixed"],
      1,
    )[0] as TaskVersion;
    state.taskVersion = version;
    if (version === "coupled") {
      const tbr = jsPsych.randomization.sampleWithoutReplacement(
        ["de", "tr"],
        1,
      )[0] as LanguageCode;
      state.tbrLanguage = tbr;
      state.tbfLanguage = tbr === "de" ? "tr" : "de";
    } else {
      state.tbrLanguage = null;
      state.tbfLanguage = null;
    }
  } else if (group === "monolingual") {
    state.taskVersion = "monolingual";
  }

  jsPsych.data.addProperties({
    participant_id: state.participantId,
    group: state.group,
    task_version: state.taskVersion ?? "unknown",
    native_language: state.nativeLanguage ?? "unknown",
    tbr_language: state.tbrLanguage ?? "none",
    tbf_language: state.tbfLanguage ?? "none",
  });
};

const getInstructionModeForGeneral = (state: ParticipantState) => {
  if (state.group === "late_bilingual") {
    return "both" as InstructionMode;
  }
  return state.nativeLanguage ?? "de";
};

const getInstructionModeForRecognition = (state: ParticipantState) => {
  if (state.group === "late_bilingual") {
    if (state.taskVersion === "coupled" && state.tbrLanguage) {
      return state.tbrLanguage;
    }
    return "both";
  }
  return state.nativeLanguage ?? "de";
};

const buildPracticeItems = (jsPsych: JsPsych, state: ParticipantState) => {
  if (state.group === "late_bilingual") {
    if (
      state.taskVersion === "coupled" &&
      state.tbrLanguage &&
      state.tbfLanguage
    ) {
      const tbr = jsPsych.randomization.sampleWithoutReplacement(
        practiceStimuli[state.tbrLanguage],
        4,
      );
      const tbf = jsPsych.randomization.sampleWithoutReplacement(
        practiceStimuli[state.tbfLanguage],
        4,
      );
      return jsPsych.randomization.shuffle([
        ...tbr.map((word) => ({
          word,
          language: state.tbrLanguage as LanguageCode,
          itemStatus: "TBR" as const,
        })),
        ...tbf.map((word) => ({
          word,
          language: state.tbfLanguage as LanguageCode,
          itemStatus: "TBF" as const,
        })),
      ]);
    }

    const deWords = jsPsych.randomization.sampleWithoutReplacement(
      practiceStimuli.de,
      4,
    );
    const trWords = jsPsych.randomization.sampleWithoutReplacement(
      practiceStimuli.tr,
      4,
    );
    const deStatuses = jsPsych.randomization.shuffle([
      "TBR",
      "TBR",
      "TBF",
      "TBF",
    ]) as Array<StudyItem["itemStatus"]>;
    const trStatuses = jsPsych.randomization.shuffle([
      "TBR",
      "TBR",
      "TBF",
      "TBF",
    ]) as Array<StudyItem["itemStatus"]>;
    return jsPsych.randomization.shuffle([
      ...deWords.map((word, i) => ({
        word,
        language: "de" as const,
        itemStatus: deStatuses[i],
      })),
      ...trWords.map((word, i) => ({
        word,
        language: "tr" as const,
        itemStatus: trStatuses[i],
      })),
    ]);
  }

  const language = state.nativeLanguage ?? "de";
  const words = jsPsych.randomization.sampleWithoutReplacement(
    practiceStimuli[language],
    8,
  );
  const statuses = jsPsych.randomization.shuffle([
    "TBR",
    "TBR",
    "TBR",
    "TBR",
    "TBF",
    "TBF",
    "TBF",
    "TBF",
  ]) as Array<StudyItem["itemStatus"]>;
  return words.map((word, index) => ({
    word,
    language,
    itemStatus: statuses[index],
  }));
};

const buildStudyItems = (jsPsych: JsPsych, state: ParticipantState) => {
  if (state.group === "late_bilingual") {
    if (
      state.taskVersion === "coupled" &&
      state.tbrLanguage &&
      state.tbfLanguage
    ) {
      const tbrWords = jsPsych.randomization.sampleWithoutReplacement(
        stimuli[state.tbrLanguage].study,
        40,
      );
      const tbfWords = jsPsych.randomization.sampleWithoutReplacement(
        stimuli[state.tbfLanguage].study,
        40,
      );
      return jsPsych.randomization.shuffle([
        ...tbrWords.map((word) => ({
          word,
          language: state.tbrLanguage as LanguageCode,
          itemStatus: "TBR" as const,
        })),
        ...tbfWords.map((word) => ({
          word,
          language: state.tbfLanguage as LanguageCode,
          itemStatus: "TBF" as const,
        })),
      ]);
    }

    const deWords = jsPsych.randomization.sampleWithoutReplacement(
      stimuli.de.study,
      40,
    );
    const trWords = jsPsych.randomization.sampleWithoutReplacement(
      stimuli.tr.study,
      40,
    );
    const deStatuses = jsPsych.randomization.shuffle([
      ...Array(20).fill("TBR"),
      ...Array(20).fill("TBF"),
    ]) as Array<StudyItem["itemStatus"]>;
    const trStatuses = jsPsych.randomization.shuffle([
      ...Array(20).fill("TBR"),
      ...Array(20).fill("TBF"),
    ]) as Array<StudyItem["itemStatus"]>;
    return jsPsych.randomization.shuffle([
      ...deWords.map((word, index) => ({
        word,
        language: "de" as const,
        itemStatus: deStatuses[index],
      })),
      ...trWords.map((word, index) => ({
        word,
        language: "tr" as const,
        itemStatus: trStatuses[index],
      })),
    ]);
  }

  const language = state.nativeLanguage ?? "de";
  const words = jsPsych.randomization.sampleWithoutReplacement(
    stimuli[language].study,
    80,
  );
  const statuses = jsPsych.randomization.shuffle([
    ...Array(40).fill("TBR"),
    ...Array(40).fill("TBF"),
  ]) as Array<StudyItem["itemStatus"]>;
  return words.map((word, index) => ({
    word,
    language,
    itemStatus: statuses[index],
  }));
};

const buildTestItems = (jsPsych: JsPsych, state: ParticipantState) => {
  const oldItems: TestItem[] = state.studyItems.map((item) => ({
    word: item.word,
    language: item.language,
    target: "old",
    itemStatus: item.itemStatus,
  }));

  if (state.group === "late_bilingual") {
    const newDe = jsPsych.randomization.sampleWithoutReplacement(
      stimuli.de.new,
      40,
    );
    const newTr = jsPsych.randomization.sampleWithoutReplacement(
      stimuli.tr.new,
      40,
    );
    const newItems: TestItem[] = [
      ...newDe.map((word) => ({
        word,
        language: "de" as const,
        target: "new" as const,
        itemStatus: null,
      })),
      ...newTr.map((word) => ({
        word,
        language: "tr" as const,
        target: "new" as const,
        itemStatus: null,
      })),
    ];
    return jsPsych.randomization.shuffle([...oldItems, ...newItems]);
  }

  const language = state.nativeLanguage ?? "de";
  const newWords = jsPsych.randomization.sampleWithoutReplacement(
    stimuli[language].new,
    80,
  );
  const newItems: TestItem[] = newWords.map((word) => ({
    word,
    language,
    target: "new",
    itemStatus: null,
  }));
  return jsPsych.randomization.shuffle([...oldItems, ...newItems]);
};

const buildStudyBlock = (
  jsPsych: JsPsych,
  state: ParticipantState,
  phase: string,
) => {
  const fixation = {
    type: htmlKeyboardResponse,
    stimulus: '<div class="fixation">+</div>',
    choices: "NO_KEYS",
    trial_duration: timings.fixationMs,
    data: { phase, event: "fixation" },
  };

  const word = {
    type: htmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable("word"),
    choices: "NO_KEYS",
    trial_duration: timings.wordMs,
    data: {
      phase,
      event: "word",
      word: jsPsych.timelineVariable("wordText"),
      language: jsPsych.timelineVariable("language"),
      item_status: jsPsych.timelineVariable("itemStatus"),
    },
  };

  const cue = {
    type: htmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable("cue"),
    choices: "NO_KEYS",
    trial_duration: timings.cueMs,
    data: {
      phase,
      event: "cue",
      word: jsPsych.timelineVariable("wordText"),
      language: jsPsych.timelineVariable("language"),
      item_status: jsPsych.timelineVariable("itemStatus"),
    },
  };

  const isi = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: timings.isiMs,
    data: { phase, event: "isi" },
  };

  const block: any = {
    timeline: [fixation, word, cue, isi],
    randomize_order: true,
    get timeline_variables() {
      const items =
        phase === "practice" ? state.practiceItems : state.studyItems;
      return items.map((item) => ({
        word: `<div class="word">${item.word}</div>`,
        wordText: item.word,
        language: item.language,
        itemStatus: item.itemStatus,
        cue: cueHtml[item.itemStatus],
      }));
    },
  };

  return block;
};

const buildDistractor = (state: ParticipantState) => {
  const durationMs = timings.distractorMs;

  return {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS" as const,
    trial_duration: durationMs,
    data: { block: "distractor" },
    on_load: () => {
      const content = document.getElementById(
        "jspsych-html-keyboard-response-stimulus",
      );
      if (!content) return;

      const preamble = getInstructionHtml(
        "distractor",
        getInstructionModeForGeneral(state),
      );
      const states: string[] = [];
      const totalSec = Math.round(durationMs / 1000);

      content.innerHTML = `
        <div class="distractor-wrap">
          <div class="preamble">${preamble}</div>
          <div class="timer" id="distractor-timer">${totalSec}s</div>
          <input class="distractor-input" id="distractor-input" type="text"
                 autocomplete="off" autofocus />
          <div class="state-list" id="state-list"></div>
        </div>
      `;

      const input = document.getElementById(
        "distractor-input",
      ) as HTMLInputElement;
      const listEl = document.getElementById("state-list")!;
      const timerEl = document.getElementById("distractor-timer")!;

      input.focus();

      const startTime = Date.now();
      const timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, Math.ceil((durationMs - elapsed) / 1000));
        timerEl.textContent = `${remaining}s`;
        if (remaining <= 0) clearInterval(timerInterval);
      }, 250);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const val = input.value.trim();
          if (val.length > 0) {
            states.push(val);
            input.value = "";
            const chip = document.createElement("span");
            chip.className = "state-chip";
            chip.textContent = val;
            listEl.appendChild(chip);
          }
        }
      });
    },
  };
};

const buildRecognitionBlock = (jsPsych: JsPsych, state: ParticipantState) => {
  const responsePrompt = () => {
    const mode = getInstructionModeForRecognition(state);
    if (mode === "de") {
      return '<div class="prompt">Alt: F &nbsp;&nbsp; Neu: J</div>';
    }
    if (mode === "tr") {
      return '<div class="prompt">Eski: F &nbsp;&nbsp; Yeni: J</div>';
    }
    return '<div class="prompt">Alt/Eski: F &nbsp;&nbsp; Neu/Yeni: J</div>';
  };

  const trial: any = {
    type: htmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable("word"),
    choices: [keyMap.old, keyMap.new],
    prompt: responsePrompt,
    data: {
      phase: "recognition",
      word: jsPsych.timelineVariable("wordText"),
      language: jsPsych.timelineVariable("language"),
      target: jsPsych.timelineVariable("target"),
      item_status: jsPsych.timelineVariable("itemStatus"),
    },
    on_finish: (data: any) => {
      const isOld = data.target === "old";
      data.correct =
        (isOld && data.response === keyMap.old) ||
        (!isOld && data.response === keyMap.new);
    },
  };

  const block: any = {
    timeline: [trial],
    randomize_order: true,
    get timeline_variables() {
      return state.testItems.map((item) => ({
        word: `<div class="word">${item.word}</div>`,
        wordText: item.word,
        language: item.language,
        target: item.target,
        itemStatus: item.itemStatus,
      }));
    },
  };

  return block;
};

const TRIAL_BLOCKS = [
  { id: "welcome", label: "Informed Consent" },
  { id: "background", label: "Fragebögen" },
  { id: "practice", label: "Übungsdurchgang" },
  { id: "study", label: "Lerndurchgang" },
  { id: "distractor", label: "Distractor" },
  { id: "recognition", label: "Recognition" },
  { id: "end", label: "Debrief" },
] as const;

const buildTestModeSelector = (jsPsych: JsPsych, state: ParticipantState) => ({
  type: htmlKeyboardResponse,
  stimulus: "",
  choices: "NO_KEYS" as const,
  data: { block: "test_mode_selector" },
  on_load: () => {
    const content = document.getElementById(
      "jspsych-html-keyboard-response-stimulus",
    );
    if (!content) return;

    const checkboxes = TRIAL_BLOCKS.map(
      (b) =>
        `<label><input type="checkbox" name="trial" value="${b.id}" checked /> ${b.label}</label>`,
    ).join("");

    content.innerHTML = `
      <div class="test-panel">
        <h2>TESTMODUS</h2>
        <fieldset>
          <legend>Trials auswählen</legend>
          ${checkboxes}
        </fieldset>
        <fieldset>
          <legend>Gruppe</legend>
          <select id="tm-group">
            <option value="monolingual">Monolingual</option>
            <option value="late_bilingual">Late Bilingual</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Muttersprache</legend>
          <select id="tm-native">
            <option value="de">Deutsch</option>
            <option value="tr">Türkisch</option>
          </select>
        </fieldset>
        <button class="start-btn" id="tm-start">Starten</button>
      </div>
    `;

    document.getElementById("tm-start")!.addEventListener("click", () => {
      const checked = Array.from(
        content.querySelectorAll<HTMLInputElement>(
          'input[name="trial"]:checked',
        ),
      ).map((el) => el.value);
      const group = (document.getElementById("tm-group") as HTMLSelectElement)
        .value as ParticipantGroup;
      const native = (document.getElementById("tm-native") as HTMLSelectElement)
        .value as LanguageCode;

      state.testModeSelection = {
        trials: new Set(checked),
        group,
        nativeLanguage: native,
      };

      // Pre-apply group so timeline conditionals work
      state.group = group;
      state.nativeLanguage = native;
      state.eligible = true;
      state.participantId = makeParticipantId();

      if (group === "late_bilingual") {
        const version = jsPsych.randomization.sampleWithoutReplacement(
          ["coupled", "mixed"],
          1,
        )[0] as TaskVersion;
        state.taskVersion = version;
        if (version === "coupled") {
          const tbr = jsPsych.randomization.sampleWithoutReplacement(
            ["de", "tr"],
            1,
          )[0] as LanguageCode;
          state.tbrLanguage = tbr;
          state.tbfLanguage = tbr === "de" ? "tr" : "de";
        }
      } else {
        state.taskVersion = "monolingual";
      }

      jsPsych.finishTrial();
    });
  },
});

const tmWants = (state: ParticipantState, id: string) =>
  !state.testModeSelection || state.testModeSelection.trials.has(id);

export const buildExperimentTimeline = (jsPsych: JsPsych) => {
  const state = createParticipantState();
  const isTest = studyConfig.testMode;

  const timeline: any[] = [];

  // ---- Test-Mode selector (only when testMode is on) ----
  if (isTest) {
    timeline.push(buildTestModeSelector(jsPsych, state));
  }

  // ---- Welcome / Consent ----
  timeline.push({
    timeline: [
      makeInstructionTrial("welcome", () => "both", "welcome"),
      makeInstructionTrial("consent", () => "both", "consent"),
    ],
    conditional_function: () => tmWants(state, "welcome"),
  });

  // ---- Background survey ----
  timeline.push({
    timeline: [makeBackgroundSurvey(jsPsych, state)],
    conditional_function: () => tmWants(state, "background"),
  });

  // ---- Abort if ineligible  ----
  const makeAbortTrial = () => ({
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: "NO_KEYS",
    trial_duration: 0,
    data: { block: "ineligible" },
    on_start: () => {
      jsPsych.abortExperiment(getInstructionHtml("ineligible", "both"), {
        block: "ineligible",
      });
    },
  });

  timeline.push({
    timeline: [makeAbortTrial()],
    conditional_function: () => !isTest && state.group === "ineligible",
  });

  // ---- Main experiment (only if eligible OR test mode) ----
  const mainConditional = () => (isTest ? true : state.group !== "ineligible");

  // Practice block
  timeline.push({
    timeline: [
      makeInstructionTrial(
        "general",
        () => getInstructionModeForGeneral(state),
        "general",
      ),
      makeInstructionTrial(
        "practice",
        () => getInstructionModeForGeneral(state),
        "practice",
      ),
      {
        type: htmlKeyboardResponse,
        stimulus: "",
        choices: "NO_KEYS",
        trial_duration: 0,
        on_start: () => {
          state.practiceItems = buildPracticeItems(jsPsych, state);
        },
      },
      buildStudyBlock(jsPsych, state, "practice"),
    ],
    conditional_function: () => mainConditional() && tmWants(state, "practice"),
  });

  // Study block
  timeline.push({
    timeline: [
      makeInstructionTrial(
        "start_main",
        () => getInstructionModeForGeneral(state),
        "start_main",
      ),
      {
        type: htmlKeyboardResponse,
        stimulus: "",
        choices: "NO_KEYS",
        trial_duration: 0,
        on_start: () => {
          state.studyItems = buildStudyItems(jsPsych, state);
          state.testItems = buildTestItems(jsPsych, state);
        },
      },
      buildStudyBlock(jsPsych, state, "study"),
    ],
    conditional_function: () => mainConditional() && tmWants(state, "study"),
  });

  // Distractor
  timeline.push({
    timeline: [buildDistractor(state)],
    conditional_function: () =>
      mainConditional() && tmWants(state, "distractor"),
  });

  // Recognition
  timeline.push({
    timeline: [
      makeInstructionTrial(
        "recognition",
        () => getInstructionModeForRecognition(state),
        "recognition",
      ),
      // Ensure test items exist even if study block was skipped
      {
        type: htmlKeyboardResponse,
        stimulus: "",
        choices: "NO_KEYS",
        trial_duration: 0,
        on_start: () => {
          if (state.testItems.length === 0) {
            state.studyItems = buildStudyItems(jsPsych, state);
            state.testItems = buildTestItems(jsPsych, state);
          }
        },
      },
      buildRecognitionBlock(jsPsych, state),
    ],
    conditional_function: () =>
      mainConditional() && tmWants(state, "recognition"),
  });

  // End screen
  timeline.push({
    timeline: [
      makeInstructionTrial(
        "end",
        () => getInstructionModeForGeneral(state),
        "end",
      ),
    ],
    conditional_function: () => mainConditional() && tmWants(state, "end"),
  });

  if (studyConfig.debug) {
    console.debug("[jsPsych] Participant state (debug)", state);
  }

  return timeline;
};
