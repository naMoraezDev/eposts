import Image from "next/image";
import { Footer } from "./footer";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { cookies } from "next/headers";
import { DefaultProps } from "@/types/common";
import { CookiesAccept } from "../cookies-accept";
import { EpostsApiService } from "@/services/eposts-api.service";
import verticalBanner from "@/assets/images/exitlag-vertical-banner.png";
import { httpClientFactory } from "@/infrastructure/adapters/factories/http-client.factory";

export async function LayoutWrapperView({
  children,
  isDesktop,
}: Readonly<{ children: React.ReactNode } & DefaultProps>) {
  const cookieStore = cookies();
  const games = await new EpostsApiService(httpClientFactory()).getGames();
  const cookiesAccepted = cookieStore.get("cookies-accepted")?.value === "true";

  return (
    <>
      <Header isDesktop={isDesktop} games={games} />
      <Navbar />
      <div
        className={`
          ${isDesktop ? "w-fit" : "w-full"}
          flex mx-auto
        `}
      >
        {isDesktop && (
          <a
            target="_blank"
            rel="noreferrer"
            className="h-fit"
            href="https://www.exitlag.com/"
          >
            <Image
              priority
              quality={100}
              src={verticalBanner}
              alt="vertical banner"
              className="shrink-0 object-cover h-fit sticky top-16 mt-4 rounded-lg"
            />
          </a>
        )}
        <main className="w-full max-w-[1000px] p-4">{children}</main>
        {isDesktop && (
          <a
            target="_blank"
            rel="noreferrer"
            className="h-fit"
            href="https://www.exitlag.com/"
          >
            <Image
              priority
              quality={100}
              src={verticalBanner}
              alt="vertical banner"
              className="shrink-0 object-cover h-fit sticky top-16 mt-4 rounded-lg"
            />
          </a>
        )}
      </div>
      {!cookiesAccepted && <CookiesAccept />}
      <Footer isDesktop={isDesktop} />
    </>
  );
}
