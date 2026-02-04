import { DeviceFrame } from "@/components/device-frame";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DeviceFrame>
      <div className="min-h-full bg-background pb-24">
        {children}
      </div>
      <BottomNav />
    </DeviceFrame>
  );
}
