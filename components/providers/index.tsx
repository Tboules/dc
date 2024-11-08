import SessionProvider from "./session-provider";
import { ThemeProvider } from "./theme-provider";
import { getServerSession } from "next-auth";
import { QueryProvider } from "./query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default async function Providers({ children }: React.PropsWithChildren) {
  const session = await getServerSession();

  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
