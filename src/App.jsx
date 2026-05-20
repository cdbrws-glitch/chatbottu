import React from 'react'
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">🇦🇷 Todos Unidos</h1>
          <p className="text-lg text-blue-100">Espacio de participación, organización y construcción colectiva</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Bienvenido a Todos Unidos</h2>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                Somos un movimiento territorial abierto para <strong>vecinos, jóvenes, trabajadores, comerciantes y profesionales</strong> que quieren aportar ideas y participar en la construcción colectiva de soluciones para nuestra comunidad.
              </p>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                Escuchamos, ordenamos propuestas y trabajamos sobre temas concretos del barrio.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Conocer más
                </button>
                <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all">
                  Sumarme
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                <p className="text-white text-center mb-4">💬 Nuestro asistente virtual está listo para ayudarte</p>
                <div className="text-6xl text-center">🤖</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">¿Cómo funciona nuestro asistente?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
              <div className="text-5xl mb-4">💬</div>
              <h4 className="text-2xl font-bold text-white mb-3">Consultas 24/7</h4>
              <p className="text-gray-300">Accede al asistente en cualquier momento para hacer preguntas sobre Todos Unidos, actividades, propuestas y más.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-2xl font-bold text-white mb-3">Inteligencia Local</h4>
              <p className="text-gray-300">El asistente detecta tu intención automáticamente y responde con información confirmada, sin inventos.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
              <div className="text-5xl mb-4">🤝</div>
              <h4 className="text-2xl font-bold text-white mb-3">Contacto Humano</h4>
              <p className="text-gray-300">Cuando sea necesario, te derivamos a un miembro del equipo para una conversación personal.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
              <div className="text-5xl mb-4">📝</div>
              <h4 className="text-2xl font-bold text-white mb-3">Captura de Interés</h4>
              <p className="text-gray-300">Si querés sumarte, el asistente toma tus datos para que el equipo te contacte pronto.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
              <div className="text-5xl mb-4">🗣️</div>
              <h4 className="text-2xl font-bold text-white mb-3">Consultas Territoriales</h4>
              <p className="text-gray-300">Reporta problemas del barrio (luz, agua, seguridad, etc.) y el equipo los registra.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-blue-500 border-opacity-30 hover:border-opacity-100 transition-all">
              <div className="text-5xl mb-4">🔒</div>
              <h4 className="text-2xl font-bold text-white mb-3">Privacidad Total</h4>
              <p className="text-gray-300">Sin backend, sin base de datos. Todo funciona localmente en tu navegador.</p>
            </div>
          </div>
        </section>

        {/* Intents Info */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Sobre qué puedo ayudarte</h3>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-blue-400 border-opacity-30">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-bold text-blue-400 mb-4">✅ Puedo ayudarte con:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>❓ Qué es Todos Unidos</li>
                  <li>🚀 Cómo sumarme al movimiento</li>
                  <li>📅 Actividades y reuniones</li>
                  <li>💡 Cómo hacer propuestas</li>
                  <li>🔧 Reportar problemas barriales</li>
                  <li>📞 Contactar con el equipo</li>
                  <li>👥 Programas de juventud</li>
                  <li>🎉 Eventos y actividades</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-4">⚠️ Importante saber:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>✌️ Soy cercano, claro y respetuoso</li>
                  <li>📊 No invento datos ni fechas</li>
                  <li>🚫 No ataco personas ni partidos</li>
                  <li>🤔 Si no tengo info, lo digo</li>
                  <li>🔄 Respuestas basadas en datos confirmados</li>
                  <li>👨‍💼 Puedo derivarte a contacto humano</li>
                  <li>🔐 Tus datos son privados</li>
                  <li>💾 Todo local, sin servidores</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-20">
          <h3 className="text-3xl font-bold text-white mb-6">¿Listo para comenzar?</h3>
          <p className="text-xl text-gray-400 mb-8">Abre el chat en la esquina inferior derecha y haz tu primera pregunta</p>
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 rounded-full p-1 shadow-2xl">
            <div className="bg-gray-900 rounded-full px-8 py-4 flex items-center gap-3">
              <span className="text-4xl">👇</span>
              <span className="text-white text-lg font-semibold">Abre el chat aquí →</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-center py-8 text-gray-400">
        <p>Todos Unidos © 2026 | Asistente Virtual | <a href="/chat-debug" className="text-blue-400 hover:text-blue-300">Debug Panel</a></p>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App
