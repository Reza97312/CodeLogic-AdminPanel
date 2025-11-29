import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GetUserDetails from "../../../core/services/api/get/GetUserDetails";
import { Row, Col } from "reactstrap";
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";
import "@styles/react/apps/app-users.scss";
import GetAllUser from "../../../core/services/api/get/GetAllUser";
// import loader from "../../../assets/images/Infinity Loader.json";
// import Lottie from "lottie-react";

const UserView = () => {
  const params = {
    PageNumber: 1,
    RowsOfPage: 1000,
    SortingCol: "DESC",
    SortType: "InsertDate",
    IsActiveUser: true,
    IsDeletedUser: true,
  };

  const { data } = useQuery({
    queryKey: ["GetAllUser", params],
    queryFn: () => GetAllUser(params),
  });

  const users = data?.listUser ?? [];
  const rolesList = data?.roles ?? [];

  const { id } = useParams();
  const userId = parseInt(id);

  const { data: user, isLoading } = useQuery({
    queryKey: ["GetUserDetails", userId],
    queryFn: () => GetUserDetails(userId),
    enabled: !!id && !isNaN(userId),
  });

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const LoadingCard = (
    <>
      {/* <Lottie animationData={loader} /> */}
      <p className="mt-2">در حال بارگذاری اطلاعات کاربر...</p>
    </>
  );

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          {!isLoading ? (
            LoadingCard
          ) : (
            <UserInfoCard
              initialData={user}
              users={users}
              rolesList={rolesList}
            />
          )}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};
export default UserView;
