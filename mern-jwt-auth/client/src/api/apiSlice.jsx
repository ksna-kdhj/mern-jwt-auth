import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials,clearCredentials } from '../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders:(headers,{getState}) => {
        const token = getState().auth.token
        if (token){
            headers.set('authorization',`Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReAuth = async(args,api,extraOptions) =>{
    let result = await baseQuery(args,api,extraOptions)
    if(result?.error?.originalStatus===403){
        const refreshToken = baseQuery('/refresh',api,extraOptions)
        if (refreshToken?.data){
            const user = api.getState().auth.user
            api.dispatch(setCredentials({user,...refreshToken.data}))
            result = await baseQuery(args,api,extraOptions)
        }
        else{
            api.dispatch(clearCredentials())
        }
    }
    return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder)=>({})
})