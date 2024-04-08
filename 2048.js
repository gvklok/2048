var score;
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
            tileId = r.toString() + "-" + c.toString();
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

});

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide();
    }
}


function slide(row) {
    row = filterZero(row);

}
function filterZero(row){
    return row.filter(num => num != 0);//create new arrayt 

}

