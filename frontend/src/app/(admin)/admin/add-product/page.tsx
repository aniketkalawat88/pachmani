"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Image from "next/image";
import { Loader } from "lucide-react";
import { IoAddCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import IngredientsComponent from "../_components/IngredientsComponent";

interface Review {
  text: string;
  rating: number;
}

interface Variant {
  packSize: number;
  price: number;
  stock: number;
  unit: string;
  discount: number;
}

interface Ingradient {
  file: File;
  name: string;
}

interface ProductState {
  productName: string;
  description: string;
  category: string;
  highlights: string[];
  reviews: Review[];
  productHeroImage: string; // Single image
  detailedImages: string[];
  ingredients: Ingradient[];
  howToUse: string[];
  variants: Variant[];
}

interface ingredientRes {
  image: { fileId: string; url: string };
  name: string;
}

const initialProductState: ProductState = {
  productName: "",
  description: "",
  category: "",
  highlights: [""],
  reviews: [{ text: "", rating: 1 }],
  productHeroImage: "",
  detailedImages: [""],
  ingredients: [],
  howToUse: [""],
  variants: [{ packSize: 0, price: 0, stock: 0, unit: "", discount: 0 }],
};

const categories = ["hairCare", "skincare", "mens"];

const AddProducts: React.FC = () => {
  const [isVal, setIsVal] = useState<ProductState>(initialProductState);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [detailedImageFiles, setDetailedImageFiles] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [ingredientData, setIngredientsData] = useState<ingredientRes[]>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIsVal({
      ...isVal,
      [name]: value,
    });
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    arrayName: keyof ProductState,
    fieldName?: keyof Review | keyof Variant
  ) => {
    const newArray = [...(isVal[arrayName] as any[])];
    if (fieldName) {
      newArray[index][fieldName] = e.target.value;
    } else {
      newArray[index] = e.target.value;
    }
    setIsVal({
      ...isVal,
      [arrayName]: newArray,
    });
  };

  const handleAddArrayItem = (
    arrayName: keyof ProductState,
    defaultValue: any = ""
  ) => {
    setIsVal({
      ...isVal,
      [arrayName]: [...(isVal[arrayName] as any[]), defaultValue],
    });
  };

  const handleRemoveArrayItem = (
    arrayName: keyof ProductState,
    index: number
  ) => {
    const newArray = [...(isVal[arrayName] as any[])];
    newArray.splice(index, 1);
    setIsVal({
      ...isVal,
      [arrayName]: newArray,
    });
  };

  const handleHeroImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImageFile(file);
    }
  };

  const handleDetailedImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFiles = [...detailedImageFiles];
      newFiles[index] = file;
      setDetailedImageFiles(newFiles);
    }
  };

  const handleResetHeroImage = () => {
    setHeroImageFile(null);
    setIsVal({
      ...isVal,
      productHeroImage: "",
    });
  };

  const handleResetDetailedImage = (index: number) => {
    const newFiles = [...detailedImageFiles];
    newFiles.splice(index, 1);
    setDetailedImageFiles(newFiles);
    const newArray = [...isVal.detailedImages];
    newArray.splice(index, 1);
    setIsVal({
      ...isVal,
      detailedImages: newArray,
    });
  };

  const isFetch = async () => {
    setLoading(true);

    try {
      // Prepare form data for product information
      const formData = new FormData();
      const { variants, ...productDataWithoutVariants } = isVal;

      // Upload ingredient images if any
      let ingredientsData: { image: { fileId: any; url: any; }; name: string; }[] = [];
      if (isVal.ingredients.length > 0) {
        ingredientsData = await Promise.all(
          isVal.ingredients.map(async ({ file, name }) => {
            const ingredientFormData  = new FormData();
            ingredientFormData.append("heroImage", file);

            const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_URL}/api/cloudinary/upload-image`,
              ingredientFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(data, "image upload ");
            return {
              image: { fileId: data.fileId, url: data.url },
              name,
            };
          })
        );
      }

      // Append data to formData
      formData.append(
        "productData",
        JSON.stringify({
          ...productDataWithoutVariants,
          ingredients: ingredientsData,
        })
      );
      formData.append("variantData", JSON.stringify(variants));

      if (heroImageFile) {
        formData.append("heroImage", heroImageFile);
      }

      detailedImageFiles.forEach((file, index) => {
        formData.append(`detailedImage${index}`, file);
      });

      // Send data to server
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization:
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null,
          },
        }
      );

      console.log(res, "===");
    } catch (err) {
      console.error(err, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: "file" | "name"
  ) => {
    const newIngredients = [...isVal.ingredients];
    if (field === "file" && e.target.files) {
      newIngredients[index].file = e.target.files[0];
    } else {
      newIngredients[index].name = e.target.value;
    }
    setIsVal({
      ...isVal,
      ingredients: newIngredients,
    });
  };

  const handleAddIngredient = () => {
    setIsVal({
      ...isVal,
      ingredients: [...isVal.ingredients, { file: {} as File, name: "" }],
    });
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...isVal.ingredients];
    newIngredients.splice(index, 1);
    setIsVal({
      ...isVal,
      ingredients: newIngredients,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { variants, ...productData } = isVal;
    console.log(isVal);
    isFetch();
    // setIsVal(initialProductState)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-2 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="col-span-2">
        <h1 className="text-xl font-medium text-[#1C2A53]">Add New Product</h1>
      </div>
      <div className="my-6 col-span-2">
        <label
          htmlFor="productName"
          className="block text-sm text-[#332F32] font-medium"
        >
          Product Name*
        </label>
        <input
          type="text"
          name="productName"
          value={isVal.productName}
          onChange={handleChange}
          className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
          placeholder="Please Enter Your Product Name"
          required
        />
      </div>
      <div className="my-6 col-span-2">
        <label
          htmlFor="category"
          className="block text-sm text-[#332F32] font-medium"
        >
          Category Name*
        </label>
        <select
          name="category"
          value={isVal.category}
          onChange={handleChange}
          className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
          required
        >
          <option value="" disabled>
            Please Select Your Category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2">
        {isVal.variants.map((variant, index) => (
          <div key={index} className="border p-4 rounded-lg relative">
            <h3 className="text-lg font-medium mb-2">Variant {index + 1}</h3>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <label
                  htmlFor={`packSize${index}`}
                  className="block text-sm text-gray-700 font-medium"
                >
                  Pack Size*
                </label>
                <input
                  type="number"
                  id={`packSize${index}`}
                  value={variant.packSize}
                  onChange={(e) =>
                    handleArrayChange(e, index, "variants", "packSize")
                  }
                  className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
                  placeholder={`Pack Size ${index + 1}`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`price${index}`}
                  className="block text-sm text-gray-700 font-medium"
                >
                  Price*
                </label>
                <input
                  type="number"
                  id={`price${index}`}
                  value={variant.price}
                  onChange={(e) =>
                    handleArrayChange(e, index, "variants", "price")
                  }
                  className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
                  placeholder={`Price ${index + 1}`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`stock${index}`}
                  className="block text-sm text-gray-700 font-medium"
                >
                  Stock*
                </label>
                <input
                  type="number"
                  id={`stock${index}`}
                  value={variant.stock}
                  onChange={(e) =>
                    handleArrayChange(e, index, "variants", "stock")
                  }
                  className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
                  placeholder={`Stock ${index + 1}`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`unit${index}`}
                  className="block text-sm text-gray-700 font-medium"
                >
                  Unit*
                </label>
                <input
                  type="text"
                  id={`unit${index}`}
                  value={variant.unit}
                  onChange={(e) =>
                    handleArrayChange(e, index, "variants", "unit")
                  }
                  className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
                  placeholder={`Unit ${index + 1}`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`discount${index}`}
                  className="block text-sm text-gray-700 font-medium"
                >
                  Discount*
                </label>
                <input
                  type="number"
                  id={`discount${index}`}
                  value={variant.discount}
                  onChange={(e) =>
                    handleArrayChange(e, index, "variants", "discount")
                  }
                  className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
                  placeholder={`Discount ${index + 1}`}
                  required
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveArrayItem("variants", index)}
              className="absolute right-2 top-2 text-red-500 px-2 py-1 rounded-full"
            >
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            handleAddArrayItem("variants", {
              packSize: 0,
              price: 0,
              stock: 0,
              unit: "",
              discount: 0,
            })
          }
          className="w-full flex justify-center mt-2"
        >
          <IoAddCircleOutline className="text-2xl text-primaryMain" />
        </button>
      </div>
      <div className="col-span-2 my-4">
        <label
          htmlFor="description"
          className="block text-sm text-gray-700 font-medium"
        >
          Description*
        </label>
        <textarea
          name="description"
          value={isVal.description}
          onChange={handleChange}
          className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5 resize-none h-28"
          placeholder="Please Enter Your Description"
          required
        />
      </div>
      <div className="">
        <label
          htmlFor="description"
          className="block text-sm text-gray-700 font-medium"
        >
          Highlights of Clinically Tested
        </label>
        {isVal.highlights.map((highlight, index) => (
          <div key={index} className="relative">
            <label
              htmlFor={`highlight${index}`}
              className="block text-sm text-gray-700 font-medium"
            >
              {/* Highlight {index + 1}* */}
            </label>
            <input
              type="text"
              id={`highlight${index}`}
              value={highlight}
              onChange={(e) => handleArrayChange(e, index, "highlights")}
              className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
              placeholder={`Please Enter Highlight ${index + 1}`}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveArrayItem("highlights", index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500  px-2 py-1 rounded-full"
            >
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddArrayItem("highlights")}
          className="w-full flex justify-center mt-2"
        >
          <IoAddCircleOutline className="text-2xl text-primaryMain" />
        </button>
      </div>

      <div className="">
        <label
          htmlFor="description"
          className="block text-sm text-gray-700 font-medium"
        >
          Highlights of How To Use
        </label>
        {isVal.howToUse.map((step, index) => (
          <div key={index} className="relative">
            {/* <label
              htmlFor={`howToUse${index}`}
              className="block text-sm text-gray-700 font-medium"
            >
              How To Use Step {index + 1}*
            </label> */}
            <input
              type="text"
              id={`howToUse${index}`}
              value={step}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleArrayChange(e, index, "howToUse")
              }
              className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
              placeholder={`How To Use Step ${index + 1}`}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveArrayItem("howToUse", index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 px-2 py-1 rounded-full"
            >
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddArrayItem("howToUse")}
          className="w-full flex justify-center mt-2"
        >
          <IoAddCircleOutline className="text-2xl text-primaryMain" />
        </button>
      </div>

      <div className="col-span-2 ">
        {/* <IngredientsComponent /> */}
        {/* <label
          htmlFor="description"
          className="block text-sm text-gray-700 font-medium"
        >
          Ingredients
        </label>
        {isVal.ingredients.map((ingredient, index) => (
          <div key={index} className="relative">
            <label
              htmlFor={`ingredient${index}`}
              className="block text-sm text-gray-700 font-medium"
            >
            </label>
            <input
              type="text"
              id={`ingredient${index}`}
              value={ingredient}
              onChange={(e) => handleArrayChange(e, index, "ingredients")}
              className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
              placeholder={`Ingredient ${index + 1}`}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveArrayItem("ingredients", index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 px-2 py-1 rounded-full"
            >
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddArrayItem("ingredients")}
          className="w-full flex justify-center mt-2"
        >
         <IoAddCircleOutline className="text-2xl text-primaryMain " />
        </button> */}
      </div>

      <div className="col-span-2 my-4">
        <label
          htmlFor="ingredients"
          className="block text-sm text-gray-700 font-medium"
        >
          Ingredients*
        </label>
        {isVal.ingredients.map((ingredient, index) => (
          <div key={index} className="relative">
            <input
              type="file"
              id={`ingredientFile${index}`}
              onChange={(e) => handleIngredientChange(e, index, "file")}
              className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
              placeholder={`Ingredient File ${index + 1}`}
              required
            />
            <input
              type="text"
              id={`ingredientName${index}`}
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(e, index, "name")}
              className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
              placeholder={`Ingredient Name ${index + 1}`}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 px-2 py-1 rounded-full"
            >
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredient}
          className="mt-2 flex justify-center w-full"
        >
          <IoAddCircleOutline className="text-2xl text-primaryMain " />
        </button>
      </div>

      <div className="col-span-2 my-4">
        <label
          htmlFor="productHeroImage"
          className="block text-sm text-gray-700 font-medium"
        >
          Product Hero Image*
        </label>
        <input
          type="file"
          name="productHeroImage"
          onChange={handleHeroImageChange}
          className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
        />
        {heroImageFile && (
          <div className="h-32 w-32 rounded-2xl border-dashed border-gray-300 bg-gray-100 mt-2 relative">
            <Image
              src={URL.createObjectURL(heroImageFile)}
              alt="Selected"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
            <button
              type="button"
              onClick={handleResetHeroImage}
              className="absolute top-2 right-2 text-red-500 px-2 py-1 rounded-full"
            >
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>
        )}
      </div>

      <div className="col-span-2 my-4">
        <label
          htmlFor="productHeroImage"
          className="block text-sm text-gray-700 font-medium"
        >
          Detailed Image*
        </label>
        {isVal.detailedImages.map((image, index) => (
          <div key={index} className="relative">
            {/* <label
              htmlFor={`detailedImage${index}`}
              className="block text-sm text-gray-700 font-medium"
            >
              Detailed Image {index + 1}*
            </label> */}
            <input
              type="file"
              id={`detailedImage${index}`}
              onChange={(e) => handleDetailedImageChange(e, index)}
              className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
              placeholder={`Detailed Image ${index + 1}`}
              required
            />
            <button
              type="button"
              onClick={() => handleResetDetailedImage(index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 px-2 py-1 rounded-full"
            >
              <RxCrossCircled className="text-2xl" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddArrayItem("detailedImages")}
          className="mt-2 flex justify-center w-full"
        >
          <IoAddCircleOutline className="text-2xl text-primaryMain " />
        </button>
      </div>

      <div className="w-full flex justify-end col-span-2">
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-44 flex  items-center justify-center gap-1"
        >
          {isLoading && <Loader className="w-4 h-4 animate-spin"></Loader>}
          <p>Submit</p>
        </button>
      </div>
    </form>
  );
};

export default AddProducts;
