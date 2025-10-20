import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  is_active: boolean;
  category: { name: string } | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*, category:service_categories(name)")
      .eq("is_active", true)
      .order("display_order");

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive consulting solutions tailored to your business needs
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            {loading ? (
              <div className="text-center">Loading services...</div>
            ) : services.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No services available at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-card transition-all duration-300">
                    {service.image_url && (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        {service.category && (
                          <Badge variant="secondary">{service.category.name}</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {service.description}
                      </CardDescription>
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

export default Services;
