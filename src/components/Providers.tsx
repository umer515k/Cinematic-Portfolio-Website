"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { PathProvider } from "@/context/PathContext";
import GrainOverlay from "@/components/grain/GrainOverlay";
import PullString from "@/components/lightswitch/PullString";
import CursorManager from "@/components/cursor/CursorManager";
import LayoutWrapper from "@/components/LayoutWrapper";
import SideNav from "@/components/nav/SideNav";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      <PathProvider>
        <GrainOverlay />
        <PullString />
        <CursorManager />
        <SideNav />
        <LayoutWrapper>{children}</LayoutWrapper>
      </PathProvider>
    </ReactLenis>
  );
}
