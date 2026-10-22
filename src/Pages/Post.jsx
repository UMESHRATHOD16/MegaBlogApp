import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../Appwrite/Config';
import { Button, Container } from '../Components';
import parse from 'html-react-parser';

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!slug) {
            navigate('/');
            return;
        }

        service.getPost(slug).then((data) => {
            if (data) {
                setPost(data);
            } else {
                navigate('/');
            }
        });
    }, [slug, navigate]);

    const deletePost = async () => {
        const status = await service.deletePost(post.$id);

        if (status) {
            if (post.FeaturedImage) {
                await service.deleteFile(post.FeaturedImage);
            }
            navigate('/');
        }
    };

    if (!post) return null;

    return (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.FeaturedImage && (
                        <img
                            src={service.getFilePreview(post.FeaturedImage)}
                            alt={post.Title}
                            className="rounded-xl"
                        />
                    )}
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>

                <div className="browser-css">
                    {post.Content && parse(post.Content)}
                </div>

                <div className="mt-6 flex gap-3">
                    <Link to="/">
                        <Button>Back to Home</Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
