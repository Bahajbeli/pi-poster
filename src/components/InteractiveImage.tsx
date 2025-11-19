import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info, Edit2 } from 'lucide-react'
import ImageEditor from './ImageEditor'

interface Hotspot {
  id: string
  x: number // pourcentage
  y: number // pourcentage
  width: number // pourcentage
  height: number // pourcentage
  title: string
  description: string
  layer: string
}

interface InteractiveImageProps {
  imageSrc: string
  hotspots: Hotspot[]
  selectedComponent?: string | null
  onComponentSelect?: (id: string | null) => void
}

export default function InteractiveImage({
  imageSrc,
  hotspots,
  selectedComponent,
  onComponentSelect,
}: InteractiveImageProps) {
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [debugMode, setDebugMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [localHotspots, setLocalHotspots] = useState<Hotspot[]>(hotspots)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Charger depuis localStorage si disponible
    const saved = localStorage.getItem('architecture-hotspots')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setLocalHotspots(parsed)
      } catch (e) {
        setLocalHotspots(hotspots)
      }
    } else {
      setLocalHotspots(hotspots)
    }
  }, [hotspots])

  useEffect(() => {
    // Mettre à jour le hotspot sélectionné mais ne pas ouvrir la popup automatiquement
    if (selectedComponent) {
      const hotspot = localHotspots.find((h) => h.id === selectedComponent)
      if (hotspot) {
        setSelectedHotspot(hotspot)
      }
    } else {
      setSelectedHotspot(null)
      setShowPopup(false)
    }
  }, [selectedComponent, localHotspots])

  const handleHotspotClick = (hotspot: Hotspot) => {
    // Clic direct sur l'image → ouvrir la popup
    setShowPopup(true)
    onComponentSelect?.(hotspot.id)
  }

  const closeModal = () => {
    setShowPopup(false)
    // Ne pas désélectionner le composant, juste fermer la popup
  }

  return (
    <div className="relative w-full" ref={imageRef}>
      {/* Contrôles */}
      <div className="mb-4 flex justify-end gap-2">
        <button
          onClick={() => setEditMode(true)}
          className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" />
          Edit Hotspots
        </button>
        <button
          onClick={() => setDebugMode(!debugMode)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
        >
          {debugMode ? 'Disable Debug' : 'Enable Debug'}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-lg border-4 border-indigo-200 shadow-xl">
        <img
          src={imageSrc}
          alt="Architecture Cloud Infrastructure"
          className="w-full h-auto object-contain"
        />

        {/* Overlay avec hotspots */}
        <div className="absolute inset-0">
          {localHotspots.map((hotspot) => {
            const isSelected = selectedComponent === hotspot.id
            const isHovered = hoveredHotspot === hotspot.id

            return (
              <motion.div
                key={hotspot.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: `${hotspot.width}%`,
                  height: `${hotspot.height}%`,
                }}
                initial={false}
                animate={{
                  backgroundColor: isSelected
                    ? 'rgba(99, 102, 241, 0.3)'
                    : isHovered
                      ? 'rgba(99, 102, 241, 0.2)'
                      : 'rgba(99, 102, 241, 0)',
                  borderColor: isSelected
                    ? 'rgb(99, 102, 241)'
                    : isHovered
                      ? 'rgb(99, 102, 241)'
                      : 'transparent',
                  borderWidth: isSelected ? '4px' : isHovered ? '3px' : '0px',
                  boxShadow: isSelected
                    ? '0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(99, 102, 241, 0.4)'
                    : 'none',
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                onHoverStart={() => setHoveredHotspot(hotspot.id)}
                onHoverEnd={() => setHoveredHotspot(null)}
                onClick={() => handleHotspotClick(hotspot)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animation de pulse pour la sélection */}
                {isSelected && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-lg border-4 border-indigo-400"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 0.4, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-indigo-300"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 0.2, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.3,
                      }}
                    />
                    {/* Effet de vague/ripple */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-radial from-indigo-500/20 to-transparent"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [0.8, 1.2, 1.4],
                        opacity: [0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  </>
                )}
                {/* Tooltip au hover */}
                {isHovered && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10"
                  >
                    <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-xl whitespace-nowrap">
                      {hotspot.title}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Badge de sélection animé */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                    className="absolute -top-3 -right-3 z-20"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(99, 102, 241, 0.7)',
                          '0 0 0 10px rgba(99, 102, 241, 0)',
                          '0 0 0 0 rgba(99, 102, 241, 0)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      className="bg-indigo-600 rounded-full p-2 shadow-lg"
                    >
                      <Info className="h-5 w-5 text-white" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Label animé pour la sélection */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap"
                    >
                      {hotspot.title}
                    </motion.div>
                  </motion.div>
                )}

                {/* Debug Info */}
                {debugMode && (
                  <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs p-1 rounded whitespace-nowrap z-20">
                    {hotspot.title} ({hotspot.x}%, {hotspot.y}%)
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Éditeur de hotspots */}
      <AnimatePresence>
        {editMode && (
          <ImageEditor
            imageSrc={imageSrc}
            hotspots={localHotspots}
            onHotspotsChange={(newHotspots) => {
              setLocalHotspots(newHotspots)
              // Optionnel: sauvegarder dans localStorage
              localStorage.setItem('architecture-hotspots', JSON.stringify(newHotspots))
            }}
            onClose={() => setEditMode(false)}
          />
        )}
      </AnimatePresence>

      {/* Modal Popup Professionnelle - Seulement si cliqué directement sur l'image */}
      <AnimatePresence>
        {selectedHotspot && showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
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
                className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-200"
              >
                {/* Header avec gradient animé */}
                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white p-8 overflow-hidden">
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
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
                      >
                        <Info className="h-8 w-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold mb-1">{selectedHotspot.title}</h3>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                            {selectedHotspot.layer}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                    >
                      <X className="h-6 w-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Contenu avec animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 bg-gradient-to-br from-gray-50 to-white"
                >
                  <div className="prose prose-lg max-w-none">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-700 leading-relaxed text-lg"
                    >
                      {selectedHotspot.description}
                    </motion.p>
                  </div>

                  {/* Footer décoratif */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      <span>Active component</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeModal}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

