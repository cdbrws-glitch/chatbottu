import messages from '../data/messages.json'

// Normalizar texto: minúsculas, sin tildes, sin signos
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar tildes
    .replace(/[^a-z0-9\s]/g, '') // Eliminar signos
    .trim()
}

// Extraer nombre del usuario
const extractName = (text) => {
  const patterns = [
    /(?:soy|me llamo|mi nombre es)\s+([a-záéíóúñ]+)/i,
    /^([a-záéíóúñ]+)$/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1].length > 2) {
      return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase()
    }
  }
  return null
}

// Detectar intención
export const matchIntent = (userInput) => {
  const normalized = normalizeText(userInput)
  let bestMatch = {
    intent: 'fallback',
    confidence: 0,
  }

  // Iterar sobre los intents
  for (const [intentName, intentData] of Object.entries(messages.intents)) {
    if (intentName === 'fallback') continue

    let matchCount = 0
    const keywords = intentData.keywords || []

    // Contar coincidencias de palabras clave
    for (const keyword of keywords) {
      if (normalized.includes(normalizeText(keyword))) {
        matchCount++
      }
    }

    // Calcular confianza
    const confidence = keywords.length > 0 ? matchCount / keywords.length : 0

    if (confidence > bestMatch.confidence) {
      bestMatch = {
        intent: intentName,
        confidence,
      }
    }
  }

  // Aplicar threshold mínimo más bajo (0.15 en lugar de 0.3)
  if (bestMatch.confidence < 0.15) {
    bestMatch.intent = 'fallback'
  }

  const extractedName = extractName(userInput)

  return {
    intent: bestMatch.intent,
    confidence: bestMatch.confidence,
    extractedName,
  }
}
