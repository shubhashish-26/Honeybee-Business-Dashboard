function TopHospitals({ hospitals, darkMode }){

    const topHospitals = [...hospitals]
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 5);

    return (

        <div
            style={{
                marginTop: "40px"
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px"
                }}
            >
                <thead>
                    <tr
                        style={{
                            background: "#2196F3",
                            color: "white"
                        }}
                    >
                        <th style={{ padding: "12px" }}>Hospital</th>

                        <th>City</th>

                        <th>Rating</th>

                        <th>Reviews</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        topHospitals.map((hospital) => (

                            <tr
                                key={hospital.id}
                                style={{
                                    textAlign: "center",
                                    borderBottom: "1px solid lightgray"
                                }}
                            >
                                <td style={{color: "black"}}>
                                    {hospital.business_name}
                                </td>

                                <td  style={{ color: darkMode ? "white" : "black" }}>
                                    {hospital.city}
                                </td>

                                <td style={{ color: darkMode ? "white" : "black" }}>
                                    ⭐ {hospital.rating}
                                </td>

                                <td style={{ color: darkMode ? "white" : "black" }}>
                                    {hospital.reviews}
                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );
}
export default TopHospitals;