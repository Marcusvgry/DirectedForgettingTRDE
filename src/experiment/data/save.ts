import type { JsPsych } from "jspsych";
import { studyConfig } from "../config";

export async function saveStudyData(jsPsych: JsPsych) {
  const csv = jsPsych.data.get().csv();
  const response = await fetch(studyConfig.dataEndpoint, {
    method: "POST",
    headers: { "Content-Type": "text/csv" },
    body: csv,
  });

  if (!response.ok) {
    throw new Error(`Data upload failed with status ${response.status}`);
  }
}
