import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/instagram";
import "react-social-icons/github";

interface ProfileCardProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any;
}

export const ProfileCard = ({ className, currentUser }: ProfileCardProps) => (
  <Card className={`${className}  w-full`}>
    <CardContent className="p-6">
      <div className="flex flex-col gap-4">
        <div className="relative mx-auto">
          <Image
            src="https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg"
            alt={currentUser?.name || "hero image"}
            width={250}
            height={250}
            className="rounded-full object-cover border-4 border-primary/20"
          />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="flex justify-between">
            <div className="space-y-1">
              <div className="flex gap-1">
                <h2 className="text-2xl font-bold">{currentUser?.name}</h2>

                <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {currentUser?.isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-md">
                  <PhoneCall size="16" />
                  <span>{currentUser?.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-md">
                  <Mail size="16" />
                  <span>{currentUser?.email}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                impedit culpa cupiditate distinctio.
              </p>
            </div>

            <Button size="icon" asChild>
              <Link href="/settings">
                <Edit size={16} />
              </Link>
            </Button>
          </div>

          <div className="flex justify-end items-center gap-4 pt-4 text-md">
            <a href="#" className="flex items-center gap-2" target="_blank">
              <SocialIcon
                as="div"
                network="instagram"
                label="instagram.user"
                style={{ width: "24px", height: "24px" }}
              />
              <span>instagram.user</span>
            </a>

            <a href="#" className="flex items-center gap-2" target="_blank">
              <SocialIcon
                as="div"
                network="github"
                label="github.user"
                style={{ width: "24px", height: "24px" }}
              />
              <span>github.user</span>
            </a>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
