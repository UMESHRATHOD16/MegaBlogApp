import React from 'react'
import service from '../Appwrite/Config'
import { Link } from 'react-router-dom'


function PostCard({
    $id,
    title,
    featuredImage
}) {
  return (
     <Link to={`/post/${$id}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition group-hover:shadow-md">
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                </div>
        </div>
     </Link>
  )
}

export default PostCard
