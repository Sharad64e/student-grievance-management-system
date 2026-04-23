import Grievance from '../models/Grievance.js';

export const createGrievance = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      res.status(400);
      throw new Error('Title, category, and description are required.');
    }

    const grievance = await Grievance.create({
      student: req.user._id,
      title,
      category,
      description
    });

    res.status(201).json(grievance);
  } catch (error) {
    next(error);
  }
};

export const getGrievances = async (req, res, next) => {
  try {
    const search = req.query.search?.trim();
    const query = { student: req.user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } }
      ];
    }

    const grievances = await Grievance.find(query).sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    next(error);
  }
};

export const getGrievanceById = async (req, res, next) => {
  try {
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      student: req.user._id
    });

    if (!grievance) {
      res.status(404);
      throw new Error('Grievance not found.');
    }

    res.json(grievance);
  } catch (error) {
    next(error);
  }
};

export const updateGrievance = async (req, res, next) => {
  try {
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      student: req.user._id
    });

    if (!grievance) {
      res.status(404);
      throw new Error('Grievance not found or unauthorized access.');
    }

    grievance.title = req.body.title ?? grievance.title;
    grievance.category = req.body.category ?? grievance.category;
    grievance.description = req.body.description ?? grievance.description;
    grievance.status = req.body.status ?? grievance.status;

    const updatedGrievance = await grievance.save();
    res.json(updatedGrievance);
  } catch (error) {
    next(error);
  }
};

export const deleteGrievance = async (req, res, next) => {
  try {
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      student: req.user._id
    });

    if (!grievance) {
      res.status(404);
      throw new Error('Grievance not found or unauthorized access.');
    }

    await grievance.deleteOne();
    res.json({ message: 'Grievance deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
