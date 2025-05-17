//Version 2.0.0

// Récupération des éléments et initialization du tableaux todo 
const input = document.querySelector("#watodo");
const todoList = document.querySelector(".todos");
const filteroption = document.querySelector(".filteroption")
const displayTodo = document.querySelector(".display__todo")
const nothingTodo = document.querySelector(".nothing")
const container = document.querySelector(".container")
let todos = [{titre: "oijs", status:true}];


/**
 * Affiche toutes les tâches de la liste dans le DOM.
 * Met à jour dynamiquement la liste des tâches affichées.
 * @returns {void}
 */

function renderTodo() {
    todoList.value = ""
    todos.forEach((task) => {
        const li = document.createElement("li");
        li.className = "todo";
        li.innerHTML = `
            <input type="checkbox" name="" id="checked__todo" ${task.status ? "checked" : ""}>
            <p class="todo__content ${task.status ? "done" : ""}">${task.titre}</p>
            <svg class="icon deletedTask" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        `;
        todoList.appendChild(li);
    })
    doneTasks();
}

/**
 * Met à jour l'apparence de la page en fonction du nombre de tâches.
 * Affiche ou masque les sections "todo", "rien à faire", etc.
 * @returns {void}
 */
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

/**
 * Attache les événements de suppression sur les boutons "supprimer" de chaque tâche.
 * Supprime l'élément du DOM et du tableau `todos` si cliqué.
 * @returns {void}
 */

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

/**
 * Gère les événements liés à la case à cocher d'une tâche.
 * Met à jour le statut dans le tableau `todos` et le style CSS.
 * @returns {void}
 */
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
    
    UpdateLayout();
    attachDeleteEvents();
})


/**
 * Ajoute une nouvelle tâche au tableau `todos`.
 * @param {string} name - Le nom de la tâche à ajouter.
 * @returns {void}
 */
function ajouterTaches(name){
    todos.push({titre: name, status: false});
}


// Filtrage des tâches
document.querySelector(".filter__all").addEventListener("click", () => {
  afficherTaches("all");
});

document.querySelector(".filter__notcompleted").addEventListener("click", () => {
  afficherTaches("active");
});

document.querySelector(".filter__completed").addEventListener("click", () => {
  afficherTaches("done");
});

/**
 * Affiche les tâches filtrées dans le DOM.
 * @param {"all" | "active" | "done"} filtre - Le type de tâches à afficher.
 * @returns {void}
 */

function afficherTaches(filtre) {
  const liste = document.querySelector("ul.todos");
  liste.innerHTML = ""; // On vide la liste

  let tachesFiltrees = [];

  if (filtre === "all") {
    tachesFiltrees = todos;
  } else if (filtre === "active") {
    tachesFiltrees = todos.filter(task => !task.status);
  } else if (filtre === "done") {
    tachesFiltrees = todos.filter(task => task.status);
  }

  tachesFiltrees.forEach(task => {
    addTaskDOM(task.titre, task.status); // Passe le titre et le status
  });

  doneTasks();
  attachDeleteEvents();
}


/**
 * Ajoute une tâche dans le DOM avec son statut.
 * @param {string} titre - Le titre de la tâche.
 * @param {boolean} [status=false] - Le statut de la tâche (terminée ou non).
 * @returns {HTMLElement} - L'élément <li> ajouté au DOM.
 */

function addTaskDOM(titre, status = false){

    const li = document.createElement("li");
    li.className = "todo";
    li.innerHTML = `
        <input type="checkbox" name="" id="checked__todo" ${status ? "checked" : ""}>
        <p class="todo__content ${status ? "done" : ""}">${titre}</p>
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