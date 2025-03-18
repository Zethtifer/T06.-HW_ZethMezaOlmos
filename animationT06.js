const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/*
// 1. Primer imagen 

// 1.1 Analisis de la imagen
// 1.1.1 Fondo negro (#161616), con 1 línea y cuadrilateros de diversos tamaños de color #ececec, con "salpicaduras" de negro.

// 1.2 Fondo
// 1.2.1 Rectangulo - Definir el inicio del trazo
ctx.beginPath();

// 1.2.2 Definir los estilos
ctx.fillStyle = '#161616';

// 1.2.3 Especificar la figura
// ctx.rect(x,y,width,lenght);
ctx.rect(0, 0, 500, 500); 

// 1.2.4 Dibujar relleno o contorno
ctx.fill();

// 1.3 Línea 
// 1.3.1 Definir la función para hacer la línea
function dibujarLineaSola(y) {
    // 1.3.1.1 Definir inicio del trazo
    ctx.beginPath();

    // 1.3.1.2 Definir los estilos
    ctx.strokeStyle = '#ECECEC';
    ctx.lineWidth = 3;

    // 1.3.1.3 Especificamos la figura 
    ctx.moveTo (30, y);
    ctx.lineTo (30, y + 420);

    // 1.3.1.4 Dibujar el relleno o contorno
    ctx.stroke();
}

//1.3.2 Dibujar la línea
dibujarLineaSola(40);

// 1.4 Cuadrilateros inclinados 
// 1.4.1 Definir la función para hacer los cuadrilateros
// 1.4.1.1 Primer cuadrilatero
function dibujarCuadrilatero(x, y, width, height, inclinacion) {
    ctx.beginPath ();
    ctx.strokeStyle = '#161616';

    ctx.moveTo(x, 100);
    ctx.lineTo(x + width, y - inclinacion);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, 400);
    ctx.closePath();

    ctx.fillStyle = "#ECECEC";
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();
}

// 1.4.2 Dibujar los multiples cuadriláteros con un patrón
let inicioX = 50;
let ancho = 25;
let alto = 400;
let inclinacion = 30;
let espacio = 15;

for (let i = 0; i < 6; i++) {
    dibujarCuadrilatero(inicioX, 65, ancho, alto, inclinacion);
    inicioX += ancho + espacio; // Avanza la siguiente figura
    
    ancho += 15;
    espacio -= 2.5
}*/



// 2. Variables para la imagen
let imageX = 100;
let imageY = 100;
let flipImage = false;

// 3. Función para dibujar la imagen con la estructura original
function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    ctx.save(); // Guarda el estado actual

    if (flipImage) {
        ctx.scale(-1, 1); // Invierte la imagen
        ctx.translate(-canvas.width, 0); // Corrige la posición tras la inversión
    }

    // 3.1 Fondo de la imagen
    ctx.fillStyle = '#161616';
    ctx.fillRect(imageX, imageY, 500, 500);

    // 3.2 Línea dentro de la imagen
    dibujarLineaSola(imageX + 30, imageY);

    // 3.3 Cuadriláteros dentro de la imagen (igual al código original)
    let inicioX = imageX + 50;
    let ancho = 25;
    let alto = 400;
    let inclinacion = 30;
    let espacio = 15;

    for (let i = 0; i < 6; i++) {
        dibujarCuadrilatero(inicioX, imageY + 65, ancho, alto, inclinacion);
        inicioX += ancho + espacio; // Avanza la siguiente figura
        
        ancho += 15;
        espacio -= 2.5;
    }

    ctx.restore(); // Restaura el estado
}

// 4.Línea
// 4.1 Definir la función para hacer la línea
function dibujarLineaSola(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = '#ECECEC';
    ctx.lineWidth = 3;
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x, y + 460);
    ctx.stroke();
}

// 5. Función para dibujar los cuadriláteros inclinados dentro de la imagen
function dibujarCuadrilatero(x, y, width, height, inclinacion) {
    ctx.beginPath ();
    ctx.strokeStyle = '#161616';

    ctx.moveTo(x, 100);
    ctx.lineTo(x + width, y - inclinacion);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, 400);
    ctx.closePath();

    ctx.fillStyle = "#ECECEC";
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();
}


// 6. Evento para cambiar el fondo con la tecla ESPACIO
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        let randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        canvas.style.backgroundColor = randomColor;
    }
});

// 7. Evento para mover la imagen con el mouse (ahora funciona bien incluso volteada)
canvas.addEventListener("mousemove", (event) => {
    let offsetX = flipImage ? 250 : -250; // Corrige el movimiento invertido
    imageX = event.clientX + offsetX;
    imageY = event.clientY - 250;
    drawImage();
});

// 8. Evento para invertir la imagen con ENTER
document.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        flipImage = !flipImage;
        drawImage();
    }
});

// 9. Dibuja la imagen inicial
drawImage();