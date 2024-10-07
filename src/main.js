const urlApi = "http://gateway.marvel.com/v1/public/";
const publicKey = "a0e60653f7b944f5d9b5c09f1138a4aa";
const ts = "timestamp";
const hash = "21a300809c6bd1a8f0eeb61d1578a609";
const parametrosAutenticacion = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

const resultadosBusqueda = document.getElementById("resultados-busqueda");
const cantidadResultados = document.getElementById("cantidad-resultados");
const inputBuscar = document.getElementById("input-buscar");
const selectType = document.getElementById("select-type");
const selectOrder = document.getElementById("select-order");
const btnBuscar = document.getElementById("btn-buscar");
const resultados = document.getElementById("resultados");

const btnSiguiente = document.getElementById("btn-siguiente");
const btnAnterior = document.getElementById("btn-anterior");
const btnPrimero = document.getElementById("btn-primero");
const btnUltimo = document.getElementById("btn-ultimo");

//INICIO?
//Obtener datos API

let dataResultados = "";
let totalResultados = 0;
let urlSearch = new URL(
  `${urlApi}${selectType.value}${parametrosAutenticacion}&orderBy=title`
);

let tarjetaComic = "";

function traerAPIs() {
  //urlSearch = new URL(`${urlApi}${selectType.value}${parametrosAutenticacion}`);
  fetch(urlSearch, {
    method: "GET",
    headers: {
      //Authorization: `${publicKey}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resultadosBusqueda.innerHTML = "";
      totalResultados = data.data.total;
      dataResultados = data.data.results;
      mostrarCantResultados();
      getCards();
    })
    .catch((error) => console.error(error));
}
traerAPIs();

//Cantidad de resultados totales
function mostrarCantResultados() {
  cantidadResultados.textContent = `${totalResultados} RESULTADOS`;
  if (totalResultados === 0) {
    const textoNoResultados = document.createElement("h4");
    textoNoResultados.textContent = "No se encontraron resultados";
    textoNoResultados.classList.add("text-2xl", "font-bold", "my-7");
    resultadosBusqueda.appendChild(textoNoResultados);
  }
}

// Generar cards characters
function getComicCards() {
  dataResultados.forEach((comic) => {
    const urlThumbsComic =
      `${comic.thumbnail.path}` + "." + `${comic.thumbnail.extension}`;

    const tarjetaComic = document.createElement("div");
    tarjetaComic.classList.add(
      "w-full",
      "sm:w-1/3",
      "lg:w-1/5",
      "mb-8",
      "transition",
      "ease-in-out",
      "duration-300",
      "hover:-translate-y-2",
      "cursor-pointer"
    );
    tarjetaComic.id = `${comic.id}`;

    const imgTarjetaComic = document.createElement("img");
    imgTarjetaComic.classList.add(
      "object-cover",
      "items-center",
      "justify-center",
      "shadow-xl",
      "w-11/12",
      "h-96"
    );
    imgTarjetaComic.id = `${comic.id}`;
    imgTarjetaComic.src = `${urlThumbsComic}`;

    const tituloTarjetaComic = document.createElement("h3");
    tituloTarjetaComic.classList.add("font-bold", "text-md", "mt-1", "w-11/12");
    tituloTarjetaComic.id = `${comic.id}`;
    tituloTarjetaComic.textContent = `${comic.title}`;

    resultadosBusqueda.appendChild(tarjetaComic);
    tarjetaComic.appendChild(imgTarjetaComic);
    tarjetaComic.appendChild(tituloTarjetaComic);

    tarjetaComic.addEventListener("click", (event) => {
      let infoId = event.target.id;
      traerInfo(infoId);
    });
  });
}

// Generar cards characters
function getCharacterCards() {
  dataResultados.forEach((character) => {
    const urlThumbsCharacter =
      `${character.thumbnail.path}` + "." + `${character.thumbnail.extension}`;

    const tarjetaCharacter = document.createElement("div");
    tarjetaCharacter.classList.add(
      "w-full",
      "sm:w-1/4",
      "lg:w-1/6",
      "mb-8",
      "transition",
      "ease-in-out",
      "duration-300",
      "hover:-translate-y-2",
      "cursor-pointer"
    );
    tarjetaCharacter.id = `${character.id}`;

    const imgTarjetaCharacter = document.createElement("img");
    imgTarjetaCharacter.classList.add(
      "object-cover",
      "items-center",
      "justify-center",
      "shadow-xl",
      "w-11/12",
      "h-72"
    );
    imgTarjetaCharacter.id = `${character.id}`;
    imgTarjetaCharacter.src = `${urlThumbsCharacter}`;

    const nombreCharacter = document.createElement("h3");
    nombreCharacter.classList.add(
      "font-bold",
      "text-md",
      "p-2",
      "w-11/12",
      "bg-black",
      "h-20",
      "text-white"
    );
    nombreCharacter.id = `${character.id}`;
    nombreCharacter.textContent = `${character.name}`;

    resultadosBusqueda.appendChild(tarjetaCharacter);
    tarjetaCharacter.appendChild(imgTarjetaCharacter);
    tarjetaCharacter.appendChild(nombreCharacter);

    tarjetaCharacter.addEventListener("click", (event) => {
      let infoId = event.target.id;
      traerInfo(infoId);
    });
  });
}

//Obtener cards
function getCards() {
  if (selectType.value == "comics") {
    getComicCards();
  } else if (selectType.value == "characters") {
    getCharacterCards();
  }
}

//Buscar por parametros
btnBuscar.addEventListener("click", (event) => {
  urlSearch = new URL(`${urlApi}${selectType.value}${parametrosAutenticacion}`);
  buscarPorTipo();
  buscarPorOrden();
  traerAPIs();
});

function buscarPorTipo() {
  const searchParams = urlSearch.searchParams;
  if (selectType.value == "comics") {
    searchParams.delete("nameStartsWith", `${inputBuscar.value}`);
    searchParams.set("titleStartsWith", `${inputBuscar.value}`);
    urlSearch.toString();
  } else if (selectType.value == "characters") {
    searchParams.delete("titleStartsWith", `${inputBuscar.value}`);
    searchParams.set("nameStartsWith", `${inputBuscar.value}`);
    urlSearch.toString();
  }
  if (inputBuscar.value === "") {
    urlSearch = new URL(
      `${urlApi}${selectType.value}${parametrosAutenticacion}`
    );
  }
}

function buscarPorOrden() {
  const searchParams = urlSearch.searchParams;
  searchParams.set("orderBy", `${selectOrder.value}`);
  urlSearch.toString();
}

//Cambiar select según tipo
selectOrder.innerHTML = `<option value="title">A-Z</option>
              <option value="-title">Z-A</option>              
              <option value="-focDate">Más nuevos</option>
              <option value="focDate">Más viejos</option>`;

selectType.addEventListener("input", () => {
  if (selectType.value == "comics") {
    selectOrder.innerHTML = `<option value="title">A-Z</option>
              <option value="-title">Z-A</option>              
              <option value="-onsaleDate">Más nuevos</option>
              <option value="onsaleDate">Más viejos</option>`;
  } else if (selectType.value == "characters") {
    selectOrder.innerHTML = `<option value="name">A-Z</option>
              <option value="-name">Z-A</option>`;
  }
});

//ingresar a tarjeta Comic

function traerInfo(infoId) {
  fetch(urlSearch, {
    method: "GET",
    headers: {
      //Authorization: `${publicKey}`,
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resultados.innerHTML = "";
      cantidadResultados.innerHTML = "";
      resultadosBusqueda.innerHTML = "";
      dataResultados = data.data.results;
      const arrayInfo = dataResultados.find((item) => item.id == infoId);
      console.log(arrayInfo);
    })
    .catch((error) => console.error(error));
}

//const prueba = document.createElement("h4")
//prueba.textContent = `${idComic}`
//resultadosBusqueda.appendChild(prueba)

const dataComicsContainer = document.createElement("div");
dataComicsContainer.classList.add(
  "flex-col",
  "mt-16",
  "mx-6",
  "lg:w-3/4",
  "lg:mx-auto"
);

const dataComicsDetails = document.createElement("div");
dataComicsDetails.classList.add("flex", "flex-col", "sm:flex-row");

const dataComicsImg = document.createElement("img");
dataComicsImg.classList.add(
  "object-cover",
  "items-center",
  "justify-center",
  "shadow-xl",
  "w-80"
);

//btnBuscar.addEventListener("click", aplicarBusqueda());

/* // Mostrar más resultados

btnSiguiente.addEventListener("click", () => {
  actualizarResultados();
  offset += 20;
  btnSiguiente.classList.add("bg-red-600");
  //getThumbsAndTitles(); Esto se aplica pero no se actualiza
});
 */
//Realizar búsqueda

// Actualizar resultados
