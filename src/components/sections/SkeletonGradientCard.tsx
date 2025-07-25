import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SkeletonGradientCard() {
  return (
    <Card className="overflow-hidden shadow-md">
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4 p-4">
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="flex w-full flex-wrap gap-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-6 rounded-full" />
          ))}
        </div>

        <Skeleton className="h-8 w-full" />

        <Tabs defaultValue="tailwind" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tailwind">
              <Skeleton className="h-4 w-16" />
            </TabsTrigger>
            <TabsTrigger value="css">
              <Skeleton className="h-4 w-8" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tailwind" className="mt-2">
            <Skeleton className="h-8 w-full" />
          </TabsContent>
          <TabsContent value="css" className="mt-2">
            <Skeleton className="h-8 w-full" />
          </TabsContent>
        </Tabs>
      </CardFooter>
    </Card>
  );
}
