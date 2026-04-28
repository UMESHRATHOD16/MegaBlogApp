import React,{useState,useEffect} from 'react'
import service from '../Appwrite/Config'
import { PostCard, Container } from '../Components'


function AllPosts() {

    const [posts, setPosts ] = useState([])
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents || posts.rows || [])
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="mb-6 flex items-end justify-between">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">All Posts</h1>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {posts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
