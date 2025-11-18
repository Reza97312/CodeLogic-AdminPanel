import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
// ** React Imports
import { useContext } from "react";

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

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  // ** vars
  const trackBgColor = "#e9ecef";
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>

      <Row className="match-height">
        <Col lg="4" md="6" xs="12">
          <GoalOverview success={colors.success.main} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
