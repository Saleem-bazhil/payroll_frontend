import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const initialFormState = {
  employee_name: "",
  branch: "Chennai",
  email: "",
  phone: "",
  role: "",
  department: "",
  salary: "",
  status: "active",
};

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "onleave", label: "On Leave" },
];

const BRANCH_OPTIONS = [
  { value: "Chennai", label: "Chennai" },
  { value: "Vellore", label: "Vellore" },
  { value: "Salem", label: "Salem" },
  { value: "Kanchipuram", label: "Kanchipuram" },
  { value: "Hosur", label: "Hosur" },
];

const EmployeeForm = ({ initialData = null, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        employee_name: initialData.employee_name || "",
        branch: initialData.branch || "Chennai",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "",
        department: initialData.department || "",
        salary: initialData.salary || "",
        status: initialData.status || "active",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg mx-4 rounded-3xl bg-card p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit Employee" : "Add Employee"}
          </h2>
          <button
            onClick={onCancel}
            className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Employee Name</label>
              <input
                type="text"
                name="employee_name"
                value={formData.employee_name}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
              >
                {BRANCH_OPTIONS.map((branch) => (
                  <option key={branch.value} value={branch.value}>
                    {branch.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Optional"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Optional"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              step="0.01"
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-glow"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="brand" size='pill' type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : initialData ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" size='pill' onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
