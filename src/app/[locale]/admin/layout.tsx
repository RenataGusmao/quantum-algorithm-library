import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Admin");

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

        <AdminLogoutButton />
      </aside>

      <div className="admin-content">{children}</div>
    </div>
  );
}