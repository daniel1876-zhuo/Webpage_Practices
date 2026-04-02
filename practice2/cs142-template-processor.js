"use strict";
function Cs142TemplateProcessor(template){
    this.template = template;
}
Cs142TemplateProcessor.prototype.fillIn = function(ele){
    if(typeof(ele) === "object"){
        const placeholder = /{{([^}])*}}/g;
        const matches = this.template.replace(placeholder,(match) => {
            const item = match.slice(2,match.length-2);
            const value = ele[item];
            if(typeof(value) === "undefined"){
                return " ";
            }
            else{
                return value;
            }
        });
        return matches;
    }
    return null;
};
//*------------------------------test sample
// var template = "My favorite month is {{month}} but not the day {{day}} or the year {{year}}";
// var dateTemplate = new Cs142TemplateProcessor(template);

// var dictionary = {month: "July", day: "1", year: "2016"};
// var str = dateTemplate.fillIn(dictionary);
// console.log(str)

// // Case: property doesn't exist in dictionary
// var dictionary2 = {day: "1", year: "2016"};
// var str = dateTemplate.fillIn(dictionary2);
// console.log(str)
