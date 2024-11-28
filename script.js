document.addEventListener("DOMContentLoaded", async () => {
  const productsContainer = document.getElementById("products");
  const lastUpdated = document.getElementById("last-updated");

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      productDiv.innerHTML = `
        <span>${product.name} (${product.store})</span>
        <span>${product.price.toFixed(2)}€</span>
      `;

      productsContainer.appendChild(productDiv);
    });

    lastUpdated.textContent = `Andmed viimati uuendatud: ${new Date(data.last_updated).toLocaleString()}`;
  } catch (error) {
    console.error("Andmete laadimisel tekkis viga:", error);
  }
});
