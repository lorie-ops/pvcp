import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppLayout from '@/components/layout/AppLayout'
import FeedPage from '@/pages/FeedPage'
import DashboardPage from '@/pages/DashboardPage'

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/avis" replace />} />
          <Route path="/avis" element={<FeedPage />} />
          <Route path="/avis/signales" element={<FeedPage />} />
          <Route path="/avis/archive" element={<FeedPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
