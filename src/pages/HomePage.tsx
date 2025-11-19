import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cloud, Layers, Server, ArrowRight, MonitorDot, FileText } from 'lucide-react'
import { projectObjective } from '../data/infrastructureData'
import RequirementsTableModal from '../components/RequirementsTableModal'

export default function HomePage() {
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
            <MonitorDot className="h-12 w-12" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Open-Source Cloud Infrastructure Platform
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Enterprise-Grade IaaS Solution with Automated Orchestration
          </p>
        </div>

        {/* Project Objective Section */}
        <section className="mb-16 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-600 p-3 text-white">
                <Cloud className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Project Objective</h2>
            </div>
            <button
              onClick={() => setIsRequirementsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              <FileText className="h-5 w-5" />
              View Requirements Table
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                {projectObjective.primary.title}
              </h3>
              <p className="text-gray-700">{projectObjective.primary.description}</p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                {projectObjective.problem.title}
              </h3>
              <p className="text-gray-700">{projectObjective.problem.description}</p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow">
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

            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                {projectObjective.benefits.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {projectObjective.benefits.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Navigation Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/logical-architecture"
            className="group rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Layers className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Logical Architecture</h3>
            </div>
            <p className="mb-4 text-indigo-100">
              Explore the layered architecture, component interactions, and service orchestration
            </p>
            <div className="flex items-center text-sm font-semibold">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            to="/physical-architecture"
            className="group rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Server className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Physical Architecture</h3>
            </div>
            <p className="mb-4 text-green-100">
              Discover hardware infrastructure, deployment topology, and network architecture
            </p>
            <div className="flex items-center text-sm font-semibold">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 rounded-2xl bg-gray-900 p-8 text-center text-white">
          <p className="mb-2 text-sm font-medium">
            🎯 Key Advantages: 100% Open-Source • Enterprise-Grade • Highly Scalable • Self-Healing
            • Cost-Effective
          </p>
          <p className="text-xs text-gray-400">
            Complete infrastructure automation from bare metal to containerized applications
          </p>
        </footer>
      </div>

      {/* Requirements Table Modal */}
      <RequirementsTableModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
      />
    </div>
  )
}

