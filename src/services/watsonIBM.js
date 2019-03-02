const mic = require("mic");
const SpeechToTextV1 = require("watson-developer-cloud/speech-to-text/v1");
const speechToText = new SpeechToTextV1({
  iam_apikey: "fpHf45n1EGpFD7xqwvDFUwXQDgnfqzZ5haPJAZaMBCKY",
  url: "https://stream.watsonplatform.net/speech-to-text/api",
  version: "v1"
});

// 1. Microphone settings
const micInstance = mic({
  rate: 44100,
  channels: 1,
  debug: true,
  exitOnSilence: 6
});

// 1. Service recognize settings
const recognizeStream = speechToText.recognizeUsingWebSocket({
  content_type: "audio/l16; rate=44100; channels=2",
  model: "en-US_BroadbandModel",
  interim_results: true
});

// 3. Start recording
const micInputStream = micInstance.getAudioStream();
micInstance.start();

console.log("Watson is listening, you may speak now.");

// 4. Pipe audio to service
const textStream = micInputStream.pipe(recognizeStream).setEncoding("utf8");

textStream.on("data", user_speech_text =>
  console.log("Watson hears:", user_speech_text)
);
textStream.on("error", e => console.log(`error: ${e}`));
textStream.on("close", e => console.log(`close: ${e}`));
