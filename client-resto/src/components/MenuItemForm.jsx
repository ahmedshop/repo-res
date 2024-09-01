import React from 'react';

const MenuItemForm = ({ isOpen, formValues, errors, handleInputChange, handleSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{formValues.id ? 'Edit Item' : 'Create New Item'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category ID</label>
          <input
            type="text"
            name="category_id"
            value={formValues.category_id}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
          {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {formValues.id ? 'Save' : 'Create'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemForm;
