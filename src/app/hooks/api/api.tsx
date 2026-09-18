import { baseApi } from "@/app/redux/baseApi";
import { IClient, IResponse, TagTypes } from "@/app/types/types";

export const clientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ------------------- GET ALL -------------------
    clients: build.query<IResponse<IClient[]>, void>({
      query: () => ({ 
        url: "/username", 
        method: "GET", 
        withCredentials: true 
      }),
      providesTags: [TagTypes.clients],
    }),

    // ------------------- CREATE (newUser fix) -------------------
    createClients: build.mutation<IResponse<IClient>, Partial<IClient>>({
      query: (newUser: Partial<IClient>) => ({
        url: "/username/create-user",
        method: "POST",
        data: newUser,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }),
      invalidatesTags: [TagTypes.clients],
    }),

    // ------------------- UPDATE (id + data fix) -------------------
    updateClients: build.mutation<
      IResponse<IClient>,
      { id: string; data: Partial<IClient> }
    >({
      query: ({ id, data }: { id: string; data: Partial<IClient> }) => ({
        url: `/username/${id}`,
        method: "PATCH",
        data,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }),
      invalidatesTags: [TagTypes.clients],
    }),

    // ------------------- DELETE (id fix) -------------------
    deleteClients: build.mutation<IResponse<null>, string>({
      query: (id: string) => ({
        url: `/username/${id}`,
        method: "DELETE",
        withCredentials: true,
      }),
      invalidatesTags: [TagTypes.clients],
    }),

    // ------------------- LOGIN (credentials fix) -------------------
    login: build.mutation<IResponse<IClient>, { userId: string }>({
      query: (credentials: { userId: string }) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }),
      invalidatesTags: [TagTypes.Auth, TagTypes.clients],
    }),

    // ------------------- LOGOUT -------------------
    logout: build.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        withCredentials: true,
      }),
      invalidatesTags: [TagTypes.Auth, TagTypes.clients],
    }),

    // ------------------- VERIFY -------------------
    verify: build.query<IResponse<IClient>, void>({
      query: () => ({
        url: "/auth/verify",
        method: "GET",
        withCredentials: true,
      }),
      providesTags: [TagTypes.Auth],
    }),
  }),
  overrideExisting: true,
});

export const {
  useClientsQuery,
  useCreateClientsMutation,
  useUpdateClientsMutation,
  useDeleteClientsMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyQuery,
} = clientApi;