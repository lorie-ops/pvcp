import { KPI_DATA } from '@/data/mockDashboard'
import KpiCard from '@/components/dashboard/KpiCard'
import PriorityDonutChart from '@/components/dashboard/PriorityDonutChart'
import PendingReviewsAlert from '@/components/dashboard/PendingReviewsAlert'
import TeamPerformanceTable from '@/components/dashboard/TeamPerformanceTable'

export default function DashboardPage() {
  return (
    <div className="h-full overflow-y-auto px-6 py-5">
      <h1 className="mb-4 text-lg font-semibold text-gray-900">Dashboards</h1>

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {KPI_DATA.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PriorityDonutChart />
        <PendingReviewsAlert />
      </div>

      <TeamPerformanceTable />
    </div>
  )
}
