document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products");
  const lastUpdated = document.getElementById("last-updated");

  // Find cheapest price function
  function findCheapest(prices) {
    const storeNames = Object.keys(prices);
    let cheapestStore = storeNames[0];
    let cheapestPrice = prices[cheapestStore];

    storeNames.forEach(store => {
      if (prices[store] && prices[store] < cheapestPrice) {
        cheapestPrice = prices[store];
        cheapestStore = store;
      }
    });

    return { cheapestStore, cheapestPrice };
  }

  // Function to display products
  function displayProducts(filteredProducts) {
    productsContainer.innerHTML = ""; // Clear previous products

    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = "<p>Tooteid ei leitud.</p>";
      return;
    }

    filteredProducts.forEach(product => {
      const { cheapestStore, cheapestPrice } = findCheapest(product.prices);

      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Kategooria: ${product.category}</p>
        <p>Hind Rimis: €${product.prices.Rimi}</p>
        <p>Hind Coopis: €${product.prices.Coop}</p>
        <p>Hind Selveris: €${product.prices.Selver}</p>
        <p>Hind Lidlis: €${product.prices.Lidl}</p>
        <p>Hind Prismas: €${product.prices.Prisma}</p>
        <p><strong>Kõige soodsam hind: €${cheapestPrice} (${cheapestStore})</strong></p>
        <p>Viimati uuendatud: ${product.lastUpdated}</p>
      `;
      productsContainer.appendChild(productDiv);
    });

    // Update the last updated timestamp
    lastUpdated.textContent = `Andmed viimati uuendatud: ${filteredProducts[0].lastUpdated}`;
  }

  // Filter products based on category
  window.filterProducts = (category) => {
    if (category === "Kõik") {
      displayProducts(productData);
    } else {
      const filtered = productData.filter(product => product.category === category);
      displayProducts(filtered);
    }
  };

  // Initial display of all products
  displayProducts(productData);
});
