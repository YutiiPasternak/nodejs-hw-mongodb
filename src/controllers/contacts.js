import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContacts = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const {
      sortBy = 'name',
      sortOrder = 'asc',
      isFavourite,
      contactType,
    } = req.query;
    const userId = req.user._id;

    const allowedSortFields = ['name', 'email', 'phoneNumber'];
    const allowedSortOrders = ['asc', 'desc'];

    if (!allowedSortFields.includes(sortBy)) {
      throw createHttpError(400, `Invalid sortBy field: ${sortBy}`);
    }

    if (!allowedSortOrders.includes(sortOrder)) {
      throw createHttpError(400, `Invalid sortOrder value: ${sortOrder}`);
    }

    const filter = {};
    if (isFavourite !== undefined) {
      filter.isFavourite = isFavourite === 'true';
    }
    if (contactType) {
      filter.type = contactType;
    }

    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId,
      filter,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await getContactById(contactId, userId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const userId = req.user._id;

    if (!name || !phoneNumber || !contactType) {
      throw createHttpError(
        400,
        'Missing required fields: name, phoneNumber, contactType',
      );
    }

    const contact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite: isFavourite || false,
      contactType,
      userId,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;
    const userId = req.user._id;

    if (Object.keys(updateData).length === 0) {
      throw createHttpError(400, 'No fields provided for update');
    }

    const result = await updateContact(contactId, userId, updateData);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated contact!',
      data: result.contact || result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await deleteContact(contactId, userId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
