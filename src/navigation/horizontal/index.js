import {
  Mail,
  Home,
  User,
  Circle,
  List,
  Paperclip,
  FilePlus,
  Archive,
  MessageSquare,
  CheckSquare,
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
        id: "CourseLevels",
        icon: <Clipboard size={8} />,
        title: "مدیریت سطح های دوره",
        permissions: ["admin", "editor"],
        navLink: "/CourseLevels",
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
    id: "CM",
    title: " مدیریت کامنت ها",
    icon: <MessageSquare size={12} />,
    navLink: "/CommentManagement",
  },
  {
    id: "userTasks",
    title: "تسک ها",
    icon: <CheckSquare size={12} />,
    navLink: "/user-homeworks",
  },
];
