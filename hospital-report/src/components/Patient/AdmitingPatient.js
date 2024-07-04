import React, {useState} from "react";
import { usePatientContext } from "../../hooks/usePatientContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { url } from "../../Utills/API";
const AdmitingPatient = () => {
  const data = usePatientContext();


  const [values, setValues] = useState({
    date: "",
    type_of_patient: "",
    height: "",
    weight: "",
    patient_id: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };

  const handleValidation = () => {
    const { type_of_patient, height, weight } = values;
    if (type_of_patient.length === "") {
      toast.error("Type of patient  is required", toastOptions);
      return false;
    } else if (height === "") {
      toast.error("Height is required", toastOptions);
      return false;
    }else if(weight === ""){
      toast.error("Weight is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event)=>{
    event.preventDefault();
    
    try {
      if(handleValidation()){
        const {date, type_of_patient, height, weight} = values
        await axios
          .post(`${url}/admiting`,{
              date,
              type_of_patient,
              height,
              weight,
              patient_id: data.patient.patient_id,
          })
          .then((res) => {
            toast.success(res.data.message, toastOptions);
            setValues({
              date: "",
              type_of_patient: "",
              height: "",
              weight: "",
              patient_id: "",
            });
          });
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, toastOptions);
    }
  }
  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  
  const calculateAge = (birthDateString) => {
     var today = new Date();
     var birthDate = new Date(birthDateString);
     if (birthDate > today) {
       return "The birth date is in the future.";
     }

     var ageInYears = today.getFullYear() - birthDate.getFullYear();
     var ageInMonths =
       today.getMonth() - birthDate.getMonth() + 12 * ageInYears;
     var ageInWeeks = Math.floor(
       (today - birthDate) / (7 * 24 * 60 * 60 * 1000)
     );
     var ageInDays = Math.floor((today - birthDate) / (24 * 60 * 60 * 1000));

     if (ageInYears > 0) {
       return ageInYears + (ageInYears > 1 ? " years" : " year");
     } else if (ageInMonths > 0) {
       return ageInMonths + (ageInMonths > 1 ? " months" : " month");
     } else if (ageInWeeks > 0) {
       return ageInWeeks + (ageInWeeks > 1 ? " weeks" : " week");
     } else {
       return ageInDays + (ageInDays > 1 ? " days" : " day");
     }
  };

  const handleCancle = async (event) => {
    event.preventDefault();
    try {
      setValues({
        date: "",
        type_of_patient: "",
        height: "",
        weight: "",
        test_made: "",
        test_result: "",
        treatment: "",
        recommendation: "",
        payment_method: "",
        status: "",
        comments: "",
        patient_id: data.patient.patient_id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="content-wrapper pt-2">
        <section className="content">
          <div class="container-fluid">
            <div className="container">
              <div className="d-flex justify-content-between align-items-lg-center py-3 flex-column flex-lg-row">
                <h2 className="h5 mb-3 mb-lg-0">Admiting Patient</h2>
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
                      <h3 className="h6 mb-4">Patient information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">First name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="first_name"
                              value={data.patient.first_name}
                              disabled
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
                              value={data.patient.middle_name}
                              disabled
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
                              value={data.patient.last_name}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input
                              type="text"
                              className="form-control"
                              name="age"
                              value={calculateAge(
                                data.patient.birth_date.split("T")[0]
                              )}
                              disabled
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
                              data-select2-placeholder="Select country"
                              data-select2-id="select2-data-1-gy14"
                              tabIndex={-1}
                              aria-hidden="true"
                              required={true}
                              value={data.patient.ward}
                              name="ward"
                              disabled
                            >
                              <option data-select2-id="select2-data-3-ibs9" />
                              <option value="Mkuyuni">Mkuyuni</option>
                            </select>
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
                              value={data.patient.village}
                              disabled
                            >
                              <option data-select2-id="select2-data-6-cshs" />
                              <option value="Kibweya">Kibweya</option>
                              <option value="Mfumbwe">Mfumbwe</option>
                              <option value="Changa">Changa</option>
                              <option value="Madamu">Madamu</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* patient today data */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="h6 mb-4">Todays Data</h5>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Todays date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="date"
                              value={values.date}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label className="form-lable">Type of Patient</label>
                          <select
                            className="select2 form-control select2-hidden-accessible"
                            data-select2-placeholder="Select Type of Patient"
                            data-select2-id="select2-data-1-gy14"
                            tabIndex={-1}
                            aria-hidden="true"
                            name="type_of_patient"
                            value={
                              values.type_of_patient
                            }
                            onChange={handleChange}
                          >
                            <option>Type of Patient</option>
                            <option value="Child">Child</option>
                            <option value="Pregnant Woman">
                              Pregnant Woman
                            </option>
                            <option value="Elderly">Elderly</option>
                            <option value="Normal Patient">
                              Normal Patient
                            </option>
                          </select>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Height</label>
                            <input
                              className="form-control"
                              type="number"
                              name="height"
                              onChange={handleChange}
                              value={values.height}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">Weight</label>
                            <input
                              className="form-control"
                              type="number"
                              name="weight"
                              onChange={handleChange}
                              value={
                               values.weight
                              }
                            />
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
                        // required={true}
                        // onChange={handleChange}
                        name="gender"
                        value={data.patient.gender}
                        disabled
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
                        // onChange={handleChange}
                        // required={true}
                        value={data.patient.birth_date.split("T")[0]}
                        disabled
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

export default AdmitingPatient;
