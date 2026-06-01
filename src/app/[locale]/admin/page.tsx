import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminPage from "./adminPage";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect(`/${locale}/admin/login`);
  }

  return <AdminPage />;
}