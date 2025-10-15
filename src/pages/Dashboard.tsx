import { useAuth } from '@/contexts/AuthContext';
import { ManagerDashboard } from '@/components/ManagerDashboard';
import { EmployeeDashboard } from '@/components/EmployeeDashboard';

export default function Dashboard() {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'employee';
  const isManager = userRole === 'manager';

  return (
    <div className="space-y-6">
      {isManager ? <ManagerDashboard /> : <EmployeeDashboard />}
    </div>
  );
}