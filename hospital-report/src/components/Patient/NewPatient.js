import React, { useState } from "react";
import axios from "axios";
import { url } from "../../Utills/API";
import { useHospitalContext } from "../../hooks/useHospitalContext";
import { ToastContainer, toast } from "react-toastify";
const NewPatient = () => {
  const hospital_data = useHospitalContext();
  const [values, setValues] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    ward: "",
    village: "",
    birth_date: "",
    gender: "",
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
      const { first_name, middle_name, last_name,ward, village, birth_date, gender } = values;
      await axios
        .post(`${url}/patient/`, {
          first_name,
          middle_name,
          last_name,
          birth_date,
          ward,
          village,
          gender,
          hospital_id: hospital_data.hospital[0].hospital_id,
        })
        .then((res) => {
          toast.success(res.data.message, toastOptions);
          setValues({
            first_name: "",
            middle_name: "",
            last_name: "",
            ward: "",
            village: "",
            birth_date: "",
            gender: "",
          });
        });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, toastOptions);
    }
  };

  const handleCancle = async(event) =>{
    event.preventDefault()
    try {
      setValues({
        first_name: "",
        middle_name: "",
        last_name: "",
        ward: "",
        village: "",
        birth_date: "",
        gender: ""
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="content-wrapper pt-2">
        <section className="content">
          <div className="container-fluid">
            <div className="container">
              <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                <h2 className="h5 mb-3 mb-lg-0">Create new Patient</h2>
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
                    <span className="ml-2 text">Save</span>
                  </button>
                </div>
              </div>
              {/* Main content */}
              <div className="row">
                {/* Left side */}
                <div className="col-lg-8">
                  {/* Basic information */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6 mb-4">Basic information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">First name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              onChange={handleChange}
                              required={true}
                              value={values.first_name}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Middle name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="middle_name"
                              onChange={handleChange}
                              required={true}
                              value={values.middle_name}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="last_name"
                              onChange={handleChange}
                              required={true}
                              value={values.last_name}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Address */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6 mb-4">Address</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Ward</label>
                            <select
                              className="select2 form-control select2-hidden-accessible"
                              data-select2-placeholder="Select word"
                              data-select2-id="select2-data-1-gy14"
                              tabIndex={-1}
                              aria-hidden="true"
                              required={true}
                              value={values.ward}
                              name="ward"
                              onChange={handleChange}
                            >
                              <option data-select2-id="select2-data-3-ibs9" />
                              <option value="Mkuyuni">Mkuyuni</option>
                            </select>
                            <span
                              className="select2 select2-container select2-container--bootstrap-5"
                              dir="ltr"
                              data-select2-id="select2-data-2-46y9"
                              style={{ width: 391 }}
                            >
                              <span className="selection">
                                <span
                                  className="select2-selection select2-selection--single"
                                  role="combobox"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  tabIndex={0}
                                  aria-disabled="false"
                                  aria-labelledby="select2-vp8l-container"
                                  aria-controls="select2-vp8l-container"
                                >
                                  <span
                                    className="select2-selection__rendered"
                                    id="select2-vp8l-container"
                                    role="textbox"
                                    aria-readonly="true"
                                    title="Select Ward"
                                  >
                                    <span className="select2-selection__placeholder">
                                      Select Ward
                                    </span>
                                  </span>
                                  <span
                                    className="select2-selection__arrow"
                                    role="presentation"
                                  >
                                    <b role="presentation" />
                                  </span>
                                </span>
                              </span>
                              <span
                                className="dropdown-wrapper"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Village</label>
                            <select
                              className="select2 form-control select2-hidden-accessible"
                              data-select2-placeholder="Select state"
                              data-select2-id="select2-data-4-680y"
                              tabIndex={-1}
                              aria-hidden="true"
                              required={true}
                              name="village"
                              onChange={handleChange}
                              value={values.village}
                            >
                              <option data-select2-id="select2-data-6-cshs" />
                              <option value="Kibweya">Kibweya</option>
                              <option value="Mfumbwe">Mfumbwe</option>
                              <option value="Changa">Changa</option>
                              <option value="Madamu">Madamu</option>
                            </select>
                            <span
                              className="select2 select2-container select2-container--bootstrap-5"
                              dir="ltr"
                              data-select2-id="select2-data-5-np4c"
                              style={{ width: 391 }}
                            >
                              <span className="selection">
                                <span
                                  className="select2-selection select2-selection--single"
                                  role="combobox"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  tabIndex={0}
                                  aria-disabled="false"
                                  aria-labelledby="select2-2fn7-container"
                                  aria-controls="select2-2fn7-container"
                                >
                                  <span
                                    className="select2-selection__rendered"
                                    id="select2-2fn7-container"
                                    role="textbox"
                                    aria-readonly="true"
                                    title="Select Village"
                                  >
                                    <span className="select2-selection__placeholder">
                                      Select Village
                                    </span>
                                  </span>
                                  <span
                                    className="select2-selection__arrow"
                                    role="presentation"
                                  >
                                    <b role="presentation" />
                                  </span>
                                </span>
                              </span>
                              <span
                                className="dropdown-wrapper"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right side */}
                <div className="col-lg-4">
                  {/* Status */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6">Gender</h3>
                      <select
                        className="form-control"
                        required={true}
                        onChange={handleChange}
                        name="gender"
                        value={values.gender}
                      >
                        <option value="draft" selected>
                          Select gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  {/* Avatar */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6">Birth Date</h3>
                      <input
                        className="form-control"
                        type="date"
                        name="birth_date"
                        onChange={handleChange}
                        required={true}
                        value={values.birth_date}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default NewPatient;
