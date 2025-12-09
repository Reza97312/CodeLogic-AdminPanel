// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
import NewsList from "../../pages/NewsManagement/NewsList/NewsList";
import NewsDetail from "../../pages/NewsManagement/NewsList/view";
import CreateNews from "../../pages/NewsManagement/CreateNews/CreateNews";
import UserHomeWorks from "../../pages/UserHomeWorks/UserHomeWorks";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import CoursesManagement from "../../pages/CourseManagement/CourseList/CoursesManagement";
import CourseView from "../../pages/CourseManagement/CourseView/CourseView";
import CoursesUserList from "../../components/Courses/CourseView/view/CourseUsersList/CoursesUserList";
import CreateCourse from "../../pages/CourseManagement/CreateCourse/CreateCourse";
import CourseGroups from "../../pages/CourseManagement/CourseGroups/CourseGroups";
import path from "path";
import ReservedCourses from "../../pages/CourseManagement/ReservedCourse/ReservedCourses";
import CommentManagement from "../../pages/commentManagement/CommentManagement";
import CourseLevels from "../../pages/CourseManagement/CourseLevels/CourseLevels";
import TermManagement from "../../pages/TermManagement/TermManagement";
import BuildingManagement from "../../pages/Buildings/BuildingManagement";
import TasksManagement from "../../pages/TasksManageMent/TasksManagement";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const UserManagement = lazy(() =>
  import("../../pages/UserManagement/UserManagement")
);
const EditUser = lazy(() => import("../../pages/EditUser/EditUser"));
const UserDetails = lazy(() => import("../../pages/UserManagement/view"));
const StudentSchedual = lazy(() =>
  import("../../pages/Schedual/StudentSchedual")
);
const TeacherSchedual = lazy(() =>
  import("../../pages/Schedual/TeacherSchedual")
);
const AdminSchedual = lazy(() => import("../../pages/Schedual/AdminSchedual"));
const Department = lazy(() => import("../../pages/Department/Department"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/department",
    element: <Department />,
  },
  {
    path: "/schedual/admin",
    element: <AdminSchedual />,
  },
  {
    path: "/schedual/teacher",
    element: <TeacherSchedual />,
  },
  {
    path: "/schedual/student",
    element: <StudentSchedual />,
  },
  {
    path: "/edituser/:id",
    element: <EditUser />,
  },
  {
    path: "/user-management",
    element: <UserManagement />,
  },
  {
    path: "/userdetails/:id",
    element: <UserDetails />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/news-list",
    element: <NewsList />,
  },
  {
    path: "/news-detail/:id",
    element: <NewsDetail />,
  },
  {
    path: "/create-news",
    element: <CreateNews />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/courses-management",
    element: <CoursesManagement />,
  },
  {
    path: "/courses/view/:id",
    element: <CourseView />,
  },
  {
    path: "/courses/users/:id",
    element: <CoursesUserList />,
  },
  {
    path: "/courses/create",
    element: <CreateCourse />,
  },
  {
    path: "/courses/groups",
    element: <CourseGroups />,
  },
  {
    path: "/courses/reserves",
    element: <ReservedCourses />,
  },
  {
    path: "/user-homeworks",
    element: <UserHomeWorks />,
  },
  {
    path: "/CommentManagement",
    element: <CommentManagement />,
  },
  {
    path: "/CourseLevels",
    element: <CourseLevels />,
  },
  {
    path: "/terms",
    element: <TermManagement />,
  },
  {
    path: "/buildings",
    element: <BuildingManagement />,
  },
  {
    path: "/tasks",
    element: <TasksManagement />,
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
