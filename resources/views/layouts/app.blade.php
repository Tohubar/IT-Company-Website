<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Velvet Noir</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body class="bg-gray-900 text-gray-100 font-sans">
    <div x-data="{ mobileOpen: false }" class="min-h-screen flex flex-col">
        <header class="sticky top-0 z-40 bg-gray-800/95 backdrop-blur border-b border-gray-700">
            <nav class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center gap-3">
                        <span class="text-yellow-500 text-xl font-semibold tracking-wide">Velvet Noir</span>
                    </div>
                    <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#" class="hover:text-yellow-500 transition">New Arrivals</a>
                        <a href="#" class="hover:text-yellow-500 transition">Lingerie</a>
                        <a href="#" class="hover:text-yellow-500 transition">Toys</a>
                        <a href="#" class="hover:text-yellow-500 transition">Accessories</a>
                        <a href="#" class="hover:text-yellow-500 transition">Guides</a>
                    </div>
                    <div class="flex items-center gap-4">
                        <button class="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 transition">
                            <span class="sr-only">Account</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
                            </svg>
                        </button>
                        <button class="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 transition">
                            <span class="sr-only">Cart</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.2 10.2a2.25 2.25 0 0 0 2.24 2h9.58a2.25 2.25 0 0 0 2.2-1.74l1.34-6.71H6.18" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm9 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                            </svg>
                        </button>
                        <button @click="mobileOpen = !mobileOpen" class="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 transition">
                            <span class="sr-only">Menu</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div x-show="mobileOpen" x-transition class="md:hidden pb-4">
                    <div class="flex flex-col gap-3 text-sm font-medium">
                        <a href="#" class="hover:text-yellow-500 transition">New Arrivals</a>
                        <a href="#" class="hover:text-yellow-500 transition">Lingerie</a>
                        <a href="#" class="hover:text-yellow-500 transition">Toys</a>
                        <a href="#" class="hover:text-yellow-500 transition">Accessories</a>
                        <a href="#" class="hover:text-yellow-500 transition">Guides</a>
                        <div class="flex items-center gap-3 pt-2">
                            <button class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 transition">
                                <span class="sr-only">Account</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
                                </svg>
                            </button>
                            <button class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 transition">
                                <span class="sr-only">Cart</span>
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l1.2 10.2a2.25 2.25 0 0 0 2.24 2h9.58a2.25 2.25 0 0 0 2.2-1.74l1.34-6.71H6.18" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm9 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        <div
            x-data="{ open: true }"
            x-show="open"
            x-transition
            class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur"
        >
            <div class="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md text-center shadow-2xl">
                <p class="text-sm uppercase tracking-[0.3em] text-yellow-500">Age Verification</p>
                <h2 class="text-2xl font-semibold mt-4">Are you 18+?</h2>
                <p class="text-gray-300 mt-3">This boutique is reserved for adults only. Please confirm your age.</p>
                <div class="mt-6 flex items-center justify-center gap-4">
                    <button
                        @click="window.location.href = 'https://www.google.com'"
                        class="px-5 py-2 rounded-full border border-gray-600 text-gray-200 hover:border-yellow-500 hover:text-yellow-500 transition"
                    >
                        No, take me away
                    </button>
                    <button
                        @click="open = false"
                        class="px-5 py-2 rounded-full bg-yellow-600 text-gray-900 font-semibold hover:bg-yellow-500 transition"
                    >
                        Yes, enter
                    </button>
                </div>
            </div>
        </div>

        <main class="flex-1">
            @yield('content')
        </main>

        <footer class="bg-gray-800 border-t border-gray-700">
            <div class="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-sm text-gray-400">&copy; 2024 Velvet Noir. All rights reserved.</p>
                <span class="text-xs uppercase tracking-[0.3em] text-yellow-500 bg-gray-900 border border-yellow-500/40 px-3 py-1 rounded-full">
                    Discreet Shipping
                </span>
            </div>
        </footer>
    </div>
</body>
</html>
