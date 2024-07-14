/* This code snippet is setting up an Axios instance with global request and response interceptors for
handling authentication token refresh. Here's a breakdown of what the code is doing: */

import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add global request interceptor
api.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Add global response interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => response, // Directly return successful responses.
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest?._retry
//     ) {
//       originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

//       try {
//         const refreshToken = localStorage.getItem("refreshToken")

//         // Make a request to your auth server to refresh the token.
//         const { data } = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-tokens`,
//           {
//             refreshToken: refreshToken,
//           }
//         );

//         // Store the new access and refresh tokens.
//         localStorage.setItem(
//           "accessToken",
//           data.tokens.access.token
//         );
//         localStorage.setItem(
//           "refreshToken",
//           data.tokens.refresh.token
//         );
//         localStorage.setItem("user", data.payload.user);

//         // Update the authorization header with the new access token.
//         api.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${data.tokens.access.token}`;

//         return api(originalRequest); // Retry the original request with the new access token.
//       } catch (refreshError) {
//         // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("user");
//         window.location.href = "/sign-in";
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error); // For all other errors, return the error as is.
//   }
// );

export default api;
