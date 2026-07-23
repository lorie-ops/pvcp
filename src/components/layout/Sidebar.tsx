import { NavLink, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Share2,
  BarChart2,
  Settings,
  Lock,
} from 'lucide-react'
import { useIrisStore } from '@/store/useIrisStore'
import { CURRENT_AGENT_NAME } from '@/lib/currentAgent'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const AVIS_SUBITEMS = [
  { label: "File d'attente", path: '/avis' },
  { label: 'À signaler', path: '/avis/signales' },
  { label: 'Archive', path: '/avis/archive' },
]

export default function Sidebar() {
  const isExpanded = useIrisStore((s) => s.isSidebarExpanded)
  const toggleSidebar = useIrisStore((s) => s.toggleSidebar)
  const location = useLocation()
  const isAvisActive = location.pathname.startsWith('/avis')

  return (
    <aside
      className={cn(
        'flex flex-col bg-slate-900 text-white transition-all duration-200 ease-in-out shrink-0',
        isExpanded ? 'w-[220px]' : 'w-16'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-14 shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
            I
          </div>
          {isExpanded && (
            <span className="font-bold text-white whitespace-nowrap">IRIS</span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white shrink-0"
          aria-label="Basculer la barre latérale"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        <div>
          <NavLink
            to="/avis"
            className={cn(
              'flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
              isAvisActive
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            )}
          >
            <MessageSquare className="h-4 w-4 shrink-0" />
            {isExpanded && <span className="flex-1 text-left">Avis</span>}
            {isExpanded && (
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform', isAvisActive ? 'rotate-0' : '-rotate-90')}
              />
            )}
          </NavLink>

          {isExpanded && isAvisActive && (
            <div className="mt-1 ml-4 space-y-0.5 border-l border-slate-700 pl-3">
              {AVIS_SUBITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    cn(
                      'block rounded px-2 py-1.5 text-xs transition-colors',
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'flex cursor-not-allowed items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-slate-500'
              )}
            >
              <Share2 className="h-4 w-4 shrink-0" />
              {isExpanded && <span className="flex-1 text-left">Socials</span>}
              {isExpanded && <Lock className="h-3.5 w-3.5 shrink-0" />}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Bientôt disponible</TooltipContent>
        </Tooltip>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            )
          }
        >
          <BarChart2 className="h-4 w-4 shrink-0" />
          {isExpanded && <span className="flex-1 text-left">Dashboards</span>}
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-800 px-2 py-2 space-y-1">
        <button
          onClick={() => toast('Paramètres — bientôt disponible')}
          className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Settings className="h-4 w-4 shrink-0" />
          {isExpanded && <span>Paramètres</span>}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-slate-800">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                KB
              </div>
              {isExpanded && (
                <div className="flex-1 overflow-hidden text-left">
                  <div className="truncate text-sm font-medium text-white">
                    {CURRENT_AGENT_NAME}
                  </div>
                  <div className="truncate text-xs text-slate-400">
                    Agent · FR, EN
                  </div>
                </div>
              )}
              {isExpanded && <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-48">
            <DropdownMenuItem onClick={() => toast('Mon profil — bientôt disponible')}>
              Mon profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast('Préférences — bientôt disponible')}>
              Préférences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast('Déconnexion simulée')}>
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
