@extends('layouts.app')

@section('content')
    <section class="max-w-6xl mx-auto px-4 py-16" x-data="{ mainImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80' }">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-4">
                <div class="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                    <img :src="mainImage" alt="Product image" class="w-full aspect-[3/4] object-cover" />
                </div>
                <div class="flex gap-4">
                    @foreach ([
                        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
                        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
                        'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=900&q=80'
                    ] as $image)
                        <button
                            @click="mainImage = '{{ $image }}'"
                            class="w-24 h-24 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition"
                        >
                            <img src="{{ $image }}" alt="Thumbnail" class="w-full h-full object-cover" />
                        </button>
                    @endforeach
                </div>
            </div>

            <div class="space-y-6">
                <div>
                    <h1 class="text-3xl md:text-4xl font-semibold">Midnight Lace Bodysuit</h1>
                    <a href="#" class="text-sm text-yellow-500 hover:text-yellow-400">by Noir Atelier</a>
                </div>
                <p class="text-3xl text-yellow-500 font-bold">$149</p>
                <p class="text-gray-300">A daring silhouette with velvet accents and intricate lace. Designed for comfort, crafted for confidence.</p>

                <div class="flex items-center gap-4" x-data="{ qty: 1 }">
                    <div class="flex items-center bg-gray-800 border border-gray-700 rounded-full px-3 py-2">
                        <button @click="qty = Math.max(1, qty - 1)" class="text-gray-400 hover:text-yellow-500 transition">-</button>
                        <span class="px-4 text-sm" x-text="qty"></span>
                        <button @click="qty = qty + 1" class="text-gray-400 hover:text-yellow-500 transition">+</button>
                    </div>
                    <span class="text-sm text-gray-400">Limited stock available</span>
                </div>

                <button class="w-full py-3 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-semibold hover:from-yellow-500 hover:to-yellow-400 transition">
                    Add to Cart
                </button>

                <div x-data="{ tab: 'description' }" class="border-t border-gray-700 pt-6">
                    <div class="flex flex-wrap gap-6 text-sm">
                        <button @click="tab = 'description'" :class="tab === 'description' ? 'text-yellow-500' : 'text-gray-400'">Description</button>
                        <button @click="tab = 'shipping'" :class="tab === 'shipping' ? 'text-yellow-500' : 'text-gray-400'">Discreet Shipping Info</button>
                        <button @click="tab = 'reviews'" :class="tab === 'reviews' ? 'text-yellow-500' : 'text-gray-400'">Reviews</button>
                    </div>
                    <div class="mt-4 text-gray-300">
                        <div x-show="tab === 'description'">
                            <p>Soft stretch lace, adjustable straps, and a sculpted fit that moves with you.</p>
                        </div>
                        <div x-show="tab === 'shipping'">
                            <p>All orders arrive in unbranded packaging with signature-required delivery options.</p>
                        </div>
                        <div x-show="tab === 'reviews'">
                            <p>★★★★★ “Exquisite craftsmanship and beautifully discreet packaging.”</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
