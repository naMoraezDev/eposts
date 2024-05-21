import { LogoSlider } from "@/ui/logo-slider";
import { LatestPosts } from "@/ui/latest-posts";
import { FeaturedPosts } from "@/ui/featured-posts";
import { EpostsApiService } from "@/services/eposts-api.service";
import { FetchHttpClientAdapter } from "@/infrastructure/adapters/implementation/fetch-http-client.adapter";

export const revalidate = 0;

export default async function Home() {
  const [games, posts] = await Promise.all([
    new EpostsApiService(new FetchHttpClientAdapter()).getGames(),
    new EpostsApiService(new FetchHttpClientAdapter()).getPostsByCategory(
      "destaques"
    ),
  ]);

  return (
    <>
      <LogoSlider games={games} />
      <section className="w-full flex gap-4">
        <section className="w-full flex flex-col gap-4">
          <FeaturedPosts postList={posts} />
          <LatestPosts postList={posts} />
        </section>
      </section>
    </>
  );
}
