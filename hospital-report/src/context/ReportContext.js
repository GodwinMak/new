import React, { createContext, useReducer } from "react";
import axios from "axios";
import { url } from "../Utills/API";


const initialState = {
  reports: JSON.parse(localStorage.getItem("reports")) || {},
  report: JSON.parse(localStorage.getItem("report")) || {},
  reportData: JSON.parse(localStorage.getItem("report_data")) || {},
  patientsData1: JSON.parse(localStorage.getItem("patients_data1")) || {},
  patientsData2: JSON.parse(localStorage.getItem("patients_data2")) || {},
  patientsData3: JSON.parse(localStorage.getItem("patients_data3")) || {},
};

export const ReportContext = createContext();


export const reportReducer = (state, action) =>{
    switch (action.type) {
      case "GETREPORTS":
        return {
          ...state,
          reports: action.payload,
        };
      case "GETREPORT":
        return {
          ...state,
          report: action.payload,
        };
      case "GETREPORTDATA":
        return {
          ...state,
          reportData: action.payload,
        };
      case "GETPATIENTSDATA1":
        return {
          ...state,
          patientsData1: action.payload,
        };
      case "GETPATIENTSDATA2":
        return {
          ...state,
          patientsData2: action.payload,
        };
      case "GETPATIENTSDATA3":
        return {
          ...state,
          patientsData3: action.payload,
        };
      default:
        return state;
    }
}

export const ReportContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(reportReducer, initialState);

    React.useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response1 = await axios.get(`${url}/report/`);
                dispatch({
                    type: "GETREPORTS",
                    payload: response1.data,
                });
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    },[])

    React.useEffect(()=>{
        localStorage.setItem("reports", JSON.stringify(state.reports));
        localStorage.setItem("report", JSON.stringify(state.report));
        localStorage.setItem("report_data", JSON.stringify(state.reportData));
        localStorage.setItem(
          "patients_data1",
          JSON.stringify(state.patientsData1)
        );
        localStorage.setItem(
          "patients_data2",
          JSON.stringify(state.patientsData2)
        );
        localStorage.setItem(
          "patients_data3",
          JSON.stringify(state.patientsData3)
        );
    },[state.patientsData1, state.patientsData2, state.patientsData3, state.report, state.reportData, state.reports]);
    return(
        <ReportContext.Provider value={{...state, dispatch}}>
            {children}
        </ReportContext.Provider>
    )

}