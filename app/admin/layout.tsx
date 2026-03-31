import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin | Blue Men Plumbing',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // No sidebar for unauthenticated users (login page)
  if (!user) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
