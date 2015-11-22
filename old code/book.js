////////////////MODULES////////////////////
var inquirer = require("inquirer");
var create = require('./create');
var display = require('./display');
var edit = require('./edit');

////////////////Question Help Functions////////////////////

function searchKey(key) {
    //We loop over all the contacs in the database
    var results = contacts.filter(function(contact){
        //We loop over all the properties found in each contact
        for(var prop in contact){
            //We check if the property value is a string
            if(typeof contact[prop] === 'string'){
                //If it is we will push that contat to the new array
                if(contact[prop].match(key)){
                    return true;
                }
            } 
        }
    })
    //We are returning all matches as an array
    return results;
}

function changeId() {
    //Loop over the keys of the array. Loop over index
    for (var i in contacts) {
        contacts[i].id = i;
        console.log(contacts[i].id)
    }
}

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
    },
    
    {
        name: 'resultChoice',
        message: 'Matches found. Please select one to display details.',
        type: 'list',
        //choices returns an array of choices. the array can have objects. see comments below
        choices: function(answers) {
            //The function searchKey returns an array that is filtered according to the key passed to it. In this case the key is answers.Search
            //answers.Search refers to the name of the question that asks for input from the user. answer.Search (see above) stores the input from the user.
            console.log(answers)
            return searchKey(answers.Search).map(function(result) {
                console.log('GOODBYE')
                //We are returning an array with objects. The name: will be displayed in the list and the value: will be saved in the answers
                return {
                    name: result.firstName + ' ' + result.lastName,
                    value: result,
                    short: 'Result:'
                };
            });
        },
        when: function(answers){
            return (searchKey(answers.Search).length>0 ? true : false);
        }
    }, 
    {
        name: 'noMathes',
        message: 'No matches found!',
        type: 'list',
        choices: ['Back to Main Menu'],
        when: function(answers){
            console.log(answers)
            console.log(searchKey(answers.Search));
            console.log(searchKey(answers.Search).length === 0);
            return (searchKey(answers.Search).length === 0 ? true : false);
        }
    }
    ];
}

////////////////DATABASE////////////////////
var contacts = [];
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
            create(function(contact) {
                contact.id = contacts.length
                contacts.push(contact);
                //console.log(contact);
                console.log(display(contact));
                book();
            })
        }
        else if (menuChoice[mainMenu[0].name] === 'search') {
            //IMPORTANT see how we call the function makeSearch here. We are initializing the questions that is why we have access to resultChoice.
            inquirer.prompt(makeSearch(), function(answers) {
                //The selected choice from the user was saved in the resultChoice in the function makeSearch 
                console.log(answers);
                edit(answers, function(n, bool) {
                    if (bool === true) {
                        contacts.pop(n.id);
                        changeId();
                    }
                    else {
                        console.log(display(n))
                        contacts.forEach(function(x, index) {
                            if (x.id === n.id) {
                                contacts.splice(index, 1, n);
                            }
                        })
                    }
                    book();
                })
            })
        }
    });
}

book();

//EDIT FUNCTION

function editEntry(entry) {
    inquirer.prompt(editContact, function(choice) {
        if (choice.delete) {
            console.log(choice);
        }
    })
}

