import { ReportContext } from "../context/ReportContext";
import { useContext } from "react";
export const useReportContext = () => {
    const context = useContext(ReportContext);

    if(!context){
        throw Error("useReportContext must be used inside a ReportContextProvider")
    }
    return context
}