import Link from "next/link";
import Image from "next/image";
import { FooterProps } from "./types";
import brazilFlag from "@/assets/images/brazil-flag.png";
import ePostsLogo from "@/assets/images/e_posts_logo.svg";
import { ScrollToTopButton } from "@/ui/scroll-to-top-button";

export async function FooterView({ isDesktop }: FooterProps) {
  return (
    <footer
      className={`
        ${!isDesktop ? "gap-4" : "gap-20"}
        w-full flex flex-col bg-gradient-to-bl from-zinc-950 to-zinc-900 px-4 pt-10 pb-4
      `}
    >
      <div
        className={`
          ${
            !isDesktop
              ? "flex-col gap-6 text-center items-center"
              : "gap-16 justify-between"
          }
          w-full max-w-[1000px] mx-auto flex justify-center
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
            <Link href="/sobre-nos">Sobre nós</Link>
            <Link href="/termos-de-uso">Termos de uso</Link>
            <Link href="/politica-de-privacidade">Política de privacidade</Link>
            <Link href="#">Trabalhe conosco</Link>
          </div>
        </section>
        <section className="flex flex-col gap-4 font-kanit">
          {isDesktop && <ScrollToTopButton />}
        </section>
      </div>
      <section
        className={`
          ${!isDesktop && "flex-col items-center gap-4"}
          w-full flex gap-10 max-w-[1000px] mx-auto px-4 text-sm font-kanit
        `}
      >
        <span className="text-sm font-kanit">
          © 2024 ePosts. Todos os direitos reservados.
        </span>
        <span className="flex items-center gap-2 text-center">
          <Image
            width={24}
            height={24}
            src={brazilFlag}
            alt="brazil flag"
            className="rounded-md"
          />
          Desenvolvido no Brasil
        </span>
      </section>
    </footer>
  );
}
