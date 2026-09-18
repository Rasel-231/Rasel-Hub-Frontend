
import { createApi } from "@reduxjs/toolkit/query/react";
import { typeTagList } from "../types/types";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://rasel-hub-backend.onrender.com/api/v1";
// process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),

  tagTypes: typeTagList,
  endpoints: () => ({}),
});
