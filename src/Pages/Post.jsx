
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../Appwrite/Config';
import { Container } from '../Components';
import parse from 'html-react-parser';

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;

        async function fetchPost() {
            try {
                if (!slug) {
                    navigate('/');
                    return;
                }

                const data = await service.getPost(slug);

                if (!cancelled) {
                    if (data) {
                        setPost(data);
                    } else {
                        setError(true);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch post:', err);
                if (!cancelled) setError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPost();

        return () => {
            cancelled = true;
        };
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post) return;

        const confirmed = window.confirm(
            'Are you sure you want to delete this story?'
        );

        if (!confirmed) return;

        const deleted = await service.deletePost(post.$id);

        if (deleted) {
            if (post.FeaturedImage) {
                await service.deleteFile(post.FeaturedImage);
            }

            navigate('/');
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#faf9f6] py-20">
                <Container>
                    <div className="mx-auto max-w-3xl animate-pulse">
                        <div className="h-3 w-28 bg-stone-200" />
                        <div className="mt-6 h-12 w-4/5 bg-stone-200" />
                        <div className="mt-3 h-12 w-3/5 bg-stone-200" />
                        <div className="mt-10 aspect-[16/9] bg-stone-200" />
                        <div className="mt-10 h-4 w-full bg-stone-200" />
                        <div className="mt-3 h-4 w-5/6 bg-stone-200" />
                    </div>
                </Container>
            </main>
        );
    }

    if (error || !post) {
        return (
            <main className="min-h-[60vh] bg-[#faf9f6] px-5 py-24 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                    Story unavailable
                </p>
                <h1 className="mt-4 font-serif text-3xl text-stone-900">
                    We couldn't find this story.
                </h1>
                <p className="mt-3 text-sm text-stone-600">
                    It may have been removed or the link may be incorrect.
                </p>
                <Link
                    to="/"
                    className="mt-7 inline-flex border border-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-widest transition hover:bg-stone-100"
                >
                    Back to journal
                </Link>
            </main>
        );
    }

    const publishedDate = post.$createdAt
        ? new Date(post.$createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
          })
        : null;

    return (
        <main className="min-h-screen bg-[#faf9f6] text-stone-900">
            <Container>
                <article className="mx-auto max-w-4xl pb-16 pt-8 sm:pb-24 sm:pt-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 transition hover:text-amber-800"
                    >
                        <span>←</span> Back to journal
                    </Link>

                    <header className="mx-auto max-w-3xl py-10 text-center sm:py-14">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
                            The MegaBlog Journal
                        </p>

                        <h1 className="mt-6 break-words font-serif text-4xl leading-[1.12] tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                            {post.Title || 'Untitled story'}
                        </h1>

                        {publishedDate && (
                            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-stone-500">
                                Published {publishedDate}
                            </p>
                        )}

                        <div className="mx-auto mt-7 h-px w-16 bg-amber-800" />
                    </header>

                    {post.FeaturedImage && (
                        <figure className="mb-10 overflow-hidden bg-stone-100 sm:mb-14">
                            <img
                                src={service.getFileView(post.FeaturedImage)}
                                alt={post.Title || 'Story cover'}
                                className="max-h-[620px] w-full object-cover"
                            />
                        </figure>
                    )}

                    <div className="mx-auto max-w-2xl">
                        <div className="post-content text-base leading-8 text-stone-700 sm:text-lg sm:leading-9">
                            {post.Content && parse(post.Content)}
                        </div>

                        <footer className="mt-14 border-t border-stone-200 pt-7">
                            <p className="font-serif text-xl italic text-stone-800">
                                Thank you for spending your time here.
                            </p>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-stone-600 transition hover:text-amber-800"
                                >
                                    <span>←</span> Explore more stories
                                </Link>

                                <div className="flex gap-3">
                                    <Link
                                        to={`/edit-post/${post.$id}`}
                                        className="border border-stone-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"
                                    >
                                        Edit story
                                    </Link>

                                    <button
                                        onClick={deletePost}
                                        className="border border-red-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-red-700 transition hover:bg-red-700 hover:text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </footer>
                    </div>
                </article>
            </Container>
        </main>
    );
}
