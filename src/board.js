export class Board {
	constructor (numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard () {
		return this._playerBoard;
	}

	flipTile (rowIndex, columnIndex){
		if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
			console.log('This tile has already been flipped!');
			return;
		} else if (this._bombBoard[rowIndex][columnIndex] === 'i') {
			this.playerBoard[rowIndex][columnIndex] = 'b';
		} else {
			this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
		}
		this._numberOfTiles--;
	}

	getNumberOfNeighborBombs (rowIndex, columnIndex) {
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
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfNeighbourBombs = 0;

		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColumnIndex = columnIndex + offset[1];
			if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows 
				&& neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'i') {
					numberOfNeighbourBombs++;
				}
			}
		});
		return numberOfNeighbourBombs;
	}

	hasSafeTiles() {
		return this._numberOfTiles !== this._numberOfBombs;
	}

	print(){
		console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
	} 

	static generatePlayerBoard (numberOfRows, numberOfColumns){
		const board = [];
		for (var i = 0; i < numberOfRows; i++) {
			let row = [];
			for (var j = 0; j < numberOfColumns; j++) {
				row.push(' ');
			}
			board.push(row);
		}
		return board;
	}

	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
		const board = [];
		for (var i = 0; i < numberOfRows; i++) {
			let row = [];
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
	}

}