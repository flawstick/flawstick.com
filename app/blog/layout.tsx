export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-[#191D32] via-[#282F44]/20 to-[#191D32]">
      {children}
    </div>
  );
}
