import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.143.0/examples/jsm/controls/OrbitControls.js';
import { Line2 } from 'https://unpkg.com/three@0.143.0/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'https://unpkg.com/three@0.143.0/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'https://unpkg.com/three@0.143.0/examples/jsm/lines/LineGeometry.js';


import mapDate1 from './paul1-1.json' assert { type: "json" };
import mapDate2 from './paul4-1.json' assert { type: "json" };
import mapDate3 from './paul3-1.json' assert { type: "json" };

let isEditMode = false;
const NUM = 100
function convertToDec (num){
    const result = []
    for(let i = 0; i <= num; i++){
        result[i] = parseInt((1-i/num)*255)
    }
    return result
}
const scaleDec = convertToDec(NUM);

var mesh = new THREE.Mesh();
function initMap(mapDate) {
    
    let originX = mapDate.map.origin_x;
    let originY = mapDate.map.origin_y;
    let resolution = mapDate.map.resolution;
    let cols = mapDate.map.data.cols;
    let rows = mapDate.map.data.rows;
    const mapGroup = new THREE.Object3D();

    // ----------- map material -----------
    const geometry = new THREE.PlaneGeometry( cols , rows );
    var size = cols * rows; //像素大小
    var data = new Uint8Array(size * 4); //size*4：像素在缓冲区占用空间
    
    mapDate.map.data.data.forEach((val, i) => {
        let r = 0, g = 0, b = 0, a = 255 // default black
        if(val < 0 && val !== -128){
            // transparent
            a = 255 * 0.5
        }
        if(val <= 35 || val === -128 || val >= 127){
            // grey
            r = 209
            g = 217
            b = 225
        } else if(val <= 85){
            // grey-scale
            r = g = b = scaleDec[val] || 0
        }
    
        data[i*4 + 0] = r  // R value
        data[i*4 + 1] = g  // G value
        data[i*4 + 2] = b  // B value
        data[i*4 + 3] = a  // A value
    });
    
    // 创建数据文理对象   RGBA格式：THREE.RGBAFormat
    var texture = new THREE.DataTexture(data, cols, rows, THREE.RGBAFormat);
    texture.needsUpdate = true; //纹理更新
    //打印纹理对象的image属性
    // console.log(texture.image);
    
    var material = new THREE.MeshBasicMaterial({
      map: texture, // 设置纹理贴图
      transparent: true,//允许透明设置
    });
    // var mesh = new THREE.Mesh(geometry, material);
    mesh.geometry = geometry;
    mesh.material = material;
    mesh.position.set((cols / 2) + (originX / resolution), (rows / 2) + (originY / resolution), 0);
    mesh.name = 'map';
    mapGroup.add( mesh );
    
    // -------- virtial wall ----------
    const virtualWallsGroup = new THREE.Object3D()
    mapDate.virtualWalls.forEach((wall) => {

        const newLine = new THREE.Object3D()
        const points = []
        // const colors = []
        wall.layer_poses.forEach(point => {
            points.push(point.x / resolution, point.y / resolution, 1)
            // colors.push(0.5, 0, 1)
        })

        const matLine = new LineMaterial( {

            color: 0xf44336,
            linewidth: 3, // in world units with size attenuation, pixels otherwise
            // vertexColors: true,
            // vertexColors: THREE.VertexColors,
            // worldUnits: false,

            resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // to be set by renderer, eventually
            dashed: false,
            dashScale: 0.1,
            dashSize: 3.0,
            gapSize: 1.0,
            alphaToCoverage: true,
            transparent: true,
        } );
        // matLine.resolution.set( window.innerWidth, window.innerHeight )

        const matLine2 = matLine.clone();
        matLine2.color = new THREE.Color(0xffffff)
        matLine2.linewidth = 5

        const geometry = new LineGeometry();
        geometry.setPositions( points );
        geometry.attributes.position.needsUpdate = true
        // geometry.setColors( colors );

        const line = new Line2( geometry, matLine );
        line.computeLineDistances();
        // line.scale.set( 1, 1, 1 ).multiplyScalar(0.1);
        newLine.add(line)
        line.position.z = 2
        newLine.name = 'line'

        const shadowLine = line.clone()
        shadowLine.material = matLine2
        shadowLine.name = 'shadow-line'
        shadowLine.position.z = 1
        shadowLine.rotateZ(Math.PI)
        scene.add(shadowLine)


        // ======================== using WireframeGeometry2 =================
        // const geometryWireframe = new WireframeGeometry2( geometry );
        // const matLine2 = new LineMaterial( {

        //     color: 0x4080ff,
        //     linewidth: 5, // in pixels
        //     //resolution:  // to be set by renderer, eventually
        //     resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // to be set by renderer, eventually
        //     dashed: false,

        // } );

        // const wireframe = new Wireframe( geometryWireframe, matLine2 );
        // newLine.add(wireframe)

        // ================= using EdgesGeometry =====================
        // geometry.index = null
        // const lineGeomotry = new THREE.EdgesGeometry( geometry )
        // const lineMaterial = new THREE.LineBasicMaterial({ color: '#57d8ff' })
        // const lineEdge = new THREE.LineSegments(lineGeomotry, lineMaterial)
        // newLine.add(lineEdge)


        const pointsGeometry = new THREE.BufferGeometry();
        pointsGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
        pointsGeometry.attributes.position.needsUpdate = true
        const sprite = new THREE.TextureLoader().load( './disc.png' );
        const pointsMaterial = new THREE.PointsMaterial( { color: 0xff0000, size: 10, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true } );
        const particles = new THREE.Points( pointsGeometry, pointsMaterial );
        particles.position.z = 3
        newLine.add(particles)

        const particles2 = particles.clone()
        particles2.material = particles.material.clone()
        particles2.material.size = 8
        particles2.material.color = new THREE.Color(0xffffff)
        particles2.position.z = 1
        scene.add(particles2)



        newLine.name = wall.layer_id

        // const helper = new THREE.Box3Helper( geometry.boundingBox, 0xffff00 );
        // newLine.add( helper );

        virtualWallsGroup.add(newLine)
        console.log(points, newLine)
    })
    virtualWallsGroup.position.z = 1;
    virtualWallsGroup.name = 'virtual-wall';
    mapGroup.add( virtualWallsGroup );
    
    // -------- location ----------
    const geometryLocation = new THREE.PlaneGeometry( 1, 1 );
    const locationsGroup = new THREE.Object3D();
    const materialLocationGreen = new THREE.MeshBasicMaterial( {color: 0x20d199} );
    mapDate.locations.forEach(loc => {
        const point = new THREE.Mesh( geometryLocation, materialLocationGreen );
        point.position.x = loc.x / resolution;
        point.position.y = loc.y / resolution;
        locationsGroup.add(point)
    });
    locationsGroup.position.z = 2;
    locationsGroup.name = "locations";

    mapGroup.add( locationsGroup );

    let gridDivisions = Math.ceil(Math.max(cols, rows) / 7);
    let gridSize = gridDivisions * 7;

    const gridHelper = new THREE.GridHelper( gridSize, gridDivisions );
    gridHelper.rotateX(Math.PI / 2);
    gridHelper.position.set(gridSize / 2 + (originX / resolution), gridSize / 2 + (originY / resolution), 2);
    gridHelper.name = 'grid';
    gridHelper.visible = false;
    mapGroup.add( gridHelper );

    mapGroup.rotateZ(Math.PI);
    
    mapGroup.name = 'map-all';
    mapGroup.disposeAll = function () {
        mapGroup.children[0].geometry.dispose();
        mapGroup.children[0].material.map.dispose();
        mapGroup.children[0].material.dispose();
        mapGroup.children[1].children.forEach(item => {
            item.geometry.dispose();
            item.material.dispose();
        })
        mapGroup.children[2].children.forEach(item => {
            item.geometry.dispose();
            item.material.dispose();
        })
        mapGroup.children[3].geometry.dispose();
        mapGroup.children[3].material.dispose();
    };

    mapGroup.resetView = function () {
        const size = new THREE.Vector3()
        size.copy(mesh.position).multiplyScalar(-1)
        
        camera.zoom = Math.min(window.innerHeight / rows, window.innerWidth / cols)
        camera.position.set(size.x, size.y, camera.position.z);
        camera.updateProjectionMatrix();
    
        orbitControls.target.copy(size);
        orbitControls.update(); // Must use orbit.update.
    }

    return mapGroup;
}

let currentMap = null;
let scene, camera, renderer, orbitControls, rayCaster, mouse, deltaMouse, plane;
const mouseIntersection = new THREE.Vector3();
const mouseLastIntersection = new THREE.Vector3();

document.querySelector('.control-bar').addEventListener('click', clickHandler);
function clickHandler(event) {
    if(event.target.id == 'map-1'){
        currentMap && currentMap.removeFromParent();
        currentMap && currentMap.disposeAll();
        currentMap = initMap(mapDate1);
        currentMap.resetView();
        scene.add(currentMap);
    } else if (event.target.id == 'map-2') {
        currentMap && currentMap.removeFromParent();
        currentMap && currentMap.disposeAll();
        currentMap = initMap(mapDate2);
        currentMap.resetView();
        scene.add(currentMap);
    } else if (event.target.id == 'map-3') {
        currentMap && currentMap.removeFromParent();
        currentMap && currentMap.disposeAll();
        currentMap = initMap(mapDate3);
        currentMap.resetView();
        scene.add(currentMap);
    } else if (event.target.id == 'mode') {
        isEditMode = !isEditMode;
        event.target.innerText = isEditMode ? 'current mode: edit' : 'current mode: view';
        orbitControls.enabled = !isEditMode;
    } else if (event.target.id == 'grid') {
        const gridObj = currentMap.children.find(({name}) => name == 'grid');
        gridObj.visible = !gridObj.visible;
    } else if (event.target.id == 'add-point') {
        try {
            const wall = findMesh('virtual-wall').children[0].children
            const points = [
                468,
                265,
                1,
                241,
                376,
                1,
                // 541,
                // 401,
                // 1,
            ]
            wall.forEach(item => {
                console.log(item)
                if(item.isLine2){
                    // TODO: update positions
                    // item.geometry.setAttribute('position', new THREE.Float32BufferAttribute( points, 3 ))
                    // item.geometry.setPositions(points)
                    const geometry = new LineGeometry();
                    geometry.setPositions( points );
                    item.geometry = geometry;
                } else {
                    item.geometry.setAttribute('position', new THREE.Float32BufferAttribute( points, 3 ))
                }
            })
            
        } catch (error) {
            console.error(error)
        }

    }
}

function initThree() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // scene.background = new THREE.Color(0xf4f4f5);
    camera = new THREE.OrthographicCamera( window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2,  0.1, 1000 );
    // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, 20);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    const originalPoint = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ) );
    originalPoint.position.set(0, 0, 3);
    scene.add( originalPoint );
    
    orbitControls = new OrbitControls( camera, renderer.domElement );
    orbitControls.enableRotate = false;
    orbitControls.mouseButtons.LEFT = THREE.MOUSE.PAN;
    orbitControls.listenToKeyEvents( window );


    // orbitControls = new MapControls( camera, renderer.domElement );
    // orbitControls.enableRotate = false;
    // orbitControls.mouseButtons.LEFT = THREE.MOUSE.PAN;
    // console.log(orbitControls)

    // const axesHelper = new THREE.AxesHelper( 50 );
    // scene.add( axesHelper );
    
    rayCaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    deltaMouse = new THREE.Vector3();
    plane = new THREE.Plane();
    //通过相机位置生成法向量，该法向量和一个点可以建立一个平面
    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), new THREE.Vector3(0, 0, 1));

    animate();
}

function setMouse(event) {
    // mouse coords set [-1, 1]
    var rect = renderer.domElement.getBoundingClientRect();
    const newX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const newY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const newMouse = new THREE.Vector2(newX, newY);
    // deltaMouse = newMouse.sub(mouse);
    mouse.copy(newMouse);
}
function setRaycaster(event) {
    setMouse(event);
    rayCaster.setFromCamera(mouse, camera);
}

function getIntersection(event) {
    setRaycaster(event);
    mouseLastIntersection.copy(mouseIntersection);
    rayCaster.ray.intersectPlane(plane, mouseIntersection);
    return mouseIntersection;
}

function findMesh (name){
    return scene.getObjectByName(name)
}

function animate() {
	requestAnimationFrame( animate );
    orbitControls.update();
    if(currentMap){
        const locations = findMesh('locations');
        const factor = ( camera.top - camera.bottom ) / camera.zoom;
        locations.children.forEach(item => {
            item.scale.set( 1, 1, 1 ).multiplyScalar( factor * 1 / 100 );
        })

        // const redlines = findMesh('line');
        // console.log(redlines)
        // redlines.children.forEach(line => {
        //     line.material.resolution.set( window.innerWidth, window.innerHeight )
        // })
    }
	renderer.render( scene, camera );
}

initThree();

const drawPointSerial = [];
const geometry = new THREE.BufferGeometry();
const material = new THREE.LineBasicMaterial( { color: 0xf44336, opacity: 0.2 } );
function drawLine(object) {

    const points = wall.layer_poses.map(point => new THREE.Vector3( point.x / resolution, point.y / resolution, 1 ));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new MeshLine();
    line.setGeometry(geometry);
}

function drawPoint(position) {
    console.log({position})
    const point = new THREE.Mesh( new THREE.PlaneGeometry( 1, 1 ), new THREE.MeshBasicMaterial( {color: 0xff00ff} ) );
    point.position.copy(position);
    scene.add( point );
}

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
// document.addEventListener('wheel', onMouseWheel);
window.addEventListener( 'resize', onWindowResize );
// document.addEventListener( 'mousemove', onMouseMove );
function onWindowResize() {

    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.left = window.innerWidth / - 2; // 设置 left 的值
    camera.right = window.innerWidth / 2; // 设置 right 的值
    camera.top = window.innerHeight / 2; // 设置 top 的值
    camera.bottom = window.innerHeight / - 2; // 设置 bottom 的值
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
function onMouseWheel(event) {
    if (event.wheelDelta > 0) {
        camera.zoom = camera.zoom / 0.95;
    } else {
        camera.zoom = camera.zoom * 0.95;
    }
    camera.updateProjectionMatrix();
}
let selectedObject = null;
let mousePosition = new THREE.Vector3();

function onMouseDown(event) {
    // if(!isEditMode) return
    getIntersection(event);
    // const intersects = rayCaster.intersectObjects(findMesh('virtual-wall').children)
    const intersects = rayCaster.intersectObject(scene)
    if(intersects.length > 0){
        console.log(intersects)
        const selectItem = intersects[0].object
        if(selectItem.isLine2){
            selectedObject = selectItem.parent
        }   
    }
    // drawPoint(mouseIntersection);
    // drawPointSerial = [];
    // drawPointSerial.push(mouseIntersection);

    // var intersects = rayCaster.intersectObjects([cube]);//参数需为数组
    // //左键点击并且点击的是物体时
    // if (event.button === 0 && intersects[0]) {
    //     selectObj = intersects[0].object;//储存当前点击的对象
    //     liftMouseDown = true;
    //     lastPosition = selectObj.position;//储存当前物体坐标位置
    //     lastIntersection = getIntersection(event);//获取点击时的交点
    //     document.addEventListener('mousemove', onMouseMove);
    // }
    // //右键点击屏幕时
    // if (event.button === 2) {
    //     mouseX = event.clientX;
    //     mouseY = event.clientY;
    //     rightMouseDown = true;
    //     document.addEventListener('mousemove', onMouseMove);
    // }
    // mousePosition.set(event.clientX, event.clientY, 0);
    // mousePosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mousePosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    document.addEventListener('mousemove', onMouseMove);
}

function onMouseMove( event ) {
    event.preventDefault();
    getIntersection(event);
    
    if(selectedObject){
        orbitControls.enabled = false;
        deltaMouse.subVectors(mouseLastIntersection, mouseIntersection);
        selectedObject.position.add(deltaMouse);
    }
    
    // rotation(deltaX, deltaY);
    // camera.position.set(camera.position.x - deltaX, camera.position.y + deltaY, camera.position.z);
    // mapGroup.position.set(mousePosition.x, mousePosition.y, mapGroup.position.z)
}

function onMouseUp(event) {
    event.preventDefault();
    // liftMouseDown = false;
    // rightMouseDown = false;

    if(selectedObject){


        selectedObject = null;
    }

    document.removeEventListener('mousemove', onMouseMove);

    orbitControls.enabled = true;

    if(!isEditMode) return
    getIntersection(event);

    let myarray = new Float32Array(selectedObject.geometry.points.length+3)
    myarray.set([...selectedObject.geometry.points, selectedObject.position.x - mouseIntersection.x, selectedObject.position.y - mouseIntersection.y, 1])

    console.log(selectedObject.geometry.points, myarray)
    selectedObject.geometry.setPoints(myarray)
}
