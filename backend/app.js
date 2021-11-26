const express = require("express");
const app = express();
const port = 3001;

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Content-Type", "application/json");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/user", (request, response) => {
	const {query, route} = request;
	const {id} = query;
	const {path} = route;

	response.json({
		firstName: "Vladimir",
		lastName: "Radovanovich",
		id,
		path,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
