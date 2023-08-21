/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
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

import { CldImage } from "next-cloudinary";
import { Checkbox } from "~/components/ui/checkbox";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data, error, isLoading } = api.todosRouter.getImages.useQuery();

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <AspectRatio ratio={16 / 9}>
      {/* <Button
        variant="outline"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
        type="button"
        onClick={() => handleLinkShoppingCar()}
      >
        Pay
      </Button>
      <Button
        variant="outline"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
        type="button"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? " Sign out" : " Github"}
      </Button> */}
      <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid ">
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
              <Link href="/orderConfirmation/page" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Order confirmation
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
              {/* <Link href="/shoppingCar/page" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {sessionData ? " Sign out" : " Github"}
                </NavigationMenuLink>
              </Link> */}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data?.map((item) => {
            return (
              <Card key={item.id} className="w-[300px]">
                <CardHeader>
                  {/* <CardTitle>{item.prompt}</CardTitle> */}
                  {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <img
                    className="image-result"
                    src={item.link}
                    alt="ai generated"
                  />
                  {/* <CldImage
                  alt="hi"
                    width="600"
                    height="600"
                    src="item.link" /> */}
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
                  {/* <Button variant="outline">Cancel</Button> */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Buy
                    </label>
                  </div>
                  <Button>Delete</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </AspectRatio>
  );
}
