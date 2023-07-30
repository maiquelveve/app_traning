import { analysisProfiles } from "..";
import { menusGeneric, menusRoot, menusTrainer, menusUser, menusUnauthenticated } from "../../config";

/* eslint-disable indent */
export const getSidebarMenus = ({ usersProfiles }: IAnalysisProfilesProps): ISidebarMenus[] => {
  
  const profilesCurrent = analysisProfiles({ usersProfiles });

  let menus = menusGeneric;

  if(profilesCurrent.isUserProfiles) {
    menus = [...menus, ...menusUser];
  }

  if(profilesCurrent.isTrainerProfiles) {
    menus = [...menus, ...menusTrainer];
  }

  if(profilesCurrent.isRootProfiles) {
    menus = [...menus, ...menusRoot];
  }

  if(!profilesCurrent.isUserProfiles && !profilesCurrent.isTrainerProfiles && !profilesCurrent.isRootProfiles) {
    menus = [...menus, ...menusUnauthenticated];
  }
  
  return menus;
};
