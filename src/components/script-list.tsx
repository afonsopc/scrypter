import { Script } from "../extension/script";
import { cn } from "../lib/cn";
import Button from "./button";

type Props = {
  scripts: Script[];
  onEdit: (script: Script) => void;
  onDelete: (script: Script) => void;
  onActiveToggle: (script: Script) => void;
};

const ScriptList = ({ scripts, onEdit, onDelete, onActiveToggle }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {scripts.map((script) => (
        <div
          key={script.name}
          className="p-2 flex flex-col gap-3 shadow-md border rounded-lg border-zinc-600 bg-zinc-800 w-72"
        >
          <div>
            <h2
              className="text-xl font-bold text-nowrap text-ellipsis overflow-hidden"
              title={script.name}
            >
              {script.name}
            </h2>
            <h1
              className="text-sm font-light h-[3em] break-all line-clamp-2"
              title={script.description}
            >
              {script.description}
            </h1>
            <div className="overflow-hidden">
              {script.hostnames.map((hostname) => (
                <span
                  key={hostname}
                  className="text-xs bg-zinc-700 text-zinc-200 rounded-md px-2 py-1 mr-1"
                >
                  {hostname}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              <Button onClick={() => onEdit(script)} tooltip="Edit script">
                Edit
              </Button>
              <Button
                className={cn(
                  script.enabled
                    ? "bg-red-800 border-red-700 hover:bg-red-700"
                    : "bg-green-800 border-green-700 hover:bg-green-700"
                )}
                onClick={() => onActiveToggle(script)}
                tooltip="Toggle script"
              >
                {script.enabled ? "Disable" : "Enable"}
              </Button>
            </div>
            <Button
              className="bg-transparent border-transparent hover:bg-transparent text-red-700"
              onClick={() => onDelete(script)}
              tooltip="Delete script"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScriptList;
