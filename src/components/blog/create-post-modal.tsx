import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus } from "lucide-react";

type CreatePostModalProps = {
  onPostCreated: () => void;
};

export function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    readTime: "",
    author: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleDateString(),
        }),
      });

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          category: "",
          readTime: "",
          author: "",
        });
        setOpen(false);
        onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Read Time (e.g., '5 min read')"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Create Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
