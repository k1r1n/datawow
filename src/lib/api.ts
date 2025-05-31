import axios, { AxiosRequestConfig, AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function callApi(endpoint: string, options: any = {}) {
  const config: AxiosRequestConfig = {
    url: endpoint,
    method: options.method || "GET",
    data: options.data,
    params: options.params,
    headers: options.headers,
    ...options,
  };

  try {
    const response = await axiosInstance(config);

    if (
      response.status === 204 ||
      (config.method?.toUpperCase() === "DELETE" && response.status < 300)
    ) {
      return { success: true, status: response.status, data: response.data };
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("API Error Response Data:", axiosError.response.data);

      const serverError = axiosError.response.data as any;
      const errorMessage =
        serverError?.message ||
        (Array.isArray(serverError?.message)
          ? serverError.message.join(", ")
          : null) ||
        `API call failed with status ${axiosError.response.status}`;
      throw new Error(errorMessage);
    } else if (axiosError.request) {
      console.error("API No Response:", axiosError.request);
      throw new Error(
        "No response received from API server. Please check your network connection or if the server is running."
      );
    } else {
      console.error("API Request Setup Error:", axiosError.message);
      throw new Error(axiosError.message || "Error setting up API request.");
    }
  }
}

export default callApi;
