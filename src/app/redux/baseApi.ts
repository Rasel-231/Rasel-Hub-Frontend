
import { createApi } from "@reduxjs/toolkit/query/react";
import { typeTagList } from "../types/types";
import { axiosBaseQuery } from "./axiosBaseQuery";
import { env } from "process";


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({

    baseUrl: env.NEXT_PUBLIC_API_URL || "https://rasel-hub-backend.onrender.com/api/v1",

  }),

  tagTypes: typeTagList,
  endpoints: () => ({}),
});
