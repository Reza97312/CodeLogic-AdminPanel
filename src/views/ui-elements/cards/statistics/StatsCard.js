// ** Third Party Components
import classnames from "classnames";
import {
  TrendingUp,
  User,
  Box,
  DollarSign,
  Delete,
  UserCheck,
  UserX,
  UserPlus,
  Flag,
  Trello,
} from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { GetDashboardReport } from "../../../../core/services/api/get/GetDashboradReport";
import { ShortingNumbers } from "../../../../utility/helper/Number";

const StatsCard = ({ cols, item }) => {
  const data = [
    {
      title: item.allReserve,
      subtitle: "تعداد رزرو ها",
      color: "light-primary",
      icon: <TrendingUp size={24} />,
    },
    {
      title: Math.round((item.reserveNotAcceptPercent / 100) * item.allReserve),
      subtitle: "رزرو های تایید نشده",
      color: "light-danger",
      icon: <Delete size={24} />,
    },
    {
      title: item.allUser + item.inCompeletUserCount,
      subtitle: "تعداد کاربرها",
      color: "light-info",
      icon: <UserCheck size={24} />,
    },
    {
      title: Math.round((item.interActiveUserPercent / 100) * item.allReserve),
      subtitle: "کاربر های غیر فعال",
      color: "light-danger",
      icon: <UserX size={24} />,
    },
    {
      title: Math.round((item.activeUserPercent / 100) * item.allReserve),
      subtitle: "کاربرهای فعال",
      color: "light-secondary",
      icon: <UserPlus size={24} />,
    },
    {
      title: item.allReserveAccept,
      subtitle: "رزرو های تایید شده",
      color: "light-primary",
      icon: <Trello size={24} />,
    },
    {
      title: item.allUser,
      subtitle: "پروفایل تکمیل شده",
      color: "light-primary",
      icon: <Flag size={24} />,
    },
    {
      title: ShortingNumbers(item.allPaymentCost),
      subtitle: "پرداختی ها",
      color: "light-success",
      icon: <DollarSign size={24} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-5 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">گزارشات</CardTitle>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row className="g-3">{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
