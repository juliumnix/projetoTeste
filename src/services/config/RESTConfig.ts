import axios from "axios";
import { RESTAdapter } from "../types/RESTAdapter";

export class RESTConfig implements RESTAdapter {
  axiosInstance = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
  });
}
