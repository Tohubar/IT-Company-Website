@extends('layouts.app')

@section('content')
    <section class="relative bg-gray-900">
        <div class="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80"
                alt="Velvet backdrop"
                class="w-full h-full object-cover opacity-40"
            />
            <div class="absolute inset-0 bg-gray-900/70"></div>
        </div>
        <div class="relative max-w-6xl mx-auto px-4 py-24">
            <p class="text-yellow-500 uppercase tracking-[0.4em] text-xs">Premium intimacy</p>
            <h1 class="text-4xl md:text-6xl font-semibold mt-4">Unleash Your Fantasies</h1>
            <p class="text-gray-300 max-w-xl mt-6">Curated lingerie and pleasure essentials with discreet shipping and refined craftsmanship.</p>
            <div class="mt-8">
                <button class="px-6 py-3 rounded-full bg-yellow-600 text-gray-900 font-semibold hover:bg-yellow-500 transition">
                    Shop the Collection
                </button>
            </div>
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-16">
        <h2 class="text-2xl font-semibold">Explore Categories</h2>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            @foreach ([
                ['title' => 'Lingerie', 'image' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80'],
                ['title' => 'Toys', 'image' => 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'],
                ['title' => 'Accessories', 'image' => 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=600&q=80'],
            ] as $category)
                <div class="flex flex-col items-center text-center gap-4">
                    <div class="w-36 h-36 rounded-full overflow-hidden border border-gray-700">
                        <img src="{{ $category['image'] }}" alt="{{ $category['title'] }}" class="w-full h-full object-cover" />
                    </div>
                    <h3 class="text-lg font-medium">{{ $category['title'] }}</h3>
                </div>
            @endforeach
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 pb-20">
        <div class="flex items-center justify-between">
            <h2 class="text-2xl font-semibold">Featured Indulgences</h2>
            <a href="#" class="text-sm text-yellow-500 hover:text-yellow-400">View all</a>
        </div>
        <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <x-product-card />
            <x-product-card />
            <x-product-card />
            <x-product-card />
        </div>
    </section>
@endsection
