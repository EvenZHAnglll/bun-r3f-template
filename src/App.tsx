// example from https://r3f.docs.pmnd.rs/getting-started/examples 
// code from https://codesandbox.io/s/pj7zjq

import { useState } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'
import { PresetsType } from '@react-three/drei/helpers/environment-assets'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
      <Env />
      <OrbitControls
        autoRotate
        autoRotateSpeed={4}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI / 2.1}
      />
      <group position={[0, -0.65, 0]}>
        <Sphere />
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.7}>
          <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
        </AccumulativeShadows>
      </group>
    </Canvas>
  )
}

function Sphere() {
  const { roughness } = useControls({ roughness: { value: 0.5, min: 0, max: 1 } })
  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial metalness={1} roughness={roughness} />
      </mesh>
    </Center>
  )
}

function Env() {
  const [preset, setPreset] = useState<PresetsType>('sunset')
  const { blur } = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      onChange: (value) => setPreset(value)
    }
  })
  return <Environment preset={preset} background backgroundBlurriness={blur} />
}
