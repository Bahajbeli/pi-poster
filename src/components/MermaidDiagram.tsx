import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  diagram: string
  id: string
}

export default function MermaidDiagram({ diagram, id }: MermaidDiagramProps) {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
    })

    if (mermaidRef.current && !isRendered) {
      const renderDiagram = async () => {
        try {
          const { svg } = await mermaid.render(`${id}-svg`, diagram)
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg
            setIsRendered(true)
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error)
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = `<p class="text-red-600">Erreur de rendu du diagramme: ${error}</p>`
          }
        }
      }
      renderDiagram()
    }
  }, [diagram, id, isRendered])

  return (
    <div className="mermaid-container my-6 rounded-lg bg-white p-6 shadow-lg overflow-x-auto">
      <div ref={mermaidRef} className="mermaid" id={id}></div>
    </div>
  )
}

