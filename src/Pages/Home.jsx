import React, { useState, useEffect } from 'react';
import service from '../Appwrite/Config';
import { Link } from 'react-router-dom';
import { PostCard, Container } from '../Components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getPosts()
            .then((result) => {
                if (result) {
                    setPosts(result.rows || []);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch posts:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-[60vh] bg-slate-50 py-10">
            <Container>
                <section className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Stories & Ideas
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Welcome to MegaBlog
                    </h1>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        Discover ideas, share your thoughts, and explore stories from our community.
                    </p>
                </section>

                {loading ? (
                    <p className="py-12 text-center text-slate-500">
                        Loading posts...
                    </p>
                ) : posts.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
                        <h2 className="text-xl font-semibold text-slate-900">
                            No posts yet
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Be the first to share a story with the community.
                        </p>

                        <Link
                            to="/add-post"
                            className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            Create your first post
                        </Link>
                    </div>
                ) : (
                    <section>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Latest stories
                            </h2>
                            <span className="text-sm text-slate-500">
                                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </section>
                )}
            </Container>
        </main>
    );
}

export default Home;
