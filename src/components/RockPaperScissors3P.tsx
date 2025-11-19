import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Hand, Trophy, RotateCcw, Play } from 'lucide-react'
import WinnerModal from './WinnerModal'

type Choice = 'yes' | 'no' | 'partial' | null
type Player = {
  id: number
  name: string
  choice: Choice
  score: number
  color: string
}

const choices = [
  { value: 'yes' as Choice, emoji: '✅', label: 'Yes', points: 1 },
  { value: 'no' as Choice, emoji: '❌', label: 'No', points: 0 },
  { value: 'partial' as Choice, emoji: '⚠️', label: 'Partial', points: 0.5 },
]

const playerColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'] as const

// Justifications for each game winner
const gameJustifications = [
  'OpenStack satisfies all technical constraints with the most mature ecosystem, largest community support, and comprehensive features including native load balancing (Octavia) and advanced orchestration (Heat).',
  'KVM is the default and most integrated hypervisor for OpenStack, offers native Linux kernel integration, and is completely open-source with excellent performance and scalability.',
  'Heat is the native orchestration engine for OpenStack, providing deep integration, native support for all OpenStack resources, and built-in auto-scaling and HA capabilities specific to OpenStack environments.',
  'Docker offers the largest ecosystem, best documentation, extensive community support, Docker Hub registry, and seamless integration with Kubernetes. While all three solutions meet technical requirements, Docker provides the best developer experience and industry adoption.',
  'Kubernetes is the industry-standard container orchestration platform with the most mature ecosystem, native OpenStack integration (via Cloud Provider OpenStack), extensive automation capabilities, and comprehensive features for enterprise deployments.',
  'Ansible perfectly matches all requirements with its agentless architecture, SSH-based communication, simple YAML syntax, extensive module library for OpenStack/Kubernetes, and strong community support.',
  'Prometheus + Grafana is the de-facto standard for Kubernetes and cloud-native monitoring, offers native Kubernetes integration, powerful query language (PromQL), excellent visualization, and strong community support. Better suited for metrics monitoring than log-focused ELK.',
]

const gameConfigurations = [
  {
    id: 1,
    title: 'Yes - No - Partial',
    players: ['OpenStack', 'Apache CloudStack', 'OpenNebula'],
    stages: [
      'TC1.1 - Open-source',
      'TC1.2 - Multi-tenant architecture',
      'TC1.3 - Orchestration capabilities',
      'TC1.4 - Multiple hypervisors',
      'TC1.5 - Private/Hybrid deployment',
      'TC1.6 - Commodity hardware',
      'TC1.7 - Self-healing & redundancy',
      'TC1.8 - Horizontal/Vertical scaling',
      'TC1.9 - Native Load Balancer',
      'TC1.10 - Floating IPs',
      'TC1.11 - Centralized dashboard',
      'TC1.12: Backup and archive large amounts of data with linear performance.',
    ],
  },
  {
    id: 2,
    title: 'Compatibility & Performance',
    players: ['KVM', 'Xen', 'VMware ESXi'],
    stages: [
      'TC2.1 - OpenStack compatibility',
      'TC2.2 - Linux hardware support',
      'TC2.3 - Live migration',
      'TC2.4 - Scalability',
      'TC2.5 - Demanding workloads',
    ],
  },
  {
    id: 3,
    title: 'Infrastructure as Code',
    players: ['OpenStack Heat', 'Terraform', 'Pulumi'],
    stages: [
      'TC3.1 - Open-source',
      'TC3.2 - Infrastructure integration',
      'TC3.3 - Human-readable templates',
      'TC3.4 - Version control',
      'TC3.5 - Resource relationships',
      'TC3.6 - HA, auto-scaling, nested stacks',
      'TC3.7 - Native infrastructure compatibility',
    ],
  },
  {
    id: 4,
    title: 'Cloud Efficiencies',
    players: ['Docker', 'Podman', 'containerd'],
    stages: [
      'TC4.1 - Resource optimization',
      'TC4.2 - OS/Hardware portability',
      'TC4.3 - Multi-tenant isolation',
      'TC4.4 - Lightweight',
      'TC4.5 - Standard images (OCI)',
    ],
  },
  {
    id: 5,
    title: 'Advanced Deployment',
    players: ['Kubernetes', 'Docker Swarm', 'Apache Mesos'],
    stages: [
      'TC4.6 - Debian/Ubuntu support',
      'TC4.7 - Auto-install via Ansible',
      'TC4.8 - Standard/Multi-platform',
      'TC4.9 - Declarative config',
      'TC4.10 - Cloud infrastructure integration',
      'TC4.11 - Service discovery & LB',
      'TC4.12 - Self-healing',
      'TC4.13 - Deployment templates',
    ],
  },
  {
    id: 6,
    title: 'Full Automation',
    players: ['Ansible', 'Puppet', 'Chef'],
    stages: [
      'TC5.1 - Open-source',
      'TC5.2 - Provisioning & config mgmt',
      'TC5.3 - Cross-platform support',
      'TC5.4 - Agentless',
      'TC5.5 - Simple protocols (SSH)',
      'TC5.6 - Infrastructure automation',
    ],
  },
  {
    id: 7,
    title: 'Intelligent Monitoring',
    players: ['Prometheus + Grafana', 'ELK Stack', 'Zabbix'],
    stages: [
      'Req 6 - Monitoring',
      'TC6.1 - Real-time data collection',
      'TC6.2 - Customizable dashboards',
      'TC6.3 - Alerts & notifications',
      'TC6.4 - Scalability',
      'TC6.5 - Security & auth',
      'TC6.6 - Ansible deployment',
    ],
  },
] as const

const createPlayersForGame = (gameIndex: number): Player[] => {
  const config = gameConfigurations[gameIndex]
  return config.players.map((name, idx) => ({
    id: idx + 1,
    name,
    choice: null,
    score: 0,
    color: playerColors[idx],
  }))
}

// Données d'automatisation pour tous les jeux
const automatedChoices: Record<number, Choice[][]> = {
  1: [
    ['yes', 'yes', 'yes'], // TC1.1 - Open-source
    ['yes', 'yes', 'partial'], // TC1.2 - Multi-tenant architecture (Limited = partial)
    ['yes', 'yes', 'partial'], // TC1.3 - Orchestration capabilities (Basic = partial)
    ['yes', 'yes', 'yes'], // TC1.4 - Multiple hypervisors
    ['yes', 'yes', 'yes'], // TC1.5 - Private/Hybrid deployment
    ['yes', 'yes', 'yes'], // TC1.6 - Commodity hardware
    ['yes', 'yes', 'partial'], // TC1.7 - Self-healing & redundancy (Limited = partial)
    ['yes', 'yes', 'partial'], // TC1.8 - Horizontal/Vertical scaling (Basic = partial)
    ['yes', 'yes', 'no'], // TC1.9 - Native Load Balancer
    ['yes', 'yes', 'yes'], // TC1.10 - Floating IPs
    ['yes', 'yes', 'yes'], // TC1.11 - Centralized dashboard
    ['yes', 'no', 'no'], // TC1.12 - Backup and archive
  ],
  2: [
    ['yes', 'yes', 'partial'], // TC2.1 - OpenStack compatibility
    ['yes', 'yes', 'partial'], // TC2.2 - Linux hardware support (Limited = partial)
    ['yes', 'yes', 'yes'], // TC2.3 - Live migration
    ['yes', 'yes', 'yes'], // TC2.4 - Scalability
    ['yes', 'yes', 'yes'], // TC2.5 - Demanding workloads
  ],
  3: [
    ['yes', 'yes', 'yes'], // TC3.1 - Open-source
    ['yes', 'yes', 'yes'], // TC3.2 - Infrastructure integration
    ['yes', 'yes', 'partial'], // TC3.3 - Human-readable templates (Code-based = partial)
    ['yes', 'yes', 'yes'], // TC3.4 - Version control
    ['yes', 'yes', 'yes'], // TC3.5 - Resource relationships
    ['yes', 'yes', 'partial'], // TC3.6 - HA, auto-scaling, nested stacks (Limited = partial)
    ['yes', 'no', 'no'], // TC3.7 - Native infrastructure compatibility
  ],
  4: [
    ['yes', 'yes', 'yes'], // TC4.1 - Resource optimization
    ['yes', 'yes', 'yes'], // TC4.2 - OS/Hardware portability
    ['yes', 'yes', 'yes'], // TC4.3 - Multi-tenant isolation
    ['yes', 'yes', 'yes'], // TC4.4 - Lightweight
    ['yes', 'yes', 'yes'], // TC4.5 - Standard images (OCI)
  ],
  5: [
    ['yes', 'yes', 'yes'], // TC4.6 - Debian/Ubuntu support
    ['yes', 'yes', 'partial'], // TC4.7 - Auto-install via Ansible (Complex = partial)
    ['yes', 'partial', 'partial'], // TC4.8 - Standard/Multi-platform (Declining/Limited = partial)
    ['yes', 'yes', 'partial'], // TC4.9 - Declarative config (Limited = partial)
    ['yes', 'partial', 'partial'], // TC4.10 - Cloud infrastructure integration (Limited = partial)
    ['yes', 'yes', 'yes'], // TC4.11 - Service discovery & LB
    ['yes', 'yes', 'yes'], // TC4.12 - Self-healing
    ['yes', 'partial', 'partial'], // TC4.13 - Deployment templates (Basic/Limited = partial)
  ],
  6: [
    ['yes', 'yes', 'yes'], // TC5.1 - Open-source
    ['yes', 'yes', 'yes'], // TC5.2 - Provisioning & config mgmt
    ['yes', 'yes', 'yes'], // TC5.3 - Cross-platform support
    ['yes', 'no', 'no'], // TC5.4 - Agentless
    ['yes', 'no', 'no'], // TC5.5 - Simple protocols (SSH)
    ['yes', 'yes', 'yes'], // TC5.6 - Infrastructure automation
  ],
  7: [
    ['yes', 'yes', 'yes'], // TC6.1 - Real-time data collection
    ['yes', 'yes', 'yes'], // TC6.2 - Customizable dashboards
    ['yes', 'partial', 'yes'], // TC6.3 - Alerts & notifications (Via plugins = partial)
    ['yes', 'partial', 'yes'], // TC6.4 - Scalability (Complex scaling = partial)
    ['yes', 'yes', 'yes'], // TC6.5 - Security & auth
    ['yes', 'yes', 'yes'], // TC6.6 - Ansible deployment
  ],
}

interface RockPaperScissors3PProps {
  initialGameIndex?: number
}

export default function RockPaperScissors3P(props: RockPaperScissors3PProps = {}) {
  const { initialGameIndex = 0 } = props
  const [players, setPlayers] = useState<Player[]>(() => createPlayersForGame(initialGameIndex))
  const [currentPlayer, setCurrentPlayer] = useState<number>(1)
  const [round, setRound] = useState<number>(1)
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished' | 'ready' | 'gameOver'>('ready')
  const [winners, setWinners] = useState<number[]>([])
  const [currentGameIndex, setCurrentGameIndex] = useState(initialGameIndex)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [winnerModalDismissed, setWinnerModalDismissed] = useState(false)
  const scoredRoundRef = useRef<number | null>(null)
  const autoPlayTimeoutRef = useRef<number | null>(null)
  const isAutoPlayingRef = useRef(false)

  const currentGame = gameConfigurations[currentGameIndex]
  const maxRounds = currentGame.stages.length
  const totalGames = gameConfigurations.length

  const handleChoice = (choice: Choice) => {
    if (gameStatus !== 'playing') return

    // Mettre à jour immédiatement et calculer sur un snapshot pour éviter l'état obsolète
    setPlayers((prev) => {
      const next = prev.map((p) => (p.id === currentPlayer ? { ...p, choice } : p))
      if (currentPlayer === 3) {
        // Tous les joueurs ont choisi, déterminer le gagnant avec l'état à jour
        setTimeout(() => {
          determineWinner(next)
        }, 500)
      }
      return next
    })

    if (currentPlayer < 3) {
      setCurrentPlayer(currentPlayer + 1)
    }
  }

  const determineWinner = (playersSnapshot: Player[], currentRoundParam?: number) => {
    // Chaque joueur gagne des points selon son choix
    // Yes = 1 point, No = 0 point, Partial = 0.5 point
    
    // Utiliser currentRoundParam si fourni, sinon utiliser round de l'état
    const currentRoundToUse = currentRoundParam !== undefined ? currentRoundParam : round
    
    // Empêcher le double comptage dans la même manche avec useRef
    if (scoredRoundRef.current !== currentRoundToUse) {
      setPlayers((prev) => {
        const updated = prev.map((p) => {
          const playerChoice = playersSnapshot.find((ps) => ps.id === p.id)?.choice
          if (!playerChoice) return p
          
          const choiceData = choices.find((c) => c.value === playerChoice)
          const pointsToAdd = choiceData?.points || 0
          
          return { ...p, score: p.score + pointsToAdd }
        })
        return updated
      })
      scoredRoundRef.current = currentRoundToUse
    }

    // Déterminer les gagnants (joueurs avec le score le plus élevé après cette manche)
    setPlayers((prev) => {
      const maxScore = Math.max(...prev.map((p) => p.score))
      const roundWinners = prev.filter((p) => p.score === maxScore && p.score > 0).map((p) => p.id)
      setWinners(roundWinners)
      return prev
    })

    // Si c'est la dernière manche, passer à l'écran de fin
    if (currentRoundToUse === maxRounds) {
      setGameStatus('gameOver')
    } else {
      setGameStatus('finished')
    }
  }

  const startRound = () => {
    setPlayers((prev) => prev.map((p) => ({ ...p, choice: null })))
    setCurrentPlayer(1)
    setWinners([])
    setGameStatus('playing')
    scoredRoundRef.current = null
  }

  const resetGame = (gameIndex = currentGameIndex) => {
    setPlayers(createPlayersForGame(gameIndex))
    setCurrentPlayer(1)
    setRound(1)
    setWinners([])
    setGameStatus('ready')
    setShowWinnerModal(false)
    setWinnerModalDismissed(false)
    scoredRoundRef.current = null
  }

  const nextRound = () => {
    if (round < maxRounds) {
      setRound(round + 1)
      startRound()
    } else {
      // Si on a atteint la dernière manche, ne pas continuer
      setGameStatus('gameOver')
    }
  }

  const getChoiceEmoji = (choice: Choice) => {
    return choices.find((c) => c.value === choice)?.emoji || '❓'
  }

  const getOverallWinner = () => {
    const maxScore = Math.max(...players.map((p) => p.score))
    return players.filter((p) => p.score === maxScore && p.score > 0)
  }

  const getFinalWinner = (): Player[] => {
    const maxScore = Math.max(...players.map((p) => p.score))
    return players.filter((p) => p.score === maxScore)
  }

  const goToNextGame = () => {
    if (currentGameIndex < totalGames - 1) {
      const nextIndex = currentGameIndex + 1
      setCurrentGameIndex(nextIndex)
      setShowWinnerModal(false)
      setWinnerModalDismissed(false)
      resetGame(nextIndex)
    }
  }

  // Fonction pour nettoyer les timeouts lors du démontage
  useEffect(() => {
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current)
      }
    }
  }, [])

  // Afficher automatiquement le modal du gagnant quand le jeu est terminé
  useEffect(() => {
    if (gameStatus === 'gameOver' && !showWinnerModal && !winnerModalDismissed) {
      const timer = setTimeout(() => {
        setShowWinnerModal(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [gameStatus, showWinnerModal, winnerModalDismissed])

  // Fonction d'automatisation pour tous les jeux
  const startAutoPlay = () => {
    const gameNumber = currentGameIndex + 1
    if (!automatedChoices[gameNumber]) return // Vérifier que le jeu a des données d'automatisation
    
    setIsAutoPlaying(true)
    isAutoPlayingRef.current = true
    resetGame(currentGameIndex) // Réinitialiser le jeu actuel
    
    // Démarrer après un court délai pour laisser le reset se terminer
    const timeoutId = setTimeout(() => {
      if (isAutoPlayingRef.current) {
        autoPlayRound(1)
      }
    }, 1000)
    autoPlayTimeoutRef.current = timeoutId as unknown as number
  }

  const autoPlayRound = (currentRound: number) => {
    const gameNumber = currentGameIndex + 1
    const gameChoices = automatedChoices[gameNumber]
    
    if (!isAutoPlayingRef.current || !gameChoices || currentRound > gameChoices.length) {
      setIsAutoPlaying(false)
      isAutoPlayingRef.current = false
      return
    }

    // Obtenir les choix pour ce round
    const roundChoices = gameChoices[currentRound - 1]
    
    // Démarrer le round
    setRound(currentRound)
    setPlayers((prev) => prev.map((p) => ({ ...p, choice: null })))
    setCurrentPlayer(1)
    setWinners([])
    setGameStatus('playing')
    scoredRoundRef.current = null

    // Jouer les choix avec des délais
    setTimeout(() => {
      if (!isAutoPlayingRef.current) return
      // Joueur 1 (OpenStack)
      setPlayers((prev) => prev.map((p) => (p.id === 1 ? { ...p, choice: roundChoices[0] } : p)))
      setCurrentPlayer(2)
    }, 1000)

    setTimeout(() => {
      if (!isAutoPlayingRef.current) return
      // Joueur 2 (Apache CloudStack)
      setPlayers((prev) => prev.map((p) => (p.id === 2 ? { ...p, choice: roundChoices[1] } : p)))
      setCurrentPlayer(3)
    }, 2000)

    setTimeout(() => {
      if (!isAutoPlayingRef.current) return
      // Joueur 3 (OpenNebula)
      setPlayers((prev) => {
        const updated = prev.map((p) => (p.id === 3 ? { ...p, choice: roundChoices[2] } : p))
        // Déterminer le gagnant - passer currentRound pour s'assurer que c'est le bon round
        setTimeout(() => {
          if (isAutoPlayingRef.current) {
            determineWinner(updated, currentRound)
          }
        }, 500)
        return updated
      })
    }, 3000)

    // Passer au round suivant après un délai
    const timeout4 = setTimeout(() => {
      if (!isAutoPlayingRef.current) return
      const gameChoices = automatedChoices[currentGameIndex + 1]
      if (currentRound < (gameChoices?.length || 0)) {
        setGameStatus('finished')
        const timeout5 = setTimeout(() => {
          if (isAutoPlayingRef.current) {
            autoPlayRound(currentRound + 1)
          }
        }, 2000)
        autoPlayTimeoutRef.current = timeout5 as unknown as number
      } else {
        // Dernier round terminé - determineWinner devrait avoir déjà mis gameStatus à 'gameOver'
        // On attend un peu plus pour s'assurer que determineWinner a fini (il a un délai de 500ms)
        setTimeout(() => {
          // S'assurer que le statut est bien 'gameOver' si ce n'est pas déjà le cas
          setGameStatus((prevStatus) => {
            if (prevStatus !== 'gameOver') {
              return 'gameOver'
            }
            return prevStatus
          })
          setIsAutoPlaying(false)
          isAutoPlayingRef.current = false
        }, 1500)
      }
    }, 4500)
    autoPlayTimeoutRef.current = timeout4 as unknown as number
  }

  const stopAutoPlay = () => {
    setIsAutoPlaying(false)
    isAutoPlayingRef.current = false
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
      autoPlayTimeoutRef.current = null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="inline-block mb-4"
        >
          <Hand className="h-16 w-16 text-indigo-600 mx-auto" />
        </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {currentGame.title}
          </h2>
          <p className="text-lg text-gray-500 mb-4">
            Game {currentGameIndex + 1} / {totalGames}
          </p>
          <div className="flex justify-center gap-4 mb-6">
            {automatedChoices[currentGameIndex + 1] && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isAutoPlaying ? stopAutoPlay : startAutoPlay}
                disabled={gameStatus === 'playing' && !isAutoPlaying}
                className={`px-6 py-2 rounded-full text-white font-semibold transition flex items-center gap-2 ${
                  isAutoPlaying
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-green-600 hover:bg-green-500'
                } ${gameStatus === 'playing' && !isAutoPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Play className={`h-4 w-4 ${isAutoPlaying ? 'hidden' : ''}`} />
                {isAutoPlaying ? 'Stop automation' : 'Auto play'}
              </motion.button>
            )}
            <button
              onClick={goToNextGame}
              disabled={currentGameIndex === totalGames - 1 || isAutoPlaying}
              className={`px-6 py-2 rounded-full text-white font-semibold transition ${
                currentGameIndex === totalGames - 1 || isAutoPlaying
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              Next game
            </button>
          </div>
        <motion.div
          key={`${currentGame.id}-${round}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <p className="text-2xl font-semibold text-indigo-600 mb-1">
            {currentGame.stages[round - 1]}
          </p>
          <p className="text-gray-600">Round {round} / {maxRounds}</p>
        </motion.div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${player.color} rounded-xl p-4 text-white shadow-lg`}
          >
            <div className="text-center">
              <p className="text-sm font-semibold mb-1">{player.name}</p>
              <p className="text-3xl font-bold">{player.score.toFixed(1)}</p>
              {player.choice && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-5xl mt-2"
                >
                  {getChoiceEmoji(player.choice)}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game Area */}
      {gameStatus === 'ready' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <button
            onClick={startRound}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start Round
          </button>
        </motion.div>
      )}

      {gameStatus === 'playing' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl"
        >
          <div className="text-center mb-6">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {players.find((p) => p.id === currentPlayer)?.name} is choosing:
            </p>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-block"
            >
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <Hand className="h-10 w-10 text-indigo-600" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {choices.map((choice) => (
              <motion.button
                key={choice.value}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChoice(choice.value)}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-indigo-500"
              >
                <div className="text-6xl mb-2">{choice.emoji}</div>
                <p className="text-sm font-semibold text-gray-700">{choice.label}</p>
                <p className="text-xs text-gray-500 mt-1">{choice.points}pt</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {gameStatus === 'finished' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl"
        >
          <div className="text-center mb-6">
            {winners.length > 0 ? (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Round finished!
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Points awarded for choices: Yes = 1pt, No = 0pt, Partial = 0.5pt
                </p>
                {winners.length > 0 && (
                  <p className="text-lg font-semibold text-indigo-600">
                    {winners.length === 1
                      ? `${players.find((p) => p.id === winners[0])?.name} leads with ${players.find((p) => p.id === winners[0])?.score.toFixed(1)} point(s)!`
                      : winners.length === 2
                        ? `${players.find((p) => p.id === winners[0])?.name} and ${players.find((p) => p.id === winners[1])?.name} are tied at ${players.find((p) => p.id === winners[0])?.score.toFixed(1)} point(s)!`
                        : 'Close match!'}
                  </p>
                )}
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-4"
                >
                  🤝
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Tie!</h3>
              </>
            )}
          </div>

          <div className="flex justify-center gap-4">
            {round < maxRounds ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextRound}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <RotateCcw className="h-5 w-5" />
                Next Round
              </motion.button>
            ) : null}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => resetGame()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              New Game
            </motion.button>
          </div>
        </motion.div>
      )}

      {gameStatus === 'gameOver' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border-4 border-yellow-400"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-6xl mb-4"
            >
              🏆
            </motion.div>
            {(() => {
              const finalWinners = getFinalWinner()
              const isTie = finalWinners.length > 1
              
              return (
                <>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {isTie
                      ? `Tie between ${finalWinners.map((w: Player) => w.name).join(' and ')}!`
                      : `${finalWinners[0].name} wins!`}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    After {maxRounds} rounds, {isTie ? 'players are tied' : 'the winner is determined'}
                  </p>
                </>
              )
            })()}
            <div className="bg-white rounded-xl p-4 shadow-md inline-block min-w-[300px]">
              <p className="text-2xl font-bold text-indigo-600 mb-3">Final Score</p>
              <div className="space-y-2">
                {[...players]
                  .sort((a, b) => b.score - a.score)
                  .map((player, idx) => {
                    const finalWinners = getFinalWinner()
                    const isWinner = finalWinners.some((w: Player) => w.id === player.id)
                    
                    return (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-3 rounded-lg ${
                          isWinner
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            {isWinner && '👑 '}
                            {player.name}
                          </span>
                          <span className="text-xl">{player.score.toFixed(1)} point(s)</span>
                        </div>
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => resetGame()}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <RotateCcw className="h-6 w-6" />
              New Game
            </motion.button>
            {currentGameIndex < totalGames - 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNextGame}
                className="px-8 py-4 bg-indigo-100 text-indigo-700 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
              >
                Skip to next game
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Overall Winner - Afficher seulement si le jeu n'est pas terminé */}
      {gameStatus !== 'gameOver' && round > 1 && getOverallWinner().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-center text-white shadow-lg"
        >
          <Trophy className="h-8 w-8 mx-auto mb-2" />
          <p className="font-bold">
            {getOverallWinner().length === 1
              ? `${getOverallWinner()[0].name} leads with ${getOverallWinner()[0].score} point(s)!`
              : 'Close match!'}
          </p>
        </motion.div>
      )}

      {/* Winner Modal - Affiche automatiquement le gagnant avec justification */}
      {gameStatus === 'gameOver' && (() => {
        const finalWinners = getFinalWinner()
        const winner = finalWinners.length > 0 ? finalWinners[0] : null
        const justification = winner && currentGameIndex < gameJustifications.length 
          ? gameJustifications[currentGameIndex] 
          : ''
        
        if (!winner) return null
        
        return (
          <WinnerModal
            isOpen={showWinnerModal}
            onClose={() => {
              setShowWinnerModal(false)
              setWinnerModalDismissed(true)
            }}
            winnerName={winner.name}
            justification={justification}
          />
        )
      })()}
    </div>
  )
}

