/**
 * Elementos del DOM
 */
const elementos = {
    texto: document.getElementById("texto"),
    tituloMensaje: document.getElementById("titulo-mensaje"),
    parrafo: document.getElementById("parrafo"),
    muñeco: document.getElementById("muñeco"),
    btnCopiar: document.getElementById("btn-copiar"),
    encriptadoDiv: document.querySelector(".encriptado")
};

/**
 * Mapa de sustitución para encriptación/desencriptación
 */
const mapaEncriptacion = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

/**
 * Normaliza el texto eliminando acentos
 * @param {string} texto - El texto a normalizar
 * @return {string} Texto normalizado
 */
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Actualiza la interfaz de usuario basada en el resultado
 * @param {boolean} hayTexto - Indica si hay texto para procesar
 * @param {string} titulo - Título a mostrar
 * @param {string} contenido - Contenido a mostrar en el párrafo
 */
function actualizarUI(hayTexto, titulo, contenido) {
    elementos.texto.value = "";
    elementos.tituloMensaje.textContent = titulo;
    elementos.parrafo.textContent = contenido;
    elementos.muñeco.style.display = hayTexto ? "none" : "block";
    elementos.btnCopiar.style.display = hayTexto ? "block" : "none";
    elementos.encriptadoDiv.classList.toggle("sin-mensaje", !hayTexto);
    elementos.encriptadoDiv.classList.toggle("con-mensaje", hayTexto);

    if (!hayTexto) {
        elementos.muñeco.src = "./img/muñeco.png";
        swal("Ooops!", "Debes ingresar un texto", "warning");
    }
}

/**
 * Procesa el texto (encripta o desencripta)
 * @param {function} procesarTexto - Función para procesar el texto
 * @param {string} tituloExito - Título a mostrar en caso de éxito
 */
function procesarTexto(procesarTexto, tituloExito) {
    let texto = normalizarTexto(elementos.texto.value.toLowerCase());
    
    if (texto.length > 0) {
        let textoProcessado = procesarTexto(texto);
        actualizarUI(true, tituloExito, textoProcessado);
    } else {
        actualizarUI(false, "Ningún mensaje fue encontrado", "Ingresa el texto que deseas encriptar o desencriptar");
    }
}

/**
 * Encripta el texto
 */
function encriptar() {
    procesarTexto(
        texto => texto.replace(/[eiaou]/g, letra => mapaEncriptacion[letra]),
        "Texto encriptado con éxito"
    );
}

/**
 * Desencripta el texto
 */
function desencriptar() {
    procesarTexto(
        texto => texto.replace(/(enter|imes|ai|ober|ufat)/g, 
            palabra => Object.keys(mapaEncriptacion).find(key => mapaEncriptacion[key] === palabra)),
        "Texto desencriptado con éxito"
    );
}

/**
 * Copia el texto al portapapeles
 */
function copiarTexto() {
    navigator.clipboard.writeText(elementos.parrafo.textContent)
        .then(() => swal("¡Copiado!", "El texto ha sido copiado al portapapeles", "success"))
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
            swal("Error", "No se pudo copiar el texto", "error");
        });
}

// Event listener para el botón de copiar
elementos.btnCopiar.addEventListener("click", copiarTexto);











