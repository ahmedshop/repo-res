import React, { useState } from 'react';
import DataTable from '../../components/dataTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCategories } from '../../hooks/categoriesFuncs'; 
import CategoryForm from '../../components/CategoriesForm';

const CategoriesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  const {
    data,
    currentCategory,
    formValues,
    errors,
    handleEdit,
    handleCreate,
    handleDelete,
    handleInputChange,
    validateForm,
    handleSave
  } = useCategories(handleCloseModal);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => {
          handleCreate();
          setIsCreateModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Category
      </button>
      <DataTable
        columns={[
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Restaurant ID',
            accessor: 'restaurant_id',
          },
          {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
              <div className="flex space-x-2">
                <button 
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    handleEdit(row.original);
                    setIsEditModalOpen(true);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(row.original.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ),
          }
        ]}
        data={data}
      />
      <ToastContainer />

      <CategoryForm
        isOpen={isCreateModalOpen || isEditModalOpen}
        formValues={formValues}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CategoriesPage;
