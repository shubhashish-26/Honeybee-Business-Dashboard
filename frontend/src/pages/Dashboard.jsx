


import Footer from "../components/Footer";
import "../styles/Dashboard.css";
import { toast } from "react-toastify";
import DashboardSection from "../components/DashboardSection";
import DashboardHeader from "../components/DashboardHeader";
import Loading from "../components/Loading";
import NoResult from "../components/NoResult";
import ExportButton from "../components/ExportButton";import TopHospitals from "../components/TopHospitals";
import SourceChart from "../components/SourceChart";import RatingChart from "../components/RatingChart";
import CityChart from "../components/CityChart";
import SearchBar from "../components/SearchBar";
import HospitalCard from "../components/HospitalCard";
import StatsCards from "../components/StatsCards";
import { useEffect, useState } from "react";
import { getHospitals, getStats } from "../services/api";
import ExportPDF from "../components/ExportPDF";
function Dashboard() {
    

    const [loading, setLoading] = useState(true);

    const [hospitals, setHospitals] = useState([]);
    const [stats, setStats] = useState({});

    const [search, setSearch] = useState("");
    const [city, setCity] = useState("All");
    const [darkMode, setDarkMode] = useState(false);

    const [rating, setRating] = useState("All");
    const [sortBy, setSortBy] = useState("Default");

    const [currentPage, setCurrentPage] = useState(1);
    const hospitalsPerPage = 5;
    useEffect(() => {
        loadData();
    }, []);

     async function loadData() {

        try {
            // Loading Start
            setLoading(true);

            // Fetch Hospitals
            const hospitalData = await getHospitals();
            setHospitals(hospitalData);
            // Fetch Statistics
            const statsData = await getStats();
            setStats(statsData);
        } catch (error) {
            console.error(error);
            toast.error("Unable to load hospitals.");
        } finally {
        // Loading End
            setLoading(false);
        }

    }

    // =====================
    // Cities
    // =====================

    const cities = [
        "All",
        ...new Set(
            hospitals
                .map((hospital) => hospital.city)
                .filter(Boolean)
        )
    ];

    // =====================
    // Filter + Search + Sort
    // =====================

    const filteredHospitals = hospitals

        .filter((hospital) => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                hospital.business_name?.toLowerCase().includes(keyword) ||

                hospital.city?.toLowerCase().includes(keyword) ||

                hospital.address?.toLowerCase().includes(keyword);

            const matchesCity =
                city === "All" || hospital.city === city;

            const matchesRating =
                rating === "All" ||
                Number(hospital.rating) >= Number(rating);
             

    

            return (
                matchesSearch &&
                matchesCity &&
                matchesRating
            );

        })

        .sort((a, b) => {

            if (sortBy === "High") {

                return Number(b.rating) - Number(a.rating);

            }

            if (sortBy === "Low") {

                return Number(a.rating) - Number(b.rating);

            }

            if (sortBy === "AZ") {

                return a.business_name.localeCompare(b.business_name);

            }

            if (sortBy === "ZA") {

                return b.business_name.localeCompare(a.business_name);

            }

            return 0;

        });

    // =====================
    // Pagination
    // =====================
 
    const indexOfLastHospital =
        currentPage * hospitalsPerPage;

    const indexOfFirstHospital =
        indexOfLastHospital - hospitalsPerPage;

    const currentHospitals =
        filteredHospitals.slice(
            indexOfFirstHospital,
            indexOfLastHospital
        );
    const totalPages =
        Math.ceil(
            filteredHospitals.length /
            hospitalsPerPage
        );
    if (loading) {
        return <Loading />;
}
    

    // =====================
    // UI
    // =====================

    return (

        <div id="dashboard"
            className="dashboard"
            style={{
                background: darkMode ? "#121212" : "#f4f7fb",
                color: darkMode ? "white" : "black",
                minHeight: "100vh",
                transition: "0.4s"
            }}
        >
            
            <DashboardHeader
              
              darkMode={darkMode} 
              setDarkMode={setDarkMode}
             />

            <SearchBar

                search={search}
                setSearch={setSearch}

                city={city}
                setCity={setCity}

                cities={cities}

                rating={rating}
                setRating={setRating}

                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <h3>Total Hospitals : {filteredHospitals.length}</h3>

            <StatsCards stats={stats} />
            <hr />
            {currentHospitals.length === 0 ? (
    <NoResult />
) : (
    currentHospitals.map((hospital) => (
        <HospitalCard
            key={hospital.id}
            hospital={hospital}
        />
    ))
)}
             
            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px"
                }}           >
                <button
                    disabled={currentPage === 1}

                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                >
                    ◀ Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    
                >
                    ▶ Next                   
                </button>
                
            </div>
        <DashboardSection title="📊 Hospitals by City">

            <CityChart hospitals={filteredHospitals} />
        </DashboardSection>

        <DashboardSection title="⭐ Rating Distribution">               
            <RatingChart hospitals={filteredHospitals} />
        </DashboardSection>

        <DashboardSection title="🌐 Hospital Sources"> 
            <SourceChart hospitals={filteredHospitals} />
        </DashboardSection>

        <DashboardSection title="🏆 Top Rated Hospitals">
             <TopHospitals hospitals={filteredHospitals}
              darkMode={darkMode} />
        </DashboardSection>

        <ExportButton hospitals={filteredHospitals} />
        <ExportPDF />
        </div>
        
    );
    
}
<Footer/>
export default Dashboard;