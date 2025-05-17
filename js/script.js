//Version 1.2.0

// Récupération des éléments
const input = document.querySelector("#watodo");
const todoList = document.querySelector(".todos");
const filteroption = document.querySelector(".filteroption")
const displayTodo = document.querySelector(".display__todo")
const nothingTodo = document.querySelector(".nothing")
const container = document.querySelector(".container")
let todos = [{titre: "Therance", status: true}];


// Fonction pour créer une tâche
function renderTodo() {
    todoList.value = ""
    todos.forEach((task) => {
        const li = document.createElement("li");
        li.className = "todo";
        li.innerHTML = `
            <input type="checkbox" name="" id="checked__todo" ${task.status ? "checked" : ""}>
            <p class="todo__content">${task.titre}</p>
            <svg class="icon deletedTask" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        `;
        todoList.appendChild(li);
    })
    
}

function UpdateLayout(){
    if(todos.length > 0){
        filteroption.classList.remove("hidden")
        displayTodo.classList.remove("hidden")
        nothingTodo.classList.add("hidden")
        container.style.gridTemplateRows = `
                grid-template-rows: 5rem 1rem 1fr 1fr;`
        container.style.gridTemplateAreas =  `
        'sidebar newtodo newtodo profileview'
            'sidebar filteroption filteroption profileview'
            'sidebar displaytodo displaytodo profileview'
            'sidebar displaytodo displaytodo profileview' 
        `
    }else{
        filteroption.classList.add("hidden")
        displayTodo.classList.add("hidden")
        nothingTodo.classList.remove("hidden")
        container.style.gridTemplateRows = `
            grid-template-rows: 5rem 1fr 1fr 1fr;  
        `
        container.style.gridTemplateAreas =  `
        'sidebar newtodo newtodo profileview'
            'sidebar nothingtodo nothingtodo profileview'
            'sidebar nothingtodo nothingtodo profileview'
            'sidebar nothingtodo nothingtodo profileview' `
    }
}

function attachDeleteEvents() {
  document.querySelectorAll(".deletedTask").forEach((task) => {
    task.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (li) {
            const titre = li.querySelector(".todo__content").textContent
            todos = todos.filter(t => t.titre !== titre);
        li.remove();
        UpdateLayout();
      }
    });
  });
}

function doneTasks() {
  document.querySelectorAll("#checked__todo").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const li = e.target.closest("li");
      const titre = li.querySelector(".todo__content").textContent;

      // Met à jour le tableau todos
      todos = todos.map((task) => {
        if (task.titre === titre) {
          return { ...task, status: e.target.checked };
        }
        return task;
      });

      // Ajoute ou enlève la classe 'done'
      const content = li.querySelector(".todo__content");
      if (e.target.checked) {
        content.classList.add("done");
      } else {
        content.classList.remove("done");
      }
    });
  });
}



document.addEventListener("DOMContentLoaded", ()=>{ 
    renderTodo();
    doneTasks();
    UpdateLayout();
    attachDeleteEvents();
})

function ajouterTaches(name){
    todos.push({titre: name, status: false});
}


function addTaskDOM(el){

    const li = document.createElement("li");
    li.className = "todo";
    li.innerHTML = `
        <input type="checkbox" name="" id="checked__todo">
        <p class="todo__content">${el}</p>
        <svg class="icon deletedTask" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
    `;
    todoList.appendChild(li);
}


// Écoute de la touche Entrée
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
      if (input.value.trim() === "") return;

      ajouterTaches(input.value)
      addTaskDOM(input.value)
      UpdateLayout();
      doneTasks();
      attachDeleteEvents();
      input.value = ""; // Réinitialise l'input
  }
});

function afficherTachesTerminees() {
    // Me
    todos.forEach ((task, index) => {
        if(task.status){
            console.log(`${index + 1}- ${task.titre} ✅`)
        }
    })
}

function afficherNonTachesTerminees() {
    // Me
    todos.filter(el => !el.status).forEach((task, index) => {
        console.log(`${index + 1}- ${task.titre} ❌`);
    })
}