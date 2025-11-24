import { Mail, Home, User, Circle } from "react-feather";

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
    id: 'news',
    title: 'مدیریت اخبار',
    icon: <Circle size={12} />,
    children: [
      {
        id: 'newsList',
        title: 'لیست اخبار',
        permissions: ['admin', 'editor'],
        navLink: '/news-list'
      }, 
      {
        id: 'createBlog',
        title: 'ساخت خبر',
        permissions: ['admin', 'editor'],
        navLink: '/create-news'
      }
    ]
  },
  {
    id: "userManagement",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    navLink: "/user-management",
  },
];
