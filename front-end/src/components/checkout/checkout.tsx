'use client'

import { useSelector } from "react-redux"
import { useState } from "react"
import Link from "next/link"
import { RootState } from "@/app/store"
import { useRouter } from "next/navigation"

export default function CheckoutPage({isAuthenticated}: {isAuthenticated: boolean}) {
    const router = useRouter()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        paymentMethod: 'credit'
    })

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 100 ? 0 : 15.00
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
          if(!isAuthenticated) router.push('/Login');
          console.log('Checkout data:', { formData, cartItems, total})
        }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add some products to proceed with checkout</p>
                    <Link href='../' className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your purchase</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        placeholder="Street address"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State
                                        </label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="00000-000"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        placeholder="(11) 99999-9999"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="credit"
                                            checked={formData.paymentMethod === 'credit'}
                                            onChange={handleInputChange}
                                            className="mr-3"
                                        />
                                        <div className="flex items-center">
                                            <svg className="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v8h16V8H4zm2 2h6v2H6v-2z"/>
                                            </svg>
                                            <span className="font-medium">Credit Card</span>
                                        </div>
                                    </label>
                                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="pix"
                                            checked={formData.paymentMethod === 'pix'}
                                            onChange={handleInputChange}
                                            className="mr-3"
                                        />
                                        <div className="flex items-center">
                                            <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                            <span className="font-medium">PIX</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Complete Order - R$ {total.toFixed(2)}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.sku} className="flex items-center space-x-4">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                        {item.options && Object.entries(item.options).map(([key, value]) => (
                                            <p key={key} className="text-sm text-gray-500">
                                                {key}: {value}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">
                                            R$ {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            R$ {item.price.toFixed(2)} each
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>R$ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `R$ ${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>R$ {tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between text-lg font-semibold text-gray-900">
                                <span>Total</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>
                        </div>

                        {subtotal < 100 && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <span className="font-medium">Free shipping</span> on orders over R$ 100.00
                                </p>
                                <p className="text-sm text-blue-600">
                                    Add R$ {(100 - subtotal).toFixed(2)} more to qualify!
                                </p>
                            </div>
                        )}

                        {subtotal >= 100 && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-800 font-medium">
                                    🎉 You qualified for free shipping!
                                </p>
                            </div>
                        )}

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                30-day return policy
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Secure checkout
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Fast delivery
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}