import { useEffect } from "react";

const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-primary">
          Shipping & Delivery Policy
        </h1>
        
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Delivery Areas</h2>
            <p>
              We currently deliver to addresses within Gauteng, South Africa. 
              Delivery to other provinces may be available upon request - please contact us for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Delivery Times</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Standard Delivery:</strong> 3-5 business days</li>
              <li><strong>Express Delivery:</strong> 1-2 business days (additional charges apply)</li>
            </ul>
            <p className="mt-4">
              Orders placed before 12:00 PM will be processed on the same business day. 
              Orders placed after 12:00 PM will be processed on the next business day.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Delivery Charges</h2>
            <p>
              Delivery charges are calculated based on your location and delivery method selected at checkout. 
              Free delivery is available for orders over R500.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Age Verification</h2>
            <p>
              As per South African law, you must be 18 years or older to purchase alcoholic beverages. 
              Our delivery personnel are required to verify the age of the recipient upon delivery. 
              Valid identification must be presented. If the recipient cannot provide valid ID or is under 18, 
              the delivery will not be completed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tracking Your Order</h2>
            <p>
              Once your order has been dispatched, you will receive a confirmation email with tracking information. 
              You can track your order status through the link provided in the email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p>
              For any questions regarding shipping and delivery, please contact us:
            </p>
            <ul className="list-none space-y-2 ml-4 mt-4">
              <li>WhatsApp: <a href="https://wa.me/27825365601" className="text-primary hover:underline">082 536 5601</a></li>
              <li>Email: <a href="mailto:gautengbreweries@gmail.com" className="text-primary hover:underline">gautengbreweries@gmail.com</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
