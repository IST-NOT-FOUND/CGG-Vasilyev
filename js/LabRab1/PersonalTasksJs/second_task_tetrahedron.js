
	window.onload=function(){
        var camera, scene, renderer;
        var geometry, material, mesh;
     
        init();
        animate();
  
        function init() {
           
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
 
            camera.position.z = 600;
 
            scene = new THREE.Scene();
            // настройка геометрии - в качестве геометрии будет тетраэдр
            // настроим его радиус = 200
            geometry = new THREE.TetrahedronGeometry(200);
            // настройка материала - установка цвета
            material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true});
            // настраиваем меш, который будет отображать тетраэдр
            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            // создаем объект для рендеринга сцены
            renderer = new THREE.WebGLRenderer();
            // установка размеров
            renderer.setSize(window.innerWidth, window.innerHeight);
            // встраиваем в DOM-структуру страницы
            document.body.appendChild(renderer.domElement);
        }
 
        function animate() {
     
            requestAnimationFrame(animate);
       
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
            
            renderer.render(scene, camera);
        }
    }