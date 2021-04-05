var firebaseConfig = {

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const clientes = db.collection("clientes").doc()

document.getElementById("boton").addEventListener("click", ()=>{
    clientes.set({
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        correo: document.getElementById("correo").value,
        interesado: document.getElementById("lugar").value
    }).then(()=>{
        const hero = document.getElementById("hero_form")
        
        hero.innerHTML= `<h2>Muchas gracias por suscribirse</h2>`
    })
})
