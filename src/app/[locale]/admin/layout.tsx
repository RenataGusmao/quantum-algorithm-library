import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { cookies } from "next/headers"; 

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Admin");

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <span className="admin-sidebar-title">{t("sidebarTitle")}</span>

        <Link href="/admin" className="admin-sidebar-link">
          {t("dashboard")}
        </Link>

        <Link href="/admin/algoritmos" className="admin-sidebar-link">
          {t("algorithms")}
        </Link>

        {token && <AdminLogoutButton />}
      </aside>

      <div className="admin-content">{children}</div>
    </div>
  );
}