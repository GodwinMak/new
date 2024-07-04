/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../Utills/API';
import { SearchIcon } from '../../Utills/Icons';
import DebouncedInput from '../../Utills/DebouncedInput';
import { useReportContext } from '../../hooks/useReportContext';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ToastContainer, toast } from "react-toastify";

const Report = () => {
  const navigate = useNavigate();
  const { dispatch } = useReportContext();

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleNavigate = () => {
    navigate("/main/newreport");
  };

  const handleViewReport = async(user)=>{
    try {
      console.log(user);
      const resposne1 = await axios.get(
        `${url}/report/reportdata/${user.report_id}`
      );
      dispatch({
        type: "GETREPORTDATA",
        payload: resposne1.data,
      });
      navigate('/main/viewreport')
    } catch (error) {
      console.log(error)
    }
    
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => (
        <span>
          {info.row.index + 1 + (meta.currentPage - 1) * meta.pageSize}
        </span>
      ),
      header: "S.No",
    }),
    columnHelper.accessor("report_id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Card No",
    }),
    columnHelper.accessor("report_name", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Report Name",
    }),
    columnHelper.accessor("report_date", {
      cell: (info) => <span>{info.getValue().split("T")[0]}</span>,
      header: "Report Date",
    }),
    columnHelper.accessor("", {
      id: "actions",
      cell: (info) => (
        <button
          className="btn text-white bg-blue-500"
          onClick={() => handleViewReport(info.row.original)}
        >
          View Report
        </button>
      ),

      header: "Actions",
    }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");
  const [tableData, setTableData] = useState([]);
  const [meta, setMeta] = useState({
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 15,
  });

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const Data = JSON.parse(localStorage.getItem("reports"));
  console.log(Data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/report`);
        const data = response.data;
        console.log(data)

        const filteredUsers = data.filter(
          (user) => user.report_name === Data[0].report_name
        );
        dispatch({
          type: "GETREPORTS",
          payload: filteredUsers,
        });
        setTableData(filteredUsers);
      } catch (error) {
        // toast.error(error.response.data, toastOptions)
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ Data.report_name, dispatch]);

  return (
    <>
      <div className="content-wrapper pt-2">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Reports</h1>
              </div>
              <div class="col-sm-6">
                <button
                  class="btn bg-blue-600 float-sm-right text-white"
                  onClick={handleNavigate}
                >
                  New Report
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="content">
          <div class="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="w-full flex items-center gap-1">
                  <SearchIcon />
                  <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-blue-500"
                    placeholder="Search all columns..."
                  />
                </div>
                <table className="rtl:text-right border border-gray-700 w-full text-left mt-2 ">
                  <thead className="bg-blue-600 text-white">
                    {table &&
                      table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className="capitalize px-3.5 py-2"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                  </thead>
                  <tbody className="text-white">
                    {table.getRowModel().rows.length ? (
                      table.getRowModel().rows.map((row, i) => (
                        <tr
                          key={row.id}
                          className={`
                ${i % 2 === 0 ? "bg-blue-900" : "bg-blue-800"}
                `}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className=" py-2 px-2">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center h-32 text-black">
                        <td colSpan={12}>No Record Found!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* pagination */}
                <div className="flex items-center justify-end mt-2 gap-2">
                  <button
                    onClick={() => {
                      setMeta((prevMeta) => ({
                        ...prevMeta,
                        currentPage: Math.max(1, prevMeta.currentPage - 1),
                      }));
                    }}
                    disabled={meta.currentPage === 1}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={() => {
                      setMeta((prevMeta) => ({
                        ...prevMeta,
                        currentPage: Math.min(
                          prevMeta.totalPages,
                          prevMeta.currentPage + 1
                        ),
                      }));
                    }}
                    disabled={meta.currentPage === meta.totalPages}
                    className="p-1 border border-gray-300 px-2 disabled:opacity-30"
                  >
                    {">"}
                  </button>

                  <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                      {meta.currentPage} of {meta.totalPages}
                    </strong>
                  </span>
                  <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                      type="number"
                      value={meta.currentPage}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Math.max(
                              1,
                              Math.min(meta.totalPages, Number(e.target.value))
                            )
                          : 1;
                        setMeta((prevMeta) => ({
                          ...prevMeta,
                          currentPage: page,
                        }));
                      }}
                      className="border p-1 rounded w-16 bg-transparent"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
}

export default Report
