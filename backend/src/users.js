const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'models/users.json');

async function fetchDataUsingFs() {
    try {
        console.log(filePath);
        // Read file synchronously
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("Hello")
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function getUsers(req, res) {
    try {
        const data = await fetchDataUsingFs();
        const userdata = JSON.parse(data).users;

        return res.json(userdata);
    } catch (error) {
        return error.message;
    }
};

module.exports = { getUsers };