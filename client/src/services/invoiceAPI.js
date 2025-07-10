import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchClients = async () => {
  const res = await axios.get(`${BASE_URL}/clients`);
  return res.data;
};

export const createClient = async (clientData) => {
  const res = await axios.post(`${BASE_URL}/clients`, clientData);
  return res.data;
};

// (Optional for later) Add update/delete here if needed
