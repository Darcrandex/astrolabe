import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

const width = window.innerWidth
const height = window.innerHeight

const world = new Scene()

const camera = new PerspectiveCamera(60, width / height, 1, 3000)

const renderer = new WebGLRenderer()
renderer.setSize(width, height)
renderer.setClearColor(0xdddddd, 1)
document.body.appendChild(renderer.domElement)

function render() {
  renderer.render(world, camera)
  requestAnimationFrame(render)
}

render()
