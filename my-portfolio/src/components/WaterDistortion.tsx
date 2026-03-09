import { useRef, useMemo, useEffect, type JSX } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import * as THREE from 'three'

/* ── SHADERS ── */

const distortVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const distortFrag = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // --- Water distortion waves ---
    float wave1 = sin(uv.x * 7.0  + uTime * 0.9)  * 0.008;
    float wave2 = sin(uv.y * 9.0  + uTime * 0.7)  * 0.007;
    float wave3 = sin((uv.x + uv.y) * 6.0 + uTime * 1.1) * 0.006;
    float wave4 = cos(uv.x * 11.0 - uTime * 0.6)  * 0.005;
    float wave5 = cos(uv.y * 8.0  + uTime * 1.0)  * 0.005;

    // --- Mouse ripple ---
    vec2 mouseUV = uMouse / uResolution;
    mouseUV.y = 1.0 - mouseUV.y;
    float dist = distance(uv, mouseUV);
    float ripple = sin(dist * 35.0 - uTime * 5.0)
                   * 0.014
                   * smoothstep(0.4, 0.0, dist);

    vec2 offset = vec2(
      wave1 + wave3 + wave4 + ripple,
      wave2 + wave3 + wave5 + ripple
    );

    // --- Sample distorted scene texture ---
    vec4 sceneColor = texture2D(uTexture, uv + offset);

    // --- Subtle specular sheen on top ---
    vec2 duv = uv + offset;
    float spec1 = smoothstep(0.975, 1.0,
      sin(duv.x * 22.0 + uTime * 1.3) * cos(duv.y * 16.0 + uTime * 0.9));
    float spec2 = smoothstep(0.970, 1.0,
      sin(duv.x * 15.0 - uTime * 1.0) * cos(duv.y * 19.0 + uTime * 1.2));

    float sheen = spec1 * 0.25 + spec2 * 0.18;

    gl_FragColor = vec4(sceneColor.rgb + sheen, sceneColor.a);
  }
`

/* ── INNER COMPONENT (inside Canvas) ── */

function WaterScene({ children }: { children: React.ReactNode }): JSX.Element {
  const { size, scene, camera } = useThree()
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const smoothMouse = useRef(new THREE.Vector2(0, 0))

  // FBO — renders the text scene into a texture
  const fbo = useFBO(size.width, size.height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
  })

  // Offscreen scene that holds the text HTML layer

  const uniforms = useMemo(
    () => ({
      uTexture:    { value: fbo.texture },
      uTime:       { value: 0 },
      uMouse:      { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [] // eslint-disable-line
  )

  useEffect(() => {
    const onMove = (e: MouseEvent) => mouseRef.current.set(e.clientX, e.clientY)
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    // Render main scene (with text) into FBO
    state.gl.setRenderTarget(fbo)
    state.gl.render(scene, camera)
    state.gl.setRenderTarget(null)

    // Smooth mouse
    smoothMouse.current.lerp(mouseRef.current, 0.07)

    uniforms.uTime.value       = state.clock.elapsedTime
    uniforms.uMouse.value.copy(smoothMouse.current)
    uniforms.uResolution.value.set(size.width, size.height)
  })

  return (
    <>
      {/* Render children (text) into the scene normally — FBO captures it */}
      {children}

      {/* Full-screen quad that shows the distorted FBO texture */}
      <mesh renderOrder={999}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          vertexShader={distortVert}
          fragmentShader={distortFrag}
          uniforms={uniforms}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export default function WaterDistortion(): JSX.Element {
  return (
    <Canvas
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [0, 0, 1], fov: 90 }}
      gl={{ alpha: true, antialias: true }}
      flat
    >
      <WaterScene children={undefined}>
        {/* Empty — text comes from HTML below, FBO captures the whole section */}
      </WaterScene>
    </Canvas>
  )
}
