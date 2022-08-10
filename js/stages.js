// Game stages
// 0. Your turn - it's time for you to make a move, TALK button active, procs LISTENING
// 1. Listening - you are talking into the mic. After you're done talking starts ANIMATION
// 2. Enemy turn - computer makes a move
// 3. Player won
// 4. Enemy won

import { makeEnemyMove } from "./enemyLogic.js";
import { CROSS, CIRCLE, EMPTY } from "./cell.js";

export const setStage = (state, stage) => {
  state.container.classList.remove('your-turn', 'listening', 'enemy-turn')
  switch (stage) {
    // Start of your turn
    case 0:
      state.interface.blocks[state.stage].classList.remove('active');
      state.stage = stage;
      state.interface.blocks[stage].classList.add('active');
      state.container.classList.add('your-turn');
      break;

    // Start of listening
    case 1:
      state.interface.blocks[state.stage].classList.remove('active');
      state.stage = stage;
      state.interface.blocks[stage].classList.add('active');
      state.container.classList.add('listening');
      break;

    // Start of enemy turn
    case 2:
      state.interface.blocks[state.stage].classList.remove('active');
      state.stage = stage;
      state.interface.blocks[stage].classList.add('active');
      state.container.classList.add('enemy-turn');
      makeEnemyMove(state);
      console.log(checkWin(state))
      setStage(state, 0);
      break;
    case 3:
      break;
    case 4:
      break;
  }
}

export const checkWin = ({ cells }) => {
  // Combinations
  const combinations = [
    // Horizontal
    [cells[0], cells[1], cells[2], cells[3], cells[4]],
    [cells[5], cells[6], cells[7], cells[8], cells[9]],
    [cells[10], cells[11], cells[12], cells[13], cells[14]],
    [cells[15], cells[16], cells[17], cells[18], cells[19]],
    [cells[20], cells[21], cells[22], cells[23], cells[24]],

    // Vertical
    [cells[0], cells[5], cells[10], cells[15], cells[20]],
    [cells[1], cells[6], cells[11], cells[16], cells[21]],
    [cells[2], cells[7], cells[12], cells[17], cells[22]],
    [cells[3], cells[8], cells[13], cells[18], cells[23]],
    [cells[4], cells[9], cells[14], cells[19], cells[24]],

    // Diagonal
    [cells[0], cells[6], cells[12], cells[18], cells[24]],
    [cells[4], cells[8], cells[12], cells[16], cells[20]],
  ]

  let winner = ""

  combinations.forEach((combination, combinationNumber) => {
    console.log(combination)
    if (combination.every(cell => cell.status === combination[0].status && cell.status !== EMPTY)) {
      console.log("proc")
      if (combination[0] === CROSS) winner = "player"
      else winner = "enemy"

      combination.forEach((cell, i) => {
        console.log('test')
        setTimeout(
          () => cell.element.classList.add("won"),
          200 * i
        )
      })
    }
  })



  if (winner === "") return 0
  if (winner === "player") return 1
  if (winner === "enemy") return -1
}
