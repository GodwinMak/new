import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { HospitalContextProvider } from "./context/HospitalContext";
import { PatientContextProvider } from "./context/PatientContext";
import { ReportContextProvider } from "./context/ReportContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HospitalContextProvider>
      <UserContextProvider>
        <PatientContextProvider>
          <ReportContextProvider>
            <App />
          </ReportContextProvider>
        </PatientContextProvider>
      </UserContextProvider>
    </HospitalContextProvider>
  </React.StrictMode>
);
