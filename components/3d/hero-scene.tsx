"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Float, Environment, Stars, Html } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { MathUtils } from "three"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

function AnimatedSphere() {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (!ref.current) return

    ref.current.rotation.x = MathUtils.lerp(
      ref.current.rotation.x,
      hovered ? state.clock.getElapsedTime() * 0.5 : 0,
      0.1,
    )
    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      hovered ? state.clock.getElapsedTime() * 0.5 : state.clock.getElapsedTime() * 0.2,
      0.1,
    )

    ref.current.scale.x = MathUtils.lerp(ref.current.scale.x, clicked ? 1.2 : hovered ? 1.1 : 1, 0.1)
    ref.current.scale.y = MathUtils.lerp(ref.current.scale.y, clicked ? 1.2 : hovered ? 1.1 : 1, 0.1)
    ref.current.scale.z = MathUtils.lerp(ref.current.scale.z, clicked ? 1.2 : hovered ? 1.1 : 1, 0.1)
  })

  return (
    <motion.mesh
      ref={ref}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      animate={{
        y: [0, 0.5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
    >
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#1d4ed8"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </motion.mesh>
  )
}

function FloatingText() {
  const positions = [
    [-5, 3, -3],
    [5, 2, -2],
    [-4, -2, -4],
    [4, -3, -3],
    [0, 4, -2],
  ]

  const skills = ["Product Owner", "React", "Node.js", "API Design", "Unity3D"]

  return (
    <>
      {skills.map((skill, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={2} position={positions[i]}>
          <Text
            font="/fonts/Geist_Bold.json"
            fontSize={0.5}
            color="#60a5fa"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            textAlign="center"
          >
            {skill}
          </Text>
        </Float>
      ))}
    </>
  )
}

function ParticleField() {
  const count = 500
  const points = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!points.current) return

    points.current.rotation.y = state.clock.getElapsedTime() * 0.05
    points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.025) * 0.1
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 20))}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={new Float32Array(Array.from({ length: count * 3 }, () => Math.random()))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} />
    </points>
  )
}

function HeroContent() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 8)
  }, [camera])

  return (
    <>
      <Html position={[-5, 0, 0]} transform distanceFactor={10} zIndexRange={[100, 0]}>
        <div className="w-[400px] text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4"
          >
            Hi, I'm <span className="text-primary">Ashman Malik</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl font-medium text-foreground/80 mb-4"
          >
            Product Owner & Developer Experience Specialist
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-foreground/70 mb-6"
          >
            With 5+ years of experience in product development and technical roles, I specialize in enhancing developer
            experiences and building innovative solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Me
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="https://github.com/Cuscal-Ashman" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="https://www.linkedin.com/in/ashman-malik" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </motion.div>
        </div>
      </Html>

      <AnimatedSphere />
      <FloatingText />
      <ParticleField />
      <Stars radius={50} depth={50} count={1000} factor={4} fade speed={1} />

      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="w-full h-[calc(100vh-80px)] relative">
      <Canvas>
        <HeroContent />
      </Canvas>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-8 h-14 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
        <p className="mt-2 text-foreground/70">Scroll to explore</p>
      </div>
    </div>
  )
}

