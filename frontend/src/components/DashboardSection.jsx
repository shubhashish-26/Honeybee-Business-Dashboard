function DashboardSection({ title, children }) {

    return (

        <div
            style={{
                background: "#ffffff",
                padding: "20px",
                marginTop: "25px",
                borderRadius: "12px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.15)"
            }}
        >

            <h2
                style={{
                    marginBottom: "20px",
                    color: "#1976D2"
                }}
            >
                {title}
            </h2>

            {children}

        </div>

    );

}

export default DashboardSection;