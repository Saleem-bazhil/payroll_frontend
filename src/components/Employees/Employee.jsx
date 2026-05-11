import { Avatar} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "./PageHeader";
import StatsCard from "./StatsCard";
import Toolbar from "./Toolbar";
import DataTable from "./DataTable";
import { Users, UserPlus, UserCheck, UserMinus, MoreHorizontal } from "lucide-react";

const employees = [
  { name: "Sophia Chen", email: "sophia@payrollx.io", role: "Senior Engineer", dept: "Engineering", salary: "$8,420", status: "Active" },
  { name: "Marcus Reyes", email: "marcus@payrollx.io", role: "Sales Lead", dept: "Sales", salary: "$6,180", status: "Active" },
  { name: "Aiko Tanaka", email: "aiko@payrollx.io", role: "Product Designer", dept: "Design", salary: "$5,940", status: "On Leave" },
  { name: "Liam O'Brien", email: "liam@payrollx.io", role: "Operations Mgr", dept: "Operations", salary: "$4,750", status: "Active" },
  { name: "Priya Patel", email: "priya@payrollx.io", role: "Marketing Lead", dept: "Marketing", salary: "$5,210", status: "Active" },
  { name: "Diego Alvarez", email: "diego@payrollx.io", role: "DevOps Engineer", dept: "Engineering", salary: "$7,830", status: "Inactive" },
  { name: "Hana Yoo", email: "hana@payrollx.io", role: "HR Specialist", dept: "HR", salary: "$4,250", status: "Active" },
  { name: "Noah Williams", email: "noah@payrollx.io", role: "Frontend Engineer", dept: "Engineering", salary: "$6,940", status: "Active" },
];

const EmployeesPage = () => {
  return (
    <div>
      <PageHeader
        title="Employees"
        description="Manage your workforce, roles and compensation."
        actions={<Button icon={UserPlus}>Add employee</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatsCard label="Total Employees" value="1,284" delta="3.2%" icon={Users} accent="primary" />
        <StatsCard label="Active" value="1,182" delta="2.1%" icon={UserCheck} accent="success" />
        <StatsCard label="On Leave" value="64" delta="0.8%" icon={UserMinus} accent="warning" />
        <StatsCard label="New Hires" value="38" delta="14%" icon={UserPlus} accent="info" />
      </div>

      <Toolbar onAdd={() => {}} addLabel="Add employee" />

      <DataTable
        data={employees}
        columns={[
          {
            key: "name", label: "Employee",
            render: (e) => (
              <div className="flex items-center gap-3">
                <Avatar name={e.name} />
                <div>
                  <div className="font-medium text-sm">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.email}</div>
                </div>
              </div>
            ),
          },
          { key: "role", label: "Role", render: (e) => <span className="text-sm">{e.role}</span> },
          { key: "dept", label: "Department", render: (e) => <Badge variant="primary">{e.dept}</Badge> },
          { key: "salary", label: "Salary", render: (e) => <span className="font-medium text-sm">{e.salary}</span> },
          {
            key: "status", label: "Status",
            render: (e) => (
              <Badge variant={e.status === "Active" ? "success" : e.status === "On Leave" ? "warning" : "muted"}>
                {e.status}
              </Badge>
            ),
          },
          {
            key: "act", label: "", className: "w-12",
            render: () => (
              <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default EmployeesPage;