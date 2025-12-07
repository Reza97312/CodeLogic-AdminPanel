import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Col, Row, Spinner } from "reactstrap";
import { GetCourseLevels } from "../../../core/services/api/get/Courses/GetCourseLevels";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { Layers } from "react-feather";
import CourseLevelsCard from "../../../components/Courses/CourseLevels/CourseLevelsCard";
import CreateLevelModal from "../../../components/Courses/CourseLevels/CreateLevelModal";
const CourseLevels = () => {
  const { data: levels = [], isPending } = useQuery({
    queryKey: ["ALLLEVELS"],
    queryFn: () => GetCourseLevels(),
  });
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(levels.length / perPage);
  const slicedData = levels.slice((page - 1) * perPage, page * perPage);
  const [openCreateLevel, setOpenCreateLevel] = useState(false);
  const toggleCreate = (val) => setOpenCreateLevel(val);

  return (
    <>
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کل سطح های دوره"
            icon={<Layers size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {isPending ? <Spinner color="primary" /> : levels.length}
              </h3>
            }
          />
          <Button onClick={() => setOpenCreateLevel(true)} color="primary">
            ساخت سطح برای دوره
          </Button>
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          {slicedData.map((item, index) => (
            <CourseLevelsCard key={index} levelName={item.levelName} />
          ))}
          <div className="d-flex justify-content-center mt-3 gap-2">
            <Button
              color="secondary"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              قبلی
            </Button>

            {[...Array(totalPages).keys()].map((p) => (
              <Button
                key={p}
                size="sm"
                color={page === p + 1 ? "primary" : "light"}
                onClick={() => setPage(p + 1)}
              >
                {p + 1}
              </Button>
            ))}

            <Button
              color="secondary"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              بعدی
            </Button>
          </div>
        </Col>
      </Row>
      {openCreateLevel && (
        <CreateLevelModal isOpen={openCreateLevel} toggle={toggleCreate} />
      )}
    </>
  );
};

export default CourseLevels;
