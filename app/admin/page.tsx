import { isAdminAuthenticated } from "@/lib/admin/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (authed) redirect("/admin/dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-slate-900">Admin Portal</h1>
          <p className="mt-1 text-sm text-slate-500">RacketStringConnect</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
