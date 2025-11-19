import { Server, HardDrive, Cloud, Network } from 'lucide-react'
import {
  hardwareNodes,
  deploymentTopology,
  networkArchitecture,
  techStack,
} from '../data/infrastructureData'

export default function PhysicalArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
            <Server className="h-12 w-12" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-gray-900">Physical Architecture</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Hardware infrastructure, deployment topology, and network architecture
          </p>
        </div>

        {/* Hardware Infrastructure */}
        <section className="mb-12 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-4">
            <HardDrive className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">Hardware Infrastructure</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {hardwareNodes.map((node, index) => (
              <div
                key={index}
                className={`rounded-lg border-l-4 ${node.borderColor} ${node.bgColor} p-5 shadow-md transition-all hover:shadow-lg`}
              >
                <h3 className={`mb-2 text-lg font-semibold ${node.textColor}`}>{node.title}</h3>
                <p className="mb-2 text-sm text-gray-700">{node.description}</p>
                <p className="text-xs text-gray-600">{node.specs}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deployment Topology */}
        <section className="mb-12 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-4">
            <Cloud className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">Deployment Topology</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div
              className={`rounded-xl bg-gradient-to-r ${deploymentTopology.controlPlane.gradient} p-5 shadow-md`}
            >
              <h3 className={`mb-3 text-lg font-semibold ${deploymentTopology.controlPlane.textColor}`}>
                {deploymentTopology.controlPlane.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {deploymentTopology.controlPlane.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`rounded-xl bg-gradient-to-r ${deploymentTopology.dataPlane.gradient} p-5 shadow-md`}
            >
              <h3 className={`mb-3 text-lg font-semibold ${deploymentTopology.dataPlane.textColor}`}>
                {deploymentTopology.dataPlane.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {deploymentTopology.dataPlane.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`rounded-xl bg-gradient-to-r ${deploymentTopology.managementPlane.gradient} p-5 shadow-md`}
            >
              <h3 className={`mb-3 text-lg font-semibold ${deploymentTopology.managementPlane.textColor}`}>
                {deploymentTopology.managementPlane.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {deploymentTopology.managementPlane.items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Network Architecture */}
        <section className="mb-12 rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center gap-4">
            <Network className="h-8 w-8 text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">Network Architecture</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {networkArchitecture.map((network, index) => (
              <div
                key={index}
                className={`rounded-xl bg-gradient-to-br ${network.color} p-6 text-center shadow-md transition-transform hover:scale-105`}
              >
                <div
                  className={`${network.iconBg} mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg`}
                >
                  <network.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">{network.title}</h3>
                <p className="text-sm text-gray-600">{network.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Complete Technology Stack
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`rounded-xl bg-gradient-to-br ${tech.color} p-4 text-center shadow-md transition-transform hover:scale-105 ${
                  tech.text ?? 'text-gray-800'
                }`}
              >
                <p className="mb-1 text-sm font-bold uppercase tracking-wide">{tech.label}</p>
                <p className={`text-xs ${tech.text ? 'text-gray-300' : 'text-gray-600'}`}>
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

