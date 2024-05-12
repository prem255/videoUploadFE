// import { LoginUrl } from '../config'
import { configFile } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { VideoUrl } from "../config/config.local";

const { LoginUrl } = configFile;

const createConfig = (url, body, method, id) => {
  let Token = window.localStorage.getItem("token");
  if (Token) Token = Token.replaceAll('"', "");

  if (method === "delete" || method === "put") {
    const config = {
      method,
      url: url + "/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      data: body,
    };

    return config;
  }

  const config = {
    method,
    url,
    // withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Token}`,
    },
    data: body,
  };

  return config;
};

async function Login(obj) {
  try {
    const config = { url: LoginUrl, data: obj, method: "post" };
    const loginResponse = await axios(config);
    return loginResponse;
  } catch (error) {
    console.log(error);
    const msg = error?.response;
    return msg;
  }
}
async function callApiFunction(url, obj, type, id = "") {
  try {
    const config = createConfig(url, obj, type, id);
    console.log(url)
    const response = await axios(config);
    if (url === VideoUrl && type === "post") toast.success("Added successfully");
    return response;
  } catch (error) {
    if (error?.response?.status === 401) {
      window.localStorage.removeItem("token");
      window.location.href = "/";
    }
    const msg = error?.response;
    toast.error(msg);
    return msg;
  }
}

export { Login, callApiFunction };
