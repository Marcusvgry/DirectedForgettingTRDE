import type { JsPsych } from "jspsych";
import { buildExperimentTimeline } from "../trials/experimentFlow";
import { studyConfig } from "./config";

export type Timeline = Parameters<JsPsych["run"]>[0];

export function buildTimeline(_jsPsych: JsPsych): Timeline {
  const timeline: Timeline = buildExperimentTimeline(_jsPsych);

  if (studyConfig.debug) {
    console.debug("[jsPsych] Timeline length", timeline.length);
  }

  return timeline;
}
