
let numbers:Array<number>=[1,2,3,4,5,6];

let fruits:string[]=['Apple','Banana','Cherry'];

let mixed: (number | string | boolean)[]=[1,'two',true];

//printing numbers array
numbers.forEach((val)=>process.stdout.write(val+", "));

numbers.pop();

numbers.shift(); // remove 0th index
numbers.unshift(10); // add this value to 0th index
let newArr:number[]=numbers.slice(2,4); //return new array of 2nd index to 4th index
console.log("\nslice and NewArr: ");
newArr.forEach((val)=>process.stdout.write(val+", "));
numbers.splice(1,2); // start from 1 st index and remove 2 values
console.log("\n splice and numbers: ");
numbers.forEach((val)=>process.stdout.write(val+", "));
//printing fruits array

console.log("\nnumbers array: ",numbers);


const filterArr=fruits.filter((fruit)=>fruit.startsWith('B'));

console.log("\nFilter Array: "+filterArr);

fruits.forEach((val)=>process.stdout.write(val+", "));

console.log("\nfruits array: ",fruits);

let str:string = 'Pramod Thete';

let newStr=str.split('').map((char,index)=>{
    return index%2!=0? char.toUpperCase():char.toLowerCase();
}).join('');

console.log("With Map: "+newStr);

let newStrR = str.split('').reduce((acc, char, index) => {
    // Append the transformed character to the accumulator
    return acc + (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase());
  },'');
  
console.log("With Reduce: "+newStrR);





