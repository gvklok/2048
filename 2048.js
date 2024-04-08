var score=0;
var board;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    // board = [ 
    //     [0,0,0,0],
    //     [0,0,0,0],
    //     [0,0,0,0],
    //     [0,0,0,0]
    // ]
    board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [4, 4, 8, 8],
        [4, 4, 8, 8]
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
    if (e.code == "ArrowLeft") {

        slideLeft();
    }
    else if (e.code == "ArrowRight") {

        slideRight();
    }

})

function filterZero(row) {
    return row.filter(num => num != 0);//create new arrayt 

}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++)
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
