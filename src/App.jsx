import React from 'react'
import ChatWidget from './components/ChatWidget'
import DebugPanel from './components/DebugPanel'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat-debug" element={<DebugPanel />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <ChatWidget />
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
