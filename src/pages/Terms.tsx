import { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-primary">
          Terms & Conditions
        </h1>
        
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p>
              Welcome to Township Brewing Co. By accessing and using this website, you accept and agree to be bound 
              by the terms and provisions of this agreement. If you do not agree to these terms, 
              please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Age Restriction</h2>
            <p>
              You must be 18 years of age or older to purchase products from this website. 
              By placing an order, you confirm that you are of legal drinking age in South Africa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Product Information</h2>
            <p>
              We strive to provide accurate product information. However, we do not warrant that product descriptions, 
              pricing, or other content is accurate, complete, reliable, current, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Orders and Payment</h2>
            <p>
              All orders are subject to acceptance and product availability. We reserve the right to refuse or 
              cancel any order for any reason. Payment must be received before orders are dispatched.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Pricing</h2>
            <p>
              All prices are quoted in South African Rands (ZAR) and include VAT where applicable. 
              Prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Responsible Drinking</h2>
            <p>
              We promote responsible drinking. Please enjoy our products responsibly and never drink and drive. 
              Our products are not for sale to persons under the age of 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
            <p>
              Township Brewing Co. shall not be liable for any direct, indirect, incidental, special, or 
              consequential damages resulting from the use or inability to use our products or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Information</h2>
            <p>
              For questions about these terms and conditions, please contact us:
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

export default Terms;
