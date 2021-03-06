import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// console.log(process.env);

axios.interceptors.request.use((config) => {
  if (config.headers.Authorization) return config;
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// axios.interceptors.response.use(
//   (res) => res,
//   (er) => {
//     console.log(er.response.data);
//   }
// );

const api = {
  login: (data) => axios.post("/login", data),
  register: (data) => axios.post("/register", data),
  createListing: (data) => axios.post("/listings", data),
  getListings: () => axios.get("/listings"),
  getListing: (id) => axios.get(`/listings/${id}`),
  getListingsByPage: (page) => axios.get(`/listings/page/${page}`),
  deleteListing: (id) => axios.delete(`/listings/${id}`),
  getProfile: () => axios.get("/me"),
  getUserData: () => axios.get("/user"),
  purchaseListing: (id) => axios.post(`/listings/purchase/${id}/`),
  updateListing: ({ id, ...data }) => {
    return axios.put(`/listings/${id}`, data);
  },
  uploadImageToCloudinary: (data) => {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    return fetch("https://api.cloudinary.com/v1_1/rohith/image/upload", {
      body: formData,
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => res.secure_url);
  },
};

export default api;
