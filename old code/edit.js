var inquirer = require("inquirer");
var create = require('./create');
var display = require('./display');
module.exports = editContact;

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

function getEditCon(contact) {
    return [{
    name: 'firstName',
    message: 'First Name (Mandatory)',
    validate: mandatory,
    default: contact.resultChoice.firstName
}, {
    name: 'lastName',
    message: 'Last Name (Mandatory)',
    validate: mandatory,
    default: contact.resultChoice.lastName
}, {
    name: 'birthday',
    message: 'Date of birth (yyyy/mm/dd) (Optional)',
    default: contact.resultChoice.birthday
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
    },
    ]
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
    default: contact.resultChoice.homeAddressLine1,
    when: find('addresses', 'home')

}, {
    name: 'homeAddressLine2',
    message: 'Home address Line 2',
    default: contact.resultChoice.homeAddressLine2,
    when: find('addresses', 'home')
}, {
    name: 'homeCity',
    message: 'Home City (Mandatory Field)',
    default: contact.resultChoice.homeCity,
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'homeProvince',
    message: 'Home Province (Mandatory Field)',
    default: contact.resultChoice.homeProvince,
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'homePostalCode',
    message: 'Home Postal Code (Mandatory Field)',
    default: contact.resultChoice.homePostalCode,
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'homeCountry',
    message: 'Home Country (Mandatory Field)',
    default: contact.resultChoice.homeCountry,
    validate: mandatory,
    when: find('addresses', 'home')
}, {
    name: 'workAddressLine1',
    message: "Work address Line 1 (Mandatory Field)",
    default: contact.resultChoice.workAddressLine1,
    validate: mandatory,
    when: find('addresses', 'work')

}, {
    name: 'workAddressLine2',
    message: 'Work address Line 2',
    default: contact.resultChoice.workAddressLine2,
    when: find('addresses', 'work')

}, {
    name: 'workCity',
    message: 'Work City (Mandatory Field)',
    default: contact.resultChoice.workCity,
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'workProvince',
    message: 'Work Province (Mandatory Field)',
    default: contact.resultChoice.workProvince,
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'workPostalCode',
    message: 'Work Postal Code (Mandatory Field)',
    default: contact.resultChoice.workPostalCode,
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'workCountry',
    message: 'Work Country (Mandatory Field)',
    default: contact.resultChoice.workCountry,
    validate: mandatory,
    when: find('addresses', 'work')
}, {
    name: 'otherAddressLine1',
    message: "Other address Line 1 (Mandatory Field)",
    default: contact.resultChoice.otherAddressLine1,
    validate: mandatory,
    when: find('addresses', 'other')

}, {
    name: 'otherAddressLine2',
    message: 'Other address Line 2',
    default: contact.resultChoice.otherAddressLine2,
    when: find('addresses', 'other')

}, {
    name: 'otherCity',
    message: 'Other City (Mandatory Field)',
    defaut: contact.resultChoice.otherCity,
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'otherProvince',
    message: 'Other Province (Mandatory Field)',
    default: contact.resultChoice.otherProvince,
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'otherPostalCode',
    message: 'Other Postal Code (Mandatory Field)',
    default: contact.resultChoice.otherPostalCode,
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'otherCountry',
    message: 'Other Country (Mandatory Field)',
    default: contact.resultChoice.otherCountry,
    validate: mandatory,
    when: find('addresses', 'other')
}, {
    name: 'personalEmail',
    message: 'Personal Email Address (Mandatory Field)',
    default: contact.resultChoice.personalEmail,
    validate: mandatory,
    when: find('emailAddresses', 'personal')
}, {
    name: 'workEmail',
    message: 'Work Email Address (Mandatory Field)',
    default: contact.resultChoice.workEmail,
    validate: mandatory,
    when: find('emailAddresses', 'work')
}, {
    name: 'otherEmail',
    message: 'Other Email Address (Mandatory Field)',
    default: contact.resultChoice.otherEmail,
    validate: mandatory,
    when: find('emailAddresses', 'other')
}, {
    name: 'homePhone',
    message: 'Home Phone Number (Mandatory Field)',
    default: contact.resultChoice.homePhone,
    validate: mandatory,
    when: find('phoneNumbers', 'home')
}, {
    name: 'workPhone',
    message: 'Work Phone Number (Mandatory Field)',
    default: contact.resultChoice.workPhone,
    validate: mandatory,
    when: find('phoneNumbers', 'work')
}, {
    name: 'otherPhone',
    message: 'Other Phone Number (Mandatory Field)',
    default: contact.resultChoice.otherPhone,
    validate: mandatory,
    when: find('phoneNumbers', 'other')
}]

}



var editEntry = [{
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

function deleteEntry(delCon){
    return [{
    name: 'delete',
    type: 'confirm',
    message: 'Are you sure you want to delete this entry?'
    }]
}



function editContact(contact, cb){
    inquirer.prompt(editEntry, function(choice){
            if(choice.edit === 'edit'){
                inquirer.prompt(getEditCon(contact), function(answers){
                    answers.id = contact.resultChoice.id
                    cb(answers);
                })
            } else if(choice.edit === 'delete'){
                inquirer.prompt(deleteEntry(contact), function(answer){
                    if(answer.delete === true){
                        cb(contact, true);
                    }
                })
            }
    })
}

/*
else if(choice.edit === 'delete'){
                inquirer.prompt(deleteEntry(contact), function(answer){
                    if(answer.delete === true){
                        cb(contact, true);
                    }
                })
            }
*/