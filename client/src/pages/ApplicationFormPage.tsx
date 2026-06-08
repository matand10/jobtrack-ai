import { useNavigate, useParams } from "react-router-dom";
import { AiTailorPromoCard } from "../components/applications/AiTailorPromoCard";
import { ApplicationForm } from "../components/applications/ApplicationForm";
import { TipsCard } from "../components/applications/TipsCard";
import { AppShell } from "../components/layout/AppShell";
import { ErrorAlert } from "../components/ui/molecules/ErrorAlert";
import { Breadcrumbs } from "../components/ui/molecules/Breadcrumbs";
import { DashboardSkeleton } from "../components/dashboard/DashboardSkeleton";
import { useMe } from "../hooks/auth.hooks";
import {
  useApplication,
  useCreateApplication,
  useUpdateApplication,
} from "../hooks/application.hooks";
import type {
  CreateApplicationInput,
  UpdateApplicationInput,
} from "@jobtrack/shared";
import type { ApiError } from "../types/api/error.types";
import { useState } from "react";

// ── Create mode ───────────────────────────────────────────────────────────────

function CreateApplicationPage({
  user,
}: {
  user: { name: string; email: string };
}) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const createMutation = useCreateApplication();

  function handleSubmit(data: CreateApplicationInput | UpdateApplicationInput) {
    setServerError(null);
    createMutation.mutate(data as CreateApplicationInput, {
      onError: (err) => {
        const apiError = err as unknown as ApiError;
        setServerError(
          apiError.message || "Something went wrong. Please try again.",
        );
      },
      onSuccess: (result) => {
        navigate(`/applications/${result.application.id}/edit`);
      },
    });
  }

  return (
    <AppShell title="Add Application" user={user}>
      <Breadcrumbs
        items={[
          { label: "Applications", href: "/applications" },
          { label: "New application" },
        ]}
      />
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-app-text">
          Add a new application
        </h1>
        <p className="mt-1 text-[13px] text-app-text-3">
          Track a new role you're applying to or just exploring.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <ApplicationForm
          mode="create"
          onSubmit={handleSubmit}
          isPending={createMutation.isPending}
          serverError={serverError}
        />
        <div className="flex flex-col gap-4">
          <AiTailorPromoCard />
          <TipsCard />
        </div>
      </div>
    </AppShell>
  );
}

// ── Edit mode ─────────────────────────────────────────────────────────────────

function EditApplicationContent({
  id,
  user,
}: {
  id: string;
  user: { name: string; email: string };
}) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const appQuery = useApplication(id);
  const updateMutation = useUpdateApplication(id);

  function handleSubmit(data: CreateApplicationInput | UpdateApplicationInput) {
    setServerError(null);
    updateMutation.mutate(data as UpdateApplicationInput, {
      onError: (err) => {
        const apiError = err as unknown as ApiError;
        setServerError(
          apiError.message || "Something went wrong. Please try again.",
        );
      },
      onSuccess: () => {
        navigate("/applications");
      },
    });
  }

  if (appQuery.isLoading) {
    return (
      <AppShell title="Edit application" user={user}>
        <DashboardSkeleton />
      </AppShell>
    );
  }

  if (appQuery.isError || !appQuery.data?.application) {
    return (
      <AppShell title="Edit application" user={user}>
        <ErrorAlert message="Application not found." />
      </AppShell>
    );
  }

  const { application } = appQuery.data;

  return (
    <AppShell title="Edit application" user={user}>
      <Breadcrumbs
        items={[
          { label: "Applications", href: "/applications" },
          { label: "Edit application" },
        ]}
      />
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-app-text">
          Edit application
        </h1>
        <p className="mt-1 text-[13px] text-app-text-3">
          Update role details, status, and job description.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <ApplicationForm
          mode="edit"
          defaultValues={application}
          onSubmit={handleSubmit}
          isPending={updateMutation.isPending}
          serverError={serverError}
        />
        <div className="flex flex-col gap-4">
          <AiTailorPromoCard />
          <TipsCard />
        </div>
      </div>
    </AppShell>
  );
}

// ── Router entry points ────────────────────────────────────────────────────────

function useAuthUser() {
  const meQuery = useMe();
  return meQuery.data?.user ?? null;
}

export function AddApplicationPage() {
  const user = useAuthUser();
  if (!user) return null;
  return <CreateApplicationPage user={user} />;
}

export function EditApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthUser();
  if (!user || !id) return null;
  return <EditApplicationContent id={id} user={user} />;
}
