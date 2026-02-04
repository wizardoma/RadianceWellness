import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white font-display text-2xl font-bold">R</span>
            </div>
          </Link>
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            Radiance Wellness
          </h1>
          <p className="text-primary-200 text-sm mt-1">Staff & Admin Portal</p>
        </div>
        
        {children}
        
        <p className="text-center text-primary-300 text-sm mt-8">
          © {new Date().getFullYear()} Radiance Wellness Center
        </p>
      </div>
    </div>
  );
}
