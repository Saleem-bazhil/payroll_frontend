import { useCallback, useState } from "react";
import { employeeService } from "../services/employeeService";

export const useEmployee = () => {
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
        }
        catch (err) {
            const message = err.response?.data?.detail || err.message || "Operation failed";
            setError(message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };

    const fetchAll = useCallback(async (params = {}) => {
        const data = await handleRequest(() => employeeService.getAll(params), "Employees fetched successfully");
        if (data) setRecords(data);
        return data;
    },[]);

    const createRecord = useCallback(async (employeeData) => {
        const data = await handleRequest(() => employeeService.create(employeeData), "Employee record created successfully");
        if (data) setRecords(prev => [...prev, data]);
        return data;
    },[]);

    const updateRecord = useCallback(async (id, employeeData) => {
        const data = await handleRequest(() => employeeService.update(id, employeeData), "Employee record updated successfully");
        if (data) setRecords(prev => prev.map(r => r.id === id ? data : r));
        return data;
    },[]);

    const patchRecord = useCallback(async (id, partialData) => {
        const data = await handleRequest(() => employeeService.patch(id, partialData), "Employee record updated successfully");
        if (data) setRecords(prev => prev.map(r => r.id === id ? data : r));
        return data;
    },[]);

    const deleteRecord = useCallback(async (id) => {
        await handleRequest(() => employeeService.delete(id), "Employee record deleted successfully");
        setRecords(prev => prev.filter(r => r.id !== id));
    },[]);

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
        clearMessages,
        setRecords,
    };

};
