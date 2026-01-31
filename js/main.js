const tickerData = [
  { symbol: 'BTC', price: 42250, change: 3.2 },
  { symbol: 'ETH', price: 2360, change: 2.1 },
  { symbol: 'SOL', price: 112, change: 5.8 },
  { symbol: 'LTC', price: 82, change: -1.2 },
  { symbol: 'XRP', price: 0.62, change: 0.8 },
  { symbol: 'ADA', price: 0.54, change: -0.6 }
];

const featuredData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 42250, change: 3.2, cap: '824B' },
  { name: 'Ethereum', symbol: 'ETH', price: 2360, change: 2.1, cap: '314B' },
  { name: 'Solana', symbol: 'SOL', price: 112, change: 5.8, cap: '51B' },
  { name: 'Cardano', symbol: 'ADA', price: 0.54, change: -0.6, cap: '18B' },
  { name: 'Chainlink', symbol: 'LINK', price: 18.2, change: 1.4, cap: '10B' },
  { name: 'Litecoin', symbol: 'LTC', price: 82, change: -1.2, cap: '6B' }
];

const converterRates = {
  BTC: 42250,
  ETH: 2360,
  USDT: 1,
  USD: 1,
  EUR: 1.08
};

const tickerTrack = document.getElementById('tickerTrack');
const featuredGrid = document.getElementById('featuredGrid');

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const renderTicker = () => {
  tickerTrack.innerHTML = '';
  tickerData.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'ticker-item';
    el.innerHTML = `
      <strong>${item.symbol}</strong>
      <span>${formatPrice(item.price)}</span>
      <span class="${item.change >= 0 ? 'up' : 'down'}">
        ${item.change >= 0 ? '+' : ''}${item.change.toFixed(1)}%
      </span>
    `;
    tickerTrack.appendChild(el);
  });
  tickerData.forEach((item) => {
    const clone = document.createElement('div');
    clone.className = 'ticker-item';
    clone.innerHTML = `
      <strong>${item.symbol}</strong>
      <span>${formatPrice(item.price)}</span>
      <span class="${item.change >= 0 ? 'up' : 'down'}">
        ${item.change >= 0 ? '+' : ''}${item.change.toFixed(1)}%
      </span>
    `;
    tickerTrack.appendChild(clone);
  });
};

const renderFeatured = () => {
  featuredGrid.innerHTML = '';
  featuredData.forEach((asset) => {
    const card = document.createElement('div');
    card.className = 'crypto-card';
    card.innerHTML = `
      <strong>${asset.name} (${asset.symbol})</strong>
      <span>${formatPrice(asset.price)}</span>
      <span class="change ${asset.change >= 0 ? 'positive' : 'negative'}">
        ${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(1)}% 24h
      </span>
      <small>Market cap: ${asset.cap}</small>
    `;
    featuredGrid.appendChild(card);
  });
};

const updatePrices = () => {
  tickerData.forEach((asset) => {
    const delta = (Math.random() - 0.5) * 2;
    asset.change = Math.max(-8, Math.min(8, asset.change + delta));
    asset.price = Math.max(0.1, asset.price * (1 + delta / 100));
  });
  featuredData.forEach((asset, index) => {
    asset.price = tickerData[index % tickerData.length].price;
    asset.change = tickerData[index % tickerData.length].change;
  });
  renderTicker();
  renderFeatured();
};

const convert = () => {
  const amount = parseFloat(document.getElementById('convertAmount').value || 0);
  const from = document.getElementById('convertFrom').value;
  const to = document.getElementById('convertTo').value;
  const usdValue = amount * converterRates[from];
  const result = usdValue / converterRates[to];
  document.getElementById('convertResult').value = result.toFixed(4);
};

const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('active');
});

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('theme-light');
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.innerHTML = isLight
    ? '<i class="far fa-sun"></i><span>Light</span>'
    : '<i class="far fa-moon"></i><span>Dark</span>';
});

document.getElementById('convertBtn').addEventListener('click', (event) => {
  event.preventDefault();
  convert();
});

renderTicker();
renderFeatured();
convert();
setInterval(updatePrices, 8000);
