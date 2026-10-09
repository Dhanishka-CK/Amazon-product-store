
import { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <h1>Amazon Product Store</h1>
    </header>
  );
}

function ProductCard({
  productName,
  price,
  quantity,
  selectedColor,
  deliveryCity
}) {
  useEffect(() => {
    const previousTitle = document.title;

    document.title = `${productName} | ${selectedColor} | Cart: ${quantity}`;

    return () => {
      document.title = previousTitle;
    };
  }, [productName, selectedColor, quantity]);

  const total = quantity * price;

  return (
    <section className="product-card">
      <div className={`product-image ${selectedColor.toLowerCase()}`}>
        <div className="mouse">
          <div className="mouse-wheel"></div>
        </div>
      </div>

      <div className="product-details">
        <h2>{productName}</h2>
        <p className="price">₹{price} <span>per item</span></p>

        <p>Colour: {selectedColor}</p>
        <p>Deliver to: {deliveryCity || "Not specified"}</p>

        <hr />

        <p>Cart Quantity: {quantity}</p>
        <h3>Total Amount: ₹{total}</h3>

        <p className="status">
          {quantity === 0
            ? "Cart is empty"
            : "Product added to cart"}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © 2026 Amazon Product Store
    </footer>
  );
}

function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  const productName = "Wireless Mouse";
  const price = 499;

  return (
    <div className="app">
      <Header />

      <div className="tab-title">
        <span>Tab title</span>
        {productName} | {selectedColor} | Cart: {quantity}
      </div>

      <main>
        {showProduct && (
          <ProductCard
            productName={productName}
            price={price}
            quantity={quantity}
            selectedColor={selectedColor}
            deliveryCity={deliveryCity}
          />
        )}

        <div className="controls">
          <div className="input-group">
            <label htmlFor="color">Product colour</label>
            <select
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="city">Delivery city</label>
            <input
              id="city"
              type="text"
              value={deliveryCity}
              onChange={(e) => setDeliveryCity(e.target.value)}
            />
          </div>
        </div>

        <div className="buttons">
          <button
            className="add-button"
            onClick={() => setQuantity(quantity + 1)}
          >
            Add to Cart
          </button>

          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity === 0}
          >
            Remove One
          </button>

          <button onClick={() => setQuantity(0)}>
            Reset Cart
          </button>

          <button onClick={() => setShowProduct(!showProduct)}>
            {showProduct ? "Hide Product" : "Show Product"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;