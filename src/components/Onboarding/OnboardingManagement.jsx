import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { UserPlus, FileCheck, Clock, CheckCircle2 } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import DataTable from "../ui/DataTable";
import StatsCard from "../ui/StatsCard";
import OnboardingForm from "./OnboardingForm";
import { onboardingService } from "../../services/onboardingService";

const OnboardingManagement = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchOnboardings = async () => {
    setLoading(true);
    try {
      const data = await onboardingService.getAll();
      setRecords(data);
    } catch (error) {
      console.error("Failed fetching onboarding data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOnboardings();
  }, []);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const payload = {
        employee_name: formData.employeeName,
        employee_id: formData.employeeId || "",
        department: formData.department,
        designation: formData.designation,
        work_location: formData.workLocation,
        date_of_joining: formData.dateOfJoining,
        mobile_number: formData.mobileNumber,
        email_id: formData.emailId,
        dob: formData.dob || null,
        gender: formData.gender || "",
        blood_group: formData.bloodGroup || "",
        address: formData.address || "",
        tshirt_size: formData.tShirtSize || "",
        emergency_contact_name: formData.emergencyName || "",
        emergency_relationship: formData.relationship || "",
        emergency_number: formData.emergencyNumber || "",
        bank_name: formData.bankName || "",
        account_holder_name: formData.accountHolderName || "",
        account_number: formData.accountNumber || "",
        ifsc_code: formData.ifscCode || "",
        bank_branch: formData.bankBranch || "",
        photo_submitted: formData.photoSubmitted || "",
        id_card_blood_group: formData.idCardBloodGroup || "",
        doc_aadhaar: formData.docs.aadhaar || false,
        doc_pan: formData.docs.pan || false,
        doc_bank_proof: formData.docs.bankProof || false,
        doc_passport_photo: formData.docs.passportPhoto || false,
        doc_education_cert: formData.docs.educationCert || false,
        doc_resume: formData.docs.resume || false,
        doc_driving_license: formData.docs.drivingLicense || false,
        total_experience: formData.totalExperience || "",
        hp_experience: formData.hpExperience || "",
        skills: formData.skills || "",
        status: "Completed"
      };
      
      const savedRecord = await onboardingService.create(payload);
      setRecords([savedRecord, ...records]);
      setShowForm(false);
      alert("Successfully onboarded " + formData.employeeName);
    } catch (error) {
      console.error("Failed submitting onboarding:", error);
      alert("Submission failed. Check if all required fields are filled.");
    } finally {
      setSubmitting(false);
    }
  };

  const stats = useMemo(() => {
    const total = records.length;
    const completed = records.filter(r => r.status === "Completed").length;
    const progress = records.filter(r => r.status === "In Progress").length;
    return { total, completed, progress };
  }, [records]);

  if (showForm) {
    return (
      <OnboardingForm 
        onCancel={() => setShowForm(false)} 
        onSubmit={handleSubmit} 
        isSubmitting={submitting} 
      />
    );
  }

  if (loading && records.length === 0 && !showForm) {
    return <div className="p-6 text-center text-muted-foreground">Loading Onboarding Data...</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Onboarding"
        description="Manage internal employee onboarding information."
        actions={
          <Button
            variant="brand"
            size="pill"
            icon={UserPlus}
            onClick={() => setShowForm(true)}
          >
            New Onboarding
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard label="Total Onboarded" value={stats.total.toString()} icon={FileCheck} accent="primary" />
        <StatsCard label="Completed" value={stats.completed.toString()} icon={CheckCircle2} accent="success" />
        <StatsCard label="In Progress" value={stats.progress.toString()} icon={Clock} accent="warning" />
      </div>

      <DataTable
        data={records}
        columns={[
          {
            key: "name",
            label: "Employee",
            render: (r) => (
              <div className="flex items-center gap-3">
                <Avatar name={r.employee_name} />
                <div>
                  <div className="font-medium text-sm">{r.employee_name}</div>
                  <div className="text-xs text-muted-foreground">{r.email_id}</div>
                </div>
              </div>
            ),
          },
          { key: "department", label: "Department", render: (r) => <Badge variant="outline">{r.department}</Badge> },
          { key: "designation", label: "Designation", render: (r) => <span className="text-sm">{r.designation}</span> },
          { key: "joining", label: "Joining Date", render: (r) => <span className="text-sm text-muted-foreground">{r.date_of_joining}</span> },
          { key: "contact", label: "Contact", render: (r) => <span className="text-sm font-mono">{r.mobile_number}</span> },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <Badge variant={r.status === "Completed" ? "success" : "warning"}>
                {r.status}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
};

export default OnboardingManagement;
