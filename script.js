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

    const printBoard = () => console.log(board);

    const getBoard = () => board;

    const addMarker = (choice, player) => {
        board[choice[0]][choice[1]] = player.getMarker();
    };

    return {getBoard, printBoard, addMarker};

})();

//Object that controls the game flow

function GameController () {

    //Player factory
    function createPlayer(name, marker) {

        this.name = name;
        this.marker = marker;
    
        const getInput = () => {
            choice = [];
            choice[0] = prompt("Give me the row.");
            choice[1] = prompt("Give me the col.");
            return choice;
        }

        const getName = () => name;
        const getMarker = () => marker;
    
        return {getInput, getName, getMarker};
    }

    const playerOne = createPlayer("Player 1", "x");
    const playerTwo = createPlayer("Player 2", "o");
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    const winConditions = (board, player) => {
        for (i=0; i<3; i++) {
            if (board[i][0] === player.getMarker() && board[i][1] === player.getMarker() 
                && board[i][2] === player.getMarker()) {
                return true;
            }
        } 
        for (j=0; j<3; j++) {
            if (board[0][j] === player.getMarker() && board[1][j] === player.getMarker() 
                && board[2][j] === player.getMarker()) {
                return true;
            }
        }
        if (board[0][0] === player.getMarker() && board[1][1] === player.getMarker() && 
            board[2][2] === player.getMarker()){
            return true;
        } else if (board[0][2] === player.getMarker() && board[1][1] === player.getMarker() && 
                    board[2][0] === player.getMarker()) {
            return true;
        } else {
            return false;
        }
    }

    const checkGameStatus = (player) => {
        const checkBoard = Gameboard.getBoard().filter((a) => (a[0] === "") || (a[1] === "") || (a[2] === ""));

        if(winConditions(Gameboard.getBoard(), player)) {
            console.log(player.getName() + " wins!")
        } else if (!checkBoard.length) {
            console.log("Its a draw!")
        } else (
            console.log("Next round.")
        )
    }

    const playRound = () => {

        console.log("Active player is: " + activePlayer.getName());
        choice = activePlayer.getInput();
        Gameboard.addMarker(choice, activePlayer);
        checkGameStatus(activePlayer);


        Gameboard.printBoard();
        switchPlayer();
    }

    return {playRound, getActivePlayer}
}

const game = GameController();
