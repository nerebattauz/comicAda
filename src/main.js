const urlApi = "http://gateway.marvel.com";
const publicKey = "a0e60653f7b944f5d9b5c09f1138a4aa";
const ts = "timestamp";
const hash = "21a300809c6bd1a8f0eeb61d1578a609";
const parametrosAutenticacion = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

const resultadosBusqueda = document.getElementById("resultados-busqueda");
const inputBuscar = document.getElementById("input-buscar");
const selectType = document.getElementById("select-type");
const selectOrder = document.getElementById("select-order");
const btnBuscar = document.getElementById("btn-buscar");
const resultados = document.getElementById("resultados");

const btnSiguiente = document.getElementById("btn-siguiente");
const btnAnterior = document.getElementById("btn-anterior");
const btnPrimero = document.getElementById("btn-primero");
const btnUltimo = document.getElementById("btn-ultimo");

//INICIO
//Obtener datos API
const urlComics = "/v1/public/comics";
const urlCharacters = "/v1/public/characters";

let dataComics = "";
let dataCharacters = "";
let cantidadComics = 0;
let cantidadCharacters = 0;

function traerAPIs() {
  if (selectType.value == "comics") {
    fetch(urlApi + urlComics + parametrosAutenticacion, {
      method: "GET",
      headers: {
        //Authorization: `${publicKey}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        cantidadComics = data.data.total;
        dataComics = data.data.results;
        mostrarCantResultados();
      })
      .catch((error) => console.error(error));
  } else if (selectType.value == "characters") {
    fetch(urlApi + urlCharacters + parametrosAutenticacion, {
      method: "GET",
      headers: {
        //Authorization: `${publicKey}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        cantidadCharacters = data.data.total;
        dataCharacters = data.data.results;
        mostrarCantResultados();
      })
      .catch((error) => console.error(error));
  }
}

traerAPIs()

//Cantidad de resultados totales
function mostrarCantResultados() {
  const cantidadResultados = document.createElement("h4");
  cantidadResultados.classList.add(
    "py-4",
    "text-slate-400",
    "font-bold",
    "text-sm"
  );
  cantidadResultados.id = "cantidad-resultados";
  if (selectType.value == "comics") {
    cantidadResultados.textContent = `${cantidadComics} RESULTADOS`;
  } else if (selectType.value == "characters") {
    cantidadResultados.textContent = `${cantidadCharacters} RESULTADOS`;
  }
  resultados.appendChild(cantidadResultados);
}

traerCharactersAPI();
traerComicsAPI();

btnBuscar.addEventListener("click", (selectType.value = "characters"));
/* //Miniaturas y titulos comics inicio

function getThumbsAndTitles() {
  if (selectType.value == "comics") {
    dataComics.forEach((comic) => {
      const urlThumbs =
        `${comic.thumbnail.path}` + "." + `${comic.thumbnail.extension}`;
      const comicTitle = comic.title;

      //crear lista comics inicio
      const tarjetaComic = document.createElement("div");
      tarjetaComic.classList.add("w-full", "sm:w-1/3", "lg:w-1/5", "mb-8");
      tarjetaComic.id = "tarjeta-comic";

      const imgTarjetaComic = document.createElement("img");
      imgTarjetaComic.classList.add(
        "object-cover",
        "items-center",
        "justify-center",
        "shadow-xl",
        "w-11/12",
        "h-96"
      );
      imgTarjetaComic.id = "img-tarjeta-comic";
      imgTarjetaComic.src = `${urlThumbs}`;

      const tituloTarjetaComic = document.createElement("h3");
      tituloTarjetaComic.classList.add(
        "font-bold",
        "text-md",
        "mt-1",
        "w-11/12"
      );
      tituloTarjetaComic.id = "titulo-tarjeta-comic";
      tituloTarjetaComic.textContent = `${comicTitle}`;

      resultadosBusqueda.appendChild(tarjetaComic);
      tarjetaComic.appendChild(imgTarjetaComic);
      tarjetaComic.appendChild(tituloTarjetaComic);
    });
  } else if (selectType.value == "characters") {
    resultadosBusqueda.innerHTML = "";
    dataCharacters.forEach((character) => {
      const urlThumbs =
        `${character.thumbnail.path}` +
        "." +
        `${character.thumbnail.extension}`;
      const characterName = character.name;

      //crear lista comics inicio
      const tarjetaCharacter = document.createElement("div");
      tarjetaCharacter.classList.add("w-full", "sm:w-1/4", "lg:w-1/6", "mb-8");
      tarjetaCharacter.id = "tarjeta-character";

      const imgTarjetaCharacter = document.createElement("img");
      imgTarjetaCharacter.classList.add(
        "object-cover",
        "items-center",
        "justify-center",
        "shadow-xl",
        "w-11/12",
        "h-96"
      );
      imgTarjetaCharacter.id = "img-tarjeta-character";
      imgTarjetaCharacter.src = `${urlThumbs}`;

      const tituloTarjetaCharacter = document.createElement("h3");
      tituloTarjetaCharacter.classList.add(
        "font-bold",
        "text-md",
        "mt-1",
        "w-11/12"
      );
      tituloTarjetaCharacter.id = "titulo-tarjeta-character";
      tituloTarjetaCharacter.textContent = `${characterName}`;

      resultadosBusqueda.appendChild(tarjetaCharacter);
      tarjetaCharacter.appendChild(imgTarjetaCharacter);
      tarjetaCharacter.appendChild(characterName);
    });
  }
}

fetch(urlApi + urlCharacters + parametrosAutenticacion, {
  method: "GET",
  headers: {
    //Authorization: `${publicKey}`,
    "Content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    cantidadCharacters = data.data.total;
    dataCharacters = data.data.results;
  })
  .catch((error) => console.error(error));

 */
/* 
//Traer personajes

function getCharacters() {
  dataCharacters.forEach((character) => {
    const urlThumbs =
      `${character.thumbnail.path}` + "." + `${character.thumbnail.extension}`;
    const characterName = character.name;

    //crear lista comics inicio
    const tarjetaCharacter = document.createElement("div");
    tarjetaCharacter.classList.add("w-full", "sm:w-1/4", "lg:w-1/6", "mb-8");
    tarjetaCharacter.id = "tarjeta-character";

    const imgTarjetaCharacter = document.createElement("img");
    imgTarjetaCharacter.classList.add(
      "object-cover",
      "items-center",
      "justify-center",
      "shadow-xl",
      "w-11/12",
      "h-96"
    );
    imgTarjetaCharacter.id = "img-tarjeta-character";
    imgTarjetaCharacter.src = `${urlThumbs}`;

    const tituloTarjetaCharacter = document.createElement("h3");
    tituloTarjetaCharacter.classList.add(
      "font-bold",
      "text-md",
      "mt-1",
      "w-11/12"
    );
    tituloTarjetaCharacter.id = "titulo-tarjeta-character";
    tituloTarjetaCharacter.textContent = `${characterName}`;

    resultadosBusqueda.appendChild(tarjetaCharacter);
    tarjetaCharacter.appendChild(imgTarjetaCharacter);
    tarjetaCharacter.appendChild(characterName);
  });
}



// Actualizar resultados

function actualizarResultados() {
  resultadosBusqueda.innerHTML = "";
}

// Mostrar más resultados

btnSiguiente.addEventListener("click", () => {
  actualizarResultados();
  offset += 20;
  btnSiguiente.classList.add("bg-red-600");
  //getThumbsAndTitles(); Esto se aplica pero no se actualiza
});

//Realizar búsqueda

const urlSearch = new URL(
  `http://gateway.marvel.com/v1/public/${selectType.value}${parametrosAutenticacion}`
);
const params = urlSearch.searchParams;
params.set("title", `${inputBuscar.value}`);

btnBuscar.addEventListener("click", aplicarBusqueda);
 */
