import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../Appwrite/Config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async (data) => {
        setError('');
        setLoading(true);

        let uploadedFileId = null;

        try {
            const imageFile = data.image?.[0];

            if (!post && !imageFile) {
                throw new Error('Please select a featured image.');
            }

            let file = null;

            if (imageFile) {
                file = await service.uploadFile(imageFile);
                uploadedFileId = file?.$id;

                if (!uploadedFileId) {
                    throw new Error('Image upload failed.');
                }
            }

            const postData = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                ...(file ? { featuredImage: file.$id } : {}),
            };

            let dbPost;

            if (post) {
                dbPost = await service.updatePost(post.$id, postData);
            } else {
                if (!userData?.$id) {
                    throw new Error('You are not logged in. Please log in again.');
                }

                dbPost = await service.createPost({
                    ...postData,
                    featuredImage: file.$id,
                    userId: userData.$id,
                });
            }

            if (!dbPost) {
                throw new Error('Post could not be saved.');
            }

            if (post && file && post.featuredImage) {
                try {
                    await service.deleteFile(post.featuredImage);
                } catch (deleteError) {
                    console.error('Old image could not be deleted:', deleteError);
                }
            }

            navigate(`/post/${dbPost.slug || dbPost.$id}`);
        } catch (err) {
            console.error('Post submission failed:', err);

            if (uploadedFileId) {
                try {
                    await service.deleteFile(uploadedFileId);
                } catch (cleanupError) {
                    console.error('Uploaded image cleanup failed:', cleanupError);
                }
            }

            setError(err.message || 'Something went wrong while saving your post.');
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s+/g, '-');
        }

        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: 'Title is required.' })}
                />
                {errors.title && (
                    <p className="mb-3 text-sm text-red-600">
                        {errors.title.message}
                    </p>
                )}

                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-4"
                    {...register('slug', { required: 'Slug is required.' })}
                />
                {errors.slug && (
                    <p className="mb-3 text-sm text-red-600">
                        {errors.slug.message}
                    </p>
                )}

                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image:"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', {
                        required: !post ? 'Please select a featured image.' : false
                    })}
                />
                {errors.image && (
                    <p className="mb-3 text-sm text-red-600">
                        {errors.image.message}
                    </p>
                )}

                {post && (
                    <div className="mb-4 w-full">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                />

                {error && (
                    <p className="mb-4 break-words text-sm text-red-600">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    bgColor={post ? 'bg-green-500' : undefined}
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
