import React, { useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { Eye, Heart, MessageSquare } from "react-feather";
import GoalOverview from "@src/views/ui-elements/cards/analytics/GoalOverview";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import DOMPurify from "dompurify";
const NewsDetailCards = ({ newsData, isPending }) => {
  const { colors } = useContext(ThemeColors);
  const likes = newsData?.detailsNewsDto?._count?.newsLike || 0;
  const disLikes = newsData?.detailsNewsDto?._count?.newsDissLike || 0;
  const allLikes = likes + disLikes;

  const likesPercent = allLikes ? Math.round((likes / allLikes) * 100) : 0;
  const cleaningDescribe = DOMPurify.sanitize(
    newsData?.detailsNewsDto?.describe
  );
  return (
    <div>
      <Row className="mb-3">
        <Col md="6">
          <Row className="mb-2">
            <Col>
              <StatsHorizontal
                color="info"
                statTitle="تعداد کامنت ها"
                icon={<MessageSquare size={20} />}
                renderStats={
                  <h3 className="fw-bolder mb-75">
                    {isPending ? (
                      <Spinner color="primary" />
                    ) : (
                      newsData?.detailsNewsDto?._count?.newsComment
                    )}
                  </h3>
                }
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <StatsHorizontal
                color="danger"
                statTitle="تعداد علاقه مندی ها"
                icon={<Heart size={20} />}
                renderStats={
                  <h3 className="fw-bolder mb-75">
                    {isPending ? (
                      <Spinner color="primary" />
                    ) : (
                      newsData?.detailsNewsDto?._count?.newsFavorite
                    )}
                  </h3>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <StatsHorizontal
                color="primary"
                statTitle="تعداد بازدید ها"
                icon={<Eye size={20} />}
                renderStats={
                  <h3 className="fw-bolder mb-75">
                    {isPending ? (
                      <Spinner color="primary" />
                    ) : (
                      newsData?.detailsNewsDto?._count?.newsRate
                    )}
                  </h3>
                }
              />
            </Col>
          </Row>
        </Col>

        <Col md="6">
          <Card>
            <GoalOverview
              title={"درصد لایک های خبر"}
              rightTitle={"تعداد کل "}
              leftTitle={"تعداد دیسلایک ها"}
              success={colors.success.main}
              percent={likesPercent}
              all={allLikes}
              opposite={disLikes}
            />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                توضیح کوتاه :{newsData?.detailsNewsDto?.miniDescribe}
              </CardTitle>
              <CardText>
                توضیحات تکمیلی:
                <div dangerouslySetInnerHTML={{ __html: cleaningDescribe }} />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetailCards;
