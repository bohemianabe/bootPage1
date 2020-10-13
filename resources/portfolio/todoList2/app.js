//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

// EVENT LISTENER
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//this event is attached to the document to make sure it is loaded from local storage
document.addEventListener('DOMContentLoaded', getTodos);

//FUNCTIONS
function addTodo(e) {
  //prevent form from submitting
  e.preventDefault();
  //TODO DIV
  if (todoInput.value.trim() === "") {
    alert("You must enter in a string to submit!");
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CREATE <li>
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    // take the div created above and stick the <li> into it
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //create checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    //attach the checkmarkbutton to the div above
    todoDiv.appendChild(completedButton);
    //create delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    //attach trashButton to div above
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todoInput value
    todoInput.value = "";
  }
}

function deleteCheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        //this function is added to remove from local storage
        removeLocaltodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    //.childNodes allows us to use forEach();
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
                case 'completed':
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                    case 'incomplete':
                        if(!todo.classList.contains('completed')){
                            todo.style.display = 'flex';
                        }else {
                            todo.style.display = 'none';
                        }
                        break;
        }
    })   
};

function saveLocalTodos(todo){
    //CHECK IF THERE IS ALREADY THINGS IN STORAGE
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};


//retrieve from the local storage
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //ITERATE OVER THE JSON AND REGENERATE THE SAME WAY AS YOU CREATED FROM ABOVE
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        //CREATE <li>
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo; // the pass through items are entered here 
        // take the div created above and stick the <li> into it
        todoDiv.appendChild(newTodo);
        //create checkmark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        //attach the checkmarkbutton to the div above
        todoDiv.appendChild(completedButton);
        //create delete button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        //attach trashButton to div above
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    
    })
}

//to delete index from local storage
function removeLocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // get the index to delete. go from the div to child to inner text. being specific
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

};


//simplified verson of the function removeLocaltodos() above

/*
const todos = ['apple', 'mango', 'banana', 'strawberry']

const mangoIndex = todos.indexOf('mang');

todos.splice(mangoIndex, 1);

*/