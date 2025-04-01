import { scriptStorage } from "./script";

const loadScripts = async () => {
  const hostname = window.location.hostname;
  (await scriptStorage.getScripts())
    .filter((script) => script.hostnames.includes(hostname) && script.enabled)
    .forEach((script) => eval(script.code));
};

if (document.readyState === "loading" || document.readyState === "interactive")
  document.addEventListener("DOMContentLoaded", loadScripts);
else loadScripts();
