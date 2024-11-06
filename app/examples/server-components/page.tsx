import BlogPost from "./blog-post";
import CommentSection from "./comment-section";

// This is a Server Component
export default async function Page() {
  // Simulating a database call
  const post = await fetchBlogPost("example-post-id");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Server Components Demo</h1>
      <BlogPost post={post} />
      <CommentSection postId={post.id} />
    </div>
  );
}

// Simulated database call
async function fetchBlogPost(id: string) {
  // In a real app, this would be a database query
  await new Promise((resolve) => setTimeout(resolve, 1_000)); // Simulate network delay
  return {
    id,
    title: "Understanding Server Components",
    content: "Server Components are a game-changer for React applications...",
    author: "React Team",
    date: "2023-06-15",
  };
}
