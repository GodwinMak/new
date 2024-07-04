import { HospitalContext } from "../context/HospitalContext";
import { useContext } from "react";

export const useHospitalContext = () => {
    const context = useContext(HospitalContext);
    
    if (!context) {
        throw Error("useHospitalContext must be used inside an HospitalContextProvider");
    }
    
    return context;
}
