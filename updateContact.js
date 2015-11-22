var birthday = require("./createUpdateFunctions").birthday;
var dateValidation = require("./createUpdateFunctions").dateValidation;
var mandatory = require("./createUpdateFunctions").mandatory;
var capitalize = require("./createUpdateFunctions").capitalize;
var askNext = require("./createUpdateFunctions").askNext;

module.exports = updateContact;

function checkSelection(field, type, oldContact){
    if(oldContact[field].indexOf(type) > -1){
        return true;
    } else {
        return false;
    }
}

function updateContact(old){
   return [{
    name: 'firstName',
    message: 'First Name (Mandatory)',
    filter: capitalize,
    validate: mandatory,
    default: old.firstName
}, {
    name: 'lastName',
    message: 'Last Name (Mandatory)',
    filter: capitalize,
    validate: mandatory,
    default: old.lastName
}, {
    name: 'birthday',
    message: 'Date of birth (yyyy/mm/dd) (Optional)',
    validate: birthday,
    default: old.birthday
}, {
    name: 'addresses',
    message: 'Choose the type(s) of address(es) you would like to add',
    type: 'checkbox',
    choices: [{
        name: 'home',
        checked: checkSelection('addresses', 'home', old)
    }, {
        name: 'work',
        checked: checkSelection('addresses', 'work', old)
    }, {
        name: 'other',
        checked: checkSelection('addresses', 'other', old)
    }]
}, {
    name: 'phoneNumbers',
    message: 'Choose the type(s) of phone number(es) you would like to add',
    type: 'checkbox',
    choices: [{
        name: 'home',
        checked: checkSelection('phoneNumbers', 'home', old)
    }, {
        name: 'work',
        checked: checkSelection('phoneNumbers', 'work', old)
    }, {
        name: 'other',
        checked: checkSelection('phoneNumbers', 'other', old)
    }]
}, {
    name: 'emailAddresses',
    message: 'Choose the type(s) of email(s) you would like to add',
    type: 'checkbox',
    choices: [{
        name: 'personal',
        checked: checkSelection('emailAddresses', 'personal', old)
    }, {
        name: 'work',
        checked: checkSelection('emailAddresses', 'work', old)
    }, {
        name: 'other',
        checked: checkSelection('emailAddresses', 'other', old)
    }]
}, {
    name: 'homeAddressLine1',
    message: "Home address Line 1 (Mandatory Field)",
    validate: mandatory,
    default: old.homeAddressLine1,
    when: askNext('addresses', 'home')

}, {
    name: 'homeAddressLine2',
    message: 'Home address Line 2',
    default: old.homeAddressLine2,
    when: askNext('addresses', 'home')
}, {
    name: 'homeCity',
    message: 'Home City (Mandatory Field)',
    filter: capitalize,
    validate: mandatory,
    default: old.homeCity,
    when: askNext('addresses', 'home')
}, {
    name: 'homeProvince',
    message: 'Home Province (Mandatory Field)',
    filter: capitalize,
    validate: mandatory,
    default: old.homeProvince,
    when: askNext('addresses', 'home')
}, {
    name: 'homePostalCode',
    message: 'Home Postal Code (Mandatory Field)',
    validate: mandatory,
    default: old.homePostalCode,
    when: askNext('addresses', 'home')
}, {
    name: 'homeCountry',
    message: 'Home Country (Mandatory Field)',
    filter: capitalize,
    validate: mandatory,
    default: old.homeCountry,
    when: askNext('addresses', 'home')
}, {
    name: 'workAddressLine1',
    message: "Work address Line 1 (Mandatory Field)",
    validate: mandatory,
    default: old.workAddressLine1,
    when: askNext('addresses', 'work')
}, {
    name: 'workAddressLine2',
    message: 'Work address Line 2',
    default: old.workAddressLine2,
    when: askNext('addresses', 'work')
}, {
    name: 'workCity',
    message: 'Work City (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    default: old.workCity,
    when: askNext('addresses', 'work')
}, {
    name: 'workProvince',
    message: 'Work Province (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    default: old.workProvince,
    when: askNext('addresses', 'work')
}, {
    name: 'workPostalCode',
    message: 'Work Postal Code (Mandatory Field)',
    validate: mandatory,
    default: old.workPostCode,
    when: askNext('addresses', 'work')
}, {
    name: 'workCountry',
    message: 'Work Country (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    default: old.workCountry,
    when: askNext('addresses', 'work')
}, {
    name: 'otherAddressLine1',
    message: "Other address Line 1 (Mandatory Field)",
    validate: mandatory,
    default: old.otherAddressLine1,
    when: askNext('addresses', 'other')
}, {
    name: 'otherAddressLine2',
    message: 'Other address Line 2',
    default: old.otherAddressLine2,
    when: askNext('addresses', 'other')
}, {
    name: 'otherCity',
    message: 'Other City (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    default: old.otherCity,
    when: askNext('addresses', 'other')
}, {
    name: 'otherProvince',
    message: 'Other Province (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    default: old.otherProvince,
    when: askNext('addresses', 'other')
}, {
    name: 'otherPostalCode',
    message: 'Other Postal Code (Mandatory Field)',
    validate: mandatory,
    default: old.otherPostalCode,
    when: askNext('addresses', 'other')
}, {
    name: 'otherCountry',
    message: 'Other Country (Mandatory Field)',
    filter : capitalize,
    validate: mandatory,
    default: old.otherCountry,
    when: askNext('addresses', 'other')
}, {
    name: 'personalEmail',
    message: 'Personal Email Address (Mandatory Field)',
    validate: mandatory,
    default: old.personalEmail,
    when: askNext('emailAddresses', 'personal')
}, {
    name: 'workEmail',
    message: 'Work Email Address (Mandatory Field)',
    validate: mandatory,
    default: old.workEmail,
    when: askNext('emailAddresses', 'work')
}, {
    name: 'otherEmail',
    message: 'Other Email Address (Mandatory Field)',
    validate: mandatory,
    default: old.otherEmail,
    when: askNext('emailAddresses', 'other')
}, {
    name: 'homePhone',
    message: 'Home Phone Number (Mandatory Field)',
    validate: mandatory,
    default: old.homePhone,
    when: askNext('phoneNumbers', 'home')
}, {
    name: 'workPhone',
    message: 'Work Phone Number (Mandatory Field)',
    validate: mandatory,
    default: old.workPhone,
    when: askNext('phoneNumbers', 'work')
}, {
    name: 'otherPhone',
    message: 'Other Phone Number (Mandatory Field)',
    validate: mandatory,
    default: old.otherPhone,
    when: askNext('phoneNumbers', 'other')
}]

}
