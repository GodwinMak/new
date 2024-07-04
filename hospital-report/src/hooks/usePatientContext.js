import { PatientContext } from "../context/PatientContext";
import { useContext } from "react";

export const usePatientContext = () => {
    const context = useContext(PatientContext);
    
    if (!context) {
        throw Error("usePatientContext must be used inside an PatientContextProvider");
    }
    
    return context;
}