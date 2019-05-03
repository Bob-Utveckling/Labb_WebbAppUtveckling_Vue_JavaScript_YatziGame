


const store = new Vuex.Store({
    state: {
        arrPlayers : [{"name":"Bamshad"}],
        //arrPlayers : ["bob","bamshad"],
        //aPlayCard: PlayCard,

        //==================
        currentPlayer : 1,

        playerName : 'Anna',
        arrDiceValues : [3,2,5,4,1],
        strMatchedRules : "-",


        intRound : 0,  //1 to 13
        intThrow : 0, // 1 to 3
        arrDicesToRoll : [], // eg. [1,4,5] i.e. dice1, dice4,dice5 from the 5 dices
        arr5dicesValues: [],  // eg. [1,4,6,2,1]        
        arrPossibleCategories :[] //eg. if dices1,1,1,1,4 then ["ettor", "två par"]
    

    },
    mutations: {

        addNewPlayer(name) {
            objNewPlayer = {"name":name}
            //store.arrPlayers.add(objNewPlayer);
            alert('test');
        },

        //===============================
        setNextPlayer (currentPlayer) {
            //given a player change to next.
           state.currentPlayer++
        }
    }
})


var app = new Vue({
    el: '#gamecard',
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

        addNewPlayer: function(newPlayerName) {
            store.commit('addNewPlayer',newPlayerName)
            alert("test1");
        },


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
        runThisFunction: function() {
           //works: alert(this.$store.state.arrDiceValues);
           //works if store1 is the const and mentioned in vue: alert(store1.state.arrDiceValues);
           //also works: alert(store.state.arrDiceValues);
           //will not work: alert(this.$store.arrDiceValues);
           this.addNewPlayer("Bob");
           //alert ("show arrPlayers, second player's name")
           alert (store.state.arrPlayers[1].name)
        //    alert (store.state.currentPlayer)
        }
    }
})