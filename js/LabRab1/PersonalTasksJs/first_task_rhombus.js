var gl;
var shaderProgram;
var vertexBuffer;

function changeColor() {
    dict ='0123456789ABCDEF'

    var color="#"

    for (var i=0; i<6;i++) {
        color+=dict[Math.floor(Math.random()*16)]
    }

    return color;
}


function initShaders() {
    
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
    
    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);
      
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалсь установить шейдеры");
    }
      
    gl.useProgram(shaderProgram);
 
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");

    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
}

function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;

    var shader = gl.createShader(type);
  
    gl.shaderSource(shader, source);
  
    gl.compileShader(shader);
   
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);   
        return null;
    }
    return shader;  
}

function initBuffers() {

  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // массив координат вершин объекта
  var rhombusVertices = [
         -0.8,  0.0,  0.0,
        0.0, 0.8,  0.0,
         0.8, 0.0,  0.0,
         0.0, -0.8,  0.0
  ];
  indices = [0, 1, 2, 3, 0,2];
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rhombusVertices), gl.STATIC_DRAW);
  // указываем кол-во точек
  vertexBuffer.itemSize = 3;
  
  indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  // указываем число линий. это число равно числу индексов
  indexBuffer.numberOfItems = indices.length;
}
// отрисовка 
function draw() {    
    // установка области отрисовки
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
 
    gl.clear(gl.COLOR_BUFFER_BIT);
   
    // указываем, что каждая вершина имеет по три координаты (x, y, z)
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
                         vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    // отрисовка примитивов - линий         
    gl.drawElements(gl.LINE_LOOP, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
}
  
window.onload=function(){
    document.getElementById("changeColorButton").addEventListener("click", changeColor);
    // получаем элемент canvas
    var canvas = document.getElementById("canvas3D");
    try {
        // Сначала пытаемся получить стандартный контекст WegGL
        // Если не получится, обращаемся к экспериментальному контексту
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}
   
    // Если контекст не удалось получить, выводим сообщение
      if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
      }
    if(gl){
        // установка размеров области рисования
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        // установка шейдеров 
        initShaders();
        // установка буфера вершин
        initBuffers();
        // покрасим фон в бледно-розовый цвет
        gl.clearColor(1.0, 0.0, 0.0, 0.5);
        // отрисовка сцены
        draw();   
    }
}