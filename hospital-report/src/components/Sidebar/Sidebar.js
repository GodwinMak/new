/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Link, useNavigate} from "react-router-dom"
import { useUserContext } from "../../hooks/useUserContext";


const Sidebar = () => {
  const user = useUserContext();
  const {dispatch} = useUserContext();
  const navigate = useNavigate();
  
  const handleClick = async ()=>{
    await dispatch({
      type: "LOGOUT",
    });
    navigate('/');
  }
  return (
    <aside className="main-sidebar sidebar-light-primary elevation-1">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-2"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Hospital System</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {user.user.user.user_type === "admin" && (
              <li className="nav-item menu-open">
                <Link to="/main" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p className="ml-2">Dashboard</p>
                </Link>
              </li>
            )}

            <li className="nav-item mt-2">
              <Link className="nav-link">
                <i className="nav-icon fa fa-medkit" />
                <p className="ml-2">
                  Patients
                  <i class="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li class="nav-item">
                  <Link to="/main/patient" class="nav-link">
                    <i class="fa fa-users nav-icon"></i>
                    <p>Patients</p>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/main/admitedpatient" class="nav-link">
                    <i class="fa fa-medkit nav-icon"></i>
                    <p>Admited Patients</p>
                  </Link>
                </li>
              </ul>
            </li>
            {user.user.user.user_type === "admin" && (
              <li className="nav-item mt-2">
                <Link to="/main/report" className="nav-link">
                  <i className="nav-icon fa fa-address-book" />
                  <p className="ml-2">Mothly Report</p>
                </Link>
              </li>
            )}
            <li className="nav-item mt-2">
              <Link className="nav-link" onClick={handleClick}>
                <i className="nav-icon fa fa-cogs" />
                <p className="ml-2">Log out</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
