import { Browser } from "webextension-polyfill";

declare const browser: Browser;

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

class FakeScriptStorage {
  private scripts: Script[] = [
    {
      name: "Example Script",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      enabled: true,
      hostnames: ["omlhr.site", "omelhorsite.pt"],
      code: "console.log('Hello from Example Script!');",
    },
    {
      name: "Another Script",
      description: "Another example script.",
      enabled: false,
      hostnames: ["omelhorsite.pt"],
      code: "console.log('Hello from Another Script!');",
    },
  ];

  async getScripts(): Promise<Script[]> {
    return this.scripts;
  }

  async addScript(script: Script) {
    if (!isValidScript(script)) throw new Error("Invalid script format");

    if (this.scripts.some((s) => s.name === script.name))
      throw new Error("Script with this name already exists");

    this.scripts.push(script);
  }

  async removeScript(name: string) {
    this.scripts = this.scripts.filter((s) => s.name !== name);
  }

  async updateScript(name: string, updatedScript: Script) {
    const scriptIndex = this.scripts.findIndex((s) => s.name === name);
    if (scriptIndex === -1) throw new Error("Script not found");

    this.scripts[scriptIndex] = updatedScript;
  }
}

export const scriptStorage = (window as any).browser
  ? new ScriptStorage()
  : new FakeScriptStorage();
