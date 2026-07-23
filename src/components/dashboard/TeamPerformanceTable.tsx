import { TEAM_PERFORMANCE } from '@/data/mockDashboard'
import { cn } from '@/lib/utils'

export default function TeamPerformanceTable() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">Performance équipe</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-400">
              <th className="py-2 pr-4 font-medium">Agent</th>
              <th className="py-2 pr-4 font-medium">Langues</th>
              <th className="py-2 pr-4 font-medium">Volume</th>
              <th className="py-2 pr-4 font-medium">DMT</th>
              <th className="py-2 pr-4 font-medium">Taux IA</th>
              <th className="py-2 pr-4 font-medium">Modifiés</th>
            </tr>
          </thead>
          <tbody>
            {TEAM_PERFORMANCE.map((member) => (
              <tr
                key={member.agent}
                className={cn(
                  'border-b border-gray-100 last:border-0',
                  member.flagged && 'bg-orange-50'
                )}
              >
                <td className={cn('py-2 pr-4 font-medium', member.flagged ? 'text-orange-700' : 'text-gray-900')}>
                  {member.agent}
                </td>
                <td className="py-2 pr-4 text-gray-500">{member.languages}</td>
                <td className="py-2 pr-4 text-gray-500">{member.volume}</td>
                <td className="py-2 pr-4 text-gray-500">{member.dmt}</td>
                <td className="py-2 pr-4 text-gray-500">{member.aiRate}</td>
                <td className="py-2 pr-4 text-gray-500">{member.modifiedRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-400">
        ⚠ Stats par agent soumises à validation légale (Works Council DE)
      </p>
    </div>
  )
}
