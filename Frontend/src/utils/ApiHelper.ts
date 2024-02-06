import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define an interface for your expected response to enforce type checking
interface ApiResponse<T> {
    data: T;
    status: number;
}

// API Helper Class
class ApiHelper {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = "http://localhost:4001") {
        this.axiosInstance = axios.create({
            baseURL,
            // You can add more default settings here
        });
    }

    // Method to perform GET requests
    public async get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get<T>(url, { params });
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            // Handle error
            // You can customize this part to handle errors more gracefully
            throw new Error('An error occurred while fetching data.');
        }
    }

    // Method to perform POST requests
    public async post<T>(url: string, data?: object): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post<T>(url, data);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            // Handle error
            // You can customize this part to handle errors more gracefully
            throw new Error('An error occurred while posting data.');
        }
    }

    // Add more methods for other types of requests (PUT, DELETE, etc.) as needed
}

export default ApiHelper;