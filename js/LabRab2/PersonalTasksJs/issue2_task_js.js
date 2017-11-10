var gl;
var shaderProgram;
var vertexBuffer;
var indexBuffer;

function initShaders() {
    
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');
     
    shaderProgram = gl.createProgram();
     
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
     
    gl.linkProgram(shaderProgram);
      
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
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
    
       vertices =[  
           //БУКВА В
           -0.5, 0.0, 0.0,
           -0.5, 0.9, 0.0,
               0.0, 0.75, 0.0,
               -0.5, 0.5, 0.0,
               0.0, 0.25, 0.0, 

               //P
                0.0, 0.25, 0.0,
                0.0, 0.5, 0.0,
                0.3, 0.75, 0.0,
                0.0, 0.9, 0.0,
                0.0, 0.0, 0.0,
                0.0, 0.5, 0.0,
                0.3, 0.75, 0.0,
                0.3, 0.0, 0.0,
                0.6, 0.0, 0.0,
                0.3, 0.0, 0.0,
                0.3, 0.9, 0.0,
                0.6, 0.9, 0.0

            ];
    
       indices = [0, 1, 1, 2, 2, 3, 3, 4, 4, 0, 0, 4,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16];
 
     vertexBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     vertexBuffer.itemSize = 3;
      

     indexBuffer = gl.createBuffer();
       gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
       gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
 
       indexBuffer.numberOfItems = indices.length;
   }
     
   function draw() {    
        
       gl.clearColor(0.0, 0.0, 0.0, 1.0);
        
       gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    
       gl.clear(gl.COLOR_BUFFER_BIT);
      
       gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
                            vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

       gl.drawElements(gl.LINES, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT,0);
   }
     
   window.onload=function(){
    
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