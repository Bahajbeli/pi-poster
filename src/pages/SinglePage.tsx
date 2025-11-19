import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Cloud,
  Layers,
  Server,
  HardDrive,
  MonitorDot,
  FileText,
} from 'lucide-react'
import InteractiveImage from '../components/InteractiveImage'
import GameModal from '../components/GameModal'
import RequirementsTableModal from '../components/RequirementsTableModal'
import UserProfileModal from '../components/UserProfileModal'
import ThankYouModal from '../components/ThankYouModal'
import {
  projectObjective,
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
  'Compute Node 1': { image: '/dorra.jpg', userName: 'Dorra Bday' },
  'Compute Node 2': { image: '/msi.jpg', userName: 'Zeineb Kharrat' },
  'Compute Node 3': { image: '/dell g15.jpg', userName: 'Salim Lafi' },
  'Compute Node 4': { image: '/dell g15.jpg', userName: 'Bahaeddine Jbeli' },
}

export default function SinglePage() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isGameModalOpen, setIsGameModalOpen] = useState(false)
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false)
  const [selectedPhysicalComponent, setSelectedPhysicalComponent] = useState<string | null>(null)
  const [isThankYouOpen, setIsThankYouOpen] = useState(false)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

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

        {/* Global Architecture */}
        <section className="mb-16 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="rounded-xl bg-sky-600 p-3 text-white shadow-lg">
              <MonitorDot className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Global Architecture</h2>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src="/arci.jpg"
                alt="Global Architecture"
                className="w-full h-auto max-w-full"
                onError={() => {
                  console.error('Failed to load image: /arci.jpg')
                }}
              />
            </motion.div>
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
          <button
            onClick={() => setIsThankYouOpen(true)}
            className="mt-6 mx-auto block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow hover:shadow-lg border border-white/20"
          >
            Thank you
          </button>
        </footer>
      </div>

      {/* Game Modal */}
      <GameModal isOpen={isGameModalOpen} onClose={() => setIsGameModalOpen(false)} />

      {/* Requirements Table Modal */}
      <RequirementsTableModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
      />

      {/* Thank You Modal */}
      <ThankYouModal isOpen={isThankYouOpen} onClose={() => setIsThankYouOpen(false)} />

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
    </div>
  )
}

