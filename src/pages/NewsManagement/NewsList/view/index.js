import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import getAdminNewsComments from '../../../../core/services/api/get/News/getAdminNewsComments'
import { Row, Col, Alert } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import "@styles/react/apps/app-users.scss";
import getNewsDetail from "../../../../core/services/api/get/News/getNewsDetail";
import NewsCardInfo from "./NewsCardInfo";
import loading from "../../../../assets/images/A/loading.gif";
import Tabs from "./Tabs";
import store from "../store";



const NewsDetail = () => {
  

  const { id } = useParams();
  const { data: selectedNews, isPending } = useQuery({
    queryKey: ["GETNEWSDETAIL"],
    queryFn: () => getNewsDetail(id),
  });


  const { data: newsCommentsData } = useQuery({
    queryKey: ["GETADMINNEWSCOMMENTS"],
    queryFn: () => getAdminNewsComments(id),
  });


  const [active, setActive] = useState("1");


  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };


  return selectedNews ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          {isPending ? (
            <img className="mx-auto" src={loading} />
          ) : (
            <NewsCardInfo selectedNews={selectedNews.detailsNewsDto} />
          )}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <Tabs
            active={active}
            toggleTab={toggleTab}
            newsCommentsData={newsCommentsData}
          />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">خبر یافت نشد</h4>
      <div className="alert-body">
        خبر با آیدی{id} یافت نشد، لطفا به لیست اخبار بازگردید 
        <Link to="/news-list">لیست اخبار</Link>
      </div>
    </Alert>
  );
};
export default NewsDetail;
