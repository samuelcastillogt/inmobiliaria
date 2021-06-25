var firebaseConfig = {
    apiKey: "AIzaSyBTlIW_1NAeMeSDOdCc4AICtGxoYbaUyuw",
    authDomain: "directorio-bc73c.firebaseapp.com",
    databaseURL: "https://directorio-bc73c.firebaseio.com",
    projectId: "directorio-bc73c",
    storageBucket: "directorio-bc73c.appspot.com",
    messagingSenderId: "584037980083",
    appId: "1:584037980083:web:136190acf46a5337565dc6",
    measurementId: "G-0MXJNYN7QQ"
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
        hero.innerHTML= `<h2>Muchas gracias por suscribirse</h2>`
    })
})