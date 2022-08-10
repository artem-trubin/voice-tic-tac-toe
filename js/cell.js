export const EMPTY = 'empty'
export const CROSS = 'cross'
export const CIRCLE = 'circle'

const createCellElement = (id) => {
  const element = document.createElement('div');
  element.id = id;
  element.classList.add('cell');
  return element;
}

const createCell = (id) => {
  return {
    id,
    status: EMPTY,
    element: createCellElement(id),
  };
}

export const createCells = (boardSize) => {
  const cellsAmount = boardSize * boardSize;
  const cells = [];
  for (let i = 0; i < cellsAmount; i++) {
    cells.push(createCell(i))
  };
  return cells;
}

export const buildBoard = (game, cells) => {
  cells.forEach(cell => game.append(cell.element))
}

export const changeCellStatus = (cell, status) => {
  cell.element.classList.remove(CIRCLE, CROSS);
  cell.element.classList.add(status);
  cell.status = status
}

export const getCell = (cells, id) => {
  return cells.find(cell => cell.id === Number(id));
}
