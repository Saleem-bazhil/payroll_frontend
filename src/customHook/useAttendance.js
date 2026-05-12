// hooks/useAttendance.js
import { useState, useCallback } from "react";
import { attendanceService } from "../services/attendanceService";

export const useAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRequest = async (requestFn, successMsg) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const result = await requestFn();
      setSuccess(successMsg || "Operation completed successfully");
      return result;
    } catch (err) {
      const message = err.response?.data?.detail || err.message || "Operation failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAll = useCallback(async (params = {}) => {
    const data = await handleRequest(
      () => attendanceService.getAll(params),
      "Records fetched successfully"
    );
    if (data) setRecords(data);
    return data;
  }, []);

  const createRecord = useCallback(async (attendanceData) => {
    const data = await handleRequest(
      () => attendanceService.create(attendanceData),
      "Attendance record created successfully"
    );
    if (data) setRecords((prev) => [...prev, data]);
    return data;
  }, []);

  const updateRecord = useCallback(async (id, attendanceData) => {
    const data = await handleRequest(
      () => attendanceService.update(id, attendanceData),
      "Attendance record updated successfully"
    );
    if (data) {
      setRecords((prev) => prev.map((r) => (r.id === id ? data : r)));
    }
    return data;
  }, []);

  const patchRecord = useCallback(async (id, partialData) => {
    const data = await handleRequest(
      () => attendanceService.patch(id, partialData),
      "Attendance record updated successfully"
    );
    if (data) {
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...data } : r))
      );
    }
    return data;
  }, []);

  const deleteRecord = useCallback(async (id) => {
    await handleRequest(
      () => attendanceService.delete(id),
      "Attendance record deleted successfully"
    );
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const bulkCreate = useCallback(async (attendanceArray) => {
    const data = await handleRequest(
      () => attendanceService.bulkCreate(attendanceArray),
      "Bulk attendance records created successfully"
    );
    if (data) {
      setRecords((prev) => [...prev, ...data]);
    }
    return data;
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    records,
    loading,
    error,
    success,
    fetchAll,   
    createRecord,
    updateRecord,
    patchRecord,
    deleteRecord,
    bulkCreate,
    clearMessages,
    setRecords,
  };
};