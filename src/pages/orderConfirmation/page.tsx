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
import { AspectRatio } from "~/components/ui/aspect-ratio";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
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

  const { data } = api.todosRouter.getImages.useQuery(); //, error, isLoading

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
      </Button> */}
      {/* <Button
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
        <Table>
          <TableCaption>Order confirmation.</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">Id</TableHead> */}
              <TableHead>Image</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((invoice) => (
              <TableRow key={invoice.id}>
                {/* <TableCell className="font-medium">{invoice.id}</TableCell> */}
                <TableCell>
                  {" "}
                  <img
                    className="image-result"
                    src={invoice.link}
                    alt="ai generated"
                    width={25}
                    height={25}
                  />
                </TableCell>
                <TableCell>{`Type: ${invoice.printType} Size: ${invoice.size}`}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AspectRatio>
  );
}
