$(document).ready(function() {
	var inputBox = document.getElementById("input");
	var userInput;
	var submitButton = document.getElementById("submit");
	var id = -1;
	var listOfChampions = new Array();
	var champion;
	var recentGamesJSON;
	var buttonPressed;
	var wins;
	var losses;
	var winRatio;

	$('#submit').click(function() {
		$("#test").html("<p></p>");
		userInput = inputBox.value;
		buttonPressed = $( "#region option:selected" ).val();
		$.getJSON("https://prod.api.pvp.net/api/lol/" + buttonPressed + "/v1.1/summoner/by-name/" + userInput + "?api_key=ef89711b-e62e-44e9-bbb0-899527a2618d",
			function (data) {
				id = data.id;
			}).done(function(data)  {
		$('<h4>Summoner ID: ' + id + '</h4>').appendTo("#test");
		$.getJSON("https://prod.api.pvp.net/api/lol/" + buttonPressed + "/v1.1/stats/by-summoner/" + id + "/summary?season=SEASON3&api_key=ef89711b-e62e-44e9-bbb0-899527a2618d", 
			function (result) {
					for (var i = 3; i < 6; i++) {
						var statType = result.playerStatSummaries[i].playerStatSummaryType;
						if (statType == "RankedSolo5x5" || statType == "RankedTeam3x3" || statType == "RankedTeam5x5") {
							wins = result.playerStatSummaries[i].wins;
							losses = result.playerStatSummaries[i].losses;
							winRatio = Math.round(10 * (100 * (wins / (wins + losses))) / 10);
							$("<h5>Stats for " + result.playerStatSummaries[i].playerStatSummaryType + 
								"</h5><p>Wins: " + wins + "</p>" +
								"<p>Losses: " + losses + "</p>" +
								"<p>Win ratio: " + winRatio + "%</p>" ).appendTo("#test");
						}
						else {
							$("<p>Error. Not Found. Invalid name or no ranked games played. (Season 3)</p>").appendTo("#test");
						}
					}
				});
			});
	});
});