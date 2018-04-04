'use strict';

//  node_modules
const expect = require('expect');

//  local modules
const{Users} = require('./users');

let users;

describe('USERS', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Curly',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Joe',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Moe',
            room: 'Node Course'
        }];
    });

    it('should add a new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Doug',
            room: 'The Seahawks Fans'
        };
        let reUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '3';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should remove not a user', () => {
        let userId = '46';
        let user = users.removeUser(userId);

        expect(user).toBeFalsy();           //  toBeFalsy supercedes toNotExist
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        let userId = '2';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        let userId = '46';
        let user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return names for Node Course', () => {
        let userList = users.getUserList('Node Course');
        
        expect(userList).toEqual(['Curly', 'Moe']);
    });

    it('should return names for React Course', () => {
        let userList = users.getUserList('React Course');
        
        expect(userList).toEqual(['Joe']);
    });

});