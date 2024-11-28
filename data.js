const productData = [
  {
    name: "Kodune hakkliha 500 g MAKS & MOORITS",
    category: "Hakkliha",
    prices: {
      Rimi: 2.99,
      Coop: 3.55,
      Selver: 3.55,
      Lidl: 100,
      Prisma: 3.55,
    },
    lastUpdated: "2024-11-28"
  },
  {
    name: "TEST2",
    category: "Toode2",
    prices: {
      Rimi: 1.15,
      Coop: 1.90,
      Selver: 1.98,
      Lidl: 1.09,
      Prisma: 1.90,
    },
    lastUpdated: "2024-11-28"
  },
  {
    name: "TEST3",
    category: "Toode3",
    prices: {
      Rimi: 1.95,
      Coop: 1.10,
      Selver: 1.98,
      Lidl: 1.91,
      Prisma: 1.90,
    },
    lastUpdated: "2024-11-28"
  },
  {
    name: "TEST4",
    category: "Toode1",
    prices: {
      Rimi: 1.95,
      Coop: 1.90,
      Selver: 1.98,
      Lidl: 1.91,
      Prisma: 1.00,
    },
    lastUpdated: "2024-11-28"
  },
];

// Funktsioon, et leida soodsaim hind ja pood
function findCheapest(prices) {
  const storeNames = Object.keys(prices);
  let cheapestStore = storeNames[0];
  let cheapestPrice = prices[cheapestStore];

  // Leia kõige odavam hind ja pood
  storeNames.forEach(store => {
    if (prices[store] < cheapestPrice) {
      cheapestPrice = prices[store];
      cheapestStore = store;
    }
  });

  return { cheapestStore, cheapestPrice };
}

// Funktsioon toodete kuvamiseks
function displayProducts(filteredProducts) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = ""; // Tühjenda eelnevad tooted

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
}

// Filtreerimine kategooriate järgi
function filterProducts(category) {
  if (category === "Kõik") {
    displayProducts(productData);
  } else {
    const filtered = productData.filter(product => product.category === category);
    displayProducts(filtered);
  }
}

// Kuvatakse kõik tooted alguses
window.onload = () => {
  displayProducts(productData);
};
