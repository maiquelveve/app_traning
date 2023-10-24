import { Request, Response } from "express";
import { Modality, ModalityType } from "../../models";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS, RETURNED_API_ERRORS } from "../../returnsRequests";

export const getModelitiesTraining = async (
  req: Request<object, object, object, IQueryPagination>, 
  res: Response
): Promise<Response> => {

  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : 10;

    if(page === 0 || perPage === 0) {
      return res.status(404).json(RETURNED_API_ERRORS({ errors: ["Erro nos atributos para realizar a páginação da consulta."] }));
    }

    const { count, rows } = await Modality.findAndCountAll({
      where: { modality_type_id: process.env.MODALITY_TYPE_TRAININGS_ID },
      attributes: { exclude: ["modality_type_id"]},
      include: [{
        as: "modalityType",
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
