


const store = new Vuex.Store({
    state: {
        arrPlayerOpenCatsObjects: [],
        arrPlayerCatMatchObjects: [],
        arrPlayerCatNames: [],
        currentPlayerId : 0,
        arrPlayers : [], //[{"name":"bob", "round":1, "throw":1}, {...]
        arrPlayerCards : [],

        //==================
        arrDiceValues : [3,2,5,4,1],
        strMatchedRules : "-",



        arrDicesToRoll : [], // eg. [1,4,5] i.e. dice1, dice4,dice5 from the 5 dices
        arr5dicesValues: [],  // eg. [1,4,6,2,1]        
        arrPossibleCategories :[] //eg. if dices1,1,1,1,4 then ["ettor", "två par"]    
    },
    mutations: {
        keepArrOfOpenCatsObjects(state, getOpenCatObjects) {
            state.arrPlayerOpenCatsObjects = getOpenCatObjects;
        },
        // keep array of all matching cats
        keepArrOfCatObjects(state, getCatMatchObjects) {
            state.arrPlayerCatMatchObjects = getCatMatchObjects;
        },

        keppArrOfMatchedCatNames(state, matchingCats) {
            state.arrPlayerCatNames = matchingCats;
        },

        updateCard(state, payload) {
            // playerId, playerCard
            // alert("update card mutation called" +
            // "with payload playerId and playerCard");
            state.arrPlayerCards[payload.playerId] = payload.playerCard;            
        },

        addCard(state, newPlaycard) {
            state.arrPlayerCards.push(newPlaycard);
        },

        addPlayer(state, name) {
            objNewPlayer = {"name":name, "round":1, "roll":1};
            state.arrPlayers.push(objNewPlayer);
            //debugging:
            console.log("show all players:");
            for (i = 0; i < state.arrPlayers.length; i++) {
                 console.log("player["+i+"] name: " + store.state.arrPlayers[i].name);
            }
            app.prepareAllPlayersCards();
        },

        setCurrentId (state, playerId) {
           state.currentPlayerId = playerId;
        }
        //===============================
    },
    getters: {
        // open cats
        playerOpenCatObjects: state => {
            return state.arrPlayerOpenCatsObjects;
        },
        // all matching cats
        playerMatchCatObjects: state => {
            return state.arrPlayerCatMatchObjects;
        },
        // only cat names
        playerMatchCatNames: state => {
            return state.arrPlayerCatNames;
        },
        numberOfPlayers: state => {
            return state.arrPlayers.length;
        },
        currentPlayerId: state => {
            return state.currentPlayerId;
        },
        playerName: state => {
                // return state.arrPlayers[state.currentPlayerId].name;
                return "name123";            
        },
        playerDetail : state => {

            return state.intRound;
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

        rerenderCard: function(playerId) {
            cardWithId = "card" + playerId;
            // alert("rerender " + cardId);
            //first clear innerHTML...
            document.getElementById(cardWithId).innerHTML = "";
            app.$refs.cardComponent123.prepareTheFieldsForThisCard(playerId, "emptyjustnow");                            
        },

        registerThisOpenCatToCard: function(getCatObj) {
            toRegisterCatName = getCatObj.catName;
            toRegisterDices = getCatObj.userDices;
            toRegisterScore = getCatObj.userScore;

            // alert("register catName:" + toRegisterCatName + 
            // ", dices:" + toRegisterDices + ", userScore:" + toRegisterScore);

            // alert("currentPlayer:" + store.getters.currentPlayerId);
            
            currentCard = store.getters.playerCards[store.getters.currentPlayerId];
            
            // alert ("go through " + window.arrRuleNameRegistry.length + " cats and fill the right one" );
            for (countCatI=0; countCatI <  window.arrRuleNameRegistry.length; countCatI++ ) {
                var cardCat = window.arrRuleNameRegistry[countCatI];
                if (toRegisterCatName == cardCat) {
                    // alert ("will now update cat " + toRegisterCatName + " in card");
                    currentCard.categories[countCatI].userDices = toRegisterDices;
                    currentCard.categories[countCatI].userScore = toRegisterScore;
                    currentCard.categories[countCatI].filled = true;
                    // alert("has updated card. now mutate in arr. then rerender card");
                    store.commit({
                            type: 'updateCard',
                            playerId: store.getters.currentPlayerId,
                            playerCard: currentCard
                    });
                }
            }
            app.rerenderCard(store.getters.currentPlayerId);
        },

        returnHTMLForDices: function(arrDices) {
            var dicesImgs = "";
            if (arrDices==null) {
                return "";
            }
            for (diceCount=0; diceCount<arrDices.length; diceCount++) {
                dicesImgs += "<img " +
                " src = './static/dice" + arrDices[diceCount] + ".jpg'" +
                " id = 'dice" +  arrDices[diceCount] + "img'>";
            }
            return dicesImgs;
        },

        showOpenCatHTML: function(divId, catObj) {
            var thisCatDices = catObj.userDices
            //do dice image tag for each dice
            thisCatDicesHTML = this.returnHTMLForDices(thisCatDices);

            //add content to div:
            document.getElementById(divId).innerHTML = 
                "dices: " + thisCatDicesHTML +
                " score: " + catObj.userScore
                ;
            //do some css update to div:
            document.getElementById(divId).style.cursor = "pointer";
            //add clickable and add function to register the cat on click
            document.getElementById(divId).addEventListener("click", function() {
                app.registerThisOpenCatToCard(catObj);
            })
        },

        highlightOpenCats: function() {
            playerId =  this.getCurrentPlayerId();
            var theseOpenCatObjs = store.getters.playerOpenCatObjects;

            for (theseCatsI=0; theseCatsI<theseOpenCatObjs.length; theseCatsI++) {
                var thisDivId = "card" + playerId + "_" + theseOpenCatObjs[theseCatsI].catName;
                document.getElementById(thisDivId).style="border:3px solid orange;"
                app.showOpenCatHTML(thisDivId, theseOpenCatObjs[theseCatsI]);

            }
        },

        findOpenCats: function() {
            playerId = store.getters.currentPlayerId;
            playerCard = store.getters.playerCards[playerId];
            playerMatchCatObjects = store.getters.playerMatchCatObjects;

            console.log("playerId: "+ playerId);
            console.log("playerCard: "+ playerCard);
            console.log("playerMatchCatObjects: " + playerMatchCatObjects);
            arrOpenCatsObjs = []
            for (catObjI=0; catObjI<playerMatchCatObjects.length; catObjI++) {
                thisObj = playerMatchCatObjects[catObjI];
                console.log ( "- "  + thisObj.catName);
                if (!thisObj.filled) {
                    console.log("-- is open cat");
                    arrOpenCatsObjs.push(thisObj);
                }
            }
            console.log("- arrOpenCatsObjs: " + arrOpenCatsObjs);
            store.commit('keepArrOfOpenCatsObjects', arrOpenCatsObjs);
            console.log("- return open cat objs: " + store.getters.playerOpenCatObjects);
            return (store.getters.playerOpenCatObjects);
        },

        cardFieldIdMatches: function() { //temporary function
        //return all (filled or not filed) player card matched div ids
        playerId =  this.getCurrentPlayerId();
        console.log ( "player id: " + playerId);  
        arrMatchedCatNames = store.getters.playerMatchCatNames      
        console.log( "cats: " + arrMatchedCatNames);
        var arrCardDivs = [];
        for (cardDivi = 0; cardDivi < arrMatchedCatNames.length; cardDivi++) {
            var thisDivId = "card" + playerId + "_" + arrMatchedCatNames[cardDivi];
                        
            //fix: following only if div empty or available
            arrCardDivs.push(thisDivId);

            //then temp -- highlight the div:
            document.getElementById(thisDivId).style="border:2px solid orange;"

            //temp -- do html content:
            var thisCatName = store.getters.playerMatchCatObjects[cardDivi].catName;
            var thisCatUserDices = store.getters.playerMatchCatObjects[cardDivi].userDices;
            var thisUserScore = store.getters.playerMatchCatObjects[cardDivi].userScore;
            
            var htmlForCat = thisCatName +
                " | " + thisCatUserDices +
                " | " + thisUserScore;

            document.getElementById(thisDivId).innerHTML = htmlForCat;
            document.getElementById(thisDivId).setAttribute("catName", thisCatName);
        }

        //temp -- make clickable
        for (clickableI=0; clickableI < arrCardDivs.length; clickableI++) {
            thisDiv = arrCardDivs[clickableI];
            document.getElementById(thisDiv).addEventListener("click", function() {
                alert("register category at player card." + playerId + 
                    "\nmore detail available... " + 
                    document.getElementById(thisDiv).getAttribute("catName")
                    );
                })
        }
        

        console.log(arrCardDivs);
        // console.log( "objs: " + store.getters.playerMatchCatObjects);


        //return divs that are not filled

        //show an inner HTML for them

        //add clickable to them
        },



        findMatchingCats: function(arrUserDices) {
            //call functions from MatchCats.js
            var arrObjs = fintMatchingCats(arrUserDices);
            //save matched cats objs, also names, to store
            store.commit('keepArrOfCatObjects', arrObjs);   //the whole cat objects                     
            var catNames = return_MatchedCatNames(arrObjs);            
            store.commit('keppArrOfMatchedCatNames', catNames); //only cat names
            //debug:
            console.log("- cats: " + catNames + " can be suggested")
            console.log("work with matching cats: " + 
                store.getters.playerMatchCatNames);

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
            // store.state.arrPlayerCards[0].general.name);            
            app.prepareAllPlayersCards();
        },

        addNewPlayer: function(newPlayerName) {     
            store.commit('addPlayer',newPlayerName);
            app.$refs.cardComponent123.putAllCards();
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
            console.log(" * * * * * * *");
            app.findMatchingCats( getDiceValues() );
            // app.cardFieldIdMatches();
            app.findOpenCats();
            app.highlightOpenCats();

            //app.findMatchingCats( getDiceValues() );
            // alert ( getDiceValues() );

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