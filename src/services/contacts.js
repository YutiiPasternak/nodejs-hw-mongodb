import { Contact } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
) => {
  const skip = (page - 1) * perPage;

  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const [contacts, totalItems] = await Promise.all([
    Contact.find().sort(sort).skip(skip).limit(perPage),
    Contact.countDocuments(),
  ]);

  const pagination = calculatePaginationData({
    totalItems,
    currentPage: page,
    perPage,
  });

  return {
    data: contacts,
    ...pagination,
  };
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
