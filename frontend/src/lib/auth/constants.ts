// src/lib/auth/constants.ts
export const ADMIN_INFO = {
    name: process.env.NEXT_PUBLIC_ADMIN_NAME || "Vadim Castro",
    role: process.env.NEXT_PUBLIC_ADMIN_ROLE || "Full Stack Developer",
    avatar: "/images/vadim-avatar.jpg",
    initials: "VC"
  } as const;
  
  // Only publicly visible information here