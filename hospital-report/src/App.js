import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Dashboard from "./components/Dashboard/Dashboard";
import Patient from "./components/Patient";
import NewPatient from "./components/Patient/NewPatient";
import AdmitingPatient from "./components/Patient/AdmitingPatient";
import AdmitedPatients from "./components/Patient/AdmitedPatients";
import ChangeData from "./components/Patient/ChangeData";
import Report from "./components/Report";
import AddReport from "./components/Report/AddReport";
import ViewReport from "./components/Report/ViewReport";
import ReportData from "./components/Report/ReportData";
import { useUserContext } from "./hooks/useUserContext";
function App() {
  const user = useUserContext();
  console.log(user)
  return (
    <>
      <BrowserRouter>
        <Routes>
          {Object.keys(user.user).length === 0 ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/main" element={<Main />}>
                {user.user.user.user_type === "admin" && (
                  <>
                    <Route path="/main" element={<Dashboard />} />
                    <Route path="/main/report" element={<Report />} />
                    <Route path="/main/newreport" element={<AddReport />} />
                    <Route path="/main/reportdata" element={<ReportData />} />
                    <Route path="/main/viewreport" element={<ViewReport />} />
                  </>
                )}
                <Route path="/main/patient" element={<Patient />} />
                <Route path="/main/newpatient" element={<NewPatient />} />
                <Route
                  path="/main/admitingpatient"
                  element={<AdmitingPatient />}
                />
                <Route
                  path="/main/admitedpatient"
                  element={<AdmitedPatients />}
                />
                <Route path="/main/changedata" element={<ChangeData />} />
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
