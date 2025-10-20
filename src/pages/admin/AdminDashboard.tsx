import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BarChart3, Package, Briefcase, FileText, MessageSquare, Mail } from "lucide-react";

const AdminDashboard = () => {
  const sections = [
    {
      title: "Service Categories",
      description: "Manage service categories",
      icon: BarChart3,
      href: "/admin/categories",
      color: "text-blue-600"
    },
    {
      title: "Services",
      description: "Add, edit, or remove services",
      icon: Package,
      href: "/admin/services",
      color: "text-green-600"
    },
    {
      title: "Portfolio",
      description: "Manage portfolio items",
      icon: Briefcase,
      href: "/admin/portfolio",
      color: "text-purple-600"
    },
    {
      title: "Articles",
      description: "Create and publish insights",
      icon: FileText,
      href: "/admin/articles",
      color: "text-orange-600"
    },
    {
      title: "Comments",
      description: "Approve or delete comments",
      icon: MessageSquare,
      href: "/admin/comments",
      color: "text-pink-600"
    },
    {
      title: "Contact Submissions",
      description: "View customer inquiries",
      icon: Mail,
      href: "/admin/contacts",
      color: "text-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Admin Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Manage your website content and settings
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.map((section) => (
                <Link key={section.href} to={section.href}>
                  <Card className="h-full hover:shadow-card transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className={`mb-4 p-3 rounded-lg bg-muted w-fit ${section.color}`}>
                        <section.icon className="h-8 w-8" />
                      </div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
