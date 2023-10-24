import { Request, Response } from "express";
import { Modality, Training } from "../../models";
import { operatorsDB } from "../../helpers";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS, RETURNED_API_ERRORS } from "../../returnsRequests";

export const getTrainings = async (
  req: Request<object, object, IBodyAuth, IQueryPagination & ITrainingsQueryFilter>, 
  res: Response
): Promise<Response> => {

  try {
    const { auth_user_id } = req.body;

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage as string) : 10;

    let where: any = { user_trainer_id: auth_user_id };
    if(req.query.modality_id) {
      where = { ...where, modality_id: parseInt(req.query.modality_id) };
    }

    if(req.query.trainingSearch) {
      where = { 
        ...where,  
        [operatorsDB.or]: {
          training: { [operatorsDB.substring]: req.query.trainingSearch },
          tag: { [operatorsDB.substring]: req.query.trainingSearch }
        }
      };
    }

    if(page === 0 || perPage === 0) {
      return res.status(404).json(RETURNED_API_ERRORS({ errors: ["Erro nos atributos para realizar a páginação da consulta."] }));
    }

    const { count, rows } = await Training.findAndCountAll({
      where,
      include: [
        { model: Modality, as: "modality", attributes: { exclude: ["id", "modality_type_id"] } },
      ],
      attributes: { exclude: ["video_url", "modality_id", "user_trainer_id"] },
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
