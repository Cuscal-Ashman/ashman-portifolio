"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, OrbitControls } from "@react-three/drei"
import { motion } from "framer-motion-3d"

const skills = [
  // Frontend
  { name: "React", category: "frontend", level: 0.9 },
  { name: "JavaScript", category: "frontend", level: 0.9 },
  { name: "HTML/CSS", category: "frontend", level: 0.85 },
  { name: "Tailwind", category: "frontend", level: 0.8 },
  { name: "React Native", category: "frontend", level: 0.7 },

  // Backend
  { name: "Node.js", category: "backend", level: 0.85 },
  { name: "Express", category: "backend", level: 0.8 },
  { name: "MySQL", category: "backend", level: 0.75 },
  { name: "NoSQL", category: "backend", level: 0.7 },
  { name: "RESTful APIs", category: "backend", level: 0.9 },
  { name: "OpenAPI", category: "backend", level: 0.85 },

  // Product
  { name: "Product Roadmaps", category: "product", level: 0.9 },
  { name: "User Stories", category: "product", level: 0.85 },
  { name: "Feature Prioritization", category: "product", level: 0.9 },
  { name: "Stakeholder Management", category: "product", level: 0.8 },

  // Agile
  { name: "Scrum", category: "agile", level: 0.9 },
  { name: "Kanban", category: "agile", level: 0.85 },
  { name: "Sprint Planning", category: "agile", level: 0.9 },

  // DevEx
  { name: "API Design", category: "devex", level: 0.9 },
  { name: "Documentation", category: "devex", level: 0.85 },
  { name: "Developer Tools", category: "devex", level: 0.8 },

  // Technical
  { name: "CI/CD", category: "technical", level: 0.8 },
  { name: "Git", category: "technical", level: 0.9 },
  { name: "JIRA", category: "technical", level: 0.85 },
  { name: "Unity3D", category: "technical", level: 0.7 },
  { name: "AR/VR", category: "technical", level: 0.65 },
]

const categoryColors = {
  frontend: "#3b82f6", // blue
  backend: "#10b981", // green
  product: "#8b5cf6", // purple
  agile: "#f59e0b", // amber
  devex: "#ec4899", // pink
  technical: "#6366f1", // indigo
}

function SkillNode({ skill, index, totalSkills, filter }) {
  const phi = Math.acos(-1 + (2 * index) / totalSkills)
  const theta = Math.sqrt(totalSkills * Math.PI) * phi

  const x = 5 * Math.cos(theta) * Math.sin(phi)
  const y = 5 * Math.sin(theta) * Math.sin(phi)
  const z = 5 * Math.cos(phi)

  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const isVisible = filter === "all" || filter === skill.category
  const scale = isVisible ? (hovered ? 1.4 : 1) : 0.001
  const opacity = isVisible ? 1 : 0

  useFrame((state) => {
    if (!ref.current) return

    // Add subtle movement
    ref.current.position.x = x + Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.3
    ref.current.position.y = y + Math.cos(state.clock.getElapsedTime() * 0.5 + index) * 0.3
    ref.current.position.z = z + Math.sin(state.clock.getElapsedTime() * 0.3 + index) * 0.3

    // Always face the camera
    ref.current.lookAt(state.camera * 0.3 + index) * 0.3

    // Always face the camera
    ref.current.lookAt(state.camera.position)
  })

  return (
    <motion.group
      ref={ref}
      position={[x, y, z]}
      animate={{ scale: [0, scale], opacity: [0, opacity] }}
      transition={{ duration: 1, delay: index * 0.02 }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
        <Text
          font="/fonts/Geist_Regular.json"
          fontSize={0.3}
          color={categoryColors[skill.category]}
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
      </Float>
      <mesh scale={skill.level * 0.2}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={categoryColors[skill.category]}
          emissive={categoryColors[skill.category]}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </motion.group>
  )
}

function SkillsGlobe3D({ filter }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        {skills.map((skill, index) => (
          <SkillNode key={skill.name} skill={skill} index={index} totalSkills={skills.length} filter={filter} />
        ))}
      </group>
      <OrbitControls enableZoom={false} />
    </>
  )
}

export default function SkillsGlobe() {
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "product", name: "Product" },
    { id: "agile", name: "Agile" },
    { id: "devex", name: "DevEx" },
    { id: "technical", name: "Technical" },
  ]

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              filter === category.id ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-primary/20"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="w-full h-[500px] bg-gradient-to-b from-background to-background/50 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <SkillsGlobe3D filter={filter} />
        </Canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-bold mb-4 text-blue-500">Languages</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>English</span>
                <span>Native</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "100%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Urdu</span>
                <span>Native</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "100%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>German</span>
                <span>Limited Working</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: "40%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-bold mb-4 text-purple-500">Certifications</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>AWS Getting Started with Storage</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Agile Product Owner Role: Techniques</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Introduction to SQL</span>
            </li>
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>AWS Introduction to Generative AI</span>
            </li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-xl font-bold mb-4 text-green-500">Education</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Master's Degree, Information Technology</h4>
              <p className="text-foreground/70">Griffith University (2016 - 2018)</p>
            </div>
            <div>
              <h4 className="font-medium">Bachelor's Degree, Computer Science</h4>
              <p className="text-foreground/70">COMSATS Institute of Information Technology (2012 - 2016)</p>
            </div>
            <div>
              <h4 className="font-medium">Professional Year IT</h4>
              <p className="text-foreground/70">Australian Computer Society (2019 - 2020)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

