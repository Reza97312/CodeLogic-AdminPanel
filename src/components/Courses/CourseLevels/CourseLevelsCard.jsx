import React from "react";
import { Card, CardBody } from "reactstrap";

const CourseLevelsCard = ({ levelName }) => {
  return (
    <Card
      style={{
        borderRadius: "12px",
        padding: 0,
        minHeight: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform .2s ease, box-shadow .2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.04)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
    >
      <CardBody
        className="p-2 text-center"
        style={{ fontSize: "15px", fontWeight: "600" }}
      >
        {levelName}
      </CardBody>
    </Card>
  );
};

export default CourseLevelsCard;
