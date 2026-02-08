import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/CartDrawer";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              HOME
            </Link>
            <Link to="/beers" className="text-foreground hover:text-primary transition-colors font-medium">
              BEERS
            </Link>
            <Link to="/events" className="text-foreground hover:text-primary transition-colors font-medium">
              EVENTS
            </Link>
            <Link to="/locations" className="text-foreground hover:text-primary transition-colors font-medium">
              LOCATIONS
            </Link>
          </nav>

          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Gauteng Breweries" className="h-16 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a
                    href="https://lovable-project-79ft9.myshopify.com/account"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    My Account
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="https://lovable-project-79ft9.myshopify.com/account/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    Sign In
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <CartDrawer />
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <Link to="/contact">CONTACT US</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link to="/" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              HOME
            </Link>
            <Link to="/beers" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              BEERS
            </Link>
            <Link to="/events" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              EVENTS
            </Link>
            <Link to="/locations" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              LOCATIONS
            </Link>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a
                      href="https://lovable-project-79ft9.myshopify.com/account"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Account
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://lovable-project-79ft9.myshopify.com/account/login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <CartDrawer />
              <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACT US</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
