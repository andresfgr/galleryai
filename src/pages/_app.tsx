import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Layouts } from "~/Layouts/Layouts";
import { type MyAppProps, type MyPage } from "~/types/layout";

function MyApp({ Component, ...AppProps }: MyAppProps) {
  const { session } = AppProps.pageProps;
  const Layout = Layouts[Component.Layout] ?? ((page: MyPage) => page);
  const title = Component.Title || "Gallery AI";
  const description = Component.Description || "Gallery AI";

  return (
    <SessionProvider session={session}>
      <Layout title={title} description={description}>
        <Component {...AppProps} />
      </Layout>
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
