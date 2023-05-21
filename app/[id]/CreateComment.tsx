'use client';
const apiUrl = process.env.API_URL || 'http://localhost:4000';

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../Redux/Features/comment/commentSlice";

const postComment = async (commentData: any) => {
    const res = await fetch(`${apiUrl}/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const comment = await res.json();
    return comment;
};

export default function CreateComment(params: any) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!comment || !name || !email) return;
        const commentData = {
            content: comment,
            name: name,
            email: email,
            postId: params.postId
        };
        console.log(commentData);
        dispatch(addComment(commentData));
        postComment(commentData);
        setComment('');
        setName('');
        setEmail('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 p-2">
                <textarea
                    required
                    className="border-2 rounded-md"
                    id="comment"
                    placeholder="Add new comment *"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex flex-col md:flex-row gap-1">
                    <input
                        required
                        className="border-2 flex-1 rounded-md"
                        type="text"
                        value={name}
                        placeholder="Name *"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="border-2 rounded-md"
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="border-2 rounded-md hover:bg-green-500" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};