# Motion and 3D Reference

> This file defines motion direction and scene concepts. For production implementation,
> stack selection, architecture, performance budgets, and fallbacks, load the
> **motion-template** skill and use its `MT-xx` recipes plus `select-stack.mjs`.

Motion exists to explain state, hierarchy, and story. 3D exists when depth makes the
product clearer or more desirable. Neither is decoration.

## Motion system

| Token | Duration | Easing | Use |
| --- | --- | --- | --- |
| `instant` | 80-120ms | linear | press, toggle, checkbox |
| `fast` | 150-200ms | `power1.out` | hover, focus, tooltip |
| `base` | 240-320ms | `power2.out` | enter/exit, panel |
| `slow` | 400-600ms | `power3.out` | hero reveal, page transition |
| `scene` | 800-1600ms | custom | scroll-driven storytelling |

Rules:

- Animate `transform` and `opacity` only. Avoid animating layout properties.
- One idea per animation. Do not stack three effects on the same element.
- Stagger 40-80ms; more than eight items should group into rows.
- Never block input while an entrance animation plays.
- Always implement `prefers-reduced-motion`.

```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
gsap.registerPlugin(ScrollTrigger);
if (reduce) gsap.set("[data-reveal]", { opacity: 1, y: 0 });
```

## GSAP recipes

### 1. Fade-up stagger

```js
gsap.from("[data-reveal]", {
  y: 24, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.06,
  scrollTrigger: { trigger: "[data-reveal]", start: "top 85%" },
});
```

### 2. Reveal mask

```js
gsap.from("[data-mask]", {
  clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.out",
  scrollTrigger: { trigger: "[data-mask]", start: "top 80%" },
});
```

### 3. Pinned story

```js
const tl = gsap.timeline({
  scrollTrigger: { trigger: "[data-story]", start: "top top", end: "+=200%", pin: true, scrub: 1 },
});
tl.to("[data-story-panel]", { xPercent: -100 * 2, ease: "none" });
```

### 4. Horizontal gallery

```js
const track = document.querySelector("[data-track]");
gsap.to(track, {
  x: () => -(track.scrollWidth - innerWidth),
  ease: "none",
  scrollTrigger: { trigger: track, start: "top top", end: () => "+=" + (track.scrollWidth - innerWidth), pin: true, scrub: 1 },
});
```

### 5. Split headline (no plugin)

```js
document.querySelectorAll("[data-split]").forEach((el) => {
  el.innerHTML = el.textContent.split(" ").map((w) => `<span class="word">${w}</span>`).join(" ");
  gsap.from(el.querySelectorAll(".word"), {
    yPercent: 120, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.05,
    scrollTrigger: { trigger: el, start: "top 85%" },
  });
});
```

### 6. Counter metrics

```js
gsap.utils.toArray("[data-count]").forEach((el) => {
  const end = Number(el.dataset.count);
  gsap.fromTo(el, { textContent: 0 }, {
    textContent: end, duration: 1.4, ease: "power1.out", snap: { textContent: 1 },
    scrollTrigger: { trigger: el, start: "top 85%" },
  });
});
```

### 7. Page transition overlay

```js
const overlay = document.querySelector("[data-transition]");
document.querySelectorAll("a[data-nav]").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (reduce) return;
    e.preventDefault();
    gsap.timeline()
      .to(overlay, { scaleY: 1, transformOrigin: "bottom", duration: 0.4, ease: "power2.inOut" })
      .then(() => { location.href = a.href; });
  });
});
```

### 8. Magnetic button

```js
document.querySelectorAll("[data-magnetic]").forEach((el) => {
  const x = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" });
  const y = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" });
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    x((e.clientX - r.left - r.width / 2) * 0.2);
    y((e.clientY - r.top - r.height / 2) * 0.2);
  });
  el.addEventListener("pointerleave", () => { x(0); y(0); });
});
```

### 9. Cursor follower

```js
const dot = document.querySelector("[data-cursor]");
const x = gsap.quickTo(dot, "x", { duration: 0.2, ease: "power2.out" });
const y = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power2.out" });
addEventListener("pointermove", (e) => { x(e.clientX); y(e.clientY); });
```

Only on fine pointers. Hide for touch and reduced motion.

### 10. Infinite marquee

```js
const row = document.querySelector("[data-marquee]");
gsap.to(row, { xPercent: -50, ease: "none", duration: 24, repeat: -1 });
```

Duplicate the content once for a seamless loop; pause on hover and on reduced motion.

## Three.js boilerplate

```js
import * as THREE from "three";

const canvas = document.querySelector("[data-three]");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
camera.position.z = 5;

function resize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(canvas);
resize();

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const t = clock.getElapsedTime();
  // animate scene using t
  renderer.render(scene, camera);
});
```

Dispose on unmount:

```js
renderer.setAnimationLoop(null);
renderer.dispose();
scene.traverse((o) => {
  o.geometry?.dispose();
  if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
  else o.material?.dispose();
});
```

## Three.js scenes

### 1. Particle field hero

Concept: slow depth particles behind the headline. Stack: `THREE.Points` + custom points
shader. Budget: 3k-8k points, one draw call. Fallback: static starfield image.

```js
const geo = new THREE.BufferGeometry();
const count = 4000;
const pos = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  pos[i * 3] = (Math.random() - 0.5) * 16;
  pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
}
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
const mat = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff, transparent: true, opacity: 0.7 });
const points = new THREE.Points(geo, mat);
scene.add(points);
// animate: points.rotation.y = t * 0.03;
```

### 2. Floating product

Concept: a product mesh or GLB slowly rotating with a soft light rig. Stack: `GLTFLoader`,
`MeshStandardMaterial`, environment map. Budget: < 100k triangles, 2-3 lights. Fallback:
high-quality product render.

```js
const loader = new GLTFLoader();
loader.load("/models/product.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.setScalar(1.4);
  scene.add(model);
  gsap.to(model.rotation, { y: Math.PI * 2, duration: 18, repeat: -1, ease: "none" });
});
scene.add(new THREE.HemisphereLight(0xffffff, 0x222222, 1.2));
const key = new THREE.DirectionalLight(0xffffff, 2);
key.position.set(3, 4, 5);
scene.add(key);
```

### 3. Scroll-driven camera

Concept: scroll moves the camera through a scene. Stack: GSAP ScrollTrigger + Three.js.
Budget: one scene, no per-frame allocations. Fallback: static section images.

```js
gsap.timeline({ scrollTrigger: { trigger: "[data-scene]", start: "top top", end: "+=300%", scrub: 1, pin: true } })
  .to(camera.position, { z: 1.5, x: 1.2, ease: "none" })
  .to(camera.rotation, { y: 0.4, ease: "none" }, 0);
```

### 4. Morphing blob

Concept: organic shape that breathes with noise. Stack: `IcosahedronGeometry` + vertex
shader with simplex noise. Budget: subdivision 4-5, one material. Fallback: CSS gradient
blob.

```js
const geo = new THREE.IcosahedronGeometry(1.4, 5);
const mat = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color("#b0416b") } },
  vertexShader: `
    uniform float uTime; varying vec3 vNormal;
    void main() {
      vNormal = normal;
      vec3 p = position + normal * sin(position.y * 4.0 + uTime) * 0.08;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }`,
  fragmentShader: `
    uniform vec3 uColor; varying vec3 vNormal;
    void main() { gl_FragColor = vec4(uColor * (0.6 + 0.4 * vNormal.y), 1.0); }`,
});
const blob = new THREE.Mesh(geo, mat);
scene.add(blob);
// in loop: mat.uniforms.uTime.value = t;
```

### 5. Grid wave

Concept: a plane of points or tiles that ripples. Stack: plane + vertex displacement.
Budget: 120x120 segments max. Fallback: animated CSS gradient.

```js
const geo = new THREE.PlaneGeometry(10, 6, 120, 80);
const mat = new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: 0.35 });
const wave = new THREE.Mesh(geo, mat);
scene.add(wave);
// in loop: displace geometry.attributes.position from sin(x + t) * cos(y + t) * 0.15
```

### 6. Image displacement hover

Concept: a photo ripples under the cursor. Stack: plane + shader + pointer uniform +
texture. Budget: one texture <= 2048px. Fallback: CSS scale on hover.

```js
const uniforms = { uTexture: { value: texture }, uPointer: { value: new THREE.Vector2(0.5, 0.5) } };
// fragment shader offsets uv by sin(uv.y * 20.0 + uPointer.x * 6.0) * 0.01
canvas.addEventListener("pointermove", (e) => {
  const r = canvas.getBoundingClientRect();
  uniforms.uPointer.value.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
});
```

### 7. 3D card tilt

Concept: a card tilts toward the cursor. Stack: CSS 3D or Three.js plane. Prefer CSS for
performance. Fallback: a subtle CSS lift.

```js
card.addEventListener("pointermove", (e) => {
  const r = card.getBoundingClientRect();
  const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
  const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
  card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});
card.addEventListener("pointerleave", () => { card.style.transform = "perspective(900px)"; });
```

### 8. Point globe

Concept: a globe of points for global products. Stack: sphere distribution + `THREE.Points`.
Budget: 8k-20k points. Fallback: flat world map image.

```js
const count = 12000;
const geo = new THREE.BufferGeometry();
const pos = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  pos[i * 3] = Math.sin(phi) * Math.cos(theta) * 2;
  pos[i * 3 + 1] = Math.cos(phi) * 2;
  pos[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * 2;
}
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.012 })));
```

### 9. Shader gradient background

Concept: slow-moving brand gradient. Stack: fullscreen triangle + fragment shader. Budget:
one fullscreen pass. Fallback: static CSS gradient.

```js
const mat = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uA: { value: new THREE.Color("#0e0a06") }, uB: { value: new THREE.Color("#b0416b") } },
  vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
  fragmentShader: `
    uniform float uTime; uniform vec3 uA; uniform vec3 uB; 
    void main(){
      vec2 uv = gl_FragCoord.xy / vec2(1200.0, 800.0);
      float m = 0.5 + 0.5 * sin(uv.x * 3.0 + uTime * 0.2);
      gl_FragColor = vec4(mix(uA, uB, m * uv.y), 1.0);
    }`,
});
scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
```

### 10. Instanced particles

Concept: thousands of identical objects with one draw call. Stack: `InstancedMesh`.
Budget: 1k-10k instances. Fallback: static pattern.

```js
const geo = new THREE.IcosahedronGeometry(0.02, 0);
const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const mesh = new THREE.InstancedMesh(geo, mat, 4000);
const dummy = new THREE.Object3D();
for (let i = 0; i < 4000; i++) {
  dummy.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4);
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}
scene.add(mesh);
// in loop: mesh.rotation.y = t * 0.05;
```

## GSAP + Three.js integration

Drive camera or uniforms from one timeline. Do not run two independent animation loops.

```js
const state = { progress: 0 };
gsap.to(state, {
  progress: 1, ease: "none",
  scrollTrigger: { trigger: "[data-scene]", start: "top top", end: "+=300%", scrub: 1, pin: true },
  onUpdate: () => {
    camera.position.z = 5 - state.progress * 2;
    material.uniforms.uReveal.value = state.progress;
  },
});
renderer.setAnimationLoop(() => renderer.render(scene, camera));
```

For continuous motion, use the GSAP ticker so ScrollTrigger and rendering stay in sync:

```js
gsap.ticker.add(() => renderer.render(scene, camera));
```

## Performance and accessibility

- Cap DPR at 2; use 1.5 on mobile.
- Lazy-load 3D with dynamic `import()` and `IntersectionObserver`.
- Pause rendering when the canvas is offscreen (`renderer.setAnimationLoop(null)`).
- Budget: < 100k triangles, < 50 draw calls, textures <= 2048px.
- Compress GLB with Draco or Meshopt.
- Provide a static poster for reduced motion, slow networks, and no-WebGL.
- No essential information only inside a canvas.
- Add a pause control for looping scenes; no flashing above 3Hz.
- Test on a mid-range Android device, not only on a desktop GPU.

## Selection matrix

| Prompt | GSAP | Three.js scene |
| --- | --- | --- |
| premium real estate | reveal mask, parallax | floating product, image displacement |
| SaaS product launch | fade-up, pinned story | product shot, shader gradient |
| creative agency | split headline, cursor | particle field, morphing blob |
| developer tool | counter, fast feedback | point globe, grid wave |
| ecommerce | hover zoom, marquee | 3D card tilt, product orbit |
| editorial | reveal mask, reading progress | none or subtle gradient |
| dashboard | count-up, fade | none |

If the prompt does not justify 3D, ship motion only. Restraint reads as quality.
