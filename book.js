////////////////MODULES////////////////////
var inquirer = require("inquirer");
////////////////MODULES////////////////////

////////////////Question Help Functions////////////////////

var find = function(field, type){
    return function(answers){
        if(answers[field].indexOf(type) > - 1){
            return true;
        }
    }
}

function search(key){
  var results = contacts.filter(function(contact){
    for(var prop in contact){
      if(contact[prop].indexOf(key) > -1){
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
    choices: [
        {name: 'Create a new address book entry', value: 'create'},
        {name: 'Search for existing address book entries', value: 'search'},
        {name: 'Exit the program', value: 'exit'}]
}];

var search = [{
    name: 'Search',
    message: 'Please enter a name or key word to search for.'
}];

var createContact = [{
    name: 'firstName',
    message: 'First Name'
}, {
    name: 'lastName',
    message: 'Last Name'
}, {
    name: 'birthday',
    message: 'Date of birth (yyyy/mm/dd) (Optional)',
},{
    name: 'addresses',
    message: 'Choose the type(s) of address(es) you would like to add',
    type: 'checkbox',
    choices: [
        {name: 'home'},
        {name: 'work'},
        {name: 'other'}
        ]
}, {
    name: 'phoneNumbers',
    message: 'Choose the type(s) of phone number(es) you would like to add',
    type: 'checkbox',
    choices: [
        {name: 'home'},
        {name: 'work'},
        {name: 'cell'},
        {name: 'other'}
        ]
}, {
    name: 'emailAddresses',
    message: 'Choose the type(s) of email(s) you would like to add',
    type: 'checkbox',
    choices: [
        {name: 'personal'},
        {name: 'work'},
        {name: 'other'}
        ]
}, {
    name: 'homeAddressLine1',
    message: "Home address Line 1",
    when: find('addresses', 'home') 
    
}, {
    name: 'homeAddressLine2',
    message: 'Home address Line 2',
    when: find('addresses', 'home') 
}, {
    name: 'homeCity',
    message: 'Home City',
    when: find('addresses', 'home') 
}, {
    name: 'homeProvince',
    message: 'Home Province',
    when: find('addresses', 'home') 
}, {
    name: 'homePostalCode',
    message: 'Home Postal Code',
    when: find('addresses', 'home') 
}, {
    name: 'homeCountry',
    message: 'Home Country',
    when: find('addresses', 'home') 
}, {
    name: 'workAddressLine1',
    message: "Work address Line 1",
    when: find('addresses', 'work') 
    
}, {
    name: 'workAddressLine2',
    message: 'Work address Line 2',
    when: find('addresses', 'work') 
    
}, {
    name: 'workCity',
    message: 'Work City',
    when: find('addresses', 'work') 
}, {
    name: 'workProvince',
    message: 'Work Province',
    when: find('addresses', 'work') 
}, {
    name: 'workPostalCode',
    message: 'Work Postal Code',
    when: find('addresses', 'work') 
}, {
    name: 'workCountry',
    message: 'Work Country',
    when: find('addresses', 'work') 
},  {
    name: 'otheAddressLine1',
    message: "Other address Line 1",
    when: find('addresses', 'other') 
    
}, {
    name: 'otherAddressLine2',
    message: 'Other address Line 2',
    when: find('addresses', 'other') 
    
}, {
    name: 'otherCity',
    message: 'Other City',
    when: find('addresses', 'other') 
}, {
    name: 'otherProvince',
    message: 'Other Province',
    when: find('addresses', 'other') 
}, {
    name: 'otherPostalCode',
    message: 'Other Postal Code',
    when: find('addresses', 'other') 
}, {
    name: 'otherCountry',
    message: 'Other Country',
    when: find('addresses', 'other') 
},  {
    name: 'personalEmail',
    message: 'Personal Email Address',
    when: find('emailAddresses','personal')
}, {
    name: 'workEmail',
    message: 'Work Email Address',
    when: find('emailAddresses', 'work')
}, {
    name: 'otherEmail',
    message: 'Other Email Address',
    when: find('emailAddresses', 'other')
}, {
    name: 'personalPhone',
    message: 'Personal Phone Number',
    when: find('phoneNumbers', 'personal')
}, {
    name: 'workPhone',
    message: 'Work Phone Number',
    when: find('phoneNumbers', 'work')
}, {
    name: 'cellPhone',
    message: 'Cell Phone Number',
    when: find('phoneNumbers', 'cell')
}, {
    name: 'otherPhone',
    message: 'Other Phone Number',
    when: find('phoneNumbers', 'other')
}]

////////////////QUESTIONS////////////////////

////////////////DATABASE////////////////////
var contacts = [];
////////////////DATABASE////////////////////


////////////////DRAFT SPACE////////////////////
/*



*/
////////////////DRAFT SPACE////////////////////

inquirer.prompt([mainMenu[0]], function( menuChoice ) {
	if(menuChoice[mainMenu[0].name] === 'exit'){
	    console.log('Have a good day!');
	    return;
	} else if(menuChoice[mainMenu[0].name] === 'create'){
	    inquirer.prompt(createContact, function(contact) {
	       contacts.push(contact);
	       console.log(contacts)
	    })
	} else if(menuChoice[mainMenu[0].name] === 'search'){
	    inquirer.prompt(search, function(search){
	        
	    })
	}
});