import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

export default function AppProfile() {
  const imgUrl = `https://i.pinimg.com/474x/15/e4/bf/15e4bf313c319f9d601c6209b76abc76.jpg`;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex items-center justify-center">
        <div className="relative w-40 h-40 mt-8">
          <Image
            src={imgUrl}
            alt="profile"
            fill
            className="rounded-full border-4 border-gray-300 object-cover"
            priority
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold text-center">John Doe</h2>
        <p className="text-sm text-gray-500 text-center">@johndoe</p>
      </CardContent>
      <CardFooter className="flex-col gap-2">{/* Footer content */}</CardFooter>
    </Card>
  );
}
