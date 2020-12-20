import axios, { AxiosInstance } from "axios";

export class HttpService {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "/api",
      headers: { "Content-Type": "application/json" },
    })
  }

  list() { }

  detail(_: number) { }

  save(_: any) { }
}
