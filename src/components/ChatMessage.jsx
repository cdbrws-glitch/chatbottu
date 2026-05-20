import React from 'react'
import { motion } from 'framer-motion'

const ChatMessage = ({ message, userName }) => {
  const isAssistant = message.sender === 'assistant'
  const timeString = message.timestamp.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} gap-2`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isAssistant
            ? 'bg-gray-800 text-gray-100 rounded-bl-none'
            : 'bg-blue-600 text-white rounded-br-none'
        } shadow-md`}
      >
        <p className="text-sm break-words">{message.text}</p>
        <p className="text-xs mt-1 opacity-60">{timeString}</p>
      </div>
    </motion.div>
  )
}

export default ChatMessage
