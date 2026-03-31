export const metadata = {
  title: 'Sign In | Blue Men Plumbing Admin',
  robots: { index: false, follow: false },
};

// Login page uses a plain layout without the admin sidebar shell
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
