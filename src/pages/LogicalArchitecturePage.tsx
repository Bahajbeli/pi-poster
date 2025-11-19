import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { logicalArchitecture, componentInteractions } from '../data/infrastructureData'

export default function LogicalArchitecturePage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
            <Layers className="h-12 w-12" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-gray-900">Logical Architecture</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Layered architecture overview and component interactions
          </p>
        </div>

        {/* Layered Architecture Overview */}
        <section className="mb-12 rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Layered Architecture Overview
          </h2>

          <div className="space-y-6">
            {logicalArchitecture.map((layer, index) => (
              <div
                key={index}
                className={`rounded-xl border-2 ${layer.borderColor} bg-gradient-to-r ${layer.gradientFrom} ${layer.gradientTo} p-6`}
              >
                <h3 className={`mb-4 flex items-center text-xl font-bold ${layer.textColor}`}>
                  <layer.icon className="mr-3 h-6 w-6" />
                  {layer.title}
                </h3>
                <div
                  className={`grid gap-4 ${
                    layer.items.length === 2
                      ? 'sm:grid-cols-2'
                      : layer.items.length === 3
                        ? 'sm:grid-cols-2 lg:grid-cols-3'
                        : 'sm:grid-cols-2 lg:grid-cols-4'
                  }`}
                >
                  {layer.items.map((item, itemIndex) => {
                    const isSelected = selected === item.title
                    return (
                      <motion.div
                        key={itemIndex}
                        className={`rounded-lg bg-white p-4 text-center shadow-md cursor-pointer relative overflow-hidden ${
                          isSelected ? 'ring-4 ring-indigo-500 ring-offset-2' : 'hover:shadow-lg'
                        }`}
                        onClick={() => setSelected(item.title)}
                        whileHover={{ scale: 1.04, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          backgroundColor: isSelected ? 'rgb(238,242,255)' : 'white',
                        }}
                        transition={{ delay: itemIndex * 0.06 }}
                      >
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          />
                        )}
                        <motion.div
                          className="relative z-10"
                          animate={{ scale: isSelected ? 1.08 : 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          <item.icon className={`mx-auto mb-2 h-8 w-8 ${item.color}`} />
                        </motion.div>
                        <p className="mb-1 text-sm font-semibold text-gray-800 relative z-10">{item.title}</p>
                        <p className="text-xs text-gray-600 relative z-10">{item.subtitle}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Component Interactions */}
        <section className="rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Component Interactions</h2>
          <div className="space-y-4">
            {componentInteractions.map((interaction, index) => (
              <div
                key={index}
                className="flex items-start rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm transition-all hover:shadow-md"
              >
                <span className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-gray-700">{interaction}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

