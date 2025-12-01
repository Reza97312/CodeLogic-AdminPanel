import { Mail, Home, User, Circle, List } from "react-feather";

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
    id: "news",
    title: "مدیریت اخبار",
    icon: <List size={12} />,
    children: [
      {
        id: "newsList",
        title: "لیست اخبار",
        permissions: ["admin", "editor"],
        navLink: "/news-list",
      },
      {
        id: "createBlog",
        title: "ساخت خبر",
        permissions: ["admin", "editor"],
        navLink: "/create-news",
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
