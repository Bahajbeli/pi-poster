import {
  Activity,
  Box,
  Cloud,
  Cpu,
  Database,
  HardDrive,
  Layers,
  MonitorDot,
  Network,
  Package,
  Server,
  Settings,
} from 'lucide-react'

export default function InfrastructurePoster() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
          <MonitorDot className="mx-auto mb-4 h-14 w-14 text-blue-100" />
          <h1 className="text-4xl font-bold leading-tight">
            Open-Source Cloud Infrastructure Platform
          </h1>
          <p className="mt-3 text-xl text-blue-100">
            Enterprise-Grade IaaS Solution with Automated Orchestration
          </p>
        </header>

        <main className="space-y-14 p-6 md:p-10">
          {/* 1. Project Objective */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-xl bg-blue-600 p-3 text-white">
                <Cloud className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                1. Project Objective
              </h2>
            </div>

            <div className="space-y-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-inner">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-white p-5 shadow">
                  <h3 className="mb-2 text-lg font-semibold text-blue-700">
                    🎯 Primary Objective
                  </h3>
                  <p className="text-gray-700">
                    Build a comprehensive open-source Infrastructure as a
                    Service platform that provides on-demand virtualized
                    computing resources with automated scaling, orchestration,
                    and management capabilities.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow">
                  <h3 className="mb-2 text-lg font-semibold text-blue-700">
                    🔧 Problem Solving
                  </h3>
                  <p className="text-gray-700">
                    Eliminate manual infrastructure provisioning, reduce
                    deployment time, minimize configuration errors, and provide
                    enterprise-grade resource management without vendor lock-in.
                  </p>
                </div>
                <div className="rounded-xl bg-white p-5 shadow">
                  <h3 className="mb-2 text-lg font-semibold text-blue-700">
                    📊 Expected Outcomes
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Automated resource provisioning and scaling</li>
                    <li>• Reduced operational costs through efficiency</li>
                    <li>• High availability and self-healing infrastructure</li>
                    <li>• Unified monitoring and observability</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-white p-5 shadow">
                  <h3 className="mb-2 text-lg font-semibold text-blue-700">
                    ✅ Key Benefits
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 100% open-source technology stack</li>
                    <li>• Multi-tenant isolation and security</li>
                    <li>• Container and VM workload support</li>
                    <li>• Infrastructure as Code approach</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Logical Architecture */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-xl bg-indigo-600 p-3 text-white">
                <Layers className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                2. Logical Architecture
              </h2>
            </div>

            <div className="space-y-6 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 shadow-inner">
              <div className="grid gap-6">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
                    Layered Architecture Overview
                  </h3>

                  <div className="space-y-4">
                    <div className="rounded-xl border-2 border-purple-300 bg-gradient-to-r from-purple-100 to-pink-100 p-4">
                      <h4 className="mb-3 flex items-center font-bold text-purple-800">
                        <Settings className="mr-2 h-5 w-5" />
                        Management & Monitoring Layer
                      </h4>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          {
                            icon: Activity,
                            title: 'Prometheus + Grafana',
                            subtitle: 'Metrics & Visualization',
                            color: 'text-orange-600',
                          },
                          {
                            icon: Settings,
                            title: 'Ansible',
                            subtitle: 'Configuration Automation',
                            color: 'text-slate-900',
                          },
                          {
                            icon: Box,
                            title: 'OpenStack Horizon',
                            subtitle: 'Web Dashboard',
                            color: 'text-red-600',
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="rounded-lg bg-white p-3 text-center shadow-sm"
                          >
                            <item.icon
                              className={`mx-auto mb-1 h-6 w-6 ${item.color}`}
                            />
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="text-xs text-gray-600">
                              {item.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-blue-300 bg-gradient-to-r from-blue-100 to-cyan-100 p-4">
                      <h4 className="mb-3 flex items-center font-bold text-blue-800">
                        <Network className="mr-2 h-5 w-5" />
                        Orchestration Layer
                      </h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          {
                            icon: Box,
                            title: 'OpenStack Heat',
                            subtitle: 'Infrastructure Orchestration',
                            color: 'text-orange-600',
                          },
                          {
                            icon: Package,
                            title: 'Kubernetes',
                            subtitle: 'Container Orchestration',
                            color: 'text-blue-600',
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="rounded-lg bg-white p-3 text-center shadow-sm"
                          >
                            <item.icon
                              className={`mx-auto mb-1 h-6 w-6 ${item.color}`}
                            />
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="text-xs text-gray-600">
                              {item.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-green-300 bg-gradient-to-r from-green-100 to-emerald-100 p-4">
                      <h4 className="mb-3 flex items-center font-bold text-green-800">
                        <Package className="mr-2 h-5 w-5" />
                        Application & Container Layer
                      </h4>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          {
                            icon: Package,
                            title: 'Docker',
                            subtitle: 'Container Runtime',
                            color: 'text-blue-600',
                          },
                          {
                            icon: Server,
                            title: 'Nova',
                            subtitle: 'Compute Management',
                            color: 'text-slate-700',
                          },
                          {
                            icon: Network,
                            title: 'Neutron',
                            subtitle: 'Network Services',
                            color: 'text-blue-500',
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="rounded-lg bg-white p-3 text-center shadow-sm"
                          >
                            <item.icon
                              className={`mx-auto mb-1 h-6 w-6 ${item.color}`}
                            />
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="text-xs text-gray-600">
                              {item.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-gray-300 bg-gradient-to-r from-gray-100 to-slate-100 p-4">
                      <h4 className="mb-3 flex items-center font-bold text-gray-800">
                        <Server className="mr-2 h-5 w-5" />
                        Infrastructure Layer
                      </h4>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          {
                            icon: Cpu,
                            title: 'KVM',
                            subtitle: 'Hypervisor',
                            color: 'text-red-600',
                          },
                          {
                            icon: Database,
                            title: 'Cinder/Swift',
                            subtitle: 'Storage',
                            color: 'text-orange-600',
                          },
                          {
                            icon: Cloud,
                            title: 'OpenStack Core',
                            subtitle: 'IaaS Platform',
                            color: 'text-red-600',
                          },
                          {
                            icon: HardDrive,
                            title: 'Hardware',
                            subtitle: 'Physical Resources',
                            color: 'text-slate-600',
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="rounded-lg bg-white p-3 text-center shadow-sm"
                          >
                            <item.icon
                              className={`mx-auto mb-1 h-6 w-6 ${item.color}`}
                            />
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="text-xs text-gray-600">
                              {item.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Component Interactions
                  </h3>
                  <ol className="space-y-3 text-sm text-gray-700">
                    {[
                      'Users interact via Horizon Dashboard or CLI to request resources',
                      'Keystone authenticates and authorizes all API requests',
                      'Heat orchestrates multi-resource deployments using templates',
                      'Nova provisions VMs on KVM while Neutron configures networking',
                      'Kubernetes manages containerized workloads via Docker runtime',
                      'Prometheus scrapes metrics while Grafana visualizes system health',
                      'Ansible automates configuration and deployment across infrastructure',
                    ].map((text, index) => (
                      <li key={text} className="flex items-start">
                        <span className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                          {index + 1}
                        </span>
                        <p>{text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Physical Architecture */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-xl bg-green-600 p-3 text-white">
                <Server className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                3. Physical Architecture
              </h2>
            </div>

            <div className="space-y-6 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-inner">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-lg">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                    <HardDrive className="mr-2 h-6 w-6 text-green-600" />
                    Hardware Infrastructure
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                      <h4 className="text-sm font-semibold text-blue-800">
                        Controller Nodes (3x)
                      </h4>
                      <p>
                        High-availability cluster for OpenStack control plane
                        services (Nova, Neutron, Keystone, Heat)
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        • 16 CPU cores • 64GB RAM • 500GB SSD
                      </p>
                    </div>
                    <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
                      <h4 className="text-sm font-semibold text-purple-800">
                        Compute Nodes (10+)
                      </h4>
                      <p>
                        Hypervisor hosts running KVM for VM workloads with
                        horizontal scaling
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        • 32 CPU cores • 128GB RAM • 1TB SSD
                      </p>
                    </div>
                    <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4">
                      <h4 className="text-sm font-semibold text-orange-800">
                        Storage Nodes (3x)
                      </h4>
                      <p>
                        Block storage (Cinder) and object storage (Swift) with
                        redundancy
                      </p>
                      <p className="mt-1 text-xs text-gray-600">
                        • 8 CPU cores • 32GB RAM • 10TB HDD RAID
                      </p>
                    </div>
                    <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                      <h4 className="text-sm font-semibold text-green-800">
                        Network Infrastructure
                      </h4>
                      <p>10GbE switches, load balancers, SDN controllers</p>
                      <p className="mt-1 text-xs text-gray-600">
                        • Redundant network paths • VLAN segmentation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-lg">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                    <Cloud className="mr-2 h-6 w-6 text-green-600" />
                    Deployment Topology
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-blue-800">
                        Control Plane (HA)
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Load-balanced API endpoints</li>
                        <li>• Clustered MySQL/MariaDB databases</li>
                        <li>• RabbitMQ message queue cluster</li>
                        <li>• HAProxy for service redundancy</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-purple-100 to-purple-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-purple-800">
                        Data Plane
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Distributed compute resources</li>
                        <li>• Software-defined networking (Neutron)</li>
                        <li>• Distributed storage backends</li>
                        <li>• Container orchestration layer</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-gradient-to-r from-green-100 to-green-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-green-800">
                        Management Plane
                      </h4>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li>• Ansible control node</li>
                        <li>• Prometheus + Grafana stack</li>
                        <li>• Centralized logging (ELK optional)</li>
                        <li>• Backup and disaster recovery</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 rounded-2xl bg-white p-5 shadow-lg">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                    <Network className="mr-2 h-6 w-6 text-green-600" />
                    Network Architecture
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: 'Management Network',
                        subtitle: '10.0.1.0/24 - Internal API communication',
                        color: 'from-blue-100 to-blue-50',
                        iconBg: 'bg-blue-600',
                        icon: Network,
                      },
                      {
                        title: 'Public Network',
                        subtitle: 'External access via floating IPs',
                        color: 'from-green-100 to-green-50',
                        iconBg: 'bg-green-600',
                        icon: Cloud,
                      },
                      {
                        title: 'Storage Network',
                        subtitle: '10.0.3.0/24 - High-speed storage traffic',
                        color: 'from-purple-100 to-purple-50',
                        iconBg: 'bg-purple-600',
                        icon: Database,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className={`rounded-xl bg-gradient-to-br ${item.color} p-4 text-center`}
                      >
                        <div
                          className={`${item.iconBg} mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-white`}
                        >
                          <item.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-gray-600">
                          {item.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-lg">
                <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">
                  Complete Technology Stack
                </h3>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {[
                    { label: 'OpenStack', desc: 'IaaS Platform', color: 'from-red-100 to-red-50' },
                    { label: 'KVM', desc: 'Hypervisor', color: 'from-orange-100 to-orange-50' },
                    { label: 'Heat', desc: 'Orchestration', color: 'from-yellow-100 to-yellow-50' },
                    { label: 'Docker', desc: 'Containers', color: 'from-blue-100 to-blue-50' },
                    { label: 'Kubernetes', desc: 'Orchestrator', color: 'from-indigo-100 to-indigo-50' },
                    { label: 'Ansible', desc: 'Automation', color: 'from-gray-900 to-gray-700', text: 'text-white' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl bg-gradient-to-br ${item.color} p-3 text-center ${
                        item.text ?? 'text-gray-800'
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className={`text-xs ${item.text ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 p-6 text-center text-white">
          <p className="text-sm font-medium">
            🎯 Key Advantages: 100% Open-Source • Enterprise-Grade • Highly
            Scalable • Self-Healing • Cost-Effective
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Complete infrastructure automation from bare metal to containerized applications
          </p>
        </footer>
      </div>
    </div>
  )
}

