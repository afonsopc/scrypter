import { useEffect, useState } from "react";
import { Script, scriptStorage } from "./extension/script";
import ScriptList from "./components/script-list";
import ScriptManager from "./components/script-manager";

const App = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Script>();

  useEffect(() => {
    scriptStorage.getScripts().then((scripts) => setScripts(scripts));
  }, []);

  const handleSave = async (newScript: Script) => {
    if (selectedScript) {
      await scriptStorage.updateScript(selectedScript.name, newScript);
    } else {
      await scriptStorage.addScript(newScript);
    }
    setScripts([]);
    setScripts(await scriptStorage.getScripts());
    setSelectedScript(undefined);
  };

  const handleEdit = async (script: Script) => {
    setSelectedScript(script);
    setScripts(await scriptStorage.getScripts());
    setScripts((prev) => prev.filter((s) => s.name !== script.name));
  };

  const handleDelete = async (script: Script) => {
    await scriptStorage.removeScript(script.name);
    setScripts([]);
    setScripts(await scriptStorage.getScripts());
  };

  const handleActiveToggle = async (script: Script) => {
    const updatedScript = { ...script, enabled: !script.enabled };
    await scriptStorage.updateScript(script.name, updatedScript);
    setScripts([]);
    setScripts(await scriptStorage.getScripts());
  };

  return (
    <div className="p-5 flex gap-5 flex-col items-center">
      <div className="flex gap-3 items-center z-10 p-10">
        <div className="relative">
          <img
            src="/favicon-194x194.png"
            alt="Scrypter Logo"
            className="w-16 h-16"
          />
          <img
            src="/favicon-194x194.png"
            alt="Scrypter Logo"
            className="w-16 h-16 blur-2xl absolute top-0 left-0 opacity-80"
          />
        </div>
        <h1 className="text-3xl font-bold">Scrypter</h1>
      </div>
      <div className="flex gap-5 z-20">
        <ScriptManager script={selectedScript} onSave={handleSave} />
        {!!scripts.length && (
          <ScriptList
            scripts={scripts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onActiveToggle={handleActiveToggle}
          />
        )}
      </div>
    </div>
  );
};

export default App;
