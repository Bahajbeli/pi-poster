import { motion, AnimatePresence } from 'framer-motion'
import { X, User } from 'lucide-react'

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  userName: string
}

export default function UserProfileModal({
  isOpen,
  onClose,
  imageSrc,
  userName,
}: UserProfileModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={onClose}
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
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 flex flex-col"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 overflow-hidden">
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
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
                    >
                      <User className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">User Profile</h3>
                      <p className="text-indigo-100 text-sm">Component Owner</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
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
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* User Image */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-50"></div>
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-indigo-200">
                      <img
                        src={imageSrc}
                        alt={userName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback si l'image n'existe pas
                          const target = e.target as HTMLImageElement
                          target.src = `data:image/svg+xml,${encodeURIComponent(`
                            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                              <rect width="200" height="200" fill="#e0e7ff"/>
                              <text x="50%" y="50%" font-family="Arial" font-size="60" fill="#6366f1" text-anchor="middle" dominant-baseline="middle">${userName.charAt(0).toUpperCase()}</text>
                            </svg>
                          `)}`
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* User Name */}
                  {userName && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <User className="h-5 w-5 text-indigo-600" />
                        <h4 className="text-2xl font-bold text-gray-800">{userName}</h4>
                      </div>
                      <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto"></div>
                    </motion.div>
                  )}

                  {/* Decorative Elements */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-2 mt-4"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-indigo-400"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

