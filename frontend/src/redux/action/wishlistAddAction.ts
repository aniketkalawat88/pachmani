import api from "@/lib/axios";
import { IProduct } from "@/lib/types/products";



export const addWish = async (
  id: string,
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
) => {
  try {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, isLiked: !product.isLiked } : product
      )
    );
    const res = await api.post("product/wishlist/" + id);
    console.log(res);
  } catch (err) {
    console.log(err, "wishlist error");
  }
};
