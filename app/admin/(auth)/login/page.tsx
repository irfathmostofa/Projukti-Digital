import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSession } from "@/lib/admin/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const user = await getSession();
  if (user) redirect("/admin/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <LoginForm />
      <p className="mt-6 text-xs text-muted-foreground">
        Contact your administrator if you need access.
      </p>
    </div>
  );
}
