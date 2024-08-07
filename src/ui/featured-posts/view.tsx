"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PostCard } from "../post-card";
import { useFeaturedPosts } from "./_io";
import { FeaturedPostsProps } from "./types";
import { MdFeaturedVideo } from "react-icons/md";

export function FeaturedPostsView({
  games,
  postList,
  isDesktop,
}: FeaturedPostsProps) {
  const { setApi, currentIndex, scrollToSlide } = useFeaturedPosts({
    games,
    postList,
  });

  return (
    <section className="relative w-full overflow-hidden rounded-t-lg bg-zinc-900 bg-opacity-50 pb-4">
      <div
        className={`
          ${isDesktop ? "px-10 py-6" : "p-4"}
          flex flex-col gap-3 justify-center
        `}
      >
        <h2 className="text-md font-kanit font-bold z-10 flex items-center gap-2">
          <MdFeaturedVideo /> Em destaque
        </h2>
        <Carousel setApi={setApi} opts={{ align: "start" }}>
          <CarouselContent className="gap-4">
            {postList.posts.map((post, index) => (
              <CarouselItem
                key={index}
                className={isDesktop ? "basis-full" : "basis-[80%]"}
              >
                <PostCard
                  post={post}
                  variant="outlined"
                  gameIconUrl={
                    games.find((game) => game.slug === post.categories[0].slug)
                      ?.icon_url
                  }
                  orientation={isDesktop ? "horizontal" : "vertical"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {isDesktop && (
            <>
              <CarouselPrevious className="absolute top-[55%] left-0 size-8 z-10 bg-transparent" />
              <CarouselNext className="absolute top-[55%] right-0 size-8 z-10 bg-transparent" />
            </>
          )}
        </Carousel>
      </div>
      {postList.posts.map((post, index) => (
        <Image
          key={index}
          alt={post.title}
          src={post.post_thumbnail.URL}
          width={post.post_thumbnail.width}
          height={post.post_thumbnail.height}
          className={`
            ${currentIndex === index ? "opacity-100" : "opacity-0"}
            size-full object-cover absolute top-0 left-0 blur-md -z-10 duration-700
          `}
        />
      ))}
      <div className="w-full absolute bottom-4 left-0 flex justify-center gap-2">
        {postList.posts.map((_, index) => (
          <div
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`
              ${currentIndex === index ? "bg-zinc-50 w-10" : "bg-zinc-900"}
              size-2 rounded-full duration-500 cursor-pointer
            `}
          />
        ))}
      </div>
      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-zinc-950 to-[rgba(0,0,0,0.2)] -z-10" />
      <div className="w-[20%] h-full absolute top-0 left-0 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
      <div className="w-[20%] h-full absolute top-0 right-0 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />
    </section>
  );
}
