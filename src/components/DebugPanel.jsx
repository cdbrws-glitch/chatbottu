import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DebugPanel = () => {
  const [leads, setLeads] = useState([])
  const [consultas, setConsultas] = useState([])
  const [contactos, setContactos] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const leadsData = JSON.parse(localStorage.getItem('lead_sumarse') || '[]')
    const consultasData = JSON.parse(localStorage.getItem('consulta_territorial') || '[]')
    const contactosData = JSON.parse(localStorage.getItem('contacto_humano') || '[]')

    setLeads(Array.isArray(leadsData) ? leadsData : [leadsData].filter(x => x))
    setConsultas(Array.isArray(consultasData) ? consultasData : [consultasData].filter(x => x))
    setContactos(Array.isArray(contactosData) ? contactosData : [contactosData].filter(x => x))
  }

  const clearData = () => {
    if (window.confirm('¿Estás seguro? Se borrarán todos los datos almacenados.')) {
      localStorage.removeItem('lead_sumarse')
      localStorage.removeItem('consulta_territorial')
      localStorage.removeItem('contacto_humano')
      setLeads([])
      setConsultas([])
      setContactos([])
    }
  }

  const downloadJSON = () => {
    const data = {
      leads,
      consultas,
      contactos,
      exportedAt: new Date().toISOString(),
    }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chatbot-datos-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🔧 Panel Debug - Todos Unidos</h1>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            Volver al Chat
          </Link>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={loadData}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            🔄 Recargar Datos
          </button>
          <button
            onClick={downloadJSON}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            📥 Descargar JSON
          </button>
          <button
            onClick={clearData}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            🗑️ Limpiar Todo
          </button>
        </div>

        {/* Leads */}
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">📋 Leads - Quiero Sumarme ({leads.length})</h2>
          {leads.length > 0 ? (
            <div className="space-y-4">
              {leads.map((lead, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
                  <p><strong>Nombre:</strong> {lead.nombre}</p>
                  <p><strong>Localidad:</strong> {lead.localidad}</p>
                  <p><strong>Teléfono:</strong> {lead.telefono || 'No proporcionado'}</p>
                  <p><strong>Interés:</strong> {lead.interes}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(lead.timestamp).toLocaleString('es-AR')}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Sin datos aún</p>
          )}
        </div>

        {/* Consultas Territoriales */}
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">🏘️ Consultas Territoriales ({consultas.length})</h2>
          {consultas.length > 0 ? (
            <div className="space-y-4">
              {consultas.map((consulta, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p><strong>Localidad:</strong> {consulta.localidad}</p>
                  <p><strong>Descripción:</strong> {consulta.descripcion}</p>
                  <p><strong>Contacto:</strong> {consulta.contacto || 'No proporcionado'}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(consulta.timestamp).toLocaleString('es-AR')}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Sin datos aún</p>
          )}
        </div>

        {/* Contacto Humano */}
        <div className="mb-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-400">📞 Solicitudes de Contacto Humano ({contactos.length})</h2>
          {contactos.length > 0 ? (
            <div className="space-y-4">
              {contactos.map((contacto, i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-4 border-l-4 border-green-500">
                  <p><strong>Nombre:</strong> {contacto.nombre}</p>
                  <p><strong>Teléfono:</strong> {contacto.telefono}</p>
                  <p><strong>Motivo:</strong> {contacto.motivo}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(contacto.timestamp).toLocaleString('es-AR')}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Sin datos aún</p>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">ℹ️ Información</h3>
          <p className="text-gray-400 text-sm">
            Este panel es solo para desarrollo. Los datos se guardan en localStorage del navegador.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DebugPanel
