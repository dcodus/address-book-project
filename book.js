////////////////MODULES////////////////////
var inquirer = require("inquirer");
var create = require('./create');
var display = require('./display');


////////////////Question Help Functions////////////////////


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


var editContact = [{
    name: 'edit',
    type: 'list',
    message: 'Would you like to do?',
    choices: [{
        name: 'Edit Contact',
        value: 'edit'
    }, {
        name: 'Delete Contact',
        value: 'delete'
    }, {
        name: 'Back to Main Menu',
        value: 'back'
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
            create(function(contact){
                contacts.push(contact);
                console.log(contacts);
                book();
            })
        }
        else if (menuChoice[mainMenu[0].name] === 'search') {
            //IMPORTANT see how we call the function makeSearch here. We are initializing the questions that is why we have access to resultChoice.
            inquirer.prompt(makeSearch(), function(answers) {
                //The selcted choice from the user was saved in the resultChoice in the function makeSearch 
                console.log(display(answers));
                book();
            })
        }
    });
}

book();

//EDIT FUNCTION

function editEntry(entry){
    inquirer.prompt(editContact, function(choice) {
        if(choice.delete){
            console.log(choice);
        }
    })
}

function findEdit(){
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