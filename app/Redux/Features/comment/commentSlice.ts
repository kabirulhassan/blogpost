'use client';

import { createSlice} from "@reduxjs/toolkit";
import Comment from "@/app/interfaces/Comment";


export interface CommentState {
    comments: Comment[];
}

const initialState: CommentState = {
    comments: [],
};

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload);
        },
        addComments: (state, action) => {
            state.comments = action.payload;
        }
    }
});

export const { addComment, addComments } = commentSlice.actions;

export default commentSlice.reducer;