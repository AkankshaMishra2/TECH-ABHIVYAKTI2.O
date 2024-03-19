document.addEventListener('DOMContentLoaded', function() {
    // Optional: Adjust as needed to handle group name input and display member addition UI
    document.getElementById('groupName').oninput = function() {
        handleGroupNameInput();
    };

    // Save Group Event Listener
    document.getElementById('saveGroup').addEventListener('click', function() {
        // Implement group saving logic here
        alert('Group saved!');
    });
});

function handleGroupNameInput() {
    const groupNameInput = document.getElementById('groupName').value.trim();
    const addMembersDiv = document.getElementById('addMembers');
    if (groupNameInput) {
        addMembersDiv.style.display = 'block';
    } else {
        addMembersDiv.style.display = 'none';
    }
}

function addMember() {
    const memberName = document.getElementById('memberName').value.trim();
    const memberEmail = document.getElementById('memberEmail').value.trim();
    if (!memberName || !memberEmail) {
        alert('Please enter both name and email for the member.');
        return;
    }

    const membersList = document.getElementById('members');
    const li = document.createElement('li');
    li.innerText = `${memberName} (${memberEmail}) `;

    // Creating the delete button with inline styling for color and background
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.style.color = 'red'; // Red color text
    deleteBtn.style.backgroundColor = 'transparent'; // Transparent background
    deleteBtn.style.border = 'none'; // Remove border if not needed
    deleteBtn.onclick = function() {
        membersList.removeChild(li);
    };

    li.appendChild(deleteBtn);
    membersList.appendChild(li);

    // Clear input fields after adding
    document.getElementById('memberName').value = '';
    document.getElementById('memberEmail').value = '';
}
// Create group object with details
var group = {
    name: groupName,
    type: groupType,
    settleUpDay: settleUpDay,
    members: []
  };

  // Get all added members
  var memberListItems = document.querySelectorAll("#members li");
  memberListItems.forEach(function(item) {
    var memberDetails = item.textContent.split(" - ");
    var member = {
      name: memberDetails[0],
      email: memberDetails[1]
    };
    group.members.push(member);
  });

  // Save group data to localStorage
  localStorage.setItem("savedGroup", JSON.stringify(group));

  

// Event listener for save button
document.getElementById("saveGroup").addEventListener("click", saveGroup);

function saveGroup() {
    const groupName = document.getElementById('groupName').value;
    const groupType = document.getElementById('groupType').value;
    const settleUpDay = document.getElementById('settleUpDay').value;
    const members = []; // Assume you have a way to collect members
  
    fetch('/addGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groupName, groupType, settleUpDay, members }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Do something on success, like redirecting or showing a success message
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  document.getElementById('saveGroup').addEventListener('click', saveGroup);
  