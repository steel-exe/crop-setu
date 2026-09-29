import { useState, useMemo, useRef } from 'react';
import {
  Sprout,
  ShoppingBag,
  CheckCircle2,
  MapPin,
  Tag,
  ShieldCheck,
  User,
  Lock,
  PlusCircle,
  Search,
  X,
  Edit3,
  Trash2,
  Phone,
  RefreshCw,
  Info,
  Calendar,
  QrCode,
  Globe,
  LogOut,
  LogIn,
  UserPlus,
  ChevronRight,
  AlertCircle,
  Sparkles,
  DollarSign,
  PackageCheck
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    appName: "Crop Setu",
    tagline: "Direct Farm-to-Consumer Network",
    marketplace: "Marketplace",
    farmerDashboard: "Farmer Hub",
    myOrders: "My Orders & Tracking",
    preBooking: "Pre-Booking",
    myProfile: "Profile & KYC",
    login: "Log In",
    signup: "Sign Up",
    logout: "Log Out",
    searchPlaceholder: "Search produce, farmer, or village...",
    allCategories: "All Categories",
    grains: "Grains",
    vegetables: "Vegetables",
    fruits: "Fruits",
    pulses: "Pulses",
    spices: "Spices",
    farmerReceives: "Farmer Earns",
    consumerPays: "Consumer Pays",
    retailPrice: "Traditional Market",
    youSave: "You Save",
    addToCart: "Add to Cart",
    viewPriceBreakdown: "Transparent Pricing",
    restock: "Restock Crop",
    editItem: "Edit Listing",
    deleteItem: "Delete Item",
    verifiedFarmer: "Verified Farmer",
    harvestDate: "Harvest Date",
    outOfStock: "Out of Stock",
    cartTitle: "Your Fresh Cart",
    checkout: "Proceed to Checkout",
    orderPlaced: "Order Placed",
    accepted: "Farmer Accepted",
    prepared: "Product Prepared",
    pickedUp: "Picked Up",
    outForDelivery: "Out for Delivery",
    delivered: "Delivered",
    dealPrivacyNotice: "Strict Deal Isolation: Orders are visible ONLY to the buyer and seller in the transaction."
  },
  hi: {
    appName: "क्रॉप सेतु",
    tagline: "सीधा किसान से उपभोक्ता तक",
    marketplace: "मंडी (मार्केटप्लेस)",
    farmerDashboard: "किसान हब",
    myOrders: "मेरे ऑर्डर एवं ट्रैकिंग",
    preBooking: "अग्रिम बुकिंग",
    myProfile: "प्रोफ़ाइल एवं KYC",
    login: "लॉग इन",
    signup: "साइन अप",
    logout: "लॉग आउट",
    searchPlaceholder: "फसल, किसान या गाँव खोजें...",
    allCategories: "सभी श्रेणियां",
    grains: "अनाज",
    vegetables: "सब्जियां",
    fruits: "फल",
    pulses: "दालें",
    spices: "मसाले",
    farmerReceives: "किसान को मिले",
    consumerPays: "आप देंगे",
    retailPrice: "पारंपरिक बाज़ार भाव",
    youSave: "आपकी बचत",
    addToCart: "कार्ट में जोड़ें",
    viewPriceBreakdown: "पारदर्शी मूल्य विभाजन",
    restock: "स्टॉक पुनः भरें",
    editItem: "संशोधित करें",
    deleteItem: "हटाएं",
    verifiedFarmer: "प्रमाणित किसान",
    harvestDate: "कटाई की तिथि",
    outOfStock: "स्टॉक समाप्त",
    cartTitle: "आपकी कार्ट",
    checkout: "ऑर्डर पूरा करें",
    orderPlaced: "ऑर्डर दिया गया",
    accepted: "किसान ने स्वीकार किया",
    prepared: "उत्पाद तैयार",
    pickedUp: "पिकअप हुआ",
    outForDelivery: "डिलिवरी के लिए रवाना",
    delivered: "सफलतापूर्वक पहुँचाया",
    dealPrivacyNotice: "गुप्त सौदा सुरक्षा: यह ऑर्डर केवल खरीदार और विक्रेता किसान ही देख सकते हैं।"
  },
  mr: {
    appName: "क्रॉप सेतू",
    tagline: "थेट शेतातून ग्राहकांच्या घरापर्यंत",
    marketplace: "शेतमाल बाजार",
    farmerDashboard: "शेतकरी हब",
    myOrders: "माझे ऑर्डर व ट्रॅकिंग",
    preBooking: "पूर्व-नोंदणी",
    myProfile: "प्रोफाइल व KYC",
    login: "लॉग इन",
    signup: "साइन अप",
    logout: "लॉग आउट",
    searchPlaceholder: "पीक, शेतकरी किंवा गाव शोधा...",
    allCategories: "सर्व प्रकार",
    grains: "धान्य",
    vegetables: "भाज्या",
    fruits: "फळे",
    pulses: "कधान्ये",
    spices: "मसाले",
    farmerReceives: "शेटकऱ्याला मिळे",
    consumerPays: "ग्राहक देणार",
    retailPrice: "पारंपारिक बाजारभाव",
    youSave: "तुमची बचत",
    addToCart: "कार्टमध्ये जोडा",
    viewPriceBreakdown: "पारदर्शक किंमत विवरण",
    restock: "स्टॉक पुन्हा भरा",
    editItem: "सुधारित करा",
    deleteItem: "हटवा",
    verifiedFarmer: "प्रमाणित शेतकरी",
    harvestDate: "काढणीची तारीख",
    outOfStock: "स्टॉक संपला",
    cartTitle: "तुमची कार्ट",
    checkout: "ऑर्डर पूर्ण करा",
    orderPlaced: "ऑर्डर नोंदवली",
    accepted: "शेटकऱ्याने स्वीकारले",
    prepared: "माल तयार",
    pickedUp: "पिकअप झाले",
    outForDelivery: "वितरणासाठी रवाना",
    delivered: "पोहोचवले",
    dealPrivacyNotice: "गोपनीय व्यवहार: हा व्यवहार फक्त खरेदीदार आणि विक्री करणाऱ्या शेटकऱ्यालाच दिसू शकतो."
  }
};

const SEED_USERS = [
  {
    id: 'farmer_ramesh',
    name: 'Ramesh Patil',
    role: 'farmer',
    village: 'Ahmednagar, Maharashtra',
    pincode: '414001',
    phone: '+91 98220 11223',
    upiId: 'ramesh.patil@upi',
    kycVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    farmStory: 'Growing organic red onions and tomatoes using rainwater harvesting for 15 years.'
  },
  {
    id: 'farmer_sunita',
    name: 'Sunita Deshmukh',
    role: 'farmer',
    village: 'Nashik, Maharashtra',
    pincode: '422003',
    phone: '+91 94231 88776',
    upiId: 'sunita.farm@upi',
    kycVerified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    farmStory: 'Specializing in GI-tagged Nashik grapes and high-quality wheat crops.'
  },
  {
    id: 'consumer_rahul',
    name: 'Rahul Sharma',
    role: 'consumer',
    village: 'Chhatrapati Sambhajinagar',
    pincode: '431001',
    phone: '+91 99700 44332',
    upiId: 'rahul.s@upi',
    kycVerified: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    deliveryAddress: 'Flat 402, Green Acres Society, Samarth Nagar'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'crop_onion_01',
    farmerId: 'farmer_ramesh',
    farmerName: 'Ramesh Patil',
    farmerVillage: 'Ahmednagar',
    distanceKm: 8,
    name: 'Nashik Grade-A Red Onions',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    pricePerKg: 19,
    farmerReceives: 16,
    deliveryFee: 2,
    platformFee: 1,
    retailPrice: 23,
    quantity: 450, // in kg
    unit: 'kg',
    moq: 2,
    harvestDate: '2026-09-20',
    grade: 'A',
    description: 'Freshly harvested crisp red onions with low moisture and high storage life.'
  },
  {
    id: 'crop_wheat_02',
    farmerId: 'farmer_sunita',
    farmerName: 'Sunita Deshmukh',
    farmerVillage: 'Nashik',
    distanceKm: 14,
    name: 'Sharbati Whole Wheat (Sharad)',
    category: 'Grains',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    pricePerKg: 34,
    farmerReceives: 29,
    deliveryFee: 3,
    platformFee: 2,
    retailPrice: 42,
    quantity: 1200,
    unit: 'kg',
    moq: 5,
    harvestDate: '2026-09-15',
    grade: 'A+',
    description: '100% naturally dried golden grain Sharbati wheat, hand-sorted.'
  },
  {
    id: 'crop_tomato_03',
    farmerId: 'farmer_ramesh',
    farmerName: 'Ramesh Patil',
    farmerVillage: 'Ahmednagar',
    distanceKm: 8,
    name: 'Juicy Farm Fresh Tomatoes',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    pricePerKg: 22,
    farmerReceives: 18,
    deliveryFee: 2,
    platformFee: 2,
    retailPrice: 30,
    quantity: 80,
    unit: 'kg',
    moq: 1,
    harvestDate: '2026-09-27',
    grade: 'A',
    description: 'Vine-ripened organic tomatoes grown without chemical sprays.'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-2026-7701',
    productId: 'crop_onion_01',
    productName: 'Nashik Grade-A Red Onions',
    productImage: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    farmerId: 'farmer_ramesh',
    farmerName: 'Ramesh Patil',
    buyerId: 'consumer_rahul',
    buyerName: 'Rahul Sharma',
    quantity: 10, // kg
    pricePerKg: 19,
    totalAmount: 190,
    deliveryFee: 15,
    statusStep: 3, // 1: Placed, 2: Accepted, 3: Prepared, 4: Picked Up, 5: Out for Delivery, 6: Delivered
    deliveryAddress: 'Flat 402, Samarth Nagar, Chhatrapati Sambhajinagar',
    pincode: '431001',
    phone: '+91 99700 44332',
    paymentMethod: 'UPI Direct',
    placedAt: '2026-09-28 14:30'
  }
];

export default function App() {
  // Session & Authentication State
  const [lang, setLang] = useState('en');
  // Initialize with no user and forced logout state
  const [currentUser, setCurrentUser] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTab, setAuthTab] = useState('signup'); // Default to 'signup'

  // Auth Form Input
  const [authForm, setAuthForm] = useState({
    name: '',
    phone: '',
    role: 'consumer',
    village: '',
    pincode: '',
    upiId: '',
    kycVerified: false,
    avatar: '',
    bio: ''
  });

  // App Collections
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [cart, setCart] = useState([]);

  // Active Navigation View
  const [activeTab, setActiveTab] = useState('marketplace');

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistanceFilter, setSelectedDistanceFilter] = useState('All');

  // Modals & UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [transparentProduct, setTransparentProduct] = useState(null); 
  const [productToDelete, setProductToDelete] = useState(null); 
  const [productToRestock, setProductToRestock] = useState(null); 
  const [isAddListingOpen, setIsAddListingOpen] = useState(false); 
  const [toast, setToast] = useState(null);

  // Preferred quantity selector per product on marketplace cards
  const [preferredQuantities, setPreferredQuantities] = useState({});

  // Checkout Form State
  const [shippingForm, setShippingForm] = useState({
    address: '',
    pincode: '',
    phone: '',
    paymentMethod: 'UPI'
  });

  // New Produce Form State
  const [newCropForm, setNewCropForm] = useState({
    name: '',
    category: 'Vegetables',
    pricePerKg: '',
    quantity: '',
    moq: '1',
    harvestDate: new Date().toISOString().split('T')[0],
    grade: 'A',
    description: '',
    image: ''
  });

  // Restock Form State
  const [restockForm, setRestockForm] = useState({
    addQty: '',
    harvestDate: new Date().toISOString().split('T')[0],
    isSameHarvestDate: true
  });

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({});
  const profileFileInputRef = useRef(null);
  const signupFileInputRef = useRef(null);

  const fileInputRef = useRef(null);
  const t = TRANSLATIONS[lang];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const calculateDeliveryCharge = (distanceKm) => {
    if (distanceKm <= 5) return 15;
    if (distanceKm <= 20) return 30;
    return 60;
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCropForm(prev => ({ ...prev, image: reader.result }));
        showToast('Seller photo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignupImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return showToast('Image size exceeds 5MB limit.');
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuthForm(prev => ({ ...prev, avatar: reader.result }));
        showToast('Profile photo attached!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return showToast('Image size exceeds 5MB limit.');
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfileForm(prev => ({ ...prev, avatar: reader.result }));
        showToast('Profile photo updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setCurrentUser({ ...currentUser, ...editProfileForm });
    setIsEditingProfile(false);
    showToast('Profile updated successfully!');
  };

  const startEditingProfile = () => {
    setEditProfileForm(currentUser);
    setIsEditingProfile(true);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authTab === 'login') {
      const found = SEED_USERS.find(u => u.phone === authForm.phone || u.name.toLowerCase().includes(authForm.name.toLowerCase()));
      if (found) {
        setCurrentUser(found);
        
        // Setup initial shipping form info based on user
        setShippingForm({
          address: found.deliveryAddress || '',
          pincode: found.pincode || '',
          phone: found.phone || '',
          paymentMethod: 'UPI'
        });

        setIsLoggedIn(true);
        showToast(`Welcome back, ${found.name}! Logged in as ${found.role.toUpperCase()}.`);
      } else {
        showToast('User not found. Please check your details or Sign Up.');
      }
    } else {
      if (!authForm.name || !authForm.phone) {
        showToast('Please provide your name and mobile number.');
        return;
      }
      const newUser = {
        id: `usr_${Date.now()}`,
        name: authForm.name,
        role: authForm.role,
        village: authForm.village || 'Local Area',
        pincode: authForm.pincode || '400001',
        phone: authForm.phone,
        upiId: authForm.upiId || `${authForm.name.toLowerCase().replace(/\s+/g, '')}@upi`,
        kycVerified: authForm.kycVerified,
        avatar: authForm.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        farmStory: authForm.role === 'farmer' ? authForm.bio : '',
        deliveryAddress: authForm.role === 'consumer' ? authForm.bio : ''
      };
      SEED_USERS.push(newUser);
      setCurrentUser(newUser);

      setShippingForm({
        address: '',
        pincode: newUser.pincode,
        phone: newUser.phone,
        paymentMethod: 'UPI'
      });

      setIsLoggedIn(true);
      showToast(`Account created! Welcome to Crop Setu, ${newUser.name}.`);
    }
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCart([]); // clear cart on logout
    showToast('You have successfully logged out.');
  };

  const handleAddToCart = (product, qty) => {
    if (qty > product.quantity) {
      showToast(`Only ${product.quantity} kg available in stock.`);
      return;
    }

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.cartQty + qty, product.quantity);
        return prevCart.map(item => item.id === product.id ? { ...item, cartQty: newQty } : item);
      } else {
        return [...prevCart, { ...product, cartQty: qty }];
      }
    });

    showToast(`Added ${qty} kg of ${product.name} to Cart!`);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newCropForm.name || !newCropForm.pricePerKg || !newCropForm.quantity) {
      showToast('Please fill in required fields.');
      return;
    }

    const price = Number(newCropForm.pricePerKg);
    const farmerShare = Math.round(price * 0.82);
    
    const newProd = {
      id: `crop_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerVillage: currentUser.village || 'Local Village',
      distanceKm: Math.floor(Math.random() * 15) + 3,
      name: newCropForm.name,
      category: newCropForm.category,
      image: newCropForm.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      pricePerKg: price,
      farmerReceives: farmerShare,
      deliveryFee: 2,
      platformFee: 1,
      retailPrice: Math.round(price * 1.25),
      quantity: Number(newCropForm.quantity),
      unit: 'kg',
      moq: Number(newCropForm.moq || 1),
      harvestDate: newCropForm.harvestDate,
      grade: newCropForm.grade,
      description: newCropForm.description || 'Fresh farm produce harvested directly for buyers.'
    };

    setProducts([newProd, ...products]);
    setIsAddListingOpen(false);
    showToast(`Listing "${newProd.name}" created!`);
    
    setNewCropForm({
      name: '',
      category: 'Vegetables',
      pricePerKg: '',
      quantity: '',
      moq: '1',
      harvestDate: new Date().toISOString().split('T')[0],
      grade: 'A',
      description: '',
      image: ''
    });
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!productToRestock || !restockForm.addQty) return;

    const addedQty = Number(restockForm.addQty);
    
    setProducts(prev => prev.map(p => {
      if (p.id === productToRestock.id) {
        return {
          ...p,
          quantity: p.quantity + addedQty,
          harvestDate: restockForm.isSameHarvestDate ? p.harvestDate : restockForm.harvestDate
        };
      }
      return p;
    }));

    showToast(`Restocked ${addedQty} kg for ${productToRestock.name}! Updated stock: ${productToRestock.quantity + addedQty} kg`);
    setProductToRestock(null);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    if (productToDelete.farmerId !== currentUser.id) {
      showToast('Unauthorized: You can only delete your own listings.');
      setProductToDelete(null);
      return;
    }

    setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    showToast(`Deleted listing "${productToDelete.name}".`);
    setProductToDelete(null);
  };

  const handleCheckoutSubmit = () => {
    if (cart.length === 0) return;

    const newOrders = cart.map(item => {
      const dist = item.distanceKm || 10;
      const deliveryFee = calculateDeliveryCharge(dist);

      return {
        id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        productId: item.id,
        productName: item.name,
        productImage: item.image,
        farmerId: item.farmerId,
        farmerName: item.farmerName,
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        quantity: item.cartQty,
        pricePerKg: item.pricePerKg,
        totalAmount: item.cartQty * item.pricePerKg,
        deliveryFee,
        statusStep: 1, 
        deliveryAddress: shippingForm.address || currentUser.deliveryAddress || 'Default Address',
        pincode: shippingForm.pincode || currentUser.pincode,
        phone: shippingForm.phone || currentUser.phone,
        paymentMethod: shippingForm.paymentMethod,
        placedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
    });

    setProducts(prevProducts => prevProducts.map(p => {
      const cartMatch = cart.find(c => c.id === p.id);
      if (cartMatch) {
        return { ...p, quantity: Math.max(0, p.quantity - cartMatch.cartQty) };
      }
      return p;
    }));

    setOrders([...newOrders, ...orders]);
    setCart([]);
    setIsCartOpen(false);
    showToast(`Order placed successfully! Deal locked privately between buyer and farmer.`);
    setActiveTab('orders');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.farmerVillage.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesDist = selectedDistanceFilter === 'All' ||
                          (selectedDistanceFilter === 'Local' && p.distanceKm <= 5) ||
                          (selectedDistanceFilter === 'Intercity' && p.distanceKm > 5 && p.distanceKm <= 20);
      return matchesSearch && matchesCat && matchesDist;
    });
  }, [products, searchQuery, selectedCategory, selectedDistanceFilter]);

  const myVisibleOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(o => o.buyerId === currentUser.id || o.farmerId === currentUser.id);
  }, [orders, currentUser]);

  // ==========================================
  // FULL PAGE AUTHENTICATION SCREEN
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        
        {/* Toast logic needed here as well since main app is unmounted */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 max-w-md animate-bounce">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs font-semibold">{toast}</p>
          </div>
        )}

        {/* Decorative Background Circles */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-800 rounded-full blur-3xl opacity-30"></div>

        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          
          {/* Logo & Intro */}
          <div className="mb-8 text-center">
            <div className="bg-emerald-500 p-4 rounded-3xl text-white shadow-xl inline-block mb-4 border-2 border-emerald-400">
              <Sprout className="w-10 h-10 animate-pulse" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2 mb-2">
              {t.appName} <span className="bg-emerald-700 text-emerald-100 text-xs px-2.5 py-1 rounded-full font-bold shadow-inner">F2C</span>
            </h1>
            <p className="text-emerald-200 font-medium text-sm">{t.tagline}</p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 mb-6 bg-slate-900/50 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-emerald-800 w-full justify-center">
              <Globe className="w-4 h-4 text-emerald-400 ml-2" />
              {['en', 'hi', 'mr'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                    lang === l ? 'bg-emerald-600 text-white shadow' : 'text-emerald-300 hover:bg-emerald-800/50'
                  }`}
                >
                  {l}
                </button>
              ))}
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-4xl w-full p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setAuthTab('signup')}
                className={`flex-1 font-bold text-sm py-2.5 rounded-xl transition-all ${
                  authTab === 'signup' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.signup}
              </button>
              <button
                onClick={() => setAuthTab('login')}
                className={`flex-1 font-bold text-sm py-2.5 rounded-xl transition-all ${
                  authTab === 'login' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.login}
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patil"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="+91 98220 11223"
                    value={authForm.phone}
                    onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              {authTab === 'signup' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  
                  {}
                  <div className="flex flex-col items-center justify-center mb-4">
                    <div 
                      onClick={() => signupFileInputRef.current && signupFileInputRef.current.click()}
                      className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-50 flex items-center justify-center cursor-pointer overflow-hidden relative group shadow-sm transition-all hover:border-emerald-500"
                    >
                      <input
                        type="file"
                        ref={signupFileInputRef}
                        onChange={handleSignupImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      {authForm.avatar ? (
                        <img src={authForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-emerald-300" />
                      )}
                      <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-[10px] text-white font-bold text-center leading-tight">
                        Upload<br/>Photo
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">I am joining as a...</label>
                    <select
                      value={authForm.role}
                      onChange={(e) => setAuthForm({ ...authForm, role: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                    >
                      <option value="consumer">Consumer / Buyer</option>
                      <option value="farmer">Farmer / Producer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Location (Village / Pincode)</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Ahmednagar, 414001"
                        value={authForm.village}
                        onChange={(e) => setAuthForm({ ...authForm, village: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  {}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">{authForm.role === 'farmer' ? 'Farm Details & Bio' : 'Delivery Address'}</label>
                    <textarea
                      placeholder={authForm.role === 'farmer' ? "Tell buyers about your farming methods..." : "Full street address for deliveries..."}
                      value={authForm.bio}
                      onChange={(e) => setAuthForm({ ...authForm, bio: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none h-20 resize-none"
                    />
                  </div>

                  {authForm.role === 'farmer' && (
                    <div className="flex items-start gap-2 pt-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                      <input
                        type="checkbox"
                        id="kyc"
                        checked={authForm.kycVerified}
                        onChange={(e) => setAuthForm({ ...authForm, kycVerified: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="kyc" className="text-slate-700 text-xs font-semibold cursor-pointer leading-tight">
                        Apply for <strong className="text-emerald-700">Verified Farmer Badge</strong> (KYC via Aadhaar)
                      </label>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {authTab === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                {authTab === 'login' ? 'Secure Log In' : 'Create My Account'}
              </button>
            </form>
            
            {authTab === 'login' && (
               <p className="text-center text-xs text-slate-500 mt-4">
                 Demo Hint: Login as <strong>Ramesh Patil</strong> (Farmer) or <strong>Rahul Sharma</strong> (Consumer).
               </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN APPLICATION UI (ONLY WHEN LOGGED IN)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-16">
      
      {/* TOP HEADER */}
      <header className="bg-emerald-900 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-2xl text-white shadow-inner">
              <Sprout className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                {t.appName} <span className="bg-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">F2C</span>
              </h1>
              <p className="text-[11px] text-emerald-200 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            
            <div className="hidden sm:flex items-center bg-emerald-800/80 rounded-xl p-1 border border-emerald-700 text-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-300 ml-1.5 mr-1" />
              {['en', 'hi', 'mr'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded-lg font-bold uppercase transition-all ${
                    lang === l ? 'bg-emerald-500 text-slate-950 shadow' : 'text-emerald-200 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Current Active Persona & Login Button */}
            <div className="flex items-center bg-emerald-950 px-2.5 py-1.5 rounded-xl border border-emerald-700 text-xs gap-3 shadow-inner">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <div className="hidden md:block text-left">
                <span className="font-bold text-white block leading-tight text-sm">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-300 uppercase font-black tracking-wider">{currentUser.role}</span>
              </div>
              <button
                onClick={handleLogOut}
                title="Log Out"
                className="bg-emerald-800 hover:bg-red-600 text-emerald-100 hover:text-white p-1.5 rounded-lg transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-emerald-600 hover:bg-emerald-500 p-2.5 rounded-xl text-white shadow transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-emerald-900">
                  {cart.reduce((a, b) => a + b.cartQty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-17.25 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex space-x-2 sm:space-x-8 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`py-3 px-3 sm:px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'marketplace'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> {t.marketplace}
          </button>

          <button
            onClick={() => setActiveTab('farmer-hub')}
            className={`py-3 px-3 sm:px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'farmer-hub'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sprout className="w-4 h-4 text-emerald-600" /> {t.farmerDashboard}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 sm:px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors relative ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-4 h-4 text-amber-600" />
            {t.myOrders}
            {myVisibleOrders.length > 0 && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
                {myVisibleOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('prebooking')}
            className={`py-3 px-3 sm:px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'prebooking'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600" /> {t.preBooking}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3 sm:px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-4 h-4 text-purple-600" /> {t.myProfile}
          </button>
        </div>
      </nav>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 max-w-md animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs font-semibold">{toast}</p>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* TAB 1: CONSUMER MARKETPLACE */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between">
              
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                {['All', 'Grains', 'Vegetables', 'Fruits', 'Pulses'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs w-full md:w-auto justify-end">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                <span className="text-slate-500 font-medium">Distance:</span>
                {['All', 'Local', 'Intercity'].map(dist => (
                  <button
                    key={dist}
                    onClick={() => setSelectedDistanceFilter(dist)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                      selectedDistanceFilter === dist ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dist === 'Local' ? '<5 km' : dist === 'Intercity' ? '5-20 km' : 'All'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const prefQty = preferredQuantities[product.id] || product.moq || 1;
                const isOutOfStock = product.quantity <= 0;
                const isOwner = currentUser.role === 'farmer' && product.farmerId === currentUser.id;

                return (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3 text-emerald-400" /> {product.category}
                        </span>
                        
                        <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {product.distanceKm} km away
                        </span>

                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center">
                            <span className="bg-red-600 text-white font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider shadow">
                              {t.outOfStock}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-slate-900 text-base leading-snug">{product.name}</h3>
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Grade {product.grade}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <strong>{product.farmerName}</strong> ({product.farmerVillage})
                          </span>
                          <span>Harvest: {product.harvestDate}</span>
                        </div>

                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4 line-clamp-2">
                          "{product.description}"
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-xs bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 mb-3">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Price / kg</span>
                            <span className="font-black text-emerald-800 text-lg">₹{product.pricePerKg}</span>
                            <span className="text-[10px] text-slate-400 line-through ml-1">₹{product.retailPrice}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Available Stock</span>
                            <span className="font-bold text-slate-800 text-sm">{product.quantity} kg</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setTransparentProduct(product)}
                          className="w-full text-left text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-between bg-emerald-100/50 hover:bg-emerald-100 p-2 rounded-xl transition-colors mb-4"
                        >
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                            {t.viewPriceBreakdown} (Farmer gets ₹{product.farmerReceives}/kg)
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0 space-y-2">
                      {!isOutOfStock && (
                        <div className="flex items-center justify-between gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                          <span className="text-[11px] font-bold text-slate-600 pl-1">Select Qty:</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 5, 10].map(q => (
                              <button
                                key={q}
                                onClick={() => setPreferredQuantities({ ...preferredQuantities, [product.id]: q })}
                                className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                  prefQty === q ? 'bg-emerald-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {q}kg
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          disabled={isOutOfStock}
                          onClick={() => handleAddToCart(product, prefQty)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow ${
                            isOutOfStock
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" /> {t.addToCart} ({prefQty}kg)
                        </button>

                        {isOwner && (
                          <button
                            onClick={() => setProductToRestock(product)}
                            title="Restock Item"
                            className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-colors font-bold text-xs"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: FARMER HUB */}
        {activeTab === 'farmer-hub' && (
          <div className="space-y-6">
            <div className="bg-linear-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="bg-emerald-500/30 text-emerald-300 text-xs px-3 py-1 rounded-full font-bold border border-emerald-400/30 uppercase tracking-wider">
                  Farmer Direct Portal
                </span>
                <h2 className="text-2xl font-black mt-2">Manage Crop Listings & Stock</h2>
                <p className="text-xs text-emerald-200 mt-1 max-w-xl">
                  Post fresh harvest listings with actual crop photos, edit parameters, and restock batches cleanly with harvest date tracking.
                </p>
              </div>

              <button
                onClick={() => setIsAddListingOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0"
              >
                <PlusCircle className="w-5 h-5" /> Add New Crop Listing
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">My Listed Crops & Inventory</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => currentUser.role === 'farmer' ? p.farmerId === currentUser.id : true).map(product => {
                  const isOwner = product.farmerId === currentUser.id;

                  return (
                    <div key={product.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 relative">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{product.name}</h4>
                          <p className="text-xs text-slate-500">Stock: <strong className="text-emerald-700">{product.quantity} kg</strong></p>
                          <p className="text-xs text-slate-500">Price: <strong>₹{product.pricePerKg}/kg</strong></p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between text-slate-600">
                          <span>Harvest Date:</span>
                          <span className="font-semibold">{product.harvestDate}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Farmer Direct Share:</span>
                          <span className="font-bold text-emerald-700">₹{product.farmerReceives}/kg</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        {isOwner ? (
                          <>
                            <button
                              onClick={() => setProductToRestock(product)}
                              className="flex-1 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
                            >
                              <RefreshCw className="w-3.5 h-3.5" /> Restock
                            </button>
                            <button
                              onClick={() => setProductToDelete(product)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Read-only (Owned by {product.farmerName})</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 text-sm">Strict Deal Privacy Enabled</h3>
                <p className="text-xs text-amber-800 mt-0.5">{t.dealPrivacyNotice}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                <span>My Active Deals & Shipment Status ({myVisibleOrders.length})</span>
                <span className="text-xs text-slate-500 font-normal">Logged as: <strong>{currentUser.name}</strong></span>
              </h2>

              {myVisibleOrders.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 space-y-3">
                  <PackageCheck className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="font-bold text-slate-700">No active deals found for {currentUser.name}</p>
                  <p className="text-xs max-w-md mx-auto">
                    You currently have no active orders. Browse the Marketplace to place a deal or log in as a different user.
                  </p>
                </div>
              ) : (
                myVisibleOrders.map(order => {
                  const isFarmerInDeal = currentUser.id === order.farmerId;

                  return (
                    <div key={order.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-emerald-500 text-slate-950 font-mono text-xs px-2.5 py-1 rounded-lg font-bold">
                            {order.id}
                          </span>
                          <span className="text-xs text-slate-300">{order.placedAt}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" /> 2-Party Deal
                          </span>
                        </div>
                      </div>

                      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-4">
                          <img src={order.productImage} alt={order.productName} className="w-20 h-20 rounded-2xl object-cover border border-slate-200" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">{order.productName}</h4>
                            <p className="text-xs text-slate-500 mt-1">Quantity: <strong>{order.quantity} kg</strong></p>
                            <p className="text-xs text-emerald-700 font-bold mt-1">Total: ₹{order.totalAmount} (Fee: ₹{order.deliveryFee})</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                          <p className="font-bold text-slate-700 border-b border-slate-200 pb-1">Deal Participants</p>
                          <p><span className="text-slate-400">Farmer:</span> <strong>{order.farmerName}</strong></p>
                          <p><span className="text-slate-400">Buyer:</span> <strong>{order.buyerName}</strong></p>
                          <p><span className="text-slate-400">Payment Method:</span> <strong>{order.paymentMethod}</strong></p>
                        </div>

                        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-bold text-emerald-900 mb-2">Live Order Progress</p>
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 mb-2">
                              <span>Placed</span>
                              <span>Accepted</span>
                              <span>Prepared</span>
                              <span>Delivered</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-emerald-600 h-full transition-all duration-300"
                                style={{ width: `${(order.statusStep / 6) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {isFarmerInDeal && order.statusStep < 6 && (
                            <button
                              onClick={() => {
                                setOrders(prev => prev.map(o => o.id === order.id ? { ...o, statusStep: o.statusStep + 1 } : o));
                                showToast(`Advanced order #${order.id} status!`);
                              }}
                              className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl transition-colors shadow"
                            >
                              Advance Stage to Step {order.statusStep + 1}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PRE-BOOKING */}
        {activeTab === 'prebooking' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 max-w-3xl mx-auto text-center">
            <Calendar className="w-12 h-12 text-blue-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Pre-Booking Harvest Engine</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
              Reserve upcoming crop yields up to 15 days before harvest! Pre-booking helps farmers gauge consumer demand before harvesting produce.
            </p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs text-blue-900 font-medium inline-block">
              🧅 Upcoming Batch: Nashik Red Onions (500 kg available) — Harvest in 8 Days.
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm transition-all">
              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-5 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Edit3 className="w-5 h-5 text-emerald-600" /> Edit Profile
                    </h2>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setIsEditingProfile(false)} className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
                      <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors">Save Changes</button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <div 
                        onClick={() => profileFileInputRef.current && profileFileInputRef.current.click()}
                        className="w-24 h-24 rounded-full border-4 border-emerald-100 relative group cursor-pointer overflow-hidden bg-slate-50"
                      >
                        <input type="file" ref={profileFileInputRef} onChange={handleProfileImageUpload} accept="image/*" className="hidden" />
                        <img src={editProfileForm.avatar} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-xs font-bold text-white transition-all">
                          Change
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Click to upload</span>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                        <input type="text" required value={editProfileForm.name || ''} onChange={e => setEditProfileForm({...editProfileForm, name: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                        <input type="text" required value={editProfileForm.phone || ''} onChange={e => setEditProfileForm({...editProfileForm, phone: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Village / Location</label>
                        <input type="text" value={editProfileForm.village || ''} onChange={e => setEditProfileForm({...editProfileForm, village: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Pincode</label>
                        <input type="text" value={editProfileForm.pincode || ''} onChange={e => setEditProfileForm({...editProfileForm, pincode: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">UPI ID (For Payments)</label>
                        <input type="text" value={editProfileForm.upiId || ''} onChange={e => setEditProfileForm({...editProfileForm, upiId: e.target.value})} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 outline-none" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">{editProfileForm.role === 'farmer' ? 'Farm Story & Details' : 'Delivery Address'}</label>
                        <textarea rows="3" value={(editProfileForm.role === 'farmer' ? editProfileForm.farmStory : editProfileForm.deliveryAddress) || ''} onChange={e => editProfileForm.role === 'farmer' ? setEditProfileForm({...editProfileForm, farmStory: e.target.value}) : setEditProfileForm({...editProfileForm, deliveryAddress: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 animate-in fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                    <div className="flex items-center gap-4">
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-50 shadow-sm" />
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                          {currentUser.name}
                          {currentUser.kycVerified && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 uppercase tracking-wide">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                            </span>
                          )}
                        </h2>
                        <p className="text-xs text-slate-500 uppercase font-bold mt-1 bg-slate-100 px-2.5 py-1 rounded-lg inline-block">{currentUser.role}</p>
                      </div>
                    </div>
                    <button onClick={startEditingProfile} className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs transition-colors border border-emerald-200">
                      <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mb-1"><Phone className="w-3.5 h-3.5" /> Mobile Number</span>
                      <span className="font-bold text-slate-800">{currentUser.phone}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mb-1"><MapPin className="w-3.5 h-3.5" /> Location</span>
                      <span className="font-bold text-slate-800">{currentUser.village} {currentUser.pincode ? `(${currentUser.pincode})` : ''}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mb-1"><QrCode className="w-3.5 h-3.5" /> UPI ID</span>
                      <span className="font-mono font-bold text-emerald-700">{currentUser.upiId || 'Not Setup'}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mb-1"><Info className="w-3.5 h-3.5" /> {currentUser.role === 'farmer' ? 'Farm Story' : 'Address'}</span>
                      <span className="font-medium text-slate-700 text-xs">{(currentUser.role === 'farmer' ? currentUser.farmStory : currentUser.deliveryAddress) || 'No details added.'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {}
            {!isEditingProfile && currentUser.role === 'farmer' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" /> My Published Listings
                </h3>
                
                {products.filter(p => p.farmerId === currentUser.id).length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-6 bg-slate-50 rounded-2xl border border-slate-100">You have no active listings.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.filter(p => p.farmerId === currentUser.id).map(product => (
                      <div key={product.id} className="flex gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 relative group transition-all hover:bg-white hover:shadow-sm hover:border-emerald-300">
                        <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover border border-slate-200" />
                        <div className="flex-1 pr-8">
                          <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{product.name}</h4>
                          <p className="text-xs text-slate-500 mb-0.5">Stock: <strong className="text-emerald-700">{product.quantity} kg</strong></p>
                          <p className="text-xs text-slate-500">Price: <strong>₹{product.pricePerKg}/kg</strong></p>
                          <span className="inline-block mt-1.5 bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">{product.harvestDate}</span>
                        </div>
                        <button
                          onClick={() => setProductToDelete(product)}
                          className="absolute top-3 right-3 p-2 bg-slate-200 hover:bg-red-100 text-slate-500 hover:text-red-600 rounded-lg transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODALS FOR LOGGED IN STATE */}
      
      {transparentProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" /> Transparent Pricing Model
              </h3>
              <button onClick={() => setTransparentProduct(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 text-sm mb-2">{transparentProduct.name} (1 kg)</h4>
              
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                <span>Farmer Receives (Direct Payout):</span>
                <span className="font-bold text-emerald-700">₹{transparentProduct.farmerReceives}.00</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                <span>Logistics & Transport:</span>
                <span className="font-semibold">₹{transparentProduct.deliveryFee}.00</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-600">
                <span>Crop Setu Service Fee:</span>
                <span className="font-semibold">₹{transparentProduct.platformFee}.00</span>
              </div>

              <div className="flex justify-between py-2 font-black text-slate-900 text-sm pt-2">
                <span>Consumer Pays:</span>
                <span className="text-emerald-700">₹{transparentProduct.pricePerKg}.00 / kg</span>
              </div>

              <div className="bg-emerald-100/70 p-3 rounded-xl border border-emerald-200 mt-2 text-emerald-900 font-bold flex items-center justify-between">
                <span>Consumer Savings vs Retail (₹{transparentProduct.retailPrice}):</span>
                <span>₹{transparentProduct.retailPrice - transparentProduct.pricePerKg} / kg</span>
              </div>
            </div>

            <button
              onClick={() => setTransparentProduct(null)}
              className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}

      {productToRestock && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-amber-600" /> Restock {productToRestock.name}
              </h3>
              <button onClick={() => setProductToRestock(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRestockSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Additional Quantity (kg) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 200"
                  value={restockForm.addQty}
                  onChange={(e) => setRestockForm({ ...restockForm, addQty: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Harvest Date Management</label>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="sameDate"
                    name="hdate"
                    checked={restockForm.isSameHarvestDate}
                    onChange={() => setRestockForm({ ...restockForm, isSameHarvestDate: true })}
                  />
                  <label htmlFor="sameDate" className="text-slate-600">Keep existing harvest date ({productToRestock.harvestDate})</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="newDate"
                    name="hdate"
                    checked={!restockForm.isSameHarvestDate}
                    onChange={() => setRestockForm({ ...restockForm, isSameHarvestDate: false })}
                  />
                  <label htmlFor="newDate" className="text-slate-600">Update to new fresh harvest date</label>
                </div>
              </div>

              {!restockForm.isSameHarvestDate && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">New Harvest Date</label>
                  <input
                    type="date"
                    value={restockForm.harvestDate}
                    onChange={(e) => setRestockForm({ ...restockForm, harvestDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition-colors"
              >
                Confirm Restock
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddListingOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" /> Post Produce Listing & Seller Photos
              </h3>
              <button onClick={() => setIsAddListingOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Crop Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Desi Garlic"
                    value={newCropForm.name}
                    onChange={(e) => setNewCropForm({ ...newCropForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCropForm.category}
                    onChange={(e) => setNewCropForm({ ...newCropForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains">Grains</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price per kg (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25"
                    value={newCropForm.pricePerKg}
                    onChange={(e) => setNewCropForm({ ...newCropForm, pricePerKg: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Stock (kg) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500"
                    value={newCropForm.quantity}
                    onChange={(e) => setNewCropForm({ ...newCropForm, quantity: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Upload Farm Photo (Seller Image)</label>
                <div
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 rounded-2xl p-4 text-center cursor-pointer transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {newCropForm.image ? (
                    <img src={newCropForm.image} alt="Preview" className="max-h-32 mx-auto rounded-xl shadow" />
                  ) : (
                    <span className="text-slate-500 font-semibold">Click to upload photo from device</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  placeholder="Farming methods, organic status..."
                  value={newCropForm.description}
                  onChange={(e) => setNewCropForm({ ...newCropForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition-colors"
              >
                Publish Produce
              </button>
            </form>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white max-w-md w-full h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" /> {t.cartTitle}
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center text-slate-400 text-xs py-12">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-slate-500">₹{item.pricePerKg} × {item.cartQty} kg</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-700">₹{item.pricePerKg * item.cartQty}</span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-slate-200 space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Delivery Address</label>
                      <input
                        type="text"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        placeholder="House / Street / Area"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                      <select
                        value={shippingForm.paymentMethod}
                        onChange={(e) => setShippingForm({ ...shippingForm, paymentMethod: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="UPI">UPI Direct Payout</option>
                        <option value="COD">Cash on Delivery</option>
                        <option value="Card">Credit/Debit Card</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between font-black text-slate-900 text-base">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700">
                    ₹{cart.reduce((a, b) => a + (b.pricePerKg * b.cartQty), 0)}
                  </span>
                </div>

                <button
                  onClick={handleCheckoutSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4" /> {t.checkout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">Delete Produce Listing?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <strong>"{productToDelete.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 font-bold py-2 rounded-xl text-xs text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="flex-1 bg-red-600 hover:bg-red-700 font-bold py-2 rounded-xl text-xs text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}