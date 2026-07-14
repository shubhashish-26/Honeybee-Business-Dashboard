import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function SourceChart({ hospitals,darkMode }) {

    const sourceCount = {};

    hospitals.forEach((hospital) => {

        const source = hospital.source || "Unknown";

        sourceCount[source] =
            (sourceCount[source] || 0) + 1;

    });

    const data = Object.keys(sourceCount).map((source) => ({

        name: source,
        value: sourceCount[source]

    }));

    const COLORS = [
        "#4CAF50",
        "#2196F3",
        "#FF9800",
        "#E91E63",
        "#9C27B0",
        "#009688"
    ];

    return (

        <div
            style={{
                width: "100%",
                height: "420px",
                marginTop: "30px",
                background: "#fff",
                borderRadius: "12px",
                padding: "15px"
               
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

                    <Tooltip
                        contentStyle={{
                             background: darkMode ? "#222" : "#fff",
                             color: darkMode ? "#fff" : "#000"
                        }}
                             />

                    <Legend
                        wrapperStyle={{
                            color: darkMode ? "white" : 
                            "black"
                        }}
                    />

                </PieChart>

            </ResponsiveContainer>
        </div>
    );
}

export default SourceChart;