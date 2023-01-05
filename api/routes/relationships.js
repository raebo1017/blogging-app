import express from "express";
import { getRelationships, addRelationship, deleteRelationship } from "../controller/relationship.js";

const relationshipRouter = express.Router();

relationshipRouter.get("/", getRelationships)
relationshipRouter.post("/", addRelationship)
relationshipRouter.delete("/", deleteRelationship)

export default relationshipRouter