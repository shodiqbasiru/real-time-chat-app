import AppListuser from "./app-listuser";
import AppProfile from "./app-profle";

interface AppInfobarProps {
  className: string;
  onStartChat?: (userId: number) => void;
}

export function AppInfobar({ className, onStartChat }: AppInfobarProps) {
  return (
    <div className={`${className} space-y-4 flex flex-col`}>
      <AppProfile />
      <div className="flex-1 overflow-y-auto">
        <AppListuser onStartChat={onStartChat} />
      </div>
    </div>
  );
}
