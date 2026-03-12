import type { JsPsych } from "jspsych";
import {} from "../trials/experimentFlow";
import { studyConfig } from "./config";

export type Timeline = Parameters<JsPsych["run"]>[0];

export function buildTimeline(_jsPsych: JsPsych): Timeline {
  const timeline: Timeline = [];

  if (studyConfig.debug) {
    console.debug("[jsPsych] Timeline length", timeline.length);
  }

  return timeline;
}
