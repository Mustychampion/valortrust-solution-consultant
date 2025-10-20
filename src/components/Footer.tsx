import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border/40 bg-muted/50">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ValorTrust
            </h3>
            <p className="text-sm text-muted-foreground">
              Professional consulting services for your business growth.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/insights" className="text-muted-foreground hover:text-primary transition-colors">Insights</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">Contact</h4>
            <p className="text-sm text-muted-foreground">
              info@valortrust.com<br />
              +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ValorTrust. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
