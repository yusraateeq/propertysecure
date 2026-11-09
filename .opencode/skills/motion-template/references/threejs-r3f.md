# Three.js and React Three Fiber Guide

Three.js is a renderer, not a design decision. Use it when depth, material, camera, or
interaction communicates something a still image cannot. Otherwise ship the still image.

## 3D gate

Answer these before writing a scene:

1. What does the 3D explain or make desirable?
2. What is the poster and the no-WebGL fallback?
3. What are the triangle, draw-call, texture, and DPR budgets?
4. How does the scene pause offscreen and for reduced motion?
5. What is the mobile quality tier?

If any answer is missing, do not add a canvas.

## Choose the renderer

| Situation | Use |
| --- | --- |
| React app | `@react-three/fiber` + `@react-three/drei` |
| Vue app | `@tresjs/core` |
| Svelte app | `@threlte/core` |
| Astro/static page without React islands | vanilla `three` |
| Simple tilt or card depth | CSS 3D |
| 2D particles or physics | DOM/CSS or a 2D engine, not Three.js |

Do not mix vanilla Three.js and R3F in the same scene. Choose one owner.

## R3F canvas

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { ContactShadows, Environment, Preload } from "@react-three/drei";
import { ProductModel } from "./ProductModel";

export function ProductScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows={false}
      camera={{ position: [0, 0.4, 5], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <Suspense fallback={null}>
        <ProductModel />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.35} blur={2.5} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
```

`Environment preset` loads an HDR from a remote preset. For production, self-host the HDR
or pass `files` so the scene does not depend on a third-party CDN.

## Lazy loading and client boundaries

```tsx
"use client";

import dynamic from "next/dynamic";
import { ScenePoster } from "./ScenePoster";

const ProductScene = dynamic(
  () => import("./ProductScene").then((mod) => mod.ProductScene),
  { ssr: false, loading: () => <ScenePoster /> }
);

export function ProductHero() {
  return (
    <div className="relative aspect-square">
      <ScenePoster />
      <div className="absolute inset-0">
        <ProductScene />
      </div>
    </div>
  );
}
```

- `ssr: false` prevents `window` and WebGL errors during server rendering.
- The parent using `dynamic` must be a client component.
- Show the poster immediately; never reserve a blank canvas.
- Gate loading on intersection or idle time if the scene is below the fold.

## Capability gate

```tsx
"use client";

import { useEffect, useState } from "react";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function WebGLGate({
  fallback,
  children
}: {
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  if (supported === null) return <>{fallback}</>;
  return supported ? <>{children}</> : <>{fallback}</>;
}
```

Add an error boundary around the canvas as well. A context can be lost after the gate
passes.

## Model loading

```tsx
"use client";

import { useGLTF } from "@react-three/drei";

export function ProductModel() {
  const { scene } = useGLTF("/models/product.glb");
  return <primitive object={scene} dispose={null} />;
}

useGLTF.preload("/models/product.glb");
```

Rules:

- `useGLTF` caches by URL. If you need multiple independent copies, clone the scene with
  `SkeletonUtils.clone` for skinned models or `scene.clone(true)` for static meshes.
- `dispose={null}` prevents R3F from disposing a cached scene that another component may
  reuse. If the model is not cached or shared, allow disposal.
- Compress geometry with Draco or Meshopt and textures with KTX2/WebP where supported.
- Keep the hero GLB under a few megabytes; measure on a slow connection.
- Check color space and material settings after export.

## Scroll-driven camera

```tsx
"use client";

import { useScroll, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function ScrollCamera({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"]
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera }) => {
    const value = progress.get();
    camera.position.set(0, 0.4 - value * 0.2, 5 - value * 2.2);
    camera.lookAt(lookAt.current);
  });

  return null;
}
```

The `target` ref must point to a DOM wrapper outside the canvas. Keep the scroll range
explicit and test on trackpads, wheel, and keyboard scrolling.

For GSAP-driven camera moves, use one ScrollTrigger timeline and read its progress inside
`useFrame`. Do not add a second scroll listener.

## Drei helpers that earn their place

| Helper | Use | Caveat |
| --- | --- | --- |
| `useGLTF` | Load GLB/glTF | Cache and clone correctly. |
| `Environment` | Image-based lighting | Self-host HDR presets. |
| `ContactShadows` | Soft grounding shadow | Cheaper than real shadow maps for a hero. |
| `OrbitControls` | Product inspection | Add reset and keyboard access. |
| `Html` | Labels anchored to 3D | Can be expensive; avoid dozens. |
| `Preload` | Warm assets | Do not preload below-the-fold scenes immediately. |
| `AdaptiveDpr` | Lower resolution under load | Test that the drop is not visible. |
| `PerformanceMonitor` | Quality tiers | Use it to switch DPR and effects. |
| `Bounds` | Frame a model automatically | Check the result at every breakpoint. |

## Quality tiers

```tsx
"use client";

import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";

export function QualityTier({ children }: { children: React.ReactNode }) {
  return (
    <PerformanceMonitor>
      <AdaptiveDpr pixelated />
      <group>{children}</group>
    </PerformanceMonitor>
  );
}
```

`AdaptiveDpr` owns the resolution drop. Use `onDecline`/`onIncline` when a parent store must
also remove postprocessing, shadows, or expensive materials. The Canvas `dpr` prop still
owns the starting pixel ratio.

A practical tier model:

| Tier | DPR | Postprocessing | Shadows | Textures |
| --- | --- | --- | --- | --- |
| High | 2 | Bloom/DOF allowed | Optional | 2048 |
| Medium | 1.5 | Bloom only | Off | 1024 |
| Low | 1 | Off | Off | 512 |
| Static | none | none | none | poster |

## Postprocessing

```tsx
"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.6} luminanceThreshold={0.8} mipmapBlur />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  );
}
```

Postprocessing is the first thing to remove on mobile. Bloom, depth of field, and large
blur kernels can dominate frame time. Measure with the production build.

## Shader material

```tsx
"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const GradientMaterial = shaderMaterial(
  {
    uTime: 0,
    uA: new THREE.Color("#0e0a06"),
    uB: new THREE.Color("#b0416b")
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uA;
    uniform vec3 uB;
    varying vec2 vUv;
    void main() {
      float mixValue = 0.5 + 0.5 * sin(vUv.x * 3.0 + uTime * 0.2);
      gl_FragColor = vec4(mix(uA, uB, mixValue * vUv.y), 1.0);
    }
  `
);

extend({ GradientMaterial });

export function GradientPlane() {
  const material = useRef<any>(null);

  useFrame((_, delta) => {
    if (material.current) material.current.uTime += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <gradientMaterial ref={material} />
    </mesh>
  );
}
```

Use TypeScript module augmentation for custom materials in production. Keep shaders small,
avoid per-frame allocations, and provide a CSS gradient fallback.

## Instancing

For thousands of identical objects, use `InstancedMesh` rather than thousands of meshes.
Set matrices once, then animate the group or update matrices only when necessary.

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export function Dots({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  useLayoutEffect(() => {
    if (!mesh.current) return;
    for (let index = 0; index < count; index += 1) {
      dummy.current.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      );
      dummy.current.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.current.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[0.02, 0]} />
      <meshBasicMaterial color="#ffffff" />
    </instancedMesh>
  );
}
```

## Vanilla Three.js

Use vanilla Three.js for Astro, static pages, or non-React apps.

```js
import * as THREE from "three";

export function mountScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.4, 5);

  const clock = new THREE.Clock();
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  renderer.setAnimationLoop(() => {
    const elapsed = clock.getElapsedTime();
    // animate using elapsed
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    scene.traverse((object) => {
      object.geometry?.dispose();
      const material = object.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose();
    });
    renderer.dispose();
  };
}
```

Also remove pointer, resize, and visibility listeners you add. Call `renderer.forceContextLoss()`
only when you need to release a context immediately, and test that a remount still works.

## Pause offscreen and when hidden

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

function useSceneActive() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, active: visible && inView };
}

export function SceneCanvas({ children }: { children: React.ReactNode }) {
  const { ref, active } = useSceneActive();

  return (
    <div ref={ref} className="h-full w-full">
      <Canvas frameloop={active ? "always" : "never"}>
        {children}
      </Canvas>
    </div>
  );
}
```

For a canvas that is static until interaction, use `frameloop="demand"` and call
`invalidate()` when state changes. For a continuously animated scene, stop the render loop
when the canvas leaves the viewport or the tab is hidden. Do not leave a full GPU scene
running in a background tab.

## Disposal

Dispose:

- geometries
- materials and their textures
- render targets
- loaders and cached assets you own
- renderer
- animation loop
- observers and event listeners

Do not dispose cached assets that another scene still uses. Centralize ownership in a scene
registry when multiple components share models.

## Performance budgets

| Metric | Default budget |
| --- | --- |
| Triangles | <= 100k hero, <= 250k total |
| Draw calls | <= 50 |
| Textures | <= 2048 hero, <= 1024 secondary |
| DPR | <= 2 desktop, <= 1.5 mobile, low tier 1 |
| Canvas count | 1 per page |
| Render loops | 1 |
| GLB | <= 2-5 MB compressed |
| Postprocessing | Off on mobile unless measured |
| Shader uniforms | No per-frame allocations |

Measure on a mid-range Android device. A desktop GPU hides problems that users will feel.

## Accessibility

- Decorative canvas: `aria-hidden="true"` and a nearby text description.
- Meaningful canvas: `role="img"`, `aria-label`, and a text alternative with the same
  information.
- No essential copy inside the canvas.
- Looping scene: visible pause/play control.
- Reduced motion: static poster or a single still frame.
- Interactive 3D: keyboard controls, reset, and focus states.
- No flashing above 3 Hz.
- Provide captions/transcripts for audio or video.

## Fallbacks

The scene must survive:

1. no WebGL
2. context loss
3. reduced motion
4. slow network
5. low-end device
6. JavaScript disabled
7. route change/unmount

Use a poster as the universal fallback. Load the 3D chunk only after the poster is visible
and the browser is idle or the section is near the viewport.

## Scene recipes

### 1. Floating product

- Use: product launch, hardware, ecommerce hero.
- Stack: GLB + `MeshStandardMaterial` + environment light + slow rotation.
- Budget: <= 100k triangles, <= 3 lights, one model.
- Fallback: high-resolution product render.
- Avoid: rotation so fast it reads as a spinner.

### 2. Scroll-driven camera

- Use: property walkthrough, product story, immersive landing.
- Stack: R3F camera + Motion `useScroll` or GSAP progress.
- Budget: one scene, one scroll owner, no per-frame allocations.
- Fallback: static section images in the same order.
- Avoid: pinning more than one scene per page.

### 3. Shader gradient hero

- Use: SaaS, developer tool, waitlist.
- Stack: full-screen plane + fragment shader.
- Budget: one full-screen pass, low iteration count.
- Fallback: CSS gradient with the same palette.
- Avoid: heavy noise loops on mobile.

### 4. Particle field

- Use: agency, event, futuristic brand.
- Stack: `Points` or `InstancedMesh`, one draw call.
- Budget: 3k-8k points, no per-particle React state.
- Fallback: static star/particle image.
- Avoid: particles that obscure text or ignore reduced motion.

### 5. Instanced grid / wave

- Use: data, network, developer tool.
- Stack: instanced mesh or a plane with vertex displacement.
- Budget: 1k-10k instances, <= 120x120 plane segments.
- Fallback: CSS pattern or static image.
- Avoid: updating every instance matrix each frame.

### 6. Image displacement

- Use: creative portfolio, fashion, hospitality.
- Stack: plane + texture + pointer uniform.
- Budget: one texture <= 2048px, one full-screen pass.
- Fallback: CSS scale/translate on hover.
- Avoid: requiring hover for essential content.

### 7. Point globe

- Use: global product, network, logistics.
- Stack: sphere distribution + `Points`.
- Budget: 8k-20k points.
- Fallback: flat world map.
- Avoid: rendering country borders as thousands of separate meshes.

### 8. Morphing blob

- Use: wellness, AI, abstract brand.
- Stack: icosahedron + vertex shader.
- Budget: subdivision 4-5, one material.
- Fallback: CSS gradient blob.
- Avoid: continuous morph with no pause.

### 9. Physics configurator

- Use: product customization, interactive demo.
- Stack: R3F + Rapier.
- Budget: simple colliders, no full-world simulation.
- Fallback: static configurator with form controls.
- Avoid: physics for a scene that only needs a rotation.

### 10. 3D card tilt

- Use: product cards, feature cards.
- Stack: CSS 3D, not Three.js.
- Budget: no canvas.
- Fallback: CSS lift/shadow.
- Avoid: per-card WebGL contexts.

## Common failures

| Symptom | Cause | Fix |
| --- | --- | --- |
| `window is not defined` | Canvas rendered on the server | `dynamic(..., { ssr: false })` in a client component |
| Black scene | No lights, wrong camera, or color space | Add lights, check camera position, set output color space |
| Model missing | Wrong public path or loader | Check `/models/...`, network tab, and `useGLTF.preload` |
| Scene freezes | `frameloop="demand"` without invalidation | Call `invalidate()` on state change |
| Memory grows on navigation | Geometries/materials/renderer not disposed | Dispose in cleanup and remove listeners |
| Canvas has zero height | Parent has no size | Give the wrapper an aspect ratio or explicit height |
| Remote environment fails | Preset URL blocked | Self-host the HDR |
| Scroll scene stutters | Two scroll owners or per-frame allocations | One owner; reuse vectors and objects |

## Testing

Run a no-WebGL test:

```ts
import { test, expect } from "@playwright/test";

test("falls back without WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
        return null;
      }
      return original.call(this, type, ...args);
    };
  });

  await page.goto("/");
  await expect(page.getByTestId("scene-poster")).toBeVisible();
});
```

Also test reduced motion, route change cleanup, and a mid-range device profile.
