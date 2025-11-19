import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cloud,
  Layers,
  Server,
  HardDrive,
  Network,
  MonitorDot,
  FileText,
} from 'lucide-react'
import InteractiveImage from '../components/InteractiveImage'
import GameModal from '../components/GameModal'
import RequirementsTableModal from '../components/RequirementsTableModal'
import UserProfileModal from '../components/UserProfileModal'
import {
  projectObjective,
  logicalArchitecture,
} from '../data/infrastructureData'
import { architectureHotspots } from '../data/imageHotspots'

// Mapping between component names and hotspot IDs
const componentToHotspotMap: Record<string, string> = {
  'Prometheus + Grafana': 'prometheus-grafana',
  Ansible: 'ansible',
  'OpenStack Horizon': 'horizon',
  'OpenStack Heat': 'heat',
  Kubernetes: 'kubernetes',
  Docker: 'docker',
  Nova: 'nova',
  Neutron: 'neutron',
  KVM: 'kvm',
  'Cinder/Swift': 'cinder-swift',
  'OpenStack Core': 'openstack-core',
  Hardware: 'hardware',
}

// Mapping of physical components to images and user names
const physicalComponentProfiles: Record<
  string,
  { image: string; userName: string }
> = {
  'Controller Node': { image: '/elyes.jpg', userName: 'Elyes Msehli' },
  'Block Storage': { image: '/farah.jpg', userName: 'Farah Chabene' },
  'Object Storage': { image: '/thinkpad.jpg', userName: 'Aziz Mejri' },
  'Compute Node 1': { image: '/dorra.jpg', userName: 'Dorra Beday' },
  'Compute Node 2': { image: '/msi.jpg', userName: 'Zeineb Kharrat' },
  'Compute Node 3': { image: '/dell g15.jpg', userName: 'Salim Lafi' },
  'Compute Node 4': { image: '/dell g15.jpg', userName: 'Bahaeddine Jbeli' },
}

export default function SinglePage() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isGameModalOpen, setIsGameModalOpen] = useState(false)
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false)
  const [selectedPhysicalComponent, setSelectedPhysicalComponent] = useState<string | null>(null)
  const [showDocImage, setShowDocImage] = useState(false)
  const [hotspotEditMode, setHotspotEditMode] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [docHotspot, setDocHotspot] = useState({ top: 66.5784, left: 54.9688, width: 8.01736, height: 13.5048 })
  const dragState = useRef<{ action: 'move' | 'resize' | null; startX: number; startY: number; origin: { top: number; left: number; width: number; height: number } }>(
    { action: null, startX: 0, startY: 0, origin: { top: 66.5784, left: 54.9688, width: 8.01736, height: 13.5048 } }
  )

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  // Load/save hotspot from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('doc-hotspot')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed.top === 'number') setDocHotspot(parsed)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('doc-hotspot', JSON.stringify(docHotspot))
    } catch {}
  }, [docHotspot])

  const handleComponentClick = (componentTitle: string) => {
    const hotspotId = componentToHotspotMap[componentTitle]
    if (hotspotId) {
      // For logical components, keep the original behavior
      if (selectedComponent === hotspotId) {
        setSelectedComponent(null)
      } else {
        setSelectedComponent(hotspotId)
        // Scroll to the image with animation
        setTimeout(() => {
          const imageElement = document.getElementById('architecture-image')
          if (imageElement) {
            imageElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
    } else if (physicalComponentProfiles[componentTitle]) {
      // For physical components, open the profile modal
      if (selectedPhysicalComponent === componentTitle) {
        // If the modal is already open for this component, close it
        setSelectedPhysicalComponent(null)
        setSelectedComponent(null)
      } else {
        // Open the modal and visually select
        setSelectedPhysicalComponent(componentTitle)
        setSelectedComponent(componentTitle)
      }
    } else {
      // Other components
      if (selectedComponent === componentTitle) {
        setSelectedComponent(null)
      } else {
        setSelectedComponent(componentTitle)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <header className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl">
            <MonitorDot className="h-14 w-14" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            POSTER – Cloud Infrastructure Platform
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Phase 1
          </p>
        </header>

        {/* 1. Project Objective */}
        <section className="mb-16 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-xl bg-blue-600 p-3 text-white shadow-lg">
                <Cloud className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">1. Project Objective</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRequirementsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <FileText className="h-5 w-5" />
              View Requirements Table
            </motion.button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                {projectObjective.primary.title}
              </h3>
              <p className="text-gray-700">{projectObjective.primary.description}</p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                {projectObjective.problem.title}
              </h3>
              <p className="text-gray-700">{projectObjective.problem.description}</p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                {projectObjective.outcomes.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {projectObjective.outcomes.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* 2. Logical Architecture */}
        <section className="mb-16 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="rounded-xl bg-indigo-600 p-3 text-white shadow-lg">
              <Layers className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">2. Logical Architecture</h2>
          </div>

          {/* Architecture Image */}
          <div id="architecture-image" className="mb-12">
            <h3 className="mb-4 text-2xl font-semibold text-gray-800 text-center">
              Interactive Visual Architecture
            </h3>
            <p className="mb-6 text-center text-gray-600 text-sm">
              Click on the components below or directly on the image for more details
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InteractiveImage
                imageSrc="/arc.jpg"
                hotspots={architectureHotspots}
                selectedComponent={selectedComponent}
                onComponentSelect={setSelectedComponent}
              />
            </motion.div>
          </div>

          {/* Component Interactions */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-gray-800">Component Interactions</h3>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden shadow-lg relative"
              >
                {/* Toolbar for hotspot editing */}
                <div className="absolute left-2 top-2 z-10 flex gap-2 items-center bg-white/80 backdrop-blur px-2 py-1 rounded-md shadow">
                  <button
                    type="button"
                    onClick={() => setHotspotEditMode((v) => !v)}
                    className={`px-3 py-1 text-xs rounded-md ${hotspotEditMode ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border'}`}
                  >
                    {hotspotEditMode ? 'Terminer le placement' : 'Positionner le cadre'}
                  </button>
                  {hotspotEditMode && (
                    <>
                      <div className="flex items-center gap-1 text-[10px]">
                        <label>T</label>
                        <input
                          type="number"
                          step="0.1"
                          value={Number(docHotspot.top.toFixed(1))}
                          onChange={(e) => {
                            const v = Math.min(100, Math.max(0, Number(e.target.value)))
                            setDocHotspot((h) => ({ ...h, top: v }))
                          }}
                          className="w-14 px-1 py-0.5 border rounded"
                        />
                        <label>L</label>
                        <input
                          type="number"
                          step="0.1"
                          value={Number(docHotspot.left.toFixed(1))}
                          onChange={(e) => {
                            const v = Math.min(100, Math.max(0, Number(e.target.value)))
                            setDocHotspot((h) => ({ ...h, left: v }))
                          }}
                          className="w-14 px-1 py-0.5 border rounded"
                        />
                        <label>W</label>
                        <input
                          type="number"
                          step="0.1"
                          value={Number(docHotspot.width.toFixed(1))}
                          onChange={(e) => {
                            const v = Math.min(100, Math.max(1, Number(e.target.value)))
                            setDocHotspot((h) => ({ ...h, width: v }))
                          }}
                          className="w-14 px-1 py-0.5 border rounded"
                        />
                        <label>H</label>
                        <input
                          type="number"
                          step="0.1"
                          value={Number(docHotspot.height.toFixed(1))}
                          onChange={(e) => {
                            const v = Math.min(100, Math.max(1, Number(e.target.value)))
                            setDocHotspot((h) => ({ ...h, height: v }))
                          }}
                          className="w-14 px-1 py-0.5 border rounded"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setDocHotspot({ top: 66.5784, left: 54.9688, width: 8.01736, height: 13.5048 })}
                        className="px-3 py-1 text-xs rounded-md bg-white text-gray-700 border"
                      >
                        Réinitialiser
                      </button>
                    </>
                  )}
                </div>
                <img
                  src="/image.png"
                  alt="Component Interactions"
                  className="w-full h-auto max-w-full select-none"
                  onError={(e) => {
                    console.error('Failed to load image: /image.png')
                  }}
                  ref={containerRef as any}
                />

                {/* Hotspot: Cadre Professionnel (contour du PC noir: écran + pied) */}
                <button
                  type="button"
                  onClick={() => setShowDocImage(true)}
                  className={`absolute ${hotspotEditMode ? 'border-2 border-orange-500/90 bg-orange-100/10' : 'border-2 border-transparent hover:border-orange-500/90 bg-transparent hover:bg-white/10'} rounded-2xl transition shadow-md`}
                  style={{
                    top: `${docHotspot.top}%`,
                    left: `${docHotspot.left}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${docHotspot.width}%`,
                    height: `${docHotspot.height}%`,
                    cursor: hotspotEditMode ? 'move' : 'pointer',
                  }}
                  title="Cadre Professionnel"
                  aria-label="Cadre Professionnel"
                  onMouseDown={(e) => {
                    if (!hotspotEditMode) return
                    e.preventDefault()
                    dragState.current = {
                      action: 'move',
                      startX: e.clientX,
                      startY: e.clientY,
                      origin: { ...docHotspot },
                    }
                    const onMove = (ev: MouseEvent) => {
                      const container = containerRef.current?.getBoundingClientRect()
                      if (!container) return
                      const dx = ((ev.clientX - dragState.current.startX) / container.width) * 100
                      const dy = ((ev.clientY - dragState.current.startY) / container.height) * 100
                      setDocHotspot((h) => ({ ...h, left: dragState.current.origin.left + dx, top: dragState.current.origin.top + dy }))
                    }
                    const onUp = () => {
                      window.removeEventListener('mousemove', onMove)
                      window.removeEventListener('mouseup', onUp)
                      dragState.current.action = null
                    }
                    window.addEventListener('mousemove', onMove)
                    window.addEventListener('mouseup', onUp)
                  }}
                />

                {hotspotEditMode && (
                  <div
                    className="absolute w-3 h-3 bg-orange-500 rounded-sm cursor-nwse-resize"
                    style={{
                      top: `calc(${docHotspot.top}% + ${docHotspot.height / 2}% - 6px)`,
                      left: `calc(${docHotspot.left}% + ${docHotspot.width / 2}% - 6px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      dragState.current = {
                        action: 'resize',
                        startX: e.clientX,
                        startY: e.clientY,
                        origin: { ...docHotspot },
                      }
                      const onMove = (ev: MouseEvent) => {
                        const container = containerRef.current?.getBoundingClientRect()
                        if (!container) return
                        const dx = ((ev.clientX - dragState.current.startX) / container.width) * 100
                        const dy = ((ev.clientY - dragState.current.startY) / container.height) * 100
                        setDocHotspot((h) => ({
                          ...h,
                          width: Math.max(4, dragState.current.origin.width + dx),
                          height: Math.max(6, dragState.current.origin.height + dy),
                        }))
                      }
                      const onUp = () => {
                        window.removeEventListener('mousemove', onMove)
                        window.removeEventListener('mouseup', onUp)
                        dragState.current.action = null
                      }
                      window.addEventListener('mousemove', onMove)
                      window.addEventListener('mouseup', onUp)
                    }}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Physical Architecture */}
        <section className="mb-16 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="rounded-xl bg-green-600 p-3 text-white shadow-lg">
              <Server className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">3. Physical Architecture</h2>
          </div>

          {/* Physical Architecture Components */}
          <div className="mb-12">
            <h3 className="mb-6 text-center text-2xl font-semibold text-gray-800">
              Physical Infrastructure Components
            </h3>
            <div className="space-y-6">
              {/* Left Section: Controller, Block Storage, Object Storage */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Controller Node */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: selectedComponent === 'Controller Node' ? 'rgb(238, 242, 255)' : undefined,
                    }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-xl border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-blue-50 p-6 cursor-pointer hover:shadow-lg transition-all relative overflow-hidden ${
                      selectedComponent === 'Controller Node' ? 'ring-4 ring-indigo-500 ring-offset-2' : ''
                    }`}
                    onClick={() => handleComponentClick('Controller Node')}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedComponent === 'Controller Node' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <h4 className="mb-4 flex items-center text-xl font-bold text-blue-800 relative z-10">
                      <motion.div
                        animate={{
                          scale: selectedComponent === 'Controller Node' ? 1.2 : 1,
                          rotate: selectedComponent === 'Controller Node' ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Server className="mr-3 h-6 w-6" />
                      </motion.div>
                      Controller Node
                      {selectedComponent === 'Controller Node' && (
                        <motion.div
                          className="absolute top-0 right-0 bg-indigo-600 rounded-full p-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        </motion.div>
                      )}
                    </h4>
                    <p className="mb-4 text-sm text-gray-700 relative z-10">
                      The central management point for the entire cloud ecosystem, it hosts the core
                      services that control, manage, and orchestrate the infrastructure.
                    </p>
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">RAM</p>
                        <p className="text-sm font-bold text-gray-800">16GB</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">CPU</p>
                        <p className="text-sm font-bold text-gray-800">10</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">Storage</p>
                        <p className="text-sm font-bold text-gray-800">100+ GB</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Block Storage */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: selectedComponent === 'Block Storage' ? 'rgb(238, 242, 255)' : undefined,
                    }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-xl border-2 border-orange-300 bg-gradient-to-r from-orange-100 to-orange-50 p-6 cursor-pointer hover:shadow-lg transition-all relative overflow-hidden ${
                      selectedComponent === 'Block Storage' ? 'ring-4 ring-indigo-500 ring-offset-2' : ''
                    }`}
                    onClick={() => handleComponentClick('Block Storage')}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedComponent === 'Block Storage' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <h4 className="mb-4 flex items-center text-xl font-bold text-orange-800 relative z-10">
                      <motion.div
                        animate={{
                          scale: selectedComponent === 'Block Storage' ? 1.2 : 1,
                          rotate: selectedComponent === 'Block Storage' ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <HardDrive className="mr-3 h-6 w-6" />
                      </motion.div>
                      Block Storage
                      {selectedComponent === 'Block Storage' && (
                        <motion.div
                          className="absolute top-0 right-0 bg-indigo-600 rounded-full p-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        </motion.div>
                      )}
                    </h4>
                    <p className="mb-4 text-sm text-gray-700 relative z-10">
                      Responsible for providing persistent storage to VMs.
                    </p>
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">RAM</p>
                        <p className="text-sm font-bold text-gray-800">8GB</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">CPU</p>
                        <p className="text-sm font-bold text-gray-800">4</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">Storage</p>
                        <p className="text-sm font-bold text-gray-800">700+ GB</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Object Storage */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: selectedComponent === 'Object Storage' ? 'rgb(238, 242, 255)' : undefined,
                    }}
                    transition={{ delay: 0.3 }}
                    className={`rounded-xl border-2 border-purple-300 bg-gradient-to-r from-purple-100 to-purple-50 p-6 cursor-pointer hover:shadow-lg transition-all relative overflow-hidden ${
                      selectedComponent === 'Object Storage' ? 'ring-4 ring-indigo-500 ring-offset-2' : ''
                    }`}
                    onClick={() => handleComponentClick('Object Storage')}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedComponent === 'Object Storage' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <h4 className="mb-4 flex items-center text-xl font-bold text-purple-800 relative z-10">
                      <motion.div
                        animate={{
                          scale: selectedComponent === 'Object Storage' ? 1.2 : 1,
                          rotate: selectedComponent === 'Object Storage' ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <HardDrive className="mr-3 h-6 w-6" />
                      </motion.div>
                      Object Storage
                      {selectedComponent === 'Object Storage' && (
                        <motion.div
                          className="absolute top-0 right-0 bg-indigo-600 rounded-full p-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        </motion.div>
                      )}
                    </h4>
                    <p className="mb-4 text-sm text-gray-700 relative z-10">
                      Stores unstructured data (files, images, videos, backups, BLOBs...)
                    </p>
                    <div className="grid grid-cols-3 gap-2 relative z-10">
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">RAM</p>
                        <p className="text-sm font-bold text-gray-800">16GB</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">CPU</p>
                        <p className="text-sm font-bold text-gray-800">2</p>
                      </div>
                      <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                        <p className="text-xs font-semibold text-gray-600">Storage</p>
                        <p className="text-sm font-bold text-gray-800">1+ TB</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: Compute Nodes */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-100 to-green-50 p-4"
                  >
                    <h4 className="mb-2 text-lg font-bold text-green-800">Compute Nodes</h4>
                    <p className="text-sm text-gray-700">
                      Provides the actual computational power for running virtual machines.
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { cpu: 4, ram: 16, storage: 100 },
                      { cpu: 14, ram: 16, storage: 100 },
                      { cpu: 10, ram: 16, storage: 100 },
                      { cpu: 6, ram: 16, storage: 100 },
                    ].map((node, index) => {
                      const computeNodeId = `Compute Node ${index + 1}`
                      const isSelected = selectedComponent === computeNodeId
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            backgroundColor: isSelected ? 'rgb(238, 242, 255)' : undefined,
                          }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className={`rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-100 to-green-50 p-4 cursor-pointer hover:shadow-lg transition-all relative overflow-hidden ${
                            isSelected ? 'ring-4 ring-indigo-500 ring-offset-2' : ''
                          }`}
                          onClick={() => handleComponentClick(computeNodeId)}
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isSelected && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            />
                          )}
                          <h5 className="mb-3 flex items-center text-base font-bold text-green-800 relative z-10">
                            <motion.div
                              animate={{
                                scale: isSelected ? 1.2 : 1,
                                rotate: isSelected ? [0, -10, 10, -10, 0] : 0,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <Server className="mr-2 h-5 w-5" />
                            </motion.div>
                            Compute Node {index + 1}
                            {isSelected && (
                              <motion.div
                                className="absolute top-0 right-0 bg-indigo-600 rounded-full p-1"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <div className="h-2 w-2 bg-white rounded-full"></div>
                              </motion.div>
                            )}
                          </h5>
                          <div className="space-y-2 relative z-10">
                          <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                            <p className="text-xs font-semibold text-gray-600">CPU</p>
                            <p className="text-sm font-bold text-gray-800">{node.cpu}</p>
                          </div>
                          <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                            <p className="text-xs font-semibold text-gray-600">RAM</p>
                            <p className="text-sm font-bold text-gray-800">{node.ram}GB</p>
                          </div>
                          <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                            <p className="text-xs font-semibold text-gray-600">Storage</p>
                            <p className="text-sm font-bold text-gray-800">{node.storage}+ GB</p>
                          </div>
                        </div>
                      </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="rounded-2xl bg-gray-900 p-8 text-center text-white shadow-xl">
          <p className="mb-2 text-sm font-medium">
            🎯 Key Advantages: 100% Open-Source • Enterprise-Grade • Highly Scalable • Self-Healing
            • Cost-Effective
          </p>
          <p className="text-xs text-gray-400">
            Complete infrastructure automation from bare metal to containerized applications
          </p>
        </footer>
      </div>

      {/* Game Modal */}
      <GameModal isOpen={isGameModalOpen} onClose={() => setIsGameModalOpen(false)} />

      {/* Requirements Table Modal */}
      <RequirementsTableModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
      />

      {/* User Profile Modal for Physical Architecture */}
      {selectedPhysicalComponent && physicalComponentProfiles[selectedPhysicalComponent] && (
        <UserProfileModal
          isOpen={!!selectedPhysicalComponent}
          onClose={() => {
            setSelectedPhysicalComponent(null)
            setSelectedComponent(null)
          }}
          imageSrc={physicalComponentProfiles[selectedPhysicalComponent].image}
          userName={physicalComponentProfiles[selectedPhysicalComponent].userName}
        />
      )}

      {/* Popup image dok.png (Cadre Professionnel) */}
      <AnimatePresence>
        {showDocImage && (
          <div className="fixed inset-0 z-[120]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowDocImage(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 24, stiffness: 260 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-xl md:max-w-2xl overflow-hidden border border-gray-200 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-end px-5 py-3 border-b">
                  <button
                    type="button"
                    onClick={() => setShowDocImage(false)}
                    className="px-2 py-1 rounded-md hover:bg-gray-100"
                    aria-label="Fermer"
                  >
                    ✕
                  </button>
                </div>
                <div className="bg-gray-50 p-4">
                  <div className="rounded-xl overflow-hidden border bg-white">
                    <img
                      src="/dok.png"
                      alt="Dok"
                      className="mx-auto w-auto max-w-full max-h-[70vh] object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

