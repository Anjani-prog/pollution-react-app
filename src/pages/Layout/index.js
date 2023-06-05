import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <header className="bg-light bg-gradient py-3 fixed-top"></header>
      <div className="flex-grow-1 d-flex" style={{ paddingTop: "3rem" }}>
        <Outlet />
      </div>
      <footer className="bg-light bg-gradient py-3 text-center fixed-bottom">
        <p className="mb-0">© 2023 Pollution App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
