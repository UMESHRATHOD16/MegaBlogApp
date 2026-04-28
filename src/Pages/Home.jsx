import React, {useState, useEffect} from 'react'
import service from '../Appwrite/Config'
import { Link } from 'react-router-dom'
import { PostCard, Container } from '../Components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        service.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents || posts.rows || [])
            }
        })
    },[])
    
    if(posts.length === 0){
        return(
        <Container>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Welcome to MegaBlog</h1>
                <p className="mt-2 text-slate-600">Sign in to read and write posts.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        to="/login"
                        className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </Container>
        )
    }
    return (
        <>
            <div className='w-full py-8'>
                <Container>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Home
