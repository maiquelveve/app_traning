export const destructureUserToLocalStorage = (user: IUserAuth): {
  userAuthLocalStorage: IUserAuthLocalStorageData
  profilesLocalStorage: IProfilesLocalStorageData
}  => {

  const userAuthLocalStorage: IUserAuthLocalStorageData = {
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url,
    avatar_filename: user.avatar_filename
  };

  const profilesLocalStorage = analyzeAuthenticatedUserProfiles(user.profiles);

  return { userAuthLocalStorage, profilesLocalStorage };
};

const analyzeAuthenticatedUserProfiles = (profiles: IUserPofile[]): IProfilesLocalStorageData => {
  let isUserProfiles = false;
  let isTrainerProfiles = false;
  let isRootProfiles = false;

  profiles.map((profile) => {
    switch (profile.user_profile.code) {
    case "R":
      isRootProfiles = true;
      break;
    
    case "T":
      isTrainerProfiles = true;
      break;
      
    case "U":
      isUserProfiles = true;
      break;
    }
  });

  return {
    isUserProfiles,
    isTrainerProfiles,
    isRootProfiles,
  };
};
