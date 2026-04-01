import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ChevronRight, 
  Minus, 
  Plus, 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Tag,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState(1); // 1: Cart, 2: Info, 3: Review, 4: Success
  const [promoCode, setPromoCode] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    email: 'vaibhav.dhiman1221@gmail.com',
    firstName: 'Vaibhav',
    lastName: 'Dhiman',
    address: '124 Heritage Lane, Civil Lines',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    phone: '+91 98765 43210',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    setStep(4);
    // In a real app, clearCart would happen after the backend confirms order
  };

  const subtotal = totalPrice;
  const shipping = subtotal > 1000 || subtotal === 0 ? 0 : 100;
  const discount = promoCode.toUpperCase() === 'SWAD10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const steps = [
    { num: 1, title: 'Bag' },
    { num: 2, title: 'Details' },
    { num: 3, title: 'Payment' },
  ];

  if (step === 4) {
    return (
      <div className="pt-32 pb-24 bg-stone-50/50 min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 max-w-xl w-full text-center border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-serif text-stone-900 mb-4">A Taste of Heritage is on its Way!</h1>
          <p className="text-stone-500 font-lora italic mb-8 leading-relaxed px-4 md:px-8">
            Thank you for choosing Ghar Ka Swad, {formData.firstName}. We've received your order and are already preparing it with pure desi ghee and tradition.
          </p>
          <div className="p-6 bg-stone-50 border border-stone-100 mb-8 text-left grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Order Number</p>
              <p className="font-mono text-stone-900 font-medium text-sm">#GKS-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
              <p className="text-stone-900 font-medium text-sm">Within 2-3 Days</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              onClick={() => clearCart()}
              className="bg-primary text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 transition-all shadow-lg shadow-primary/20"
            >
              Back to Home
            </Link>
            <Link 
              to="/account?tab=orders"
              className="bg-stone-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg"
            >
              Track Order
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-stone-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif text-stone-900 mb-2 tracking-tight">Checkout</h1>
            <p className="text-sm md:text-base text-stone-500 font-lora italic">Secure your authentic culinary journey.</p>
          </div>
          
          {/* Stepper */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {steps.map((s, i) => {
              const isActive = step >= s.num;
              const isCurrent = step === s.num;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all duration-500",
                      isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-stone-200 text-stone-400"
                    )}>
                      {isActive && !isCurrent ? <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> : s.num}
                    </div>
                    <span className={cn(
                      "text-[9px] md:text-[11px] uppercase tracking-widest font-bold hidden sm:inline",
                      isCurrent ? "text-primary" : (isActive ? "text-stone-900" : "text-stone-400")
                    )}>
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn("w-4 md:w-8 h-px", isActive ? "bg-primary" : "bg-stone-200")}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* STEP 1: CART */}
                {step === 1 && (
                  <div className="space-y-6">
                    {cart.length === 0 ? (
                      <div className="text-center py-24 bg-white border border-stone-100 shadow-sm flex flex-col items-center">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                          <ShoppingBag className="w-8 h-8 text-stone-300" />
                        </div>
                        <h2 className="text-xl font-serif text-stone-900 mb-2">Your Bag is Empty</h2>
                        <p className="text-stone-500 font-lora italic mb-8">Seems like you haven't picked your flavors yet.</p>
                        <Link to="/menu" className="bg-primary text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-900 transition-all">
                          Explore Menu
                        </Link>
                      </div>
                    ) : (
                      <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
                        <div className="p-4 md:p-6 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                           <h2 className="text-sm md:text-base font-bold uppercase tracking-widest text-stone-900">Your Selection ({cart.length})</h2>
                           <button onClick={() => clearCart()} className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-red-600 transition-colors">Clear Bag</button>
                        </div>
                        <div className="divide-y divide-stone-100">
                          {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 md:gap-8 p-4 md:p-8 hover:bg-stone-50/30 transition-colors group">
                              <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-stone-100 overflow-hidden relative shadow-sm">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              </div>
                              <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-serif text-lg md:text-2xl text-stone-900 mb-1 leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                    <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">{item.category}</p>
                                  </div>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-1 text-stone-300 hover:text-red-500 transition-colors"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </div>
                                
                                <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="flex items-center bg-white border border-stone-200 p-0.5 shadow-sm w-fit">
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-primary transition-colors"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center text-sm font-bold text-stone-900">
                                      {item.quantity}
                                    </span>
                                    <button 
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-primary transition-colors"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-0.5 line-through decoration-primary/30">₹{item.price * item.quantity + 50}</p>
                                    <p className="text-xl md:text-2xl font-serif text-stone-900">₹{item.price * item.quantity}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: INFORMATION */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-white p-6 md:p-10 border border-stone-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                      <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-8 border-b border-stone-100 pb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center font-sans font-bold">1</span>
                        Contact Details
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Email Address</label>
                           <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com" 
                            className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all text-stone-900"
                          />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Phone Number</label>
                           <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 00000 00000" 
                            className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all text-stone-900"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 md:p-10 border border-stone-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
                      <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mb-8 border-b border-stone-100 pb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-secondary text-white text-sm flex items-center justify-center font-sans font-bold">2</span>
                        Shipping Address
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">First Name</label>
                          <input 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Last Name</label>
                          <input 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary outline-none transition-all"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Street Address</label>
                          <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">City</label>
                          <input 
                            type="text" 
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary outline-none transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">State</label>
                            <input 
                              type="text" 
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">PIN Code</label>
                            <input 
                              type="text" 
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                              className="w-full px-5 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-primary outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: REVIEW & PAYMENT */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
                      <div className="p-4 md:p-6 bg-stone-50/50 border-b border-stone-100">
                        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-widest">Order Verification</h2>
                      </div>
                      <div className="p-6 md:p-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                          <div className="space-y-4">
                            <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Truck size={14} className="text-primary" /> Ship To
                            </h3>
                            <div className="p-4 bg-stone-50 border-l-2 border-primary">
                              <p className="text-stone-900 font-medium mb-1">{formData.firstName} {formData.lastName}</p>
                              <p className="text-stone-500 text-sm leading-relaxed">
                                {formData.address}<br/>
                                {formData.city}, {formData.state} - {formData.pincode}
                              </p>
                              <p className="text-stone-500 text-sm mt-2">{formData.phone}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                             <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] flex items-center gap-2">
                              <ShieldCheck size={14} className="text-secondary" /> Contact
                            </h3>
                            <div className="p-4 bg-stone-50 border-l-2 border-secondary">
                              <p className="text-stone-900 font-medium mb-1">{formData.email}</p>
                              <p className="text-stone-500 text-sm">Delivery notifications will be sent here.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-stone-100 shadow-sm overflow-hidden">
                      <div className="p-4 md:p-6 bg-stone-50/50 border-b border-stone-100">
                        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-widest">Payment Method</h2>
                      </div>
                      <div className="p-6 md:p-10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            { id: 'card', label: 'Credit Card', icon: CreditCard, color: 'text-blue-600' },
                            { id: 'upi', label: 'UPI / GPay', icon: Smartphone, color: 'text-purple-600' },
                            { id: 'cod', label: 'Cash on Delivery', icon: Truck, color: 'text-green-600' }
                          ].map((method) => {
                            const Icon = method.icon;
                            const isSelected = paymentMethod === method.id;
                            return (
                              <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className={cn(
                                  "flex flex-col items-center justify-center p-6 border-2 transition-all gap-4 group",
                                  isSelected 
                                    ? "border-primary bg-primary/[0.02] shadow-inner" 
                                    : "border-stone-100 hover:border-stone-200 bg-white"
                                )}
                              >
                                <div className={cn(
                                  "w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500",
                                  isSelected ? "bg-primary text-white scale-110" : "bg-stone-50 text-stone-400 group-hover:scale-105"
                                )}>
                                  <Icon size={24} />
                                </div>
                                <span className={cn(
                                  "text-[10px] font-bold uppercase tracking-widest",
                                  isSelected ? "text-primary" : "text-stone-500"
                                )}>
                                  {method.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        
                        {paymentMethod === 'card' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-8 pt-8 border-t border-stone-100 space-y-4"
                          >
                            <div className="grid grid-cols-2 gap-4">
                               <div className="col-span-2 space-y-1">
                                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-widest ml-1">Card Number</label>
                                  <input disabled placeholder="•••• •••• •••• ••••" className="w-full px-4 py-3 bg-stone-50 border-stone-100 text-sm italic" />
                               </div>
                               <div className="space-y-1 text-stone-400 text-[10px] italic pt-2">
                                  Simulation only. No real payment needed.
                               </div>
                            </div>
                          </motion.div>
                        )}
                        
                        <div className="mt-8 p-4 bg-amber-50/50 border border-amber-100 flex items-start gap-4">
                           <Lock className="text-amber-600 shrink-0 mt-0.5" size={16} />
                           <p className="text-[10px] text-amber-700 leading-relaxed font-medium uppercase tracking-wide">
                              Your transaction is encrypted and secured by SwadGuard™ Industry Standard Security Protocols.
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[420px] shrink-0 sticky top-28">
            <div className="bg-stone-900 text-white p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              
              <h2 className="text-xl md:text-2xl font-serif mb-8 border-b border-white/10 pb-4">Order Summary</h2>
              
              {/* Mini Cart Scrollable */}
              <div className="max-h-60 overflow-y-auto pr-2 mb-8 custom-scrollbar space-y-5">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <div className="w-14 h-14 bg-white/5 relative shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-stone-900">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-stone-100 truncate group-hover:text-primary transition-colors">{item.name}</h4>
                      <p className="text-[9px] text-stone-500 uppercase tracking-widest font-bold mt-0.5">{item.category}</p>
                    </div>
                    <p className="text-sm font-serif text-stone-200">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-8 p-1 bg-white/5 border border-white/10 flex items-center">
                <div className="px-3 text-white/40"><Tag size={16} /></div>
                <input 
                  type="text" 
                  placeholder="PROMO CODE" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-[10px] font-bold tracking-widest flex-1 uppercase py-3"
                />
                <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">Apply</button>
              </div>

              <div className="space-y-4 text-xs tracking-wide border-t border-white/10 pt-6">
                <div className="flex justify-between text-stone-400 uppercase tracking-widest text-[10px]">
                  <span>Subtotal</span>
                  <span className="text-stone-200">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary uppercase tracking-widest text-[10px]">
                    <span>Discount (10%)</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400 uppercase tracking-widest text-[10px]">
                  <span>Standard Shipping</span>
                  <span className="text-stone-200">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <span className="text-lg font-serif">Total</span>
                  <div className="text-right">
                    <span className="text-[9px] text-stone-500 mr-2 uppercase tracking-widest">INR</span>
                    <span className="text-3xl font-serif text-primary">₹{total}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 space-y-4">
                {step === 1 && (
                  <button 
                    onClick={() => setStep(2)}
                    disabled={cart.length === 0}
                    className="w-full bg-primary text-white py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-stone-900 transition-all shadow-xl shadow-primary/20 disabled:opacity-30 disabled:cursor-not-allowed group"
                  >
                    <span className="flex items-center justify-center gap-2">
                       Checkout Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                )}

                {step === 2 && (
                  <>
                    <button 
                      onClick={() => setStep(3)}
                      className="w-full bg-primary text-white py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-stone-900 transition-all shadow-xl shadow-primary/20 group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Review & Pay <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    <button 
                      onClick={() => setStep(1)}
                      className="w-full py-3 flex items-center justify-center gap-2 text-stone-500 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest"
                    >
                      <ArrowLeft size={12} /> Back to Bag
                    </button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <button 
                      onClick={handlePlaceOrder}
                      className="w-full bg-primary text-white py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-stone-900 transition-all shadow-xl shadow-primary/20 group"
                    >
                      Complete Purchase
                    </button>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full py-3 flex items-center justify-center gap-2 text-stone-500 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest"
                    >
                      <ArrowLeft size={12} /> Edit Details
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                 <Lock size={14} />
                 <ShieldCheck size={14} />
                 <CreditCard size={14} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
