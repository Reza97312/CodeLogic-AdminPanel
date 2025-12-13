import React, { Fragment, useState } from "react";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import NewsTable from "./Table";
import getListNewsCategory from "../../../core/services/api/get/News/getListNewsCategory";

const NewsIndex = () => {
  const { data: categories = [], isPending } = useQuery({
    queryKey: ["ALLNEWSCATS"],
    queryFn: () => getListNewsCategory(),
  });
  const catOptions = [
    { value: null, label: "همه" },
    ...categories?.map((items) => ({
      value: parseInt(items?.id),
      label: items.categoryName || "بدون اسم",
    })),
  ];
  const [catId, setCatId] = useState(null);
  const [sort, setSort] = useState(null);
  const acceptOption = [
    { value: null, label: "همه" },
    { value: "updateDate", label: "جدیدترین ها" },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="plan-select">نام کتگوری</Label>
              <Select
                theme={selectThemeColors}
                isClearable
                className="react-select"
                classNamePrefix="select"
                placeholder="لطفا انتخاب کنید"
                options={catOptions}
                value={catOptions.find((o) => o.value === catId) || null}
                onChange={(opt) => setCatId(opt ? opt.value : null)}
              />
            </Col>

            <Col md="4">
              <Label for="status-select">بر اساس تاریخ</Label>
              <Select
                theme={selectThemeColors}
                isClearable
                className="react-select"
                classNamePrefix="select"
                placeholder="لطفا انتخاب کنید"
                options={acceptOption}
                value={acceptOption.find((o) => o.value === sort) || null}
                onChange={(opt) => setSort(opt?.value ?? null)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div>
        <NewsTable catId={catId} sortType={sort} />
      </div>
    </>
  );
};

export default NewsIndex;
