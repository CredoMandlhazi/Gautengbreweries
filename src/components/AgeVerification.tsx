import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const AgeVerification = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVerified = localStorage.getItem("ageVerified");
    if (!hasVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerify = (isOver18: boolean) => {
    if (isOver18) {
      localStorage.setItem("ageVerified", "true");
      setIsOpen(false);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Gauteng Breweries" className="h-24 w-auto" />
          </div>
          <DialogTitle className="text-2xl font-black text-center">
            <span className="text-primary">AGE</span> VERIFICATION
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            You must be 18 years or older to enter this website.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 pt-4">
          <Button
            onClick={() => handleVerify(true)}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            I'M 18+
          </Button>
          <Button
            onClick={() => handleVerify(false)}
            variant="outline"
            className="flex-1 border-2 font-bold"
          >
            UNDER 18
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
