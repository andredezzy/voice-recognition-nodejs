const record = require("node-record-lpcm16");
const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient({
  projectId: "vr-app",
  keyFilename: "google-cred.json"
});

const encoding = "LINEAR16";
const sampleRateHertz = 16000;
const languageCode = "en-US";

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  },
  interimResults: false
};

const recognizeStream = client
  .streamingRecognize(request)
  .on("error", console.error)
  .on("data", data =>
    console.log(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    )
  );

// Start recording and send the microphone input to the Speech API
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
