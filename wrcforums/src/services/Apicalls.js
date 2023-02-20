import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
     //APi for fetching donated product
  allForums: builder.query({
    query: (access_token) =>{
return {
url:'allforums/',
method:'GET',
headers:{
  'authorization':`Bearer ${access_token}`
}

}

    }
  }),
  //API for joining a forum
  joinForum: builder.query({
    query: (access_token,forum_id) =>{
return {
url:'joinforums/'+forum_id,
method:'GET',
headers:{
  'authorization':`Bearer ${access_token}`
}

}

    }
  }),
  }),
})


export const { useAllForumsQuery, useJoinForumQuery } = forumApi