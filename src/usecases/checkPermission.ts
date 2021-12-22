import { Ports } from "~/adapter";
import { getUser } from "./getUser";

export const checkPermission = async (ports: Ports) => {
  try {
    const user = await getUser(ports);
    return user.permission;
  } catch (e) {
    throw e;
  }
};
