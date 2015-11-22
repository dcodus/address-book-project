module.exports = {
    birthday: birthday,
    dateValidation: dateValidation,
    mandatory: mandatory,
    capitalize: capitalize,
    askNext: askNext
}
   
   
   
function birthday(answer){
    if(answer && (answer.length !== 10 || dateValidation(answer) === false)){
        console.log('\n  Make sure the birthay is entered in the specified format  '.bgRed.white);
        console.log('\n  YYYY/MM/DD  '.bgGreen.white);
        return false;
    } else if(answer && answer.length === 10 && dateValidation(answer) === true) {
        return true;
    } else if(!answer){
        return true;
    }
}

function dateValidation(date){
    if(date[4] === '/' && date[7] === '/'){
        return true;
    } else {
        return false;
    }
}

function mandatory(answer){
    if(answer.length < 3){
        console.log('\n  Please input a minimum of three (3) characters! '.bgRed.white)
        return false;
    } else {
        return true;
    }
}

function capitalize(answer){
    var result = answer.trim();
    return result[0].toUpperCase() + result.substr(1, result.length -1);
}

function askNext(type, field){
    //This function returns another function that will be passed to when: in inquirer
    //when: will ask the question if the function passed to it returns true
    //askeNext takes two parameters which will be the name : value[] from the answers
    //in answers we have the categories (eg: addresses) that hold an array containing the choices (eg: work)
    return function(answers){
        //this function will look at the answers(an object) and find the properties indicated by the type value
        //then the function will search for the instance of field inside the array of that property
        //if something is found the function returns true to when: which asks the question
        if(answers[type].indexOf(field) > -1){
            return true;
        } else {
            return false;
        }
    }
}