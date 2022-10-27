import { api } from "../api/server";

const CreateUser = async (data: any) => {
  try {
    const response = await api.post("/create-user", data);

    return response.data;
  } catch (err) {
    console.log(err);

    return err;
  }
};

export { CreateUser };
