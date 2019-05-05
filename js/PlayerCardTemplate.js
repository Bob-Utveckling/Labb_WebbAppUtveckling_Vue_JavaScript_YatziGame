var defaultCardTemplate =
	{
		"general": {
			"name": "PlayerName"
		},

		"categories": [{
				"appFieldName": "ettor",
				"name": "Ettor",
				"descrip": "Räkna alla tärningar med tal 1",
				"maxScore": 5,
				"userDices": [],
				"userScore": 0
			},
			{
				"appFieldName": "tvaor",
				"name": "Tvåor",
				"descrip": "Räkna alla tärningar med tal 2",
				"maxScore": 10,
				"userDices": [],
				"userScore": 0
			},
			{
				"appFieldName": "ettpar",
				"name": "Ett par",
				"descrip": "Ett par med samma siffror",
				"maxScore": 12,
				"userDices": [],
				"userScore": 0
			}
		],
		"sumAndTotal": {
			"sum": {
				"maxScore": 105,
				"userScore": 0
			},
			"bonus": {
				"maxScore": 50,
				"userDices": [],
				"userScore": 0
			},
			"total": {
				"maxScore": 374,
				"userScore": 0
			}
		}
	}