import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <h1 className="title">
          <span className="brand">🌱 AgriSphere</span>
          <span className="tagline">One stop solution for farmers</span>
        </h1>

        <p className="subtitle">
          A climate-smart, data-driven agriculture platform empowering Indian
          farmers with intelligent insights and modern tools.
        </p>

        <div className="hero-tags">
          <span>🌱 Smart Crops</span>
          <span>🌦 Weather Ready</span>
          <span>📊 Data Driven</span>
          <span>📈 Market Aware</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <Feature
          icon="🌾"
          title="Crop Prediction"
          desc="AI-based crop recommendations using soil nutrients and climate data."
        />
        <Feature
          icon="🌦"
          title="Weather Insights"
          desc="Accurate forecasts to plan irrigation, sowing, and harvesting."
        />
        <Feature
          icon="📈"
          title="Market Prices"
          desc="Real-time crop prices from nearby mandis and markets."
        />
        <Feature
          icon="🧾"
          title="Farm Records"
          desc="Manage farm details, crops, seeds, and requests in one place."
        />
        <Feature
          icon="🌱"
          title="Seed Management"
          desc="Register, request, and track seeds digitally."
        />
        <Feature
          icon="📊"
          title="Analytics"
          desc="Understand farm performance with simple analytics."
        />
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Built for Farmers. Powered by Data.</h2>
        <p>
          AgriSphere bridges technology and agriculture to enable smarter
          farming decisions.
        </p>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
