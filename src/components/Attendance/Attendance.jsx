// pages/Attendance.jsx
import { useEffect, useState, useMemo, useCallback } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, CheckCircle2, AlertCircle, Timer, 
  ChevronLeft, ChevronRight, Plus, Pencil, Trash2, X, Check 
} from "lucide-react";
import PageHeader from "../ui/PageHeader";
import StatsCard from "../ui/StatsCard";
import DataTable from "../ui/DataTable";
import { useAttendance } from "../../customHook/useAttendance";
import AttendanceForm from "./AttendanceForm";
import {
  formatTime, 
  calculateHours,
  calculateOvertime,
  calculateRemainingWorkingHours,
  getStatusDisplay,
  getStatusVariant,
  calculateStats,
} from "../../Utility/attendanceUtils";

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Attendance = () => {
  const {
    records,
    loading,
    error,
    success,
    fetchAll,
    createRecord,
    updateRecord,
    patchRecord,
    deleteRecord,
    clearMessages,
  } = useAttendance();

  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    return formatLocalDate(new Date());
  });

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Auto-clear success messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(clearMessages, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, clearMessages]);

  const filteredRecords = useMemo(() => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const selected = new Date(year, month - 1, day);

    return records.filter((record) => {
      const recordDate = record.intime || record.outtime;
      if (!recordDate) return false;
      const current = new Date(recordDate);
      return (
        current.getFullYear() === selected.getFullYear() &&
        current.getMonth() === selected.getMonth() &&
        current.getDate() === selected.getDate()
      );
    });
  }, [records, selectedDate]);

  const stats = useMemo(() => calculateStats(filteredRecords), [filteredRecords]);

  const selectedDateLabel = useMemo(() => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [selectedDate]);

  const moveSelectedDate = useCallback((days) => {
    setSelectedDate((current) => {
      const [year, month, day] = current.split("-").map(Number);
      const next = new Date(year, month - 1, day);
      next.setDate(next.getDate() + days);
      return formatLocalDate(next);
    });
  }, []);

  const handleCreate = async (formData) => {
    await createRecord(formData);
    setShowForm(false);
  };

  const handleUpdate = async (formData) => {
    if (editingRecord) {
      await updateRecord(editingRecord.id, formData);
      setEditingRecord(null);
    }
  };

  const handleDelete = async (id) => {
    await deleteRecord(id);
    setDeleteConfirm(null);
  };

  const handleQuickStatusUpdate = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Present" ? "Absent" : "Present";
    await patchRecord(id, { status: nextStatus });
  };

  const tableColumns = useMemo(
    () => [
      {
        key: "employee",
        label: "Employee",
        render: ({ employee_name, department }) => (
          <div className="flex items-center gap-3">
            <Avatar name={employee_name} />
            <div>
              <div className="text-sm font-medium">{employee_name}</div>
              <div className="text-xs text-muted-foreground">{department}</div>
            </div>
          </div>
        ),
      },
      {
        key: "role",
        label: "Role",
        render: ({ role }) => (
          <span className="text-sm text-muted-foreground">{role}</span>
        ),
      },
      {
        key: "clockIn",
        label: "Clock In",
        render: ({ intime }) => (
          <span className="text-sm">{formatTime(intime)}</span>
        ),
      },
      {
        key: "clockOut",
        label: "Clock Out",
        render: ({ outtime }) => (
          <span className="text-sm">{formatTime(outtime)}</span>
        ),
      },
      {
        key: "hours",
        label: "Total Hours",
        render: ({ intime, outtime }) => (
          <span className="text-sm font-medium">
            {calculateHours(intime, outtime)}h
          </span>
        ),
      },
      {
        key: "remaining",
        label: "Remaining",
        render: ({ intime, outtime }) => (
          <span className="text-sm font-medium text-primary">
            {calculateRemainingWorkingHours(intime, outtime)}h
          </span>
        ),
      },
      {
        key: "overtime",
        label: "Overtime",
        render: ({ intime, outtime }) => {
          const overtime = calculateOvertime(intime, outtime);
          return Number(overtime) > 0 ? (
            <Badge variant="info">+{overtime}h</Badge>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          );
        },
      },
      {
        key: "status",
        label: "Status",
        render: (record) => (
          <button
            onClick={() => handleQuickStatusUpdate(record.id, record.status)}
            className="cursor-pointer"
            title="Click to toggle status"
          >
            <Badge variant={getStatusVariant(record.status)}>
              {getStatusDisplay(record.status)}
            </Badge>
          </button>
        ),
      },
      {
        key: "actions",
        label: "Actions",
        className: "w-[120px]",
        render: (record) => (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditingRecord(record)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDeleteConfirm(record.id)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-red-50 hover:text-red-500"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  if (loading && records.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <div className="text-muted-foreground">Loading attendance data...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Notification Toast */}
      {success && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-lg">
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">{success}</span>
            <button onClick={clearMessages} className="ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-2xl shadow-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{error}</span>
            <button onClick={clearMessages} className="ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <PageHeader
        title="Attendance"
        description="Track daily attendance, overtime and absences."
        actions={
          <Button variant="brand" size="pill" icon={Plus} onClick={() => setShowForm(true)}>
            Add Record
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6 mb-6">
        <StatsCard
          label="Present"
          value={stats.presentToday.toString()}
          icon={CheckCircle2}
          accent="success"
        />
        <StatsCard
          label="On Leave"
          value={stats.onLeave.toString()}
          icon={Timer}
          accent="warning"
        />
        <StatsCard
          label="Absent"
          value={stats.absent.toString()}
          icon={AlertCircle}
          accent="primary"
        />
        <StatsCard
          label="Overtime Hours"
          value={`${stats.overtimeHours}h`}
          icon={Clock}
          accent="info"
        />
        <StatsCard
          label="Remaining Hours"
          value={`${stats.remainingWorkingHours}h`}
          icon={Timer}
          accent="primary"
        />
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => moveSelectedDate(-1)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-9 rounded-xl border border-border bg-card px-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div className="rounded-xl border border-border bg-card px-4 h-9 flex items-center text-sm font-medium">
            {selectedDateLabel}
          </div>
          <button
            onClick={() => moveSelectedDate(1)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-muted"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setSelectedDate(formatLocalDate(new Date()))}
            type="button"
          >
            Today
          </Button>
          <Button variant="outline" onClick={fetchAll} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={filteredRecords} columns={tableColumns} />

      {filteredRecords.length === 0 && (
        <div className="mt-4 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          No attendance records found for {selectedDateLabel}.
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {(showForm || editingRecord) && (
        <AttendanceForm
          initialData={editingRecord}
          onSubmit={editingRecord ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setEditingRecord(null);
          }}
          loading={loading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-3xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-500/15 text-red-500">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Delete Record</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteConfirm)}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(null)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
