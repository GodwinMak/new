import React, { createContext, useReducer} from "react";
import axios from "axios";
import { url } from "../Utills/API";


const initialState = {
  patients: JSON.parse(localStorage.getItem("patients")) || {},
  patient: JSON.parse(localStorage.getItem("patient")) || {},
  admitedPatients: JSON.parse(localStorage.getItem("admited_patients")) || {},
  admitedPatient: JSON.parse(localStorage.getItem("admited_patient")) || {},
};


export const PatientContext = createContext();

export const patientReducer = (state, action) =>{
    switch (action.type) {
      case "GETPATIENTS":
        return {
          ...state,
          patients: action.payload,
        };
      case "GETPATIENT":
        return {
          ...state,
          patient: action.payload,
        };
      case "ADMITED_PATIENTS":
        return {
          ...state,
          admitedPatients: action.payload,
        };
      case "ADMITED_PATIENT":
        return {
          ...state,
          admitedPatient: action.payload,
        };
      default:
        return state;
    }
}


export const PatientContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(patientReducer, initialState);
    
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response1 = await axios.get(`${url}/patient/`);
          const response2 = await axios.get(`${url}/admiting/`);
          console.log(response2.data)
          dispatch({
            type: "GETPATIENTS",
            payload: response1.data,
          });
          dispatch({
            type: "ADMITED_PATIENTS",
            payload: response2.data,
          });
        } catch (error) {
          console.log(error)
        }
      };
      fetchData();
    }, [dispatch]);


    React.useEffect(() => {
      localStorage.setItem("patients", JSON.stringify(state.patients));
      localStorage.setItem("patient", JSON.stringify(state.patient));
      localStorage.setItem("admited_patients", JSON.stringify(state.admitedPatients));
      localStorage.setItem("admited_patient", JSON.stringify(state.admitedPatient));
    }, [state.admitedPatient, state.admitedPatients, state.patient, state.patients]);
    return (
        <PatientContext.Provider value={{...state, dispatch}}>
            {children}
        </PatientContext.Provider>
    );
}