import { setStage, checkWin } from "./stages.js";
import { recognition, getCoordsFromVoice } from "./recognition.js";
import { changeCellStatus, CROSS, CIRCLE } from "./cell.js";

export const createInterface = (state) => {
  state.interface.blocks = [
    createYourTurnBlock(state),
    createListeningBlock(state),
    createEnemyTurnBlock(state),
  ];
  state.interface.blocks.forEach(block => state.interface.element.append(block));
}

const createYourTurnBlock = (state) => {
  const block = document.createElement('div');
  block.classList.add('your-turn-block', 'interface-block');

  // Header
  const header = document.createElement('h2');
  header.classList.add('interface-header');
  header.innerText = 'It\'s your turn';
  block.append(header);

  // Instructions
  const instructions = document.createElement('p');
  instructions.classList.add('interface-instructions');
  instructions.innerText = 'Press the \'Talk\' button to choose a cell.'
  block.append(instructions);

  // Talk button
  const button = document.createElement('button');
  button.classList.add('talk-button');
  button.addEventListener('click', () => {
    setStage(state, 1)
  });
  button.innerText = 'Talk'
  block.append(button);

  return block;
}

const createListeningBlock = (state) => {
  const block = document.createElement('div');
  block.classList.add('listening-block', 'interface-block');

  // Header
  const header = document.createElement('h2');
  header.classList.add('interface-header');
  header.innerText = 'Please select your cell with voice';
  block.append(header);

  // Instruction
  const instruction = document.createElement('p');
  instruction.classList.add('interface-instruction');
  instruction.innerText = 'Choose your column and row by saying "First", "Second" etc.';
  block.append(instruction);


  // Listening icon
  const listening = document.createElement('div');
  listening.classList.add('interface-listening-icon');
  block.append(listening);

  // Coordinates
  const coordinates = document.createElement('div');
  coordinates.classList.add('interface-coordinates');

  const row = document.createElement('div');
  row.classList.add('interface-coordinates', 'interface-row')
  coordinates.append(row)

  const column = document.createElement('div');
  column.classList.add('interface-coordinates', 'interface-column');
  coordinates.append(column)

  block.append(coordinates)

  // Rechoose button
  const button = document.createElement('button');
  button.classList.add('interface-button')
  button.innerText = "Button"
  button.addEventListener('click', (e) => {
    recognition.start()
    listening.classList.add("active")
    recognition.onresult = (e) => {
      const result = e.results[0][0].transcript
      const coords = getCoordsFromVoice(result)
      if (coords[0] === -1) {
        console.log("Error, invalid coordinates")
      } else {
        changeCellStatus(state.cells[coords[0] * 5 + coords[1]], CROSS)
        console.log(checkWin(state))
        setTimeout(() => {
          setStage(state, 2)
        }, 1500)
      }
    }
  })
  block.append(button)

  return block;
}

const createEnemyTurnBlock = () => {
  const block = document.createElement('div');
  block.classList.add('enemy-turn-block', 'interface-block');
  return block;
}
