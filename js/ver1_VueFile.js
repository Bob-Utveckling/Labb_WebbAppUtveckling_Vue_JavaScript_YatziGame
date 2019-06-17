


const store = new Vuex.Store({
    state: {
        boolGameStarted: false,

        arrPlayerOpenCatsObjects: [],
        arrPlayerCatMatchObjects: [],
        arrPlayerCatNames: [],
        currentPlayerId : 0,
        arrPlayers : [], //[{"name":"bob", "round":1, "roll":1}, {...]
        arrPlayerCards : [],

        strMessage: "",

        //==================
        arrDiceValues : [3,2,5,4,1],
        strMatchedRules : "-",



        arrDicesToRoll : [], // eg. [1,4,5] i.e. dice1, dice4,dice5 from the 5 dices
        arr5dicesValues: [],  // eg. [1,4,6,2,1]
        arrPossibleCategories :[] //eg. if dices1,1,1,1,4 then ["ettor", "två par"]
    },
    mutations: {

        resetGame(state) {
            //to complete:
            state.currentPlayerId = 0;
            for (var gamePlayersI=0; gamePlayersI<state.arrPlayers.length; gamePlayersI++ ) {
                //reset in arrPlayers...
                // alert("reset card for name: " + state.arrPlayers[gamePlayersI].name)
                state.arrPlayers[gamePlayersI].round = 0;
                state.arrPlayers[gamePlayersI].roll = 0;
                //reset card...
                //...reset to default card:
                state.arrPlayerCards[gamePlayersI] =
                    JSON.parse(JSON.stringify(defaultCardTemplate));
                //...set name on this card:
                state.arrPlayerCards[gamePlayersI].general.name =
                    state.arrPlayers[gamePlayersI].name;
                //present card:
                app.rerenderCard;
            }

        },

        setPlayerRollTo0(state) {
            store.state.arrPlayers[store.getters.currentPlayerId].roll=0;
        },

        incremetPlayerRoundBy1(state) {
            //if reach 13...work here//
            store.state.arrPlayers[store.getters.currentPlayerId].round += 1;
        },

        // keep array of open cats... is based on matched cats
        keepArrOfOpenCatsObjects(state, getOpenCatObjects) {
            state.arrPlayerOpenCatsObjects = getOpenCatObjects;
        },
        // keep array of all matching cats
        keepArrOfCatObjects(state, getCatMatchObjects) {
            state.arrPlayerCatMatchObjects = getCatMatchObjects;
        },

        // keep only matched cats' names
        keppArrOfMatchedCatNames(state, matchingCats) {
            state.arrPlayerCatNames = matchingCats;
        },

        //update a card through its payload.playerId
        // with the payload.playerCard provided
        updateCard(state, payload) {
            console.log("updateCard mutation called");
            state.arrPlayerCards[payload.playerId] = payload.playerCard;
        },

        //do a copy of defaultCardTemplate and prepare a new player card
        makePlayerNewCard(state, getPlayerName) {
            var newCard = JSON.parse(JSON.stringify(defaultCardTemplate));
            newCard.general.name = getPlayerName;
            state.arrPlayerCards.push(newCard);
            /*debugging:
            for (ii = 0; ii < this.$store.state.arrPlayerCards.length; ii++) {
                //console.log("from arrPlayers: player["+i1+"] name: " + store.state.arrPlayers[i1].name);
                console.log("1* * * * *");
                console.log("addCard -- from arrPlayerCards: name on card " + ii + ": (via getter): " + this.$store.getters.playerCards[ii].general.name);
                console.log("addCard -- from arrPlayerCards: name on card " + ii + ": (via state.arrPl...) " + this.$store.state.arrPlayerCards[ii].general.name);
            }
            */


        },

        //make a basic player object that keeps track of user name, round, roll
        addPlayer(state, name) {
            // alert("called addPlayer mutation with name: " + name);
            objNewPlayer = {"name":name, "round":0, "roll":0};
            //add to players array:
            state.arrPlayers.push(objNewPlayer);
            /*debugging:
            console.log("--");
            console.log("show all players:");
            for (var i1 = 0; i1 < state.arrPlayers.length; i1++) {
                console.log("from arrPlayers: player["+i1+"] name: " + store.state.arrPlayers[i1].name);
            }*/
        },

        setCurrentId (state, playerId) {
           state.currentPlayerId = playerId;
        }
        //===============================
    },
    getters: {
        //true false for game start check
        gameStarted: state => {
            return store.state.boolGameStarted;
        },

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
            return state.arrPlayers[state.currentPlayerId];
            // return state.intRound;
            // return state.arrPlayersintRound;
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

        endGame: function() {
            resultMessage = message7_end;
            results = "";
            for (resultCountI=0; resultCountI<store.getters.numberOfPlayers; resultCountI++) {
                results += "Player " + String(resultCountI + 1) + ": " +
                    store.getters.listOfPlayers[resultCountI].name +
                    " -- " +
                    store.getters.playerCards[resultCountI].sumAndTotal.total.userScore +
                    "<br>";
            }
            resultMessage += ' \
               <div id="rightBox">Yatzi champions<p>' +
               results +
               "</div>";
            this.showOrHideModalBox("show", resultMessage);
        },

        //show and hide
        showAndHideMessage: function (getMessage, getTimer) {
            store.state.strMessage = getMessage; //
            this.showOrHideModalBox("show", getMessage);
            setTimeout(function() {
                app.showOrHideModalBox("hide", "");
           }, getTimer);
        },

        //show or hide depending on the parameter
        showOrHideModalBox: function(getShowOrHide, getMessage) {
            modalMessage = document.getElementById("modalMessage").innerHTML = getMessage;
            modal = document.getElementById("myModal");
            if (getShowOrHide=="show") {
                modal.style.display="block";
            } else if (getShowOrHide=="hide") {
                modal.style.display="none";
            }
        },

        rerenderCard: function(playerId) {
            cardWithId = "card" + playerId;
            //  alert("rerender " + cardWithId);
            //first clear innerHTML...
            document.getElementById(cardWithId).innerHTML = "";
            app.$refs.cardComponent123.prepareTheFieldsForThisCard(playerId,
                                            store.getters.listOfPlayers[playerId].name);
        },

        countCardSum: function(getCurrentCard) {
            return (
              getCurrentCard.categories[0].userScore +
              getCurrentCard.categories[1].userScore +
              getCurrentCard.categories[2].userScore +
              getCurrentCard.categories[3].userScore +
              getCurrentCard.categories[4].userScore +
              getCurrentCard.categories[5].userScore
            );
        },

        countCardBonus: function(getCurrentCard) {
           return (getCurrentCard.sumAndTotal.sum.userScore >= 63 ? 50 : 0);
        },

        countTotal: function(getCurrentCard) {
            return (
                getCurrentCard.categories[0].userScore +
                getCurrentCard.categories[1].userScore +
                getCurrentCard.categories[2].userScore +
                getCurrentCard.categories[3].userScore +
                getCurrentCard.categories[4].userScore +
                getCurrentCard.categories[5].userScore +
                getCurrentCard.sumAndTotal.bonus.userScore +
                getCurrentCard.categories[6].userScore +
                getCurrentCard.categories[7].userScore +
                getCurrentCard.categories[8].userScore +
                getCurrentCard.categories[9].userScore +
                getCurrentCard.categories[10].userScore +
                getCurrentCard.categories[11].userScore +
                getCurrentCard.categories[12].userScore +
                getCurrentCard.categories[13].userScore +
                getCurrentCard.categories[14].userScore
                );
        },

        registerThisOpenCatToCard: function(getCatObj) {
            toRegisterCatName = getCatObj.catName;
            toRegisterDices = getCatObj.userDices;
            toRegisterScore = getCatObj.userScore;

            // alert("register catName:" + toRegisterCatName + 
            // ", dices:" + toRegisterDices + ", userScore:" + toRegisterScore);

            // alert("currentPlayer:" + store.getters.currentPlayerId);
            
            currentCard = store.getters.playerCards[store.getters.currentPlayerId];
            var cardCat; //iteration time cat rule name
            for (countCatI=0; countCatI <  window.arrRuleNameRegistry.length; countCatI++ ) {
                cardCat = window.arrRuleNameRegistry[countCatI];
                if (cardCat == toRegisterCatName) {
                    // alert ("will now update cat " + toRegisterCatName + " in card "+ store.getters.currentPlayerId);
                    currentCard.categories[countCatI].userDices = toRegisterDices;
                    currentCard.categories[countCatI].userScore = toRegisterScore;
                    currentCard.categories[countCatI].filled = true;
                    currentCard.sumAndTotal.sum.userScore = app.countCardSum(currentCard);
                    currentCard.sumAndTotal.bonus.userScore = app.countCardBonus(currentCard);
                    currentCard.sumAndTotal.total.userScore = app.countTotal(currentCard);
                    // alert("has updated card. now mutate in arr. then rerender card");
                    // alert ("registerThisOpenCatToCard...");
                    store.commit({
                            type: 'updateCard',
                            playerId: store.getters.currentPlayerId,
                            playerCard: currentCard
                    });
                }
            }
            app.rerenderCard(store.getters.currentPlayerId);
            //continue game process with next step:
            app.showAndHideMessage(message4_NextPlayersTurn, 1500);
            app.setNexttPlayer();
            app.continueGame("roll free dices");
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
                " score: " + catObj.userScore;
            //do some css update to div:
            document.getElementById(divId).style.cursor = "pointer";
            //add clickable and add function to register the cat on click
            document.getElementById(divId).addEventListener("click", function() {
                app.registerThisOpenCatToCard(catObj);
            })
        },

        highlightOpenCats: function() {
            // alert("highlight...store.getters.playerCards[0].categories[13].userScore: " +
            // store.getters.playerCards[0].categories[13].userScore);
            // alert("highlight...store.getters.playerCards[1].categories[13].userScore: " +
            // store.getters.playerCards[1].categories[13].userScore);

            playerId =  this.getCurrentPlayerId();
            var theseOpenCatObjs = store.getters.playerOpenCatObjects;

            for (theseCatsI=0; theseCatsI<theseOpenCatObjs.length; theseCatsI++) {
                var thisDivId = "card" + playerId + "_" + theseOpenCatObjs[theseCatsI].catName;
                document.getElementById(thisDivId).style="border:3px solid orange;"
                app.showOpenCatHTML(thisDivId, theseOpenCatObjs[theseCatsI]);

            }
        },

        //check for a true/false and return this boolean, message otherwise.
        thisCardCategoryFilled: function(getCatName) {
            playerCard = store.getters.playerCards[store.getters.currentPlayerId];
            for (catNameI=0; catNameI<arrRuleNameRegistry.length; catNameI++) {
                if (getCatName == playerCard.categories[catNameI].catName) {
                    return playerCard.categories[catNameI].filled;
                }
            }
            return ("thisCardCategoryFilled returned undefined");
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
                if (!app.thisCardCategoryFilled( thisObj.catName)) {
                    console.log("-- " + thisObj.catName + " is open cat");
                    arrOpenCatsObjs.push(thisObj);
                }
            }
            console.log("- arrOpenCatsObjs: " + arrOpenCatsObjs);

            store.commit('keepArrOfOpenCatsObjects', arrOpenCatsObjs);
            console.log("- return open cat objs: " + store.getters.playerOpenCatObjects);
            if (arrOpenCatsObjs.length==0) {
                this.showOrHideModalBox("show",message9_noOpenCategoriesAvailable);
            } else {
                return (store.getters.playerOpenCatObjects);
            }
        },

        findMatchingCats: function(arrUserDices) {
            //call functions from MatchCats.js
            var arrObjs = file1_findMatchingCats(arrUserDices);
            //save matched cats objs, also names, to store
            store.commit('keepArrOfCatObjects', arrObjs);   //the whole cat objects                     
            var catNames = return_MatchedCatNames(arrObjs);            
            store.commit('keppArrOfMatchedCatNames', catNames); //only cat names
            //debug:
            console.log("- cats: " + catNames + " have matched.")
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
            console.log("- current player id set to " + app.getCurrentPlayerId());
            store.commit('setPlayerRollTo0');
            store.commit('incremetPlayerRoundBy1');

        },

        prepareAllPlayersCards: function() {
        alert("note! prepareAllPlayerCards should assign obj to target from source and not do copy by reference...")
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

        prepareOneNewPlayerCard: function(getPlayerName) {
            alert("possible error 2: called prepareOneNewPlayerCard");
            var newCard = defaultCardTemplate;
            newCard.general.name = getPlayerName;
            console.log("prepareOneNewPlayerCard function has a newCard with name on it: " + newCard.general.name);
            //store.commit('addCard', newCard);
            this.$store.state.arrPlayerCards.push(newCard);
            for (ii = 0; ii < this.$store.state.arrPlayerCards.length; ii++) {
                //console.log("from arrPlayers: player["+i1+"] name: " + store.state.arrPlayers[i1].name);
                console.log("1* * * * *");
                console.log("addCard -- from arrPlayerCards: name on card " + ii + ": (via getter): " + this.$store.getters.playerCards[ii].general.name);
                console.log("addCard -- from arrPlayerCards: name on card " + ii + ": (via state.arrPl...) " + this.$store.state.arrPlayerCards[ii].general.name);
            }


        },


        //return true and increment dice roll by 1 if at start, if roll not 3 yet
        incrementRollCountIfNotAt3: function() {
            var currentRoll = store.getters.playerDetail.roll; // w/ assumption one player in array playerDetail
            if (currentRoll != 3) { 
                store.getters.playerDetail.roll += 1;
                /*alert ("roll set to ..." + store.getters.playerDetail.roll);*/
                return true;
            }
            else {
                /*alert("has alredy reached 3 rolls");*/ return false;
            }
        },

        continueGame: function(rollWhichDices) {
            if (store.state.boolGameStarted) {
                if (rollWhichDices == "roll free dices") {
                    rollFreeDices();

                    //    }, 1200);
                    setTimeout(function() {
                        app.rerenderCard(store.getters.currentPlayerId);
                        app.showAndHideMessage(message3_ChooseCategory, 2000);
                        console.log(" * * * * * * *");
                        app.findMatchingCats( getDiceValues() );
                        app.findOpenCats();
                        app.highlightOpenCats();
                        freeAllDices();
                    }, 4000);

                    // setTimeout(function() {


                }
                else {
                    console.log ("continue game called with false parameter");
                    alert ("continue game called with false parameter");
                }
            } else {
                app.showAndHideMessage(message5_pleaseStartGameFirst, 2500);

            }
        },

        startGame: function() {
            if (store.state.boolGameStarted ) {
                 //alert("game was already started")
                //reset player turn/round/roll if game was started on click
                store.commit('resetGame')

            }
            if (store.getters.numberOfPlayers==0) {
                app.showAndHideMessage(message8_addPlayer, 2500);

            } else {
                store.state.boolGameStarted = true;
                app.showAndHideMessage(message6_start, 2500);
                freeAllDices();
                store.commit('incremetPlayerRoundBy1');
                app.continueGame("roll free dices");
                // store.state.arrPlayerCards[0].general.name);
                // app.prepareAllPlayersCards();
            }
        },

        //at user adding name... prepare player object, player card object
        addNewPlayer: function(newPlayerName) {
            // alert("addNewPlayer...")
            store.commit('addPlayer', newPlayerName);
            // alert("saved to arrPlayers[0].name: " + this.$store.state.arrPlayers[0].name);
            store.commit('makePlayerNewCard', newPlayerName);
            //show what arrPlayerCards has as its cards...
            // alert("done addPlayer, makePlayerNewCard...now cardComp-putAllCards()...")
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
    },
    mounted() {
        store.state.strMessage = message2_Welcome;
        this.showOrHideModalBox("show",store.state.strMessage);
     
        setTimeout(function() {
             app.showOrHideModalBox("hide", "");
        }, 3000);
    }
})


