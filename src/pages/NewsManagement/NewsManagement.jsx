import { Row, Col } from "reactstrap";
import Table from "./Table";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import {
  User,
  UserPlus,
  UserCheck,
  UserX,
  Book,
  Globe,
  Layers,
} from "react-feather";

const NewsManagement = () => {
  return (
    <div className="app-user-list">
      <Row>
        <Table />
      </Row>
    </div>
  );
};

export default NewsManagement;
