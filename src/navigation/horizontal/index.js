import { Mail, Home, User } from "react-feather";

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
    id: "userManagement",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    navLink: "/user-management",
  },
];
