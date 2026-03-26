
import { createApi } from "@reduxjs/toolkit/query/react";
import { typeTagList } from "../types/types";
import { axiosBaseQuery } from "./axiosBaseQuery";


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5001/api/v1",
    // baseUrl: "https://my-backend-production-5023.up.railway.app/api/v1",
  }),

  tagTypes: typeTagList,
  endpoints: () => ({}),
});
