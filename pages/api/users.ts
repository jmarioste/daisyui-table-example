// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { Person } from "../../types/Person";
import data from "../../users.json";
type Data = Person[];

type SortOrder = "asc" | "desc";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const sort_by = query.sort_by as string | null;
  const sort_order = (query.sort_order || "asc") as SortOrder;
  let _data = data;
  if (sort_by) {
    _data = _.orderBy(data, [sort_by], [sort_order]);
  }
  res.status(200).json(_data);
}
