var dices = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;' ];


function setRandomPeriod() {
  return (
    Math.floor (
      Math.random() * (2000 - 300) + 300
      ));
    }

  //return all dices values
  function getDiceValues() {
        console.log("- get all dice values...")
        if (boolDice1Ready &
            boolDice2Ready &
            boolDice3Ready &
            boolDice4Ready &
            boolDice5Ready) {
                return [dice1Value, dice2Value, dice3Value, dice4Value, dice5Value];
            }
        else {
            console.log("- do check: dices are not stopped before getting all dice values.");
            return ([0,0,0,0,0]);
        }
    }

// ****************** dice1
var dice1;
var stopped1 = true;
var t1;
var random1;
var boolDice1Ready;
var dice1Value;

function change1() {
  random1 = Math.floor(Math.random()*6);
  dice1.innerHTML = dices[random1];
}

function startStopRandomly1() {
    boolDice1Ready = false;
    var randomPeriod1 = setRandomPeriod()
    console.log("start, stop 1 randomly at " + randomPeriod1);
    stopstart1();
    setTimeout(function() {
        stopstart1();
        boolDice1Ready = true;
        console.log("stop dice 1 now");
        }, randomPeriod1
    );


}

function stopstart1() {
    if(stopped1) {
      stopped1 = false;
      t1 = setInterval(change1, 100);
    } else {
      clearInterval(t1);
      stopped1 = true;
      dice1Value = parseInt(random1) + 1;
    }
  }


// ****************** dice2
var dice2;
var stopped2 = true;
var t2;
var random2;
var boolDice2Ready;
var dice2Value;

function change2() {
  random2 = Math.floor(Math.random()*6);
  dice2.innerHTML = dices[random2];
}

function startStopRandomly2() {
    boolDice2Ready = false;
    var randomPeriod2 = setRandomPeriod()
    console.log("start, stop 2 randomly at " + randomPeriod2);
    stopstart2();
    setTimeout(function() {
        stopstart2();
        //clearInterval(t);
        console.log("stop dice 2 now");
        boolDice2Ready = true;
        }, randomPeriod2
    );
}

function stopstart2() {
    if(stopped2) {
      stopped2 = false;
      t2 = setInterval(change2, 100);
    } else {
      clearInterval(t2);
      stopped2 = true;
      dice2Value = parseInt(random2) + 1;
    }
  }


// ****************** dice3
var dice3;
var stopped3 = true;
var t3;
var random3;
var boolDice3Ready;
var dice3Value;

function change3() {
  random3 = Math.floor(Math.random()*6);
  dice3.innerHTML = dices[random3];
}

function startStopRandomly3() {
    boolDice3Ready = false;
    var randomPeriod3 = setRandomPeriod()
    console.log("start, stop randomly 3 at " + randomPeriod3);
    stopstart3();
    setTimeout(function() {
        stopstart3();
        //clearInterval(t);
        console.log("stop dice 3 now");
        boolDice3Ready = true;
        }, randomPeriod3
    );
}

function stopstart3() {
    if(stopped3) {
      stopped3 = false;
      t3 = setInterval(change3, 100);
    } else {
      clearInterval(t3);
      stopped3 = true;
      dice3Value = parseInt(random3) + 1;
    }
  }



// ****************** dice4
var dice4;
var stopped4 = true;
var t4;
var random4;
var boolDice4Ready;
var dice4Value;

function change4() {
  random4 = Math.floor(Math.random()*6);
  dice4.innerHTML = dices[random4];
}

function startStopRandomly4() {
    boolDice4Ready = false;
    var randomPeriod4 = setRandomPeriod()
    console.log("start, stop randomly 4 at " + randomPeriod4);
    stopstart4();
    setTimeout(function() {
        stopstart4();
        //clearInterval(t);
        console.log("stop dice 4 now");
        boolDice4Ready = true;
        }, randomPeriod4
    );
}

function stopstart4() {
    if(stopped4) {
      stopped4 = false;
      t4 = setInterval(change4, 100);
    } else {
      clearInterval(t4);
      stopped4 = true;
      dice4Value = parseInt(random4) + 1;
    }
  }

// ****************** dice5
var dice5;
var stopped5 = true;
var t5;
var random5;
var boolDice5Ready;
var dice5Value;

function change5() {
  random5 = Math.floor(Math.random()*6);
  dice5.innerHTML = dices[random5];
}

function startStopRandomly5() {
    boolDice5Ready = false;
    var randomPeriod5 = setRandomPeriod();
    console.log("start, stop randomly 5 at " + randomPeriod5);
    stopstart5();
    setTimeout(function() {
        stopstart5();
        //clearInterval(t);
        console.log("stop dice 5 now");
        boolDice5Ready = true;
        }, randomPeriod5
    );
}

function stopstart5() {
    if(stopped5) {
      stopped5 = false;
      t5 = setInterval(change5, 100);
    } else {
      clearInterval(t5);
      stopped5 = true;
      dice5Value = parseInt(random5) + 1;
    }
  }




// ================= on load rolls
window.onload = function() {
  dice1 = document.getElementById("dice1");
  startStopRandomly1();

  dice2 = document.getElementById("dice2");
  startStopRandomly2();

  dice3 = document.getElementById("dice3");
  startStopRandomly3();

  dice4 = document.getElementById("dice4");
  startStopRandomly4();

  dice5 = document.getElementById("dice5");
  startStopRandomly5();

  console.log("all five dice values: " + getDiceValues());

}
// // =================



var arrLockedDices = [false, false, false, false, false];
function lockDice(givenDice) {
    console.log("- lock/unlock given dice: " + givenDice);
    thisDice = document.getElementById(givenDice);
    switch (givenDice) {
        case "dice1":
            arrLockedDices[0] = !arrLockedDices[0];
            arrLockedDices[0] == true ? thisDice.style.backgroundImage = "url('./static/lock.jpg')" : thisDice.style.backgroundImage="";
            break;
        case "dice2":
            arrLockedDices[1] = !arrLockedDices[1];
            arrLockedDices[1] == true ? thisDice.style.backgroundImage = "url('./static/lock.jpg')" : thisDice.style.backgroundImage="";
            break;
        case "dice3":
            arrLockedDices[2] = !arrLockedDices[2];
            arrLockedDices[2] == true ? thisDice.style.backgroundImage = "url('./static/lock.jpg')" : thisDice.style.backgroundImage="";
            break;
        case "dice4":
            arrLockedDices[3] = !arrLockedDices[3];
            arrLockedDices[3] == true ? thisDice.style.backgroundImage = "url('./static/lock.jpg')" : thisDice.style.backgroundImage="";
            break;
        case "dice5":
            arrLockedDices[4] = !arrLockedDices[4];
            arrLockedDices[4] == true ? thisDice.style.backgroundImage = "url('./static/lock.jpg')" : thisDice.style.backgroundImage="";
            break;
    }
    console.log("arrLockedDices: " + arrLockedDices);
}

function freeAllDices() {
    //free dices: set to true. then toggle in lockDice()
    arrLockedDices = [true, true, true, true, true];
    lockDice("dice1");
    lockDice("dice2");
    lockDice("dice3");
    lockDice("dice4");
    lockDice("dice5");
    updateDiceRollMessage("Kasta om alla tärningar: Klicka här");
}

function updateDiceRollMessage(dicesMessage) {
      //prepare the message with list of locked dices, free dices to be rolled:
            messageContainer = document.getElementById("row1_5_rollAllOrLooseDices");
            diceList = ""; //
            strLockedDices = "";
            strFreeDices = ""
            var c;
            for (i=0; i<5; i++) {
              c = i + 1;
              diceFaceVar = 'random' + c; //name of global var corresponding to dice 1 to 5
              thisDiceFace = window[diceFaceVar];
              if (arrLockedDices[i] == true) {
                  strLockedDices += dices[thisDiceFace] + "Tärning " + c + " ";
              } else if (arrLockedDices[i] == false) {
                  strFreeDices += dices[thisDiceFace] + "Tärning " +c + " ";
              }
            }

            console.log("lockedDice message: " + strLockedDices);
            console.log("freeDice message: " + strFreeDices);

            if (strLockedDices != "") { strLockedDices="Lås "+strLockedDices; }
            if (strFreeDices != "") { strFreeDices="Kasta om "+strFreeDices; }

            // strDiceRollMessage = "Klicka för att kasta om alla tärningar";
            strDiceRollMessage = strLockedDices + "<hr>" + strFreeDices;
            if (dicesMessage==undefined) {
                messageContainer.innerHTML = strDiceRollMessage;
            }
            else {
                messageContainer.innerHTML = dicesMessage;
            }
    }



// =================  main function
function rollFreeDices() {
    if (!store.getters.gameStarted) {
        app.showAndHideMessage(message5_pleaseStartGameFirst, 2500);
    }
    else if (store.getters.gameStarted) {
        if (app.incrementRollCountIfNotAt3() ) {
            console.log("- roll the free dices")
            var c = 0;
            for (diceRollI=0; diceRollI<5; diceRollI++) {
                c = diceRollI + 1;
                if (arrLockedDices[diceRollI] == false) {
                    //can roll dice. not checked to dice lock true
                    var dynFunName = "startStopRandomly" + c;
                    console.log ("- run: " + dynFunName);
                    window[dynFunName]();
                }
            }
        } else if (!app.incrementRollCountIfNotAt3()) {
            //the returning false is assumed to be because has reached 3
            app.showAndHideMessage(message4_alreadyReached3Rolls, 2500);
        }
    }
}



// ================= dices made clickable
document.getElementById("dice1").addEventListener("click", function() {
   //prepareToRollAgain("dice1");
   lockDice("dice1");
   updateDiceRollMessage();
});
document.getElementById("dice2").addEventListener("click", function() {
  //prepareToRollAgain("dice2");
  lockDice("dice2");
  updateDiceRollMessage();
});

document.getElementById("dice3").addEventListener("click", function() {
  //prepareToRollAgain("dice3");
  lockDice("dice3");
  updateDiceRollMessage();
});
document.getElementById("dice4").addEventListener("click", function() {
  //prepareToRollAgain("dice4");
  lockDice("dice4");
  updateDiceRollMessage();
});
document.getElementById("dice5").addEventListener("click", function() {
  //prepareToRollAgain("dice5");
  lockDice("dice5");
  updateDiceRollMessage();
});

// ================= divs for clicking to roll all or selected dices
document.getElementById("row1_5_rollAllOrLooseDices").addEventListener("click", function() {
  //   alert("roll all or open dices");
  //   rollFreeDices();
  app.continueGame("roll free dices");
});
