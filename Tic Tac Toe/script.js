let start = document.getElementById("start");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");



let winPatterns = [ [0, 1, 2], [3, 4, 5],
                    [0, 3, 6], [1, 4, 7],
                    [0, 4, 8], [2, 5, 8], 
                    [2, 4, 6], [6, 7, 8] ];
    
let board = [];
let turnO = false;
let gameActive = true; 
let xscore=0;
let oscore=0;
let gamesplayed = 1;
function st() {
    
    board = ["", "", "", "", "", "", "", "", ""];
    turnO = false;
    gameActive = true;
    
    document.getElementById("btns").innerHTML = `
        <button class="box"></button><button class="box"></button><button class="box"></button>
        <button class="box"></button><button class="box"></button><button class="box"></button>
        <button class="box"></button><button class="box"></button><button class="box"></button>`;
     document.getElementById("restart").innerHTML = `<button onclick="restart()">Restart</button>`;
    
    let boxes = document.querySelectorAll(".box");
    
    boxes.forEach((box, index) => {
        box.addEventListener('click', function () {
  
            if (!gameActive) return;

            let currentSymbol = turnO ? "O" : "X";
            let iconHtml = turnO ? '<i class="fa-solid fa-o fa-xl"></i>' : '<i class="fa-solid fa-x fa-xl"></i>';

            board[index] = currentSymbol;
            box.innerHTML = iconHtml;
            box.style.color = 'white';
            box.disabled = true;
            
            checkWinner(board);


            turnO = !turnO; 
            if(!turnO){
                document.getElementById("xscore").style.border = "2px solid yellow";
                document.getElementById("oscore").style.border = "none";
            }else{
                document.getElementById("oscore").style.border = "2px solid yellow";
                document.getElementById("xscore").style.border = "none";
            }
        });
    });
}


start.addEventListener("click", function(){
   st();
})
function restart(){
    st();
    gamesplayed++;
    document.getElementById("gamenumber").innerHTML = gamesplayed;
}
function checkWinner(board) {
    let winner;
    winPatterns.forEach((pattern) => {
        let [a, b, c] = pattern;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            document.getElementById("btns").innerHTML = `${board[a]} Won!`
          
             if(board[a] === "X"){
                xscore++;
                 document.getElementById("xscore1").innerHTML = `${xscore}`;
             }else{
                oscore++;
                document.getElementById("oscore1").innerHTML = `${oscore}`;
             }
             
            gameActive = false; 
        }
        let isdraw = !board.includes("");
        if(isdraw){
            document.getElementById("btns").innerHTML = `Draw!`
        }
    });
}


function scorecard(){
    let player1name = player1.value.trim();
    let player2name = player2.value.trim();
    if(player1name !== "" && player2name !== ""){
        
    document.getElementById("game-box").innerHTML = `               
     <div class="scorecard">
                    <div class="gamenumber">
                        <div id="gamecount">
                            <label>Games Played</label>
                            <p id="gamenumber">1</p>
                        </div>
                    </div>
                   <div class="score">
                     <div id="xscore">
                        <label>${player1name} <i class="fa-solid fa-x fa-xs"></i><br></label>
                        <div>Score:<a id="xscore1"></a></div>
                    </div>
                    <div id="oscore">
                        <label>${player2name} <i class="fa-solid fa-o fa-xs"></i><br></label>
                        <div>Score:<a id="oscore1"></a></div>
                    </dix>
                    </div>
                   </div>
                    
                     <div id="restart">
                        <button onclick="restart()">Restart</button>   
                    </div>
                    
                    </div>`
        
    }else{
        return alert("ADD NAMES!");
    }
}


