import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function CityChart({ hospitals }) {

    const cityCount = {};

    hospitals.forEach((hospital) => {

        cityCount[hospital.city] =
            (cityCount[hospital.city] || 0) + 1;

    });

    const data = Object.keys(cityCount).map((city) => ({

        city,

        hospitals: cityCount[city]

    }));

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

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="city" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="hospitals"
                        fill="#2196F3"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default CityChart;