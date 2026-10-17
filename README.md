# dhaLewis AI Video Studio — Starter Website

A responsive front-end prototype for a text-to-video website. It works on mobile and desktop browsers.

## What works now
- Responsive interface
- Prompt input with character counter
- Video style, aspect ratio, duration, voiceover, and music settings
- Prompt starter buttons
- Project brief preview
- Download project settings as a `.txt` file

## Important limitation
This starter build does **not** generate an actual video. Real rendering requires a video-generation provider with API access. The API key must be stored on a server, never in `app.js` or other browser code.

## Run it
1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. Or deploy the folder to a static website host.

No build tools are required for the demo.

## Next development step: connect real generation
Add a backend endpoint such as `POST /api/videos` that:
1. Validates the prompt and requested settings.
2. Authenticates and rate-limits the user.
3. Calls a video-generation provider using a server-side API key.
4. Returns a job ID and tracks processing status.
5. Supplies a safe playback/download URL when rendering completes.

Provider capabilities, duration limits, output formats, free tiers, and prices vary. Confirm these before choosing a provider. Long-form video should be built as a scene workflow (script/storyboard → clip jobs → narration/music → video assembly), not assumed to be one generation request.

## Production checklist
- User authentication and account deletion
- Database for projects and job statuses
- Server-side API key storage
- Queue/retry handling and generation status polling
- Storage with expiry and access controls
- Abuse prevention, usage limits, and cost caps
- Copyright and safety policies
- Terms, privacy notice, and payment integration before monetisation
