import {
  Mail,
  Home,
  Airplay,
  Circle,
  User,
  List,
  Paperclip,
  FilePlus,
  Archive,
  CheckSquare,
  MessageSquare,
  Calendar,
  Clipboard,
  Hash,
  Globe,
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
    icon: <Circle size={12} />,
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
    id: "schedual",
    title: "مدیریت بازه های زمانی ",
    icon: <Calendar size={12} />,
    children: [
      {
        id: "adminschedual",
        icon: <Circle size={8} />,
        title: "بازه زمانی ادمین",
        navLink: "/schedual/admin",
      },
      {
        id: "studentschedual",
        icon: <Circle size={8} />,
        title: "بازه زمانی کاربر",
        navLink: "/schedual/student",
      },
      {
        id: "teacherschedual",
        icon: <Circle size={8} />,
        title: "بازه زمانی استاد",
        navLink: "/schedual/teacher",
      },
    ],
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
  {
    id: "term",
    title: " ترم ها",
    icon: <Hash size={12} />,
    navLink: "/terms",
  },
  {
    id: "buildings",
    title: " ساختمان ها",
    icon: <Globe size={12} />,
    navLink: "/buildings",

    id: "department",
    title: "دپارتمنت ها",
    icon: <User size={20} />,
    navLink: "/department",
  },
];
