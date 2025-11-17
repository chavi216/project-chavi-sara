import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Keyboard from './components/keyboard/keyboard.jsx'
import TextArea from './components/textArea/textArea.jsx'
import TextApp from './components/textApp/textApp.jsx'



createRoot(document.getElementById('root')).render(
    <TextApp />
)
