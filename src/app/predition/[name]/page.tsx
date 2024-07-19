import axios from "axios";
import React from "react";
import RecipeComponent from "./RecipeComponent";

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
}

interface ApiResponse extends Array<Recipe> {}

const getRecipe = async (name: string): Promise<Recipe[] | null> => {
  try {
    const response = await axios.get<ApiResponse>(
      "https://api.api-ninjas.com/v1/recipe",
      {
        params: { query: name },
        headers: { "X-Api-Key": process.env.NEXT_PUBLIC_RECIPE_API_KEY },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    return null;
  }
};

interface Params {
  params: { name: string };
}

export default async function Prediction({ params }: Params) {
  const decodedName = decodeURIComponent(params.name);
  const recipeData = await getRecipe(decodedName);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Recipes for {decodedName}
      </h1>
      {recipeData && recipeData.length > 0 ? (
        recipeData.map((recipe: Recipe, index: number) => (
          <RecipeComponent key={index} recipe={recipe} />
        ))
      ) : (
        <div className=" text-gray-600">
          <p className="text-xl">No recipes found. Try another search!</p>
        </div>
      )}
    </div>
  );
}
