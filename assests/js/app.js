let item = document.getElementById('item');
const addItem = document.getElementById('addItem');
let data = (localStorage.getItem('todoList') ) ? JSON.parse(localStorage.getItem('todoList')):{
    todo:[],
    complete: []
}

// icons
const removeIcon = '<i class="icofont-trash"></i>';
const completeIcon = '<i class="icofont-check-circled"></i>';

renderTodoList();
// event listener
addItem.addEventListener('click', function () {
    // get text from item and add to the body
    let value = item.value;

    if (value) {
        add(value)
    }
});

document.getElementById('item').addEventListener('keydown', function (e) {

    let value = this.value;
    
    if (e.code === 'Enter' && value) {
        add(value)
    }
});

function add(value) {
    addItemTodo(value)
    // reset input value
    item.value = ''

    data.todo.push(value)
    dataObjectUpdate();
}

function renderTodoList() {
    if (!data.todo.length && !data.complete.length) return;

    for (let i = 0; i < data.todo.length; i++){
        let value = data.todo[i]
        addItemTodo(value)
    }

    for (let i = 0; i < data.complete.length; i++){
        let value = data.complete[i]
        addItemTodo(value, true)
    }
}
function dataObjectUpdate() {
    localStorage.setItem('todoList', JSON.stringify(data))
}

function removeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;

    let value = item.innerText;

    if (parentId === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.complete.splice(data.todo.indexOf(value), 1);
    }

    dataObjectUpdate();

    parent.removeChild(item);
    //    document.querySelector('.todo').removeChild(this.parentNode.parentNode)
}

function completedItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;

    let parentId = parent.id;
    let value = item.innerText;

    if (parentId === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.complete.push(value);
    } else {
        data.complete.splice(data.todo.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdate();
    // check which container should have the item
    let target = (parentId === 'todo') ? document.querySelector('#completed') : document.querySelector('#todo');
    
    parent.removeChild(item);

    target.insertBefore(item, target.childNodes[0]);
}

// add new items to todo list
function addItemTodo(text, completed) {

    let list = (completed) ? document.querySelector('#completed') : document.querySelector('#todo');

    let item = document.createElement('li');

    item.innerText = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons')

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeIcon;
    // add event listener to remove
    remove.addEventListener('click', removeItem);

    // complete
    let complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeIcon;
    // add event listener to completed task
    complete.addEventListener('click', completedItem)

    buttons.appendChild(remove);
    buttons.appendChild(complete);

    item.appendChild(buttons)

    list.insertBefore(item, list.childNodes[0]);
}