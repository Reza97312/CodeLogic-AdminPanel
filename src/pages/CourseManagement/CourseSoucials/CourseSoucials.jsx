import React from "react";
import CourseSoucialTable from "../../../components/Courses/soucials/CourseSoucialTable";
import { useQuery } from "@tanstack/react-query";
import { GetCourseSoucial } from "../../../core/services/api/get/Courses/GetCourseSoucial";
import loading from "../../../assets/images/A/loading.gif";
const CourseSoucials = ({ courseId }) => {
  const { data: soucials, isPending } = useQuery({
    queryKey: ["SOUCIALS"],
    queryFn: () => GetCourseSoucial(),
  });
  const SoucialData = Array.isArray(soucials)
    ? soucials.filter((item) => item.courseId === courseId)
    : [];
  console.log("data", SoucialData);

  return (
    <div>
      {isPending ? (
        <img className="mx-auto" src={loading} />
      ) : (
        <CourseSoucialTable courseId={courseId} SoucialData={SoucialData} />
      )}
    </div>
  );
};

export default CourseSoucials;
