import { Request, Response } from "express";

import { RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { Profile, User, UsersProfiles } from "../../models";

export const getUserByToken = async (req: Request<object, object, IBodyAuth>, res: Response): Promise<Response> => {
  try {
    const { auth_user_id } = req.body;
    
    const userAuth = await User.findByPk(auth_user_id, { 
      include: [
        { 
          model: UsersProfiles, 
          as: "profiles",  
          attributes: { exclude: ["user_id", "profile_id"] },
          include: [
            { 
              model: Profile, 
              as: "user_profile", 
              attributes: { exclude: ["id"] },
            }
          ]
        },
      ] 
    });
    
    return res.status(200).json(
      RETURNED_API_SUCCESS({ 
        data: [{ 
          user: userAuth,
        }], 
        messageSuccess: "" 
      })
    );

  } catch (error) {
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
