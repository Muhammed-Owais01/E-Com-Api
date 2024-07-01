const request = require('supertest')
const app = require('../../app');

exports.users = {
    user1: {
        username: 'TEST_USER1',
        password: 'TEST_PASSWORD1',
        token: ""
    },
    user2: {
        username: 'TEST_USER2',
        password: 'TEST_PASSWORD2',
        token: ""
    },
    user3: {
        username: 'TEST_USER3',
        password: 'TEST_PASSWORD3',
        token: ""  
    },
    updated_user1: {
        username: 'UPDATED_TEST_USER1',
        password: 'UPDATED_TEST_PASSWORD1',
        token: ""
    }
}

exports.createUser = async (user) => {
    const res = await request(app)
    .post('/user/signup')
    .send({...user});
    
    return res;
}

exports.loginUser = async (user) => {
    const res = await request(app)
    .post('/user/login')
    .send({...user})

    return res;
}

exports.deleteUser = async (user) => {
    const res = await request(app)
    .delete('/user')
    .set('Authorization', `Bearer ${user.token}`)

    return res;
}

exports.updateUser = async (user) => {
    const res = await request(app)
    .patch(`user/${user.id}`)
    .set('Authorization', `Bearer ${user.token}`)
    .send({...user})

    return res;
}