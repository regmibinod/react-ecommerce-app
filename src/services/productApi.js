import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);

  return response.data;
};

let names = [
  { id: 1,  networth: 100, quntity:1, age: 10, name: "Binod" },
  { id: 2,  networth: 200, quntity:2, age: 20, name: "Roshan" },
  { id: 3,  networth: 300, quntity:3, age: 30, name: "Sudarshan" },
  { id: 4,  networth: 400, quntity:4, age: 40, name: "Dipendra" },
];


const total = names.reduce((total, item)=>{
    return  total + item.networth;
}, 0)

