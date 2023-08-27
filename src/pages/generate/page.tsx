/* eslint-disable @typescript-eslint/no-floating-promises */
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
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import Link from "next/link";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [printType, setPrintType] = useState("");
  const [size, setSize] = useState("");
  const [amount] = useState("59.99"); //, setAmount

  const { data: sessionData } = useSession();
  const router = useRouter();

  const createTodosMutation = api.todosRouter.saveImage.useMutation();

  const generateImage = api.todosRouter.generateImage.useMutation({
    onError(error) {
      console.log(error);
      setLoading(false);
    },
    onSuccess(data) {
      setLink(data?.toString() || "");
      setLoading(false);
    },
  });

  function generateImageByAI() {
    setLoading(true);
    generateImage.mutate({ prompt: prompt });
  }

  const handleSaveImage = () => {
    createTodosMutation.mutate(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      { link, prompt, size, printType, amount },
      {
        onError(error) {
          console.log(error);
        },
        onSuccess(data) {
          setLink("");
          setPrompt("");
          alert(`Image with Id: ${data?.id || "default"} saved`);
        },
      }
    );
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
            {/* <NavigationMenuItem>
              <Link href="/orderConfirmation/page" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Order confirmation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
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
        <Card className="w-[1000px]">
          <CardHeader>
            <CardTitle>Gallery AI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Textarea
                  id="name"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="What do you have in mind?"
                />
                <Button
                  variant={link ? "outline" : "default"}
                  onClick={() => void generateImageByAI()}
                >
                  {loading ? "Loading..." : "Generate"}
                </Button>
                {link && (
                  <>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="grid gap-2">
                        <Select onValueChange={(value) => setPrintType(value)}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Frame">Frame</SelectItem>
                              <SelectItem value="Poster">Poster</SelectItem>
                              <SelectItem value="Picture">Picture</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Select onValueChange={(value) => setSize(value)}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Small Square">
                                Small Square
                              </SelectItem>
                              <SelectItem value="Small Rectangle">
                                Small Rectangle
                              </SelectItem>
                              <SelectItem value="Medium Square">
                                Medium Square
                              </SelectItem>
                              <SelectItem value="Medium Rectangle">
                                Medium Rectangle
                              </SelectItem>
                              <SelectItem value="Large Square">
                                Large Square
                              </SelectItem>
                              <SelectItem value="Large Rectangle">
                                Large Rectangle
                              </SelectItem>
                              <SelectItem value="Extra-large Square">
                                Extra-large Square
                              </SelectItem>
                              <SelectItem value="Extra-large Rectangle">
                                Extra-large Rectangle
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        {/* <Label htmlFor="email">$59.99</Label> */}
                        {/* <Input id="email" type="text" value="50" disabled /> */}
                        {/* <Input type="width" placeholder="Width" /> */}
                      </div>
                      <div className="grid gap-2">
                        <Button
                          onClick={() => {
                            handleSaveImage();
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    <img
                      className="image-result"
                      src={link}
                      alt="ai generated"
                    />
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AspectRatio>
  );
}
