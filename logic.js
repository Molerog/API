const $resultadosPerros = document.getElementById("resultadosPerros");
const $razaAfgana = document.getElementById("razaAfgana");
const $botonBuscar = document.getElementById("botonBuscar1");
const $botonBuscar2 = document.getElementById("botonBuscar2");
const $inputText = document.getElementById("inputText");
const $inputText2 = document.getElementById("inputText2")
const $infoUsuarios = document.getElementById("infoUsuarios");
const $perroBuscado = document.getElementById("perroBuscado")
//Imprimir por consola la lista de razas de todos los perros.

axios.get("https://dog.ceo/api/breeds/list/all")
.then((res) => { 
    console.log(res.data.message)
    const raza = res.data.message
    console.log(raza)
    // buscaTuRaza(raza);
})
.catch((err) => console.error(err));

//Imprimir por consola una imagen random de una raza.

axios.get("https://dog.ceo/api/breeds/image/random/1")
.then((res) => { 
    let img =JSON.stringify(res.data.message[0])
    console.log(img);
    pintarImagen(img);
})
.catch((err) => console.error(err));

//Imprimir por consola todas las imágenes de una raza concreta.

axios.get("https://dog.ceo/api/breed/hound/images")
.then((res) => { 
    let hound = res.data.message.filter(dog => dog.includes('afghan'))
    pintarImagen2(hound)
})
.catch((err) => console.error(err));


function pintarImagen(img) {
    $resultadosPerros.innerHTML = `<img class ="image" src=${img}</img> `;
    
}

function pintarImagen2(hound){
    hound.forEach(a =>  {
    // console.log(a)
    $razaAfgana.innerHTML += `<img class ="image" src="${a}"</img> `; //Me pasaba la url sin comillas hasta que me di cuenta y se las puse yo manualmente

    })    
}

function buscaTuRaza(busqueda2) {
    axios.get(`https://dog.ceo/api/breed/${busqueda2}/images/random`)  
    .then((res) => {
    const raza = res.data.message
    console.log(raza)
    pintarRaza(raza)
})
.catch((err) => console.error(err));
}

function pintarRaza(raza){
    const imagen = raza
    $perroBuscado.innerHTML = `<img class ="image" src = "${imagen}">`

}

$botonBuscar2.addEventListener('click',() => {
    const busqueda2 = $inputText2.value
    buscaTuRaza(busqueda2)
})




/*
Lo primero que haremos será crear un input de tipo texto y un botón para buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después crearemos una función que se ejecute cuando se pulse el botón buscar y que contenga una petición a la API para obtener información de ese usuario y así mostrarla en nuestra página:
 
 
 
Lo que queremos que se imprima por consola será:
Nombre
Número de repositorios
Avatar (imagen)

*/

$botonBuscar.addEventListener('click',() => {
    const busqueda = $inputText.value
    peticionApi(busqueda)
})


function peticionApi(busqueda) {
    axios.get(`https://api.github.com/users/${busqueda.replace(/ /g,'')}`)  //método sacado de la manga ;)
.then((res) => {
    console.log(res.data)
    const info = res.data
    pintarUsuario(info)
})
.catch((err) => console.error(err));
}

function pintarUsuario(info){
    const login = info.login
    const repositorios = info.public_repos
    const avatar = info.avatar_url
    console.log(login,repositorios,avatar)

    $infoUsuarios.innerHTML = `<p>La información del usuario buscado es la siguiente:<br>
                                Nombre: ${login}<br>
                                Número de repositorios: ${repositorios}<br>
                                <img class = "image" src = ${avatar}"> </p>`
    

}

