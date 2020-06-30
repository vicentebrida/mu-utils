const keytar = require("keytar");
const os = require('os');

const envVariables = require("../../env-variables");

const { keystarService } = envVariables;

const keytarService = keystarService;
const keytarAccount = os.userInfo().username;
