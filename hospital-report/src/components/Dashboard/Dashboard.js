import React from "react";

const Dashboard = () => {
  return (
    <div className="content-wrapper pt-2">
      <section class="content">
        <div class="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon bg-info elevation-1">
                  <i className="fas fa-users" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Patients</span>
                  <span className="info-box-number">100</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-danger elevation-1">
                  <i className="fa fa-medkit" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Admited Patients</span>
                  <span className="info-box-number">410</span>
                </div>
              </div>
            </div>
            <div className="clearfix hidden-md-up" />
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-success elevation-1">
                  <i className="fa fa-child" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Children in Clinic</span>
                  <span className="info-box-number">760</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-warning elevation-1">
                  <i className="fa fa-female" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Mothers in Clinic</span>
                  <span className="info-box-number">2,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
