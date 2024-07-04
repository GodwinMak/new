/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLogin } from "../hooks/useLoign";

const Login = () => {
  const { login, error, isLoading, setError } = useLogin();

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = values;
    await login(email, password);
  };

  if (error) {
    toast.error(error.message, toastOptions);
    setError(null);
  }

  return (
    <>
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="images/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Hopital Report Sign in
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Login in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div> */}
      <div className=" flex flex-col text-center items-center justify-content-center mt-16">
        <div className="flex flex-row flex-wrap gap-4 mt-4">
          <div>
            <img src="/images/court.png" alt="" width={100} height={100} />
          </div>
          <div className="flex flex-col flex-wrap gap-3 font-bold">
            <h1>United Republic of Tanzania</h1>
            <h1>
              President’s Office - Regional Administration and Local Government
            </h1>
            <h1>Morogoro District Council</h1>
          </div>
          <div>
            <img src="/images/morogoro.png" alt="" width={100} height={100} />
          </div>
        </div>
        <div className="mt-10 flex flex-col flex-wrap gap-4">
          <h1 className="font-bold">
            Malnutrition Data Collect Information System
          </h1>
          <div className="bg-white drop-shadow-md rounded-lg p-0.5 max-w-4xl w-full flex border-t-4 border-b-2 border-blue-900 rounded-t-lg">
            <div className="w-2/4 flex items-center justify-center">
              <img src="/images/flag.png" alt="logo" className="" />
            </div>
            <div className="w-2/4 pt-10 pl-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-2 text-start">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700 mb-2 text-start">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 border rounded"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-start grid grid-rows-3 grid-flow-col gap-4">
                  <a className="cursor-pointer row-start-1 row-span-2">
                    Reset Password?
                  </a>
                  <button className="btn bg-blue-600 row-start-1 row-end-4 text-white">
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center flex flex-row gap-3">
                <span>Not Registerd?</span>
                <a href="/register">Click here to register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
