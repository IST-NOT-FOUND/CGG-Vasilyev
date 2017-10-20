var gl;
var shaderProgram;
var vertexBuffer;
var colorBuffer;


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
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
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

    var vertices = [
        -0.8, 0.0, 0.0,
        0.0, 0.4, 0.0,
        0.8,0.0,0.0,
        0.0,-0.4, 0.0,

    ]
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    indicesTriag = [0,1,2,2,3,0]

    indexBufferTriag = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferTriag);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesTriag), gl.STATIC_DRAW);
  
    indexBufferTriag.numberOfItems = indicesTriag.length;

    var x = y = z = getRandomValue(0, 200);
    var q = w = i = getRandomValue(0, 200);
    var сolors = [
          x, y, z,
          x, y, z,
          x,y,z,
          q, w, i,
          q, w, i,
          q,w,i,
      ];


      colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}

function draw() {
    
        gl.clearColor(getRandomValue(0, 100), getRandomValue(0, 100), getRandomValue(0, 100), getRandomValue(0, 100));
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                             vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
                            vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        gl.drawElements(gl.TRIANGLES, indexBufferTriag.numberOfItems, gl.UNSIGNED_SHORT,0)
        
    }
        
window.onload=function(){
        
            document.getElementById("changeColorButton").addEventListener('click', changeColor);
            var canvas = document.getElementById("canvas3D");
            try {
                gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            }
            catch(e) {}
        
              if (!gl) {
                alert("Ваш браузер не поддерживает WebGL");
              }
            if(gl){
                gl.viewportWidth = canvas.width;
                gl.viewportHeight = canvas.height;
        
                initShaders();
        
                initBuffers();
        
                draw();
            }
}

function getRandomValue(min, max) {
    return (Math.random() * (max - min) + min) / 100;
}

function changeColor() {
    initBuffers();
    draw();
}
