import Game from "./engine/game.js";

let game = new Game(4);

function renderGame(game){
    $('#tile1').text(game.board[0]);
    $('#tile2').text(game.board[1]);
    $('#tile3').text(game.board[2]);
    $('#tile4').text(game.board[3]);
    $('#tile5').text(game.board[4]);
    $('#tile6').text(game.board[5]);
    $('#tile7').text(game.board[6]);
    $('#tile8').text(game.board[7]);
    $('#tile9').text(game.board[8]);
    $('#tile10').text(game.board[9]);
    $('#tile11').text(game.board[10]);
    $('#tile12').text(game.board[11]);
    $('#tile13').text(game.board[12]);
    $('#tile14').text(game.board[13]);
    $('#tile15').text(game.board[14]);
    $('#tile16').text(game.board[15]);   
}

function getScore(game){
    $('#curScore').text("Score: " + game.score);
}

function resetGame(){
    game.setupNewGame();
    renderGame(game);
    getScore(game);
    $('#win').empty();
    $('#lost').empty();
    

}

function gameWonLost(game){
    if(game.won){
        $('#win').text("CONGRAGULATIONS YOU HAVE BEATEN THE GAME! Reset to play again");
    }else if(game.over){
        $('#lost').text("Unfortunately you need to try again. Press the reset button above.")
    }

}

renderGame(game); 

$(document).keydown(function(event){
    if(event.which == 37){
        game.move('left');
    } else if(event.which == 38){
        game.move('up');
    } else if(event.which == 39){
        game.move('right');
    }else {
        game.move('down');
    }
    getScore(game);
    renderGame(game);
    gameWonLost(game);
});

$("#reset").click(resetGame)


