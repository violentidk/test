document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products");
  const lastUpdated = document.getElementById("last-updated");

  productData.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const prices = product.prices;
    const cheapestStore = Object.keys(prices).reduce((a, b) =>
      prices[a] < prices[b] ? a : b
    );

    productDiv.innerHTML = `
      <span>${product.name}</span>
      <span>${cheapestStore}: <span class="cheapest">${prices[cheapestStore].toFixed(2)}€</span></span>
    `;

    productsContainer.appendChild(productDiv);
  });

  lastUpdated.textContent = `Andmed viimati uuendatud: ${productData[0].lastUpdated}`;
});
