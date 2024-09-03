import { useState, useEffect } from 'react';
import customAxios from '../config/axios';
import { toast } from 'react-toastify';

export const useCategories = (onCloseModal) => {
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [formValues, setFormValues] = useState({
    name: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get('/categories');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormValues({
      name: item.name
    });
  };

  const handleCreate = () => {
    setFormValues({
      name: ''
    });
    setCurrentItem(null);
  };

  const handleDelete = async (id) => {
    try {
      await customAxios.delete(`/categories/${id}`);
      setData(data.filter(item => item.id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (currentItem) {
          await customAxios.put(`/categories/${currentItem.id}`, formValues);
          setData(data.map(item => item.id === currentItem.id ? { ...item, ...formValues } : item));
          toast.success('Category updated successfully');
        } else {
          await customAxios.post('/categories', formValues);
          setData([...data, { ...formValues, id: Date.now() }]);
          toast.success('Category created successfully');
        }
        onCloseModal();
      } catch (error) {
        console.error('Error saving category:', error);
        toast.error('Error saving category');
      }
    }
  };

  return {
    data,
    currentItem,
    formValues,
    errors,
    handleEdit,
    handleCreate,
    handleDelete,
    handleInputChange,
    validateForm,
    handleSave
  };
};
