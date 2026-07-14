import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

function RatingChart({ hospitals }) {

    const ratingCount = {};

    hospitals.forEach((hospital) => {

        const rating = Math.floor(Number(hospital.rating));

        ratingCount[rating] = (ratingCount[rating] || 0) + 1;

    });

    const data = Object.keys(ratingCount).map((rating) => ({

        name: `${rating} ⭐`,

        value: ratingCount[rating]

    }));

    const COLORS = [
        "#4CAF50",
        "#2196F3",
        "#FFC107",
        "#FF5722",
        "#9C27B0"
    ];

    return (

        <div
            style={{
                width: "100%",
                height: "420px",
                marginTop: "30px",
                background: "#fff",
                borderRadius: "12px",
                
               
            }}
        >           
            <ResponsiveContainer>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={130}
                        label
                    >

                        {

                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index % COLORS.length
                                        ]
                                    }
                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RatingChart;