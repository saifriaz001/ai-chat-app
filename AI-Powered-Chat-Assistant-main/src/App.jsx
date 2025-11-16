import './App.css'
import Page from './pages/Page'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ChatPage from './pages/ChatPage'


function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<ChatPage />} />
        </Route>
      </Routes>



    </div>
  )
}

export default App
