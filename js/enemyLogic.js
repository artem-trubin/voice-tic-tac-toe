import { changeCellStatus, CROSS, EMPTY, CIRCLE } from "./cell.js";

export const makeEnemyMove = (state) => {
  while (true) {
    const guess = Math.floor(Math.random() * state.cells.length);
    console.log(state.cells[guess].status)
    if (state.cells[guess].status !== CROSS &&
      state.cells[guess].status !== CIRCLE) {
      changeCellStatus(state.cells[guess], CIRCLE)
      break
    }
  }
}
