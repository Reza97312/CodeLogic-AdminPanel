import { Fragment } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import googleIcon from "@src/assets/images/icons/social/google.png";
import linkedinIcon from "@src/assets/images/icons/social/linkedin.png";
import telegramicon from "@src/assets/images/icons/social/Telegram.png";

const UserSocial = ({ user }) => {
  const connectedAccounts = [
    {
      title: "  آدرس جیمیل",
      subtitle: user?.gmail,
      logo: googleIcon,
    },
    {
      title: "آدرس لینکدین   ",
      subtitle: user?.linkdinProfile,
      logo: linkedinIcon,
    },
    {
      title: "آدرس تلگرام",
      subtitle: user?.telegramLink,
      logo: telegramicon,
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">شبکه های اجتماعی</CardTitle>

          {connectedAccounts.map((item, index) => {
            return (
              <div key={index} className="d-flex mt-3">
                <div className="flex-shrink-0">
                  <img
                    className="me-1"
                    src={item.logo}
                    alt={item.title}
                    height="38"
                    width="38"
                  />
                </div>
                <div className="d-flex align-item-center justify-content-between flex-grow-1">
                  <div className="me-1">
                    <p style={{ marginBottom: "5px" }} className="fw-bolder ">
                      {item.title}
                    </p>
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserSocial;
