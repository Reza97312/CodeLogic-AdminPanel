import React from "react";
import TermsTable from "../../components/Terms/TermsTable";
import { useQuery } from "@tanstack/react-query";
import { GetTerms } from "../../core/services/api/get/Terms/GetTerms";
import loading from "../../assets/images/A/loading.gif";
import { Card } from "reactstrap";
const TermManagement = () => {
  const { data: allTerms = [], isPending } = useQuery({
    queryKey: ["ALLTERMS"],
    queryFn: () => GetTerms(),
  });
  return (
    <Card>
      {isPending ? (
        <img src={loading} style={{ margin: "0 auto" }} />
      ) : (
        <TermsTable allTerms={allTerms} />
      )}
    </Card>
  );
};

export default TermManagement;
