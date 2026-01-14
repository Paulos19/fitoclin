"use client";

import { useSession } from "next-auth/react";
import { Role } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const { data: session } = useSession();

  if (session?.user?.role !== allowedRole) {
    return null; // Não renderiza nada se não tiver o cargo
  }

  return <>{children}</>;
};