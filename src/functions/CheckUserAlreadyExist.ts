import { GetUser } from "../services/getServices";

const CheckUserAlreadyExist = async (wa_id: string) => {
  const users = await GetUser();

  const CheckDb = () => {
    if (users.length > 0) {
      const user = users.map((u: any) => u.wa_id);

      if (user.indexOf(wa_id) > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return CheckDb;
};

export { CheckUserAlreadyExist };
