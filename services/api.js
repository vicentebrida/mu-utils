const axios = require('axios');
const envVariables = require("../env-variables");

const { backendUrl } = envVariables;

const api = axios.create({
  baseURL: backendUrl,
});
