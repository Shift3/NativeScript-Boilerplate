
// environment.dev.ts is a REQUIRED file but is not on Git since this file is for developers to
// express their own LAN configuration for REST endpoints; below you can see a LOC mock-up

const production = false;

// [ environment.dev.ts contents ]
const runEnv: String = "DEV";
let apiPrefix = "";
switch (runEnv) {
    case "STAGE":
        apiPrefix = "http://192.168.10.106:8000/wp-json/wp/v2";
        break;
    case "PROD":
        apiPrefix = "http://192.168.10.106:8000/wp-json/wp/v2";
        break;
    default:
        apiPrefix = "http://192.168.10.106:8000/wp-json/wp/v2";
}
const hideLogs = false;

const automaticLogin6 = {
    email: runEnv ? "" : "fsampaio@shift3tech.com",
    password: runEnv ? "" : "abc123",
};
const automaticLogin3 = {
    email: runEnv ? "" : "fsampaio18@gmail.com",
    password: runEnv ? "" : "abc123",
};
const automaticLogin = { // in production db
    email: runEnv ? "" : "lfsamp@gmail.com",
    password: runEnv ? "" : "Lf!80970",
};
const automaticLogin5 = {
    email: runEnv ? "" : "shift333@tech.com",
    password: runEnv ? "" : "abc123",
};
const automaticLogin4 = {
    email: runEnv ? "" : "cshuman@shift3tech.com",
    password: runEnv ? "" : "corecore",
};
const automaticLogin2 = {
    email: runEnv ? "" : "devapi@shift3tech.com",
    password: runEnv ? "" : "devapi",
};
const automaticLogin1 = {
    email: runEnv ? "" : "lphan@shift3tech.com",
    password: runEnv ? "" : "Lucas@4753",
};

export {
    production,
    automaticLogin,
    apiPrefix,
    hideLogs
};
