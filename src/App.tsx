import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
