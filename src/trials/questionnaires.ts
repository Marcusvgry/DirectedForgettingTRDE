export const demographicPages = [
  {
    name: "demographics",
    title: "Demografie (optional)",
    description: "Diese Angaben sind optional und anonym.",
    elements: [
      {
        type: "text",
        title: "Wie alt sind Sie?",
        placeholder: "Alter",
        name: "age",
        inputType: "number",
        min: 1,
        max: 120,
      },
      {
        type: "radiogroup",
        title: "Geschlecht",
        choices: ["Maennlich", "Weiblich", "Divers", "keine Angabe"],
        colCount: 0,
        name: "gender",
      },
      {
        type: "text",
        name: "notes",
        title: "Weitere Angaben (optional)",
        placeholder: "Freitext",
      },
    ],
  },
];
