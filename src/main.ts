import { initJsPsych } from "jspsych";
import "jspsych/css/jspsych.css";
import "@jspsych/plugin-survey/css/survey.css";
import "../styles/main.css";
import "./styles/jspsych-overrides.css";
import { buildTimeline } from "./experiment/timeline";
import { saveStudyData } from "./experiment/data/save";

const jsPsych = initJsPsych({
  display_element: "jspsych-target",
  on_finish: async () => {
    try {
      await saveStudyData(jsPsych);
      console.info("[jsPsych] Daten wurden gespeichert.");
    } catch (error) {
      console.error("[jsPsych] Speichern fehlgeschlagen:", error);
    }
  },
});

const timeline = buildTimeline(jsPsych);

jsPsych.run(timeline);
