import SessionProvider from "./session-provider";
import { ThemeProvider } from "./theme-provider";
import { getServerSession } from "next-auth";
import { QueryProvider } from "./query-provider";

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
          {children}
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
