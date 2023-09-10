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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
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
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [printType, setPrintType] = useState("Frame");
  const [size, setSize] = useState("Small");
  const [amount] = useState("59.99"); //, setAmount
  const [oneByOne] = useState("1:1"); //, setOneByOne
  const [sixteemByNine] = useState("16:9"); //, setSixteemByNine
  const [nineBySixteen] = useState("9:16"); //, setNineBySixteen

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
          toast({
            title: "Success",
            description: `Image with Id: ${data?.id || "default"} saved`,
          });
        },
      }
    );
  };

  const handleNewImage = () => {
    setLink("");
    setPrompt("");
  };

  useEffect(() => {
    if (!sessionData) {
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <AspectRatio ratio={16 / 9}>
      <Toaster />
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
        <Card className="w-[800px]">
          <CardHeader>
            <CardTitle>Gallery AI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label>Style</Label>
                  <Select
                    value={style}
                    disabled={!!link}
                    onValueChange={(value) => setStyle(value)}
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Cinematic">Cinematic</SelectItem>
                        <SelectItem value="Illustration">
                          Illustration
                        </SelectItem>
                        <SelectItem value="Anime">Anime</SelectItem>
                        <SelectItem value="Typography">Typography</SelectItem>
                        <SelectItem value="Conceptual-Art">
                          Conceptual-Art
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Frame Type</Label>
                  <Select
                    value={printType}
                    disabled={!!link}
                    onValueChange={(value) => setPrintType(value)}
                  >
                    <SelectTrigger className="w-auto">
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
                  <Label>Size</Label>
                  <Select
                    value={size}
                    disabled={!!link}
                    onValueChange={(value) => setSize(value)}
                  >
                    <SelectTrigger className="w-auto">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                        <SelectItem value="Extra-large">Extra-large</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <RadioGroup
                    disabled={!!link}
                    defaultValue={oneByOne}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value={nineBySixteen}
                        id={nineBySixteen}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={nineBySixteen}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg
                          className="h-6 w-6"
                          focusable="false"
                          color="#FAFAFC"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="CropPortraitIcon"
                        >
                          <path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"></path>
                        </svg>
                        {nineBySixteen}
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value={oneByOne}
                        id={oneByOne}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={oneByOne}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg
                          className="h-6 w-6"
                          focusable="false"
                          color="#000"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="CropSquareIcon"
                        >
                          <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"></path>
                        </svg>
                        {oneByOne}
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value={sixteemByNine}
                        id={sixteemByNine}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={sixteemByNine}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg
                          className="h-6 w-6"
                          focusable="false"
                          color="#FAFAFC"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="CropLandscapeIcon"
                        >
                          <path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"></path>
                        </svg>
                        {sixteemByNine}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Textarea
                  id="name"
                  value={prompt}
                  disabled={!!link}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="What do you have in mind?"
                />
                {!link ? (
                  <>
                    <Button
                      variant={link ? "outline" : "default"}
                      onClick={() => void generateImageByAI()}
                    >
                      {loading ? "Loading..." : "Generate"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline">New</Button>
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
                                onClick={() => void handleNewImage()}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                  </>
                )}
                {link && (
                  <>
                    <img
                      className="image-result"
                      src={link}
                      alt="ai generated"
                      // width={500}
                      // height={500}
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
