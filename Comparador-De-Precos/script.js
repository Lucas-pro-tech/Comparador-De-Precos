const searchForm = document.querySelector('.search-form');
const productList = document.querySelector('.product-list');
const priceChart = document.querySelector('.price-chart');

let myChart = null;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const inputValue = event.target[0].value.trim();
  if (!inputValue) return;

  productList.innerHTML = `<p>🔎 Buscando produtos...</p>`;

  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(inputValue)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products.slice(0, 10);

    displayItems(products);
    updatePriceChart(products);
  } catch (error) {
    console.error("Erro:", error);
    productList.innerHTML = `<p>❌ Erro ao buscar produtos.</p>`;
  }
});

function displayItems(products) {
  productList.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
      <h3>${product.title}</h3>
      <p>R$ ${product.price}</p>
    </div>
  `).join('');
}

function updatePriceChart(products) {
  const ctx = priceChart.getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products.map(p => p.title.length > 20 ? p.title.substring(0, 20) + '...' : p.title),
      datasets: [{
        label: 'Preço (R$)',
        data: products.map(p => p.price),
        backgroundColor: 'rgba(46, 204, 113, 0.6)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Comparação de Preços'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => `R$ ${value}`
          }
        }
      }
    }
  });
}
