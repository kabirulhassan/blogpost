import Link from "next/link";

const apiUrl = process.env.API_URL || 'http://localhost:4000';


async function getPosts() {
  const res = await fetch(`${apiUrl}/posts`, { cache: "no-store" });
  const posts = await res.json();
  return posts as any[];
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col justify-between h-screen">
      <h1 className="ml-8 pt-2 font-black text-xl">Blog List</h1>
      <div className="flex flex-col gap-4 p-2 overflow-y-scroll m-4 post-list">
        {posts?.length === 0 && <h1 className="text-center">No posts yet</h1>}
        {posts?.map((post) => {
          return <Post key={post?.id} post={post} />
        })}
      </div>
    </div>
  )
}

function Post({ post }: any) {
  const { id, title, author, content } = post;
  return (
    <div className="post-line flex flex-col p-2">
      <Link href={`/${id}`}>
        <h1 className="pb-1 bold font-bold">{title}</h1>
        <h3>Author: {author}</h3>
        <p className="truncate">{content}</p>
      </Link>
    </div>
  )
}
