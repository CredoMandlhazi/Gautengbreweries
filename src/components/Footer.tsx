import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
export const Footer = () => {
  return <footer className="bg-secondary/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="items-center md:items-start flex flex-col text-secondary">
            <img src={logo} alt="Gauteng Breweries Logo" className="h-16 mb-4" />
            <p className="text-muted-foreground text-sm text-center md:text-left">
              Superbly Refreshing Products. For the Love of Soccer. For the Love of Beer.
            </p>
            <p className="text-sm text-muted-foreground mt-4 text-center md:text-left font-semibold">
              ⚠️ 18+ Only - Please drink responsibly
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">CONTACT</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="https://wa.me/27825365601" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  082 536 5601 (WhatsApp)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:gautengbreweries@gmail.com" className="hover:text-primary transition-colors">
                  gautengbreweries@gmail.com
                </a>
              </p>
              <p className="flex items-start gap-2 pt-2">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>Brewhogs, Unit 50, Barbeque Downs, Kyalami, Midrand</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/beers" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Beers
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-muted-foreground hover:text-primary transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Gauteng Breweries (Pty) Ltd. All rights reserved.</p>
          <p className="mt-2">Celebrating Life, One Goal at a Time.</p>
          <p className="mt-2">Enjoy Responsibly. Not for Sale to Persons Under 18.</p>
          <p className="mt-2">Website by Indian Hill.</p>
        </div>
      </div>
    </footer>;
};
