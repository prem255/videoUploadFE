import * as localConfigFile from "./config.local";


const currentEnv = () => {
 return process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : "local";
};

const fetchConfig = () => {

 return localConfigFile;
};

const configFile = fetchConfig();

export {
 currentEnv,
 configFile,
};