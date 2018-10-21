var database = firebase.database();
var url;
// *****************************  PREGONS  ********************************************

function BuscaPregons() {    
    var ref = database.ref("prego/");
    ref.on("value", function(snapshot) {
      var arr = snapshot.val();
      var arr2 = Object.keys(arr);

      for (let i = 0; i < arr2.length; i++) {
        var key = arr2[i];

        ref = database.ref("prego/" + key);
        ref.on("value", function(snapshot) {
          nom = snapshot.val().titol;
          des = snapshot.val().descripcio;
          CreaPrego(nom,des);
        });
      }
    });
}

function CreaPrego(nom, des) {
  document.getElementById('linea').innerHTML += "";
  document.getElementById('linea').innerHTML +=
  `<div class="card mb-4 shadow-sm">
   <div class="card-header">
   <h4 class="my-0 font-weight-normal">${nom}</h4>
   </div>
   
   <div class="card-body">
    <li>${des}</li>
   </div>`;
}

// *****************************  INCIDENCIES  ********************************************

function lengthChilds() {
  var ref = database.ref();
  ref.child('incident').on("value", function(snapshot) {
    console.log(snapshot.numChildren());
  });
}

function CreaNouIncident() {
  nom = document.getElementById("TitolNou").value;
  des = document.getElementById("DescripcioNou").value;
  img = "Imatge";

  if (nom != "" && des != "") {
    AfegirFirebaseIncident(nom, des, img);
    document.getElementById('linea').innerHTML = "";
  }
}

function AfegirFirebaseIncident(nom, des, img) {
  database.ref('incident/'+nom).set({
    titol: nom,
    descripcio: des,
    imatge: img,
  });
}

// *****************************  FIREBASE PHOTOs  ********************************************
var fileButton = document.getElementById("fileButton");
fileButton.addEventListener("change", function (e) {
  //Get file
  var file = e.target.files[0];
  //Create a storage ref
  var storageRef = firebase.storage().ref().child('Photos/'+'1.jpg');
  //Upload file
  storageRef.put(file);
})
/*
document.getElementById(FormInci).addEventListener("submit", submitForm);

function submitForm(e) {
  var x = document.getElementById("foto");
  var file = x.target.files[0];
  //Create a storage ref
  var storageRef = firebase.storage().ref().child();
  //Upload file
  var lask = storageRef.put(file);
}*/

var Desc = document.getElementById("FD");
Desc.addEventListener("click", function () {
  var storageRef = firebase.storage().ref();
  storageRef.child(hjkhkj).getDownloadURL().then(function(url) {
    var img = document.getElementById("img");
    img.src = url;
  })
})

function Registre() {
  correu = document.getElementById("Correu").value;
  contra = document.getElementById("Contrasenya").value;
  if (correu != "" && contra != "") {
    firebase.auth().createUserWithEmailAndPassword(correu, contra)
  }
}

function IniciSessio() {
  correu = document.getElementById("Correu").value;
  contra = document.getElementById("Contrasenya").value;
  if (correu != "" && contra != "") {
    firebase.auth().signInWithEmailAndPassword(correu, contra).catch(function(error) {
      console.log("Sessió Iniciada")
  });
  }
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    console.log(email);
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    console.log("Signed Out");
  }
});
}

function SortidaSessio() {
  firebase.auth().signOut()
}