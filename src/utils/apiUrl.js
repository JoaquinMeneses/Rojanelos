let apiUrl = "http://localhost:8080";

if (process.env.NODE_ENV === "production") {
  apiUrl = "https://pixels-tools-back.onrender.com";
}

export { apiUrl };
