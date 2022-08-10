const grammar = '#JSGF V1.0; grammar cells; public <cell> = first | second | third | fourth | fifth';

const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const SpeechGrammarList = window.speechGrammarList || window.webkitSpeechGrammarList;

export const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startButton = document.querySelector("#start");

// startButton.addEventListener('click', () => {
//   recognition.start();
//   console.log('started')
// })

recognition.onresult = (event) => {
  console.log(event.results)
}

export const getCoordsFromVoice = (voiceStr) => {
  console.log(voiceStr)
  const failedResult = [-1, -1];

  const parts = voiceStr.split(" ");
  if (parts.length !== 2) return failedResult

  const coords = parts.reduce((prev, curr) => {
    switch (curr) {
      case "first":
        return [...prev, 0]
      case "second":
        return [...prev, 1]
      case "third":
        return [...prev, 2]
      case "fourth":
        return [...prev, 3]
      case "fifth":
      case "5th":
        return [...prev, 4]
      default:
        return failedResult
    }
  }, [])

  if (coords[0] === -1 || coords[1] === -1) return failedResult

  return coords
}
