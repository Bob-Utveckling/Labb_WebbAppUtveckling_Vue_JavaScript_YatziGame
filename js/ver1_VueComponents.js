Vue.component('start-game-component', {
    methods: {
        startGame: function() {
            app.startGame();
        }
    },
    template: `
        <div class="newplayercomponent">
            <button class="button1"
                v-on:click="startGame"
            >
                Börja spela
            </button>
        </div>
    `
})



//=======================================================



Vue.component('add-new-player-component', {
    props: [ 'name'],
    methods: {
        //function here not called. v-on:click emits instead
        showPlayerName: function() {
            //alert(this.name);
            app.runThisFunction();
        }
    },
    template: `
        <div class="newplayercomponent">
            Namn: {{ name }} <br>
            <input v-model="name">
            <button class="button1"
                v-on:click="$emit('enter-name', name)"
            >
                Add Player
            </button>
        </div>
    `
})



//=======================================================



Vue.component('players-cards-component', {
    data() {
      return {
        //arrUserDices : [2,3,2,3,1],
        //arrPlayersObj : [{"name":"Bamshad"}, {"name":"Igal"}, {"name":"Pip"}], //temp
        //PlCrComp_arrPlayerCards : [],
            //PlCrComp_arrPlayerCards[0] : defaultCardTemplate, PlCrComp_arrPlayerCards[1] : defaultCardTemplate
      }
    },
    methods: {



        setPlaceHolderForAllCards: function(howManyCards) {
            divPlaceHolder = document.getElementById("AllCards");
            divPlaceHolder.innerHTML = "";
            for (divCount=0; divCount < howManyCards; divCount++) {
                    newCardDiv = document.createElement('div');
                    cardId = "card" + divCount;
                    newCardDiv.setAttribute("id", cardId);
                    newCardDiv.style ="width:230px; border: 1px solid orange; display:inline-block;"
                    // newCardDiv.innerHTML = "id: " + cardId;
                    divPlaceHolder.appendChild(newCardDiv);
            }
        },

        prepareHowManyCards: function(howManyCards) {
            PlCrComp_arrPlayerCards = [];
            for (cardCountI=0; cardCountI < howManyCards; cardCountI++) {
                PlCrComp_arrPlayerCards[cardCountI] = defaultCardTemplate;
            }
        },

        //return the HTML for a cat already registered in player card
        returnFinalCatHTML: function(getPlayerId, getCatNum) {
            var arrDicesToSend = store.getters.playerCards[getPlayerId].categories[getCatNum].userDices;
            var thisScore = store.getters.playerCards[getPlayerId].categories[getCatNum].userScore;
            if (thisScore==0) { return "";}
            tempHTML = app.returnHTMLForDices(arrDicesToSend) + "Score: " + thisScore;
            return tempHTML;
        },

        prepareTheFieldsForThisCard: function(cardi, thisPlayerName) {
                console.log("-- card " + cardi);
                // alert("-- card " + cardi);
                cardId = "card" + cardi;
                prepCard = document.getElementById(cardId);
                

                //prepare name field
                thisDiv = document.createElement('div');
                thisDiv.id  = cardId + "_" + "playerName"; //card0_bob  
                thisDiv.style.backgroundColor = "rgb(85, 243, 85)";
                thisDiv.style.bodrer = "1px solid brown";
                thisDiv.style.fontSize = "20px";
                thisDiv.style.fontFamily = "Arial, Helvetica, sans-serif";
                thisDiv.style.padding = "5px";
                thisDiv.style.height = "35px";
                thisDiv.innerHTML = thisPlayerName;
                prepCard.appendChild(thisDiv);
                
                for ( fieldi = 0; fieldi < arrRuleNameRegistry.length; fieldi ++) {
                    var catName = PlCrComp_arrPlayerCards[cardi].categories[fieldi].catName;
                    console.log("do field of rule: " + fieldi);
                    thisDiv.style.fontFamily = "Arial, Helvetica, sans-serif";
                    
                    if (fieldi==6) {
                        thisDiv = document.createElement('div');
                        //add summma field
                        thisDiv.style.backgroundColor = "rgb(167, 233, 159)";
                        thisDiv.style.bodrer = "1px solid rgb(216, 132, 132)";
                        thisDiv.style.fontFamily = "Arial, Helvetica, sans-serif";
                        thisDiv.style.height = "35px";
                        
                        thisDiv.id  = cardId + "_" + "summa"; //card0_summa                        
                        thisDiv.innerHTML = " - ";
                        prepCard.appendChild(thisDiv);

                        //add bonus field
                        thisDiv = document.createElement('div');
                        thisDiv.style.backgroundColor = "rgb(186, 235, 140)";
                        thisDiv.style.bodrer = "1px solid rgb(247, 119, 119)";
                        thisDiv.style.fontFamily = "Arial, Helvetica, sans-serif";
                        thisDiv.style.height = "35px";
                        
                        thisDiv.id  = cardId + "_" + "bonus"; //card0_bonus                        
                        thisDiv.innerHTML = " - ";
                        prepCard.appendChild(thisDiv);
                    }

                    thisDiv = document.createElement('div');
                    thisDiv.id = cardId + "_" + catName; //card0_ettor                          
                    thisDiv.style.backgroundColor = "beige";
                    thisDiv.style.border = "1px solid brown";  
                    thisDiv.style.height = "35px";  
                    thisDiv.innerHTML = this.returnFinalCatHTML(cardi, fieldi);
                    // "id: " + thisDiv.id + "... " + "catName: " + catName + "... etc";
                    prepCard.appendChild(thisDiv);
                }
                thisDiv = document.createElement('div');
                thisDiv.id = cardId + "_" + "total"; //card0_ettor                          
                thisDiv.style.backgroundColor = "rgb(200, 235, 168)";
                thisDiv.style.border = "1px solid rgb(250, 110, 110)";  
                thisDiv.style.height = "35px";  
                thisDiv.innerHTML = "id: " + thisDiv.id + "... etc";
                prepCard.appendChild(thisDiv);

        },

        putAllCards: function() {
            console.log("-bug fix to have different names -- at start of putAllCards player 1's names: "
                 + store.getters.playerCards[0].general.name + ", "
                //    store.getters.playerCards[1].general.name + ", "
                 );
            howManyPlayers = this.$store.getters.numberOfPlayers;
            if (howManyPlayers == 0) { howManyPlayers = 1; }
            console.log("-howManyPlayers: " + howManyPlayers);
    
            this.prepareHowManyCards(howManyPlayers);
            this.setPlaceHolderForAllCards(howManyPlayers);
            
            for ( cardi = 0; cardi < howManyPlayers; cardi ++) {
                sendThisName = store.getters.listOfPlayers[cardi].name;
                // playerCards[cardi].general.name;

                this.prepareTheFieldsForThisCard(cardi, sendThisName);
                // alert("sendThisName:" + sendThisName);
            }
            console.log("-- place cards...");    
        }

     },

    mounted() {
        console.log("-- has arrPlayersObj: " + arrPlayersObj);
        //this.putAllCards();

    },  
    template: `
        <div id="CardsFrame">
        <table><tr>
        <td style="vertical-align:top;">
            <div id="cardGuide_generalFields">
                <div id="cardGuid_playerName">Deltagare</div>
                <div id="cardGuide_ettor">Ettor</div>
                <div id="cardGuide_tvaor">Tvåor</div>
                <div id="cardGuide_Treor">Treor</div>
                <div id="cardGuide_Fyror">Fyror</div>
                <div id="cardGuide_Femmor">Femmor</div>
                <div id="cardGuide_Sexor">Sexor</div>
                <div id="cardGuide_summa">Summa</div>
                <div id="cardGuide_bonus">Bonus</div>
                <div id="cardGuide_ettpar">Ett par</div>
                <div id="cardGuide_tvapar">Två par</div>
                <div id="cardGuide_Tretal">Tretal</div>
                <div id="cardGuide_Fyrtal">Fyrtal</div>
                <div id="cardGuide_litensteg">Liten steg</div>
                <div id="cardGuide_storsteg">Stor steg</div>
                <div id="cardGuide_kak">Kåk</div>
                <div id="cardGuide_chans">Chans</div>
                <div id="cardGuide_yatzi">Yatzi</div>
                <div id="cardGuide_total">Total</div>
            </div>
        </td>
        
        <td style="vertical-align:top; width:230px;">
            <div id="cardAnna_generalFields">
                <div id="cardAnna_playerName">Anna</div>
                <div id="cardAnna_ettor">&nbsp 5
                    <div id="diceImgHolder">
                        <img id="dice1img" src="./static/dice1.jpg">
                        <img id="dice1img" src="./static/dice1.jpg">
                        <img id="dice1img" src="./static/dice1.jpg">
                        <img id="dice1img" src="./static/dice1.jpg">
                        <img id="dice1img" src="./static/dice1.jpg">
                    </div>
                </div>
                <div id="cardAnna_tvaor">10
                    <div id="diceImgHolder">
                        <img id="dice2img" src="./static/dice2.jpg">
                        <img id="dice2img" src="./static/dice2.jpg">
                        <img id="dice2img" src="./static/dice2.jpg">
                        <img id="dice2img" src="./static/dice2.jpg">
                        <img id="dice2img" src="./static/dice2.jpg">
                    </div>
                </div>
                <div id="cardAnna_Treor">15
                    <div id="diceImgHolder">
                        <img id="dice3img" src="./static/dice3.jpg">
                        <img id="dice3img" src="./static/dice3.jpg">
                        <img id="dice3img" src="./static/dice3.jpg">
                        <img id="dice3img" src="./static/dice3.jpg">
                        <img id="dice3img" src="./static/dice3.jpg">
                    </div>                        
                </div>
                <div id="cardAnna_Fyror">20
                    <div id="diceImgHolder">
                        <img id="dice4img" src="./static/dice4.jpg">
                        <img id="dice4img" src="./static/dice4.jpg">
                        <img id="dice4img" src="./static/dice4.jpg">
                        <img id="dice4img" src="./static/dice4.jpg">
                        <img id="dice4img" src="./static/dice4.jpg">
                    </div>        
                </div>
                <div id="cardAnna_Femmor">25
                    <div id="diceImgHolder">
                        <img id="dice5img" src="./static/dice5.jpg">
                        <img id="dice5img" src="./static/dice5.jpg">
                        <img id="dice5img" src="./static/dice5.jpg">
                        <img id="dice5img" src="./static/dice5.jpg">
                        <img id="dice5img" src="./static/dice5.jpg">
                    </div>        
                </div>
                <div id="cardAnna_Sexor">30
                    <div id="diceImgHolder">
                        <img id="dice6img" src="./static/dice6.jpg">
                        <img id="dice6img" src="./static/dice6.jpg">
                        <img id="dice6img" src="./static/dice6.jpg">
                        <img id="dice6img" src="./static/dice6.jpg">
                        <img id="dice6img" src="./static/dice6.jpg">
                    </div>        
                </div>
                <div id="cardAnna_summa">105
                
                </div>
                <div id="cardAnna_bonus">50
                
                </div>
                <div id="cardAnna_ettpar">12
                    <div id="diceImgHolder">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">
                    </div>        
                </div>
                <div id="cardAnna_tvapar">22
                    <div id="diceImgHolder">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceyimg" src="./static/dicey.jpg">        
                        <img id="diceyimg" src="./static/dicey.jpg">        
                    </div>
                </div>
                <div id="cardAnna_Tretal">18
                    <div id="diceImgHolder">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">        
                    </div>        
                </div>
                <div id="cardAnna_Fyrtal">24
                    <div id="diceImgHolder">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">        
                        <img id="diceximg" src="./static/dicex.jpg">        
                    </div>                
                </div>
                <div id="cardAnna_litensteg">15
                    <div id="diceImgHolder">
                        <img id="dice1img" src="./static/dice1.jpg">
                        <img id="dice2img" src="./static/dice2.jpg">
                        <img id="dice3img" src="./static/dice3.jpg">        
                        <img id="dice4img" src="./static/dice4.jpg">        
                        <img id="dice5img" src="./static/dice5.jpg">        
                    </div>            
                </div>
                <div id="cardAnna_storsteg">20
                    <div id="diceImgHolder">
                        <img id="dice2img" src="./static/dice2.jpg">
                        <img id="dice3img" src="./static/dice3.jpg">
                        <img id="dice4img" src="./static/dice4.jpg">        
                        <img id="dice5img" src="./static/dice5.jpg">        
                        <img id="dice6img" src="./static/dice6.jpg">        
                    </div>
                </div>
                <div id="cardAnna_kak">28
                    <div id="diceImgHolder">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">
                        <img id="diceximg" src="./static/dicex.jpg">        
                        <img id="diceyimg" src="./static/dicey.jpg">        
                        <img id="diceyimg" src="./static/dicey.jpg">        
                    </div>
                </div>
                <div id="cardAnna_chans">30
                    <div id="diceImgHolder">
                        <img id="dicechansimg" src="./static/dicechans.jpg">
                        <img id="dicechansimg" src="./static/dicechans.jpg">
                        <img id="dicechansimg" src="./static/dicechans.jpg">        
                        <img id="dicechansimg" src="./static/dicechans.jpg">        
                        <img id="dicechansimg" src="./static/dicechans.jpg">        
                    </div>        
                </div>
                <div id="cardAnna_yatzi">50
                    <div id="diceImgHolder">
                        <img id="diceyatziimg" src="./static/diceyatzi.jpg">
                        <img id="diceyatziimg" src="./static/diceyatzi.jpg">
                        <img id="diceyatziimg" src="./static/diceyatzi.jpg">
                        <img id="diceyatziimg" src="./static/diceyatzi.jpg">
                        <img id="diceyatziimg" src="./static/diceyatzi.jpg">
                    </div>                
                </div>
                <div id="cardAnna_total">374
                
                </div>
            </div>
        </td>
        
        <td style="vertical-align:top; width:100%; display:inline-block;">
            <div id="AllCards">                
            </div>
        </td>
        </tr>
        </table>

        </div>

    `
})



//=======================================================



Vue.component('some-game-info-component', {
    data: function() {
        return {
            currentPlayer : this.$store.getters.currentPlayerId,
        }
    }, 
    methods: {

    },
    computed: {
        getCurrentPlayer: function() {
            return this.$store.getters.currentPlayerId;
        },
        getPlayerName: function() {
            if (this.$store.getters.playerDetail == null) {
                return " ";
            } else {
                return this.$store.getters.playerDetail.name;
            }            
        },
        getPlayerNote: function() {
            var thisNote = "";
            if (this.$store.getters.playerDetail == null) {
                thisNote  = "No player added."
            }
            else {
                thisNote =  "Player " +
                    (this.$store.getters.currentPlayerId + 1) +
                    ", " + this.$store.getters.playerDetail.name +
                    " -- Kör!";
            }
            return thisNote;
        },

        getRound: function() {
            //can get fom current player
            //this.currentPlayer
            //return this.$store.getters.listOfPlayers[0].round
            if (this.$store.getters.playerDetail == null) {
                return " - ";
            } else {
                return this.$store.getters.playerDetail.round;
            };
            // return 1
        },
        getRoll: function() {
            //can be from current player
            if (this.$store.getters.playerDetail == null) {
                return " - ";
            } else {
                return this.$store.getters.playerDetail.roll;
            };
            // return 1;
        }
    },
    template: `
        <div id="infoBox">
        - {{ getPlayerNote }} <br>
        - round {{ getRound }} of 13 <br>
        - roll {{ getRoll }} of 3 <br>
        </div>
    `
})



//=======================================================



