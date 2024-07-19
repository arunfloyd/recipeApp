'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  servings?: string;
}

const RecipeComponent: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-white shadow-md rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md rounded-lg mt-2 p-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {recipe.ingredients.split('|').map((ingredient, index) => (
                  <li key={index} className="mb-1">{ingredient.trim()}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Instructions:</h3>
              <ol className="list-decimal list-inside text-gray-600">
                {recipe.instructions.split('.').filter(step => step.trim() !== '').map((step, index) => (
                  <li key={index} className="mb-2">{step.trim()}</li>
                ))}
              </ol>
            </div>
            <p className="mt-4 text-gray-600">Servings: {recipe.servings}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeComponent;