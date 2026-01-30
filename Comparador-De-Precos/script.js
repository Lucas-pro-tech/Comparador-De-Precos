const searchForm = document.querySelector('.search-form');
const productList = document.querySelector('.product-list');

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
  } catch (error) {
    console.error("Erro:", error);
    productList.innerHTML = `<p>❌ Erro ao buscar produtos.</p>`;
  }
});

function displayItems(products) {
  productList.innerHTML = products
    .map(product => `
      <div class="product-card">
        <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p>R$ ${product.price}</p>
      </div>
    `)
    .join('');
}
