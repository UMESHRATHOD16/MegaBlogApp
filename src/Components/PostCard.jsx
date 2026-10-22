
import React from 'react';
import service from '../Appwrite/Config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage, content }) {
    return (
        <Link to={`/post/${$id}`} className="group block h-full">
            <article className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    {featuredImage ? (
                        <img
                            src={service.getFilePreview(featuredImage)}
                            alt={title || 'Blog cover'}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            No cover image
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <h2 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
                        {title || 'Untitled post'}
                    </h2>

                    {content && (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                            {content.replace(/<[^>]*>/g, '').trim()}
                        </p>
                    )}

                    <div className="mt-4 flex items-center justify-between text-sm font-semibold text-blue-600">
                        <span>Read article</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

export default PostCard;
