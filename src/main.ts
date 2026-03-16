import { initJsPsych } from "jspsych";
import "jspsych/css/jspsych.css";
import "@jspsych/plugin-survey/css/survey.css";
import "./styles/main.css";
import "./styles/jspsych-overrides.css";
import { buildTimeline } from "./experiment/timeline";
import { saveStudyData } from "./experiment/data/save";
import { studyConfig } from "./experiment/config";

const jsPsych = initJsPsych({
  display_element: "jspsych-target",
  on_finish: async () => {
    if (studyConfig.testMode) {
      const csv = jsPsych.data.get().csv();
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `testdata_${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      console.info("[jsPsych] Testmodus: CSV heruntergeladen.");
    } else {
      try {
        await saveStudyData(jsPsych);
        console.info("[jsPsych] Daten wurden gespeichert.");
      } catch (error) {
        console.error("[jsPsych] Speichern fehlgeschlagen:", error);
      }
    }
  },
});

const timeline = buildTimeline(jsPsych);

jsPsych.run(timeline);
