import { MoreVertical, Pin, Search, Trash2 } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { User } from "@/types/user";

interface AppChatbarProps {
  sortedUsers: User[];
  handleChatClick: (userId: number) => void;
  handlePin: (userId: number) => void;
  handleDelete: (userId: number) => void;
}

export default function AppChatbar({
  sortedUsers,
  handleChatClick,
  handleDelete,
  handlePin,
}: AppChatbarProps) {
  return (
    <div className="w-1/4 flex flex-col gap-4 pb-12">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
        {sortedUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleChatClick(user.id)}
            className={`flex gap-3 items-center p-4 rounded-lg hover:bg-input/50 cursor-pointer transition-colors relative  ${
              user.unreadCount > 0 ? "bg-input/50" : ""
            }`}
          >
            <div className="relative shrink-0">
              <Image
                src={user.avatar}
                alt={user.name}
                width={60}
                height={60}
                className="rounded-xl object-cover"
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  user.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm truncate ${
                    user.unreadCount > 0 ? "font-bold" : "font-semibold"
                  }`}
                >
                  {user.name}
                </p>
                {user.isPinned && (
                  <Pin size={14} className="text-primary shrink-0" />
                )}
              </div>
              <p
                className={`text-xs truncate ${
                  user.unreadCount > 0
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {user.lastMessage}
              </p>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-muted-foreground">
                  {user.lastMessageTime}
                </p>
                {user.unreadCount > 0 && (
                  <Badge className="bg-accent text-primary-foreground h-5 min-w-5 flex items-center justify-center px-1.5 text-xs font-bold rounded-full">
                    {user.unreadCount > 99 ? "99+" : user.unreadCount}
                  </Badge>
                )}
              </div>
            </div>

            {/* Three dots menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePin(user.id);
                  }}
                >
                  <Pin size={16} className="mr-2" />
                  {user.isPinned ? "Unpin" : "Pin"} Chat
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(user.id);
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete Chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
