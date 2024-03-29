// Select the form, input, and list elements from the HTML
const form = document.querySelector('form');
const input = document.querySelector('#new-item');
const itemsList = document.querySelector('#items');
const selectQuestion = document.getElementById('questionType');

const addButton = document.getElementById('add-btn');
const submitButton = document.getElementById('submit-btn');
<script src = "jquery-3.6.3.min.js"></script>
let listArray = [];
// Load items from local storage, or create an empty array 
// if there are none
const items = JSON.parse(localStorage.getItem('items')) || [];

// Display the items in the list
function displayItems() {
    // Create an array of list items, one for each item in the items array
    const itemsHTML = items.map((item, index) => {
        // Each item in the array will be a list item with a span for
        // the text and a button for deleting
        return ` <li> <span>${item}</span> <button class="delete-btn" data-index="${index}">Delete</button> </li> `;
    });
    // Join the array of list items into a single string and add it to
    // the list element in the HTML
    itemsList.innerHTML = itemsHTML.join('');
}

// Add a new item to the list
function addItem(e) {
    // Prevent the default form submission
    e.preventDefault();
    // Get the text value from the input and trim any whitespace
    var questionValue = selectQuestion.options[selectQuestion.selectedIndex].value;
    var text = input.value.trim();
    listArray.push(text +","+questionValue);
    if (text.length) {
        // Add the text to the items array and store it in local storage
        items.push(text);
        localStorage.setItem('items', JSON.stringify(items));
        // Clear the input field and display the updated list of items
        input.value = '';
        displayItems();
    }
    console.log(listArray);
}

// Delete an item from the list
function deleteItem(e) {
    // Check if the clicked element is a delete button
    if (e.target.matches('.delete-btn')) {
        // Get the index of the item from the data-index attribute
        // of the delete button
        const index = e.target.dataset.index;
        // Remove the item from the items array and update local storage
        listArray.splice(index, 1);
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        // Display the updated list of items
        console.log(listArray);
        displayItems();
    }
}

/*$(document).ready(function(){
    $("#submit-btn").click(function(){
      $.ajax({
        type: "POST",
        url: 'surveyPHP.php', 
        data:{listArray : JSON.stringify(listArray)},
        dataType: "json",
        success: function(result){
            alert(data.reply);
      }});
    });
  });*/

// Add event listeners to the form and list elements
form.addEventListener('submit', addItem);
//form.addEventListener(submitButton, itemsIntoArray);
itemsList.addEventListener('click', deleteItem);

// Call the displayItems function to initially display the items 
// in the list
displayItems();

