import axios, { AxiosInstance } from "axios";

export class HttpService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "/api",
      headers: { "Content-Type": "application/json" },
    })
  }

  get(path: string, params: Object = {}) {
    return this.axios.get(path, { params });
  }
}
