const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve your static files from the public directory

// Example POST route for adding a group
app.post('/addGroup', (req, res) => {
  const { groupName, groupType, settleUpDay, members } = req.body;
  
  // Here you would normally save this information to a database
  // For now, let's just log it to the console
  console.log('Group Name:', groupName);
  console.log('Group Type:', groupType);
  console.log('Settle Up Day:', settleUpDay);
  console.log('Members:', members);

  // Respond to the request
  res.json({message: 'Group saved successfully'});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
