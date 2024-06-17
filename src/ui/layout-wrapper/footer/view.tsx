import Link from "next/link";
import Image from "next/image";
import { FooterProps } from "./types";
import { MostReadPosts } from "@/ui/most-read-posts";
import ePostsLogo from "@/assets/images/e_posts_logo.svg";
import { ScrollToTopButton } from "@/ui/scroll-to-top-button";
import { EpostsApiService } from "@/services/eposts-api.service";
import { FetchHttpClientAdapter } from "@/infrastructure/adapters/implementation/fetch-http-client.adapter";

export async function FooterView({ isDesktop }: FooterProps) {
  const [mostReadPosts] = await Promise.all([
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory(
      "destaques"
    ),
  ]);

  const mostRead = {
    ...mostReadPosts,
    posts: [
      mostReadPosts.posts[1],
      mostReadPosts.posts[1],
      mostReadPosts.posts[1],
      mostReadPosts.posts[1],
    ],
  };

  return (
    <footer
      className={`
        ${
          !isDesktop
            ? "flex-col gap-6 text-center items-center bg-gradient-to-tr from-zinc-950 via-zinc-950 to-zinc-900 border-t border-t-zinc-800"
            : "gap-16"
        }
        w-full flex max-w-[1270px] mx-auto px-4 py-4
      `}
    >
      {!isDesktop && (
        <div className="w-full flex justify-center">
          <ScrollToTopButton />
        </div>
      )}
      <section className="flex flex-col gap-7">
        <div className="flex items-center gap-1">
          <Image
            priority
            width={40}
            height={40}
            src={ePostsLogo}
            alt="ePosts logo"
          />
          <span className="font-kanit text-4xl">ePosts</span>
        </div>
        {isDesktop && (
          <section className="w-[200px]">
            <MostReadPosts postList={mostRead} />
          </section>
        )}
      </section>
      <section className="flex flex-col gap-4 font-kanit">
        <h4 className="font-bold">Cobertura</h4>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="#">Counter Strike Global Offensive</Link>
          <Link href="#">League of Legends</Link>
          <Link href="#">Rainbow Six Siege</Link>
          <Link href="#">Dota 2</Link>
          <Link href="#">Warzone</Link>
          <Link href="#">Valorant</Link>
        </div>
      </section>
      <section className="flex flex-col gap-4 font-kanit">
        <h4 className="font-bold">Institucional</h4>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="#">Sobre nós</Link>
          <Link href="#">Termos de uso</Link>
          <Link href="#">Política de privacidade</Link>
          <Link href="#">Trabalhe conosco</Link>
        </div>
      </section>
      {isDesktop && (
        <>
          <ScrollToTopButton />
        </>
      )}
    </footer>
  );
}