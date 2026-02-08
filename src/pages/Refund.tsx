import { useEffect } from "react";

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-primary">
          Refund Policy
        </h1>
        
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Returns</h2>
            <p>
              Due to the nature of our products (alcoholic beverages), we cannot accept returns once the 
              order has been delivered and the seal has been broken, unless the product is damaged or defective.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Damaged or Defective Products</h2>
            <p>
              If you receive a damaged or defective product, please contact us within 48 hours of delivery. 
              We will require photographic evidence of the damage or defect. Upon verification, we will:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Replace the product at no additional cost, or</li>
              <li>Issue a full refund to your original payment method</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Order Cancellation</h2>
            <p>
              You may cancel your order before it has been dispatched for a full refund. 
              Once an order has been dispatched, it cannot be cancelled. 
              To cancel an order, please contact us immediately:
            </p>
            <ul className="list-none space-y-2 ml-4 mt-4">
              <li>WhatsApp: <a href="https://wa.me/27825365601" className="text-primary hover:underline">082 536 5601</a></li>
              <li>Email: <a href="mailto:gautengbreweries@gmail.com" className="text-primary hover:underline">gautengbreweries@gmail.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Incorrect Orders</h2>
            <p>
              If you receive an incorrect product, please contact us within 48 hours of delivery. 
              We will arrange for collection of the incorrect item and deliver the correct product at no additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Refund Processing Time</h2>
            <p>
              Approved refunds will be processed within 7-10 business days to your original payment method. 
              Please allow additional time for your bank or card issuer to process the refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Non-Refundable Items</h2>
            <p>The following items are not eligible for refunds:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Products with broken seals (unless damaged or defective)</li>
              <li>Products past their best-before date at time of delivery (unless delivered that way)</li>
              <li>Products damaged due to improper storage after delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
            <p>
              For any refund-related queries, please contact us:
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

export default Refund;
