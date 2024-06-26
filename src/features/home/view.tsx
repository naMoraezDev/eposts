import Image from "next/image";
import { Newsletter } from "@/ui/newsletter";
import { DefaultProps } from "@/types/common";
import { LogoSlider } from "@/ui/logo-slider";
import { LatestPosts } from "@/ui/latest-posts";
import { LiveMatches } from "@/ui/live-matches";
import { PopularTags } from "@/ui/popular-tags";
import { HorizontalAd } from "@/ui/horizontal-ad";
import { PostsCarousel } from "@/ui/posts-carousel";
import { FeaturedPosts } from "@/ui/featured-posts";
import { MostReadPosts } from "@/ui/most-read-posts";
import exitLagBanner from "@/assets/images/exitlag-banner.png";
import { EpostsApiService } from "@/services/eposts-api.service";
import { LiveMatchesCarousel } from "@/ui/live-matches-carousel";
import { FetchHttpClientAdapter } from "@/infrastructure/adapters/implementation/fetch-http-client.adapter";

export async function HomeView({ isDesktop }: DefaultProps) {
  const [
    tags,
    games,
    lolPosts,
    r6Posts,
    codPosts,
    csPosts,
    valorantPosts,
    dotaPosts,
    featuredPosts,
    latestPosts,
  ] = await Promise.all([
    new EpostsApiService(new FetchHttpClientAdapter()).getTags(),
    new EpostsApiService(new FetchHttpClientAdapter()).getGames(),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory({
      page: "1",
      number: "2",
      category: "league-of-legends",
    }),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory({
      page: "1",
      number: "2",
      category: "r6-siege",
    }),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory({
      page: "1",
      number: "2",
      category: "cod-mw",
    }),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory({
      page: "1",
      number: "2",
      category: "cs-go",
    }),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory({
      page: "1",
      number: "2",
      category: "valorant",
    }),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory({
      page: "1",
      number: "2",
      category: "dota-2",
    }),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByTag(
      "destaques"
    ),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory({
      page: "1",
      number: "4",
      category: "all",
    }),
  ]);

  return (
    <>
      <LogoSlider games={games} />
      <section className="w-full flex gap-4">
        <section
          className={`
            ${isDesktop ? "w-3/4 mt-4" : "w-full"} 
            flex flex-col gap-10 mb-10
          `}
        >
          {!isDesktop && <LiveMatchesCarousel games={games} />}
          <FeaturedPosts
            games={games}
            isDesktop={isDesktop}
            postList={featuredPosts}
          />
          <LatestPosts
            games={games}
            isDesktop={isDesktop}
            postList={latestPosts}
          />
          <HorizontalAd />
          <PostsCarousel
            games={games}
            postList={csPosts}
            isDesktop={isDesktop}
            category="Counter-Strike: Global Offensive"
          />
          <PostsCarousel
            games={games}
            postList={lolPosts}
            isDesktop={isDesktop}
            category="League of Legends"
          />
          <PostsCarousel
            games={games}
            postList={r6Posts}
            isDesktop={isDesktop}
            category="Rainbow Six Siege"
          />
          <PostsCarousel
            games={games}
            category="Dota 2"
            postList={dotaPosts}
            isDesktop={isDesktop}
          />
          <PostsCarousel
            games={games}
            category="Call of Duty: Modern Warfare"
            postList={codPosts}
            isDesktop={isDesktop}
          />
          <PostsCarousel
            games={games}
            category="Valorant"
            postList={valorantPosts}
            isDesktop={isDesktop}
          />
          <HorizontalAd />
          <Newsletter isDesktop={isDesktop} />
        </section>
        {isDesktop && (
          <section className="w-1/4 mt-4 relative">
            <div className="flex flex-col gap-4 sticky top-16">
              <LiveMatches games={games} />
              <MostReadPosts />
              <PopularTags tags={tags.tags} />
              <section className="p-2 relative">
                <Image
                  quality={100}
                  src={exitLagBanner}
                  alt="exit_lag_banner"
                  className="rounded-lg"
                />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.exitlag.com/"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </section>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
