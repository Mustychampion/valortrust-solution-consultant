import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { z } from "zod";

const commentSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  content: z.string().trim().min(1, "Comment is required").max(1000),
});

interface Article {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published_at: string | null;
  author: { full_name: string } | null;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchComments();
    }
  }, [id]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*, author:profiles(full_name)")
      .eq("id", id)
      .eq("is_published", true)
      .single();

    if (!error && data) {
      setArticle(data);
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("article_id", id)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (data) {
      setComments(data);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to comment");
      return;
    }

    setSubmitting(true);

    try {
      const validation = commentSchema.safeParse({
        name: commentName,
        email: commentEmail,
        content: commentContent,
      });

      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        return;
      }

      const { error } = await supabase.from("comments").insert({
        article_id: id,
        user_id: user.id,
        author_name: validation.data.name,
        author_email: validation.data.email,
        content: validation.data.content,
      });

      if (error) throw error;

      toast.success("Comment submitted! It will appear after admin approval.");
      setCommentName("");
      setCommentEmail("");
      setCommentContent("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Article not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <article className="py-16">
          <div className="container max-w-4xl">
            {article.image_url && (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-8">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                {article.author && (
                  <span>By {article.author.full_name}</span>
                )}
                {article.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(article.published_at), "MMMM d, yyyy")}
                  </div>
                )}
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="border-t pt-16">
              <h2 className="text-3xl font-bold mb-8">Comments ({comments.length})</h2>
              
              <div className="space-y-6 mb-12">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{comment.author_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(comment.created_at), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-bold">Leave a Comment</h3>
                  <p className="text-sm text-muted-foreground">
                    {user ? "Your comment will be reviewed before being published." : "Please sign in to leave a comment."}
                  </p>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={commentEmail}
                            onChange={(e) => setCommentEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                          id="comment"
                          rows={4}
                          value={commentContent}
                          onChange={(e) => setCommentContent(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Comment"}
                      </Button>
                    </form>
                  ) : (
                    <p className="text-center py-8 text-muted-foreground">
                      Please sign in to leave a comment.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
