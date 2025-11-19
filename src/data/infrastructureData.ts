import {
  Activity,
  Box,
  Cloud,
  Cpu,
  Database,
  HardDrive,
  Network,
  Package,
  Server,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export interface TechItem {
  icon: LucideIcon
  title: string
  subtitle: string
  color: string
}

export interface Layer {
  title: string
  icon: LucideIcon
  items: TechItem[]
  borderColor: string
  gradientFrom: string
  gradientTo: string
  textColor: string
}

export interface HardwareNode {
  title: string
  description: string
  specs: string
  borderColor: string
  bgColor: string
  textColor: string
}

export interface NetworkItem {
  title: string
  subtitle: string
  color: string
  iconBg: string
  icon: LucideIcon
}

export interface TechStackItem {
  label: string
  desc: string
  color: string
  text?: string
}

export const projectObjective = {
  primary: {
    title: '🎯 Primary Objective',
    description:
      'Design and deploy a Private Cloud Infrastructure (IaaS) that provides on-demand virtualized computing resources with automated scaling, orchestration, and management capabilities.',
  },
  problem: {
    title: '🔧 Problem Solving',
    description:
      'The project addresses the challenge of resource scalability, environment standardization, and deployment efficiency for organizations hosting multiple application instances. It ensures that compute, network, and storage resources can automatically adapt to workload fluctuations and that application environments can be deployed consistently and rapidly.',
  },
  outcomes: {
    title: '📊 Expected Outcomes',
    items: [
      'Automated resource provisioning and scaling',
      'Reduced operational costs through efficiency',
      'High availability and self-healing infrastructure',
      'Unified monitoring and observability',
    ],
  },
  benefits: {
    title: '✅ Key Benefits',
    items: [
      '100% open-source technology stack',
      'Multi-tenant isolation and security',
      'Container and VM workload support',
      'Infrastructure as Code approach',
    ],
  },
}

export const logicalArchitecture: Layer[] = [
  {
    title: 'Management & Monitoring Layer',
    icon: Settings,
    borderColor: 'border-purple-300',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-pink-100',
    textColor: 'text-purple-800',
    items: [
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
    ],
  },
  {
    title: 'Orchestration Layer',
    icon: Network,
    borderColor: 'border-blue-300',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-cyan-100',
    textColor: 'text-blue-800',
    items: [
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
    ],
  },
  {
    title: 'Application & Container Layer',
    icon: Package,
    borderColor: 'border-green-300',
    gradientFrom: 'from-green-100',
    gradientTo: 'to-emerald-100',
    textColor: 'text-green-800',
    items: [
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
    ],
  },
  {
    title: 'Infrastructure Layer',
    icon: Server,
    borderColor: 'border-gray-300',
    gradientFrom: 'from-gray-100',
    gradientTo: 'to-slate-100',
    textColor: 'text-gray-800',
    items: [
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
    ],
  },
]

export const componentInteractions = [
  'Users interact via Horizon Dashboard or CLI to request resources',
  'Keystone authenticates and authorizes all API requests',
  'Heat orchestrates multi-resource deployments using templates',
  'Nova provisions VMs on KVM while Neutron configures networking',
  'Kubernetes manages containerized workloads via Docker runtime',
  'Prometheus scrapes metrics while Grafana visualizes system health',
  'Ansible automates configuration and deployment across infrastructure',
]

export const hardwareNodes: HardwareNode[] = [
  {
    title: 'Controller Nodes (3x)',
    description:
      'High-availability cluster for OpenStack control plane services (Nova, Neutron, Keystone, Heat)',
    specs: '• 16 CPU cores • 64GB RAM • 500GB SSD',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
  },
  {
    title: 'Compute Nodes (10+)',
    description:
      'Hypervisor hosts running KVM for VM workloads with horizontal scaling',
    specs: '• 32 CPU cores • 128GB RAM • 1TB SSD',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
  },
  {
    title: 'Storage Nodes (3x)',
    description:
      'Block storage (Cinder) and object storage (Swift) with redundancy',
    specs: '• 8 CPU cores • 32GB RAM • 10TB HDD RAID',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800',
  },
  {
    title: 'Network Infrastructure',
    description: '10GbE switches, load balancers, SDN controllers',
    specs: '• Redundant network paths • VLAN segmentation',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
  },
]

export const deploymentTopology = {
  controlPlane: {
    title: 'Control Plane (HA)',
    items: [
      'Load-balanced API endpoints',
      'Clustered MySQL/MariaDB databases',
      'RabbitMQ message queue cluster',
      'HAProxy for service redundancy',
    ],
    gradient: 'from-blue-100 to-blue-50',
    textColor: 'text-blue-800',
  },
  dataPlane: {
    title: 'Data Plane',
    items: [
      'Distributed compute resources',
      'Software-defined networking (Neutron)',
      'Distributed storage backends',
      'Container orchestration layer',
    ],
    gradient: 'from-purple-100 to-purple-50',
    textColor: 'text-purple-800',
  },
  managementPlane: {
    title: 'Management Plane',
    items: [
      'Ansible control node',
      'Prometheus + Grafana stack',
      'Centralized logging (ELK optional)',
      'Backup and disaster recovery',
    ],
    gradient: 'from-green-100 to-green-50',
    textColor: 'text-green-800',
  },
}

export const networkArchitecture: NetworkItem[] = [
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
]

export const techStack: TechStackItem[] = [
  { label: 'OpenStack', desc: 'IaaS Platform', color: 'from-red-100 to-red-50' },
  { label: 'KVM', desc: 'Hypervisor', color: 'from-orange-100 to-orange-50' },
  { label: 'Heat', desc: 'Orchestration', color: 'from-yellow-100 to-yellow-50' },
  { label: 'Docker', desc: 'Containers', color: 'from-blue-100 to-blue-50' },
  { label: 'Kubernetes', desc: 'Orchestrator', color: 'from-indigo-100 to-indigo-50' },
  { label: 'Ansible', desc: 'Automation', color: 'from-gray-900 to-gray-700', text: 'text-white' },
]

