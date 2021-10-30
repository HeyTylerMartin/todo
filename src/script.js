// SELECTORS
const taskInput = document.querySelector(".new-task__content");
const taskList = document.querySelector(".task-archive__list");
const check = document.querySelector(".task-archive__checkbox");

// CREATING A NEW TASK

function newTaskCreate(key) {
  // SOMEONE PRESSES A NEW KEY
  if (key.key === "Enter" && taskInput === document.activeElement) {
    // CHECK IF THE KEY WAS ENTER & IF INPUT IS IN FOCUS
    if (taskInput.value === "") {
      // NO MESSAGE CONTENT, THROW ALERT
      alert(
        `Dude, really? You're just gonna add nothing to your to-do list so you can check it off and feel all bad ass? Shut up and add a task.`
      );
    } else {
      // HERE'S THE GOOD STUFF

      // ADD INPUT TO THE BOTTOM OF THE TO DO LIST ARCHIVE AS AN LI

      const list = document.querySelector(".task-archive__list"); // GRAB THE LIST

      // VARIABLES FOR CREATING ELEMENTS

      const newToDo = document.createElement("div"); // CREATES CONTAINER
      const itemToDo = document.createElement("li"); // CREATES THE <LI></LI>
      const newCheck = document.createElement("div"); // CREATES DIV FOR CHECK
      const toDoContent = document.createTextNode(taskInput.value); // TURNS USER INPUT INTO TEXT ELEMENT
      const newDel = document.createElement("span"); //CREATES DIV FOR DELETE BUTTON

      // ATTRIBUTING THE ELEMENTS

      newCheck.setAttribute("class", "task-archive__checkmark"); // CLASSIFICATION
      newToDo.setAttribute("class", "task-archive__task"); // CLASSIFICATION
      itemToDo.setAttribute("class", "task-archive__content"); //CLASSIFICATION
      newDel.setAttribute("class", "task-archive__delete"); //CLASSIFICATION

      // DOCUMENT FRAGMENTATION FOR BUILDING THE LIST ITEM

      const documentFragment = document.createDocumentFragment();

      documentFragment.appendChild(newToDo);
      newToDo.appendChild(itemToDo);
      newToDo.appendChild(newCheck);
      newToDo.appendChild(newDel);
      itemToDo.appendChild(toDoContent);
      newCheck.innerHTML = '<i class="fas fa-check"></i>';
      newDel.innerHTML = '<i class="fas fa-trash"></i>';

      newCheck.addEventListener("click", toggleCheck);
      newDel.addEventListener("click", deleteTask); // ADDS DELETE BUTTON LISTENER

      // HOOKING IT INTO THE DOM

      list.appendChild(documentFragment);

      // CLEAR INPUT VALUE

      taskInput.value = "";
    }
  }
}

// DELETES A TASK

function deleteTask(target) {
  const delList = target.target.parentNode.parentNode;
  delList.remove();
}

// CHECKS STATE OF TASK FOR STYLING COMPLETED TASKS

function toggleCheck(target) {
  console.log(target.target.parentNode.innerHTML);

  if (target.target.parentNode.innerHTML === '<i class="fas fa-check"></i>') {
    target.target.parentNode.parentNode.classList.toggle(
      "task-archive__complete"
    );

    console.log(target.target.parentNode.parentNode);

    // REORDER OUR LIST

    kiddos = taskList.children;
    const completeTasks = [];
    const incompleteTasks = [];

    for (const element of kiddos) {
      if (element.className === "task-archive__task task-archive__complete") {
        completeTasks.push(element);
      } else {
        incompleteTasks.push(element);
      }
    }

    clearAll();

    for (const element of incompleteTasks) {
      taskList.appendChild(element);
    }

    for (const element of completeTasks) {
      taskList.appendChild(element);
    }
  }
}

// CLEAR ALL COMPLETE TASKS

function clearComplete() {
  const completeTasks = document.querySelectorAll(".task-archive__complete");
  for (const element of completeTasks) {
    element.parentNode.removeChild(element);
  }
}

// CLEAR ALL TASKS

function clearAll() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

// EVENT LISTENERS

document.addEventListener("keydown", newTaskCreate); // LISTENS FOR ENTER TO CREATE NEW TASK
document
  .querySelector(".task-archive__clear-all")
  .addEventListener("click", clearAll);
document
  .querySelector(".task-archive__clear-completed")
  .addEventListener("click", clearComplete);

// TODO DIsable movement of "incomplete task" to below the "completed task" area.
