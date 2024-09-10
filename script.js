const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskName = inputBox.value;
    const dueVal = document.getElementById("due-val").value;
    
    if (taskName === '') {
        alert("Input in text first!");
    } else {
        const dueDate = new Date(dueVal);
        const formattedDate = `${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        
        let li = document.createElement("li");
        li.innerHTML = `${taskName} - Due: ${formattedDate}`;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    
    inputBox.value = "";
    document.getElementById("due-val").value = "";
    saveData();
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}, false);

function sortTasksByName() {
    let tasks = Array.from(listContainer.getElementsByTagName("li"));
    tasks.sort((a, b) => {
        let nameA = a.textContent.split(' - ')[0].toLowerCase();
        let nameB = b.textContent.split(' - ')[0].toLowerCase();
        return nameA.localeCompare(nameB);
    });

    listContainer.innerHTML = "";
    tasks.forEach(task => listContainer.appendChild(task));
    saveData();
}

function sortTasksByDate() {
    let tasks = Array.from(listContainer.getElementsByTagName("li"));
    tasks.sort((a, b) => {
        // Extract and parse the date part from the text content
        let dateA = a.textContent.split(' - Due: ')[1];
        let dateB = b.textContent.split(' - Due: ')[1];

        // Convert the date strings to Date objects for comparison
        let dueDateA = new Date(dateA);
        let dueDateB = new Date(dateB);

        return dueDateA - dueDateB;
    });

    listContainer.innerHTML = "";
    tasks.forEach(task => listContainer.appendChild(task));
    saveData();
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// function checkExpiredTasks() {
//     let tasks = listContainer.getElementsByTagName("li");

//     for (let task of tasks) {
//         let taskText = task.innerHTML.split(' - Due: ')[1].split(" ");
//         let dueDate = taskText[0];  // Extract mo ang due date
//         let dueTime = taskText[1];  // Extract mo ang due time

//         // Combine due date & time into a single string and create a Date object
//         let taskDueDateTime = new Date(`${dueDate}T${dueTime}`);

//         let currentDate = new Date();  // kwaa current date & time

//         // If current date is past the due date & time sng task, expired na
//         if (currentDate > taskDueDateTime) {
//             task.classList.add("expired");  // Add a class to mark it as expired
//         }
//     }
// }