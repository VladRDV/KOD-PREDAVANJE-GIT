let selectedMethod = "Fetch API";
const roorUrl = "http://localhost:3001";
const route = `${roorUrl}/user`;
const triggerButton = document.getElementById("trigger-button");
const jsonDisplay = document.getElementById("json-display");
const fetchingMethodSelect = document.getElementById("fetching-method-select");
const useEs7ForAxios = true;
fetchingMethodSelect.addEventListener("change", (event) => {
	selectedMethod = event.target.value;
});

triggerButton.addEventListener("click", () => {
	switch (selectedMethod) {
		case "Fetch API":
			return getWithFetchAPI();
		case "XMLHttpRequest":
			return getWithXHR();
		case "Axios":
			return useEs7ForAxios ? getWithAxiosES7() : getWithAxiosES6();
		default:
			return getWithFetchAPI();
	}
});

function getWithFetchAPI() {
	fetch(`${route}?id=123_fetch`)
		// fetch Web Api returns a promise, that resolves to response object, and it has a number of methods, that we can use to get to the data, that server server returned to us
		// in this instance we are useing .json() method, which returns a promise that resolves with the result of parsing the response body text as JSON.
		.then((response) => response.json())
		.then((data) => parseData(JSON.stringify(data, undefined, 4)))
		.catch((error) => console.error(error));
}

function getWithXHR() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		// this is the old fashioned way of making a request
		// unlike fetch API here we are adressing the instance of XMLHttpRequest with this keyword to get the data from the response
		if (this.readyState === 4) {
			if (this.status >= 200 && this.status < 299) {
				// we receive JSON data as a string, we need to parse it, to make it usable for JavaaScript
				const data = JSON.parse(this.response);
				parseData(JSON.stringify(data, undefined, 4));
			}
			if (this.status >= 400 && this.status < 499) {
				console.warn("Bad input");
			}
			if (this.status >= 500 && this.status < 599) {
				console.error("Server Error");
			}
		}
	};
	xhttp.open("GET", `${route}?id=123_XHR`, true);
	xhttp.send();
}

function getWithAxiosES6() {
	console.log("Running getWithAxiosES6");
	// axios is a library, that works for the most part like fetch API (they were both inspired by jQuery)
	// but here we get a log of things working without us writing additional code
	// also axios has a number of features, that fetch API does not posess, like saving user token
	// axios uses XMLHttpRequest under the hood
	// axios is not the only open source library for making server requests, these days they number in hundreds
	axios
		.get(`${route}?id=123_Axios`)
		.then(({data}) => {
			parseData(JSON.stringify(data, undefined, 4));
		})
		.catch((error) => console.error(error));
}

async function getWithAxiosES7() {
	console.log("Running getWithAxiosES7");

	try {
		const {data} = await axios.get(`${route}?id=123_Axios`);
		parseData(JSON.stringify(data, undefined, 4));
	} catch (error) {
		console.error(error);
	}
}

function parseData(x) {
	jsonDisplay.innerText = x;
}
