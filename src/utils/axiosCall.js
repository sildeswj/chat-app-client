import Axios from "axios";
import { serverConfig } from '../utils/config';

export const defaultAxios = Axios.create({
  baseURL: serverConfig['host'],
});
