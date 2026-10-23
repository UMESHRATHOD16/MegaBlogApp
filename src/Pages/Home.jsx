import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../Appwrite/Config';
import { PostCard, Container } from '../Components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function fetchPosts() {
            try {
                const result = await service.getPosts();

                if (!cancelled) {
                    if (result) {
                        setPosts(result.rows || []);
                    } else {
                        setError(true);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch posts:', err);
                if (!cancelled) setError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchPosts();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredPosts = posts.filter((post) => {
        const title = post.Title || '';
        const content = (post.Content || '').replace(/<[^>]*>/g, ' ');

        const searchableText = `${title} ${content}`.toLowerCase();
        return searchableText.includes(search.trim().toLowerCase());
    });

    const featuredPost = search.trim() ? null : posts[0];

    const remainingPosts = search.trim()
        ? filteredPosts
        : posts.slice(1);

    const getExcerpt = (content) =>
        (content || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

    return (
        <main className="min-h-screen bg-[#faf9f6] text-stone-900">
            <Container>
                <section className="border-b border-stone-200 py-12 sm:py-16">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-800">
                        The MegaBlog Journal
                    </p>

                    <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                            Ideas worth
                            <br />
                            <span className="italic text-stone-500">
                                spending time on.
                            </span>
                        </h1>

                        <p className="max-w-sm text-sm leading-7 text-stone-600 sm:text-base">
                            Thoughtful stories, useful ideas, and perspectives
                            from people who have something to share.
                        </p>
                    </div>

                    <div className="mt-8 max-w-xl">
                        <label
                            htmlFor="story-search"
                            className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-stone-500"
                        >
                            Find your next read
                        </label>

                        <div className="flex items-center gap-3 border-b border-stone-300 py-3 transition-colors focus-within:border-amber-800">
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-stone-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="m16 16 4 4" />
                            </svg>

                            <input
                                id="story-search"
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search stories, ideas, topics..."
                                className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="shrink-0 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-amber-800"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-10 sm:py-14">
                    <div className="mb-7 flex items-center justify-between gap-4 border-b border-stone-200 pb-4">
                        <h2 className="font-serif text-2xl sm:text-3xl">
                            {search.trim() ? 'Search results' : 'The latest'}
                        </h2>

                        {!loading && (
                            <span className="text-xs uppercase tracking-[0.15em] text-stone-500">
                                {search.trim()
                                    ? `${filteredPosts.length} found`
                                    : `${posts.length} ${posts.length === 1 ? 'story' : 'stories'}`}
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="grid gap-8 md:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="animate-pulse">
                                    <div className="aspect-[4/3] bg-stone-200" />
                                    <div className="mt-5 h-3 w-1/3 bg-stone-200" />
                                    <div className="mt-3 h-6 w-4/5 bg-stone-200" />
                                    <div className="mt-3 h-4 w-full bg-stone-200" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="py-16 text-center">
                            <h3 className="font-serif text-2xl">
                                We couldn't load the stories.
                            </h3>
                            <p className="mt-3 text-sm text-stone-600">
                                Please check your connection and try again.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-5 border border-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-stone-100"
                            >
                                Try again
                            </button>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                                A blank page, for now
                            </p>
                            <h3 className="mt-4 font-serif text-3xl">
                                Every great journal starts somewhere.
                            </h3>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600">
                                Publish your first story and give readers
                                something worth coming back for.
                            </p>
                            <Link
                                to="/add-post"
                                className="mt-6 inline-flex bg-stone-900 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-amber-900"
                            >
                                Write a story
                            </Link>
                        </div>
                    ) : search.trim() && filteredPosts.length === 0 ? (
                        <div className="py-16 text-center">
                            <h3 className="font-serif text-2xl">
                                No stories found.
                            </h3>
                            <p className="mt-3 text-sm text-stone-600">
                                Try another keyword or clear your search.
                            </p>
                            <button
                                onClick={() => setSearch('')}
                                className="mt-5 border border-stone-300 px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-stone-100"
                            >
                                Show all stories
                            </button>
                        </div>
                    ) : (
                        <>
                            {featuredPost && (
                                <article className="grid gap-7 border-b border-stone-200 pb-10 lg:grid-cols-12 lg:gap-10 lg:pb-14">
                                    <Link
                                        to={`/post/${featuredPost.$id}`}
                                        className="group block overflow-hidden bg-stone-100 lg:col-span-7"
                                    >
                                        {featuredPost.FeaturedImage ? (
                                            <img
                                                src={service.getFileView(featuredPost.FeaturedImage)}
                                                alt={featuredPost.Title || 'Featured story'}
                                                className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] lg:aspect-[4/3]"
                                            />
                                        ) : (
                                            <div className="flex aspect-[5/3] items-center justify-center text-sm text-stone-400">
                                                No cover image
                                            </div>
                                        )}
                                    </Link>

                                    <div className="flex flex-col justify-center lg:col-span-5 lg:py-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                                            Editor's pick
                                        </p>

                                        {featuredPost.$createdAt && (
                                            <p className="mt-4 text-xs uppercase tracking-wider text-stone-500">
                                                {new Date(featuredPost.$createdAt).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        )}

                                        <Link to={`/post/${featuredPost.$id}`}>
                                            <h3 className="mt-3 font-serif text-3xl leading-tight tracking-tight transition-colors hover:text-amber-800 sm:text-4xl">
                                                {featuredPost.Title || 'Untitled story'}
                                            </h3>
                                        </Link>

                                        {featuredPost.Content && (
                                            <p className="mt-4 line-clamp-4 text-sm leading-7 text-stone-600">
                                                {getExcerpt(featuredPost.Content)}
                                            </p>
                                        )}

                                        <Link
                                            to={`/post/${featuredPost.$id}`}
                                            className="mt-7 inline-flex w-fit items-center gap-3 border-b border-stone-900 pb-2 text-xs font-semibold uppercase tracking-[0.16em] hover:border-amber-800 hover:text-amber-800"
                                        >
                                            Discover the story <span>→</span>
                                        </Link>
                                    </div>
                                </article>
                            )}

                            {remainingPosts.length > 0 && (
                                <section className={featuredPost ? 'pt-10 sm:pt-12' : ''}>
                                    <div className="mb-7 flex items-center justify-between">
                                        <h2 className="font-serif text-2xl sm:text-3xl">
                                            {search.trim() ? 'Matching stories' : 'More to explore'}
                                        </h2>

                                        {!search.trim() && (
                                            <Link
                                                to="/all-posts"
                                                className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-600 transition hover:text-amber-800"
                                            >
                                                All stories →
                                            </Link>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                                        {remainingPosts.map((post) => (
                                            <PostCard key={post.$id} {...post} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </section>

                {!search.trim() && (
                    <section className="mb-12 border-y border-stone-200 py-8 sm:mb-16 sm:py-10">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                                    Have a story?
                                </p>
                                <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                                    Put your ideas into words.
                                </h2>
                            </div>

                            <Link
                                to="/add-post"
                                className="inline-flex w-fit items-center gap-3 bg-stone-900 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-amber-900"
                            >
                                Write a story <span>→</span>
                            </Link>
                        </div>
                    </section>
                )}
            </Container>
        </main>
    );
}

export default Home;
