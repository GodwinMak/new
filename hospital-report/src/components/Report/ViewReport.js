import React, {useEffect} from "react";
import { useHospitalContext } from "../../hooks/useHospitalContext";
import { useReportContext } from "../../hooks/useReportContext";
import axios from "axios";
import { url } from "../../Utills/API";

const ViewReport = () => {
  const handlePrint = () => {
    window.print();
  };
  const hospital_data = useHospitalContext();
  const reportData = useReportContext();
  const {dispatch} = useReportContext();

  console.log(reportData.report.report)
  console.log(reportData.reportData.report);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = ["patientdata1", "patientdata2", "patientdata3"];
        const reportDate = reportData.report.report.report_date;
        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            axios.get(`${url}/report/${endpoint}?date=${reportDate}`)
          )
        );

        responses.forEach((response, index) => {
          dispatch({
            type: `GETPATIENTSDATA${index + 1}`,
            payload: response.data,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, reportData.report.report_date]);


  return (
    <>
      <div className="content-wrapper pt-2">
        <section class="content">
          <div class="container-fluid">
            <main className="m-5 p-5 bg-white">
              <header className="flex flex-col  mb-5">
                <div>
                  <ul className="flex justify-end">
                    <li className="btn btn-print" onClick={handlePrint}>
                      Print
                    </li>
                    <li className="btn">Download</li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <h2 className="font-bold uppercase tracking-wide text-2xl mb-2">
                    Montly Report on Nutrition
                  </h2>
                </div>
                <div className="flex justify-center mb-2">
                  <ul className="flex items-center justify-between flex-wrap gap-5 uppercase">
                    <li className="flex justify-between gap-3">
                      <strong>Name of Hospital</strong>
                      <u>{hospital_data.hospital[0].hospital_name}</u>
                    </li>
                    <li className="flex justify-between gap-3">
                      <strong>District</strong>
                      <u>{hospital_data.hospital[0].hospital_district}</u>
                    </li>
                    <li className="flex justify-between gap-3">
                      <strong>Region</strong>
                      <u>{hospital_data.hospital[0].hospital_region}</u>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <ul className="flex items-center justify-between flex-wrap gap-5 uppercase">
                    <li>
                      <strong>Month</strong>
                      <span className="ml-3">
                        {new Date(
                          reportData.reportData.date
                        ).getMonth() + 1}
                      </span>
                    </li>
                    <li>
                      <strong>Year</strong>
                      <span className="ml-3">
                        {new Date(
                          reportData.reportData.date
                        ).getFullYear()}
                      </span>
                    </li>
                  </ul>
                </div>
              </header>
              <div className="card mb-3">
                <div className="card-header flex justify-center uppercase font-bold">
                  Treatment of Malnutrition
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Details</th>
                        <th>Yes/No</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>Does health care give services on Malnutrition</td>
                        <td>
                          <div>
                            {reportData.reportData.giving_services
                              ? "Yes"
                              : "No"}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Does Health care have another services</td>
                        <td>
                          <div>
                            {reportData.reportData
                              .giving_other_services
                              ? "Yes"
                              : "No"}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>
                          Does Health care have legal right to give services
                        </td>
                        <td>
                          <div>
                            {reportData.reportData.rights_for_service
                              ? "Yes"
                              : "No"}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>Does Health care have home made Nutrition food </td>
                        <td>
                          <div>
                            {reportData.reportData.home_made_food
                              ? "Yes"
                              : "No"}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>5.</td>
                        <td>
                          Does Health care have industrial Nutrition food{" "}
                        </td>
                        <td>
                          <div>
                            {reportData.reportData.industrial_food
                              ? "Yes"
                              : "No"}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>6.</td>
                        <td>Does Health care have Nutrition food </td>
                        <td>
                          <div>
                            {reportData.reportData.have_food
                              ? "Yes"
                              : "No"}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header flex justify-center uppercase font-bold">
                  Treatment of Malnutrition
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Details</th>
                        <th>Male</th>
                        <th>Female</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>
                          Number of children under 5 years who are stagnate
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5StuningMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5StuningFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>Number of children who have Malnutrition</td>
                        <td>
                          <div>{reportData.patientsData1.under5TotalMale}</div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5TotalFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>
                          Number of children who have Malnutrition under
                          Treatment
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5AdmittedMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5Admittedfemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>
                          Number of children who have Malnutrition who have been
                          cured
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5ReleasedMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5ReleasedFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>5.</td>
                        <td>
                          Number of children who have Malnutrition who have Left
                          Treatment{" "}
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5LeftTreatmentMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5LeftTreatmentFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>6.</td>
                        <td>
                          Number of children who have Malnutrition who Died{" "}
                        </td>
                        <td>
                          <div>{reportData.patientsData1.under5DeathMale}</div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5Deathfemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>7.</td>
                        <td>
                          Number of children who have Malnutrition who have
                          wasting{" "}
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5WastingMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5Wastingfemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>8.</td>
                        <td>
                          Number of children who have Malnutrition who have over
                          weight{" "}
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5OverweightMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData1.under5Overweightfemale}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header flex justify-center uppercase font-bold">
                  Treatment of Malnutrition
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Details</th>
                        <th>Male</th>
                        <th>Female</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>
                          Number of Elderly who are above 60 who have wasting
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5WastingMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5WastingFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>
                          Number of Elderly who are above 60 who have Stuning
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5StuningMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5StuningFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>
                          Number of Elderly who are above 60 who have Inadequet
                          Vitamins
                        </td>
                        <td>
                          <div>
                            {
                              reportData.patientsData2
                                .under5InadequetVitaminsMale
                            }
                          </div>
                        </td>
                        <td>
                          <div>
                            {
                              reportData.patientsData2
                                .under5InadequetVitaminsFemale
                            }
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>
                          Number of Elderly who are above 60 who have Over
                          weight
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5OverweightMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5OverweightFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>5.</td>
                        <td>
                          Number of Elderly who are above 60 years who have
                          under weight
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5UnderweightMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData2.under5UnderweightFemale}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header flex justify-center uppercase font-bold">
                  Treatment of Malnutrition
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 10 }}>#</th>
                        <th>Details</th>
                        <th>Male</th>
                        <th>Female</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1.</td>
                        <td>
                          Number of Elderly who are under 60 years who have
                          wasting
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5WastingMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5WastingFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>
                          Number of Elderly who are under 60 years who have
                          Stuning
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5StuningMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5StuningMale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>
                          Number of Elderly who are under 60 years who have
                          Inadequet Vitamins
                        </td>
                        <td>
                          <div>
                            {
                              reportData.patientsData3
                                .under5InadequetVitaminsMale
                            }
                          </div>
                        </td>
                        <td>
                          <div>
                            {
                              reportData.patientsData3
                                .under5InadequetVitaminsFemale
                            }
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>
                          Number of Elderly who are under 60 years who have Over
                          weight
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5OverweightMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5OverweightFemale}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>5.</td>
                        <td>
                          Number of Elderly who are under 60 years who have
                          under weight
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5UnderweightMale}
                          </div>
                        </td>
                        <td>
                          <div>
                            {reportData.patientsData3.under5UnderweightFemale}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>
    </>
  );
};

export default ViewReport;
