var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
var todoList = [];

var addNewTaskToArray = function (taskString) {
  todoList.push(taskString);
}

var removeTaskFromArray = function (taskString) {
  todoList = todoList.filter(task => task != taskString);
}

var editTaskInArray = function (oldTaskString, newTaskString) {
  todoList = todoList.map(task => {
    if (task == oldTaskString) {
      return newTaskString;
    }
    return task;
  });
}

//New Task List item

var createNewTaskElement = function (taskString) {
  // create List Item
  var listItem = document.createElement("li");
  // input checkbox
  var checkBox = document.createElement("input");
  // label
  var label = document.createElement("label");
  // input (text)
  var editInput = document.createElement("input");
  // button.edit
  var editButton = document.createElement("button");
  // button.delete
  var deleteButton = document.createElement("button");

  //Each element needs modified 

  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


//Add a new task
var addTask = function () {
  var inputValue = taskInput.value.trim();
  // Checking if the input is valid
  if (inputValue == undefined || inputValue.length == 0) {
    alert("Item cannot be empty");
    return;
  }
  // Checking if the input is already present
  if (todoList.includes(inputValue)) {
    alert("Item already present");
    return;
  }
  //Create a new list item with the text from the #new-task:
  var listItem = createNewTaskElement(inputValue);
  //Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  addNewTaskToArray(inputValue);
  taskInput.value = "";
}

//Edit an existing task
var editTask = function () {

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editButton = listItem.querySelector(".edit")

  var containsClass = listItem.classList.contains("editMode");

  // if class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode and change button inner text to Edit
    editButton.innerText = "Edit";
    //label text become the input's value
    var inputValue = editInput.value.trim();
    // Checking if any change in value
    if (inputValue == label.innerText){
      //Toggle .editMode on the parent 
      listItem.classList.toggle("editMode");
      return ;
    }
    // Checking if the input is valid
    if (inputValue == undefined || inputValue.length == 0) {
      alert("Item cannot be empty");
      //Toggle .editMode on the parent 
      listItem.classList.toggle("editMode");
      return;
    }
    // Checking if the input is already present
    if (todoList.includes(inputValue)) {
      alert("Item already present");
      //Toggle .editMode on the parent 
      listItem.classList.toggle("editMode");
      return;
    }
    editTaskInArray(label.innerText, inputValue);
    label.innerText = inputValue;
    //Toggle .editMode on the parent 
    listItem.classList.toggle("editMode");
  } else {
    //Switch to .editMode and change button inner text to Save
    editButton.innerText = "Save";
    //input value becomes the labels text
    editInput.value = label.innerText;
    //Toggle .editMode on the parent 
    listItem.classList.toggle("editMode");
  }
}

//Delete an existing task
var deleteTask = function () {
  //Remove the parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var label = listItem.querySelector("label");
  removeTaskFromArray(label.innerText);
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function () {
  //When the Checkbox is checked 
  //Append the task list item to the #completed-tasks ul
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


//Mark a task as incomplete
var taskIncomplete = function () {
  //When the checkbox is unchecked appendTo #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  // select listitems chidlren
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}