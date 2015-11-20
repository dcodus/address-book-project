var inquirer = require('inquirer');

module.exports = create;

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

function create(callback){
    inquirer.prompt(createContact, function(contact) {
        callback(contact);
    })
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