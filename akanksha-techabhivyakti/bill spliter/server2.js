const express = require('express');
const app = express();
const port = 3000;

// Mock database query function
const getGroupsFromDb = () => {
    // This function should actually query your database
    // and return the list of groups
    return [{ name: "Example Group", type: "Friends", settleUpDay: "15", members: [] }];
};

app.get('/getGroups', (req, res) => {
    const groups = getGroupsFromDb();
    res.json(groups);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


fetch('/getGroups')
    .then(response => response.json())
    .then(data => {
        console.log('Groups:', data);
        // Process and display your groups data here
    })
    .catch((error) => {
        console.error('Error:', error);
    });
 