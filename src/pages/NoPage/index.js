import React from "react";
import notFound from "../../assets/notFound.jpg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 overflow-hidden">
      <img
        src={notFound}
        className="img-fluid"
        style={{ maxHeight: "70%" }}
        alt="layout"
      />
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Take me Back
      </button>
    </div>
  );
};

export default NotFound;
