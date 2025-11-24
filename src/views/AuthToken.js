import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AuthToken = () => {
  const { token } = useParams();

  const nav = useNavigate();

  useEffect(() => {
    if (token) {
      console.log(token);
      localStorage.setItem("token", token);

      nav("/dashboard/ecommerce");
    }
  }, []);

  return <div>AuthToken: {token}</div>;
};

export default AuthToken;
