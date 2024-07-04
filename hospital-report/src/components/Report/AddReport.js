import React, { useState } from 'react'
import axios from "axios";
import { url } from "../../Utills/API";
import { useHospitalContext } from "../../hooks/useHospitalContext";
import {useUserContext} from "../../hooks/useUserContext"
import {useReportContext} from "../../hooks/useReportContext"
import { ToastContainer, toast } from "react-toastify";
import {useNavigate}  from "react-router-dom"

const AddReport = () => {

  const navigate = useNavigate()

  const hospital_data = useHospitalContext();
  const user = useUserContext();
  const { dispatch } = useReportContext();

  const [values, setValues] = useState({
    report_name: "",
    report_date: "",
    hospital_id: "",
    user_id: "",
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
      await axios
        .post(`${url}/report`, {
          report_name: values.report_name,
          report_date: values.report_date,
          hospital_id: hospital_data.hospital[0].hospital_id,
          user_id: user.user.user.user_id,
        })
        .then((res) => {
          toast.success(res.data.message, toastOptions);
          dispatch({
            type: "GETREPORT",
            payload: res.data.report,
          });
          setValues({
            report_name: "",
            report_date: "",
            hospital_id: "",
            user_id: "",
          });
          navigate("/main/reportdata");
        });
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
  }

  const handleCancle = async (event) =>{
    event.preventDefault();
    setValues({
      report_name: "",
      report_date: "",
      hospital_id: "",
      user_id: "",
    })
  }
  return (
    <div className="content-wrapper pt-2">
      <section className="contect">
        <div className="container-fluid">
          <div className="container">
            <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
              <h2 className="h5 mb-3 mb-lg-0">Create new Report</h2>
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
                    <h3 className="h6 mb-4">Basic information</h3>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Report Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="report_name"
                            value={values.report_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-lable">Report date</label>
                          <input
                            type="date"
                            className="form-control"
                            name="report_date"
                            value={values.report_date}
                            onChange={handleChange}
                          />
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
      <ToastContainer/>
    </div>
  );
}

export default AddReport
