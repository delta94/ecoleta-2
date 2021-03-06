import express from "express";
import { celebrate, Segments, Joi } from "celebrate";

import multer from "multer";
import multerConfig from "./config/multer";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

//index, show, create, update, delete
routes.get("/items", itemsController.index);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);
export default routes;
