// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import getAdminNewsComments from '../../../../core/services/api/get/getAdminNewsComments'

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
// import UserTabs from "../../../../components/Courses/CourseView/view/courseTabs";
import PlanCard from "../../../UserManagement/view/PlanCard";
import UserInfoCard from "../../../UserManagement/view/UserInfoCard";
import { useQuery } from "@tanstack/react-query";

// ** Styles
import "@styles/react/apps/app-users.scss";
import getNews from "../../../../core/services/api/get/getNews";
import NewsCardInfo from "../../../../components/news/NewsCardInfo/NewsCardInfo";
import loading from "../../../../assets/images/A/loading.gif";
import Tabs from "./Tabs";

import store from "../store";


const NewsView = () => {
  // ** Hooks
  const { id } = useParams();
  const { data: newsData = {}, isPending } = useQuery({
    queryKey: ["GETNEWS"],
    queryFn: () => getNews(id),
  });


  const {data: newsCommentsData} = useQuery({
    queryKey: ['GETADMINNEWSCOMMENTS'],
    queryFn: () => getAdminNewsComments(id)
  })


  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return newsData ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          {isPending ? (
            <img className="mx-auto" src={loading} />
          ) : (
            <NewsCardInfo selectedNews={newsData} />
          )}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <Tabs id={id} active={active} toggleTab={toggleTab} newsCommentsData={newsCommentsData}/>
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  );
};
export default NewsView;
