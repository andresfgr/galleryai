/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextComponentType, type NextPage, type NextPageContext } from "next";
import { type AppProps } from "next/app";
import { type Session } from "next-auth";
import { type LayoutKeys } from "~/Layouts/Layouts";
export type MyPage<P = object, IP = P> = NextPage<P, IP> & {
    Layout?: LayoutKeys;
    Title?: string;
    Description?: string;
};
export type MyAppProps = AppProps<{ session: Session | null }> &  {
    Component: NextComponentType<NextPageContext, any, any> & {
        Layout: LayoutKeys;
        Title: string;
        Description: string;
    };
};