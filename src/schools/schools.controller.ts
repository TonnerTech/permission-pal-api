import express, { Request, Response } from "express";
import permissionsService from "../middlewares/permissions.service";
import schoolsService from "./schools.service";
import { ISchool } from "./schools.types";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let foundSchools;
    if (req.query.name) {
      foundSchools = await schoolsService.findByName(req.query.name.toString());
    } else {
      foundSchools = await schoolsService.find();
    }
    const serializedSchools = foundSchools.map((school: ISchool) => schoolsService.serializeSchool(school));
    res.status(200).json(serializedSchools);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const school = await schoolsService.findById(+req.params.id);
    if (!school) res.status(404).json({ message: `School with the id ${req.params.id} not found` });
    res.status(200).json(schoolsService.serializeSchool(school));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", permissionsService.schoolAdmin, async (req: Record<string, any>, res: Response) => {
  try {
    const school = await schoolsService.findById(+req.params.id);
    if (school.school_admin_id !== +req.userId || !req.superAdmin) {
      res.status(403).json({ message: `User is not the admin for ${school.name}` });
    }
    const updatedSchool = await schoolsService.update(+req.params.id, req.body);
    res.status(201).json(schoolsService.serializeSchool(updatedSchool));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", permissionsService.schoolAdmin, async (req: Record<string, any>, res: Response) => {
  try {
    const school = await schoolsService.findById(+req.params.id);
    if (school.school_admin_id !== +req.userId || !req.superAdmin) {
      res.status(403).json({ message: `User is not the admin for ${school.name}` });
    }
    const removed = await schoolsService.remove(+req.params.id);
    res.status(203).json(removed);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
