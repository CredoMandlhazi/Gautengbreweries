import { useEffect } from "react";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-primary">
          Privacy Policy
        </h1>
        
        <div className="max-w-3xl space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Name and contact information (email, phone number, delivery address)</li>
              <li>Payment information</li>
              <li>Age verification information</li>
              <li>Order history and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Process and fulfill your orders</li>
              <li>Verify your age for legal compliance</li>
              <li>Communicate with you about your orders and our products</li>
              <li>Improve our products and services</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Delivery service providers to fulfill your orders</li>
              <li>Payment processors to handle transactions</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the internet is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience and analyze site traffic. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us:
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

export default Privacy;
