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
    var storage = firebase.storage();
    const fileButton= document.getElementById('imagen')
   
    fileButton.addEventListener('change', function(e){ 
        //Get files
        for (var i = 0; i < e.target.files.length; i++) {
            var imageFile = e.target.files[i];
    
            uploadImageAsPromise(imageFile);
            
        }
    });
    function uploadImageAsPromise (imageFile) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref(imageFile.name);
    
            //Upload file
            var task = storageRef.put(imageFile);
    
            //Update progress bar
            task.on('state_changed', ()=>{
                console.log("ya esta subuendo")
            },
                // function progress(snapshot){
                //     var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                //     uploader.value = percentage;
                // },
                function error(err){
    
                },
                function(){
                task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    document.getElementById("img").value += downloadURL+ ","
                  })
                }
            );
        });
    }
    