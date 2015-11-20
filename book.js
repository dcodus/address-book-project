////////////////MODULES////////////////////
var inquirer = require("inquirer");
var cliTable = require("cli-table")





////////////////MODULES////////////////////

////////////////Question Help Functions////////////////////

//This function will return another fucntion that will be passed to the when: variable.
//when: takes a true or false. If true it asks the question. If false it skips it.

var mandatory = function(answer) {
    if (!answer) {
        return false
    }
    else {
        return true
    }
}

var find = function(field, type) {
    return function(answers) {
        //answers in this case takes all the input from the user up to this point,WHICH IS AN OBJECT
        //We use [] to search for the field in answers. Field refers to name of the questions. See the main question. Type refers to the choices 'home', 'work' etc.
        if (answers[field].indexOf(type) > -1) {
            return true;
        }
    }
}

function searchKey(key) {
    var results = contacts.filter(function(contact) {
        for (var prop in contact) {
            if (contact[prop].indexOf(key) > -1) {
                return true;
            }
        }
    });
    return results;
}
//This function converts the first letter of first name and last name to uppercase
function firstToUpper(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
//This function will create the elements to be pushed to the table
function displayTable(contact, table) {
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
    if (contact.personalEmail && contact.workEmail && contact.otherEmail) {
        table.push({
            'Emails': 'personal: ' + contact.personalEmail + '\n' + 'work: ' + contact.workEmail + '\n' + 'other: ' + contact.otherEmail
        })
    }
    else if (contact.personalEmail && contact.workEmail) {
        table.push({
            'Emails': 'personal: ' + contact.personalEmail + '\n' + 'work: ' + contact.workEmail
        })
    }
    else if (contact.workEmail && contact.otherEmail) {
        table.push({
            'Emails': 'work: ' + contact.workEmail + '\n' + 'other: ' + contact.otherEmail
        })
    }
    else if (contact.personalEmail && contact.otherEmail) {
        table.push({
            'Emails': 'personal: ' + contact.personalEmail + '\n' + 'other: ' + contact.otherEmail
        })
    }
    else if (contact.personalEmail) {
        table.push({
            'Emails': 'personal: ' + contact.personalEmail
        })
    }
    else if (contact.workEmail) {
        table.push({
            'Emails': 'work: ' + contact.workEmail
        })
    }
    else if (contact.otherEmail) {
        table.push({
            'Emails': 'other: ' + contact.otherEmail
        })
    }
    
    //////////////PHONE NUMBERS/////////////
    if (contact.homePhone && contact.workPhone && contact.otherPhone) {
        table.push({
            'Phone Numbers': 'home: ' + contact.homePhone + '\n' + 'work: ' + contact.workPhone + '\n' + 'other: ' + contact.otherPhone
        })
    } else if(contact.homePhone && contact.workPhone){
        table.push({
            'Phone Numbers': 'home: ' + contact.homePhone + '\n' + 'work: ' + contact.workPhone
        })
    } else if(contact.homePhone && contact.otherPhone){
        table.push({
            'Phone Numbers': 'home: ' + contact.homePhone + '\n' + 'other: ' + contact.otherPhone
        })
    } else if(contact.workPhone && contact.otherPhone){
        table.push({
            'Phone Numbers': 'work: ' + contact.workPhone + '\n' + 'other: ' + contact.otherPhone
        })
    } else if(contact.homePhone){
        table.push({
            'Phone Numbers': 'home: ' + contact.homePhone
        })
    } else if(contact.workPhone){
        table.push({
            'Phone Numbers': 'work: ' + contact.workPhone
        })
    } else if(contact.otherPhone){
        table.push({
            'Phone Numbers': 'other: ' + contact.otherPhone
        })
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
}



////////////////Question Help Functions////////////////////

////////////////QUESTIONS////////////////////
var mainMenu = [{
    name: 'Main Menu',
    type: 'list',
    message: 'What do you want to do?',
    choices: [{
        name: 'Create a new address book entry',
        value: 'create'
    }, {
        name: 'Search for existing address book entries',
        value: 'search'
    }, {
        name: 'Exit the program',
        value: 'exit'
    }]
}];

function makeSearch() {
    return [{
        name: 'Search',
        message: 'Please enter a name or key-word to search for'
    }, {
        name: 'resultChoice',
        message: 'Matches found. Select one to display results.',
        type: 'list',
        //choices returns an array of choices. the array can have objects. see comments below
        choices: function(answers) {
            //The function searchKey returns an array that is filtered according to the key passed to it. In this case the key is answers.Search
            //answers.Search refers to the name of the question that asks for input from the user. answer.Search (see above) stores the input from the user.
            return searchKey(answers.Search).map(function(result) {
                //We are returning an array with objects. The name: will be displayed in the list and the value: will be saved in the answers
                return {
                    name: result.firstName + ' ' + result.lastName,
                    value: result,
                    short: 'Result:'
                };
            });
        }
    }];
}

var createContact = [{
    name: 'firstName',
    message: 'First Name (Mandatory)',
    validate: mandatory
}, {
    name: 'lastName',
    message: 'Last Name (Mandatory)',
    validate: mandatory
}, {
    name: 'birthday',
    message: 'Date of birth (yyyy/mm/dd) (Optional)',
}, {
    name: 'addresses',
    message: 'Choose the type(s) of address(es) you would like to add',
    type: 'checkbox',
    choices: [{
        name: 'home'
    }, {
        name: 'work'
    }, {
        name: 'other'
    }]
}, {
    name: 'phoneNumbers',
    message: 'Choose the type(s) of phone number(es) you would like to add',
    type: 'checkbox',
    choices: [{
        name: 'home'
    }, {
        name: 'work'
    }, {
        name: 'other'
    }]
}, {
    name: 'emailAddresses',
    message: 'Choose the type(s) of email(s) you would like to add',
    type: 'checkbox',
    choices: [{
        name: 'personal'
    }, {
        name: 'work'
    }, {
        name: 'other'
    }]
}, {
    name: 'homeAddressLine1',
    message: "Home address Line 1 (Mandatory Field)",
    validate: mandatory,
    when: find('addresses', 'home')

}, {
    name: 'homeAddressLine2',
    message: 'Home address Line 2',
    when: find('addresses', 'home')
}, {
    name: 'homeCity',
    message: 'Home City (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'homeProvince',
    message: 'Home Province (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'homePostalCode',
    message: 'Home Postal Code (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'homeCountry',
    message: 'Home Country (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'workAddressLine1',
    message: "Work address Line 1 (Mandatory Field)",
    validate: mandatory,
    when: find('addresses', 'work')

}, {
    name: 'workAddressLine2',
    message: 'Work address Line 2',
    when: find('addresses', 'work')

}, {
    name: 'workCity',
    message: 'Work City (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'workProvince',
    message: 'Work Province (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'workPostalCode',
    message: 'Work Postal Code (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'workCountry',
    message: 'Work Country (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'otherAddressLine1',
    message: "Other address Line 1 (Mandatory Field)",
    validate: mandatory,
    when: find('addresses', 'other')

}, {
    name: 'otherAddressLine2',
    message: 'Other address Line 2',
    when: find('addresses', 'other')

}, {
    name: 'otherCity',
    message: 'Other City (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'otherProvince',
    message: 'Other Province (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'otherPostalCode',
    message: 'Other Postal Code (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'otherCountry',
    message: 'Other Country (Mandatory Field)',
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'personalEmail',
    message: 'Personal Email Address (Mandatory Field)',
    validate: mandatory,
    when: find('emailAddresses', 'personal')
}, {
    name: 'workEmail',
    message: 'Work Email Address (Mandatory Field)',
    validate: mandatory,
    when: find('emailAddresses', 'work')
}, {
    name: 'otherEmail',
    message: 'Other Email Address (Mandatory Field)',
    validate: mandatory,
    when: find('emailAddresses', 'other')
}, {
    name: 'homePhone',
    message: 'Home Phone Number (Mandatory Field)',
    validate: mandatory,
    when: find('phoneNumbers', 'home')
}, {
    name: 'workPhone',
    message: 'Work Phone Number (Mandatory Field)',
    validate: mandatory,
    when: find('phoneNumbers', 'work')
}, {
    name: 'otherPhone',
    message: 'Other Phone Number (Mandatory Field)',
    validate: mandatory,
    when: find('phoneNumbers', 'other')
}]

////////////////QUESTIONS////////////////////

////////////////DATABASE////////////////////
var contacts = [];
var searchResults;
////////////////DATABASE////////////////////


////////////////DRAFT SPACE////////////////////
/*



*/
////////////////DRAFT SPACE////////////////////

function book() {
    inquirer.prompt([mainMenu[0]], function(menuChoice) {
        if (menuChoice[mainMenu[0].name] === 'exit') {
            console.log('Have a good day!');
            return;
        }
        else if (menuChoice[mainMenu[0].name] === 'create') {
            inquirer.prompt(createContact, function(contact) {
                //We push the new entries to the global variable contacts.
                contacts.push(contact);
                var r = contact;
                var table = new cliTable();
                displayTable(r, table);
                console.log(table.toString());
                book();
            })
        }
        else if (menuChoice[mainMenu[0].name] === 'search') {
            //IMPORTANT see how we call the function makeSearch here. We are initializing the questions that is why we have access to resultChoice.
            inquirer.prompt(makeSearch(), function(answers) {
                //The selcted choice from the user was saved in the resultChoice in the function makeSearch 
                var r = answers.resultChoice;
                var table = new cliTable();

                //We have to build the table manually!!

                displayTable(r, table);


                console.log(table.toString());
                book();
            })
        }
    });
}

book();