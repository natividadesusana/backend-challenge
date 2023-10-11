import axios from "axios";
import { ExoplanetData } from "../models/exoplanet-model";
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.NASA_API_URL;

export async function fetchExoplanetsData(): Promise<ExoplanetData[]> {
  const response = await axios.get<ExoplanetData[]>(apiUrl);
  return response.data;
}
