import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
// ** React Imports
import { useContext, useEffect } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Demo Components
import CompanyTable from "../views/home/CompanyTable.js";
import Earnings from "@src/views/ui-elements/cards/analytics/Earnings";
import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
import CardMeetup from "@src/views/ui-elements/cards/advance/CardMeetup";
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
import GoalOverview from "@src/views/ui-elements/cards/analytics/GoalOverview";
import RevenueReport from "@src/views/ui-elements/cards/analytics/RevenueReport";
import OrdersBarChart from "@src/views/ui-elements/cards/statistics/OrdersBarChart";
import CardTransactions from "@src/views/ui-elements/cards/advance/CardTransactions";
import ProfitLineChart from "@src/views/ui-elements/cards/statistics/ProfitLineChart";
import CardBrowserStates from "@src/views/ui-elements/cards/advance/CardBrowserState";
import { useQuery } from "@tanstack/react-query";
import loading from "../assets/images/A/loading.gif";
// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CommentCharts from "../views/components/commentChart/CommentCharts.jsx";
import CoursesBar from "../views/components/coursesBarChart/CoursesBar.jsx";
import { GetProfileInfo } from "../core/services/api/get/GetProfileInfo.js";
import { setItem } from "../utility/helper/storage.services.js";
import { GetDashboardReport } from "../core/services/api/get/GetDashboradReport.js";

const Home = () => {
  useEffect(() => {
    setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50cyI6W3sicGhvbmUiOiIwOTAzMDU1ODAxNCIsImlkIjo0MywiaXNVc2UiOnRydWV9XSwiaWF0IjoxNzY0MTkwMTU0LCJleHAiOjE3NjQyMjYxNTR9.ETiPEEOrhhQa6_lQQnsi8w9fju2f_5XdBCRDpV9cX1U"
    );
  }, []);
  const { data: profileInfo = {}, isPending: ProfileInfo } = useQuery({
    queryKey: ["PROFILEINFO"],
    queryFn: () => GetProfileInfo(),
  });
  const { data: statsData = {}, isPending } = useQuery({
    queryKey: ["STATSDATA"],
    queryFn: () => GetDashboardReport(),
  });
  // ** Context
  const { colors } = useContext(ThemeColors);
  const commentCategories = {
    ReactJs: 50,
    Angular: 20,
    Backend: 22,
    tailwind: 66,
    html: 32,
  };

  // ** vars
  const trackBgColor = "#e9ecef";
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          {ProfileInfo ? (
            <img className="mx-auto" src={loading} />
          ) : (
            <CardMedal item={profileInfo} />
          )}
        </Col>
        <Col xl="8" md="6" xs="12">
          {isPending ? (
            <img className="mx-auto" src={loading} />
          ) : (
            <StatsCard item={statsData} cols={{ xl: "3", sm: "6" }} />
          )}
        </Col>
      </Row>

      <Row className="match-height">
        <Col lg="4" md="6" xs="12">
          <GoalOverview
            title={"درصد پروفایل تکمیل شده"}
            rightTitle={"تعداد کل پروفایل ها"}
            leftTitle={"تعداد پروفایل های تکمیل نشده"}
            success={colors.success.main}
            percent={Math.round(
              (statsData.allUser /
                (statsData.allUser + statsData.inCompeletUserCount)) *
                100
            )}
            all={statsData.allUser + statsData.inCompeletUserCount}
            opposite={statsData.inCompeletUserCount}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GoalOverview
            title={"درصد رزرو های تایید شده"}
            rightTitle={"تعداد کل رزرو ها"}
            leftTitle={"تعداد رزرو های تایید نشده"}
            success={colors.success.main}
            percent={statsData.reserveAcceptPercent}
            all={statsData.allReserve}
            opposite={Math.round(
              (statsData.reserveNotAcceptPercent / 100) * statsData.allReserve
            )}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <Card className="shadow-sm">
            <CardBody className="text-center mx-auto">
              <h4 className="mb-3">تعداد کامنت ها بر اساس دسته بندی ها</h4>
              <CommentCharts />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" xs="12"></Col>
      </Row>
    </div>
  );
};

export default Home;
