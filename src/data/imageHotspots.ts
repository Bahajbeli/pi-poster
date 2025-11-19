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
      'Système de monitoring et de visualisation des métriques. Prometheus collecte les données de performance et Grafana fournit des tableaux de bord interactifs pour visualiser l\'état de l\'infrastructure en temps réel.',
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
      'Outil d\'automatisation de configuration qui permet de gérer et déployer des configurations sur plusieurs serveurs de manière idempotente. Utilisé pour la configuration automatique de tous les composants de l\'infrastructure.',
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
      'Interface web d\'administration pour OpenStack. Permet aux utilisateurs de gérer leurs ressources cloud via une interface graphique intuitive, incluant la création de VMs, réseaux et volumes.',
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
      'Service d\'orchestration d\'infrastructure qui permet de définir et déployer des infrastructures complexes via des templates. Supporte l\'Infrastructure as Code (IaC) pour automatiser le déploiement.',
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
      'Plateforme d\'orchestration de conteneurs qui automatise le déploiement, la mise à l\'échelle et la gestion des applications conteneurisées. Gère le cycle de vie complet des conteneurs.',
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
      'Plateforme de conteneurisation qui permet d\'empaqueter des applications et leurs dépendances dans des conteneurs légers et portables. Utilisé comme runtime de conteneurs dans l\'infrastructure.',
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
      'Service de calcul d\'OpenStack responsable de la gestion du cycle de vie des instances de machines virtuelles. Gère la création, la suppression et la migration des VMs sur les hyperviseurs.',
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
      'Service de mise en réseau d\'OpenStack qui fournit une connectivité réseau pour les instances. Gère les réseaux, sous-réseaux, routeurs et règles de sécurité (firewall) de manière programmatique.',
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
      'Hyperviseur de virtualisation open-source intégré au noyau Linux. Permet d\'exécuter plusieurs machines virtuelles isolées sur un même serveur physique avec des performances proches du natif.',
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
      'Cinder fournit du stockage bloc persistant pour les instances, tandis que Swift offre du stockage objet distribué et redondant. Ensemble, ils fournissent des solutions de stockage scalables pour l\'infrastructure.',
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
      'Plateforme IaaS open-source complète qui orchestre les ressources de calcul, réseau et stockage. Fournit des APIs pour gérer l\'infrastructure cloud de manière programmatique et standardisée.',
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
      'Ressources physiques de l\'infrastructure incluant les serveurs, stockage, et équipements réseau. Base matérielle sur laquelle s\'exécutent tous les services virtualisés et conteneurisés.',
    layer: 'Infrastructure Layer',
  },
]

