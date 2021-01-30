import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import {
  Scene,
  BoxGeometry,
  SphereGeometry,
  PlaneGeometry,
  MeshLambertMaterial,
  MeshBasicMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  DoubleSide,
  Vector3,
  FaceColors,
  Color,
} from 'three'

let leftPress = false

// 舞台(世界)
const scene = new Scene()

// 地面
const ground = new Mesh(new PlaneGeometry(1000, 1), new MeshBasicMaterial({ color: new Color(0xeeeeee) }))
ground.position.setY(-2)
ground.receiveShadow = true
scene.add(ground)

// xyz线轴辅助
// x:红色 y:绿色 z:蓝色
const axishelper = new AxesHelper(1000)
scene.add(axishelper)

// 一个立方体
const cube = new BoxGeometry(10, 10, 10)
const mates = []
const colors = [0xffc107, 0x9e9e9e, 0xf44336, 0xff9800, 0x4caf50, 0x03a9f4]
cube.faces.forEach((f, i) => {
  const m = new MeshBasicMaterial({ color: new Color(colors[i % colors.length]), side: DoubleSide })
  mates.push(m)
})
const mesh = new Mesh(cube, mates)
mesh.position.set(20, 20, 30)
mesh.castShadow = true
scene.add(mesh)

// balls
const balls = []
balls.push(new Mesh(new SphereGeometry(50, 20, 20), new MeshLambertMaterial({ color: 0xab2300 })))
balls.forEach((b) => {
  b.position.set(450, 450, 450)
  scene.add(b)
})

// 点光
const point = new PointLight(0xffffff)
point.position.set(1000, 0, 0)
point.castShadow = true
scene.add(point)

// 环境光
const ambient = new AmbientLight(0x444444)
scene.add(ambient)

const width = window.innerWidth
const height = window.innerHeight
const camera = new PerspectiveCamera(60, width / height, 1, 3000)

camera.position.set(100, 100, 100)
camera.lookAt(new Vector3(0, 0, 0).normalize())

const renderer = new WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0x999999, 1)
// 阴影
renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

window.addEventListener('mousedown', () => (leftPress = true))
window.addEventListener('mouseup', () => (leftPress = false))
window.addEventListener('mousemove', (e) => {
  e.preventDefault()
  if (leftPress) {
    // camera.rotateOnAxis(new Vector3(1, 0, 0), e.movementY / 500)
    // console.log(e.movementY)
    // const currCameraVector = camera.getWorldDirection()
    // camera.rotateOnWorldAxis(camera.getWorldDirection(), e.movementY / 500)

    // 左右
    // camera.rotateOnWorldAxis(new Vector3(0, 0, 1), e.movementX / 500)

    camera.position.set(camera.position.x + e.movementX / 200, 100, 100)
  }
})
