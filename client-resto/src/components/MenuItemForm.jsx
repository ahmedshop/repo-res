import React from 'react';

const MenuItemForm = ({ isOpen, formValues, errors, handleInputChange, handleSave, onClose, categories }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="bg-white p-6 rounded shadow-lg w-96 relative z-10">
        <h2 className="text-xl font-semibold mb-4">
          {formValues.id ? 'Edit Item' : 'Create New Item'}
        </h2>
        <form>
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
              type="text"
              name="price"
              value={formValues.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category_id"
              value={formValues.category_id}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemForm;
