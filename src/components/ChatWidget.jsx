import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import { matchIntent } from '../utils/intentMatcher'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage'
import messages from '../data/messages.json'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hola, soy el asistente virtual de Todos Unidos. ¿En qué puedo ayudarte?",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState(null)
  const [currentFlow, setCurrentFlow] = useState(null)
  const [flowData, setFlowData] = useState({})
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const getTimeString = () => {
    const now = new Date()
    return now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  }

  const getResponse = (intent, confidence) => {
    const intentData = messages.intents[intent]
    if (intentData && intentData.responses.length > 0) {
      return intentData.responses[Math.floor(Math.random() * intentData.responses.length)]
    }
    return messages.intents.fallback.responses[Math.floor(Math.random() * messages.intents.fallback.responses.length)]
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setChatMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const { intent, confidence, extractedName } = matchIntent(inputValue)

    if (extractedName && !userName) {
      setUserName(extractedName)
    }

    if (currentFlow === 'sumarse') {
      handleSumarseFlow(inputValue)
    } else if (currentFlow === 'problemas_barriales') {
      handleProblemasBarrialesFlow(inputValue)
    } else if (currentFlow === 'contacto') {
      handleContactoFlow(inputValue)
    } else if (intent === 'sumarse') {
      setCurrentFlow('sumarse')
      setFlowData({})
      const response = getResponse(intent, confidence)
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response + '\n\n¿Cuál es tu nombre?',
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (intent === 'problemas_barriales') {
      setCurrentFlow('problemas_barriales')
      setFlowData({})
      const response = getResponse(intent, confidence)
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response + '\n\n¿En qué barrio o localidad?',
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (intent === 'contacto') {
      setCurrentFlow('contacto')
      setFlowData({})
      const response = getResponse(intent, confidence)
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response + '\n\n¿Cuál es tu nombre?',
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else {
      const response = getResponse(intent, confidence)
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    }

    setIsTyping(false)
  }

  const handleSumarseFlow = (input) => {
    const currentStep = flowData.step || 0

    if (currentStep === 0) {
      setFlowData({ ...flowData, nombre: input, step: 1 })
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Perfecto, ${input}. ¿De qué barrio o localidad sos?`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (currentStep === 1) {
      setFlowData({ ...flowData, localidad: input, step: 2 })
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Genial. ¿Dejás tu teléfono o WhatsApp? (opcional, podés escribir "pasar")`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (currentStep === 2) {
      const telefono = input.toLowerCase() === 'pasar' ? null : input
      setFlowData({ ...flowData, telefono, step: 3 })
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Perfecto. ¿En qué te gustaría colaborar? (comunicación, territorio, actividades, otra cosa...)`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (currentStep === 3) {
      const lead = {
        nombre: flowData.nombre,
        localidad: flowData.localidad,
        telefono: flowData.telefono,
        interes: input,
        timestamp: new Date().toISOString(),
      }
      saveToLocalStorage('lead_sumarse', lead)
      setFlowData({})
      setCurrentFlow(null)
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `¡Excelente! Registramos tus datos. El equipo se va a contactar pronto. ¿Hay algo más en lo que pueda ayudarte?`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    }
  }

  const handleProblemasBarrialesFlow = (input) => {
    const currentStep = flowData.step || 0

    if (currentStep === 0) {
      setFlowData({ ...flowData, localidad: input, step: 1 })
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `${input}, anotado. ¿Cuál es el problema que querés reportar?`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (currentStep === 1) {
      setFlowData({ ...flowData, descripcion: input, step: 2 })
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Entendido. ¿Dejás tu contacto para seguimiento? (opcional, podés escribir "no")`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (currentStep === 2) {
      const contacto = input.toLowerCase() === 'no' ? null : input
      const consulta = {
        localidad: flowData.localidad,
        descripcion: flowData.descripcion,
        contacto: contacto,
        timestamp: new Date().toISOString(),
      }
      saveToLocalStorage('consulta_territorial', consulta)
      setFlowData({})
      setCurrentFlow(null)
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Registramos tu consulta. Vamos a analizarla y contactarnos si es necesario. ¿Hay algo más?`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    }
  }

  const handleContactoFlow = (input) => {
    const currentStep = flowData.step || 0

    if (currentStep === 0) {
      setFlowData({ ...flowData, nombre: input, step: 1 })
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Perfecto, ${input}. ¿Tu teléfono o WhatsApp?`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (currentStep === 1) {
      setFlowData({ ...flowData, telefono: input, step: 2 })
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Anotado. ¿Cuál es el motivo de tu consulta?`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    } else if (currentStep === 2) {
      const contacto = {
        nombre: flowData.nombre,
        telefono: flowData.telefono,
        motivo: input,
        timestamp: new Date().toISOString(),
      }
      saveToLocalStorage('contacto_humano', contacto)
      setFlowData({})
      setCurrentFlow(null)
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Perfecto. Tomamos tu datos y pronto alguien del equipo te va a contactar. ¡Gracias!`,
        sender: 'assistant',
        timestamp: new Date(),
      }])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-96 max-w-[calc(100vw-48px)] h-[600px] rounded-2xl shadow-2xl flex flex-col bg-gray-900 border border-gray-800 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-white font-semibold">Todos Unidos</h2>
                  <p className="text-xs text-gray-400">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-900">
              {chatMessages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} userName={userName} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-gray-700 p-4 bg-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribí tu consulta…"
                  className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-full p-2 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-2.965 5.951 2.965a1 1 0 001.169-1.409l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - More Prominent */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all"
      >
        {/* Pulsing background */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
        ></motion.div>

        {/* Icon */}
        {isOpen ? (
          <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
              <path d="M2 5h16v.5a1 1 0 01-1 1h-14a1 1 0 01-1-1V5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</span>
          </div>
        )}

        {/* Animated text when closed */}
        {!isOpen && (
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -bottom-12 whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            👋 ¡Hola! Hablemos
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}

export default ChatWidget
