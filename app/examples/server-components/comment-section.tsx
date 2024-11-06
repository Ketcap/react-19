"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CommentSection(props: { postId: string }) {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        Comments for post {props.postId}
      </h3>
      {comments.map((comment, index) => (
        <p key={index} className="mb-2 p-2 bg-gray-100 rounded">
          {comment}
        </p>
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="mb-2"
        />
        <Button type="submit">Post Comment</Button>
      </form>
    </div>
  );
}
