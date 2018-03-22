class Board() {
	
}


const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
	board = [];
	for (var i = 0; i < numberOfRows; i++) {
		row = [];
		for (var j = 0; j < numberOfColumns; j++) {
			row.push(' ');
		}
		board.push(row);
	}
	return board;
};

//console.log(generatePlayerBoard(3, 5));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
	board = [];
	for (var i = 0; i < numberOfRows; i++) {
		row = [];
		for (var j = 0; j < numberOfColumns; j++) {
			row.push(null);
		}
		board.push(row);
	}
	let numberOfBombsPlaced = 0;
	while(numberOfBombsPlaced <= numberOfBombs) {
		let randomRowIndex = Math.floor(Math.random() * numberOfRows);
		let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
		//console.log(randomRowIndex, randomColumnIndex);
		if (board[randomRowIndex][randomColumnIndex] === null) {
			board[randomRowIndex][randomColumnIndex] = 'i';
			numberOfBombsPlaced ++;
		}
	}
	return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
	const neighborOffsets = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];
	const numberOfRows = bombBoard.length;
	const numberOfColumns = bombBoard[0].length;
	let numberOfNeighbourBombs = 0;

	neighborOffsets.forEach(offset => {
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows 
			&& neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'i') {
				numberOfNeighbourBombs++;
			}
		}
	});
	return numberOfNeighbourBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'i') {
		playerBoard[rowIndex][columnIndex] = 'b';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
};

//console.log(generateBombBoard(3, 5, 3));

const printBoard = board => console.log(board.map(row => row.join(' | ')).join('\n'));

let gameboard = generatePlayerBoard(3, 5);
let bombboard = generateBombBoard(3, 5, 4);
console.log('Player Board');
printBoard(gameboard);
console.log('Bomb Board');
printBoard(bombboard);

flipTile(gameboard, bombboard, 0, 0);

console.log('Updated Player Board');
printBoard(gameboard);

