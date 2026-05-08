export const FILTER_OPTIONS = {
  categories: [
    { id: 'all', label: 'Todas', value: null },
    { id: 'electronics', label: 'Electrónica', value: 'electronics' },
    { id: 'jewelery', label: 'Joyería', value: 'jewelery' },
    { id: 'mensclothing', label: 'Ropa Hombre', value: "men's clothing" },
    { id: 'womensclothing', label: 'Ropa Mujer', value: "women's clothing" },
  ],
  
  sortOptions: [
    { id: 'featured', label: 'Relevancia', value: 'featured' },
    { id: 'price-asc', label: 'Menor precio', value: 'price-asc' },
    { id: 'price-desc', label: 'Mayor precio', value: 'price-desc' },
    { id: 'rating', label: 'Mejor valorados', value: 'rating' },
  ],
  
  ratingOptions: [
    { id: 'all', label: 'Cualquier puntuación', value: 0 },
    { id: 'above-3', label: '3+ estrellas', value: 3 },
    { id: 'above-4', label: '4+ estrellas', value: 4 },
  ],
};
