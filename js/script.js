//Version 1.2.0

// Récupération des éléments
const input = document.querySelector("#watodo");
const todoList = document.querySelector(".todos");
let todos = [];


// Fonction pour créer une tâche
function renderTodo() {
    todoList.value = ""
    todos.forEach((task) => {
        const li = document.createElement("li");
        li.className = "todo";
        li.innerHTML = `
            <input type="radio" name="" id="checked__todo" ${task.status ? "checked" : ""}>
            <p class="todo__content">${task.titre}</p>
            <svg class="icon deletedTask" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        `;
        todoList.appendChild(li);
    })
    
}

const filteroption = document.querySelector(".filteroption")
const displayTodo = document.querySelector(".display__todo")
const nothingTodo = document.querySelector(".nothing")
const container = document.querySelector(".container")

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



document.addEventListener("DOMContentLoaded", ()=>{ 
    UpdateLayout();
    renderTodo();
    attachDeleteEvents();
})

function ajouterTaches(name){
    todos.push({titre: name, status: false});
}


function addTaskDOM(el){

    const li = document.createElement("li");
    li.className = "todo";
    li.innerHTML = `
        <input type="radio" name="" id="checked__todo">
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
      attachDeleteEvents()
      input.value = ""; // Réinitialise l'input
  }
});


function terminerTache(index) {
    if(index >= 1 && index <= todos.length){
        todos[index - 1].status = true;
        console.log(`✅ Tâche ${index} marquée comme terminée`);
    }else{
        console.log(`Index ${index} invalide ❌`)
    }
}

function supprimerTache(index) {
    if(index >= 1 && index <= todos.length){
        const tachesSupprimer = todos.splice(index - 1, 1);
        console.log(`Hey, tâches ${tachesSupprimer[0].titre} Supprimer avec succès ⚠️`)
    }else{
        console.log(`Index ${index} invalide ❌`)
    }
}

function toggleTerminee(index) {

    //Me
    if(index >= 1 && index <= todos.length){
        if(todos[index-1].status){
            todos[index-1].status = false
            console.log(`Tache ${todos[index-1].titre} marqué comme non terminée`)
        }else{
            todos[index-1].status = true
            console.log(`Tache ${todos[index-1].titre} marqué comme terminée`)
        }
    }else {
        console.log("Index introuvable ❌⚠️")
    }

}

function afficherTachesTerminees() {
    // CHat GPT
    // todos.filter(t => t.status).forEach((t, i) => {
    //     console.log(`${i + 1} - ${t.titre} ✅`);
    // });

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

function renommerTache(index, nouveauTitre){
    if(index >= 1 && index <= todos.length){
        if(!nouveauTitre || nouveauTitre.trim() === ""){
            console.log("Impossible d'avoir une tâche sans nom")
            return;
        }

        todos[index-1].titre = nouveauTitre.trim();
    }else{
        console.log("Index introuvable ❌⚠️")
    }
}

// Autres Méthodes
// function toggleTerminee(index) {
//     if (index >= 1 && index <= todos.length) {
//         const tache = todos[index - 1];
//         tache.status = !tache.status; // inverse true/false
//         const etat = tache.status ? "terminée ✅" : "non terminée ❌";
//         console.log(`📝 Tâche "${tache.titre}" marquée comme ${etat}`);
//     } else {
//         console.log("❌⚠️ Index introuvable");
//     }
//     }

