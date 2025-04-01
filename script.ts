import browser from "webextension-polyfill";

export type Script = {
  name: string;
  description: string;
  enabled: boolean;
  hostnames: string[];
  code: string;
};

const isValidScript = (script: any): script is Script => {
  return (
    typeof script.name === "string" &&
    typeof script.description === "string" &&
    typeof script.enabled === "boolean" &&
    Array.isArray(script.hostnames) &&
    script.hostnames.every((hostname: any) => typeof hostname === "string") &&
    typeof script.code === "string"
  );
};

class ScriptStorage {
  async getScripts(): Promise<Script[]> {
    const scripts = await browser.storage.local
      .get()
      .then((result) => result.scripts);
    if (!scripts || !Array.isArray(scripts)) {
      await browser.storage.local.set({ scripts: [] });
      return this.getScripts();
    }
    return scripts.filter(isValidScript);
  }

  async addScript(script: Script) {
    if (!isValidScript(script)) throw new Error("Invalid script format");

    const scripts = await this.getScripts();
    if (scripts.some((s) => s.name === script.name))
      throw new Error("Script with this name already exists");

    scripts.push(script);
    await browser.storage.local.set({ scripts });
  }

  async removeScript(name: string) {
    const scripts = await this.getScripts();
    const filteredScripts = scripts.filter((s) => s.name !== name);
    await browser.storage.local.set({ scripts: filteredScripts });
  }

  async updateScript(name: string, updatedScript: Script) {
    const scripts = await this.getScripts();
    const scriptIndex = scripts.findIndex((s) => s.name === name);
    if (scriptIndex === -1) throw new Error("Script not found");

    scripts[scriptIndex] = updatedScript;
    await browser.storage.local.set({ scripts });
  }
}

export const scriptStorage = new ScriptStorage();
