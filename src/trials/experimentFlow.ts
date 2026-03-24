import surveyPlugin from "@jspsych/plugin-survey";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import type { JsPsych } from "jspsych";
import { instructionTexts } from "./instructionTexts";
import { demographicPages, languageBackgroundPages } from "./questionnaires";
import { practiceStimuli, stimuli } from "../stimuli/stimuli";
import { studyConfig } from "../experiment/config";

type LanguageCode = "de" | "tr";
type ParticipantGroup = "monolingual" | "late_bilingual" | "ineligible";
type ParticipantGroupLabel =
  | "monoling_DE"
  | "monoling_TR"
  | "biling_Mixed"
  | "biling_Same"
  | "ineligible";
type TaskVersion = "coupled" | "mixed" | "monolingual" | null;
type InstructionMode = "de" | "tr" | "both";
type DebugPart =
  | "welcome"
  | "background"
  | "practice"
  | "practice_recognition"
  | "main_learning"
  | "distractor"
  | "recognition"
  | "end";

type StudyItem = {
  word: string;
  language: LanguageCode;
  itemStatus: "TBR" | "TBF";
};

type TestItem = {
  word: string;
  language: LanguageCode;
  target: "old" | "new";
  itemStatus: "TBR" | "TBF" | "neu";
  serialPosition: number;
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
  practiceTestItems: TestItem[];
  testItems: TestItem[];
<<<<<<< Updated upstream
  testModeSelection: TestModeSelection | null;
=======
  debugManualMode: boolean;
  debugParts: DebugPart[];
>>>>>>> Stashed changes
};

const debugPartValues: DebugPart[] = [
  "welcome",
  "background",
  "practice",
  "practice_recognition",
  "main_learning",
  "distractor",
  "recognition",
  "end",
];

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
  practiceTestItems: [],
  testItems: [],
<<<<<<< Updated upstream
  testModeSelection: null,
=======
  debugManualMode: false,
  debugParts: [],
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const getRecognitionResponseLabels = (mode: InstructionMode) => {
  if (mode === "de") {
    return { old: "Alt", new: "Neu" };
  }
  if (mode === "tr") {
    return { old: "Eski", new: "Yeni" };
  }
  return { old: "Alt/Eski", new: "Neu/Yeni" };
};

const getRecognitionPromptHtml = (mode: InstructionMode) => {
  const labels = getRecognitionResponseLabels(mode);
  return `
    <div class="recognition-response-panel">
      <div class="recognition-response-buttons">
        <button
          type="button"
          class="recognition-response-button"
          data-response-key="${keyMap.old}"
          aria-label="${labels.old} (${keyMap.old.toUpperCase()})"
        >
          <span class="recognition-response-key">${keyMap.old.toUpperCase()}</span>
          <span class="recognition-response-label">${labels.old}</span>
        </button>
        <button
          type="button"
          class="recognition-response-button"
          data-response-key="${keyMap.new}"
          aria-label="${labels.new} (${keyMap.new.toUpperCase()})"
        >
          <span class="recognition-response-key">${keyMap.new.toUpperCase()}</span>
          <span class="recognition-response-label">${labels.new}</span>
        </button>
      </div>
    </div>
  `;
};

const buildInstructionSurvey = (html: string, mode: InstructionMode) => {
=======
const buildInstructionSurvey = (
  html: string,
  mode: InstructionMode,
  includeConsentCheckbox = false,
) => {
>>>>>>> Stashed changes
  const buttons = getButtonLabels(mode);
  const elements: any[] = [
    {
      type: "html",
      name: "instruction_text",
      html,
    },
  ];

  if (includeConsentCheckbox) {
    elements.push({
      type: "checkbox",
      name: "consent_ack",
      title: "",
      titleLocation: "hidden",
      isRequired: true,
      choices: [
        {
          value:
            "Hiermit bestätige ich die Informationen gelesen zu haben, und stimme der Nutzung meiner Daten zu Forschungszwecken zu.",
          text: "Hiermit bestätige ich die Informationen gelesen zu haben, und stimme der Nutzung meiner Daten zu Forschungszwecken zu.\nBilgilendirmeyi okudugumu ve verilerimin arastirma amaciyla kullanilmasini kabul ettigimi onayliyorum.",
        },
      ],
    });
  }

  return {
    ...surveyDefaults,
    pageNextText: buttons.next,
    pagePrevText: buttons.prev,
<<<<<<< Updated upstream
    completeText: buttons.complete,
=======
    completeText: buttons.next,
>>>>>>> Stashed changes
    pages: [
      {
        name: "instructions",
        elements,
      },
    ],
  };
};

const makeInstructionTrial = (
  key: string,
  modeGetter: () => InstructionMode,
  block: string,
  includeConsentCheckbox = false,
) => ({
  type: surveyPlugin,
  data: { block },
  survey_json: {},
  on_start: (trial: any) => {
    const mode = modeGetter();
    trial.survey_json = buildInstructionSurvey(
      getInstructionHtml(key, mode),
      mode,
      includeConsentCheckbox,
    );
  },
});

<<<<<<< Updated upstream
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
=======
const setRequiredForBackgroundPages = (pages: any[], required: boolean) =>
  pages.map((page) => ({
    ...page,
    elements: (page.elements ?? []).map((element: any) => {
      if (element.type === "html") {
        return element;
      }
      return {
        ...element,
        isRequired: required,
      };
    }),
  }));

const makeBackgroundSurvey = (jsPsych: JsPsych, state: ParticipantState) => ({
  type: surveyPlugin,
  data: { block: "background" },
  survey_json: {
    ...surveyDefaults,
    pageNextText: "Weiter / Devam",
    pagePrevText: "Zurueck / Geri",
    pages: setRequiredForBackgroundPages(
      [...demographicPages, ...languageBackgroundPages],
      !studyConfig.debug,
    ),
  },
  on_finish: (data: any) => {
    if (state.debugManualMode) {
      return;
    }
    const response = data?.response ?? {};
    assignParticipant(jsPsych, state, response);
  },
});
>>>>>>> Stashed changes

const makeDebugSetupSurvey = (jsPsych: JsPsych, state: ParticipantState) => ({
  type: surveyPlugin,
  data: { block: "debug_setup" },
  survey_json: {
    ...surveyDefaults,
    pageNextText: "Start",
    pagePrevText: "Zurueck",
    completeText: "Start",
    pages: [
      {
        name: "debug_setup",
        title: "Debug/Testmodus",
        description:
          "Waehle Gruppe und Studienteile aus. Im Debugmodus werden Eligibility-Pruefungen uebersprungen.",
        elements: [
          {
            type: "checkbox",
            name: "debug_parts",
            title: "Welche Teile moechtest du testen?",
            isRequired: true,
            choices: [
              { value: "welcome", text: "Begruessung" },
              { value: "background", text: "Hintergrundfragen" },
              { value: "practice", text: "Uebungsdurchgang" },
              {
                value: "practice_recognition",
                text: "Recognition nach Uebung",
              },
              { value: "main_learning", text: "Haupt-Lerndurchgang" },
              { value: "distractor", text: "Distraktoraufgabe" },
              { value: "recognition", text: "Haupt-Recognition" },
              { value: "end", text: "Abschlussseite" },
            ],
            defaultValue: [...debugPartValues],
          },
          {
            type: "radiogroup",
            name: "debug_group",
            title: "Gruppe",
            isRequired: true,
            choices: [
              { value: "monolingual", text: "Monolingual" },
              { value: "late_bilingual", text: "Late bilingual" },
            ],
            defaultValue: "late_bilingual",
            colCount: 0,
          },
          {
            type: "radiogroup",
            name: "debug_native_language",
            title: "Hauptsprache fuer Instruktionen",
            isRequired: true,
            choices: [
              { value: "de", text: "Deutsch" },
              { value: "tr", text: "Tuerkisch" },
            ],
            defaultValue: "de",
            colCount: 2,
          },
          {
            type: "radiogroup",
            name: "debug_task_version",
            title: "Task-Version (nur bei late bilingual)",
            choices: [
              { value: "coupled", text: "Coupled" },
              { value: "mixed", text: "Mixed" },
            ],
            defaultValue: "mixed",
            visibleIf: "{debug_group} = 'late_bilingual'",
            colCount: 2,
          },
          {
            type: "radiogroup",
            name: "debug_tbr_language",
            title: "TBR-Sprache (nur coupled)",
            choices: [
              { value: "de", text: "Deutsch" },
              { value: "tr", text: "Tuerkisch" },
            ],
            defaultValue: "de",
            visibleIf:
              "{debug_group} = 'late_bilingual' and {debug_task_version} = 'coupled'",
            colCount: 2,
          },
        ],
      },
    ],
  },
  on_finish: (data: any) => {
    const response = data?.response ?? {};
    const selectedParts = Array.isArray(response.debug_parts)
      ? (response.debug_parts.filter((part: string) =>
          debugPartValues.includes(part as DebugPart),
        ) as DebugPart[])
      : [...debugPartValues];

    const group = response.debug_group as ParticipantGroup;
    const nativeLanguage =
      (response.debug_native_language as LanguageCode | undefined) ?? "de";

    state.debugManualMode = true;
    state.debugParts =
      selectedParts.length > 0 ? selectedParts : [...debugPartValues];
    state.participantId = state.participantId || makeParticipantId();
    state.group = group === "late_bilingual" ? "late_bilingual" : "monolingual";
    state.nativeLanguage = nativeLanguage;
    state.eligible = true;

    if (state.group === "late_bilingual") {
      const version = (response.debug_task_version as TaskVersion) ?? "mixed";
      state.taskVersion = version === "coupled" ? "coupled" : "mixed";
      if (state.taskVersion === "coupled") {
        const tbr =
          (response.debug_tbr_language as LanguageCode | undefined) ?? "de";
        state.tbrLanguage = tbr;
        state.tbfLanguage = tbr === "de" ? "tr" : "de";
      } else {
        state.tbrLanguage = null;
        state.tbfLanguage = null;
      }
    } else {
      state.taskVersion = "monolingual";
      state.tbrLanguage = null;
      state.tbfLanguage = null;
    }

    jsPsych.data.addProperties({
      participant_id: state.participantId,
      group: state.group,
      task_version: state.taskVersion ?? "unknown",
      native_language: state.nativeLanguage ?? "unknown",
      tbr_language: state.tbrLanguage ?? "none",
      tbf_language: state.tbfLanguage ?? "none",
      debug_manual_mode: true,
      debug_parts: state.debugParts.join(","),
    });
  },
});

const shouldRunDebugPart = (state: ParticipantState, part: DebugPart) => {
  if (!state.debugManualMode) {
    return true;
  }
  return state.debugParts.includes(part);
};

const withConditional = (trial: any, predicate: () => boolean) => ({
  timeline: [trial],
  conditional_function: predicate,
});

const assignParticipant = (
  jsPsych: JsPsych,
  state: ParticipantState,
  response: Record<string, any>,
) => {
<<<<<<< Updated upstream
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
=======
  const firstLanguage = response.first_language as
    | LanguageCode
    | "other"
    | undefined;
  const regularLanguages = (response.regular_languages ?? []) as
    | string[]
    | string;
  const regularLanguageList = Array.isArray(regularLanguages)
    ? regularLanguages
    : regularLanguages
      ? [regularLanguages]
      : [];
  const speaksDeRegularly = regularLanguageList.includes("de");
  const speaksTrRegularly = regularLanguageList.includes("tr");
  const germanAcquisitionAge = Number(response.acquisition_age_de);
  const usesBoth = response.use_both_languages === "yes";

  const firstLanguageOk = firstLanguage === "de" || firstLanguage === "tr";

  let group: ParticipantGroup = "ineligible";
  if (
    firstLanguageOk &&
    ((firstLanguage === "de" && !speaksTrRegularly) ||
      (firstLanguage === "tr" && !speaksDeRegularly))
  ) {
    group = "monolingual";
  } else if (
    firstLanguageOk &&
    speaksDeRegularly &&
    speaksTrRegularly &&
    (firstLanguage === "de" || germanAcquisitionAge > 7) &&
    usesBoth
>>>>>>> Stashed changes
  ) {
    group = "monolingual";
  }

  state.group = group;
  state.nativeLanguage = firstLanguageOk ? firstLanguage : null;
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

  applyParticipantDataProperties(jsPsych, state);
};

const resolveParticipantGroupLabel = (
  state: ParticipantState,
): ParticipantGroupLabel => {
  if (state.group === "monolingual") {
    if (state.nativeLanguage === "de") return "monoling_DE";
    if (state.nativeLanguage === "tr") return "monoling_TR";
    return "ineligible";
  }

  if (state.group === "late_bilingual") {
    if (state.taskVersion === "mixed") return "biling_Mixed";
    if (state.taskVersion === "coupled") return "biling_Same";
    return "ineligible";
  }

  return "ineligible";
};

const applyParticipantDataProperties = (
  jsPsych: JsPsych,
  state: ParticipantState,
) => {
  const groupLabel = resolveParticipantGroupLabel(state);
  const properties = {
    participant_id: state.participantId,
    group: groupLabel,
    participant_group: groupLabel,
    group_internal: state.group,
    task_version: state.taskVersion ?? "unknown",
    native_language: state.nativeLanguage ?? "unknown",
    tbr_language: state.tbrLanguage ?? "none",
    tbf_language: state.tbfLanguage ?? "none",
  };

  jsPsych.data.addProperties(properties);

  // Ensure already-recorded rows in test mode (e.g., selector/welcome) also receive the same metadata.
  const allData = jsPsych.data.get() as any;
  if (typeof allData?.addToAll === "function") {
    allData.addToAll(properties);
  }
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
  const oldItems: TestItem[] = state.studyItems.map((item, index) => ({
    word: item.word,
    language: item.language,
    target: "old",
    itemStatus: item.itemStatus,
    serialPosition: index + 1,
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
        itemStatus: "neu" as const,
        serialPosition: 0,
      })),
      ...newTr.map((word) => ({
        word,
        language: "tr" as const,
        target: "new" as const,
        itemStatus: "neu" as const,
        serialPosition: 0,
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
    itemStatus: "neu",
    serialPosition: 0,
  }));
  return jsPsych.randomization.shuffle([...oldItems, ...newItems]);
};

const buildPracticeTestItems = (jsPsych: JsPsych, state: ParticipantState) => {
  const oldItems: TestItem[] = state.practiceItems.map((item, index) => ({
    word: item.word,
    language: item.language,
    target: "old",
    itemStatus: item.itemStatus,
    serialPosition: index + 1,
  }));

  if (state.group === "late_bilingual") {
    const newDe = jsPsych.randomization.sampleWithoutReplacement(
      stimuli.de.new,
      2,
    );
    const newTr = jsPsych.randomization.sampleWithoutReplacement(
      stimuli.tr.new,
      2,
    );
    const newItems: TestItem[] = [
      ...newDe.map((word) => ({
        word,
        language: "de" as const,
        target: "new" as const,
        itemStatus: "neu" as const,
        serialPosition: 0,
      })),
      ...newTr.map((word) => ({
        word,
        language: "tr" as const,
        target: "new" as const,
        itemStatus: "neu" as const,
        serialPosition: 0,
      })),
    ];
    return jsPsych.randomization.shuffle([...oldItems, ...newItems]);
  }

  const language = state.nativeLanguage ?? "de";
  const newWords = jsPsych.randomization.sampleWithoutReplacement(
    stimuli[language].new,
    4,
  );
  const newItems: TestItem[] = newWords.map((word) => ({
    word,
    language,
    target: "new",
    itemStatus: "neu",
    serialPosition: 0,
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

const buildRecognitionBlock = (
  jsPsych: JsPsych,
  state: ParticipantState,
  itemsGetter: () => TestItem[],
  phase: "recognition" | "recognition_practice" = "recognition",
) => {
  const responsePrompt = () => {
    const mode = getInstructionModeForRecognition(state);
    return getRecognitionPromptHtml(mode);
  };

  const trial: any = {
    type: htmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable("word"),
    choices: [keyMap.old, keyMap.new],
    prompt: responsePrompt,
    on_load: () => {
      const displayElement = jsPsych.getDisplayElement();
      const buttons = displayElement.querySelectorAll<HTMLButtonElement>(
        ".recognition-response-button",
      );

      buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const responseKey = button.dataset.responseKey;
          if (responseKey) {
            jsPsych.pluginAPI.pressKey(responseKey);
          }
        });
      });
    },
    data: {
      phase,
      word: jsPsych.timelineVariable("wordText"),
      language: jsPsych.timelineVariable("language"),
      target: jsPsych.timelineVariable("target"),
      item_status: jsPsych.timelineVariable("itemStatus"),
      serial_position: jsPsych.timelineVariable("serialPosition"),
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
      return itemsGetter().map((item) => ({
        word: `<div class="word">${item.word}</div>`,
        wordText: item.word,
        language: item.language,
        target: item.target,
        itemStatus: item.itemStatus,
        serialPosition: item.serialPosition,
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

      applyParticipantDataProperties(jsPsych, state);

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
<<<<<<< Updated upstream
=======
  if (studyConfig.debug) {
    timeline.push(makeDebugSetupSurvey(jsPsych, state));
  }

  timeline.push(
    withConditional(
      makeInstructionTrial("welcome", () => "both", "welcome", true),
      () => shouldRunDebugPart(state, "welcome"),
    ),
  );

  timeline.push(
    withConditional(makeBackgroundSurvey(jsPsych, state), () =>
      shouldRunDebugPart(state, "background"),
    ),
  );
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    conditional_function: () => !isTest && state.group === "ineligible",
=======
    conditional_function: () =>
      !state.debugManualMode && state.group === "ineligible",
>>>>>>> Stashed changes
  });

  // ---- Main experiment (only if eligible OR test mode) ----
  const mainConditional = () => (isTest ? true : state.group !== "ineligible");

  // Practice block
  timeline.push({
    timeline: [
      withConditional(
        makeInstructionTrial(
          "general",
          () => getInstructionModeForGeneral(state),
          "general",
        ),
        () => shouldRunDebugPart(state, "practice"),
      ),
<<<<<<< Updated upstream
      makeInstructionTrial(
        "practice",
        () => getInstructionModeForGeneral(state),
        "practice",
=======
      withConditional(
        makeInstructionTrial(
          "learning",
          () => getInstructionModeForGeneral(state),
          "learning",
        ),
        () => shouldRunDebugPart(state, "practice"),
      ),
      withConditional(
        makeInstructionTrial(
          "practice",
          () => getInstructionModeForGeneral(state),
          "practice",
        ),
        () => shouldRunDebugPart(state, "practice"),
>>>>>>> Stashed changes
      ),
      withConditional(
        {
          type: htmlKeyboardResponse,
          stimulus: "",
          choices: "NO_KEYS",
          trial_duration: 0,
          on_start: () => {
            state.practiceItems = buildPracticeItems(jsPsych, state);
          },
        },
<<<<<<< Updated upstream
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
=======
        () =>
          shouldRunDebugPart(state, "practice") ||
          shouldRunDebugPart(state, "practice_recognition"),
>>>>>>> Stashed changes
      ),
      withConditional(buildStudyBlock(jsPsych, state, "practice"), () =>
        shouldRunDebugPart(state, "practice"),
      ),
      withConditional(
        {
          type: htmlKeyboardResponse,
          stimulus: "",
          choices: "NO_KEYS",
          trial_duration: 0,
          on_start: () => {
            state.practiceTestItems = buildPracticeTestItems(jsPsych, state);
          },
        },
<<<<<<< Updated upstream
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
=======
        () => shouldRunDebugPart(state, "practice_recognition"),
      ),
      withConditional(
        makeInstructionTrial(
          "practice_recognition",
          () => getInstructionModeForRecognition(state),
          "practice_recognition",
        ),
        () => shouldRunDebugPart(state, "practice_recognition"),
      ),
      withConditional(
        buildRecognitionBlock(
          jsPsych,
          state,
          () => state.practiceTestItems,
          "recognition_practice",
        ),
        () => shouldRunDebugPart(state, "practice_recognition"),
      ),
      withConditional(
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
        () =>
          shouldRunDebugPart(state, "main_learning") ||
          shouldRunDebugPart(state, "recognition"),
      ),
      withConditional(
        makeInstructionTrial(
          "start_main",
          () => getInstructionModeForGeneral(state),
          "start_main",
        ),
        () => shouldRunDebugPart(state, "main_learning"),
      ),
      withConditional(buildStudyBlock(jsPsych, state, "study"), () =>
        shouldRunDebugPart(state, "main_learning"),
      ),
      withConditional(buildDistractor(state), () =>
        shouldRunDebugPart(state, "distractor"),
      ),
      withConditional(
        makeInstructionTrial(
          "recognition",
          () => getInstructionModeForRecognition(state),
          "recognition",
        ),
        () => shouldRunDebugPart(state, "recognition"),
      ),
      withConditional(
        buildRecognitionBlock(
          jsPsych,
          state,
          () => state.testItems,
          "recognition",
        ),
        () => shouldRunDebugPart(state, "recognition"),
      ),
      withConditional(
        makeInstructionTrial(
          "end",
          () => getInstructionModeForGeneral(state),
          "end",
        ),
        () => shouldRunDebugPart(state, "end"),
      ),
    ],
    conditional_function: () =>
      state.debugManualMode || state.group !== "ineligible",
>>>>>>> Stashed changes
  });

  if (studyConfig.debug) {
    console.debug("[jsPsych] Participant state (debug)", state);
  }

  return timeline;
};
