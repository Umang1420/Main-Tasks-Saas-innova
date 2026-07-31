let start = document.getElementById("start");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

start.addEventListener("click",function(){
    let board = ["","","","","","","","",""] 
    document.getElementById("btns").innerHTML = `
                                                <button class="box"></button>
                                                <button class="box"></button>
                                                <button class="box"></button>
                                                <button class="box"></button>
                                                <button class="box"></button>
                                                <button class="box"></button>
                                                <button class="box"></button>
                                                <button class="box"></button>
                                                <button class="box"></button>`;

            let boxes = document.querySelectorAll(".box");
            let turnO = false;
            boxes.forEach((box,index) => {
                box.addEventListener('click', function () {
                    if (turnO) {
                        board[index] = 'O';
                        box.innerHTML = `<i class="fa-solid fa-o fa-xl"></i>`;
                        box.style.color = 'white';
                        turnO = false;
                        box.disabled = true;
                        
                    } else {
                        board[index] = "X"
                        box.innerHTML = '<i class="fa-solid fa-x fa-xl"></i>';
                        box.style.color = 'white';
                        turnO = true;
                        box.disabled = true;
                        
                    }
                });
            });
})






function checkWinner(board){
    winPatterns.forEach(pattern)
}
