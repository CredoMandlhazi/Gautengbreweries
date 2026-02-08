import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Package, Truck, Calendar, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  price: string;
  variant_title: string | null;
}

interface OrderDetails {
  id: number;
  orderNumber: number;
  createdAt: string;
  totalPrice: string;
  currency: string;
  financialStatus: string;
  fulfillmentStatus: string | null;
  items: OrderItem[];
  shippingAddress?: {
    first_name: string;
    last_name: string;
    address1: string;
    city: string;
    province: string;
    zip: string;
    country: string;
  };
  customer?: {
    email: string;
    first_name: string;
    last_name: string;
  };
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery: string;
}

export default function OrderConfirmation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const orderId = searchParams.get('orderId');

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('get-shopify-order', {
        body: { orderId: id }
      });

      if (error) {
        console.error('Error fetching order:', error);
        toast.error("Failed to load order details");
        return;
      }

      if (data?.order) {
        setOrder(data.order);
        
        // Send order confirmation email
        const emailSent = localStorage.getItem(`order-email-sent-${data.order.orderNumber}`);
        if (!emailSent && data.order.customer?.email) {
          try {
            await supabase.functions.invoke('send-order-email', {
              body: {
                type: 'confirmation',
                order: data.order
              }
            });
            localStorage.setItem(`order-email-sent-${data.order.orderNumber}`, 'true');
            toast.success("Order confirmation email sent!");
          } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Don't show error to user, email is not critical
          }
        }
      } else {
        toast.error("Order not found");
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setSearchParams({ orderId: orderNumber.trim() });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Package className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order number to view order details and tracking information
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleLookup} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
                    Order Number
                  </label>
                  <input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your order number"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    You can find your order number in your confirmation email
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Looking up order...
                    </>
                  ) : (
                    'View Order Details'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Or</p>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://lovable-project-79ft9.myshopify.com/account', '_blank')}
                >
                  View All Orders in Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg mb-4">Order not found</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const estimatedDate = new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We'll send you shipping confirmation when your items ship.
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order #{order.orderNumber}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Items Ordered
              </h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start py-2">
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      {item.variant_title && (
                        <p className="text-sm text-muted-foreground">{item.variant_title}</p>
                      )}
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      {order.currency} {parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>
                {order.currency} {parseFloat(order.totalPrice).toFixed(2)}
              </span>
            </div>

            {/* Payment Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Payment Status:</span>
              <span className="capitalize px-2 py-1 bg-primary/10 text-primary rounded">
                {order.financialStatus.replace('_', ' ')}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Estimated Delivery */}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="font-semibold">Estimated Delivery</p>
                <p className="text-muted-foreground">{estimatedDate}</p>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div>
                <p className="font-semibold mb-1">Shipping Address</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.first_name} {order.shippingAddress.last_name}<br />
                  {order.shippingAddress.address1}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            )}

            {/* Tracking Info */}
            {order.trackingNumber && (
              <div>
                <p className="font-semibold mb-1">Tracking Number</p>
                <p className="text-muted-foreground">{order.trackingNumber}</p>
                {order.trackingUrl && (
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => window.open(order.trackingUrl, '_blank')}
                  >
                    Track Package <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            )}

            {/* Fulfillment Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Fulfillment Status:</span>
              <span className="capitalize px-2 py-1 bg-secondary/50 rounded">
                {order.fulfillmentStatus || 'Pending'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        {order.customer && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">
                {order.customer.first_name} {order.customer.last_name}
              </p>
              <p className="text-muted-foreground">{order.customer.email}</p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'lovable-project-79ft9.myshopify.com'}/account`, '_blank')}
          >
            View Account <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
