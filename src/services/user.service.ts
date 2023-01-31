import db from "./db.service";
import helper from "../utils/helper.util";


async function get(): Promise<{data: User[]}> {
  const rows = await db.getUsers();
  const data = helper.emptyOrRows(rows);
  return {data}
}


export default { get };
