import type { NextApiRequest, NextApiResponse } from "next";
import { fetchFontFamily } from "../../lib/client";
import { RequestData, ResponseData } from "../../types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const { url } = req.query as RequestData;
    const siteUrl = new URL(url);
    const result = await fetchFontFamily(siteUrl.href);
    res.setHeader("Cache-Control", "max-age=0, s-maxage=86400");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).write("Error");
  }
};
