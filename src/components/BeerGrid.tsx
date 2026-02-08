import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const BeerGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success(`${product.node.title} added to cart!`, {
      position: "top-center",
    });
  };

  const filteredProducts = products.filter(product => 
    product.node.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <section id="beers" className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="beers" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            OUR <span className="text-primary">LINEUP</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Locally brewed. Culturally inspired. Proudly South African.
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            All beers sold exclusively in 6-packs
          </p>
        </div>

        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search beers by name..."
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No beers found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              const variant = product.node.variants.edges[0]?.node;
              const image = product.node.images.edges[0]?.node;
              
              return (
                <Card
                  key={product.node.id}
                  className="bg-card border-border overflow-hidden hover-lift group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden bg-black">
                    {image && (
                      <img
                        src={image.url}
                        alt={image.altText || product.node.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded mb-3">
                        6-Pack
                      </span>
                      <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                        {product.node.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-4 min-h-[60px]">
                      {product.node.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
                      <span className="text-sm font-semibold text-muted-foreground">Price</span>
                      <span className="text-2xl font-black text-primary">
                        {variant?.price.currencyCode} {parseFloat(variant?.price.amount || '0').toFixed(2)}
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                      disabled={!variant?.availableForSale}
                    >
                      {variant?.availableForSale ? 'ADD TO CART' : 'OUT OF STOCK'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
