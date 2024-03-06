const { objectId } = require('./mongo');

async function getUsers(db) {
    try {
        const users = await db.collection('users').find().toArray();
        console.log(users);
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

async function getUserById(db, userId) {
    try {
        const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

module.exports = { getUsers, getUserById }