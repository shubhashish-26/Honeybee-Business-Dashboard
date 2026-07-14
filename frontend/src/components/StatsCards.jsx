function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Hospitals",
      value: stats.total_hospitals || 0,
      icon: "🏥",
      color: "#4CAF50",
    },
    {
      title: "Average Rating",
      value: stats.average_rating || 0,
      icon: "⭐",
      color: "#2196F3",
    },
    {
      title: "Highest Rating",
      value: stats.highest_rating || 0,
      icon: "🏆",
      color: "#FF9800",
    },
  ];

  return (
    <div className="stats-container"
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card, index) => (
        <div className="stats-container"
          key={index}
          style={{
            flex: "1",
            minWidth: "240px",
            background: card.color,
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            transition: "0.3s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
          }}
        >
          <h2 style={{ margin: 0 }}>
            {card.icon} {card.value}
          </h2>

          <p
            style={{
              marginTop: "12px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;