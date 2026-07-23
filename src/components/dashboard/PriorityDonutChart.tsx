import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { PRIORITY_DISTRIBUTION } from '@/data/mockDashboard'

export default function PriorityDonutChart() {
  const total = PRIORITY_DISTRIBUTION.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">Répartition par priorité</h3>
      <div className="flex items-center">
        <div className="h-56 w-full max-w-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={PRIORITY_DISTRIBUTION}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {PRIORITY_DISTRIBUTION.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} avis`, name]}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 pl-2">
          {PRIORITY_DISTRIBUTION.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-gray-600">{entry.name}</span>
              </div>
              <span className="font-semibold text-gray-900">{entry.value}</span>
            </div>
          ))}
          <div className="mt-2 border-t border-gray-100 pt-2 text-xs text-gray-400">
            Total : {total} avis
          </div>
        </div>
      </div>
    </div>
  )
}
