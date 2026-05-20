// Guardar en localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    const existing = localStorage.getItem(key)
    let items = []

    if (existing) {
      try {
        const parsed = JSON.parse(existing)
        items = Array.isArray(parsed) ? parsed : [parsed]
      } catch (e) {
        items = []
      }
    }

    items.push(data)
    localStorage.setItem(key, JSON.stringify(items))
    console.log(`✅ Datos guardados en ${key}:`, data)
  } catch (error) {
    console.error('❌ Error al guardar en localStorage:', error)
  }
}

// Obtener de localStorage
export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('❌ Error al obtener de localStorage:', error)
    return null
  }
}

// Limpiar localStorage
export const clearLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
    console.log(`✅ Datos de ${key} eliminados`)
  } catch (error) {
    console.error('❌ Error al limpiar localStorage:', error)
  }
}
