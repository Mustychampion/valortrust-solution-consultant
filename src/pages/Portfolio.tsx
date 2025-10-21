import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  project_url: string | null;
}

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Our Portfolio</h1>
              <p className="text-xl text-muted-foreground">
                Showcasing our successful projects and client outcomes
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            {loading ? (
              <div className="text-center">Loading portfolio...</div>
            ) : items.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No portfolio items available at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-card transition-all duration-300">
                    {item.image_url && (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription>{item.description}</CardDescription>
                      {item.project_url && (
                        <Button variant="outline" asChild className="w-full">
                          <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                            View Project <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
