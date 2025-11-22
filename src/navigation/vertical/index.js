import { Mail, Home, Airplay, Circle, User } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },

      {
        id: "blog",
        title: "Blog",
        icon: <Circle size={12} />,
        children: [
          {
            id: "blogList",
            title: "List",
            permissions: ["admin", "editor"],
            navLink: "/pages/blog/list",
          },
          {
            id: "blogDetail",
            title: "Detail",
            permissions: ["admin", "editor"],
            navLink: "/pages/blog/detail",
          },
          {
            id: "blogEdit",
            title: "Edit",
            permissions: ["admin", "editor"],
            navLink: "/pages/blog/edit",
          },
        ],
      },
    ],
  },
  {
    id: "userManagement",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    navLink: "/user-management",
  },
];
