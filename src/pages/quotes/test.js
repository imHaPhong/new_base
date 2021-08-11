const req = new XMLHttpRequest();
req.open("GET", "https://api.quotable.io/random", false);
// eslint-disable-next-line no-console
console.log(req.status);
