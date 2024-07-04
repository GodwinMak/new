import { useState } from "react";
import { useUserContext } from "./useUserContext";
import axios from "axios";
import {url} from "../Utills/API"

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch: authDispatch } = useUserContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios
        .post(`${url}/users/login`, {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: res.data,
            })
          );
          authDispatch({
            type: "LOGIN",
            payload: res.data ,
          });
          setIsLoading(false);
          window.location = "/main";
        });
    } catch (error) {
      setIsLoading(false);
      error.response.data && setError(error.response.data);
    }
  };
  return { login, isLoading, error, setError };
};
