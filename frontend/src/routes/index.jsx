import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import Chat from "../pages/Chat";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: ":chatId",
    element: <Chat />,
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);

export default router;
