import React, { useRef } from 'react'
import ChatWidget from './components/ChatWidget'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DebugPanel from './components/DebugPanel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat-debug" element={<DebugPanel />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  )
}

function Home() {
  const chatRef = useRef(null)

  const openChat = () => {
    if (chatRef.current) {
      chatRef.current.openChat()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Header - Más Social */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🇦🇷 Todos Unidos
          </h1>
          <p className="text-lg text-gray-600">
            Vecinos organizándose por un barrio mejor
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section con Chat Visible */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Tu voz importa.<br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Hagamos cambios juntos.
                </span>
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Somos un movimiento territorial donde vecinos, jóvenes, trabajadores y comerciantes comparten ideas y participan activamente en la construcción de nuestro barrio.
              </p>

              {/* Beneficios Rápidos */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Reportá problemas barriales</h4>
                    <p className="text-gray-600">Luz, agua, seguridad y más</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💡</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Hacé propuestas que importen</h4>
                    <p className="text-gray-600">Tu idea puede cambiar el barrio</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Conectá con vecinos y el equipo</h4>
                    <p className="text-gray-600">Comunidad real, apoyo humano</p>
                  </div>
                </div>
              </div>

              <button
                onClick={openChat}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 
                           text-white px-8 py-4 rounded-xl font-bold text-lg 
                           transform hover:scale-105 transition-all shadow-lg inline-flex items-center gap-3"
              >
                <span className="text-2xl">💬</span>
                Empezá ahora con el chat
              </button>
            </div>

            {/* Chat Preview / CTA Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl p-1 shadow-2xl">
                <div className="bg-gray-900 rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Nuestro Asistente está listo</h3>
                  <p className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent mb-6 font-semibold">
                    Disponible 24/7 para responder tus preguntas
                  </p>
                  <button
                    onClick={openChat}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                               text-white font-bold py-3 px-8 rounded-lg 
                               transition-all transform hover:scale-105 w-full"
                  >
                    Abrí el chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Features Clave */}
        <section className="mb-24">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            ¿Cómo funciona?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 border-2 border-blue-200 hover:border-blue-500 hover:shadow-xl transition-all">
              <div className="text-6xl mb-4">💬</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Consultas Rápidas</h4>
              <p className="text-gray-700">Preguntá lo que quieras. Nuestro asistente responde 24/7 sobre participación, eventos, propuestas y más.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 border-2 border-cyan-200 hover:border-cyan-500 hover:shadow-xl transition-all">
              <div className="text-6xl mb-4">📝</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Participación Real</h4>
              <p className="text-gray-700">Reporta problemas, haz propuestas, sumate a actividades. Tus acciones cuentan en decisiones reales.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 border-2 border-teal-200 hover:border-teal-500 hover:shadow-xl transition-all">
              <div className="text-6xl mb-4">👥</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Contacto Humano</h4>
              <p className="text-gray-700">El equipo siempre está disponible. Cuando necesites hablar con una persona, te conectamos.</p>
            </div>
          </div>
        </section>

        {/* Lo que puedes hacer */}
        <section className="mb-24">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Sobre qué puedo ayudarte
          </h3>
          <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 rounded-2xl p-8 md:p-12 border-2 border-blue-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6">
                  ✅ Puedo ayudarte con:
                </h4>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center gap-3">
                    <span className="text-blue-500 font-bold">•</span>
                    Qué es Todos Unidos y nuestros valores
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-500 font-bold">•</span>
                    Cómo sumarme al movimiento
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-500 font-bold">•</span>
                    Actividades, reuniones y eventos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-500 font-bold">•</span>
                    Cómo hacer propuestas que importen
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-500 font-bold">•</span>
                    Reportar problemas barriales
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-500 font-bold">•</span>
                    Programas de juventud
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6">
                  🎯 Lo que nos caracteriza:
                </h4>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-center gap-3">
                    <span className="text-blue-500 font-bold">✌️</span>
                    Somos cercanos, claros y respetuosos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-500 font-bold">📊</span>
                    Solo datos confirmados, nunca inventamos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-500 font-bold">🤝</span>
                    Si no sabemos, lo decimos y te derivamos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-500 font-bold">🔐</span>
                    Tus datos son privados y seguros
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-500 font-bold">💾</span>
                    Todo local, sin servidores externos
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-500 font-bold">👨‍💼</span>
                    Equipo humano siempre disponible
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-24 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-2xl p-12 text-white">
          <h3 className="text-4xl font-bold mb-4">¿Listo para participar?</h3>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Abrí el chat ahora y conocé cómo puedes ser parte del cambio en tu barrio
          </p>
          <button
            onClick={openChat}
            className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-xl font-bold text-lg 
                       transition-all transform hover:scale-105 inline-flex items-center gap-3 shadow-lg"
          >
            <span className="text-2xl">💬</span>
            Abrí el chat
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-center py-8 text-gray-400">
        <p>
          Todos Unidos © 2026 | Asistente Virtual | 
          <a href="/chat-debug" className="text-cyan-400 hover:text-cyan-300 ml-2">
            Debug Panel
          </a>
        </p>
      </footer>

      {/* Chat Widget */}
      <ChatWidget ref={chatRef} />
    </div>
  )
}

export default App
