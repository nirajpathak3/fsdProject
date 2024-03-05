const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, 'models/posts.json');

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

async function getPosts(req, res) {
    try {
        const data = await fetchDataUsingFs();
        console.log(data);
        const posts = JSON.parse(data);

        return res.json(posts);
    } catch (error) {
        return error.message;
    }
};

module.exports = { getPosts };