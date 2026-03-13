export const demographicPages = [
  {
    name: "demographics",
    title: "Demografie / Demografi",
    description: "Diese Angaben sind anonym. / Bu bilgiler istege anonimdir.",
    elements: [
      {
        type: "text",
        title: "Wie alt sind Sie? / Kac yasindasiniz?",
        placeholder: "Alter / Yas",
        name: "age",
        inputType: "number",
        min: 1,
        max: 120,
      },
      {
        type: "radiogroup",
        title: "Geschlecht / Cinsiyet",
        choices: [
          "Männlich / Erkek",
          "Weiblich / Kadin",
          "Divers / Diger",
          "Keine Angabe / Belirtmek istemiyorum",
        ],
        colCount: 0,
        name: "gender",
      },
    ],
  },
];

export const languageBackgroundPages = [
  {
    name: "language_background",
    title: "Sprachhintergrund / Dil gecmisi",
    description:
      "Bitte beantworten Sie die Fragen zu Ihrem Sprachhintergrund. / Dil gecmisi sorularini yanitlayiniz.",
    elements: [
      {
        type: "radiogroup",
        title: "Muttersprache / Ana diliniz",
        name: "native_language",
        isRequired: true,
        choices: [
          { value: "de", text: "Deutsch" },
          { value: "tr", text: "Tuerkisch" },
          { value: "other", text: "Andere" },
        ],
        colCount: 0,
      },
      {
        type: "text",
        title: "Falls andere: Welche? / Diger ise hangisi?",
        name: "native_language_other",
        visibleIf: "{native_language} = 'other'",
      },
      {
        type: "radiogroup",
        title: "Zweite Sprache / Ikinci diliniz",
        name: "second_language",
        isRequired: true,
        choices: [
          { value: "de", text: "Deutsch" },
          { value: "tr", text: "Tuerkisch" },
          { value: "none", text: "Keine" },
          { value: "other", text: "Andere" },
        ],
        colCount: 0,
      },
      {
        type: "text",
        title:
          "Alter beim Erwerb der zweiten Sprache / Ikinci dili ogrenme yasi",
        name: "age_l2",
        inputType: "number",
        min: 1,
        max: 120,
        visibleIf: "{second_language} != 'none'",
        isRequired: true,
      },
      {
        type: "radiogroup",
        title:
          "Nutzen Sie Deutsch und Tuerkisch regelmaessig? / Almanca ve Turkceyi duzenli kullaniyor musunuz?",
        name: "use_both_languages",
        isRequired: true,
        choices: [
          { value: "yes", text: "Ja / Evet" },
          { value: "no", text: "Nein / Hayir" },
        ],
        colCount: 0,
        visibleIf: "{second_language} = 'de' or {second_language} = 'tr'",
      },
    ],
  },
];
