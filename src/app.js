import {
  Scene,
  BoxGeometry,
  MeshLambertMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  OrthographicCamera,
  WebGLRenderer,
} from 'three'

const scene = new Scene()

const geometry = new BoxGeometry(100, 100, 100)
const material = new MeshLambertMaterial({ color: 0x0000ff })
const mesh = new Mesh(geometry, material)
scene.add(mesh)

const point = new PointLight(0xffffff)
point.position.set(400, 200, 300)
scene.add(point)

const ambient = new AmbientLight(0x444444)
scene.add(ambient)

const width = window.innerWidth
const height = window.innerHeight
const k = width / height
const s = 200
const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
camera.position.set(200, 300, 200)
camera.lookAt(scene.position)

const renderer = new WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0xb9d3ff, 1)

document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)
