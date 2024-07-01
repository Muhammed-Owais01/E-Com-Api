const { describe, test, expect, afterAll } = require('@jest/globals');
const { createUser, deleteUser, loginUser, updateUser, users } = require('./user_utils');

let token;

describe('Create and login users', () => {
    test("Creating user1", async () => {
        const res = await createUser(users.user1);
        expect(res.statusCode).toBe(200);
    })
    test("Logging in user1", async () => {
        const res = await loginUser(users.user1);
        expect(res.statusCode).toBe(200);
        users.user1.token = res.body.token;
    })

    test("Creating user2", async () => {
        const res = await createUser(users.user2);
        expect(res.statusCode).toBe(200);
    })
    test("Logging in user2", async () => {
        const res = await loginUser(users.user2);
        expect(res.statusCode).toBe(200);
        token = res.body.token;
    })
})

describe("Updating users", () => {
    test("Changing details of user1 to user3", async () => {
        const res = await updateUser(users.user1, {...users.updated_user1});
        expect(res.statusCode).toBe(200);
    })
})

describe("Deleting users", () => {
    test("Deleting user1", async () => {
        const res = await deleteUser(users.user1);
        expect(res.statusCode).toBe(200);
    });

    test("Deleting user2", async () => {
        const res = await deleteUser(users.user2);
        expect(res.statusCode).toBe(200);
    })
})