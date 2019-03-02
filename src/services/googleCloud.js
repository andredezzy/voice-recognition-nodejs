const record = require("node-record-lpcm16");
const speech = require("@google-cloud/speech");

// 1. Instance Speech Client (Speech-to-text API)
const client = new speech.SpeechClient({
    projectId: "vr-app",
    keyFilename: "../google-cred.json"
});

const sampleRateHertz = 16000;

// 2. Speech Client settings
const request = {
    config: {
        encoding: "LINEAR16",
        sampleRateHertz: sampleRateHertz,
        languageCode: "en-US"
    },
    interimResults: false
};

// 3. Set-up client and receive data event
const recognizeStream = client
    .streamingRecognize(request)
    .on("error", console.error)
    .on("data", data =>
        console.log(
            data.results[0] && data.results[0].alternatives[0]
                ? `Transcription: ${
                      data.results[0].alternatives[0].transcript
                  }\n`
                : `\n\nReached transcription time limit, press Ctrl+C\n`
        )
    );

// 4. Start recording and send the microphone input to the Speech Client
record
    .start({
        sampleRateHertz: sampleRateHertz,
        threshold: 0,
        verbose: false,
        recordProgram: "sox",
        silence: "10.0"
    })
    .on("error", console.error)
    .pipe(recognizeStream);

console.log("Listening, press Ctrl+C to stop.");
