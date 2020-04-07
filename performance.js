const PerfLeaderboard = require("performance-leaderboard");

(async function() {

	let urls = [
    "https://andeers.com",
    "http://localhost:8082"
	];

	console.log( await PerfLeaderboard(urls) );

	// Run each site 5 times (default is 3)
	// console.log( await PerfLeaderboard(urls, 5) );
})();