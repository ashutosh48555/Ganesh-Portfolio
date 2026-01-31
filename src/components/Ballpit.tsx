import { useRef, useEffect } from 'react';
import {
  Clock,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  WebGLRendererParameters,
  SRGBColorSpace,
  MathUtils,
  Vector2,
  Vector3,
  MeshPhysicalMaterial,
  ShaderChunk,
  Color,
  Object3D,
  InstancedMesh,
  PMREMGenerator,
  SphereGeometry,
  AmbientLight,
  PointLight,
  ACESFilmicToneMapping,
  Raycaster,
  Plane
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface XConfig {
  canvas?: HTMLCanvasElement;
  id?: string;
  rendererOptions?: Partial<WebGLRendererParameters>;
  size?: 'parent' | { width: number; height: number };
}

interface SizeData {
  width: number;
  height: number;
  wWidth: number;
  wHeight: number;
  ratio: number;
  pixelRatio: number;
}

class ThreeScene {
  #config: XConfig;
  #postprocessing: any;
  #resizeObserver?: ResizeObserver;
  #intersectionObserver?: IntersectionObserver;
  #resizeTimer?: number;
  #animationFrameId: number = 0;
  #clock: Clock = new Clock();
  #animationState = { elapsed: 0, delta: 0 };
  #isAnimating: boolean = false;
  #isVisible: boolean = false;

  canvas!: HTMLCanvasElement;
  camera!: PerspectiveCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov!: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene!: Scene;
  renderer!: WebGLRenderer;
  size: SizeData = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render: () => void = this.#render.bind(this);
  onBeforeRender: (state: { elapsed: number; delta: number }) => void = () => { };
  onAfterRender: (state: { elapsed: number; delta: number }) => void = () => { };
  onAfterResize: (size: SizeData) => void = () => { };
  isDisposed: boolean = false;

  constructor(config: XConfig) {
    this.#config = { ...config };
    this.#initCamera();
    this.#initScene();
    this.#initRenderer();
    this.resize();
    this.#initObservers();
  }

  #initCamera() {
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
  }

  #initScene() {
    this.scene = new Scene();
  }

  #initRenderer() {
    if (this.#config.canvas) {
      this.canvas = this.#config.canvas;
    } else if (this.#config.id) {
      const elem = document.getElementById(this.#config.id);
      if (elem instanceof HTMLCanvasElement) {
        this.canvas = elem;
      }
    }
    if (!this.canvas) return;

    this.canvas.style.display = 'block';
    const rendererOptions: WebGLRendererParameters = {
      canvas: this.canvas,
      powerPreference: 'high-performance',
      ...(this.#config.rendererOptions ?? {})
    };
    this.renderer = new WebGLRenderer(rendererOptions);
    this.renderer.outputColorSpace = SRGBColorSpace;
  }

  #initObservers() {
    if (!(this.#config.size instanceof Object)) {
      window.addEventListener('resize', this.#onResize);
      if (this.#config.size === 'parent' && this.canvas?.parentNode) {
        this.#resizeObserver = new ResizeObserver(this.#onResize);
        this.#resizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.#intersectionObserver = new IntersectionObserver(this.#onIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0
    });
    if (this.canvas) this.#intersectionObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this.#onVisibilityChange);
  }

  #onResize = () => {
    if (this.#resizeTimer) clearTimeout(this.#resizeTimer);
    this.#resizeTimer = window.setTimeout(() => this.resize(), 100);
  };

  resize() {
    let w: number, h: number;
    if (this.#config.size instanceof Object) {
      w = this.#config.size.width;
      h = this.#config.size.height;
    } else if (this.#config.size === 'parent' && this.canvas?.parentNode) {
      w = (this.canvas.parentNode as HTMLElement).offsetWidth;
      h = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }
    this.size.width = w;
    this.size.height = h;
    this.size.ratio = w / h;
    this.#updateCamera();
    this.#updateRenderer();
    this.onAfterResize(this.size);
  }

  #updateCamera() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.#adjustFov(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.#adjustFov(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  #adjustFov(aspect: number) {
    const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2));
    const newTan = tanFov / (this.camera.aspect / aspect);
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(newTan));
  }

  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fovRad = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    }
  }

  #updateRenderer() {
    this.renderer?.setSize(this.size.width, this.size.height);
    this.#postprocessing?.setSize(this.size.width, this.size.height);
    let pr = window.devicePixelRatio;
    if (this.maxPixelRatio && pr > this.maxPixelRatio) pr = this.maxPixelRatio;
    else if (this.minPixelRatio && pr < this.minPixelRatio) pr = this.minPixelRatio;
    this.renderer?.setPixelRatio(pr);
    this.size.pixelRatio = pr;
  }

  #onIntersection = (entries: IntersectionObserverEntry[]) => {
    this.#isAnimating = entries[0].isIntersecting;
    this.#isAnimating ? this.#startAnimation() : this.#stopAnimation();
  };

  #onVisibilityChange = () => {
    if (this.#isAnimating) {
      document.hidden ? this.#stopAnimation() : this.#startAnimation();
    }
  };

  #startAnimation() {
    if (this.#isVisible) return;
    const animateFrame = () => {
      this.#animationFrameId = requestAnimationFrame(animateFrame);
      this.#animationState.delta = this.#clock.getDelta();
      this.#animationState.elapsed += this.#animationState.delta;
      this.onBeforeRender(this.#animationState);
      this.render();
      this.onAfterRender(this.#animationState);
    };
    this.#isVisible = true;
    this.#clock.start();
    animateFrame();
  }

  #stopAnimation() {
    if (this.#isVisible) {
      cancelAnimationFrame(this.#animationFrameId);
      this.#isVisible = false;
      this.#clock.stop();
    }
  }

  #render() {
    this.renderer?.render(this.scene, this.camera);
  }

  clear() {
    this.scene.traverse(obj => {
      const mesh = obj as any;
      if (mesh.isMesh && typeof mesh.material === 'object' && mesh.material !== null) {
        Object.keys(mesh.material).forEach(key => {
          const matProp = mesh.material[key];
          if (matProp && typeof matProp === 'object' && typeof matProp.dispose === 'function') {
            matProp.dispose();
          }
        });
        mesh.material.dispose();
        mesh.geometry.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    window.removeEventListener('resize', this.#onResize);
    this.#resizeObserver?.disconnect();
    this.#intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.#onVisibilityChange);
    this.#stopAnimation();
    this.clear();
    this.#postprocessing?.dispose();
    this.renderer?.dispose();
    this.isDisposed = true;
  }
}

interface PhysicsConfig {
  count: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  maxSize: number;
  minSize: number;
  size0: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  maxVelocity: number;
  controlSphere0?: boolean;
}

class Physics {
  config: PhysicsConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center: Vector3 = new Vector3();

  constructor(config: PhysicsConfig) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.#initializePositions();
    this.setSizes();
  }

  #initializePositions() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 0; i < config.count; i++) {
      const idx = 3 * i;
      // INITIAL: Spawn all balls high up (clustered) so they "come down" together
      positionData[idx] = MathUtils.randFloatSpread(5);     // Spread X
      positionData[idx + 1] = config.maxY + Math.random() * 5; // Start ABOVE the view
      positionData[idx + 2] = MathUtils.randFloatSpread(5); // Spread Z
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = MathUtils.randFloat(config.minSize, config.maxSize);
    }
  }

  update(deltaInfo: { delta: number }) {
    const { config, center, positionData, sizeData, velocityData } = this;

    // RANDOM IMPULSE LOOP: Randomly kick balls to keep them moving
    // Increased to 15% chance to ensure "constant balls move"
    if (Math.random() < 0.15) {
      const randomIdx = Math.floor(Math.random() * config.count);
      const base = 3 * randomIdx;
      velocityData[base] += (Math.random() - 0.5) * 0.02;     // X push
      velocityData[base + 1] += (Math.random()) * 0.03;       // Y push (fly up)
      velocityData[base + 2] += (Math.random() - 0.5) * 0.02; // Z push
    }

    // REPULSION: If cursor is active (controlSphere0 is true logic reuse), push ALL balls away
    if (config.controlSphere0) {
      // "center" is the cursor intersection point from the Raycaster in the React component
      for (let i = 0; i < config.count; i++) {
        const base = 3 * i;
        const pos = new Vector3().fromArray(positionData, base);
        const dist = pos.distanceTo(center);

        // Interaction Radius
        if (dist < 4) {
          const dir = new Vector3().subVectors(pos, center).normalize();
          const force = (4 - dist) * 0.02; // Strength
          velocityData[base] += dir.x * force;
          velocityData[base + 1] += dir.y * force;
          velocityData[base + 2] += dir.z * force;
        }
      }
    }

    for (let idx = 0; idx < config.count; idx++) {
      const base = 3 * idx;
      const pos = new Vector3().fromArray(positionData, base);
      const vel = new Vector3().fromArray(velocityData, base);

      vel.y -= deltaInfo.delta * config.gravity * sizeData[idx];
      vel.multiplyScalar(config.friction);

      // Removed clamp to allow faster bursts
      // vel.clampLength(0, config.maxVelocity);

      pos.add(vel);
      pos.toArray(positionData, base);
      vel.toArray(velocityData, base);
    }

    for (let idx = 0; idx < config.count; idx++) {
      const base = 3 * idx;
      const pos = new Vector3().fromArray(positionData, base);
      const vel = new Vector3().fromArray(velocityData, base);
      const radius = sizeData[idx];

      for (let jdx = idx + 1; jdx < config.count; jdx++) {
        const otherBase = 3 * jdx;
        const otherPos = new Vector3().fromArray(positionData, otherBase);
        const otherVel = new Vector3().fromArray(velocityData, otherBase);
        const diff = new Vector3().copy(otherPos).sub(pos);
        const dist = diff.length();
        const sumRadius = radius + sizeData[jdx];

        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          const correction = diff.normalize().multiplyScalar(0.5 * overlap);

          // More elastic collision
          const velCorrection = correction.clone().multiplyScalar(0.1);

          pos.sub(correction);
          vel.sub(velCorrection);

          pos.toArray(positionData, base);
          vel.toArray(velocityData, base);

          otherPos.add(correction);
          otherVel.add(velCorrection); // Transfer energy

          otherPos.toArray(positionData, otherBase);
          otherVel.toArray(velocityData, otherBase);
        }
      }

      // Wall Collisions
      if (Math.abs(pos.x) + radius > config.maxX) {
        pos.x = Math.sign(pos.x) * (config.maxX - radius);
        vel.x = -vel.x * config.wallBounce;
      }

      if (config.gravity === 0) {
        if (Math.abs(pos.y) + radius > config.maxY) {
          pos.y = Math.sign(pos.y) * (config.maxY - radius);
          vel.y = -vel.y * config.wallBounce;
        }
      } else if (pos.y - radius < -config.maxY) {
        // "Infinite Flow" Logic:
        // Instead of just bouncing at the bottom and settling (disappearing),
        // we have a 40% chance to RESPAWN the ball at the very top.
        // This keeps the scene constantly filled with falling activity.
        if (Math.random() < 0.4) {
          pos.y = config.maxY + Math.random() * 5; // Reset to top
          pos.x = MathUtils.randFloatSpread(config.maxX * 2); // Random X
          pos.z = MathUtils.randFloatSpread(config.maxZ * 2); // Random Z
          vel.set(0, -0.05, 0); // Slight downward velocity
        } else {
          // Standard bounce for the other 60%
          pos.y = -config.maxY + radius;
          vel.y = -vel.y * config.wallBounce * 1.2; // Extra bounce from floor
        }
      }

      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(pos.z) + radius > maxBoundary) {
        pos.z = Math.sign(pos.z) * (config.maxZ - radius);
        vel.z = -vel.z * config.wallBounce;
      }

      pos.toArray(positionData, base);
      vel.toArray(velocityData, base);
    }
  }
}

// SubsurfaceMaterial removed to fix shader errors. Using standard MeshPhysicalMaterial.

const defaultConfig = {
  count: 200,
  colors: [0xD4A853, 0x8B7355, 0x2A2520],
  ambientColor: 0xffffff,
  ambientIntensity: 0.5,
  lightIntensity: 150,
  materialParams: {
    metalness: 0.4,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  },
  minSize: 0.3,
  maxSize: 0.8,
  size0: 0.8,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true
};

const tempObject = new Object3D();

class Spheres extends InstancedMesh {
  config: typeof defaultConfig;
  physics: Physics;
  ambientLight: AmbientLight;
  light: PointLight;

  constructor(renderer: WebGLRenderer, params: Partial<typeof defaultConfig> = {}) {
    const config = { ...defaultConfig, ...params };
    const roomEnv = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(roomEnv).texture;
    const geometry = new SphereGeometry(1, 32, 32);
    const material = new MeshPhysicalMaterial({
      roughness: config.materialParams.roughness,
      metalness: config.materialParams.metalness,
      clearcoat: config.materialParams.clearcoat,
      clearcoatRoughness: config.materialParams.clearcoatRoughness,
      envMap: envTexture,
      ior: 1.5,
      transmission: 0, // Disable transmission to avoid complexity if not needed, or tune carefully
      thickness: 0
    });
    // @ts-ignore
    if (material.envMapRotation) material.envMapRotation.x = -Math.PI / 2;
    super(geometry, material, config.count);

    this.config = config;
    this.physics = new Physics(config);

    this.ambientLight = new AmbientLight(config.ambientColor, config.ambientIntensity);
    (this as any).add(this.ambientLight);
    this.light = new PointLight(config.colors[0], config.lightIntensity);
    (this as any).add(this.light);

    this.setColors(config.colors);
  }

  setColors(colors: number[]) {
    if (Array.isArray(colors) && colors.length > 1) {
      const colorObjects = colors.map(c => new Color(c));
      const count = (this as any).count;
      for (let idx = 0; idx < count; idx++) {
        const ratio = idx / count;
        const scaled = ratio * (colors.length - 1);
        const i = Math.floor(scaled);
        const start = colorObjects[i];
        if (i >= colors.length - 1) {
          (this as any).setColorAt(idx, start);
        } else {
          const alpha = scaled - i;
          const end = colorObjects[i + 1];
          const out = new Color();
          out.r = start.r + alpha * (end.r - start.r);
          out.g = start.g + alpha * (end.g - start.g);
          out.b = start.b + alpha * (end.b - start.b);
          (this as any).setColorAt(idx, out);
        }
        if (idx === 0) this.light.color.copy(colorObjects[0]);
      }
      const instanceColor = (this as any).instanceColor;
      if (instanceColor) instanceColor.needsUpdate = true;
    }
  }

  update(deltaInfo: { delta: number }) {
    this.physics.update(deltaInfo);
    const count = (this as any).count;
    for (let idx = 0; idx < count; idx++) {
      tempObject.position.fromArray(this.physics.positionData, 3 * idx);
      tempObject.scale.setScalar(this.physics.sizeData[idx]);
      tempObject.updateMatrix();
      (this as any).setMatrixAt(idx, tempObject.matrix);
      if (idx === 0) this.light.position.copy(tempObject.position);
    }
    (this as any).instanceMatrix.needsUpdate = true;
  }
}

const pointerPosition = new Vector2();
let globalPointerActive = false;

interface PointerData {
  position: Vector2;
  nPosition: Vector2;
  hover: boolean;
  touching: boolean;
  onMove: () => void;
  onLeave: () => void;
  dispose?: () => void;
}

const pointerMap = new Map<HTMLElement, PointerData>();

function createPointerData(options: { domElement: HTMLElement; onMove: () => void; onLeave: () => void }): PointerData {
  const data: PointerData = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onMove: options.onMove,
    onLeave: options.onLeave
  };

  if (!pointerMap.has(options.domElement)) {
    pointerMap.set(options.domElement, data);
    if (!globalPointerActive) {
      document.body.addEventListener('pointermove', onPointerMove);
      document.body.addEventListener('pointerleave', onPointerLeave);
      document.body.addEventListener('touchstart', onTouchStart, { passive: false });
      document.body.addEventListener('touchmove', onTouchMove, { passive: false });
      document.body.addEventListener('touchend', onTouchEnd);
      globalPointerActive = true;
    }
  }

  data.dispose = () => {
    pointerMap.delete(options.domElement);
    if (pointerMap.size === 0) {
      document.body.removeEventListener('pointermove', onPointerMove);
      document.body.removeEventListener('pointerleave', onPointerLeave);
      document.body.removeEventListener('touchstart', onTouchStart);
      document.body.removeEventListener('touchmove', onTouchMove);
      document.body.removeEventListener('touchend', onTouchEnd);
      globalPointerActive = false;
    }
  };

  return data;
}

function onPointerMove(e: PointerEvent) {
  pointerPosition.set(e.clientX, e.clientY);
  processPointerInteraction();
}

function processPointerInteraction() {
  for (const [elem, data] of pointerMap) {
    const rect = elem.getBoundingClientRect();
    if (isInside(rect)) {
      updatePointerData(data, rect);
      if (!data.hover) data.hover = true;
      data.onMove();
    } else if (data.hover && !data.touching) {
      data.hover = false;
      data.onLeave();
    }
  }
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);
    for (const [elem, data] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      if (isInside(rect)) {
        data.touching = true;
        updatePointerData(data, rect);
        if (!data.hover) data.hover = true;
        data.onMove();
      }
    }
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    pointerPosition.set(e.touches[0].clientX, e.touches[0].clientY);
    for (const [elem, data] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      updatePointerData(data, rect);
      if (isInside(rect) || (data.hover && data.touching)) {
        if (!data.hover) {
          data.hover = true;
          data.touching = true;
        }
        data.onMove();
      }
    }
  }
}

function onTouchEnd() {
  for (const data of pointerMap.values()) {
    if (data.touching) {
      data.touching = false;
      if (data.hover) {
        data.hover = false;
        data.onLeave();
      }
    }
  }
}

function onPointerLeave() {
  for (const data of pointerMap.values()) {
    if (data.hover) {
      data.hover = false;
      data.onLeave();
    }
  }
}

function updatePointerData(data: PointerData, rect: DOMRect) {
  data.position.set(pointerPosition.x - rect.left, pointerPosition.y - rect.top);
  data.nPosition.set((data.position.x / rect.width) * 2 - 1, (-data.position.y / rect.height) * 2 + 1);
}

function isInside(rect: DOMRect) {
  return (
    pointerPosition.x >= rect.left &&
    pointerPosition.x <= rect.left + rect.width &&
    pointerPosition.y >= rect.top &&
    pointerPosition.y <= rect.top + rect.height
  );
}

interface BallpitProps {
  className?: string;
  followCursor?: boolean;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  colors?: number[];
}

const Ballpit = ({
  className = '',
  followCursor = true,
  count = 30,
  gravity = 0.01,
  friction = 0.9975,
  wallBounce = 0.95,
  colors = [0xD4A853, 0x8B7355, 0x2A2520]
}: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const threeInstance = new ThreeScene({
      canvas,
      size: 'parent',
      rendererOptions: { antialias: true, alpha: true }
    });

    threeInstance.renderer.toneMapping = ACESFilmicToneMapping;
    threeInstance.camera.position.set(0, 0, 20);
    threeInstance.camera.lookAt(0, 0, 0);
    threeInstance.cameraMaxAspect = 1.5;
    threeInstance.resize();

    const spheres = new Spheres(threeInstance.renderer, {
      followCursor,
      count,
      gravity,
      friction,
      wallBounce,
      colors
    });
    threeInstance.scene.add(spheres);

    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const intersectionPoint = new Vector3();

    const pointerData = createPointerData({
      domElement: canvas,
      onMove() {
        raycaster.setFromCamera(pointerData.nPosition, threeInstance.camera);
        threeInstance.camera.getWorldDirection(plane.normal);
        raycaster.ray.intersectPlane(plane, intersectionPoint);
        spheres.physics.center.copy(intersectionPoint);
        spheres.config.controlSphere0 = true;
      },
      onLeave() {
        spheres.config.controlSphere0 = false;
      }
    });

    threeInstance.onBeforeRender = deltaInfo => {
      spheres.update(deltaInfo);
    };

    threeInstance.onAfterResize = size => {
      spheres.config.maxX = size.wWidth / 2;
      spheres.config.maxY = size.wHeight / 2;
    };

    instanceRef.current = {
      dispose() {
        pointerData.dispose?.();
        threeInstance.dispose();
      }
    };

    return () => {
      instanceRef.current?.dispose();
    };
  }, [followCursor, count, gravity, friction, wallBounce, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default Ballpit;
