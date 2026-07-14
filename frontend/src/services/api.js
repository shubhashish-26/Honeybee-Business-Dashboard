const API_URL = "https://mohanty95.pythonanywhere.com";

export async function getHospitals() {
  const response = await fetch(`${API_URL}/hospitals`);
  return await response.json();
}

export async function getStats() {
  const response = await fetch(`${API_URL}/stats`);
  return await response.json();
}