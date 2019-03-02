/*
 * Select speech-to-text API service:
 * -- Google Cloud
 * -- IBM Watson
 */

const readline = require("readline-sync");

const services = ["Google Cloud", "IBM Watson"];

const selectedServiceIndex = readline.keyInSelect(services);
const selectedService = services[selectedServiceIndex];

if (selectedServiceIndex < 0) {
    console.log('Select a valid service!')
    return;
}

console.log("You have been selected %s API service.", selectedService);

switch (selectedServiceIndex) {
    case 0:
        require("./services/googleCloud.js");
        break;
    case 1:
        require("./services/watsonIBM");
        break;
}
