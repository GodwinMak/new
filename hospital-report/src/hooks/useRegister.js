import { useState} from "react";
import { useUserContext } from "./useUserContext";
import { useHospitalContext } from "./useHospitalContext";
import axios from "axios";
import { url } from "../Utills/API";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch: authDispatch } = useUserContext();
  const data = useHospitalContext();
  
  const register = async (first_name, last_name,email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios
        .post(`${url}/users/`, {
          first_name,
          last_name,
          email,
          password,
          hospital_id: data.hospital[0].hospital_id,
        })
        .then((res) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: res.data,
            })
          );
          authDispatch({
            type: "REGISTER",
            payload: res.data,
          });
          setIsLoading(false);
          window.location = "/main";
        });
    } catch (error) {
      console.log(error.response.data.message)
      setIsLoading(false);
      setError(error.response.data);
    }
  };
  return { register, isLoading, error, setError };
};
