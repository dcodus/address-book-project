# Address book project

## Basic instructions
  * Fork this repo and create a new Cloud9 project cloning your version
  * All your code will be in the `master` branch unless otherwise specified

## Screencast
Click on the image below to look at a screencast of *one possible solution*:

[![Demo of address book project](https://asciinema.org/a/4am79qbzzlej1r3cpl5idzqw6.png)](https://asciinema.org/a/4am79qbzzlej1r3cpl5idzqw6)

**IMPORTANT**: Your solution **does not have** to look *exactly* like this one! What we mostly care about is that you practice manipulating arrays/objects and writing asynchronous code :)

## Spec
You are tasked with writing a command-line version of an address book. Your program will use NPM to manage its dependencies so you should initialize a `package.json` as soon as you get started. Be descriptive in the name, description and tags you use.

**This version of the address book assumes that entries are located in Canada.**

When the program starts for the first time, it should display the **main menu** to the user using the [`inquirer`](https://www.npmjs.com/package/inquirer) module from NPM.

### Main menu
The main menu should ask the user to choose between one of the following options:
  * Create a new address book entry
  * Search for existing address book entries
  * Exit the program
  
### Exit the program
If the user chooses this option, the program should end. At this point, all the data collected so far will be destroyed, since it lives only in memory. Next week, we will see how this data can be saved to an external database.

### Search for existing address book entries
If the user chooses this option, the program should ask the user to enter a name they want to search for.
The program should then go through all the address book entries and find those that correspond to the entered name.
Matching entries will include **all** entries that have the input name either as a first name, last name, or one of the multiple email addresses.
The program will then display a menu with the following options:
  * One option for each entry found as [Last Name], [First Name]
  * An option to go back and do another search
  * An option to go back to the main menu

### Viewing an existing address book entry
When the user chooses an entry from a search, the program will display that entry to the user in a **vertical table** using the `cli-table` NPM module.
The vertical table should look like this:
```
┌────────────┬──────────────────────────────────┐
│ First Name │ Marjorie                         │
├────────────┼──────────────────────────────────┤
│ Last Name  │ G. Nguyen                        │
├────────────┼──────────────────────────────────┤
│ Birthday   │ January 15, 1959                 │
├────────────┼──────────────────────────────────┤
│ Addresses  │ home:                            │
│            │ 159 Karen Lane                   │
│            │ Bougonville, QC H0E 1V1          │
│            │ Canada                           │
├────────────┼──────────────────────────────────┤
│ Phones     │ home: 502-876-2996               │
│            │ work: 681-913-8349               │
│            │ other: 432-342-5435              │
├────────────┼──────────────────────────────────┤
│ Emails     │ home: MarjorieGNguyen@dayrep.com │
│            │ work: mgnguyen@megacorp.com      │
└────────────┴──────────────────────────────────┘
```
Following this grid, the program should provide the user with these options:
  * Edit the current entry
  * Delete the current entry
  * Go back to the main menu

### Delete the current entry
If the user chooses this option, they should be prompted "are you sure?". If they say yes, the entry is deleted and we go back to the main menu. If they say no, the entry remains and we get the entry menu again.

### Creating a new address book entry
If the user chooses this option, they should be asked for the following informations in order:

  * First name (**mandatory**)
  * Last name (**mandatory**)
  * Birthday (optional, any string is fine here)
  * For each of home, work and other, ask the user if they need an address for that type. If yes then ask for:
    * Address line 1 (**mandatory**)
    * Address line 2 (optional, any string is fine here)
    * City (**mandatory**)
    * Province (**mandatory**)
    * Postal code (**mandatory**)
    * Country (**mandatory**)
  * For each of home, work and other, ask the user if they need a phone number for that type. If yes, then ask for:
    * Phone number (**mandatory**)
    * Phone type (**mandatory**):
      * landline
      * cellular
      * fax
  * For each of home, work and other, ask the user if they need an email for that type. If yes, then ask for:
    * Email address (**mandatory**)

When the user has finished entering this information, the program should move to the "Viewing an exiting address book entry" with the newly added entry

### Editing an address book entry
If the user chooses this option, they should be asked the same informations as in the "Creating a new address book entry". However, if a piece of information was already provided, the prompt should give it as a default.

When the user has finished entering this information, the program should move to the "Viewing an exiting address book entry" with the edited entry.

## Optional
If you finish this project early on, you are allowed to go wild and add any features you think will make the address book nicer :) Some options include but are definitely not limited to:
  * Adding emojis somewhere (they're just Unicode characters, so they work fine in most modern consoles)
  * Showing the weather of the city where the currently displayed contact is located
  * Adding some [colors](https://www.npmjs.com/package/colors) to your address book
  * ...
