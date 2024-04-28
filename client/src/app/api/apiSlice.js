import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://r-ilcookies-api.onrender.com' }),
    tagTypes: ['Cookie'],
    endpoints: builder => ({})
})