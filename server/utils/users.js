'use strict;'

[{
    id: '/#12poiajdfspfoif',
    name: 'Doug',
    room: 'The Office Fans'
}];


//  removeuser(id)
//  getuser(id)
//  getuserlist(room)

class Users {
    constructor() {
        this.users = [];    //  initializes the class
    }

    addUser(id, name, room) {
        let user = {id, name, room};    //  builds the user instance
        this.users.push(user);          //  adds the user instance to the array
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);

        if ( user ) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;

    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]; //  return only first matching id or undefined
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};

//  ES6 Classes -- Person is and example of an ES6 class
//  constuctor is optional, and defines the properties
//  the methods -- are custom designed (getUserDescription)
/*class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }

    getUserDescription() {
        return `${this.name} is ${this.age} year(s) old.`;
    }
}

let me = new Person('Doug', 72);
let description = me.getUserDescription();

console.log('this.name', me.name);
console.log('this.age', me.age);
console.log(description);*/