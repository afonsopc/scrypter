import { useEffect, useState } from "react";
import { Script } from "../extension/script";
import Button from "./button";

type Props = {
  script?: Script;
  onSave: (script: Script) => void;
};

const CLEAN_SCRIPT: Script = {
  name: "",
  description: "",
  enabled: false,
  hostnames: [],
  code: "",
};

const ScriptManager = ({ script, onSave }: Props) => {
  const [newScript, setNewScript] = useState<Script>(CLEAN_SCRIPT);
  const [hostnames, setHostnames] = useState("");

  useEffect(() => {
    if (script) {
      setNewScript(script);
      setHostnames(script.hostnames.join(", "));
      return;
    }
    setNewScript(CLEAN_SCRIPT);
    setHostnames("");
  }, [script]);

  const handleSave = () => {
    if (!newScript.name || !newScript.description)
      return alert("Please fill in all fields");
    onSave(newScript);
    setNewScript(CLEAN_SCRIPT);
    setHostnames("");
  };

  return (
    <div className="p-2 flex flex-col gap-4 shadow-md border rounded-lg border-zinc-600 bg-zinc-800 w-72 justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">
          {script ? "Edit Script" : "Create New Script"}
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-light">
              Name
            </label>
            <input
              id="name"
              className="border bg-zinc-900 border-zinc-600 rounded-md p-2 w-full"
              type="text"
              placeholder="Name (keep it short)"
              value={newScript.name}
              onChange={(e) => {
                setNewScript((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-light">
              Description
            </label>
            <input
              id="description"
              className="border bg-zinc-900 border-zinc-600 rounded-md p-2 w-full"
              type="text"
              placeholder="Brief description of the script"
              value={newScript.description}
              onChange={(e) => {
                setNewScript((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-light">
              Websites (separated by commas)
            </label>
            <input
              id="hostnames"
              className="border bg-zinc-900 border-zinc-600 rounded-md p-2 w-full"
              type="text"
              placeholder="e.g. omlhr.site, omelhorsite.pt"
              value={hostnames}
              onChange={(e) => {
                setHostnames(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-sm font-light">
              Code
            </label>
            <textarea
              id="code"
              className="border bg-zinc-900 border-zinc-600 rounded-md p-2 resize-none w-full h-40"
              placeholder="JavaScript code"
              value={newScript.code}
              onChange={(e) => {
                setNewScript((prev) => ({
                  ...prev,
                  code: e.target.value,
                }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          className="w-full flex-4/6"
          onClick={() => {
            newScript.hostnames = hostnames
              .split(",")
              .map((hostname) => hostname.trim());
            if (newScript.name && newScript.code && newScript.description)
              return onSave(newScript);
            alert("Please fill in all fields");
          }}
        >
          {script ? "Update" : "Create"}
        </Button>
        {script && (
          <Button
            className="w-full bg-red-800 border-red-700 hover:bg-red-700 flex-2/6"
            onClick={handleSave}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScriptManager;
