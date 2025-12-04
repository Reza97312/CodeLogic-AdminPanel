import {
  Mail,
  Home,
  User,
  Circle,
  List,
  Paperclip,
  FilePlus,
  Archive,
} from "react-feather";

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
        id: "CourseList",
        icon: <Paperclip size={8} />,
        title: "لیست دوره ها",
        permissions: ["admin", "editor"],
        navLink: "/courses-management",
      },
      {
        id: "createCourse",
        icon: <FilePlus size={8} />,
        title: "ساخت دوره",
        permissions: ["admin", "editor"],
        navLink: "/courses/create",
      },
      {
        id: "ReservedCourse",
        icon: <Archive size={8} />,
        title: "مدیریت لیست رزرو ها",
        permissions: ["admin", "editor"],
        navLink: "/courses/reserves",
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
  {
    id: "userTasks",
    title: "تسک ها",
    icon: <Circle size={12}/>,
    navLink: "/user-homeworks" 
  }
];
