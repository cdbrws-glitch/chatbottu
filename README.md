# Chatbot Institucional - Todos Unidos

🤖 Asistente virtual IA para "Todos Unidos" - Frontend-only, sin APIs externas.

## ✨ Características

- ✅ **Frontend-only**: Sin backend, sin base de datos, sin OpenAI
- ✅ **Detección inteligente de intenciones**: Keywords, palabras clave, flujos conversacionales
- ✅ **Respuestas dinámicas**: Data en JSON, respuestas aleatorizadas
- ✅ **Flujos especiales**: Captura de leads, consultas territoriales, contacto humano
- ✅ **Storage local**: localStorage para datos de sesión
- ✅ **Design moderno**: Dark mode, animaciones, mobile-first
- ✅ **Panel debug**: `/chat-debug` para ver datos almacenados
- ✅ **Ready for Vercel**: Deploy inmediato

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **JavaScript vanilla** (intent matching)

## 📦 Instalación

```bash
# Clonar repo
git clone https://github.com/tu-usuario/chatbottu.git
cd chatbottu

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview
npm run preview
```

## 🚀 Deployment a Vercel

### Opción 1: Desde CLI
```bash
npm install -g vercel
vercel
```

### Opción 2: Desde GitHub
1. Push al repo
2. Conecta en [vercel.com](https://vercel.com)
3. Importa el proyecto
4. Deploy automático ✅

## 📁 Estructura

```
src/
├── components/
│   ├── ChatWidget.jsx         # Widget principal
│   ├── ChatMessage.jsx        # Componente mensaje
│   ├── TypingIndicator.jsx    # Indicador "escribiendo"
│   └── DebugPanel.jsx         # Panel de debug
├── utils/
│   ├── intentMatcher.js       # Detección de intenciones
│   └── storage.js             # Manejo localStorage
├── data/
│   └── messages.json          # Base de respuestas
├── App.jsx
├── main.jsx
└── index.css
```

## 💬 Intents Disponibles

- `saludo`: Bienvenida
- `que_es`: Información sobre Todos Unidos
- `sumarse`: Captura de leads
- `actividades`: Actividades del movimiento
- `reuniones`: Info de reuniones
- `propuestas`: Cómo hacer propuestas
- `problemas_barriales`: Reportar problemas
- `contacto`: Derivar a humano
- `juventud`: Programas de juventud
- `eventos`: Eventos y actividades
- `valores`: Misión y valores
- `despedida`: Cierre de conversación
- `fallback`: Respuesta por defecto

## 🔍 Panel Debug

Acceder a `http://localhost:3000/chat-debug` para:
- Ver leads capturados
- Ver consultas territoriales
- Ver solicitudes de contacto
- Limpiar datos
- Descargar JSON

## 📝 Personalización

### Cambiar respuestas
Editar `src/data/messages.json`

### Agregar keywords
Modificar array `keywords` en cada intent

### Cambiar colores
Editar `tailwind.config.js` (color primary: azul #3B82F6)

## 📋 Flujos Especiales

### 1. Quiero Sumarme
- Detecta: "sumarme", "participar", "colaborar", etc.
- Captura: nombre, localidad, teléfono (opt), interés
- Guarda: `localStorage['lead_sumarse']`

### 2. Problemas Barriales
- Detecta: "problema", "agua", "luz", "seguridad", etc.
- Captura: localidad, descripción, contacto (opt)
- Guarda: `localStorage['consulta_territorial']`

### 3. Contacto Humano
- Detecta: "contacto", "whatsapp", "hablar con alguien", etc.
- Captura: nombre, teléfono, motivo
- Guarda: `localStorage['contacto_humano']`

## 🎨 Diseño

- Widget flotante abajo a derecha
- Panel oscuro elegante (#1a1a1a)
- Detalles azules (#3B82F6)
- Bordes redondeados suaves
- Sombras sutiles
- Animaciones con Framer Motion
- Mobile-first responsive

## ⚙️ Configuración

### Cambiar nombre del asistente
Editar en `ChatWidget.jsx` línea header: "Todos Unidos"

### Ajustar delay de escritura
En `ChatWidget.jsx` línea de `setTimeout`:
```javascript
await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
```

## 🧠 Lógica de Intent Matching

1. Normaliza entrada (minúsculas, sin tildes, sin signos)
2. Busca coincidencias en keywords
3. Calcula confianza: `matches / total_keywords`
4. Aplica threshold mínimo (0.3)
5. Si no alcanza, usa fallback

## 🔒 Privacidad

- Todo se guarda en localStorage del navegador
- **No hay servidor**, **no hay base de datos**
- Los datos se guardan solo en el cliente
- Puede limpiar datos desde debug panel

## 📱 Responsive

- Teléfono: widget adapta ancho
- Tablet: panel amplía
- Desktop: experiencia completa

## 🚨 Normas del Asistente

✅ Hacer:
- Responder con datos confirmados
- Derivar a contacto humano si no tiene info
- Ser cercano, claro, respetuoso
- Recordar nombre del usuario
- Capturar datos en flujos específicos

❌ No hacer:
- Inventar datos o fechas
- Atacar personas o partidos
- Sonar robótico o agresivo
- Prometer soluciones sin confirmar
- Pedir datos innecesarios

## 📞 Soporte

Para cambios en respuestas o intents, editar `src/data/messages.json`

## 📄 Licencia

Créado para Todos Unidos

---

**Hecho con ❤️ para la comunidad**
