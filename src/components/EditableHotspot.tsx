import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Hotspot {
  id: string
  x: number
  y: number
  width: number
  height: number
  title: string
  description: string
  layer: string
}

interface EditableHotspotProps {
  hotspot: Hotspot
  isSelected: boolean
  onSelect: () => void
  onUpdate: (hotspot: Hotspot) => void
  onDelete: () => void
  imageRect: DOMRect | null
}

export default function EditableHotspot({
  hotspot,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  imageRect,
}: EditableHotspotProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const hotspotRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === hotspotRef.current || (e.target as HTMLElement).closest('.hotspot-content')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - (hotspot.x * (imageRect?.width || 0)) / 100,
        y: e.clientY - (hotspot.y * (imageRect?.height || 0)) / 100,
      })
      onSelect()
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!imageRect) return

    if (isDragging) {
      const newX = ((e.clientX - dragStart.x) / imageRect.width) * 100
      const newY = ((e.clientY - dragStart.y) / imageRect.height) * 100

      onUpdate({
        ...hotspot,
        x: Math.max(0, Math.min(100 - hotspot.width, newX)),
        y: Math.max(0, Math.min(100 - hotspot.height, newY)),
      })
    } else if (isResizing && resizeHandle) {
      const rect = imageRect
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100

      let newHotspot = { ...hotspot }

      if (resizeHandle.includes('right')) {
        newHotspot.width = Math.max(5, Math.min(100 - hotspot.x, mouseX - hotspot.x))
      }
      if (resizeHandle.includes('left')) {
        const newWidth = hotspot.width + (hotspot.x - mouseX)
        if (newWidth > 5 && hotspot.x > 0) {
          newHotspot.x = Math.max(0, mouseX)
          newHotspot.width = newWidth
        }
      }
      if (resizeHandle.includes('bottom')) {
        newHotspot.height = Math.max(5, Math.min(100 - hotspot.y, mouseY - hotspot.y))
      }
      if (resizeHandle.includes('top')) {
        const newHeight = hotspot.height + (hotspot.y - mouseY)
        if (newHeight > 5 && hotspot.y > 0) {
          newHotspot.y = Math.max(0, mouseY)
          newHotspot.height = newHeight
        }
      }

      onUpdate(newHotspot)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
    setResizeHandle(null)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, resizeHandle, imageRect, dragStart, hotspot])

  const handleResizeStart = (handle: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeHandle(handle)
    onSelect()
  }

  return (
    <motion.div
      ref={hotspotRef}
      className={`absolute cursor-move group ${
        isSelected ? 'z-30' : 'z-10'
      }`}
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
        width: `${hotspot.width}%`,
        height: `${hotspot.height}%`,
      }}
      onMouseDown={handleMouseDown}
      initial={false}
      animate={{
        borderColor: isSelected ? 'rgb(99, 102, 241)' : 'rgba(99, 102, 241, 0.3)',
        borderWidth: isSelected ? '3px' : '2px',
        backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.05)',
      }}
    >
      {/* Contenu du hotspot */}
      <div className="hotspot-content w-full h-full flex items-center justify-center">
        {isSelected && (
          <div className="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
            {hotspot.title}
          </div>
        )}
      </div>

      {/* Handles de redimensionnement */}
      {isSelected && (
        <>
          {/* Coin supérieur gauche */}
          <div
            className="absolute -top-2 -left-2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-nwse-resize z-40"
            onMouseDown={handleResizeStart('top-left')}
          />
          {/* Coin supérieur droit */}
          <div
            className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-nesw-resize z-40"
            onMouseDown={handleResizeStart('top-right')}
          />
          {/* Coin inférieur gauche */}
          <div
            className="absolute -bottom-2 -left-2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-nesw-resize z-40"
            onMouseDown={handleResizeStart('bottom-left')}
          />
          {/* Coin inférieur droit */}
          <div
            className="absolute -bottom-2 -right-2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-nwse-resize z-40"
            onMouseDown={handleResizeStart('bottom-right')}
          />
          {/* Milieu haut */}
          <div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-ns-resize z-40"
            onMouseDown={handleResizeStart('top')}
          />
          {/* Milieu bas */}
          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-ns-resize z-40"
            onMouseDown={handleResizeStart('bottom')}
          />
          {/* Milieu gauche */}
          <div
            className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-ew-resize z-40"
            onMouseDown={handleResizeStart('left')}
          />
          {/* Milieu droit */}
          <div
            className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full cursor-ew-resize z-40"
            onMouseDown={handleResizeStart('right')}
          />
        </>
      )}

      {/* Bouton de suppression */}
      {isSelected && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 z-50"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <X className="h-3 w-3" />
        </motion.button>
      )}
    </motion.div>
  )
}

