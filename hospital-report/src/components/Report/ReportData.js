import React, { useState } from "react";
import axios from "axios";
import { url } from "../../Utills/API";
import { useReportContext } from "../../hooks/useReportContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReportData = () => {
    const navigate = useNavigate();
  const report = useReportContext();
  const {dispatch} = useReportContext();
  const [values, setValues] = useState({
    date: "",
    giving_services: "",
    giving_other_services: "",
    rights_for_service: "",
    home_made_food: "",
    industrial_food: "",
    have_food: "",
    report_id: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const {
          giving_services,
          giving_other_services,
          rights_for_service,home_made_food,
          industrial_food,
          have_food,
        } = values;
       await axios
         .post(`${url}/report/reportdata`, {
           giving_services,
           giving_other_services,
           home_made_food,
           industrial_food,
           rights_for_service,
           have_food,
           report_id: report.report.report.report_id, 
           date: report.report.report.report_date  
         })
         .then((res) => {
           toast.success(res.data.message, toastOptions);
           dispatch({
             type: "GETREPORTDATA",
             payload: res.data,
           });
           setValues({
             date: "",
             giving_services: "",
             giving_other_services: "",
             rights_for_service: "",
             home_made_food: "",
             industrial_food: "",
             have_food: "",
             report_id: "",
           });
           navigate("/main/viewreport");
         }); 
    } catch (error) {
        console.log(error)
      toast.error(error.response.data.message, toastOptions);
    }
  };

  const handleCancle = async (event) => {
    event.preventDefault();
    try {
      setValues({
        date: "",
        giving_services: "",
        giving_other_services: "",
        rights_for_service: "",
        home_made_food: "",
        industrial_food: "",
        have_food: "",
        report_id: "",
      });
    } catch (error) {
        console.log(error)
      toast.error(error, toastOptions);
    }
  };
  return (
    <div>
      <div className="content-wrapper pt-2">
        <section className="content">
          <div className="container-fluid">
            <div className="container">
              <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                <h2 className="h5 mb-3 mb-lg-0">Add Data</h2>
                <div className="flex flex-row-reverse gap-3">
                  <button
                    className="btn btn-danger btn-sm btn-icon-text"
                    onClick={(event) => handleCancle(event)}
                  >
                    <i className="fa fa-ban" />
                    <span className=" ml-2 text">Cancel</span>
                  </button>
                  <button
                    className="btn btn-primary btn-sm btn-icon-text"
                    onClick={(event) => handleSubmit(event)}
                  >
                    <i className="fa fa-file" />
                    <span className="ml-2 text">Next</span>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6 mb-4">Health Care information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Nutrition services
                            </label>
                            <select
                              className="form-control"
                              value={values.giving_services}
                              onChange={handleChange}
                              name="giving_services"
                            >
                              <option>Choose</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Other services</label>
                            <select
                              className="form-control"
                              value={values.giving_other_services}
                              onChange={handleChange}
                              name="giving_other_services"
                            >
                              <option>Choose</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Eligible to give services
                            </label>
                            <select
                              className="form-control"
                              value={values.rights_for_service}
                              onChange={handleChange}
                              name="rights_for_service"
                            >
                              <option>Choose</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6 mb-4">Nutrition services</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Home made nutrition food
                            </label>
                            <select
                              className="form-control"
                              value={values.home_made_food}
                              onChange={handleChange}
                              name="home_made_food"
                            >
                              <option>Choose</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Industrial Made Nutrition Food
                            </label>
                            <select
                              className="form-control"
                              value={values.industrial_food}
                              onChange={handleChange}
                              name="industrial_food"
                            >
                              <option>Choose</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Have Nutrition Food ready for use
                            </label>
                            <select
                              className="form-control"
                              value={values.have_food}
                              onChange={handleChange}
                              name="have_food"
                            >
                              <option>Choose</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReportData;
