import { Request, Response } from "express";

import { Profile, User, UsersProfiles } from "../../models";

import { RETURNED_API_ERRORS, RETURNED_API_ERRORS_500, RETURNED_API_SUCCESS } from "../../returnsRequests";
import { decryptPassword, generateToken } from "../../helpers";

export const login = async (req: Request<object, object, IUserLogin>, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    
    const userAuth = await User.findOne({ where: { email }, include: [
      { 
        model: UsersProfiles, 
        as: "user_profile",  
        attributes: { exclude: ["user_id", "profile_id"] },
        include: [
          { 
            model: Profile, 
            as: "profiles", 
            attributes: { exclude: ["id"] },
          }
        ]
      },
    ] });

    if(!userAuth) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email ou senha invalidos."] }));
    }

    if(!await decryptPassword({ passwordHashDB: userAuth.password, passwordUser: password.trim() })) {
      return res.status(400).json(RETURNED_API_ERRORS({ errors: ["Email ou senha invalidos."] }));
    }

    return res.status(200).json(
      RETURNED_API_SUCCESS({ 
        data: [{ 
          user: userAuth,
          token: generateToken({ id: userAuth.id })
        }], 
        messageSuccess: "" 
      })
    );

  } catch (error) {
    console.log(error);
    return res.status(500).json(RETURNED_API_ERRORS_500());
  }
};
