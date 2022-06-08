let body = document.querySelector('body');
let input = document.querySelector('.input');
let btn = document.querySelector('.btn');
let container = document.querySelector('.container');
let form = document.querySelector('form');

let clear = document.createElement('button');
form.appendChild(clear);
clear.textContent = 'Clear!';
clear.setAttribute('class', 'empty');
clear.style.display = 'none';

let tasks = [];
let m = 0;

function buildDom(inputValue) {
    // add task
    let task = document.createElement('div');
    let text = document.createElement('p');
    let remove = document.createElement('button');
    let edit = document.createElement('button');
    text.textContent = inputValue;
    container.appendChild(task);
    task.appendChild(text);
    remove.textContent = 'Remove';
    task.appendChild(remove);
    edit.textContent = 'Edit';
    task.appendChild(edit);


    // remove btn
    remove.addEventListener('click', removeFun);

    function removeFun() {
        task.remove();
        tasks = JSON.parse(localStorage.getItem('key'));
        tasks.splice(tasks.indexOf(inputValue), 1);
        localStorage.setItem('key', JSON.stringify(tasks));
        if (!tasks.length) {
            clear.style.display = 'none';
        }
    }


    // edit btn
    edit.addEventListener('click', editFun);
    let i;
    function editFun() {
        tasks = JSON.parse(localStorage.getItem('key'));
        edit.classList.toggle('saveBtn')
        if (m == 0) {
            i = tasks.indexOf(text.textContent);
            edit.textContent = 'Save';
            input.value = text.textContent;
            m = 1;
        } else {
            text.textContent = input.value;
            edit.textContent = 'Edit';
            tasks.splice(tasks.indexOf(i), 1, input.value);
            localStorage.setItem('key', JSON.stringify(tasks));
            input.value = '';
            m = 0;
        }

    }
}

// -----------------Add Function------------------
btn.addEventListener('click', addTask);

function addTask(e) {
    e.preventDefault();
    if ((input.value !== '') && (m == 0)) {
        buildDom(input.value);
        tasks.push(input.value);
        localStorage.setItem('key', JSON.stringify(tasks));
        input.value = '';
        clear.style.display = 'inline-block';

    }

}

// -----------------On Loading Function------------------
document.addEventListener('DOMContentLoaded', onLoad)

function onLoad() {
    if (localStorage.getItem('key')) {
        tasks = JSON.parse(localStorage.getItem('key'))
    }

    tasks.forEach(e => {
        buildDom(e);
    })
    if (tasks.length) {
        clear.style.display = 'inline-block';
    }
}

// -----------------clear button Function------------------
clear.addEventListener('click', clearFun)

function clearFun(e) {
    // e.preventDefault();
    // container.remove();
    clear.style.display = 'none';
    tasks = JSON.parse(localStorage.getItem('key'))
    tasks.splice(0, tasks.length);

    localStorage.setItem('key', JSON.stringify(tasks));
}