let start = document.getElementById("start");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

let mode = "two";
let board = [];
let turnO = false;
let gameActive = true;
let xscore = 0;
let oscore = 0;
let gamesplayed = 1;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function showTwoPlayer() {
    mode = "two";
    document.getElementById("pl2div").style.display = "block";
}

function showComputer() {
    mode = "computer";
    document.getElementById("pl2div").style.display = "none";
}

function updateTurnHighlight() {
    let xBox = document.getElementById("xscore");
    let oBox = document.getElementById("oscore");

    if (turnO) {
        xBox.style.border = "2px solid transparent";
        xBox.style.boxShadow = "none";
        
        oBox.style.border = "2px solid #e74c3c";
        oBox.style.boxShadow = "0 0 12px rgba(231, 76, 60, 0.6)";
    } else {
        oBox.style.border = "2px solid transparent";
        oBox.style.boxShadow = "none";

        xBox.style.border = "2px solid #2ecc71";
        xBox.style.boxShadow = "0 0 12px rgba(46, 204, 113, 0.6)";
    }
}

function scorecard() {
    let player1name = player1.value.trim();
    if (!player1name) {
        alert("ADD PLAYER NAME!");
        return;
    }

    let player2name = "";
    if (mode === "two") {
        player2name = player2.value.trim();
        if (!player2name) {
            alert("ADD PLAYER 2 NAME!");
            return;
        }
    } else {
        player2name = "Computer";
    }

    document.getElementById("game-box").innerHTML = `
        <div class="scorecard">
            <div class="gamenumber">
                <div id="gamecount">
                    <label>Games Played</label>
                    <p id="gamenumber">1</p>
                </div>
            </div>
            <div class="score">
                <div id="xscore" style="transition: all 0.3s ease; border-radius: 8px;">
                    <label id="p1label">${player1name} <i class="fa-solid fa-x fa-xs"></i></label>
                    <div>Score : <a id="xscore1">0</a></div>
                </div>
                <div id="oscore" style="transition: all 0.3s ease; border-radius: 8px;">
                    <label id="p2label">${player2name} <i class="fa-solid fa-o fa-xs"></i></label>
                    <div>Score : <a id="oscore1">0</a></div>
                </div>
            </div>
            <div id="restart">
                <button onclick="restart();">Restart</button>
                <button onclick="location.reload();">New Game</button>
            </div>
        </div>
    `;

    st();
}

function st() {
    board = Array(9).fill("");
    turnO = false;
    gameActive = true;

    document.getElementById("btns").innerHTML = Array(9).fill('<button class="box"></button>').join("");
    updateTurnHighlight();

    let boxes = document.querySelectorAll(".box");

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (!gameActive || board[index] !== "") return;
            if (mode === "computer" && turnO) return;

            let currentSymbol = turnO ? "O" : "X";
            let icon = turnO ? '<i class="fa-solid fa-o fa-xl"></i>' : '<i class="fa-solid fa-x fa-xl"></i>';

            board[index] = currentSymbol;
            box.innerHTML = icon;
            box.style.color = "white";
            box.disabled = true;

            checkWinner(board);
            if (!gameActive) return;

            if (mode === "two") {
                turnO = !turnO;
                updateTurnHighlight();
            } else {
                turnO = true;
                updateTurnHighlight();
                setTimeout(computerMove, 500);
            }
        });
    });
}

function computerMove() {
    if (!gameActive) return;

    function findBestIndex(symbol) {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            let values = [board[a], board[b], board[c]];
            
            if (values.filter(v => v === symbol).length === 2 && values.includes("")) {
                if (board[a] === "") return a;
                if (board[b] === "") return b;
                if (board[c] === "") return c;
            }
        }
        return null;
    }

    let moveIndex = null;

    moveIndex = findBestIndex("O");

    if (moveIndex === null) {
        moveIndex = findBestIndex("X");
    }

    if (moveIndex === null && board[4] === "") {
        moveIndex = 4;
    }

    if (moveIndex === null) {
        let empty = board.reduce((acc, val, idx) => (val === "" ? [...acc, idx] : acc), []);
        if (empty.length === 0) return;
        moveIndex = empty[Math.floor(Math.random() * empty.length)];
    }

    let boxes = document.querySelectorAll(".box");
    board[moveIndex] = "O";
    boxes[moveIndex].innerHTML = '<i class="fa-solid fa-o fa-xl"></i>';
    boxes[moveIndex].style.color = "white";
    boxes[moveIndex].disabled = true;

    checkWinner(board);
    if (!gameActive) return;

    turnO = false;
    updateTurnHighlight();
}

function restart() {
    gamesplayed++;
    document.getElementById("gamenumber").innerHTML = gamesplayed;
    st();
}

function checkWinner(board) {
    let winner = false;
    let boxes = document.querySelectorAll(".box");

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            boxes[a].classList.add("win-tile");
            boxes[b].classList.add("win-tile");
            boxes[c].classList.add("win-tile");

            let winnerName = "";
            if (board[a] === "X") {
                xscore++;
                document.getElementById("xscore1").innerHTML = xscore;
                winnerName = player1.value.trim();
            } else {
                oscore++;
                document.getElementById("oscore1").innerHTML = oscore;
                winnerName = (mode === "two") ? player2.value.trim() : "Computer";
            }

            gameActive = false;
            winner = true;

            setTimeout(() => {
                document.getElementById("btns").innerHTML = `
                    <div class="winner-msg">
                        <i class="fa-solid fa-trophy trophy-icon"></i>
                        <h2>${winnerName} Wins!</h2>
                    </div>
                `;
            }, 600);
            break;
        }
    }

    if (!winner && !board.includes("")) {
        gameActive = false;
        setTimeout(() => {
            document.getElementById("btns").innerHTML = `
                <div class="winner-msg draw-msg">
                    <i class="fa-solid fa-handshake trophy-icon"></i>
                    <h2>It's a Draw!</h2>
                </div>
            `;
        }, 400);
    }
}