import { X, ShoppingBag, Trash2 } from 'lucide-react';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function ShoppingCartSidebar({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem,
  onUpdateQuantity 
}: ShoppingCartSidebarProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-cyan-500/20 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Carrito de Compras</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Contenido */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
                <p className="text-slate-400 text-lg">Tu carrito está vacío</p>
                <p className="text-slate-500 text-sm mt-2">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.productId}
                    className="flex gap-4 bg-slate-800/50 rounded-lg p-4 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{item.name}</h3>
                      <p className="text-cyan-400 font-semibold mt-1">${item.price}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded text-white text-sm transition-colors"
                        >
                          −
                        </button>
                        <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded text-white text-sm transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.productId)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors self-start"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-cyan-500/20 bg-slate-900/80 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                Proceder al Pago
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
