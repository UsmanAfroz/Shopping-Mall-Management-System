import { Request, Response } from 'express';
import { addFloor, floors, deleteFloor } from '../services/floor_Service';

export const getFloors = async (req: Request, res: Response) => {
  try {
    const floorData = await floors();
    return res.send({ statusCode: 200, data: floorData });
  } catch (err: any) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const createFloor = async (req: Request, res: Response) => {
  const floorData = req.body;
  try {
    const floor = await addFloor(floorData);
    return res.send({ statusCode: 200, data: floor });
  } catch (err: any) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};

export const delFloor = async (req: Request, res: Response) => {
  const id: any = req.query.id;
  if (!id) {
    return res.send({ message: 'ID is required in parameters', statusCode: 500 });
  }
  try {
    await deleteFloor(id);
    return res.send({ message: 'Floor deleted successfully', statsCode: 200 });
  } catch (err: any) {
    return res.send({ statusCode: 500, message: err?.message });
  }
};
