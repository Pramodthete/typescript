"use strict";
function parseJson(jsonString) {
    try {
        const result = JSON.parse(jsonString);
        console.log("Parsed JSON", result);
        return result;
    }
    catch (error) {
        console.log("Invalid Json string.......try again-> ", jsonString);
    }
    finally {
        console.log("Parsing attempt finished");
    }
}
const validation = '{"name":"Pramod","age":24}';
const invalidJson = '{"name":"Vaibhav","age":40';
// missing closing brace
console.log("Valid JSON Test:");
parseJson(validation);
console.log("\nInvalid JSON Test:");
parseJson(invalidJson);
