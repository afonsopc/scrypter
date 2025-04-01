import { scriptStorage, type Script } from "./script";

const getScriptElement = (
  script: Script,
  onEnableToggle: () => void,
  onRemove: () => void
) => {
  const scriptDiv = document.createElement("div");
  scriptDiv.className = "script";
  scriptDiv.innerHTML = `
        <h3>${script.name}</h3>
        <p>${script.description}</p>
        <label>
            <input type="checkbox" ${script.enabled ? "checked" : ""} />
            Enable
        </label>
        <button class="remove">Remove</button>
    `;
  const checkbox = scriptDiv.querySelector("input[type='checkbox']");
  const removeButton = scriptDiv.querySelector(".remove");
  if (
    !checkbox ||
    !removeButton ||
    !(checkbox instanceof HTMLInputElement) ||
    !(removeButton instanceof HTMLButtonElement)
  )
    throw new Error("Checkbox or remove button not found");
  checkbox.addEventListener("change", onEnableToggle);
  removeButton.addEventListener("click", onRemove);
  return scriptDiv;
};

const scriptOnEnableToggle = (script: Script) => {
  return () => {
    script.enabled = !script.enabled;
    scriptStorage.updateScript(script.name, script);
  };
};

const scriptOnRemove = (script: Script) => {
  return () => {
    scriptStorage.removeScript(script.name);
    renderScripts();
  };
};

const renderScripts = async () => {
  console.log("Rendering scripts...");
  const scripts = await scriptStorage.getScripts();
  console.log("Scripts loaded:", scripts);
  const scriptsDiv = document.getElementById("scripts");
  if (!scriptsDiv) throw new Error("Scripts div not found");
  scriptsDiv.innerHTML = "";
  scripts.forEach((script) => {
    const scriptElement = getScriptElement(
      script,
      scriptOnEnableToggle(script),
      scriptOnRemove(script)
    );
    scriptsDiv.appendChild(scriptElement);
  });
};

renderScripts();
