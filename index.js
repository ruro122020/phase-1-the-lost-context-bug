const messageConfig = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
};
/*Solution 1: Use a thisArg to avoid the lost context bug */
/****ONE WAY: is to attach the 'this' object as a second argument to the forEach method */
const printCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);

  this.signatories.forEach(function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message);
  }, this); //<==
};
printCard.call(messageConfig);

/****SECOND WAY: to attach the 'this' object is to assing the function to a varaible and at the end 
                 of the function attach .bind(this) to the function
*/

const printCard2 = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
  const contextBoundForEachExpr = function (signatory){
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message)
  }.bind(this)// <== attach the 'this' obj
  
  this.signatories.forEach(contextBoundForEachExpr)
  
};
printCard2.call(messageConfig)

/* Solution 2: Use a Closure to Regain Access to the Lost Context */
const printCard3 = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);

  const self = this; //<=== CLOSURE| assign the 'this' object to a

  this.signatories.forEach(function (signatory) {
    const message = `${self.closing[signatory]}, ${signatory}`;
    console.log(message);
  });
};

printCard3.call(messageConfig)

/* Solution 3: Use an Arrow Function Expression to Create a Function Without Its Own Context */
//array functions are automatically bound to its parents context 
//and does not create a context of it own. Therefore it will inherit the 'this' object from its outer function
//and you don't have to bind the 'this' object from the outer function to the nested array function. Arrow functions
//carries its parent's context as its own

const printCard4 = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
  // The arrow function's `this` is the same `this`
  // that printCard has; specifically, the `thisArg` that was passed to it
  this.signatories.forEach((signatory) =>
    console.log(`${this.closing[signatory]}, ${signatory}`)
  );
};

printCard4.call(messageConfig);

