import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"

const appSettings = {
    databaseURL:"https://todo-5d2bd-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const todoapp = ref(database, "todo");

const inputField = document.getElementById("taskin");
const addtask = document.getElementById("add");
const taskli = document.getElementById("todo-list");

addtask.addEventListener("click", function(){
    let taskval = inputField.value;
    if(taskval!='') {
        push(todoapp, taskval);
        clearInput();
    }
    
})

const clearInput = () => {
    inputField.value = '';
}

onValue(todoapp, function(snapshot) {
    if(snapshot.exists()) {
        let items = Object.entries(snapshot.val());
        clearList();
        for(let i=0; i<items.length; i++) {
            let curitem = items[i];
            appendList(curitem);
        }
    }
    else {
        taskli.innerHTML = "No Tasks Found. Get some work..."
    }
});

function clearList() {
    taskli.innerHTML = ""
}

function appendList(inputValue) {
    let itemId = inputValue[0];
    let itemname = inputValue[1];
    console.log(inputValue[0]);
    console.log(inputValue[1]);
    let newEl = document.createElement("li");
    newEl.textContent = itemname;
    taskli.append(newEl);

    newEl.addEventListener("dblclick", function() {
        let location = ref(database, `todo/${itemId}`);
        remove(location);
    });
} 