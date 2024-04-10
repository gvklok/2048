var score = 0;
var board;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
   
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);

        }
    }
    setNum();
    setNum();
}
function hasEmptyTile(){
    for (let r= 0;r,rows;r++){
        for (let c=0;c<columns;c++){
            if (board[r][c]==0){
                return true;
            }
        }
    }
}
function setNum() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        // Generate random row and column indices
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        // Check if the selected tile is empty
        if (board[r][c] === 0) {
            // Randomly choose between placing a 2 or a 4
            let value = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% chance for 4
            board[r][c] = value;

            // Update the DOM to reflect the new number and styling
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = value.toString();
            tile.className = "tile"; // Reset class list
            tile.classList.add("x" + value); // Add specific class for 2 or 4

            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";//essentially clears the value so we can update it w new one
    tile.classList.value = ""; //clears the classes applied so we can change it to new one
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        }
        else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
        let initialBoard = board.map(row => row.slice()); // Creates a deep copy of the board
        switch (e.code) {
            case "ArrowLeft":
                slideLeft();
                break;
            case "ArrowRight":
                slideRight();
                break;
            case "ArrowUp":
                slideUp();
                break;
            case "ArrowDown":
                slideDown();
                break;
        }
        if (!boardsAreEqual(initialBoard, board)) {
            setNum();
        }
    }
    document.getElementById("score").innerText = score;
});
function boardsAreEqual(initialBoard, currentBoard) {
    return initialBoard.every((row, r) => row.every((cell, c) => cell === currentBoard[r][c]));
}

function filterZero(row) {
    return row.filter(num => num != 0);//create new arrayt 

}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++)
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }

    row = filterZero(row);
    //add zeros
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);

        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();//reversing it here basically make it perform teh slide left function but backwards so ots slide right
        row = slide(row);
        row.reverse();//reverse back

        board[r] = row;

        for (let c = 0; c < columns; c++) {
            tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);

        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function slideDown() {
    
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();

        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
function checkIfChanged(initialBoard, currentBoard) {
    // Compare the initial and current states of the board
    for (let r = 0; r < initialBoard.length; r++) {
        for (let c = 0; c < initialBoard[r].length; c++) {
            if (initialBoard[r][c] !== currentBoard[r][c]) {
                return false; // Return true if any changes are found
            }
        }
    }
    return true; // Return false if no changes are found
}