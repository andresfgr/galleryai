/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { AspectRatio } from "~/components/ui/aspect-ratio";

import { Checkbox } from "~/components/ui/checkbox";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { toast } from "~/components/ui/use-toast";
import { Toaster } from "~/components/ui/toaster";

export default function Home() {
  const { data: sessionData } = useSession();
  const utils = api.useContext();
  const router = useRouter();

  const { data } = api.todosRouter.getImages.useQuery();

  const deleteTodoMutation = api.todosRouter.deleteImage.useMutation({
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {
      void utils.todosRouter.getImages.invalidate();
      toast({
        title: "Success",
        description: `Image with Id: ${data?.id || "default"} deleted`,
      });
    },
  });

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
    }
  }, [sessionData, router]);

  const handleCheckout = () => {
    void router.push("/orderConfirmation/page");
  };

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate({ imageId: id });
  };

  return (
    <AspectRatio ratio={16 / 9}>
      <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid ">
        <Toaster />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/generate/page" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/cart/page" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Cart
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="outline"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "right-4 top-4 md:right-8 md:top-8"
                )}
                type="button"
                onClick={
                  sessionData ? () => void signOut() : () => void signIn()
                }
              >
                {sessionData ? " Sign out" : " Github"}
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Card className="w-[800px]">
          <CardHeader>
            <CardTitle>Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {data?.map((item) => {
                return (
                  <Card key={item.id}>
                    <CardHeader></CardHeader>
                    <CardContent>
                      <img
                        className="image-result"
                        src={item.link}
                        alt="ai generated"
                      />
                      <div className="grid gap-2">
                        <br />
                      </div>
                      <div className="grid gap-2">
                        <p>{`Type: ${item.printType}`}</p>
                      </div>
                      <div className="grid gap-2">
                        <p>{`Size: ${item.size}`}</p>
                      </div>
                      <div className="grid gap-2">
                        <p>{`Amount: ${item.amount}`}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Buy
                        </label>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your generated image.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => void handleDelete(item.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            <div className="mt-8 grid grid-cols-4 gap-4">
              <div className="grid gap-2"></div>
              <div className="grid gap-2"></div>
              <div className="grid gap-2"></div>
              <div className="grid gap-2">
                <Button
                  onClick={() => {
                    handleCheckout();
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AspectRatio>
  );
}
