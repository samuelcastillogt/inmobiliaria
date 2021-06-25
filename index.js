const express = require("express")
const path = require("path")
const firebase = require("firebase")
const bodyParser = require("body-parser")
const firebaseConfig = {
  apiKey: "AIzaSyBO80jhQMpYSgErdpBOt0cW36AEYinDSLw",
  authDomain: "prueba-7cc64.firebaseapp.com",
  databaseURL: "https://prueba-7cc64.firebaseio.com",
  projectId: "prueba-7cc64",
  storageBucket: "prueba-7cc64.appspot.com",
  messagingSenderId: "581692029953",
  appId: "1:581692029953:web:f5e383637746bf0da79400",
  measurementId: "G-M1TWRV4DSM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'), {
    etag: false,
  }));
  app.listen(3000, ()=>{
    console.log("hola")
})
app.get("/", async(req, res)=>{
  const db = firebase.firestore()
  const peticion =  await db.collection("propiedades").get()
  const { docs } = peticion
  const propiedades = docs.map(propiedad =>({ propiedad: propiedad.data()}))
  res.render("index", { propiedades } )
    
})
app.get("/propiedad/:id", async(req, res)=>{
  const { id } = req.params
  const db = firebase.firestore()
  const peticion =  await db.collection("propiedades").doc(id).get()
  const datos= peticion.data()
  const relacionadas = await db.collection("propiedades").get()
  const {docs} = relacionadas
   const propiedades = docs.map(propiedad =>({ datos: propiedad.data()}))
   const data = {datos: datos, relacionadas: propiedades}
  res.render("propiedad", data)
})
app.get("/app", (req, res)=>{
  res.render("app")
})
app.get("/app/crear", (req, res)=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      res.render("app-crear")   // User is signed in.
    } else {
      res.redirect("/app")
    }
  });
   
})
app.post("/agregar", (req, res)=>{
  const db =firebase.firestore()
  const pre = req.body.destacada
  const img =req.body.imagen
  const pre2 = pre.toUpperCase()
  const destacada = Boolean(pre2)
  const prep = img.substring(img.legth -1)
  const imagen = prep.split(",")
  db.collection("propiedades").doc(req.body.id).set({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    imagen: imagen,
    destacada: destacada,
    id: req.body.id

  }).then(()=>{
    res.redirect("/app/crear")
  })
})
app.post("/login", (req, res)=>{
  var email = req.body.correo
  var password = req.body.password
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    res.redirect("/app/crear")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
})
app.post("/singup", (req, res)=>{
  const auth = firebase.auth()
  var email = req.body.correo
  var password = req.body.password
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    res.redirect("/app/crear")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
})