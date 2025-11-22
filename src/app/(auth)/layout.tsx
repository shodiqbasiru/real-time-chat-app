export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-[url(/bg-auth.jpg)] ">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative min-h-screen flex items-center justify-center z-20">
        {children}
      </div>
    </div>
  );
}
