import React from "react";
import home from "../../assets/home.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h2 className="my-5">Welcome to the Pollution Web App</h2>
          <p>
            This web app provides information and data about pollution levels in
            various locations. You can explore pollution data, view statistics,
            and stay informed about environmental conditions.
          </p>

          <p>
            The app also offers a dynamic graph that visualizes pollution data.
            By selecting a specific date, you can view the pollution levels
            represented on the graph. This allows you to analyze trends and
            changes in pollution over time, enhancing your understanding of
            environmental patterns.
          </p>
          <p>
            Get started by selecting a location or using the search bar to find
            specific pollution data.
          </p>
          <div className="d-flex justify-content-center  my-5">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="col-md-8 d-flex justify-content-end">
          <img
            src={home}
            className="img-fluid"
            style={{ maxHeight: "100%" }}
            alt="home"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
