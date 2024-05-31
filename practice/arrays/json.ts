
// const arr:number[]=[5,5,7,6,8,3,9,3,2,7,1,0,8];


// Sample JSON data
const jsonData = {
  name: "John Doe",
  age: 30,
  city: "New York"
};

// Convert JSON object to a string
const jsonString = JSON.stringify(jsonData, null, 2);

console.log(jsonString);
