function HospitalCard({ hospital, darkMode }) {

    return (

        <div className="card"
            style={{
                 background: darkMode ? "#1f1f1f" : "white",
                 color: darkMode ? "white" : "black",
                 borderRadius: "12px",
                 padding: "20px",
                 boxShadow: "0 5px 15px rgba(0,0,0,.15)",
                 border: darkMode ? "1px solid #444" : "1px solid #ddd",
            }}
            
        >

            <h2>{hospital.business_name}</h2>

            <p><b>🏙 City:</b> {hospital.city}</p>

            <p><b>📍 Address:</b> {hospital.address}</p>

            <p><b>📞 Phone:</b> {hospital.phone}</p>

            <p><b>⭐ Rating:</b> {hospital.rating}</p>

            <p><b>📝 Reviews:</b> {hospital.reviews}</p>

            <p><b>🌐 Source:</b> {hospital.source}</p>

        </div>

    );

}

export default HospitalCard;