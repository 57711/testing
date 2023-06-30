import * as THREE from 'three';


// const width = 512;
// const height = 512;

// const size = width * height;
// const data = new Uint8Array( 4 * size );
// const color = new THREE.Color( 0x20d199 );

// const r = Math.floor( color.r * 255 );
// const g = Math.floor( color.g * 255 );
// const b = Math.floor( color.b * 255 );

// for ( let i = 0; i < size; i ++ ) {

// 	const stride = i * 4;

// 	data[ stride ] = r;
// 	data[ stride + 1 ] = g;
// 	data[ stride + 2 ] = b;
// 	data[ stride + 3 ] = 255;

// }

// const texture = new THREE.DataTexture( data, width, height );
// texture.needsUpdate = true;


// const size = texture.image.width * texture.image.height;
// const data = texture.image.data;

// // generate a random color and update texture data

// color.setHex( Math.random() * 0xffffff );

// const r = Math.floor( color.r * 255 );
// const g = Math.floor( color.g * 255 );
// const b = Math.floor( color.b * 255 );

// for ( let i = 0; i < size; i ++ ) {

//     const stride = i * 4;

//     data[ stride ] = r;
//     data[ stride + 1 ] = g;
//     data[ stride + 2 ] = b;
//     data[ stride + 3 ] = 1;

// }

var geometry = new THREE.PlaneGeometry(32, 32); //矩形平面
/**
 * 创建纹理对象的像素数据
 */
var width = 32; //纹理宽度
var height = 32; //纹理高度
var size = width * height * 4; //像素大小
var data = new Uint8Array(size); //size*4：像素在缓冲区占用空间
for (let i = 0; i < size; i += 4) {
  // 随机设置RGB分量的值
  data[i] = 255 * Math.random()
  data[i + 1] = 255 * Math.random()
  data[i + 2] = 255 * Math.random()
  // 设置透明度分量A
  data[i + 3] = 255 * 1
}
// 创建数据文理对象   RGBA格式：THREE.RGBAFormat
var texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
texture.needsUpdate = true; //纹理更新
//打印纹理对象的image属性
console.log(texture.image);

// var material = new THREE.MeshPhongMaterial({
//   map: texture, // 设置纹理贴图
//   transparent:true,//允许透明设置
// });
var material = new THREE.MeshBasicMaterial({
  map: texture, // 设置纹理贴图
  transparent:true,//允许透明设置
});

var mesh = new THREE.Mesh(geometry, material);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

mesh.position.set(0, 0, 0);
scene.add(mesh);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
camera.position.set(0, 0, 50);
animate();
