import { api } from "../api/server";

const GetUser = async () => {
  try {
    const response = await api.get("/users");

    return response.data;
  } catch (err) {
    console.log(err);

    return err;
  }
};

export { GetUser };
