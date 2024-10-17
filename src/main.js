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

let offset = 0;
let dataResultados = "";
let totalResultados = 0;
let urlSearch = new URL(
  `${urlApi}${selectType.value}${parametrosAutenticacion}&orderBy=title`
);

let tarjetaComic = "";
let infoId = 0;
let arrayInfo = {};

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
      enableDisable();
    })
    .catch((error) => console.error(error));
}
traerAPIs();

//Cantidad de resultados totales
function mostrarCantResultados() {
  cantidadResultados.textContent = `${totalResultados} RESULTADOS`;
  if (totalResultados === 0) {
    noResultados();
  }
}

function noResultados() {
  const textoNoResultados = document.createElement("h4");
  textoNoResultados.textContent = "No se encontraron resultados";
  textoNoResultados.classList.add("text-2xl", "font-bold", "my-7");
  resultadosBusqueda.appendChild(textoNoResultados);
}
// Paginación

function paginar() {
  resultados.innerHTML = `<h2 id="resultados" class="text-2xl font-bold">Resultados</h2>`;
  urlSearch = new URL(`${urlApi}${selectType.value}${parametrosAutenticacion}`);
  buscarPorTipo();
  buscarPorOrden();
  const urlOffset = urlSearch.searchParams;
  urlOffset.set("offset", `${offset}`);
  urlOffset.toString();
  traerAPIs();
}
btnSiguiente.addEventListener("click", (event) => {
  offset = offset + 20;
  paginar();
});
btnAnterior.addEventListener("click", (event) => {
  offset = offset - 20;
  paginar();
});

btnUltimo.addEventListener("click", (event) => {
  offset = totalResultados - 20;
  paginar();
});

btnPrimero.addEventListener("click", (event) => {
  offset = 0;
  paginar();
});

//Habilitar / Deshabilitar botones

function buttonDisabled(...boton) {
  boton.forEach((boton) => {
    boton.classList.add("text-slate-500");
    boton.disabled = true;
  });
}

function buttonEnabled(...boton) {
  boton.forEach((boton) => {
    boton.classList.remove("text-slate-500");
    boton.disabled = false;
  });
}

function enableDisable() {
  if (offset <= 0 && totalResultados > 20) {
    buttonDisabled(btnPrimero, btnAnterior);
    buttonEnabled(btnSiguiente, btnUltimo);
  } else if (offset >= 20 && offset < totalResultados - 20) {
    buttonEnabled(btnPrimero, btnAnterior, btnSiguiente, btnUltimo);
  } else if (offset >= totalResultados - 20) {
    buttonDisabled(btnSiguiente, btnUltimo);
    buttonEnabled(btnPrimero, btnAnterior);
  }
  if (totalResultados < 20) {
    buttonDisabled(btnSiguiente, btnUltimo, btnPrimero, btnAnterior);
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
      obtenerInfoObjeto(infoId);
    });
  });
}

// Generar cards characters
function getCharacterCards(arrayInfo) {
  dataResultados.forEach((character) => {
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
    imgTarjetaCharacter.src =
      `${character.thumbnail.path}` + "." + `${character.thumbnail.extension}`;

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
      infoId = event.target.id;
      obtenerInfoObjeto(infoId);
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
  offset = 0;
  resultados.innerHTML = `<h2 id="resultados" class="text-2xl font-bold">Resultados</h2>`;
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

function obtenerInfoObjeto(infoId) {
  resultados.innerHTML = "";
  cantidadResultados.innerHTML = "";
  resultadosBusqueda.innerHTML = "";
  const arrayInfo = dataResultados.find((item) => item.id == infoId);
  detalleObjeto(arrayInfo);
}

// Devolver detalle comic
function detalleObjeto(arrayInfo) {
  //mostrar detalle comics
  if (selectType.value == "comics") {
    const fechaPublicacion = new Intl.DateTimeFormat("es-AR").format(
      new Date(arrayInfo.dates.find((date) => date.type === "onsaleDate").date)
    );
    const autor = arrayInfo.creators.items
      .filter((autor) => autor.role === "writer")
      .map((autor) => autor.name)
      .join(", ");

    const dataComicsDetails = document.createElement("div");
    dataComicsDetails.classList.add("flex", "flex-col", "sm:flex-row");

    const dataComicsImg = document.createElement("img");
    dataComicsImg.classList.add(
      "object-cover",
      "items-center",
      "justify-center",
      "shadow-xl",
      "w-80",
      "h-max-100"
    );
    dataComicsImg.src =
      `${arrayInfo.thumbnail.path}` + "." + `${arrayInfo.thumbnail.extension}`;

    const dataComicsInfo = document.createElement("div");
    dataComicsInfo.classList.add(
      "flex-wrap",
      "text-2xl",
      "mr-8",
      "my-5",
      "sm:mx-10",
      "sm:my-0",
      "w-100"
    );
    dataComicsInfo.innerHTML = `<h2 class="text-2xl mb-4">${arrayInfo.title}</h2>
        <h4 class="text-lg font-bold">Publicado:</h4>
        <h4 class="text-base font-normal mb-4 font-medium text-slate-600">${fechaPublicacion}</h4>
        <h4 class="text-lg font-bold">Autores:</h4>
        <h4 class="text-base font-normal mb-4 font-medium text-slate-600">${autor}</h4>
        <h4 class="text-lg font-bold">Descripción:</h4>
        <h4 class="text-base font-normal">${arrayInfo.description}</h4>`;

    //////// TRAER PERSONAJE DENTRO DE COMIC ///////////

    // Sección personajes dentro del detalle comic
    const dataComicsPersonajes = document.createElement("div");
    dataComicsPersonajes.classList.add(
      "w-full",
      "m-auto",
      "sm:justify-start"
    );

    const tarjetasCharacter = document.createElement("div");
    tarjetasCharacter.classList.add(
      "w-full",
      "flex",
      "flex-wrap",
      "m-auto",
      "sm:justify-start"
    );
    

    const characters = arrayInfo.characters.items;
    let totalResultados = arrayInfo.characters.available;

    const textoPersonajes = document.createElement("div");
    textoPersonajes.innerHTML = `<h2 class="text-2xl font-bold mt-8 mb-4">Personajes</h2>
    <h4 class="py-4 text-slate-400 font-bold text-sm">${totalResultados} RESULTADOS</h4>`
    if ((totalResultados == 0)) {
      noResultados()
    }

    // Traer personajes dentro de comics

    function personajesComics(arrayInfo, infoId) {
      characters.forEach((character) => {
        const tarjetaCharacter = document.createElement("div");
        tarjetaCharacter.classList.add(
          "w-full",
          "sm:w-1/2",
          "lg:w-1/4",
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

        const nombreCharacter = document.createElement("h3");
        nombreCharacter.classList.add(
          "font-bold",
          "text-base",
          "p-2",
          "w-11/12",
          "bg-black",
          "h-20",
          "text-white"
        );
        nombreCharacter.id = `${character.id}`;
        nombreCharacter.textContent = `${character.name}`;

        /* // Traer personajes dentro de comics

    const urlImgPersComics = new URL(
      `${urlApi}characters${parametrosAutenticacion}`
    );

    fetch(urlImgPersComics, {
      method: "GET",
      headers: {
        //Authorization: `${publicKey}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let imgPersComics = data.data.results;
        const objetoPersonaje = imgPersComics.find(
          (objeto) => objeto.name == arrayInfo.characters.items
        );
        console.log(arrayInfo);
      })
      .catch((error) => console.error(error));

    imgTarjetaCharacter.src = `${imgPersComics}`; */

        ////////////////////////////// PROBLEMÓN ///////////////////////////////////////////

        dataComicsPersonajes.appendChild(textoPersonajes);
        dataComicsPersonajes.appendChild(tarjetasCharacter);
        tarjetasCharacter.appendChild(tarjetaCharacter);
        tarjetaCharacter.appendChild(imgTarjetaCharacter);
        tarjetaCharacter.appendChild(nombreCharacter);

        tarjetaCharacter.addEventListener("click", (event) => {
          infoId = event.target.id;
          obtenerInfoObjeto(infoId);
        });
      });
    }

    resultados.appendChild(dataComicsDetails);
    dataComicsDetails.appendChild(dataComicsImg);
    dataComicsDetails.appendChild(dataComicsInfo);
    resultados.appendChild(textoPersonajes);
    resultados.appendChild(dataComicsPersonajes);
    personajesComics(arrayInfo);




  } else if (selectType.value == "characters") {
    const dataCharactersDetails = document.createElement("div");
    dataCharactersDetails.classList.add("flex", "flex-col", "sm:flex-row");

    const dataCharactersImg = document.createElement("img");
    dataCharactersImg.classList.add(
      "object-cover",
      "items-center",
      "justify-center",
      "shadow-xl",
      "w-80",
      "h-max-100"
    );
    dataCharactersImg.src =
      `${arrayInfo.thumbnail.path}` + "." + `${arrayInfo.thumbnail.extension}`;

    const dataCharactersInfo = document.createElement("div");
    dataCharactersInfo.classList.add(
      "flex-wrap",
      "text-2xl",
      "mr-8",
      "my-5",
      "sm:mx-10",
      "sm:my-0",
      "w-100"
    );
    dataCharactersInfo.innerHTML = `<h2 class="text-2xl mb-4">${arrayInfo.name}</h2>
          <h4 class="text-lg font-bold">Descripción:</h4>
          <h4 class="text-base font-normal">${arrayInfo.description}</h4>`;

    resultados.appendChild(dataCharactersDetails);
    dataCharactersDetails.appendChild(dataCharactersImg);
    dataCharactersDetails.appendChild(dataCharactersInfo);
    resultados.appendChild(dataComicsPersonajes);
    dataComicsPersonajes.appendChild(tarjetasPersonajesDentroComics)
  }
}
