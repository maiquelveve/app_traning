import { Request, Response } from "express";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { Modality, ModalityType } from "../../models";

export const getAllModelities = async (
  req: Request<object, object, object, IQueryPagination>, 
  res: Response
): Promise<Response> => {

  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : 10;

    const { count, rows} = await Modality.findAndCountAll({
      attributes: { exclude: ["modality_type_id"]},
      include: [{
        as: "modalityType",
        attributes: { exclude: ["id"]},
        model: ModalityType,
      }],
      offset: (page - 1) * perPage,
      limit: perPage
    });

    const data = [{
      modalities: rows,
      totalResults: count,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
    }];
    
    return res.status(200).json(RETURNED_API_SUCCESS({ data, messageSuccess: "" }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};