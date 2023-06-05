import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
function Layout() {
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      {location.key !== "default" && (
        <header
          className="bg-light bg-gradient py-1"
          style={{ paddingBottom: "60px" }}
        >
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            &larr;
          </button>
        </header>
      )}
      <div
        className="flex-grow-1 d-flex"
        style={{ paddingBottom: "5rem", paddingTop: "1rem" }}
      >
        <Outlet />
      </div>
      <footer
        className="bg-light bg-gradient py-3 text-center fixed-bottom"
        style={{ paddingTop: "60px" }}
      >
        <p className="mb-0">© 2023 Pollution App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
