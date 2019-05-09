


const store = new Vuex.Store({
    state: {
        arrPlayerMatchingCats: [],
        currentPlayerId : -1,
        arrPlayerCards : [],
        arrPlayers : [], //[{"name":"Bamshad"}, {"name":"Igal"}, ...]

        //==================
        arrDiceValues : [3,2,5,4,1],
        strMatchedRules : "-",


        intRound : 0,  //1 to 13
        intThrow : 0, // 1 to 3
        arrDicesToRoll : [], // eg. [1,4,5] i.e. dice1, dice4,dice5 from the 5 dices
        arr5dicesValues: [],  // eg. [1,4,6,2,1]        
        arrPossibleCategories :[] //eg. if dices1,1,1,1,4 then ["ettor", "två par"]    
    },
    mutations: {
        setListOfMatchingCats(state, matchingCats) {
            state.arrPlayerMatchingCats = matchingCats;
        },

        addCard(state, newPlaycard) {
            state.arrPlayerCards.push(newPlaycard);
        },

        addPlayer(state, name) {
            objNewPlayer = {"name":name};
            state.arrPlayers.push(objNewPlayer);
            //debugging:
            console.log("show all players:");
            for (i = 0; i < state.arrPlayers.length; i++) {
                 console.log("player["+i+"]: " + store.state.arrPlayers[i].name);
            }
        },

        setCurrentId (state, playerId) {
           state.currentPlayerId = playerId;
        }
        //===============================
    },
    getters: {
        playerMatchingCats: state => {
            return state.arrPlayerMatchingCats;
        },
        numberOfPlayers: state => {
            return state.arrPlayers.length;
        },
        currentPlayerId: state => {
            return state.currentPlayerId;
        },
        playerCards: state => {
            return state.arrPlayerCards;
        },

        listOfPlayers: state => {
            return state.arrPlayers;
        }
    }
})


var app = new Vue({
    el: '#yatziApp',
    store,
    /*data: {
        playerName : 'Anna',
        arrDiceValues : [3,2,5,4,1],
        strMatchedRules : "-"
    },*/
    computed: {
        showPlayerName: function() {
            return store.playerName;
            //return this.playerName;
        },
        test: function() {
            return ("2 + 2 = " + ( 2 + 2) );
        }
    },
    
    methods: {

        findMatchingCats: function(arrUserDices) {
            console.log("-received dice values: "+ arrUserDices);
            for (i = 0; i < 5; i++) {
                //do for each dice
                //if (user)
            }
            var catsMatched = ["ettor","ettpar","chans"];
            store.commit('setListOfMatchingCats', catsMatched);
            //debug:
            console.log("work with matching cats: " + 
                store.getters.playerMatchingCats);

        },

        setCurrentPlayerId: function(playerId) {
            store.commit('setCurrentId', playerId)
        },

        getCurrentPlayerId: function() {
            return store.getters.currentPlayerId;
        },

        setNexttPlayer: function() {
            if (store.getters.numberOfPlayers == 0) {
                console.log( err_1_setNextPlayer_noPlayerInList );
                app.setCurrentPlayerId(0)
            }
            else if (store.getters.numberOfPlayers == 1) {
                app.setCurrentPlayerId(0);
            }
            else if (store.getters.numberOfPlayers > 1 ) {
                const tempPlayerId = app.getCurrentPlayerId() + 1;
                if (tempPlayerId == store.getters.numberOfPlayers) {
                    //was at last player
                    app.setCurrentPlayerId(0);
                } else { app.setCurrentPlayerId(tempPlayerId); }
            }
            console.log("- current player id set to" + app.getCurrentPlayerId());
        },

        prepareAllPlayersCards: function() {
            var newCard = defaultCardTemplate;
            for (i = 0; i < store.getters.listOfPlayers.length; i++) {
                newCard.general.name = store.getters.listOfPlayers[i].name;
                store.commit('addCard', newCard);
                //debugging:
                //console.log("--loop " + i);
                console.log ("- prepared card " + i + ". name on card: "
                     + store.getters.playerCards[i].general.name);
            } 
        },

        startGame: function() {
            alert("start game..."); 
            //+ store.state.arrPlayerCards[0].general.name);            
            app.prepareAllPlayersCards();
        },

        addNewPlayer: function(newPlayerName) {           
            store.commit('addPlayer',newPlayerName);
        },

        //======================

        
/*
        getDiceValues:  function() {
            //console.log("get dice values...")
            return store.arrDiceValues;      
            //return arrDiceValues;      
        },
        showMatchingRule: function() {
            
             strReply = "given " + 
                store.arrDiceValues +
                "returns matching rules: ";
            //strReply = "given " + 
            //     this.arrDiceValues +
            //    " returns matching rules: ";
            //

            //check if 1,2,3,4,5 in arrDiceValues
            arrRules = ["Stor steg"];
            strMatchedRules = strReply + arrRules;
            alert(strMatchedRules);
        },
*/
        runThisFunction: function(value) {
            app.findMatchingCats( getDiceValues() );

            //app.setNexttPlayer(); //will go through list and sets it

            //get dice values...could reutrn false if not all ready...maybe wait 2 seconds?
            //console.log ( getDiceValues() );

            //this.addNewPlayer("Bob");
            //alert ("show arrPlayers, second player's name")
            //alert (store.state.arrPlayers[1].name)
            //will not work: alert (state.arrPlayers[1].name) but works if store mentioned
            
            //works: alert(this.$store.state.arrDiceValues);
            //works if store1 is the const and mentioned in vue: alert(store1.state.arrDiceValues);
            //also works: alert(store.state.arrDiceValues);
            //will not work: alert(this.$store.arrDiceValues);
            console.log("- runThisFunction -- value received: " + value);
           
        }
    }
})