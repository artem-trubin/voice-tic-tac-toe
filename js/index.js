import { createCells, buildBoard, getCell, changeCellStatus, CROSS, CIRCLE } from './cell.js';
// import { recognition } from './recognition.js';
import { createInterface } from './interface.js';
import { setStage } from './stages.js';

const boardSize = 5;

const state = {
  container: document.querySelector('.container'),
  cells: createCells(boardSize),
  gameElement: document.querySelector("#game"),
  interface: {
    element: document.querySelector("#interface"),
  },
  stage: 0,
}

createInterface(state);


buildBoard(state.gameElement, state.cells)
changeCellStatus(getCell(state.cells, 1), CROSS)
changeCellStatus(getCell(state.cells, 2), CROSS)
changeCellStatus(getCell(state.cells, 3), CROSS)
changeCellStatus(getCell(state.cells, 4), CROSS)
// changeCellStatus(getCell(state.cells, 2), CIRCLE)

state.gameElement.addEventListener("click", ({ target }) => {
  if (target.classList.contains("cell")) {
    changeCellStatus(getCell(state.cells, target.id), CROSS);
  }
})



setStage(state, 0)
