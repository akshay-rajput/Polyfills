// filter
/*
- filter() calls a provided callbackFn function once for each element in an array, and constructs a new array of all the values for which callbackFn returns a value that coerces to true.
- callbackFn is invoked only for indexes of the array which have assigned values; it is not invoked for indexes which have been deleted or which have never been assigned values.
- filter() does not mutate the array on which it is called.
 */
Array.prototype.customFilter = function(callback){
  let filtered = [];
  let arrLength = this.length;

  // check if callback provided
  if (typeof callback !== 'function') {
    throw new TypeError("Custom filter requires a callback function");
  }

  for(let i=0; i<arrLength; i++){
    if(callback(this[i], i, this)){
      filtered.push(this[i]);
    }
  }

  return filtered;
}


// forEach
Array.prototype.eachElm = function(callback) {
  // callback here is the callback function
  // which actual .forEach() function accepts
  for (var i = 0; i < this.length; i++) {
    callback(this[i], i, this) // currentValue, index, array
  }
}


// .map()
/*
.map() is used to iterate over the array, and do some manipulation in it with the items and then after doing that so, returns the manipulated array.
*/
Array.prototype.ourMap = function(callback) {
  var arr = [] // since, we need to return an array
  for (var i = 0; i < this.length; i++) {
    arr.push(callback(this[i], i, this)) // call with currentValue, index, array
  }
  return arr; // finally returning the array
}

// find()
/*
  returns the value of first element in the array that satisfies the provided testing function.
*/
Array.prototype.customFind = function(testingFunc){
  if(typeof testingFunc !== "function"){
    throw new TypeError("customFind needs a callback function");
  }

  for(let i = 0; i<this.length; i++){
    if(testingFunc(this[i], i, this)){
      return this[i];
    }
  }
  return undefined;
}

//reduce()
/*
  - take a reducer callback function and execute it on each element of array
  - pass the return value from calculation on preceding element.
  - final result is a single value
*/
Array.prototype.customReduce = function(reducerfunc, initialValue){
  let currentValue = null;
  let acc = 0;

  // if array length less than 1
  if(this.length < 1){
    throw new Error("Cannot reduce an empty array");
  }

  // if initialvalue not provided
  if(initialValue === undefined){
    acc = this[0]; // set first element as accumulator then
  }else{
    acc = initialValue;
  }

  for(let i = 0; i < this.length; i++){
    if(this[i] !== null && this[i] !== undefined){
      currentValue = reducerfunc(acc, this[i], i, this);
      acc = currentValue;
    }
  }
  return acc;
}


let arr = [1,3,4,6,7,,8];

// console.log("OG array: ", arr + "\n");
// console.log("Map: Squares: ", arr.ourMap(item=> item * item));
// console.log("Filter: only odds: ", arr.customFilter(item => item % 2 === 1));

// console.log("find 1st even: ", arr.customFind(item => item % 2 === 0));

// let reducer = (acc, current) => acc+current;

// console.log("Reduce: sum: "+ arr.customReduce(reducer, 0));

// let arr2 = [1,2,3];
// let reducer2 = (acc, current) => {
//   console.log("acc: ", acc + " -- current: ", current);
//   return acc + current**2;
// }
// arr2.customReduce(reducer2, 1);

// ---------- Other polyfills ------------

/* BIND
  - bind creates a new function, that when called has its THIS keyword set to the provided value.
  - second argument in bind is list of params

  - takes an object as argument and returns a function whose this refers to the object we passed
*/
// Function.prototype.customBind = function (context, ...args) {
//   let fn = this;
//   return function (...otherArgs) {
//       fn.apply(context, [...args, ...otherArgs]);
//   }
// };

let obj = {
  "name": "jack",
  age: 24
}

function greet(city, job){
  console.log(`Hi my name is ${this.name}. I'm ${this.age} years old. I'm from ${city} and I work as a ${job}.`);
}

Function.prototype.mybind = function (...args) {
  let fn = this;
  let params = args.slice(1);
  return function (...arg2) {
      fn.apply(args[0], [...params, ...arg2])
  }
};

// let callBinded = greet.bind(obj, 'jammu');
let mycallBinded = greet.mybind(obj, "jammu");
// callBinded('engineer');
mycallBinded('police officer');