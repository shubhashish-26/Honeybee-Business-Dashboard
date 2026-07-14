const API_URL = "https://mohanty95.pythonanywhere.com";

export async function getHospitals() {

    const response = await fetch(`${API}/hospitals`);

    return await response.json();

}
export async function getStats() {

    const response = await fetch(`${API}/stats`);

    return await response.json();

}