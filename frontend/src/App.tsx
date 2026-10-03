import { Home } from './pages/Home'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Home />
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />
    </>
  )
}

export default App
