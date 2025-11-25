import { Mail, Home, Airplay, Circle, User, List } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "courses",
    title: "مدیریت دوره ها",
    icon: <List size={12} />,
    children: [
      {
        id: "newsList",
        title: "لیست دوره ها",
        permissions: ["admin", "editor"],
        navLink: "/courses-management",
      },
      {
        id: "createCourse",
        title: "ساخت دوره",
        permissions: ["admin", "editor"],
        navLink: "/courses/create",
      },
    ],
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "news",
    title: "مدیریت اخبار",
    icon: <Circle size={12} />,
    children: [
      {
        id: "newsList",
        title: "لیست اخبار",
        permissions: ["admin", "editor"],
        navLink: "/news-management",
      },
      {
        id: "createBlog",
        title: "ساخت خبر",
        permissions: ["admin", "editor"],
        navLink: "/news/create",
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
