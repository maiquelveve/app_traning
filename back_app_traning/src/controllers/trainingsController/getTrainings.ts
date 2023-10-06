import { Request, Response } from "express";
import { Modality, Training, TrainingDetail, User } from "../../models";
import { operatorsDB } from "../../helpers";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS, RETURNED_API_ERRORS } from "../../returnsRequests";

export const getTrainings = async (
  req: Request<object, object, object, IQueryPagination & ITrainingsQueryFilter>, 
  res: Response
): Promise<Response> => {

  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : 10;

    let where = {};
    if(req.query.modality_id) {
      where = { ...where, modality_id: parseInt(req.query.modality_id) };
    }

    if(req.query.trainingSearch) {
      where = { ...where,  modality: { [operatorsDB.substring]: req.query.trainingSearch } };
    }

    if(req.query.tagSearch) {
      where = { ...where,  tag: { [operatorsDB.substring]: req.query.tagSearch } };
    }

    if(page === 0 || perPage === 0) {
      return res.status(404).json(RETURNED_API_ERRORS({ errors: ["Erro nos atributos para realizar a páginação da consulta."] }));
    }

    const { count, rows } = await Training.findAndCountAll({
      where,
      include: [
        {model: User, as: "trainer"},
        {model: Modality, as: "modality"},
        {model: TrainingDetail, as: "trainingDetails"},
      ],
      offset: (page - 1) * perPage,
      limit: perPage
    });

    const data = [{
      trainings: rows,
      totalResults: count,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
    }];
    
    return res.status(200).json(RETURNED_API_SUCCESS({ data, messageSuccess: "" }));

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
