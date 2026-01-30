import { useState } from "react";
import { ShoppingCart, Package, Plus, Minus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleIncrement = () => {
    console.log("Incrementando cantidad:", quantity, "Stock:", product.stock);
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
      console.log("Nueva cantidad:", quantity + 1);
    }
  };

  const handleDecrement = () => {
    console.log("Decrementando cantidad:", quantity);
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log("Nueva cantidad:", quantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(
      "Agregando al carrito - Producto:",
      product.id,
      "Cantidad:",
      quantity,
    );
    setIsAdding(true);
    onAddToCart(product.id, quantity);

    // Feedback visual y resetear
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 300);
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:scale-[1.02]">
      {/* Efecto de brillo futurista */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Feedback visual al agregar */}
      {isAdding && (
        <div className="absolute inset-0 bg-cyan-400/20 animate-pulse pointer-events-none z-10" />
      )}

      {/* Imagen del producto */}
      <div className="relative h-64 overflow-hidden bg-slate-950/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge de stock */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/30">
          <Package className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium text-cyan-100">
            {product.stock} disponibles
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Precio */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ${product.price}
          </span>
          <span className="text-slate-500 text-sm">USD</span>
        </div>

        {/* Controles de cantidad y botón de agregar */}
        <div className="flex items-center gap-3 pt-2">
          {/* Selector de cantidad */}
          <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg border border-cyan-500/20 p-1">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4 text-cyan-400" />
            </button>

            <span className="w-10 text-center font-medium text-white">
              {quantity}
            </span>

            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Botón de agregar al carrito */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
