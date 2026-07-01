import * as THREE from 'three'

/**
 * Creates and mounts the deep-space Three.js scene onto a canvas.
 * This is framework-agnostic on purpose: it's created once in App.vue
 * and never torn down between route changes, only the camera Z target
 * changes (via setDepth) to create the "flying through space" effect
 * as the user navigates between sections.
 */
export function createSpaceScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(innerWidth, innerHeight)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x03050a, 0.011)

  const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.1, 300)
  camera.position.set(0, 0, 40)

  // Starfield
  const starGeo = new THREE.BufferGeometry()
  const starCount = 3500
  const starPos = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 320
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 220
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 320
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  scene.add(
    new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent: true, opacity: 0.65 })
    )
  )

  // Tunnel rings — depth markers the camera flies through
  const rings = []
  const ringColors = [0x1a3a6a, 0x2a1a5a, 0x0a2a4a, 0x1a1a4a, 0x2a0a3a, 0x0a1a3a]
  const RING_COUNT = 24
  for (let i = 0; i < RING_COUNT; i++) {
    const r = 16 + Math.random() * 16
    const geo = new THREE.TorusGeometry(r, 0.05 + Math.random() * 0.09, 4, 90)
    const mat = new THREE.MeshBasicMaterial({
      color: ringColors[i % ringColors.length],
      transparent: true,
      opacity: 0.12 + Math.random() * 0.18,
    })
    const ring = new THREE.Mesh(geo, mat)
    ring.position.z = -i * 18
    ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.5
    ring.rotation.z = Math.random() * Math.PI
    scene.add(ring)
    rings.push({ mesh: ring, spin: i % 2 ? 0.0008 : -0.0008 })
  }

  // Floating geometric shapes
  const shapes = []
  const geos = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
  ]
  for (let i = 0; i < 26; i++) {
    const mesh = new THREE.Mesh(
      geos[i % 3],
      new THREE.MeshStandardMaterial({
        color: 0x1a3060,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.4,
      })
    )
    const s = 0.3 + Math.random() * 1.4
    mesh.scale.setScalar(s)
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 36,
      -Math.random() * 180
    )
    mesh.userData = { rx: (Math.random() - 0.5) * 0.013, ry: (Math.random() - 0.5) * 0.015 }
    scene.add(mesh)
    shapes.push(mesh)
  }

  scene.add(new THREE.AmbientLight(0x0a1020, 3))
  const pl1 = new THREE.PointLight(0x4f8ef7, 3, 65)
  pl1.position.set(-15, 10, 10)
  scene.add(pl1)
  const pl2 = new THREE.PointLight(0xa78bfa, 2, 65)
  pl2.position.set(15, -10, 5)
  scene.add(pl2)

  // ── Camera depth control (driven by router) ──
  // Each route gets a depth index; we space them 40 units apart so the
  // tunnel rings (18 units apart) create multiple "passes" per page,
  // giving a sense of real travel rather than an instant cut.
  let camTargetZ = 40
  const DEPTH_UNIT = 40

  function setDepth(depthIndex) {
    camTargetZ = 40 - depthIndex * DEPTH_UNIT
  }

  let mouseX = 0
  let mouseY = 0
  function onMouseMove(e) {
    mouseX = (e.clientX / innerWidth - 0.5) * 2
    mouseY = (e.clientY / innerHeight - 0.5) * 2
  }
  document.addEventListener('mousemove', onMouseMove)

  function onResize() {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  }
  window.addEventListener('resize', onResize)

  let t = 0
  let rafId = null
  function loop() {
    rafId = requestAnimationFrame(loop)
    t += 0.007
    camera.position.z += (camTargetZ - camera.position.z) * 0.045
    camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.022
    camera.position.y += (-mouseY * 1.8 - camera.position.y) * 0.022
    camera.lookAt(camera.position.x * 0.1, camera.position.y * 0.1, camera.position.z - 50)

    rings.forEach((r) => (r.mesh.rotation.z += r.spin))
    shapes.forEach((s) => {
      s.rotation.x += s.userData.rx
      s.rotation.y += s.userData.ry
    })
    pl1.position.x = Math.sin(t) * 22
    pl2.position.x = Math.cos(t * 0.65) * 18

    renderer.render(scene, camera)
  }
  loop()

  function destroy() {
    cancelAnimationFrame(rafId)
    document.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
  }

  return { setDepth, destroy }
}
