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
/*
*/

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

let arr = [1,3,4,6,7,8];
console.log("OG array: ", arr + "\n");
console.log("Squares: ", arr.ourMap(item=> item * item));
console.log("only odds: ", arr.customFilter(item => item % 2 === 1));