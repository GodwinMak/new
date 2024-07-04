import React, { createContext, useReducer } from "react";
import axios from "axios";
import { url } from "../Utills/API";

const initialState = {
    hospital: JSON.parse(localStorage.getItem("hospital")) || {},
};

export const HospitalContext = createContext();

export const hospitalReducer = (state, action) => {
    switch (action.type) {
      case "GETHOSPITAL":
        return {
          hospital: action.payload,
        };
      default:
        return state;
    }
}

export const HospitalContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(hospitalReducer, initialState);
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}/hospital/`);
          dispatch({
            type: "GETHOSPITAL",
            payload: response.data,
          });
        } catch (error) {
          
        }
      };
      fetchData();
    }, [dispatch]);

    React.useEffect(() => {
        localStorage.setItem("hospital", JSON.stringify(state.hospital));
    }, [state.hospital]);

    return (
        <HospitalContext.Provider value={{...state, dispatch}}>
            {children}
        </HospitalContext.Provider>
    );
}