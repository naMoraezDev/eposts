import { Footer } from "./footer";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { DefaultProps } from "@/types/common";
import { ProTopBanner } from "./pro-top-banner";
import { CookiesAccept } from "../cookies-accept";
import { EcrewApiService } from "@/services/ecrew-api.service";
import { httpClientFactory } from "@/infrastructure/adapters/factories/http-client.factory";

export async function LayoutWrapperView({
  children,
  isDesktop,
}: Readonly<{ children: React.ReactNode } & DefaultProps>) {
  const [games] = await Promise.all([
    new EcrewApiService(httpClientFactory()).getGames(),
  ]);

  return (
    <>
      <ProTopBanner isDesktop={isDesktop} />
      <Header isDesktop={isDesktop} games={games} />
      {isDesktop && <Navbar />}
      <main className="w-full max-w-[1280px] p-4 mx-auto">{children}</main>
      <CookiesAccept />
      <Footer isDesktop={isDesktop} />
    </>
  );
}
