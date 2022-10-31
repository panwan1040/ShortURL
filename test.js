// url = "www.youtube.com"
// url2 = "https://www.youtube.com/"

// function getbaseurl(str)
//     if(str.includes("https://"))
//         let url = new URL(str);
//         return url.origin;
//     else 
//         let url = new URL("https://"+str);
//         return url.origin;
//     
    
// 

list = {
  "Light Gradient Boosting Machine" :	0.8564,
  "CatBoost Classifier" :	0.8563,
  "Gradient Boosting Classifier" :	0.8550,
  "Extreme Gradient Boosting" :	0.8533,
  "Random Forest Classifier" :	0.853,
  "Ada Boost Classifier" :	0.852,
  "Logistic Regression" :	0.845,
  "SVM - Linear Kernel" :	0.841,
  "Linear Discriminant Analysis" :	0.838,
  "Ridge Classifier" :	0.8383,
  "Extra Trees Classifier" :	0.8371,
  "K Neighbors Classifier" :	0.8346,
  "Naive Bayes" :	0.8075,
  "Decision Tree Classifier" :	0.8058,
  "Quadratic Discriminant Analysis" :	0.6046,
  "Dummy Classifier" :    0.5245
}
let i = 0
let t = ""

for (const key in list) {
    t += key + `(${Math.round(list[key]*100)}%), `
}



// list.forEach(element => 
//     console.log(element0);
//     // t+=element0+`()`
// );
console.log(t);
// console.log(getbaseurl(url) || true);

{"_id":{"$oid":"635da0defbf94c6aba3fa65d"},"full":"https://my.vultr.com/","clicks":{"$numberInt":"1"},"dateAdd":{"$date":{"$numberLong":"1667080262205"}},"short":"7rtHx7RMW","__v":{"$numberInt":"0"}}
