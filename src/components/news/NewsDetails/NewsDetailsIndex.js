// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Row, Col, Alert, Button } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
// ** Styles
import "@styles/react/apps/app-users.scss";
import loading from "../../../assets/images/A/loading.gif";
import getNewsDetail from "../../../core/services/api/get/News/getNewsDetail.js";
import NewsTabs from "./NewsTabs.js";
import NewsInfoCard from "./NewsCardInfo.js";
const NewsDetailIndex = () => {
  const navigate = useNavigate();
  // ** Hooks
  const { id } = useParams();
  const { data: newsData = {}, isPending } = useQuery({
    queryKey: ["NEWSDETAIL"],
    queryFn: () => getNewsDetail(id),
  });
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const [openTechModal, setOpenTechModal] = useState(false);
  const toggleTechModal = (val) => setOpenTechModal(val);

  return newsData ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          {isPending ? (
            <img className="mx-auto" src={loading} />
          ) : (
            <NewsInfoCard newsData={newsData} />
          )}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <NewsTabs
            active={active}
            toggleTab={toggleTab}
            newsData={newsData}
            isPending={isPending}
          />
        </Col>
      </Row>
      {/* {openTechModal && (
        <AddTechModal
          isOpen={openTechModal}
          toggleTechModal={toggleTechModal}
          initialData={courseData?.courseTeches}
          courseId={id}
        />
      )} */}
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
export default NewsDetailIndex;
