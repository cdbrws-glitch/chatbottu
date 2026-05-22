import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState({})
  const [editingIntent, setEditingIntent] = useState(null)
  const [newIntentName, setNewIntentName] = useState('')
  const [newKeywords, setNewKeywords] = useState('')
  const [newResponses, setNewResponses] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const ADMIN_USERNAME = 'cdbrws'
  const ADMIN_PASSWORD = 'asdluana12'

  // Cargar mensajes
  useEffect(() => {
    const stored = localStorage.getItem('chat_messages')
    if (stored) {
      try {
        setMessages(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading messages:', e)
      }
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setUsername('')
      setPassword('')
      showSuccess('✅ Bienvenido al Admin Panel')
    } else {
      alert('❌ Credenciales incorrectas')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setEditingIntent(null)
  }

  const showSuccess = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFileContent(event.target.result)
      }
      reader.readAsText(file)
    }
  }

  const parseFileContent = () => {
    const lines = fileContent.split('\n').filter(l => l.trim())
    const newIntents = { ...messages }

    let currentIntent = null
    let currentKeywords = []
    let currentResponses = []

    lines.forEach(line => {
      const trimmed = line.trim()

      // Detectar nuevo intent [INTENT_NAME]
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        if (currentIntent) {
          newIntents[currentIntent] = {
            keywords: currentKeywords,
            responses: currentResponses
          }
        }
        currentIntent = trimmed.slice(1, -1).toLowerCase().replace(/\s+/g, '_')
        currentKeywords = []
        currentResponses = []
      }
      // Detectar keywords con "keywords: valor1, valor2"
      else if (trimmed.toLowerCase().startsWith('keywords:')) {
        const kw = trimmed.replace(/^keywords:/i, '').split(',').map(k => k.trim()).filter(k => k)
        currentKeywords = kw
      }
      // Detectar respuestas
      else if (trimmed.toLowerCase().startsWith('response:') || trimmed.toLowerCase().startsWith('responses:')) {
        const resp = trimmed.replace(/^responses?:/i, '').trim()
        if (resp) currentResponses.push(resp)
      }
      else if (currentIntent && trimmed && !trimmed.startsWith('-')) {
        currentResponses.push(trimmed)
      }
    })

    // Guardar último intent
    if (currentIntent) {
      newIntents[currentIntent] = {
        keywords: currentKeywords,
        responses: currentResponses
      }
    }

    setMessages(newIntents)
    localStorage.setItem('chat_messages', JSON.stringify(newIntents))
    setFileContent('')
    setShowFileUpload(false)
    showSuccess(`✅ ${Object.keys(newIntents).length} intents cargados correctamente`)
  }

  const handleAddIntent = () => {
    if (!newIntentName.trim()) {
      alert('❌ El nombre del intent no puede estar vacío')
      return
    }

    const keywords = newKeywords.split(',').map(k => k.trim()).filter(k => k)
    const responses = newResponses.split('\n').filter(r => r.trim())

    if (keywords.length === 0 || responses.length === 0) {
      alert('❌ Debe haber al menos 1 keyword y 1 respuesta')
      return
    }

    const intentKey = newIntentName.toLowerCase().replace(/\s+/g, '_')
    const updated = {
      ...messages,
      [intentKey]: {
        keywords,
        responses
      }
    }

    setMessages(updated)
    localStorage.setItem('chat_messages', JSON.stringify(updated))
    setNewIntentName('')
    setNewKeywords('')
    setNewResponses('')
    showSuccess(`✅ Intent "${intentKey}" creado correctamente`)
  }

  const handleUpdateIntent = (intentName) => {
    const keywords = newKeywords.split(',').map(k => k.trim()).filter(k => k)
    const responses = newResponses.split('\n').filter(r => r.trim())

    const updated = {
      ...messages,
      [intentName]: {
        keywords,
        responses
      }
    }

    setMessages(updated)
    localStorage.setItem('chat_messages', JSON.stringify(updated))
    setEditingIntent(null)
    setNewKeywords('')
    setNewResponses('')
    showSuccess(`✅ Intent "${intentName}" actualizado`)
  }

  const handleDeleteIntent = (intentName) => {
    if (window.confirm(`⚠️ ¿Estás seguro de que querés eliminar "${intentName}"?`)) {
      const updated = { ...messages }
      delete updated[intentName]
      setMessages(updated)
      localStorage.setItem('chat_messages', JSON.stringify(updated))
      showSuccess(`✅ Intent "${intentName}" eliminado`)
    }
  }

  const downloadJSON = () => {
    const dataStr = JSON.stringify({ intents: messages }, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'messages.json'
    link.click()
  }

  const downloadTemplate = () => {
    const template = `[nombre_del_intent]
keywords: palabra1, palabra2, palabra3, palabra4
response: Primera respuesta posible
response: Segunda respuesta alternativa
response: Tercera opción de respuesta

[otro_intent]
keywords: clave1, clave2, clave3
response: Respuesta para este intent
response: Otra respuesta válida

[toro_negro]
keywords: toro negro, zona, barrio norte, toro
response: Toro Negro es una zona importante donde trabajamos activamente
response: En Toro Negro hay actividades, reuniones y trabajo territorial
response: ¿Querés reportar un problema o proponer algo en Toro Negro?`

    const dataBlob = new Blob([template], { type: 'text/plain' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'template.txt'
    link.click()
  }

  // LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🔐 Admin Panel</h1>
            <p className="text-gray-600">Todos Unidos - Gestor de Contenidos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                placeholder="cdbrws"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 font-semibold mb-2">Credenciales de Demo:</p>
            <p className="text-sm text-gray-600">
              Usuario: <code className="bg-gray-100 px-2 py-1 rounded font-mono">cdbrws</code><br />
              Pass: <code className="bg-gray-100 px-2 py-1 rounded font-mono">asdluana12</code>
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // ADMIN PAGE
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🔐 Admin Panel - Todos Unidos</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition-all"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-500 text-white p-4 text-center font-semibold"
        >
          {successMessage}
        </motion.div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Action Buttons */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setShowFileUpload(!showFileUpload)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center"
          >
            📤 Cargar TXT
          </button>
          <button
            onClick={downloadTemplate}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center"
          >
            📋 Descargar Template
          </button>
          <button
            onClick={downloadJSON}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center"
          >
            📥 Descargar JSON
          </button>
          <button
            onClick={() => setEditingIntent('NEW')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 justify-center"
          >
            ➕ Nuevo Intent
          </button>
        </div>

        {/* File Upload Section */}
        {showFileUpload && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 mb-8 border-2 border-blue-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📄 Cargar Datos desde TXT</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Formato esperado del archivo TXT:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto mb-4 border border-gray-300">
{`[nombre_intent]
keywords: palabra1, palabra2, palabra3
response: Primera respuesta
response: Segunda respuesta

[otro_intent]
keywords: clave1, clave2
response: Respuesta 1`}
            </pre>

            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

            {fileContent && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded max-h-48 overflow-y-auto text-sm border border-gray-300">
                  <p className="text-gray-700 font-mono whitespace-pre-wrap text-xs">{fileContent}</p>
                </div>
                <button
                  onClick={parseFileContent}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  ✅ Cargar Datos
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* New/Edit Intent Section */}
        {editingIntent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 mb-8 border-2 border-cyan-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingIntent === 'NEW' ? '➕ Nuevo Intent' : `✏️ Editando: ${editingIntent}`}
            </h2>

            {editingIntent === 'NEW' && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Intent
                </label>
                <input
                  type="text"
                  value={newIntentName}
                  onChange={(e) => setNewIntentName(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  placeholder="ej: toro_negro, actividades, etc."
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords (separadas por comas)
              </label>
              <input
                type="text"
                value={newKeywords}
                onChange={(e) => setNewKeywords(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                placeholder="toro negro, zona, barrio, ..."
              />
              <p className="text-xs text-gray-500 mt-1">Ej: toro, negro, zona, norte</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Respuestas (una por línea)
              </label>
              <textarea
                value={newResponses}
                onChange={(e) => setNewResponses(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 h-40 font-mono text-sm"
                placeholder="Escribe cada respuesta en una línea nueva..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => 
                  editingIntent === 'NEW' 
                    ? handleAddIntent() 
                    : handleUpdateIntent(editingIntent)
                }
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                {editingIntent === 'NEW' ? '✅ Crear Intent' : '✅ Actualizar'}
              </button>
              <button
                onClick={() => {
                  setEditingIntent(null)
                  setNewIntentName('')
                  setNewKeywords('')
                  setNewResponses('')
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                ❌ Cancelar
              </button>
            </div>
          </motion.div>
        )}

        {/* Intents List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">📋 Intents Actuales ({Object.keys(messages).length})</h2>
          <div className="grid gap-4">
            {Object.keys(messages).length === 0 ? (
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-8 text-center">
                <p className="text-yellow-800 font-semibold">⚠️ No hay intents cargados. Carga un archivo TXT o crea uno nuevo.</p>
              </div>
            ) : (
              Object.entries(messages).map(([intentName, intentData]) => (
                <motion.div
                  key={intentName}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg p-6 border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 uppercase">{intentName}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingIntent(intentName)
                          setNewKeywords(intentData.keywords.join(', '))
                          setNewResponses(intentData.responses.join('\n'))
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDeleteIntent(intentName)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">🔑 Keywords:</p>
                    <div className="flex flex-wrap gap-2">
                      {intentData.keywords.map((kw, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">💬 Respuestas ({intentData.responses.length}):</p>
                    <ul className="space-y-2">
                      {intentData.responses.map((resp, i) => (
                        <li key={i} className="text-sm text-gray-600 bg-gray-50 p-3 rounded flex items-start gap-2 border border-gray-200">
                          <span className="text-cyan-600 font-bold min-w-fit">{i + 1}.</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600 text-sm bg-gray-100 p-6 rounded-lg">
          <p>Total de intents cargados: <span className="font-bold text-lg text-cyan-600">{Object.keys(messages).length}</span></p>
          <p className="mt-2 text-xs">Los datos se guardan automáticamente en localStorage</p>
        </div>
      </main>
    </div>
  )
}

export default AdminPanel
