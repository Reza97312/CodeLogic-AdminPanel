import { Mail, Home, Airplay, Circle } from "react-feather";

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
    title: 'اخبار',
    icon: <Circle size={12} />,
    children: [
      {
        id: 'blogList',
        title: 'لیست اخبار',
        permissions: ['admin', 'editor'],
        navLink: '/pages/news/list'
      }, 
      {
        id: 'createBlog',
        title: 'ساخت خبر',
        permissions: ['admin', 'editor'],
        navLink: '/pages/news/create'
      }
    ]
  },
];
