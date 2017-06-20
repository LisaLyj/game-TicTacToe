var game = {
    user: '',        // store user's font-awesome
    computer: '',    // store computer's font-awesome
    userSign: '',    // store user's modal (X or O)
    computerSign: '',// store computer's modal (X or O)
    currentPlayer: '',// current player, user or computer
    lots: [0,1,2,3,4,5,6,7,8],   // empty lots available
    squares: ["first", "second", "third", "fourth",
              "fifth", "sixth", "seventh", "eigth", "ninth"], // id of squares
    squareSign: ["E", "E", "E", "E", "E", "E", "E", "E", "E"],// status of squares, empty or X or O

    // DOM
    signDom: null,
    selectDom: null,
    resetDom: null,
    boardDom: null,

    resetGame: function() {
        var self = this;

        // reset varialbes
        this.user = '';
        this.computer = '';
        this.userSign = '';
        this.computerSign = '';
        this.currentPlayer = '';
        this.lots = [0,1,2,3,4,5,6,7,8];
        this.squares = ["first", "second", "third", "fourth",
                  "fifth", "sixth", "seventh", "eigth", "ninth"];
        this.squareSign = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];

        // clear board
        Array.from(document.getElementsByClassName("square")).forEach(function(obj) {
            obj.innerHTML = "";
        });

        // rebind click event
        Array.from(document.getElementsByClassName("square")).forEach(function(obj) {
            obj.onclick = this.userMove.bind(this);
        }, this);

        // start from select fig
        this.boardDom.style.display = "none";
        this.resetDom.style.visibility = "hidden";
        this.signDom.style.display = "block";
    },

    setFig: function(event) {
      var id = event.target.parentElement.id;
      if (id === 'x') {
        this.user = '<span class="fa fa-times"></span>';
        this.computer = '<span class="fa fa-circle-o"></span>';
        this.userSign = 'X';
        this.computerSign = 'O';
      } else if (id === 'o') {
        this.user = '<span class="fa fa-circle-o"></span>';
        this.computer = '<span class="fa fa-times"></span>';
        this.userSign = 'O';
        this.computerSign = 'X';
      }
      this.signDom.style.display = "none";
      this.selectDom.style.display = "block";
    },

    selectFirst: function(event) {
        var id = event.target.id;
        this.selectDom.style.display = "none";
        this.boardDom.style.display = "block";
        if (id === "computer") {
            this.currentPlayer = "computer";
            this.computerMove();
        } else if (id === "you") {
            this.currentPlayer = "user";
            /* document.getElementById("U").style.visibility = "visible";*/
        }
    },

    gameOver: function() {
        document.getElementById("gameover").innerHTML = "<h1>"+this.result+"</h1>";
        this.resetDom.style.visibility = "visible";
    },

    userMove: function(event) {
        var eleId = event.target.id;
        var index = this.squares.indexOf(eleId);
        document.getElementById(eleId).innerHTML = this.user;
        document.getElementById(eleId).onclick = function() { return false; };
        this.squareSign[index] = this.userSign;
        this.lots.splice(this.lots.indexOf(index), 1);
        this.currentPlayer = "computer";
        /*
        document.getElementById("U").style.visibility = "hidden";
        document.getElementById("C").style.visibility = "visible";
        */
        if (!this.isTerminal()) {
            this.computerMove();
        } else {
            this.gameOver();
        }
    },

    computerMove: function() {
        var x = Math.floor(Math.random() * this.lots.length);
        var index = this.lots[x];
        var id = this.squares[index];
        document.getElementById(id).innerHTML = this.computer;
        document.getElementById(id).onclick = function() { return false; };
        this.squareSign[index] = this.computerSign;
        this.lots.splice(x,1);
        this.currentPlayer = "user";
        /*
        document.getElementById("C").style.visibility = "hidden";
        document.getElementById("U").style.visibility = "visible";
        */
        if (this.isTerminal()) {
            this.gameOver();
        }
    },

    isTerminal : function() {
        var B = this.squareSign;
        console.log(B);
        console.log(this.lots);

        //check rows
        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won!"; //update the state result
                return true;
            }
        }

        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won!"; //update the state result
                return true;
            }
        }

        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-won!"; //update the state result
                return true;
            }
        }

        if(this.lots.length == 0) {
            //the game is draw
            this.result = "draw!"; //update the state result
            return true;
        }
        else {
            return false;
        }
    },

    init: function() {
        //var self = this;
        this.signDom = document.getElementById("sign");
        this.selectDom = document.getElementById("select");
        this.resetDom = document.getElementsByClassName("reset")[0];
        this.boardDom = document.getElementById("board");

        Array.from(document.getElementsByTagName("button")).forEach(function(obj) {
            obj.onclick = this.setFig.bind(this);
        }, this);
        Array.from(document.getElementsByClassName("fa")).forEach(function(obj) {
            obj.onclick = this.selectFirst.bind(this);
        }, this);
        Array.from(document.getElementsByClassName("square")).forEach(function(obj) {
            obj.onclick = this.userMove.bind(this);
        }, this);
        document.getElementById("restart").onclick = this.resetGame.bind(this);
    }
};

window.onload = function() {
    game.init();
}

