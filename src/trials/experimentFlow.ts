import surveyPlugin from "@jspsych/plugin-survey";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import surveyTextPlugin from "@jspsych/plugin-survey-text";
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
});

const makeParticipantId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `p_${Math.random().toString(36).slice(2, 10)}`;
};

const getButtonLabels = (mode: InstructionMode) => {
  if (mode === "de") {
    return { next: "Weiter", prev: "Zurueck" };
  }
  if (mode === "tr") {
    return { next: "Devam", prev: "Geri" };
  }
  return { next: "Weiter / Devam", prev: "Zurueck / Geri" };
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

const makeBackgroundSurvey = (jsPsych: JsPsych, state: ParticipantState) => ({
  type: surveyPlugin,
  data: { block: "background" },
  survey_json: {
    ...surveyDefaults,
    pageNextText: "Weiter / Devam",
    pagePrevText: "Zurueck / Geri",
    pages: [...demographicPages, ...languageBackgroundPages],
  },
  on_finish: (data: any) => {
    const response = data?.response ?? {};
    assignParticipant(jsPsych, state, response);
  },
});

const assignParticipant = (
  jsPsych: JsPsych,
  state: ParticipantState,
  response: Record<string, string | number>,
) => {
  const native = response.native_language as LanguageCode | "other" | undefined;
  const second = response.second_language as
    | LanguageCode
    | "none"
    | "other"
    | undefined;
  const ageL2 = Number(response.age_l2);
  const usesBoth = response.use_both_languages === "yes";

  const nativeOk = native === "de" || native === "tr";
  const secondOk = second === "de" || second === "tr";

  let group: ParticipantGroup = "ineligible";
  if (nativeOk && (!second || second === "none")) {
    group = "monolingual";
  } else if (
    nativeOk &&
    secondOk &&
    native !== second &&
    ageL2 > 7 &&
    usesBoth
  ) {
    group = "late_bilingual";
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
        2,
      );
      const tbf = jsPsych.randomization.sampleWithoutReplacement(
        practiceStimuli[state.tbfLanguage],
        2,
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
      2,
    );
    const trWords = jsPsych.randomization.sampleWithoutReplacement(
      practiceStimuli.tr,
      2,
    );
    return jsPsych.randomization.shuffle([
      {
        word: deWords[0],
        language: "de" as const,
        itemStatus: "TBR" as const,
      },
      {
        word: deWords[1],
        language: "de" as const,
        itemStatus: "TBF" as const,
      },
      {
        word: trWords[0],
        language: "tr" as const,
        itemStatus: "TBR" as const,
      },
      {
        word: trWords[1],
        language: "tr" as const,
        itemStatus: "TBF" as const,
      },
    ]);
  }

  const language = state.nativeLanguage ?? "de";
  const words = jsPsych.randomization.sampleWithoutReplacement(
    practiceStimuli[language],
    4,
  );
  const statuses = jsPsych.randomization.shuffle([
    "TBR",
    "TBR",
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

const buildDistractor = (state: ParticipantState) => ({
  type: surveyTextPlugin,
  data: { block: "distractor" },
  preamble: getInstructionHtml(
    "distractor",
    getInstructionModeForGeneral(state),
  ),
  questions: [
    {
      prompt: "",
      name: "us_states",
      rows: 6,
      columns: 40,
      required: false,
    },
  ],
  trial_duration: timings.distractorMs,
});

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

export const buildExperimentTimeline = (jsPsych: JsPsych) => {
  const state = createParticipantState();

  const timeline: any[] = [];
  timeline.push(makeInstructionTrial("welcome", () => "both", "welcome"));
  timeline.push(makeInstructionTrial("consent", () => "both", "consent"));
  timeline.push(makeBackgroundSurvey(jsPsych, state));

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
    conditional_function: () => state.group === "ineligible",
  });

  timeline.push({
    timeline: [
      makeInstructionTrial(
        "general",
        () => getInstructionModeForGeneral(state),
        "general",
      ),
      makeInstructionTrial(
        "learning",
        () => getInstructionModeForGeneral(state),
        "learning",
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
      buildDistractor(state),
      makeInstructionTrial(
        "recognition",
        () => getInstructionModeForRecognition(state),
        "recognition",
      ),
      buildRecognitionBlock(jsPsych, state),
      makeInstructionTrial(
        "end",
        () => getInstructionModeForGeneral(state),
        "end",
      ),
    ],
    conditional_function: () => state.group !== "ineligible",
  });

  if (studyConfig.debug) {
    console.debug("[jsPsych] Participant state (debug)", state);
  }

  return timeline;
};
