export default interface Comment {
    id: number;
    content: string;
    postId: number;
    name: string;
    email?: string;
}