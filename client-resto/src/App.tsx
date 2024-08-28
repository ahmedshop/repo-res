import { useState } from 'react';
import './index.css'

function App() {
  const [items] = useState([
    {
      category: 'Appetizers',
      dishes: [
        { name: 'Bruschetta', description: 'Grilled bread with tomatoes', price: '$5.99', image: 'https://via.placeholder.com/150' },
        { name: 'Stuffed Mushrooms', description: 'Mushrooms filled with cheese', price: '$7.99', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      category: 'Main Courses',
      dishes: [
        { name: 'Grilled Chicken', description: 'Served with vegetables', price: '$12.99', image: 'https://via.placeholder.com/150' },
        { name: 'Pasta Carbonara', description: 'Classic Italian pasta', price: '$10.99', image: 'https://via.placeholder.com/150' },
      ],
    },
    {
      category: 'Desserts',
      dishes: [
        { name: 'Cheesecake', description: 'Creamy cheesecake with a graham crust', price: '$6.99', image: 'https://via.placeholder.com/150' },
        { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', price: '$7.99', image: 'https://via.placeholder.com/150' },
      ],
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Restaurant Menu</h1>
      {items.map((category, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">{category.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {category.dishes.map((dish, dishIndex) => (
              <div key={dishIndex} className="border rounded-lg p-4 text-center shadow-lg">
                <img src={dish.image} alt={dish.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-2xl font-medium mb-2">{dish.name}</h3>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <span className="text-xl font-bold text-green-600">{dish.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
