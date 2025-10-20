import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle, Users, Target, Award } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Transform Your Business with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Expert Consulting
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                We help businesses achieve their goals through strategic guidance, innovative solutions, and proven methodologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-lg shadow-elegant">
                  <Link to="/contact">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Why Choose ValorTrust</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We deliver exceptional value through expertise and commitment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Expert Team",
                  description: "Seasoned professionals with decades of combined experience"
                },
                {
                  icon: Target,
                  title: "Results-Driven",
                  description: "Focused on measurable outcomes and business impact"
                },
                {
                  icon: Award,
                  title: "Proven Track Record",
                  description: "Successfully delivered 500+ projects worldwide"
                },
                {
                  icon: CheckCircle,
                  title: "Client Satisfaction",
                  description: "98% client satisfaction rate and long-term partnerships"
                }
              ].map((feature, i) => (
                <Card key={i} className="text-center hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 rounded-lg bg-primary/10 w-fit">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <Card className="relative overflow-hidden shadow-elegant">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
              <CardContent className="relative z-10 py-16 px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss how we can help you achieve your business objectives
                </p>
                <Button size="lg" asChild className="text-lg shadow-elegant">
                  <Link to="/contact">
                    Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
