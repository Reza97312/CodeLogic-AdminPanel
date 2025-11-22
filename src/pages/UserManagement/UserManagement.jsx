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

const UserManagement = () => {
  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کل کاربران"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="تعداد کل دوره ها"
            icon={<Book size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="تعداد کل خبرها "
            icon={<Globe size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="تعداد معلم ها"
            icon={<Layers size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
        <Table />
      </Row>
    </div>
  );
};

export default UserManagement;
