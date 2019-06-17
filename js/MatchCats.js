


//thisMatchDetail = {"catName":"fyror", userDices:[4,4], userScore:8},

arrToStr = function(givenArr) {
	var tempStr;
	tempStr = givenArr.toString();
	tempStr = tempStr.replace(/,/g, "");	
	return tempStr;
}

//does not work. returns:
//tempSum: arr => arr.reduce((a,b) => a + b, 0)
arrSum0 = function(arr) {
		tempArrSum = arr => arr.reduce((a,b) => a + b, 0);
		return tempArrSum;
}

arrSum = function (arr) {
	console.log("do sum of array, given: " + arr);
	tempArrSum = 0;
	if (arr != null) {	//if valid arr sent
		for (h=0; h<arr.length; h++) {
			tempArrSum = tempArrSum + parseInt(arr[h]);
		}
		return tempArrSum;
	}
	else return 0;
}

isMoreThanZero = function (num) {
	return ( num > 0 );
}


arrRuleNameRegistry = ["ettor", "tvaor", "treor", "fyror", "femmor", "sexor",
						"ettpar", "tvapar", "tretal", "fyrtal", "litensteg", "storsteg",
						"kak", "chans", "yatzi"];
window.arrRuleNameRegistry = arrRuleNameRegistry;

file1_findMatchingCats = function(arrUserDices) {
	console.log("- match cats with dices: " + arrUserDices); //arrUserDices=[5,5,2,5,2]
	arrValidDices = [];
	sumOfDices = 0;

	arrCatMatchObjects = [];

	for (i=0; i < arrRuleNameRegistry.length; i++) {
		console.log("\n________\ncheck rule: " + arrRuleNameRegistry[i] );
		if (arrRuleNameRegistry[i] == "ettor") {
				var catName = "ettor";
				var patt1 = /(1)/g;
				arrValidDices = (arrToStr(arrUserDices)).match(patt1); //eg. [1,1,1]
				//console.log ("valid dices: " + arrValidDices);				
				sumOfDices = arrSum(arrValidDices);				
				if ( isMoreThanZero(sumOfDices) ) { //possible cat match
					objReturn = {"catName":catName, "userDices":arrValidDices, "userScore": sumOfDices};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		} else if (arrRuleNameRegistry[i] == "tvaor") {
				var catName = "tvaor";
				var patt2 = /(2)/g;
				arrValidDices = (arrToStr(arrUserDices)).match(patt2); //eg. [2,2] 
				console.log ("valid dices: " + arrValidDices);				
				sumOfDices = arrSum(arrValidDices);				
				if ( isMoreThanZero(sumOfDices) ) { //possible cat match
					objReturn = {"catName":catName, "userDices":arrValidDices, "userScore": sumOfDices};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		} else if (arrRuleNameRegistry[i] == "treor") {
				var catName = "treor";
				var patt3 = /(3)/g;
				arrValidDices = (arrToStr(arrUserDices)).match(patt3); //eg. [3,3] 
				console.log ("valid dices: " + arrValidDices);				
				sumOfDices = arrSum(arrValidDices);				
				if ( isMoreThanZero(sumOfDices) ) { //possible cat match
					objReturn = {"catName":catName, "userDices":arrValidDices, "userScore": sumOfDices};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		} else if (arrRuleNameRegistry[i] == "fyror") {
				var catName = "fyror";
				var patt4 = /(4)/g;
				arrValidDices = (arrToStr(arrUserDices)).match(patt4); //eg. [4,4] 
				console.log ("valid dices: " + arrValidDices);				
				sumOfDices = arrSum(arrValidDices);				
				if ( isMoreThanZero(sumOfDices) ) { //possible cat match
					objReturn = {"catName":catName, "userDices":arrValidDices, "userScore": sumOfDices};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		} else if (arrRuleNameRegistry[i] == "femmor") {
				var catName = "femmor";
				var patt5 = /(5)/g;
				arrValidDices = (arrToStr(arrUserDices)).match(patt5); //eg. [5,5,5] 
				console.log ("valid dices: " + arrValidDices);				
				sumOfDices = arrSum(arrValidDices);				
				if ( isMoreThanZero(sumOfDices) ) { //possible cat match
					objReturn = {"catName":catName, "userDices":arrValidDices, "userScore": sumOfDices};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		} else if (arrRuleNameRegistry[i] == "sexor") {
				var catName = "sexor";
				var patt6 = /(6)/g;
				arrValidDices = (arrToStr(arrUserDices)).match(patt6); //eg. [6,6,6] 
				console.log ("valid dices: " + arrValidDices);				
				sumOfDices = arrSum(arrValidDices);				
				if ( isMoreThanZero(sumOfDices) ) { //possible cat match
					objReturn = {"catName":catName, "userDices":arrValidDices, "userScore": sumOfDices};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		// ==============
		// --- Ett par
		} else if (arrRuleNameRegistry[i] == "ettpar") {
			var catName = "ettpar";
			var candidateForPair=1, arrDicesWithPair=[];
			for (p1=0; p1<5; p1++) {
				candidateForPair = arrUserDices[p1];
				for (p2=0; p2<5; p2++) {
					if (	( candidateForPair == arrUserDices[p2] )&&
							( p1 != p2 ) &&
							( arrDicesWithPair.indexOf( arrUserDices[p2] ) < 0 )
							) {
								//found pair. add this dice value to later find max
								arrDicesWithPair.push(candidateForPair);
					}
				}
			}

			
			if ( arrDicesWithPair.length == 1 ) {
				arrObjReturn = [];
				objReturn = {
					"catName": catName, 
					"userDices": [arrDicesWithPair[0], arrDicesWithPair[0]],
					"userScore": 2*arrDicesWithPair[0]
				}
				arrCatMatchObjects.push(objReturn);
			}
			else if ( arrDicesWithPair.length == 2 ) {
				//two pairs for ettpar category
				console.log("two possible pairs for 'ettpar' category -- dices: " + arrDicesWithPair);
				arrObjReturn = [];
				ettParPair1Score = 2 * arrDicesWithPair[0];
				ettParPair2Score = 2 * arrDicesWithPair[1];
				//follow this logic: compare the two pairs and suggest the pair with higher score
				if (ettParPair1Score > ettParPair2Score) {
                    objReturn = {
                        "catName": catName,
                        "userDices": [arrDicesWithPair[0], arrDicesWithPair[0]],
                        "userScore": 2*arrDicesWithPair[0]
                    }
                }
				else {
                    objReturn = {
                        "catName": catName,
                        "userDices": [arrDicesWithPair[1], arrDicesWithPair[1]],
                        "userScore": 2*arrDicesWithPair[1]
                    }
				}
				arrCatMatchObjects.push(objReturn);
			}
		// --- Två par
		} else if (arrRuleNameRegistry[i] == "tvapar") {
				var catName = "tvapar";
				var arrDicesWithPair=[];				
				candidateForPair = [-1,-1]; //these values will be set in following for loops so just place holders	
				for (t = 0; t < 2; t++) {
					for (p1=0; p1<5; p1++) {
						candidateForPair[t] = arrUserDices[p1];
						for (p2=0; p2<5; p2++) {
							//check for pair 1:
							if (	( candidateForPair[t] == arrUserDices[p2] )&&
									( p1 != p2 ) &&
									( arrDicesWithPair.indexOf( arrUserDices[p2] ) < 0 )
									) {
										console.log("found pair");
										//found pair. add this dice pair as pair 1
										arrDicesWithPair.push(candidateForPair[t]);
							}
						}
					}
				}
				if ( arrDicesWithPair.length == 2 ) {
					//has 2 dices, which will make 2 pairs
					console.log("two pairs, i.e.: " + 
						arrDicesWithPair[0] + " and " + arrDicesWithPair[0] + ", " +
						arrDicesWithPair[1] + " and " + arrDicesWithPair[1]
						);
					objReturn = {	"catName": catName,
								"userDices": [	arrDicesWithPair[0], arrDicesWithPair[0],
												arrDicesWithPair[1], arrDicesWithPair[1]
											],
								"userScore": (2*arrDicesWithPair[0] + 2*arrDicesWithPair[1])
								},				
					arrCatMatchObjects.push(objReturn);
				}
		// --- Tretal			
		} else if (arrRuleNameRegistry[i] == "tretal") {
			var catName = "tretal";
			arrCurrentDice = [];
			boolExit = false;
			for (c1 = 0; c1 < 5; c1++) { //5 dices
				//console.log("count c1 is " + c1);
				for (c2 = 0; c2 < 5; c2++) {
					//console.log("count c2 is " + c2);
					if ( arrUserDices[c1] == arrUserDices[c2] && c1 != c2 ) {
						//console.log("c1: " + c1 + " value: " + arrUserDices[c1] + " is same as c2: " + c2 + " value " + arrUserDices[c2]);
						if (c1 == 0 && c2 == 4) { boolExit = true; //can exit for loops because reached checking and only first and last match, i.e. only 2 dice values
							//console.log ("can exit for loops because reached checking and only first and last match, i.e. only 2 dice values");
							break;
						}
						for (c3 = 0; c3 < 5; c3++) {
							console.log("count c3 is " + c3);
							if ( (arrUserDices[c1] == arrUserDices[c3]) && (c1 != c2) && (c2 != c3) ) {
								console.log("found 3 similar dices");
								arrValidDices = [arrUserDices[c1], arrUserDices[c2], arrUserDices[c3] ] //or all c1s or c2s
								boolExit = true; //can exit for loops
								objReturn = {"catName":catName, "userDices":arrValidDices, "userScore": arrSum(arrValidDices)};
								console.log (objReturn);
								arrCatMatchObjects.push(objReturn);
							}
							if (boolExit) { break; }
						}
					if (boolExit) { break; }
					}
					if (boolExit) { break; }
				}
				if (c1 > 2) {
					//has passed checking an instance in first 3 nums
					break;
				}
			}
		// --- Fyrtal
		} else if (arrRuleNameRegistry[i] == "fyrtal") {
			var catName = "fyrtal";
			arrCurrentDice = [];
			boolExit = false;
			for (c1 = 0; c1 < 5; c1++) { //5 dices
				for (c2 = 0; c2 < 5; c2++) {
					if ( arrUserDices[c1] == arrUserDices[c2] && c1 != c2 ) {
						for (c3 = 0; c3 < 5; c3++) {
							if ( arrUserDices[c1] == arrUserDices[c3] && c1 != c3 && c2 != c3 ) {
							for (c4 = 0; c4 < 5; c4++) {
								if ( arrUserDices[c1] == arrUserDices[c4] && 
																	c1 != c4 && c2 != c4 && c3 != c4) {																										
									console.log("found 4 similar dices");
									arrValidDices = [arrUserDices[c1],
													arrUserDices[c2], 
													arrUserDices[c3],
													arrUserDices[c4]
													] //or any other combination of cs.
									boolExit = true; //can exit for loops
									objReturn = {"catName":catName, "userDices":arrValidDices,
												"userScore": arrSum(arrValidDices)};
									console.log (objReturn);
									arrCatMatchObjects.push(objReturn);
									}
								if (boolExit) { break; }
							}
							if (boolExit) { break; }
							}
						}
						if (boolExit) { break; }
					}
					if (boolExit) { break; }
				}
				if (boolExit) { break; }
				if (c1 > 3) {
					//has passed checking an instance in first 4 nums
					break;
				}
			}
		// --- Litensteg
		} else if (arrRuleNameRegistry[i] == "litensteg") {
			var catName = "litensteg";
			if (arrUserDices.indexOf(1) > -1 && 
				arrUserDices.indexOf(2) > -1 && 
				arrUserDices.indexOf(3) > -1 && 
				arrUserDices.indexOf(4) > -1 && 
				arrUserDices.indexOf(5) > -1 ) {
					console.log("found litensteg");
					objReturn = {"catName":catName, 
									"userDices":arrUserDices,
									"userScore": 15
								};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		// --- Storsteg
		} else if (arrRuleNameRegistry[i] == "storsteg") {
			var catName = "storsteg";
			if (arrUserDices.indexOf(2) > -1 && 
				arrUserDices.indexOf(3) > -1 && 
				arrUserDices.indexOf(4) > -1 && 
				arrUserDices.indexOf(5) > -1 && 
				arrUserDices.indexOf(6) > -1 ) {
					console.log("found storsteg");
					objReturn = {"catName":catName, 
									"userDices":arrUserDices,
									"userScore": 20
								};
					console.log (objReturn);
					arrCatMatchObjects.push(objReturn);
				}
		// --- Kåk
		} else if (arrRuleNameRegistry[i] == "kak") {
			var catName = "kak";
			var d1, d2;
			var c1=0, c2=0;;
			boolMatchedKak = false;
			for ( t = 0; t < arrUserDices.length; t++ ) {
				if ( d1 == null ) { d1 = arrUserDices[t]; ++c1; 
					console.log("keep d1:" + d1);
					continue; }
				if ( d2 == null && d1 != null && arrUserDices[t] != d1 ) { d2 = arrUserDices[t]; ++c2; 
					console.log("keep d2:" + d2);				
					continue; }
				if ( arrUserDices[t] != d1 && arrUserDices[t] != d2 ) { break; } else {
					if ( arrUserDices[t] == d1 ) { ++c1 }
					else if ( arrUserDices[t] == d2 ) { ++c2 }
				}
			}
			console.log("c1 is " + c1 + " and c2 is " + c2);
			if ( (c1 == 2 && c2 == 3) || (c1 == 3 && c2 == 2) ) {
				console.log("is kåk...");
				objReturn = {"catName":catName, 
								"userDices":arrUserDices,
								"userScore": ( ( c1 * d1 ) + ( c2 * d2 ) )
							};
				console.log (objReturn);
				arrCatMatchObjects.push(objReturn);
			}		
		// --- Chans	
		} else if (arrRuleNameRegistry[i] == "chans") {
			var catName = "chans";
			objReturn = {"catName":catName, 
								"userDices":arrUserDices,
								"userScore": ( arrSum(arrUserDices) )
						};
				console.log (objReturn);
				arrCatMatchObjects.push(objReturn);
		// --- Yatzi
		} else if (arrRuleNameRegistry[i] == "yatzi") {
			var catName = "yatzi";
			patt= /^(\d)\1*$/g;
			strIsYatzi = arrToStr(arrUserDices).match(patt);
			if (strIsYatzi != null ) {

				catName = "yatzi";
				console.log("found yatzi");
				objReturn = {"catName":catName, 
								"userDices":arrUserDices,
								"userScore": 50
							};
			console.log (objReturn);
			arrCatMatchObjects.push(objReturn);
			}
		}

	}
	console.log ("- finsihed match cats check.")
	console.log ("- all matched rules objects in array:" + arrCatMatchObjects)
	return arrCatMatchObjects;
}

return_MatchedCatNames = function(arrCatMatchObjects) {
	arrCatMatchNames = []
	for ( i = 0; i < arrCatMatchObjects.length; i++) {
		eachObj = arrCatMatchObjects[i];
		arrCatMatchNames.push(eachObj.catName);
	}
	console.log("- matched cat names:" + arrCatMatchNames);
	return (arrCatMatchNames);
}





