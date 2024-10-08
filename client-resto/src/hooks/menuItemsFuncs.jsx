import { useState, useEffect } from 'react';
import customAxios from '../config/axios';
import { toast } from 'react-toastify';

export const useMenuItems = (onCloseModal) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [currentItem, setCurrentItem] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    category_id: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch menu items and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuItemsResponse = await customAxios.get('/menu-items');
        const categoriesResponse = await customAxios.get('/categories');
        setData(menuItemsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, []);

  // Map category IDs to names for easier access
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormValues({
      name: item.name,
      description: item.description,
      price: item.price,
      category_id: item.category_id
    });
  };

  const handleCreate = () => {
    setFormValues({
      name: '',
      description: '',
      price: '',
      category_id: ''
    });
    setCurrentItem(null);
  };

  const handleDelete = async (id) => {
    try {
      await customAxios.delete(`/menu-items/${id}`);
      setData(data.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Error deleting item');
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
    if (!formValues.description) newErrors.description = 'Description is required';
    if (!formValues.price) newErrors.price = 'Price is required';
    if (!formValues.category_id) newErrors.category_id = 'Category ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        if (currentItem) {
          await customAxios.put(`/menu-items/${currentItem.id}`, formValues);
          setData(data.map(item => item.id === currentItem.id ? { ...item, ...formValues } : item));
          toast.success('Item updated successfully');
        } else {
          await customAxios.post('/menu-items', formValues);
          setData([...data, { ...formValues, id: Date.now() }]);
          toast.success('Item created successfully');
        }
        onCloseModal();
      } catch (error) {
        console.error('Error saving item:', error);
        toast.error('Error saving item');
      }
    }
  };

  return {
    data: data.map(item => ({
      ...item,
      category_name: categoryMap[item.category_id] || 'Unknown', // Add category name to data
    })),
    categories,
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
