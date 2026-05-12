import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <span className="admin-sidebar-title">Administração</span>
        <Link href="/admin" className="admin-sidebar-link">
          Dashboard
        </Link>
        <Link href="/admin/algoritmos" className="admin-sidebar-link">
          Algoritmos
        </Link>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  );
}
