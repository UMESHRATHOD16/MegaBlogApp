import React from 'react';
import { Link } from 'react-router-dom';
import service from '../Appwrite/Config';

function PostCard({ $id, Title, FeaturedImage, Content, $createdAt }) {
    const excerpt = (Content || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const date = $createdAt
        ? new Date($createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : '';

    return (
        <article className="group flex h-full flex-col">
            <Link
                to={`/post/${$id}`}
                className="block overflow-hidden rounded-sm bg-stone-100"
                aria-label={`Read ${Title || 'article'}`}
            >
                {FeaturedImage ? (
                    <img
                        src={service.getFilePreview(FeaturedImage)}
                        alt={Title || 'Article cover'}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex aspect-[4/3] items-center justify-center text-sm text-stone-400">
                        No cover image
                    </div>
                )}
            </Link>

            <div className="flex flex-1 flex-col pt-4">
                {date && (
                    <p className="text-xs uppercase tracking-[0.16em] text-stone-500">
                        {date}
                    </p>
                )}

                <Link to={`/post/${$id}`}>
                    <h3 className="mt-2 font-serif text-xl leading-snug text-stone-900 transition-colors group-hover:text-amber-800">
                        {Title || 'Untitled story'}
                    </h3>
                </Link>

                {excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">
                        {excerpt}
                    </p>
                )}

                <Link
                    to={`/post/${$id}`}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-stone-900"
                >
                    Read story
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                </Link>
            </div>
        </article>
    );
}

export default PostCard;
