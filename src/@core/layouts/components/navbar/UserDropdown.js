// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import http from "../../../../core/interceptor/interceptor.js";
// ** Custom Components
import Avatar from "@components/avatar";
import {
  getItem,
  removeItem,
} from "../../../../utility/helper/storage.services";
import { jwtDecode } from "jwt-decode";
// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { useQuery } from "react-query";
import { GetProfileInfo } from "../../../../core/services/api/get/GetProfileInfo";
import { useEffect, useState } from "react";
import loading from "../../../../assets/images/A/loading.gif";
import { toast } from "react-toastify";
const UserDropdown = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [headerData, setHeaderData] = useState(null);
  const [openLogOut, setOpenLogOut] = useState(false);
  const toggleModal = (val) => setOpenLogOut(val);
  const token = getItem("token");
  const getHeader = async () => {
    try {
      setIsLoading(true);
      const result = await http.get("/SharePanel/GetProfileInfo");
      console.log(result);
      setHeaderData(result);
      return result;
    } catch (err) {
      setHeaderData(err);
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getHeader();
  }, []);
  console.log("res", headerData);
  return (
    <>
      {token ? (
        ""
      ) : (
        <Button tag={Link} to={"/login"} color={"danger"} className="me-3">
          {"وارد شوید"}
        </Button>
      )}
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          {isLoading ? (
            <Spinner color="primary" />
          ) : (
            <>
              <div className="user-nav d-sm-flex d-none">
                <span className="user-name fw-bold">
                  {headerData?.fName}
                  {""}
                  {headerData?.lName}
                </span>
                <span className="user-status">Admin</span>
              </div>
              <Avatar
                img={headerData?.currentPictureAddress}
                imgHeight="40"
                imgWidth="40"
                status="online"
              />
            </>
          )}
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag={Link} to="/">
            <User size={14} className="me-75" />
            <span className="align-middle">پروفایل</span>
          </DropdownItem>

          <DropdownItem onClick={() => setOpenLogOut(true)}>
            <Power size={14} className="me-75" />
            <span className="align-middle">خروج از حساب کاربری</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      {openLogOut && (
        <Modal isOpen={openLogOut} toggle={toggleModal}>
          <ModalHeader>ایا از خروج حساب مطمعنید ؟</ModalHeader>
          <ModalBody>
            <div
              style={{
                margin: "0 auto",
                width: "50%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  if (token) {
                    removeItem("token");
                    toast.success("با موفقیت از حسابتان خارج شدید");
                    navigate("/login");
                  }
                }}
                color="danger"
              >
                خروج
              </Button>
              <Button onClick={() => toggleModal(false)} outlined>
                انصراف
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default UserDropdown;
