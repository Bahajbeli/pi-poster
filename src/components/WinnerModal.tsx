import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'

interface WinnerModalProps {
  isOpen: boolean
  onClose: () => void
  winnerName: string
  justification: string
}

export default function WinnerModal({
  isOpen,
  onClose,
  winnerName,
  justification,
}: WinnerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-6 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <div className="relative flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
                    >
                      <Trophy className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Game Winner</h3>
                      <p className="text-yellow-100 text-sm">Congratulations!</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onClose()
                    }}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm cursor-pointer"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Winner Name */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="inline-block mb-4"
                    >
                      <div className="text-6xl">🏆</div>
                    </motion.div>
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl font-bold text-gray-800 mb-2"
                    >
                      {winnerName}
                    </motion.h4>
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.5 }}
                      className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"
                    />
                  </div>

                  {/* Justification */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500"
                  >
                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                      Justification:
                    </h5>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {justification}
                    </p>
                  </motion.div>

                  {/* Decorative Elements */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center gap-2"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-orange-400"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

