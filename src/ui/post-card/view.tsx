import Link from "next/link";
import Image from "next/image";
import { PostCardProps } from "./types";

export function PostCardView({
  post,
  isDesktop,
  gameIconUrl,
  size = "medium",
  variant = "filled",
  orientation = "vertical",
}: PostCardProps) {
  return (
    <Link
      href={`/noticias/${post.categories[0].slug}/${post.slug}`}
      className={`
        ${variant === "filled" && "bg-zinc-900 bg-opacity-50"}
        ${orientation === "vertical" && "flex-col w-full"}
        group flex gap-3 rounded-lg overflow-hidden h-full
      `}
    >
      <figure
        className={`
          ${size === "small" && "max-w-32"}
          ${orientation === "vertical" ? "w-full" : "w-1/2"}
          overflow-hidden shrink-0 relative 
        `}
      >
        <Image
          alt={post.title}
          src={post.post_thumbnail.URL}
          width={post.post_thumbnail.width}
          height={post.post_thumbnail.height}
          className="size-full object-cover object-center duration-300 aspect-video group-hover:scale-105"
        />
        {gameIconUrl && (
          <div className="absolute top-3 right-3 flex justify-center items-center p-1 rounded-lg backdrop-blur-sm bg-zinc-900 bg-opacity-50 size-8">
            <Image
              width={24}
              height={24}
              alt="game icon"
              src={gameIconUrl}
              className="rounded-md"
            />
          </div>
        )}
      </figure>
      <div
        className={`
          ${orientation === "vertical" && "h-full"}
          w-full flex flex-col gap-3 p-3
        `}
      >
        <h3
          className={`
            ${size === "medium" ? "line-clamp-2" : "line-clamp-1"}
            font-kanit font-medium text-ellipsis text-lg
          `}
        >
          {post.title}
        </h3>
        <div
          className={`
            ${size === "medium" ? "line-clamp-3" : "line-clamp-2"}
            text-sm text-zinc-400 text-ellipsis
          `}
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <div className="flex justify-end mt-auto">
          <span className="text-xs text-zinc-400 font-medium">
            {new Date(post.modified).toLocaleDateString("pt-BR", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
