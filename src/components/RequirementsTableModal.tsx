import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, CheckCircle2, Settings, Lightbulb, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import RockPaperScissors3P from './RockPaperScissors3P'

interface RequirementsTableModalProps {
  isOpen: boolean
  onClose: () => void
}

interface RequirementData {
  id: string
  title: string
  description: string
  technicalConstraints: Array<{ id: string; description: string }>
  technologySelection?: string
  proposedSolutions: Array<{ id: number; name: string; description: string }>
}

const allRequirementsData: RequirementData[] = [
  {
    id: 'Req 1',
    title: 'Cloud Infrastructure Platform',
    description:
      'Provide on-demand virtualized computing resources (servers, storage, containers) with automatic scaling capabilities',
    technicalConstraints: [
      { id: 'TC1.1', description: 'Must be open-source solution' },
      { id: 'TC1.2', description: 'Must have modular/multi-tenant architecture' },
      { id: 'TC1.3', description: 'Must provide orchestration capabilities' },
      { id: 'TC1.4', description: 'Must support multiple hypervisors' },
      { id: 'TC1.5', description: 'Must support private and hybrid deployment' },
      { id: 'TC1.6', description: 'Must leverage commodity hardware' },
      { id: 'TC1.7', description: 'Must provide self-healing and data redundancy' },
      { id: 'TC1.8', description: 'Must scale horizontally and vertically' },
      { id: 'TC1.9', description: 'Must provide native Load Balancer' },
      { id: 'TC1.10', description: 'Must integrate floating IP assignment' },
      { id: 'TC1.11', description: 'Must have centralized dashboard management' },
      {
        id: 'TC1.12',
        description: 'Backup and archive large amounts of data with linear performance.',
      },
    ],
    technologySelection: 'Cloud Infrastructure Platform',
    proposedSolutions: [
      { id: 1, name: 'OpenStack', description: 'Proposed Solution 1.1' },
      { id: 2, name: 'Apache CloudStack', description: 'Proposed Solution 1.2' },
      { id: 3, name: 'OpenNebula', description: 'Proposed Solution 1.3' },
    ],
  },
  {
    id: 'Req 2',
    title: 'Virtualization Platform',
    description:
      'Deliver hypervisor technology to create and manage virtual machines for resource provisioning',
    technicalConstraints: [
      { id: 'TC2.1', description: 'Must be fully compatible with infrastructure solution' },
      { id: 'TC2.2', description: 'Must support wide variety of Linux-certified hardware' },
      { id: 'TC2.3', description: 'Must support live migration' },
      { id: 'TC2.4', description: 'Must scale with increasing guest machines' },
      { id: 'TC2.5', description: 'Must support demanding workloads' },
    ],
    technologySelection: 'Hypervisor Technology',
    proposedSolutions: [
      { id: 1, name: 'KVM (Kernel-based Virtual Machine)', description: 'Proposed Solution 2.1' },
      { id: 2, name: 'Xen', description: 'Proposed Solution 2.2' },
      { id: 3, name: 'VMware ESXi', description: 'Proposed Solution 2.3' },
    ],
  },
  {
    id: 'Req 3',
    title: 'Infrastructure Orchestration',
    description:
      'Automate and Orchestrate infrastructure provisioning, minimize deployment time, eliminate repetitive tasks and reduce errors',
    technicalConstraints: [
      { id: 'TC3.1', description: 'Must be open-source' },
      { id: 'TC3.2', description: 'Must facilitate smooth connection with infrastructure' },
      { id: 'TC3.3', description: 'Must use human-readable text templates' },
      { id: 'TC3.4', description: 'Must be version-controllable' },
      { id: 'TC3.5', description: 'Must specify resource relationships' },
      { id: 'TC3.6', description: 'Must support HA, auto-scaling, nested stacks' },
      { id: 'TC3.7', description: 'Must be natively compatible with infrastructure solution' },
    ],
    proposedSolutions: [
      { id: 1, name: 'OpenStack Heat', description: 'Proposed Solution 3.1' },
      { id: 2, name: 'Terraform', description: 'Proposed Solution 3.2' },
      { id: 3, name: 'Pulumi', description: 'Proposed Solution 3.3' },
    ],
  },
  {
    id: 'Req 4',
    title: 'Containerization and Orchestration',
    description:
      'Provide centralized management and orchestration for container deployment with auto-scaling, load balancing, and self-healing',
    technicalConstraints: [
      { id: 'TC4.1', description: 'Must optimize resources and reduce overhead' },
      { id: 'TC4.2', description: 'Must ensure portability across OS and hardware' },
      { id: 'TC4.3', description: 'Must support multi-tenant isolation' },
      { id: 'TC4.4', description: 'Must be lightweight compared to VMs' },
      { id: 'TC4.5', description: 'Must support standard container images' },
      { id: 'TC4.6', description: 'Must be installable on Debian/Ubuntu' },
      { id: 'TC4.7', description: 'Must be automatically installable via config tools' },
      { id: 'TC4.8', description: 'Must be standard and multi-platform' },
      { id: 'TC4.9', description: 'Must support declarative configuration' },
      {
        id: 'TC4.10',
        description: 'Must integrate with cloud infrastructure (identity, network, storage)',
      },
      { id: 'TC4.11', description: 'Must provide service discovery and load balancing' },
      { id: 'TC4.12', description: 'Must ensure self-healing' },
      { id: 'TC4.13', description: 'Must provide deployment templates' },
    ],
    technologySelection: 'Container Runtime',
    proposedSolutions: [
      { id: 1, name: 'Docker', description: 'Proposed Solution 4.1 (Containerization)' },
      { id: 2, name: 'Podman', description: 'Proposed Solution 4.2 (Containerization)' },
      { id: 3, name: 'containerd', description: 'Proposed Solution 4.3 (Containerization)' },
      { id: 4, name: 'Kubernetes', description: 'Proposed Solution 5.1 (Orchestration)' },
      { id: 5, name: 'Docker Swarm', description: 'Proposed Solution 5.2 (Orchestration)' },
      { id: 6, name: 'Apache Mesos', description: 'Proposed Solution 5.3 (Orchestration)' },
    ],
  },
  {
    id: 'Req 5',
    title: 'Automation Tool',
    description:
      'Configuration management, and application deployment across the infrastructure',
    technicalConstraints: [
      { id: 'TC5.1', description: 'Must be open-source' },
      { id: 'TC5.2', description: 'Must provide provisioning and configuration management' },
      { id: 'TC5.3', description: 'Must support Windows, Linux, Unix' },
      { id: 'TC5.4', description: 'Must be agentless' },
      { id: 'TC5.5', description: 'Must use simple protocols like SSH' },
      { id: 'TC5.6', description: 'Must support infrastructure and monitoring automation' },
    ],
    technologySelection: 'Automation/Config Management Tool',
    proposedSolutions: [
      { id: 1, name: 'Ansible', description: 'Proposed Solution 5.1' },
      { id: 2, name: 'Puppet', description: 'Proposed Solution 5.2' },
      { id: 3, name: 'Chef', description: 'Proposed Solution 5.3' },
    ],
  },
  {
    id: 'Req 6',
    title: 'Monitoring Solution',
    description:
      'Provide real-time monitoring, visualization, and alerting for infrastructure health and performance',
    technicalConstraints: [
      { id: 'TC6.1', description: 'Must collect real-time data from infrastructure' },
      { id: 'TC6.2', description: 'Must generate customizable dashboards' },
      { id: 'TC6.3', description: 'Must provide alerts and notifications' },
      { id: 'TC6.4', description: 'Must be scalable' },
      { id: 'TC6.5', description: 'Must ensure security and authentication' },
      { id: 'TC6.6', description: 'Must be deployable via automation tools' },
    ],
    technologySelection: 'Monitoring Stack',
    proposedSolutions: [
      { id: 1, name: 'Prometheus + Grafana', description: 'Proposed Solution 6.1' },
      {
        id: 2,
        name: 'ELK Stack (Elasticsearch, Logstash, Kibana)',
        description: 'Proposed Solution 6.2',
      },
      { id: 3, name: 'Zabbix', description: 'Proposed Solution 6.3' },
    ],
  },
]

const tableNames = [
  'Cloud Infrastructure Platform',
  'Virtualization Solution',
  'Infrastructure Orchestration',
  'Containerization and Orchestration Platform',
  'Configuration Management & Automation',
  'Monitoring & Observability',
]

export default function RequirementsTableModal({ isOpen, onClose }: RequirementsTableModalProps) {
  const [selectedTableIndex, setSelectedTableIndex] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const currentData = allRequirementsData[selectedTableIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-gray-200 flex flex-col"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
                      >
                        <FileText className="h-8 w-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold mb-1">Requirements & Solutions</h3>
                        <p className="text-blue-100">Technical Constraints & Technology Selection</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Navigation Buttons */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05, x: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (selectedTableIndex > 0) {
                              setSelectedTableIndex(selectedTableIndex - 1)
                            }
                          }}
                          disabled={selectedTableIndex === 0}
                          className={`p-2 rounded-xl transition-colors backdrop-blur-sm ${
                            selectedTableIndex === 0
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-white/20'
                          }`}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05, x: 2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (selectedTableIndex < tableNames.length - 1) {
                              setSelectedTableIndex(selectedTableIndex + 1)
                            }
                          }}
                          disabled={selectedTableIndex === tableNames.length - 1}
                          className={`p-2 rounded-xl transition-colors backdrop-blur-sm ${
                            selectedTableIndex === tableNames.length - 1
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-white/20'
                          }`}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </motion.button>
                      </div>

                      {/* Table Selector */}
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-white/30 transition-colors border border-white/30"
                        >
                          <span className="font-semibold text-sm whitespace-nowrap">
                            {tableNames[selectedTableIndex]}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isDropdownOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </motion.button>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-10 min-w-[300px]"
                          >
                            {tableNames.map((name, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setSelectedTableIndex(index)
                                  setIsDropdownOpen(false)
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors ${
                                  selectedTableIndex === index
                                    ? 'bg-indigo-100 font-semibold text-indigo-700'
                                    : 'text-gray-700'
                                }`}
                              >
                                {name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                      >
                        <X className="h-6 w-6" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTableIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Requirement Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <Lightbulb className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-2">
                            {currentData.id}: {currentData.title}
                          </h4>
                          <p className="text-gray-600">{currentData.description}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Technical Constraints Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
                        <h4 className="text-xl font-bold flex items-center gap-2">
                          <Settings className="h-6 w-6" />
                          Technical Constraints
                        </h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300">
                              <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider text-gray-700">
                                Constraint ID
                              </th>
                              <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider text-gray-700">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {currentData.technicalConstraints.map((constraint, index) => (
                              <motion.tr
                                key={constraint.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.03 }}
                                className="hover:bg-indigo-50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-indigo-100 rounded-lg p-2">
                                      <Settings className="h-4 w-4 text-indigo-600" />
                                    </div>
                                    <span className="font-bold text-indigo-700">{constraint.id}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="text-gray-700">{constraint.description}</span>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Proposed Solutions Section - En bas */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="h-6 w-6 text-blue-600" />
                        <h4 className="text-xl font-bold text-gray-800">Proposed Solutions</h4>
                      </div>
                      <div
                        className={`grid gap-4 ${
                          currentData.proposedSolutions.length <= 3
                            ? 'md:grid-cols-3'
                            : 'md:grid-cols-2 lg:grid-cols-3'
                        }`}
                      >
                        {currentData.proposedSolutions.map((solution, index) => (
                          <motion.div
                            key={solution.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-blue-100 rounded-full p-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-semibold text-blue-700 text-sm">
                                {solution.description}
                              </span>
                            </div>
                            <p className="text-gray-800 font-medium ml-10 text-sm">
                              {solution.name}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Game Section - Mapping des tableaux aux jeux */}
                    {(() => {
                      // Mapping: tableau 1 → jeu 1, tableau 2 → jeu 2, tableau 3 → jeu 3, tableau 4 → jeux 4+5, tableau 5 → jeu 6, tableau 6 → jeu 7
                      const gameMapping: Record<number, number[]> = {
                        1: [0], // Tableau 1 → Jeu 1 (index 0)
                        2: [1], // Tableau 2 → Jeu 2 (index 1)
                        3: [2], // Tableau 3 → Jeu 3 (index 2)
                        4: [3, 4], // Tableau 4 → Jeux 4 et 5 (index 3 et 4)
                        5: [5], // Tableau 5 → Jeu 6 (index 5)
                        6: [6], // Tableau 6 → Jeu 7 (index 6)
                      }

                      const gamesToShow = gameMapping[selectedTableIndex + 1]
                      if (!gamesToShow) return null

                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500"
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <Lightbulb className="h-6 w-6 text-purple-600" />
                            <h4 className="text-xl font-bold text-gray-800">Interactive Game</h4>
                          </div>
                          {gamesToShow.map((gameIndex, idx) => (
                            <div key={gameIndex} className={idx > 0 ? 'mt-8' : ''}>
                              {idx > 0 && (
                                <div className="mb-6 border-t border-gray-200 pt-6">
                                  <h5 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                                    Second Game
                                  </h5>
                                </div>
                              )}
                              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                                <RockPaperScissors3P initialGameIndex={gameIndex} />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
