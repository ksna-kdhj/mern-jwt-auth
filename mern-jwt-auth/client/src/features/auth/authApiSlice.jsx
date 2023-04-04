import { apiSlice } from "../../api/apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: credentials =>({
                url:'/auth',
                method: 'POST',
                body:{...credentials}
            }),
        }),
        logout: builder.mutation({
            query: ()=>({
                url:'/logout',
                method: 'POST'
            })
        }),
        refresh: builder.mutation({
            query: ()=>({
            url:'/refresh',
            method:'GET',
        })
        }),
        users: builder.query({
            query:()=>'users',
        }),
        register: builder.mutation({
            query:credentials=>({
                url:'/register',
                method:'POST',
                body:{...credentials}
            })
        })
    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation,
    useUsersQuery,
    useRegisterMutation
} = authApiSlice