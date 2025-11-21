import AppListuser from "./app-listuser";
import AppProfile from "./app-profle";

export function AppInfobar({ className }: React.ComponentProps<"div">) {
  return (
    <div className={`${className} space-y-4 flex flex-col`}>
      <AppProfile />
      <div className="flex-1 overflow-y-auto">
        <AppListuser />
      </div>
    </div>
  );
}
