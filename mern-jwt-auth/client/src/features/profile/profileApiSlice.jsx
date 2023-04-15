import { apiSlice } from "../../api/apiSlice";
export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        setProfile:builder.mutation({
        query: profile=>({
            url:'/profile',
            method:'POST',
            body:{...profile}
        })
    }),
        getProfile:builder.mutation({
        query: usr=>({
            url:'/profile/get',
            method:'POST',
            body:{...usr}
        })

        })
        ,
        deleteDp:builder.mutation({
            query: user=>({
                url:'/profile/delete',
                method:'POST',
                body:{...user}
            })
    
            })
    })
})

export const {
useSetProfileMutation,
useGetProfileMutation,
useDeleteDpMutation
} = profileApiSlice