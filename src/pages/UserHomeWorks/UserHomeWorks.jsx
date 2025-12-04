import { Row, Col } from "reactstrap";
import UserHomeWorksTable from "./UserHomeWorksTable";

const UserHomeWorks = () => {
  return (
    <div className="app-user-list">
      <Row>
        <UserHomeWorksTable />
      </Row>
    </div>
  );
};

export default UserHomeWorks;
