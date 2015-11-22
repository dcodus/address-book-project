var birthday = require("./createUpdateFunctions").birthday;
var dateValidation = require("./createUpdateFunctions").dateValidation;
var mandatory = require("./createUpdateFunctions").mandatory;
var capitalize = require("./createUpdateFunctions").capitalize;
var askNext = require("./createUpdateFunctions").askNext;

module.exports = create;

//////////////Create Function//////////////
function create(){
    return createContact;
} 

var createContact = [{
    name: 'firstName',
    message: 'First Name (Mandatory)',
    filter: capitalize,
    validate: mandatory
}, {
    name: 'lastName',
    message: 'Last Name (Mandatory)',
    filter: capitalize,
    validate: mandatory
}, {
    name: 'birthday',
    message: 'Date of birth (yyyy/mm/dd) (Optional)',
    validate: birthday
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
    when: askNext('addresses', 'home')

}, {
    name: 'homeAddressLine2',
    message: 'Home address Line 2',
    when: askNext('addresses', 'home')
}, {
    name: 'homeCity',
    message: 'Home City (Mandatory Field)',
    filter: capitalize,
    validate: mandatory,
    when: askNext('addresses', 'home')
}, {
    name: 'homeProvince',
    message: 'Home Province (Mandatory Field)',
    filter: capitalize,
    validate: mandatory,
    when: askNext('addresses', 'home')
}, {
    name: 'homePostalCode',
    message: 'Home Postal Code (Mandatory Field)',
    validate: mandatory,
    when: askNext('addresses', 'home')
}, {
    name: 'homeCountry',
    message: 'Home Country (Mandatory Field)',
    filter: capitalize,
    validate: mandatory,
    when: askNext('addresses', 'home')
}, {
    name: 'workAddressLine1',
    message: "Work address Line 1 (Mandatory Field)",
    validate: mandatory,
    when: askNext('addresses', 'work')
}, {
    name: 'workAddressLine2',
    message: 'Work address Line 2',
    when: askNext('addresses', 'work')
}, {
    name: 'workCity',
    message: 'Work City (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    when: askNext('addresses', 'work')
}, {
    name: 'workProvince',
    message: 'Work Province (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    when: askNext('addresses', 'work')
}, {
    name: 'workPostalCode',
    message: 'Work Postal Code (Mandatory Field)',
    validate: mandatory,
    when: askNext('addresses', 'work')
}, {
    name: 'workCountry',
    message: 'Work Country (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    when: askNext('addresses', 'work')
}, {
    name: 'otherAddressLine1',
    message: "Other address Line 1 (Mandatory Field)",
    validate: mandatory,
    when: askNext('addresses', 'other')
}, {
    name: 'otherAddressLine2',
    message: 'Other address Line 2',
    when: askNext('addresses', 'other')
}, {
    name: 'otherCity',
    message: 'Other City (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    when: askNext('addresses', 'other')
}, {
    name: 'otherProvince',
    message: 'Other Province (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    when: askNext('addresses', 'other')
}, {
    name: 'otherPostalCode',
    message: 'Other Postal Code (Mandatory Field)',
    validate: mandatory,
    when: askNext('addresses', 'other')
}, {
    name: 'otherCountry',
    message: 'Other Country (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    when: askNext('addresses', 'other')
}, {
    name: 'personalEmail',
    message: 'Personal Email Address (Mandatory Field)',
    validate: mandatory,
    when: askNext('emailAddresses', 'personal')
}, {
    name: 'workEmail',
    message: 'Work Email Address (Mandatory Field)',
    validate: mandatory,
    when: askNext('emailAddresses', 'work')
}, {
    name: 'otherEmail',
    message: 'Other Email Address (Mandatory Field)',
    validate: mandatory,
    when: askNext('emailAddresses', 'other')
}, {
    name: 'homePhone',
    message: 'Home Phone Number (Mandatory Field)',
    validate: mandatory,
    when: askNext('phoneNumbers', 'home')
}, {
    name: 'workPhone',
    message: 'Work Phone Number (Mandatory Field)',
    validate: mandatory,
    when: askNext('phoneNumbers', 'work')
}, {
    name: 'otherPhone',
    message: 'Other Phone Number (Mandatory Field)',
    validate: mandatory,
    when: askNext('phoneNumbers', 'other')
}]