import React from 'react'
import { motion } from 'framer-motion'

const TypingIndicator = () => {
  const dotVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-1 px-4 py-3 bg-gray-800 rounded-2xl rounded-bl-none w-fit"
    >
      <motion.span variants={dotVariants} animate="animate" className="w-2 h-2 bg-gray-500 rounded-full" />
      <motion.span
        variants={dotVariants}
        animate="animate"
        transition={{ delay: 0.1 }}
        className="w-2 h-2 bg-gray-500 rounded-full"
      />
      <motion.span
        variants={dotVariants}
        animate="animate"
        transition={{ delay: 0.2 }}
        className="w-2 h-2 bg-gray-500 rounded-full"
      />
    </motion.div>
  )
}

export default TypingIndicator
