//////////////Modules//////////////
var inquirer = require("inquirer");
var createContact = require("./createContact");
var searchContact = require("./searchContact");
var displayTable = require("./displayTable");
var updateContact = require("./updateContact");
module.exports = addressBook;
//////////////Database//////////////
var contacts = [];
//////////////Database//////////////

//////////////Helper Functions//////////////

function changeId() {
    //Loop over the keys of the array. Loop over index
    //An array is an object with key: value pairs
    //the index is the key ie: 0: 'element' 1: 'element2'
    for (var i in contacts) {
        //Here we are resseting the id property of every object
        //Contacts[i] is the object at the position i
        //We access the id of contacts[i] and set it to i
        contacts[i].id = i;
    }
}

function editContact(current, allContacts){
    allContacts.forEach(function(c){
        if(current.id === c.id){
            inquirer.prompt(updateContact(current), function(newContact){
                for(var prop in current)
                newContact.id = current.id
                //We used splice because push was pushing to the end of the array.
                //Where splice replaces at the same location
                allContacts.splice(current.id,1,newContact)
                changeId();
                console.log(displayTable(newContact));
                addressBook();
            })
        }
    })
}

function deleteContact(current, allContacts){
    allContacts.forEach(function(c){
        if(current.id === c.id){
            inquirer.prompt(deleteMenu, function(answer){
                //answer.delete === true
                if(answer.delete === true){
                    allContacts.pop(current);
                    changeId();
                    addressBook();
                } else {
                    addressBook();
                }
            })
        }
    })
}


function matches(results){
    //this function will be passed all the results
    return [{
    name: 'select',
    message: 'Select a contact to view details',
    type: 'list',
    //we will return to the user a list of contacts based on our results
    choices: function(answer){
        //since choices takes a function that is passed the choice
        //we return an array that is built based on our results
        return results.map(function(obj){
            //since we have to return a new object to the array
            //we store the original contact information on the value: parameter provided by inquirer
            return {
                name: obj.firstName + " " + obj.lastName,
                //We store the full contact info in the answer hash
                value: obj
            }
        })
    }
    }]
}

function searchEntry(){
    inquirer.prompt(searchMenu, function(searchKey){
                //searchKey is an object. search is the property.
                if(searchKey.search.length < 3 && searchKey.search.length !== 0){
                    console.log('\nProvide a minimum of three (3) characters to search.')
                    searchEntry();
                } else {
                    var results = searchContact(searchKey.search, contacts);
                    if(results.length === 0){
                        inquirer.prompt(noMatches, function(choice){
                            //choice is an object. the property is noMatches
                            if(choice.noMatches === 'search'){
                                searchEntry();
                            } else {
                                addressBook();
                            }
                        })
                    } else {
                    //to have access to our results we will create a function that takes a parameter
                    //in this case we pass results as a parameter
                    //when we build our list of choices we will have access to our results
                    inquirer.prompt(matches(results), function(selected){
                        viewContact(selected);
                    })
                    }
                }
            })
}


//////////////Main Menu Prompts//////////////
var mainMenu = [{
    name: 'menu',
    type: 'list',
    message: 'What would you like to do?',
    choices: [{
        value: 'create',
        name: 'Create a new entry',
    }, {
        value: 'search',
        name: 'Search for existing entries'
    }, {
        value: 'exit',
        name: 'Exit program'
    }]
}];

//////////////Search Menu//////////////


//Validate
var searchMenu = [{
    name: 'search',
    message: 'Please input a name or search key to search by\n  or hit enter to see all contacts',
}];

var noMatches = [{
    name: 'noMatches',
    type: 'list',
    message: 'No matches found.\nWould you like to search again or return to the main menu?',
    choices: [{
        name: 'Search again',
        value: 'search'
    }, {
        name: 'Return to main menu',
        value: 'return'
    }]
}]

//////////////Edit Menu//////////////
var editMenu = [{
    name: 'edit',
    message: 'Please select an option',
    type: 'list',
    choices: [{
        name: 'Edit entry',
        value: 'edit'
    },{
        name: 'Delete entry',
        value: 'delete'
    }, {
        name: 'Back to Main Menu',
        value: 'back'
    }]
}];

//////////////Delete Menu//////////////

var deleteMenu = [{
    name: 'delete',
    message: 'Are you sure you want to delete this entry?',
    type: 'confirm'
}];


//////////////View Function//////////////

function viewContact(choice){
    console.log(displayTable(choice.select));
    inquirer.prompt(editMenu, function(editChoice){
        if(editChoice.edit === 'edit'){
            var contact = choice.select;
            editContact(contact, contacts)
            
        } else if(editChoice.edit === 'delete'){
            var contact = choice.select;
            deleteContact(contact,contacts);
        } else if(editChoice.edit === 'back'){
            addressBook();
        }
    })
}

//////////////Main Program//////////////

function addressBook(){
    inquirer.prompt(mainMenu, function(menuChoice){
        if(menuChoice.menu === 'exit'){
            console.log('Have a good day!');
            return;
        } else if(menuChoice.menu === 'create'){
            inquirer.prompt(createContact(), function(userInput){
                var newContact = userInput;
                newContact.id = contacts.length;
                contacts.push(newContact);
                console.log(displayTable(newContact));
                addressBook();
            })
        } else if(menuChoice.menu === 'search'){
            searchEntry();
        }
    })
}
addressBook();
