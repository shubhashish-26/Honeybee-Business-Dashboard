function DashboardHeader({ darkMode, setDarkMode }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px"
            }}
        >
            <div>

                <h1
                    style={{
                        margin: 0,
                        color: "#1976D2"
                    }}
                >
                    🏥 Honeybee Business Dashboard
                </h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginBottom: "20px",
                        background: darkMode ? "#FFC107" : "#1976D2",
                        color: "white"
                    }}
                >
                   {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                </button>
                <p
                    style={{
                        color: "gray",
                        marginTop: "8px"
                    }}
                >
                    Hospital Analytics Dashboard
                </p>

            </div>

        </div>

    );

}

export default DashboardHeader;