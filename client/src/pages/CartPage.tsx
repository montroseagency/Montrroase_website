// client/src/pages/CartPage.tsx - Web Development Agency Version
import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, CreditCard, Shield } from 'lucide-react';
import { Button, Card } from '../components/ui';

interface CartItem {
  id: string;
  serviceId: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
  features: string[];
  deliveryTime: string;
}

// Sample development packages
const developmentPackages = [
  {
    id: '1',
    serviceId: 'website-starter',
    name: 'Starter Website',
    price: 2500,
    category: 'Website Development',
    features: ['5 pages', 'Responsive design', 'Basic SEO', 'Contact form'],
    deliveryTime: '2-3 weeks'
  },
  {
    id: '2',
    serviceId: 'webapp-pro',
    name: 'Professional Web App',
    price: 5000,
    category: 'Web Application',
    features: ['Custom functionality', 'Database integration', 'Admin panel', 'API development'],
    deliveryTime: '4-6 weeks'
  },
  {
    id: '3',
    serviceId: 'ecommerce-full',
    name: 'E-commerce Platform',
    price: 7500,
    category: 'E-commerce',
    features: ['Product catalog', 'Payment processing', 'Order management', 'Customer accounts'],
    deliveryTime: '6-8 weeks'
  }
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    updateCart(updatedItems);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Here you would integrate with your payment processor
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to checkout or payment page
      window.location.href = '/auth?redirect=/checkout';
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (packageItem: typeof developmentPackages[0]) => {
    const newItem: CartItem = {
      id: `${packageItem.id}-${Date.now()}`,
      serviceId: packageItem.serviceId,
      name: packageItem.name,
      quantity: 1,
      price: packageItem.price,
      category: packageItem.category,
      features: packageItem.features,
      deliveryTime: packageItem.deliveryTime
    };

    const existingItem = cartItems.find(item => item.serviceId === packageItem.serviceId);
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      updateCart([...cartItems, newItem]);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'website development':
        return '🌐';
      case 'web application':
        return '💻';
      case 'e-commerce':
        return '🛒';
      case 'mobile app':
        return '📱';
      default:
        return '⚡';
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Cart is Empty</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
            Browse our development services and add some projects to get started!
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Popular Development Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {developmentPackages.map((pkg) => (
                <div key={pkg.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">{getCategoryIcon(pkg.category)}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{pkg.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">{pkg.category}</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-3 sm:mb-4">${pkg.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mb-3">Delivery: {pkg.deliveryTime}</p>
                  <Button 
                    onClick={() => addToCart(pkg)}
                    className="w-full text-sm sm:text-base"
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={() => window.location.href = '/services/web-development'} 
            size="lg"
            className="text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
          >
            Browse All Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Project Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium text-sm sm:text-base"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Service Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl sm:text-3xl flex-shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>
                  
                  {/* Item Info */}
                  <div className="flex-1 w-full sm:w-auto">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{item.category}</p>
                    <p className="text-xs sm:text-sm text-blue-600 mb-2">Delivery: {item.deliveryTime}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{item.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Controls - Mobile Layout */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 justify-between sm:justify-start w-full sm:w-auto">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      
                      {/* Remove Button - Mobile */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors sm:hidden"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Price */}
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">${item.price.toLocaleString()} each</p>
                    </div>
                    
                    {/* Remove Button - Desktop */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors hidden sm:block"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Project Summary</h2>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${calculateTax().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-$0.00</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <Button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Start Project
                      </>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2 text-sm sm:text-base">✅ What's Included:</h3>
                  <ul className="text-xs sm:text-sm text-green-800 space-y-1">
                    <li>• Professional development team</li>
                    <li>• Project management & updates</li>
                    <li>• Quality assurance testing</li>
                    <li>• 3 months free support</li>
                    <li>• Source code & documentation</li>
                  </ul>
                </div>
              </Card>

              {/* Promo Code */}
              <Card className="p-4 sm:p-6">
                <h3 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Promo Code</h3>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                  />
                  <Button variant="outline" size="sm" className="text-sm">
                    Apply
                  </Button>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  New clients get 15% off their first project!
                </p>
              </Card>

              {/* Trust Indicators */}
              <div className="text-center">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-lg sm:text-2xl mb-1">🔒</div>
                    <div className="font-medium">Secure</div>
                    <div className="text-gray-500">SSL Encrypted</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl mb-1">⚡</div>
                    <div className="font-medium">Fast</div>
                    <div className="text-gray-500">Quick Delivery</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl mb-1">✅</div>
                    <div className="font-medium">Guaranteed</div>
                    <div className="text-gray-500">Quality Assured</div>
                  </div>
                </div>
              </div>

              {/* Development Process */}
              <Card className="p-4 sm:p-6">
                <h3 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Development Process</h3>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                    <span>Project planning & requirements</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                    <span>Design & prototyping</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                    <span>Development & testing</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">4</span>
                    <span>Launch & support</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={() => window.location.href = '/services'}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
          >
            ← Browse More Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;