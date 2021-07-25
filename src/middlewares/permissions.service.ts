import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import rolesService from "../roles/roles.service";
import usersService from "../users/users.service";

const superAdmin = async (req: Record<string, any>, res: Response, next: NextFunction) => {
  const payload = jwt.decode(req.headers.authorization, { json: true });
  if (payload?.userId) {
    const user = await usersService.findById(payload.userId);
    const role = await rolesService.findById(user.role_id);
    if (role.permission_level > 100) {
      res.status(403).json({ message: "User does not have permission." });
    } else {
      req.superAdmin = true;
      next();
    }
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};

const schoolAdmin = async (req: Record<string, any>, res: Response, next: NextFunction) => {
  const payload = jwt.decode(req.headers.authorization, { json: true });
  if (payload?.userId) {
    const user = await usersService.findById(payload.userId);
    const role = await rolesService.findById(user.role_id);
    if (role.permission_level > 200) {
      res.status(403).json({ message: "User does not have permission." });
    } else {
      req.schoolAdmin = true;
      next();
    }
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};

const teacherRole = async (req: Record<string, any>, res: Response, next: NextFunction) => {
  const payload = jwt.decode(req.headers.authorization, { json: true });
  if (payload?.userId) {
    const user = await usersService.findById(payload.userId);
    const role = await rolesService.findById(user.role_id);
    if (role.permission_level > 300) {
      res.status(403).json({ message: "User does not have permission." });
    } else {
      req.teacher = true;
      next();
    }
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};

const parentRole = async (req: Record<string, any>, res: Response, next: NextFunction) => {
  const payload = jwt.decode(req.headers.authorization, { json: true });
  if (payload?.userId) {
    const user = await usersService.findById(payload.userId);
    const role = await rolesService.findById(user.role_id);
    if (role.permission_level > 400) {
      res.status(403).json({ message: "User does not have permission." });
    } else {
      req.parent = true;
      next();
    }
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default {
  superAdmin,
  schoolAdmin,
  teacherRole,
  parentRole,
};
