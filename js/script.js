//Version 1.2.0
let todos = [];

function ajouterTaches(name){
    todos.push({titre: name, status: false});
    console.log("Tâche ajouter avec succès")
}

function afficherTaches(){
    todos.forEach((task, index) => {
        let statut;
        if(task.status){
            statut = "✅";
        }else{
            statut = "❌";
        }
        console.log(`${index + 1}- ${task.titre} ${statut}`)
    })
}

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

