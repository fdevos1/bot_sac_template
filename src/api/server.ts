import axios from "axios";

const url = "https://crud-bot-canoas.herokuapp.com";

const api = axios.create({
  baseURL: url,
});

export { api };
