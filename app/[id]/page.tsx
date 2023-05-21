'use client';

import Link from "next/link";
import CreateComment from "./CreateComment";

import type { RootState } from "../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { addComment, addComments } from "../Redux/Features/comment/commentSlice";
import { useEffect, useState } from "react";


const apiUrl = process.env.API_URL || 'http://localhost:4000'

async function getPost(id: string) {
    const res = await fetch(`${apiUrl}/posts/${id}`, { cache: "no-store" })
    const post = await res.json();
    return post;
}

async function getComments(id: string) {
    const res = await fetch(`${apiUrl}/comments?postId=${id}`, { cache: "no-store" })
    const comments = await res.json();
    return comments as any[];
}

function Comment({ comment }: any) {
    const { name, email, content } = comment;
    return (
        <div className="comment-line flex flex-col p-2 border-2 gap-1 rounded-md">
            <h4 className="font-bold">{name}</h4>
            <h5 className="text-slate-600">{email && email}</h5>
            <p className="pt-2">{content && content}</p>
        </div>
    )
}

export default function Post({ params }: any) {
    const dispatch = useDispatch();
    // const post = await getPost(params.id);
    const [post, setPost] = useState<any>();
    const comments = useSelector((state: RootState) => state.comments.comments);

    useEffect(() => {
        getPost(params.id).then((post) => {
            setPost(post);
        });
        getComments(params.id).then((comments) => {
            dispatch(addComments(comments));
        });
    }, []);

    return (
        <div className="flex flex-col m-2 gap-4 h-full">
            <div className="mx-8">
                <Link href="/">
                    <button className="border-2 p-1 rounded-md hover:border-rose-300">&lt; Back to home</button>
                </Link>
            </div>
            <div className="post-line flex flex-col p-2 gap-4">
                <h1 className="font-bold">{post?.title}</h1>
                <h3>Author: {post?.author}</h3>
                <p>{post?.content}</p>
            </div>
            <div className="flex flex-col gap-4 p-2 post-list mb-2">
                <h6>Comments</h6>
                <CreateComment postId={params.id} />
                {comments?.map((comment) => {
                    return <Comment key={comment?.id} comment={comment} />
                })}
            </div>
        </div>
    )
}