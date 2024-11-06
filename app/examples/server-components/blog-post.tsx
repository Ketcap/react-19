// This is a Server Component
export default function BlogPost({ post }: { post: any }) {
  return (
    <article className="mb-8">
      <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">
        By {post.author} on {post.date}
      </p>
      <div className="prose">{post.content}</div>
    </article>
  );
}
