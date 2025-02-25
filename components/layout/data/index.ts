import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Attendance",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Attendance",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Create Attendance",
          url: "/create-attendance",
        },
        {
          title: "Manpower",
          url: "/manpower",
        },
        {
          title: "Daily Over Time",
          url: "/daily-ot",
        },
        {
          title: "Daily Expense",
          url: "/daily-expense",
        },
      ],
    },
    {
      title: "Production Order",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Order List",
          url: "/order-list",
        },
        {
          title: "Create Order",
          url: "/create-order",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Production Report",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Production Report",
          url: "/production-report",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
