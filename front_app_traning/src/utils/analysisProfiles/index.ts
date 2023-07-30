/* eslint-disable indent */
export const analysisProfiles = ({ usersProfiles }: IAnalysisProfilesProps): IAnalysisProfilesReturn => {
  
  let isUserProfiles = false;
  let isTrainerProfiles = false;
  let isRootProfiles = false;
  
  usersProfiles.map((userProfile) => {
    switch (userProfile.user_profile.code) {
      case "U":
        isUserProfiles = true;
        break;
      case "T":
        isTrainerProfiles = true;
        break;
      case "R":
        isRootProfiles = true;
        break;
    }
  });
  
  return {
    isUserProfiles,
    isTrainerProfiles,
    isRootProfiles,
  };
};
