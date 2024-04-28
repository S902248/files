document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const categorySelect = document.getElementById('category-select');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
  
    // Fetch products from API
    fetchProducts();
  
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
        populateCategories(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    function displayProducts(products) {
      productList.innerHTML = '';
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>$${product.price}</p>
        `;
        productList.appendChild(productElement);
      });
    }
  
    function populateCategories(products) {
      const categories = ['all', ...new Set(products.map(product => product.category))];
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
      });
    }
  
    categorySelect.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    sortSelect.addEventListener('change', sortProducts);
  
    let filteredProducts = [];
  
    function filterProducts() {
      const category = categorySelect.value;
      const searchTerm = searchInput.value.toLowerCase();
      filteredProducts = [];
  
      filteredProducts = products.filter(product => {
        return (category === 'all' || product.category === category) &&
               (product.title.toLowerCase().includes(searchTerm));
      });
  
      displayProducts(filteredProducts);
    }
  
    function sortProducts() {
      const sortBy = sortSelect.value;
      if (sortBy === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
      displayProducts(filteredProducts);
    }
  });
  