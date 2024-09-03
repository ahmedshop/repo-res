import React from 'react';

const CategoryForm = ({ isOpen, formValues, errors, handleInputChange, handleSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="bg-white p-6 rounded shadow-lg w-96 relative z-10">
        <h2 className="text-xl font-semibold mb-4">
          {formValues.id ? 'Edit Category' : 'Create New Category'}
        </h2>
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
          <label className="block text-gray-700">Restaurant ID</label>
          <input
            type="text"
            name="restaurant_id"
            value={formValues.restaurant_id}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
          {errors.restaurant_id && <p className="text-red-500 text-sm">{errors.restaurant_id}</p>}
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

export default CategoryForm;
