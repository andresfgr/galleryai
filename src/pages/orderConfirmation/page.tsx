/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { data } = api.todosRouter.getImages.useQuery();

  const [size, setSize] = useState(""); //

  const handlePay = () => {
    size + size;
    //void router.push("/orderConfirmation/page");
  };

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <AspectRatio ratio={16 / 9}>
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
            <CardTitle>Order Confirmation</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Print Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((invoice) => (
                  <TableRow key={invoice.id}>
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
                    <TableCell>{invoice.printType}</TableCell>
                    <TableCell>{invoice.size}</TableCell>
                    <TableCell className="text-right">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-8 grid grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Select onValueChange={(value) => setSize(value)}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="small">51 Pleasant st</SelectItem>
                      <SelectItem value="Medium">91 Parkvale st</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1">
                <Button
                  variant="outline"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "right-4 top-4 md:right-8 md:top-8"
                  )}
                  onClick={() => {
                    //handleSaveImage();
                  }}
                >
                  Add address
                </Button>
              </div>
              <div className="grid gap-3"></div>
              <div className="grid gap-2">
                <Button
                  onClick={() => {
                    handlePay();
                  }}
                >
                  Pay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AspectRatio>
  );
}
