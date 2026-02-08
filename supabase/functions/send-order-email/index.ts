import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderItem {
  title: string;
  quantity: number;
  price: string;
  variant_title: string | null;
}

interface EmailRequest {
  type: 'confirmation' | 'shipping';
  order: {
    orderNumber: number;
    createdAt: string;
    totalPrice: string;
    currency: string;
    items: OrderItem[];
    customer?: {
      email: string;
      first_name: string;
      last_name: string;
    };
    shippingAddress?: {
      first_name: string;
      last_name: string;
      address1: string;
      city: string;
      province: string;
      zip: string;
      country: string;
    };
    trackingNumber?: string;
    trackingUrl?: string;
    estimatedDelivery?: string;
  };
}

function generateConfirmationEmail(order: EmailRequest['order']): string {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">
        <strong>${item.title}</strong>
        ${item.variant_title ? `<br><span style="color: #666; font-size: 14px;">${item.variant_title}</span>` : ''}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${order.currency} ${parseFloat(item.price).toFixed(2)}</td>
    </tr>
  `).join('');

  const estimatedDate = order.estimatedDelivery 
    ? new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'To be determined';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Order Confirmed!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Thank you for your order</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #333; font-size: 20px;">Order #${order.orderNumber}</h2>
            <p style="color: #666; margin: 0; font-size: 14px;">Placed on ${new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #667eea;">
                  <th style="padding: 12px; text-align: left; color: #667eea;">Item</th>
                  <th style="padding: 12px; text-align: center; color: #667eea;">Qty</th>
                  <th style="padding: 12px; text-align: right; color: #667eea;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 20px 12px 12px; text-align: right; font-weight: bold; font-size: 18px;">Total:</td>
                  <td style="padding: 20px 12px 12px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">${order.currency} ${parseFloat(order.totalPrice).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${order.shippingAddress ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Shipping Address</h3>
            <p style="margin: 0; line-height: 1.8;">
              ${order.shippingAddress.first_name} ${order.shippingAddress.last_name}<br>
              ${order.shippingAddress.address1}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.province} ${order.shippingAddress.zip}<br>
              ${order.shippingAddress.country}
            </p>
          </div>
          ` : ''}

          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Delivery Information</h3>
            <p style="margin: 0; color: #666;">
              <strong>Estimated Delivery:</strong><br>
              ${estimatedDate}
            </p>
            <p style="margin: 15px 0 0 0; font-size: 14px; color: #999;">
              You'll receive a shipping confirmation email with tracking information once your order ships.
            </p>
          </div>

          <div style="text-align: center; padding: 20px 0;">
            <p style="color: #666; margin: 0 0 10px 0;">Need help with your order?</p>
            <p style="color: #999; font-size: 14px; margin: 0;">Contact us or visit your account for order details</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateShippingEmail(order: EmailRequest['order']): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Order Has Shipped</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">📦 Your Order Has Shipped!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your package is on its way</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #333; font-size: 20px;">Order #${order.orderNumber}</h2>
            <p style="color: #666; margin: 0; font-size: 14px;">Good news! Your order has been shipped and is on its way to you.</p>
          </div>

          ${order.trackingNumber ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #667eea;">
            <h3 style="margin: 0 0 15px 0; color: #667eea; font-size: 18px;">Tracking Information</h3>
            <p style="margin: 0 0 10px 0;">
              <strong>Tracking Number:</strong><br>
              <span style="font-family: monospace; font-size: 16px; color: #667eea;">${order.trackingNumber}</span>
            </p>
            ${order.trackingUrl ? `
            <a href="${order.trackingUrl}" style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">
              Track Your Package
            </a>
            ` : ''}
          </div>
          ` : ''}

          ${order.shippingAddress ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Shipping To</h3>
            <p style="margin: 0; line-height: 1.8;">
              ${order.shippingAddress.first_name} ${order.shippingAddress.last_name}<br>
              ${order.shippingAddress.address1}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.province} ${order.shippingAddress.zip}<br>
              ${order.shippingAddress.country}
            </p>
          </div>
          ` : ''}

          <div style="text-align: center; padding: 20px 0;">
            <p style="color: #666; margin: 0 0 10px 0;">Questions about your delivery?</p>
            <p style="color: #999; font-size: 14px; margin: 0;">Contact us for assistance</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const authHeader = req.headers.get('Authorization');
  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: authHeader || '' } }
  });

  try {
    const { type, order }: EmailRequest = await req.json();

    if (!order.customer?.email) {
      return new Response(
        JSON.stringify({ error: 'Customer email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Sending ${type} email for order ${order.orderNumber} to ${order.customer.email}`);

    const emailHtml = type === 'confirmation' 
      ? generateConfirmationEmail(order)
      : generateShippingEmail(order);

    const subject = type === 'confirmation'
      ? `Order Confirmation #${order.orderNumber}`
      : `Your Order #${order.orderNumber} Has Shipped!`;

    const { data, error } = await resend.emails.send({
      from: 'Orders <onboarding@resend.dev>',
      to: [order.customer.email],
      subject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Email sent successfully:', data);

    // Log email to database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('email_history').insert({
        order_id: order.orderNumber.toString(),
        recipient_email: order.customer.email,
        email_type: type === 'confirmation' ? 'order_confirmation' : 'shipping_update',
        subject: subject,
        status: 'sent',
        sent_by: user?.id || null
      });
    } catch (logError) {
      console.error('Error logging email to database:', logError);
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data?.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-order-email function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    // Log failed email to database
    try {
      const requestBody = await req.clone().json();
      const { type, order } = requestBody;
      const { data: { user } } = await supabase.auth.getUser();
      
      if (order?.orderNumber && order?.customer?.email) {
        await supabase.from('email_history').insert({
          order_id: order.orderNumber.toString(),
          recipient_email: order.customer.email,
          email_type: type === 'confirmation' ? 'order_confirmation' : 'shipping_update',
          subject: type === 'confirmation' ? `Order Confirmation #${order.orderNumber}` : `Your Order #${order.orderNumber} Has Shipped!`,
          status: 'failed',
          error_message: errorMessage,
          sent_by: user?.id || null
        });
      }
    } catch (logError) {
      console.error('Error logging failed email:', logError);
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
