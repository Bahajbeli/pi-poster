export interface Hotspot {
  id: string
  x: number
  y: number
  width: number
  height: number
  title: string
  description: string
  layer: string
}

// Coordonnées approximatives des hotspots sur l'image
// Ces valeurs doivent être ajustées selon votre image réelle
export const architectureHotspots: Hotspot[] = [
  {
    id: 'prometheus-grafana',
    x: 10,
    y: 5,
    width: 15,
    height: 10,
    title: 'Prometheus + Grafana',
    description:
      "Metrics monitoring and visualization stack. Prometheus collects performance data and Grafana provides interactive dashboards to visualize infrastructure health in real time.",
    layer: 'Management & Monitoring Layer',
  },
  {
    id: 'ansible',
    x: 30,
    y: 5,
    width: 15,
    height: 10,
    title: 'Ansible',
    description:
      "Configuration automation tool used to manage and deploy configurations across multiple servers idempotently. Used to automatically configure all infrastructure components.",
    layer: 'Management & Monitoring Layer',
  },
  {
    id: 'horizon',
    x: 50,
    y: 5,
    width: 15,
    height: 10,
    title: 'OpenStack Horizon',
    description:
      "Web administration interface for OpenStack. Lets users manage cloud resources through an intuitive UI, including creating VMs, networks, and volumes.",
    layer: 'Management & Monitoring Layer',
  },
  {
    id: 'heat',
    x: 10,
    y: 20,
    width: 20,
    height: 12,
    title: 'OpenStack Heat',
    description:
      "Infrastructure orchestration service to define and deploy complex infrastructure via templates. Supports Infrastructure as Code (IaC) to automate deployments.",
    layer: 'Orchestration Layer',
  },
  {
    id: 'kubernetes',
    x: 35,
    y: 20,
    width: 20,
    height: 12,
    title: 'Kubernetes',
    description:
      "Container orchestration platform that automates deployment, scaling, and management of containerized applications. Manages the full lifecycle of containers.",
    layer: 'Orchestration Layer',
  },
  {
    id: 'docker',
    x: 10,
    y: 35,
    width: 15,
    height: 12,
    title: 'Docker',
    description:
      "Containerization platform that packages applications and dependencies into lightweight, portable containers. Used as the container runtime in the infrastructure.",
    layer: 'Application & Container Layer',
  },
  {
    id: 'nova',
    x: 30,
    y: 35,
    width: 15,
    height: 12,
    title: 'Nova',
    description:
      "OpenStack compute service responsible for the lifecycle of virtual machine instances. Manages creation, deletion, and migration of VMs across hypervisors.",
    layer: 'Application & Container Layer',
  },
  {
    id: 'neutron',
    x: 50,
    y: 35,
    width: 15,
    height: 12,
    title: 'Neutron',
    description:
      "OpenStack networking service providing network connectivity for instances. Programmatically manages networks, subnets, routers, and security rules (firewall).",
    layer: 'Application & Container Layer',
  },
  {
    id: 'kvm',
    x: 10,
    y: 50,
    width: 15,
    height: 12,
    title: 'KVM',
    description:
      "Open-source virtualization hypervisor built into the Linux kernel. Runs multiple isolated virtual machines on a single physical server with near-native performance.",
    layer: 'Infrastructure Layer',
  },
  {
    id: 'cinder-swift',
    x: 30,
    y: 50,
    width: 20,
    height: 12,
    title: 'Cinder / Swift',
    description:
      "Cinder provides persistent block storage for instances, while Swift offers distributed, redundant object storage. Together they deliver scalable storage for the infrastructure.",
    layer: 'Infrastructure Layer',
  },
  {
    id: 'openstack-core',
    x: 55,
    y: 50,
    width: 20,
    height: 12,
    title: 'OpenStack Core',
    description:
      "Complete open-source IaaS platform orchestrating compute, network, and storage resources. Provides APIs to programmatically manage cloud infrastructure in a standardized way.",
    layer: 'Infrastructure Layer',
  },
  {
    id: 'hardware',
    x: 10,
    y: 65,
    width: 80,
    height: 15,
    title: 'Hardware Infrastructure',
    description:
      "Physical resources of the infrastructure including servers, storage, and networking equipment. The hardware foundation on which all virtualized and containerized services run.",
    layer: 'Infrastructure Layer',
  },
]

