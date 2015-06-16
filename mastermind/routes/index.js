/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy
// module.exports ==> exports
exports.index = function (req, res) {
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    res.render('index', {
        title: 'Mastermind'
    });
};

exports.play = function (req, res) {
    console.log("Gra zaczeta");
    var newGame = function () {
        var i, data = [],
            puzzle = req.session.puzzle;
        for (i = 0; i < puzzle.size; i += 1) {
            data.push(Math.floor(Math.random() * puzzle.dim));
        }
        
        console.log("Wylosowane liczby: " + data);
        
        req.session.puzzle.data = data;

        return {
            "retMsg": "jfhfhfh"
        };
    };
    // poniższa linijka jest zbędna (przy założeniu, że
    // play zawsze używany będzie po index) – w końcowym
    // rozwiązaniu można ją usunąć.
    req.session.puzzle = req.session.puzzle || req.app.get('puzzle');
    /*
     * req.params[2] === wartość size
     * req.params[4] === wartość dim
     * req.params[6] === wartość max
     */
    if (req.params[2]) {
        req.session.puzzle.size = req.params[2];
    }
    
    if (req.params[4]) {
        req.session.puzzle.dim = req.params[4];
    }
    
    if (req.params[6]) {
        req.session.puzzle.max = req.params[6];
    }
    
    res.json(newGame());
};

exports.mark = function (req, res) {
    
    var data = req.session.puzzle.data;
    
    //sprawdzanie odpowiedzi
    var markAnswer = function () {
        console.log("Porownuje");
        var tmp = [];
        var perfect = 0;
        var good = 0;
        var win = false;
        var move = req.params[0].split('/');
        move = move.slice(0, move.length - 1);
        console.log(move);
        
        tmp = data.slice();
        
        // Perfekcyjne trafienia
        for(var i = 0; i < move.length; i++){
            if(move[i] == tmp[i]){
                perfect++;
                tmp[i] = -1;
                move[i] = -2;
            }
        }
        
        // Dobrze, ale przesuniete
        for(var i = 0; i < move.length; i++){
            for(var j = 0; j < move.length; j++){
                if(move[j] == tmp[i]){
                    tmp[i] = -3;
                    move[j] = -4;
                    good++;
                }
            }
        }

        // Wygrana
        if(perfect == move.length){
            console.log("WIN");
            win = true;
        } 
        
        
        return {
            "retVal": {"perfect": perfect, "good": good, "win": win},
            "retMsg": "coś o ocenie – np „Brawo” albo „Buuu”"
        };
    };
    res.json(markAnswer());
};
