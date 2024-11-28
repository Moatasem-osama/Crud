var inputTaskName = document.getElementById('inputNameTask');
var inputTasks = document.getElementById('select');
var addTaskBtn = document.getElementById('addTaskBtn');
var inputTaskSearch = document.getElementById('inputSearchTask');
var updateTaskBtn = document.getElementById('updateTaskBtn')
var container = document.getElementById('allTasks');
var tasks = [];
 
if (localStorage.getItem("task") != null) {
    tasks = JSON.parse(localStorage.getItem("task"))
}else{
 tasks=[]
}
var updatedIndex;
addTaskBtn.addEventListener('click' , addTask);
function addTask() {
    var newTask = {
        name: inputTaskName.value,
        isCompleted: false,
    };
    tasks.push(newTask);
    showTasks(tasks);
    clear();
    localStorage.setItem("task" , JSON.stringify(tasks))
}
function showTasks(arr) {
    var box = ``
    for (let i = 0; i < arr.length; i++) {
     box+= `<div class="col-md-12 mb-2">
                        <div class="d-flex align-items-center task ${arr[i].isCompleted == true ? "compted" : ""}">
                            <input ${arr[i].isCompleted == true ? "checked" : ""} onchange="taskDone(${i})" type="checkbox" class="myCheck d-none" name="" id="taskCheck-${i}">
                            <label for="taskCheck-${i}" class="text-white myLabel"></label>
                            <p class="text-white m-0">${arr[i].name}</p>
                            <button onclick="readyToUpdate(${i})" class="btn btn-warning ms-auto"><i class="fa-solid fa-hand-back-fist"></i> Update</button>
                            <button onclick="deleteTasks(${i})" class="btn btn-danger mx-4"><i class="fa-solid fa-trash-can "></i> Delete</button>
                        </div>
                    </div>`
    }
    container.innerHTML=box;
    
}
showTasks(tasks)
function clear(){
    inputTaskName.value='';
}
function deleteTasks(index){
     tasks.splice(index,1);
     showTasks(tasks);
     localStorage.setItem("task" ,JSON.stringify(tasks))
} 
function taskDone(index){
    // if( tasks[index].isCompleted == false){
    //     tasks[index].isCompleted = true;
    //     showTasks(tasks);
    // }else{
    //     tasks[index].isCompleted = false;
    //     showTasks(tasks);}  
    // ===
    tasks[index].isCompleted = !tasks[index].isCompleted;
    showTasks(tasks);
    localStorage.setItem("task" ,JSON.stringify(tasks))  //update local storage after task completion or deletion
}

function taskSearch(){
    var searchValue = inputTaskSearch.value.trim().toLowerCase();
    var arr = []
    for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].name.trim().toLowerCase().includes(searchValue)) {
        arr.push(tasks[i]);
    }
    }
    showTasks(arr);
}
inputTaskSearch.addEventListener("input" , taskSearch );

function readyToUpdate(index){
updatedIndex = index;
inputTaskName.value = tasks[index].name;                     
addTaskBtn.classList.add('d-none');
updateTaskBtn.classList.remove('d-none');
}
function updateTask(){
    tasks[updatedIndex].name = inputTaskName.value;
    addTaskBtn.classList.remove('d-none');
    updateTaskBtn.classList.add('d-none');
    showTasks(tasks);
    clear();
    localStorage.setItem("task" ,JSON.stringify(tasks))
}
updateTaskBtn.addEventListener("click" , updateTask)
function filterTask(){
    var taskStatus = inputTasks.value;
    var arr = [];
   for(var i =0 ; i < tasks.length; i++){
    if(taskStatus== "All"){
        arr.push(tasks[i]);
    }else if(taskStatus== "Pending" && tasks[i].isCompleted === false){
        arr.push(tasks[i]);
    }else if(taskStatus== "Completed" && tasks[i].isCompleted === true){
        arr.push(tasks[i]);
    }
   }
   showTasks(arr)
}
inputTasks.addEventListener("change" , filterTask);