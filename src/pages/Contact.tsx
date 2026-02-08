import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Phone, Mail, MapPin, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    eventType: "",
    date: undefined as Date | undefined,
    additionalInfo: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you soon to confirm your event details.",
    });
    setBookingData({ name: "", email: "", eventType: "", date: undefined, additionalInfo: "" });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              CONTACT <span className="text-primary">US</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with Gauteng Breweries
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 bg-card border-border">
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="contact">General Contact</TabsTrigger>
                  <TabsTrigger value="booking">Event Booking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact">
                  <h2 className="text-2xl font-black mb-6">SEND US A MESSAGE</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    >
                      SEND MESSAGE
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="booking">
                  <h2 className="text-2xl font-black mb-6">BOOK AN EVENT</h2>
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="booking-name">Name</Label>
                      <Input
                        id="booking-name"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="booking-email">Email</Label>
                      <Input
                        id="booking-email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select
                        value={bookingData.eventType}
                        onValueChange={(value) => setBookingData({ ...bookingData, eventType: value })}
                        required
                      >
                        <SelectTrigger id="event-type">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brewery-tour">Brewery Tour</SelectItem>
                          <SelectItem value="tasting-session">Tasting Session</SelectItem>
                          <SelectItem value="private-event">Private Event</SelectItem>
                          <SelectItem value="corporate-event">Corporate Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !bookingData.date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingData.date ? format(bookingData.date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={bookingData.date}
                            onSelect={(date) => setBookingData({ ...bookingData, date })}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="additional-info">Additional Information</Label>
                      <Textarea
                        id="additional-info"
                        rows={4}
                        value={bookingData.additionalInfo}
                        onChange={(e) => setBookingData({ ...bookingData, additionalInfo: e.target.value })}
                        placeholder="Tell us more about your event..."
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    >
                      SUBMIT BOOKING REQUEST
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>

            <div className="space-y-6">
              <Card className="p-8 bg-card border-border">
                <h2 className="text-2xl font-black mb-6">GET IN TOUCH</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <a
                        href="https://wa.me/27825365601"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        082 536 5601 (WhatsApp)
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <a
                        href="mailto:gautengbreweries@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        gautengbreweries@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Brewhogs, Unit 50, West Barbeque Corner<br />
                        Dytchley Rd, Barbeque Downs<br />
                        Kyalami, Midrand, South Africa
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-primary/10 border-primary">
                <h3 className="text-xl font-black mb-4">BUSINESS ENQUIRIES</h3>
                <p className="text-muted-foreground mb-4">
                  Interested in stocking our beers or partnering with us? Get in touch!
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-primary font-bold"
                >
                  <a href="https://wa.me/27825365601" target="_blank" rel="noopener noreferrer">
                    CHAT ON WHATSAPP
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
