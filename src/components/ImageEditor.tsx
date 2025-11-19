import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Save, X, Edit2, Eye, Download, Upload } from 'lucide-react'
import EditableHotspot from './EditableHotspot'
import type { Hotspot } from '../data/imageHotspots'

interface ImageEditorProps {
  imageSrc: string
  hotspots: Hotspot[]
  onHotspotsChange: (hotspots: Hotspot[]) => void
  onClose: () => void
}

export default function ImageEditor({
  imageSrc,
  hotspots,
  onHotspotsChange,
  onClose,
}: ImageEditorProps) {
  const [localHotspots, setLocalHotspots] = useState<Hotspot[]>(hotspots)
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null)
  const [imageRect, setImageRect] = useState<DOMRect | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateImageRect = () => {
      if (imageRef.current) {
        setImageRect(imageRef.current.getBoundingClientRect())
      }
    }

    updateImageRect()
    window.addEventListener('resize', updateImageRect)
    return () => window.removeEventListener('resize', updateImageRect)
  }, [])

  const handleAddHotspot = () => {
    const newHotspot: Hotspot = {
      id: `hotspot-${Date.now()}`,
      x: 10,
      y: 10,
      width: 15,
      height: 10,
      title: 'Nouveau Composant',
      description: 'Description du composant',
      layer: 'Infrastructure Layer',
    }
    setLocalHotspots([...localHotspots, newHotspot])
    setSelectedHotspotId(newHotspot.id)
  }

  const handleUpdateHotspot = (updatedHotspot: Hotspot) => {
    setLocalHotspots(
      localHotspots.map((h) => (h.id === updatedHotspot.id ? updatedHotspot : h))
    )
  }

  const handleDeleteHotspot = (id: string) => {
    setLocalHotspots(localHotspots.filter((h) => h.id !== id))
    if (selectedHotspotId === id) {
      setSelectedHotspotId(null)
    }
  }

  const handleSave = () => {
    onHotspotsChange(localHotspots)
    onClose()
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(localHotspots, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'hotspots-config.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target?.result as string) as Hotspot[]
            setLocalHotspots(imported)
          } catch (error) {
            alert('Erreur lors de l\'importation du fichier')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const selectedHotspot = localHotspots.find((h) => h.id === selectedHotspotId)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Edit2 className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Éditeur de Hotspots</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Zone d'édition de l'image */}
          <div className="flex-1 p-6 overflow-auto">
            <div ref={containerRef} className="relative inline-block">
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Architecture"
                className="max-w-full h-auto border-4 border-gray-200 rounded-lg"
              />

              {/* Hotspots éditables */}
              <div className="absolute inset-0">
                {localHotspots.map((hotspot) => (
                  <EditableHotspot
                    key={hotspot.id}
                    hotspot={hotspot}
                    isSelected={selectedHotspotId === hotspot.id}
                    onSelect={() => setSelectedHotspotId(hotspot.id)}
                    onUpdate={handleUpdateHotspot}
                    onDelete={() => handleDeleteHotspot(hotspot.id)}
                    imageRect={imageRect}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Panneau de contrôle */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-4 space-y-2 border-b border-gray-200">
              <button
                onClick={handleAddHotspot}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Ajouter un Hotspot
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleExport}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Exporter
                </button>
                <button
                  onClick={handleImport}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Upload className="h-4 w-4" />
                  Importer
                </button>
              </div>
            </div>

            {/* Éditeur de hotspot sélectionné */}
            <div className="flex-1 overflow-y-auto p-4">
              {selectedHotspot ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800">Propriétés du Hotspot</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={selectedHotspot.title}
                      onChange={(e) =>
                        handleUpdateHotspot({ ...selectedHotspot, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={selectedHotspot.description}
                      onChange={(e) =>
                        handleUpdateHotspot({ ...selectedHotspot, description: e.target.value })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Couche</label>
                    <select
                      value={selectedHotspot.layer}
                      onChange={(e) =>
                        handleUpdateHotspot({ ...selectedHotspot, layer: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option>Management & Monitoring Layer</option>
                      <option>Orchestration Layer</option>
                      <option>Application & Container Layer</option>
                      <option>Infrastructure Layer</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">X (%)</label>
                      <input
                        type="number"
                        value={selectedHotspot.x.toFixed(2)}
                        onChange={(e) =>
                          handleUpdateHotspot({
                            ...selectedHotspot,
                            x: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Y (%)</label>
                      <input
                        type="number"
                        value={selectedHotspot.y.toFixed(2)}
                        onChange={(e) =>
                          handleUpdateHotspot({
                            ...selectedHotspot,
                            y: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Largeur (%)
                      </label>
                      <input
                        type="number"
                        value={selectedHotspot.width.toFixed(2)}
                        onChange={(e) =>
                          handleUpdateHotspot({
                            ...selectedHotspot,
                            width: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hauteur (%)
                      </label>
                      <input
                        type="number"
                        value={selectedHotspot.height.toFixed(2)}
                        onChange={(e) =>
                          handleUpdateHotspot({
                            ...selectedHotspot,
                            height: parseFloat(e.target.value) || 0,
                          })
                        }
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Sélectionnez un hotspot pour l'éditer</p>
                </div>
              )}
            </div>

            {/* Footer avec bouton sauvegarder */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg"
              >
                <Save className="h-5 w-5" />
                Sauvegarder les Modifications
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

