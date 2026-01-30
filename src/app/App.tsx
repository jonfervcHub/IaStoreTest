import { useState } from "react";
import { ProductCard, Product } from "../app/components/ProductCard";
import {
  ShoppingCartSidebar,
  CartItem,
} from "../app/components/ShoppingCartSidebar";
import {
  ShoppingCart,
  Zap,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

const products: Product[] = [
  {
    id: "1",
    name: "SmartWatch Quantum X",
    description:
      "Reloj inteligente de última generación con sensores biométricos avanzados y pantalla AMOLED 2K.",
    price: 599.99,
    image:
      "https://images.unsplash.com/photo-1694077743594-7b82dacafaf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc21hcnR3YXRjaCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY5NzMxMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 15,
  },
  {
    id: "2",
    name: "AirPods Pro Neural",
    description:
      "Auriculares inalámbricos con cancelación de ruido adaptativa y audio espacial 3D inmersivo.",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1695634463848-4db4e47703a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBtb2Rlcm58ZW58MXx8fHwxNzY5NjUyNTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 24,
  },
  {
    id: "3",
    name: "VR Headset Infinity",
    description:
      "Visor de realidad virtual con seguimiento ocular, resolución 4K por ojo y campo de visión de 210°.",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGhlYWRzZXR8ZW58MXx8fHwxNzY5NzMxMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 8,
  },
  {
    id: "4",
    name: "Gaming Keyboard RGB Elite",
    description:
      "Teclado mecánico con switches ópticos, iluminación RGB personalizable y panel táctil OLED.",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1645802106095-765b7e86f5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZCUyMHJnYnxlbnwxfHx8fDE3Njk3MzExMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 32,
  },
  {
    id: "5",
    name: "Drone Vision Pro",
    description:
      "Dron profesional con cámara 8K, estabilización gimbal de 3 ejes y 45 minutos de autonomía.",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1752937417731-6936a72270e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3klMjBtb2Rlcm58ZW58MXx8fHwxNzY5NzMxMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 5,
  },
  {
    id: "6",
    name: "Smart Speaker Nexus",
    description:
      "Altavoz inteligente con asistente de IA avanzado, sonido 360° y control domótico integrado.",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1752955471067-294a5de5bf48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHNwZWFrZXIlMjBkZXZpY2V8ZW58MXx8fHwxNzY5NzMxMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    stock: 18,
  },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (productId: string, quantity: number) => {
    console.log(
      "handleAddToCart llamado - ProductId:",
      productId,
      "Quantity:",
      quantity,
    );
    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.log("Producto no encontrado");
      return;
    }

    console.log("Producto encontrado:", product.name);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        console.log("Item existente, actualizando cantidad");
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      console.log("Nuevo item, agregando al carrito");
      const newItems = [
        ...prevItems,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image,
        },
      ];
      console.log("CartItems actualizados:", newItems);
      return newItems;
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId),
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Efectos de fondo futuristas */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Grid pattern de fondo */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-900/80 border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    TechStore Quantum
                  </h1>
                  <p className="text-xs text-slate-500">
                    La tecnología del futuro, hoy
                  </p>
                </div>
              </div>

              {/* Botón del carrito */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-3 bg-slate-800/50 hover:bg-slate-800 px-4 py-2.5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <ShoppingCart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">Carrito</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-3">
              Productos{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Destacados
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Explora nuestra colección de dispositivos tecnológicos de última
              generación
            </p>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-24 border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Redes Sociales */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>

            <p className="text-center text-slate-500 text-sm">
              © 2026 TechStore Quantum. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>

      {/* Sidebar del carrito */}
      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}
