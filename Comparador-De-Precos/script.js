const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const inputValue = event.target[0].value.trim();
  if (!inputValue) return;

  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(inputValue)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const products = data.products.slice(0, 10);

    console.log(products);
  } catch (error) {
    console.error("Erro:", error);
  }
});