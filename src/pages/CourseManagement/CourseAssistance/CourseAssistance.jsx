import React from "react";
import CourseAssistanceTable from "../../../components/Courses/CourseAssistance/CourseAccistanceTable";
import loading from "../../../assets/images/A/loading.gif";
import { useQuery } from "@tanstack/react-query";
import { GetCourseAssistance } from "../../../core/services/api/get/Courses/GetAssistance";
const CourseAssistance = ({ courseId }) => {
  const { data: Assistance, isPending } = useQuery({
    queryKey: ["ASSISTANCE"],
    queryFn: () => GetCourseAssistance(),
  });
  const AssistanceData = Array.isArray(Assistance)
    ? Assistance.filter((item) => item.courseId === courseId)
    : [];
  console.log("data", AssistanceData);
  return (
    <div>
      {isPending ? (
        <img className="mx-auto" src={loading} />
      ) : (
        <CourseAssistanceTable
          courseId={courseId}
          AssistanceData={AssistanceData}
        />
      )}
    </div>
  );
};

export default CourseAssistance;
