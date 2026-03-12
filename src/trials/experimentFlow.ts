import surveyPlugin from "@jspsych/plugin-survey";
import { instructionTexts } from "./instructionTexts";
import { demographicPages } from "./questionnaires";

const surveyDefaults = {
  showQuestionNumbers: false,
  pageNextText: "Weiter",
  pagePrevText: "Zurueck",
};

export function makeWelcome() {
  return {
    type: surveyPlugin,
    data: { block: "welcome" },
    survey_json: {
      ...surveyDefaults,
      title: "Willkommen",
      pages: [
        {
          name: "welcome",
          elements: [
            {
              type: "html",
              name: "welcome_text",
              html: instructionTexts.welcome,
            },
          ],
        },
      ],
    },
  };
}
