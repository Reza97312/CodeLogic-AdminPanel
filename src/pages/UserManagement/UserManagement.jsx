import { Row, Col, Spinner } from "reactstrap";
import Table from "./Table.js";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, Book, Globe, Layers } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import GetAllUser from "../../core/services/api/get/GetAllUser.js";

const UserManagement = () => {
  const params = {
    PageNumber: 1,
    RowsOfPage: 1000,
    SortingCol: "DESC",
    SortType: "InsertDate",
    IsActiveUser: true,
    IsDeletedUser: true,
    Query: "",
  };

  const { data, isPending } = useQuery({
    queryKey: ["GetAllUser", params],
    queryFn: () => GetAllUser(params),
  });

  const totalCount = data?.totalCount ?? 0;
  const users = data?.listUser ?? [];
  const roles = data?.roles ?? [];

  const teacherCount = users.filter((u) =>
    u.userRoles?.split(",").includes("teacher")
  ).length;
  const studentCount = users.filter((u) =>
    u.userRoles?.split(",").includes("student")
  ).length;
  const adminCount = users.filter((u) =>
    u.userRoles?.split(",").includes("admin")
  ).length;

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کل کاربران"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {isPending ? <Spinner color="primary" /> : totalCount}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="تعداد معلم ها"
            icon={<Book size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {isPending ? <Spinner color="primary" /> : teacherCount}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="تعداد کل دانشجوها"
            icon={<Globe size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {isPending ? <Spinner color="primary" /> : studentCount}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="تعداد ادمین ها"
            icon={<Layers size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {isPending ? <Spinner color="primary" /> : adminCount}
              </h3>
            }
          />
        </Col>
        <Table users={users} isPending={isPending} roles={roles} />
      </Row>
    </div>
  );
};

export default UserManagement;
