import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const cookieAdapter = createEntityAdapter({})

const initialState = cookieAdapter.getInitialState()

export const cookieApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCookies: builder.query({
            query: () => '/cookies',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedCookies = responseData.map(cookie => {
                    cookie.id = cookie._id
                    return cookie
                });
                return cookieAdapter.setAll(initialState, loadedCookies)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Cookie', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Cookie', id }))
                    ]
                } else return [{ type: 'Cookie', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetCookiesQuery,
} = cookieApiSlice

// returns the query result object
export const selectCookiesResult = cookieApiSlice.endpoints.getCookies.select()

// creates memoized selector
const selectCookiesData = createSelector(
    selectCookiesResult,
    cookieResult => cookieResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCookies,
    selectById: selectCookieById,
    selectIds: selectCookieId
    // Pass in a selector that returns the cookies slice of state
} = cookieAdapter.getSelectors(state => selectCookiesData(state) ?? initialState)