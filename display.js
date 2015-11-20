module.exports = displayTable;
var cliTable = require('cli-table');


//This function converts the first letter of first name and last name to uppercase
function firstToUpper(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
//This function will create the elements to be pushed to the table
function displayTable(contact) {
    var contact = contact.resultChoice;
    var table = new cliTable();
    console.log(contact);
    
    /////////////////NAME/////////////////
    if (contact.lastName && contact.firstName) {
        table.push({
            'First Name': firstToUpper(contact.firstName)
        }, {
            'Last Name': firstToUpper(contact.lastName)
        })
    }
    else if (contact.firstName) {
        table.push({
            'First Name': firstToUpper(contact.firstName)
        });
    }
    else if (contact.lastName) {
        table.push({
            'Last Name': firstToUpper(contact.lastName)
        });
    }

    //////////////BIRTHDAY/////////////
    if (contact.birthday) {
        table.push({
            'Date of birth': contact.birthday
        })
    }
    //////////////EMAILS/////////////
    //We are creating an empty array where we will be pushing  our type: email
    var emails = [];
    //We are looping over every type. If one is found we use string manipulation to create our strings.
    ['personal', 'work', 'other'].forEach(function(type){
        //We check if contact.personalEmail or workEmail or otherEmail is present
        //We do it by combining contact.type which will be either personal work or other with the string Email
        //SINCE WE DONT KNOW the property name we access it by passing in the type + Email in  [ ]
        if(contact[type + 'Email']){
            //We push to our emails array the type(personal work other plus the information in contact.type and Email)
            emails.push(type + ': ' + contact[type + 'Email'])
        }
    })
    //We join our array in a string and separate it by a new line '\n'
    var emailsOut = emails.join('\n');
    //We push our data to the array
    if(emailsOut){
        table.push({'Emails': emailsOut})
    }
 
    //////////////PHONE NUMBERS/////////////
    //See above explanation to understand the logic behind this
    var phones = [];
    ['home', 'work', 'other'].forEach(function(type) {
        if (contact[type + 'Phone']) {
            phones.push(type + ': ' + contact[type + 'Phone']);
        }
    });
    var output = phones.join("\n");
    if(output){
        table.push({'Phone Numbers': output});
    }
    
    
    //////////////HOME ADDRESS/////////////
    if(contact.homeAddressLine1 && contact.homeAddressLine2){
        table.push(
            {'Home Address': contact.homeAddressLine1 + '\n' + contact.homeAddressLine2 + '\n' + contact.homeCity + " " + contact.homeProvince + '\n' + contact.homePostalCode + '\n' + contact.homeCountry}
            )
    } else if(contact.homeAddressLine1){
        table.push(
            {'Home Address': contact.homeAddressLine1 + '\n' + contact.homeCity + " " + contact.homeProvince + '\n' + contact.homePostalCode + '\n' + contact.homeCountry}
            )
    }
    //////////////WORK ADDRESS/////////////
    if(contact.workAddressLine1 && contact.workAddressLine2){
        table.push(
            {'Work Address': contact.workAddressLine1 + '\n' + contact.workAddressLine2 + '\n' + contact.workCity + ' ' + contact.workProvince + '\n' +contact.workPostalCode + '\n' + contact.workCountry}
            )
    } else if(contact.workAddressLine1){
        table.push(
            {'Work Address': contact.workAddressLine1 + '\n' + contact.workCity + ' ' + contact.workProvince + '\n' +contact.workPostalCode + '\n' + contact.workCountry}
            )
    }
    //////////////OTHER ADDRESS/////////////
    if(contact.otherAddressLine1 && contact.otherAddressLine2){
        table.push(
            {'Other Address': contact.otherAddressLine1 + '\n' + contact.otherAddressLine2 + '\n' + contact.otherCity + ' ' + contact.otherProvince + '\n' +contact.otherPostalCode + '\n' + contact.otherCountry}
            )
    } else if(contact.otherAddressLine1){
        table.push(
            {'Other Address': contact.otherAddressLine1 + '\n' + contact.otherCity + ' ' + contact.otherProvince + '\n' +contact.otherPostalCode + '\n' + contact.otherCountry}
            )
    }
    return table.toString();
}