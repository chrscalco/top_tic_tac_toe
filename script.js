//Create array for the board

const Gameboard = (function() {

    const size = 3;
    const board = [];

    for (i=0; i<size; i++) {
        board[i] = []
        for (j=0; j<size; j++) {
            board[i].push('');
        }
    }

    const restartBoard = () => {
        for (i=0; i<size; i++) {
            for (j=0; j<size; j++) {
                board[i][j] = '';
            }
        }
    }

    const getBoard = () => board;

    const addMarker = (row, col, player) => {
        board[row][col] = player.getMarker();
    };

    return {getBoard, restartBoard, addMarker};

})();

//Object that controls the game flow

function GameController () {

    //Player factory
    function createPlayer(name, marker) {

        this.name = name;
        this.marker = marker;
        points = 0;

        const getName = () => name;
        const getMarker = () => marker;

        const setName = (newName) => {
            name = newName;
        }

        const addPoint = () => points++;
    
        return {getName, getMarker, setName, addPoint};
    }

    const playerOne = createPlayer("Player 1", "x");
    const playerTwo = createPlayer("Player 2", "o");
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const setNames = (player1Name, player2Name) => {
        players[0].setName(player1Name);
        players[1].setName(player2Name);
    }

    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    const winConditions = (board, marker) => {
        //ROWS
        for (i=0; i<3; i++) {
            if (board[i][0] === marker && board[i][1] === marker && board[i][2] === marker) {
                return true;
            }
        } 
        //COLUMNS
        for (j=0; j<3; j++) {
            if (board[0][j] === marker && board[1][j] === marker && board[2][j] === marker) {
                return true;
            }
        }
        //DIAGONALS
        if (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker){
            return true;
        } else if (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker) {
            return true;
        } else {
            return false;
        }
    }
    
    const checkGameStatus = (player) => {
        const checkBoard = Gameboard.getBoard().filter((a) => (a[0] === "") || (a[1] === "") || (a[2] === ""));

        if(winConditions(Gameboard.getBoard(), player.getMarker())) {
            alert(player.getName() + " wins!")
            activePlayer.addPoint();
            Gameboard.restartBoard();
        } else if (!checkBoard.length) {
            alert("Its a draw!")
            Gameboard.restartBoard();
        } else (
            console.log("Next round.")
        )
    }

    const playRound = (row, col) => {

        console.log("Active player is: " + activePlayer.getName());
        Gameboard.addMarker(row, col, activePlayer);
        checkGameStatus(activePlayer);
        switchPlayer();
    }

    return {playRound, getActivePlayer, setNames};
}

function ScreenController() {

    const startButton = document.querySelector(".start-button");
    const nameDialog = document.querySelector("#name-dialog");
    const dialogButton = document.querySelector("#save-names");

    const restartButton = document.querySelector(".restart-button");

    startButton.addEventListener("click", () => {
        nameDialog.showModal();
    })

    dialogButton.addEventListener("click", (e) => {
        e.preventDefault();
        game.setNames(document.getElementById("player1-name").value, document.getElementById("player2-name").value);
        nameDialog.close();
        updateScreen();
    })

    restartButton.addEventListener("click", () => {
        Gameboard.restartBoard();
        updateScreen();
    })

    const game = GameController();
    const playerTurnDiv = document.querySelector('.player');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {

        boardDiv.textContent = '';

        const board = Gameboard.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = activePlayer.getName() + "'s turn.";

        for (i=0; i<3; i++) {
            for (j=0; j<3; j++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = i;
                cellButton.dataset.column = j;
                cellButton.textContent = board[i][j];
                boardDiv.appendChild(cellButton);
                if (board[i][j] === '') {
                    cellButton.addEventListener("click", clickHandlerBoard);
                }
            }
        }

    }

    function clickHandlerBoard(e) {
        const col = e.target.dataset.column;
        const row = e.target.dataset.row;

        console.log({col, row});

        game.playRound(row, col);
        updateScreen();
    }
      
}

ScreenController();