import { Router } from "express";
import UserController from "./controllers/UserController";

export const routes = Router();

routes.get("/", (req, res) => {
  return res.send("estou no arquivo routes");
});
routes.get("/users", UserController.index);
routes.post("/users", UserController.create);

// export default routes;
