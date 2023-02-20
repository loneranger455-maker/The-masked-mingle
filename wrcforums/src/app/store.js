import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { forumApi } from '../services/Apicalls'

export const store = configureStore({
  reducer: {
    
    [forumApi.reducerPath]: forumApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(forumApi.middleware),
})

setupListeners(store.dispatch)