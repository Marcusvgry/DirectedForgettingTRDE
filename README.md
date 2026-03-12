# jsPsych Template (Vite)

Minimal template for jsPsych studies with Vite and an optional Express data endpoint.

## Development

npm install
npm run dev

## Build

npm run build

## Run server (optional data endpoint)

npm run build
npm run start

## Data endpoint

POST /data accepts text/csv and writes files to ./data.

## Customize

- `src/experiment/timeline.ts` defines the timeline order
- `src/trials/experimentFlow.ts` contains trial builders and survey pages
- `src/trials/instructionTexts.ts` holds participant-facing text blocks
- `src/stimuli/stimuli.ts` holds placeholder stimuli
- `src/experiment/config.ts` sets the data endpoint and debug flag
- `public/stimuli/` is for static assets (images/audio/video)
