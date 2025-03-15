import axios from "axios";


const FIREBASE_URL = "https://midlalafo-default-rtdb.europe-west1.firebasedatabase.app/";

// 🔹 Создаем экземпляр axios с базовым URL
const api = axios.create({
    baseURL: FIREBASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;