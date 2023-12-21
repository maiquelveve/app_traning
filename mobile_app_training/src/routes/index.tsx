import { useAuthUserContext } from "@src/context/AuthUserContext";
import { StackRoutes } from "@src/routes/stacksRoutes/stack.routes";
import { Spinner } from "native-base";

export const Routes = () => {
  const { loadingAuthContext } = useAuthUserContext();
  return(
    <>
      {loadingAuthContext ? <Spinner /> : <StackRoutes />}
    </>
  );
};
