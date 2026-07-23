import { Outlet } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import ReviewDetailPanel from '@/components/detail/ReviewDetailPanel'

export default function AppLayout() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-hidden relative">
            <Outlet />
            <ReviewDetailPanel />
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
