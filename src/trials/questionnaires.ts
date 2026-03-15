export const demographicPages = [
  {
    name: "demographics",
    title: "Soziodemografie / Sosyodemografi",
    description: "Diese Angaben sind anonym. / Bu bilgiler anonimdir.",
    elements: [
      {
        type: "text",
        title: "Wie alt sind Sie? / Kaç yaşındasınız?",
        name: "age",
        inputType: "number",
        min: 1,
        max: 120,
        isRequired: true,
      },
      {
        type: "radiogroup",
        title: "Geschlecht / Cinsiyet",
        choices: [
          { value: "male", text: "Männlich / Erkek" },
          { value: "female", text: "Weiblich / Kadın" },
          { value: "diverse", text: "Divers / Diğer" },
          { value: "no_answer", text: "Keine Angabe / Belirtmek istemiyorum" },
        ],
        colCount: 0,
        name: "gender",
        isRequired: true,
      },
      {
        type: "text",
        title: "Herkunftsland / Doğduğunuz ülke",
        name: "country_of_origin",
        isRequired: true,
      },
      {
        type: "text",
        title:
          "Aktueller Wohnort (Stadt/Land) / Şu anki yaşadığınız yer (Şehir/Ülke)",
        name: "current_residence",
        isRequired: true,
      },
      {
        type: "text",
        title:
          "In welchen Ländern haben Sie bisher länger gelebt? / Hangi ülkelerde daha uzun süre yaşadınız?",
        name: "countries_lived",
        isRequired: true,
      },
    ],
  },
];

export const languageBackgroundPages = [
  {
    name: "language_background",
    title: "Sprachhintergrund / Dil Geçmişi",
    description:
      "Bitte beantworten Sie die Fragen zu Ihrem Sprachhintergrund. / Dil geçmişinizle ilgili soruları yanıtlayınız.",
    elements: [
      {
        type: "checkbox",
        title:
          "Welche Sprachen sprechen Sie im Alltag regelmäßig? / Günlük hayatta hangi dilleri düzenli konuşuyorsunuz?",
        name: "languages_spoken",
        isRequired: true,
        choices: [
          { value: "de", text: "Deutsch / Almanca" },
          { value: "tr", text: "Türkisch / Türkçe" },
          { value: "other", text: "Andere / Diğer" },
        ],
        colCount: 0,
      },
      {
        type: "text",
        title: "Falls andere: Welche? / Diğer ise hangisi?",
        name: "languages_spoken_other",
        visibleIf: "{languages_spoken} contains 'other'",
      },
      {
        type: "radiogroup",
        title:
          "Welche ist Ihre Erstsprache / Muttersprache? / Ana diliniz / ilk diliniz hangisi?",
        name: "native_language",
        isRequired: true,
        choices: [
          { value: "de", text: "Deutsch / Almanca" },
          { value: "tr", text: "Türkisch / Türkçe" },
          { value: "other", text: "Andere / Diğer" },
        ],
        colCount: 0,
      },
      {
        type: "text",
        title: "Falls andere: Welche? / Diğer ise hangisi?",
        name: "native_language_other",
        visibleIf: "{native_language} = 'other'",
      },
      {
        type: "text",
        title:
          "In welchem Alter haben Sie Deutsch erworben? / Almancayı kaç yaşında öğrendiniz?",
        name: "age_acquisition_de",
        inputType: "number",
        min: 0,
        max: 120,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'de'",
      },
      {
        type: "text",
        title:
          "In welchem Alter haben Sie Türkisch erworben? / Türkçeyi kaç yaşında öğrendiniz?",
        name: "age_acquisition_tr",
        inputType: "number",
        min: 0,
        max: 120,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'tr'",
      },
    ],
  },
  {
    name: "language_competence",
    title: "Sprachkompetenz / Dil Yetkinliği",
    description:
      "Bitte schätzen Sie Ihre Sprachkompetenz auf einer Skala von 0 (keine Kenntnisse) bis 100 (muttersprachlich) ein. / Lütfen dil yetkinliğinizi 0 (bilgi yok) ile 100 (anadil düzeyi) arasında değerlendirin.",
    elements: [
      // Deutsch
      {
        type: "html",
        name: "header_de",
        html: "<h4>Deutsch / Almanca</h4>",
        visibleIf: "{languages_spoken} contains 'de'",
      },
      {
        type: "text",
        title: "Sprechen / Konuşma",
        name: "competence_de_speaking",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'de'",
      },
      {
        type: "text",
        title: "Verstehen / Anlama",
        name: "competence_de_understanding",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'de'",
      },
      {
        type: "text",
        title: "Lesen / Okuma",
        name: "competence_de_reading",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'de'",
      },
      {
        type: "text",
        title: "Schreiben / Yazma",
        name: "competence_de_writing",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'de'",
      },
      // Türkisch
      {
        type: "html",
        name: "header_tr",
        html: "<h4>Türkisch / Türkçe</h4>",
        visibleIf: "{languages_spoken} contains 'tr'",
      },
      {
        type: "text",
        title: "Sprechen / Konuşma",
        name: "competence_tr_speaking",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'tr'",
      },
      {
        type: "text",
        title: "Verstehen / Anlama",
        name: "competence_tr_understanding",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'tr'",
      },
      {
        type: "text",
        title: "Lesen / Okuma",
        name: "competence_tr_reading",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'tr'",
      },
      {
        type: "text",
        title: "Schreiben / Yazma",
        name: "competence_tr_writing",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'tr'",
      },
    ],
  },
  {
    name: "language_usage",
    title: "Sprachverwendung / Dil Kullanımı",
    description:
      "Bitte geben Sie an, wie häufig und in welchen Kontexten Sie Deutsch und Türkisch verwenden. / Lütfen Almanca ve Türkçeyi ne sıklıkta ve hangi bağlamlarda kullandığınızı belirtin.",
    elements: [
      {
        type: "text",
        title:
          "Wie viel Prozent Ihres Alltags verwenden Sie Deutsch? / Günlük hayatınızın yüzde kaçında Almanca kullanıyorsunuz?",
        placeholder: "0–100 %",
        name: "usage_percent_de",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'de'",
      },
      {
        type: "text",
        title:
          "Wie viel Prozent Ihres Alltags verwenden Sie Türkisch? / Günlük hayatınızın yüzde kaçında Türkçe kullanıyorsunuz?",
        placeholder: "0–100 %",
        name: "usage_percent_tr",
        inputType: "number",
        min: 0,
        max: 100,
        isRequired: true,
        visibleIf: "{languages_spoken} contains 'tr'",
      },
      {
        type: "radiogroup",
        title:
          "Welche Sprache sprechen Sie überwiegend zu Hause? / Evde ağırlıklı olarak hangi dili konuşuyorsunuz?",
        name: "language_home",
        isRequired: true,
        choices: [
          { value: "de", text: "Deutsch / Almanca" },
          { value: "tr", text: "Türkisch / Türkçe" },
          { value: "both", text: "Beide gleich / Her ikisi eşit" },
          { value: "other", text: "Andere / Diğer" },
        ],
        colCount: 0,
      },
      {
        type: "radiogroup",
        title:
          "Welche Sprache sprechen Sie überwiegend an der Uni / Arbeit? / Üniversitede / işte ağırlıklı olarak hangi dili konuşuyorsunuz?",
        name: "language_work",
        isRequired: true,
        choices: [
          { value: "de", text: "Deutsch / Almanca" },
          { value: "tr", text: "Türkisch / Türkçe" },
          { value: "both", text: "Beide gleich / Her ikisi eşit" },
          { value: "other", text: "Andere / Diğer" },
        ],
        colCount: 0,
      },
      {
        type: "radiogroup",
        title:
          "Welche Sprache sprechen Sie überwiegend mit Freunden? / Arkadaşlarınızla ağırlıklı olarak hangi dili konuşuyorsunuz?",
        name: "language_friends",
        isRequired: true,
        choices: [
          { value: "de", text: "Deutsch / Almanca" },
          { value: "tr", text: "Türkisch / Türkçe" },
          { value: "both", text: "Beide gleich / Her ikisi eşit" },
          { value: "other", text: "Andere / Diğer" },
        ],
        colCount: 0,
      },
    ],
  },
];
