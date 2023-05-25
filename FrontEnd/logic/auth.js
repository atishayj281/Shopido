console.log(sessionStorage['id']);
if(localStorage['id'] != null && localStorage['id'] != undefined) {
    window.location = "http://127.0.0.1:5500/FrontEnd/view/index.html"
}

const firebaseConfig = {
    apiKey: "AIzaSyCT7rCu7DH9GycXRQSHrKUY8mkkNskdTJg",
    authDomain: "shopido-b4134.firebaseapp.com",
    databaseURL: "https://shopido-b4134-default-rtdb.firebaseio.com",
    projectId: "shopido-b4134",
    storageBucket: "shopido-b4134.appspot.com",
    messagingSenderId: "901678716880",
    appId: "1:901678716880:web:a6b36e83ff8667c5244bd5",
    measurementId: "G-FT3D27GEJW"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');
const signInGoogle = document.getElementById("sign-in-google");
const signInFacebook = document.getElementById("sign-in-facebook");
const signUpGoogle = document.getElementById("sign-up-google")
const signUpFacebook = document.getElementById("sign-up-facebook")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const RegisterEmail = document.getElementById("signUpEmail")
const registerPassword = document.getElementById("signUpPassword")
const loginCustom = document.getElementById("login-custom")
const registerBtn = document.getElementById("register")

loginCustom.addEventListener("click", () => {
    console.log(email.value)
    loginFirebase(email.value, password.value)
})

registerBtn.addEventListener("click", () => {
    signUpUsingCustom(username.value, RegisterEmail.value, registerPassword.value);
})

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

logInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signInGoogle.addEventListener("click", () => {
    authWithGoogle();
})

signUpGoogle.addEventListener("click", () => {
    authWithGoogle();
})

function authWithGoogle() {
    var auth = firebase.auth();
    console.log("Auth started");
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider
    firebase.auth().signInWithPopup(googleAuthProvider).then(function (result) {
        console.log(result.user.email)
        var user = result.user;
        sessionStorage['id'] = user.uid
        sessionStorage['user'] = user;
        getUserByEmail(user.email)
    }).catch(function (error) {
        console.log(error.message);
    })
}

function signUpUsingCustom(username, email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user)
            sessionStorage['user'] = user
            createCustomer(username, email).then(response => response.json())
                .then(response => {
                    alert(response.data.message);
                    container.classList.remove("right-panel-active");
                    console.log(response);

                }).catch(error => alert(error));
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
}

const BASE_URL = "http://localhost:1234"

function getUserByEmail(email) {
    console.log(email);
    var options = {
        email: email
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(options);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${BASE_URL}/getUserIdByEmail`, requestOptions).then(response => response.json())
    .then(response => {
        console.log(response);
        localStorage['id'] = response.cust_id
        sessionStorage['id'] = response.cust_id;
        sessionStorage['name'] = response.cust_name;
        sessionStorage['phone'] = response.cust_contact;
        sessionStorage['email'] = email
        sessionStorage['isAdmin'] = response.isAdmin;
        window.location = "http://127.0.0.1:5500/FrontEnd/view/index.html"
    })
        .catch(error => console.log(error));

}

function createCustomer(username, email) {
    var options = {
        cust_name: username,
        cust_email: email,
        cust_contact: "",
        isAdmin: 0,
        cust_password: ""
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(options);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${BASE_URL}/createCustomer`, requestOptions)
}

function loginFirebase(email, password) {
    console.log(email)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            getUserByEmail(email).then(response => response.json())
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}