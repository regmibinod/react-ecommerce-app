import { createContext, useState, useEffect } from "react";

// Create a context  to share favourite products across components.

export const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  // Retrieve previously saved favourites from LocalStorage.
  const [favourites, setFavourites] = useState(() => {
    const savedFav = JSON.parse(localStorage.getItem("favouriteProduct"));

    return savedFav ? savedFav : [];
  });

  //   Automatically save favourites whenever the state changes.
  useEffect(() => {
    localStorage.setItem("favouriteProduct", JSON.stringify(favourites));
  }, [favourites]);

  //   Add a product to favourites or remove it if already slected.
  const toggleFavourite = (product) => {
    setFavourites((prevFavourites) => {
      const isAlreadyFavourites = prevFavourites.some(
        (item) => item.id === product.id,
      );

      // if product is already favourite remove from the favourite
      if (isAlreadyFavourites) {
        return prevFavourites.filter((item) => item.id !== product.id);
      }
      // if the product is not favourite add to the favourite
      if (!isAlreadyFavourites) {
        return [...prevFavourites, product];
      }
    });
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
}

//   const isAlreadyFavourite = favourites.some((item) => item.id === product.id);
//     // Remove the product if it is already exists
//     if (isAlreadyFavourite) {
//       return setFavourites((prev) =>
//         prev.filter((item) => item.id !== product.id),
//       );
//     if (!isFav) {
//       return setFavourites((prev) => [...prev, product]);
//     }
