// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { Link } from "react-router-dom";
// import { Container, Typography, Grid, Button, Card, CardContent, CardMedia, TextField, Box } from "@mui/material";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// const HomePage = () => {
//     const [categories] = useState({
//         "Daily Staples": {
//             Grains: ["Wheat", "Juwar", "Bajara"],
//             Pulses: ["Moong Dal", "Tuver Dal"],
//             "Edible Oils": ["Olive Oil", "Mustard Oil"],
//         },
//         "Snacks and Beverages": {
//             Snacks: ["Papad", "Khakra", "Chips"],
//             Beverages: ["Juices"],
//         },
//         "Dry Fruits": {},
//         "Personal Care": {
//             "Hair Care": ["Shampoo"],
//             "Skin Care": ["Soap"],
//         },
//     });
//     const [products, setProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//     const [userId, setUserId] = useState(null);
//     const [quantityInput, setQuantityInput] = useState({});

//     // Fetch the user ID from token
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             const decoded = jwtDecode(token);
//             const userId = decoded.userId || decoded.sub || decoded.id;
//             setUserId(userId);
//         }
//     }, []);

//     // Function to fetch products by category and subcategory
//     const fetchProducts = async (category, subCategory) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/products/product`, {
//                 params: { category, subCategory },
//             });
//             setProducts(response.data);
//             setSelectedCategory(category);
//             setSelectedSubCategory(subCategory);
//         } catch (error) {
//             console.error("Error fetching products:", error.response?.data?.message || error.message);
//             setProducts([]);
//         }
//     };

//     // Handle quantity input for specific product
//     const handleQuantityChange = (productId, value) => {
//         setQuantityInput((prev) => ({ ...prev, [productId]: value }));
//     };

//     // Add to cart function with quantity input
//     const addToCart = async (productId, category) => {
//         if (!userId) {
//             alert("Please log in to add products to the cart.");
//             return;
//         }

//         const enteredQuantity = parseFloat(quantityInput[productId]) || 1; // Default to 1
//         if (enteredQuantity <= 0) {
//             alert("Please enter a valid quantity.");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:5000/api/cart/add", {
//                 userId,
//                 productId,
//                 quantity: enteredQuantity,
//             });
//             alert(`Added ${enteredQuantity} ${category === "Personal Care" ? "units" : "kgs"} to cart!`);
//         } catch (error) {
//             console.error("Error adding product to cart:", error.response?.data?.message || error.message);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h3" align="center" gutterBottom>
//                 Grocery Shop
//             </Typography>
//             <Typography variant="h5" gutterBottom>
//                 Product Categories
//             </Typography>
//             <Grid container spacing={2}>
//                 {Object.keys(categories).map((category) => (
//                     <Grid item xs={12} sm={6} md={3} key={category}>
//                         <Button
//                             fullWidth
//                             variant="contained"
//                             color={selectedCategory === category ? "primary" : "secondary"}
//                             onClick={() => setSelectedCategory(category)}
//                         >
//                             {category}
//                         </Button>
//                         {selectedCategory === category && categories[category] && (
//                             <Box mt={2} ml={2}>
//                                 {Object.keys(categories[category]).map((subCategory) => (
//                                     <Button
//                                         key={subCategory}
//                                         variant="outlined"
//                                         color={selectedSubCategory === subCategory ? "primary" : "inherit"}
//                                         onClick={() => fetchProducts(category, subCategory)}
//                                         style={{ margin: "5px" }}
//                                     >
//                                         {subCategory}
//                                     </Button>
//                                 ))}
//                             </Box>
//                         )}
//                     </Grid>
//                 ))}
//             </Grid>

//             <Typography variant="h6" mt={4} gutterBottom>
//                 {selectedSubCategory
//                     ? `Products in ${selectedCategory} > ${selectedSubCategory}`
//                     : selectedCategory
//                     ? `Subcategories in ${selectedCategory}`
//                     : "Select a Category"}
//             </Typography>
//             <Grid container spacing={2}>
//                 {products.length > 0
//                     ? products.map((product) => (
//                           <Grid item xs={12} sm={6} md={4} key={product._id}>
//                               <Card>
//                                   <CardMedia component="img" height="140" image={product.imageUrl} alt={product.name} />
//                                   <CardContent>
//                                       <Typography variant="h6">{product.name}</Typography>
//                                       <Typography variant="body2">Price: ${product.price}</Typography>
//                                       <TextField
//                                           type="number"
//                                           label={
//                                               selectedCategory === "Personal Care" ? "Quantity (units)" : "Weight (kgs)"
//                                           }
//                                           variant="outlined"
//                                           size="small"
//                                           fullWidth
//                                           value={quantityInput[product._id] || ""}
//                                           onChange={(e) => handleQuantityChange(product._id, e.target.value)}
//                                           style={{ marginTop: "10px" }}
//                                       />
//                                       <Button
//                                           variant="contained"
//                                           color="primary"
//                                           fullWidth
//                                           startIcon={<AddShoppingCartIcon />}
//                                           onClick={() => addToCart(product._id, selectedCategory)}
//                                           style={{ marginTop: "10px" }}
//                                       >
//                                           Add to Cart
//                                       </Button>
//                                   </CardContent>
//                               </Card>
//                           </Grid>
//                       ))
//                     : selectedSubCategory && (
//                           <Typography variant="body1" mt={2}>
//                               No products available in this subcategory.
//                           </Typography>
//                       )}
//             </Grid>

//             <Box mt={4}>
//                 <Typography variant="h6">View Cart</Typography>
//                 <Link to="/cart">
//                     <Button variant="contained" color="primary">
//                         Go to Cart
//                     </Button>
//                 </Link>
//             </Box>
//         </Container>
//     );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Button, Card, CardContent, CardMedia, TextField, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const HomePage = () => {
    const [categories] = useState({
        "Daily Staples": {
            Grains: [
                { name: "Wheat", imageUrl: "images/wheat.jpg" },
                { name: "Juwar", imageUrl: "path_to_juwar_image.jpg" },
                { name: "Bajara", imageUrl: "path_to_bajara_image.jpg" },
            ],
            Pulses: [
                { name: "Moong Dal", imageUrl: "path_to_moongdal_image.jpg" },
                { name: "Tuver Dal", imageUrl: "path_to_tuverdal_image.jpg" },
            ],
            "Edible Oils": [
                { name: "Olive Oil", imageUrl: "path_to_oliveoil_image.jpg" },
                { name: "Mustard Oil", imageUrl: "path_to_mustardoil_image.jpg" },
            ],
        },
        "Snacks and Beverages": {
            Snacks: [
                { name: "Papad", imageUrl: "path_to_papad_image.jpg" },
                { name: "Khakra", imageUrl: "path_to_khakra_image.jpg" },
                { name: "Chips", imageUrl: "path_to_chips_image.jpg" },
            ],
            Beverages: [{ name: "Juices", imageUrl: "path_to_juices_image.jpg" }],
        },
    });

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [userId, setUserId] = useState(null);
    const [quantityInput, setQuantityInput] = useState({});

    // Fetch the user ID from token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.userId || decoded.sub || decoded.id;
            setUserId(userId);
        }
    }, []);

    // Function to fetch products by category and subcategory
    const fetchProducts = async (category, subCategory) => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/product", {
                params: { category, subCategory },
            });
            console.log(response.data); // Log the data for debugging
            setProducts(response.data);
            setSelectedCategory(category);
            setSelectedSubCategory(subCategory);
        } catch (error) {
            console.error("Error fetching products:", error.response?.data?.message || error.message);
            setProducts([]);
        }
    };

    // Handle quantity input for specific product
    const handleQuantityChange = (productId, value) => {
        setQuantityInput((prev) => ({ ...prev, [productId]: value }));
    };

    // Add to cart function with quantity input
    const addToCart = async (productId, category) => {
        if (!userId) {
            alert("Please log in to add products to the cart.");
            return;
        }

        const enteredQuantity = parseFloat(quantityInput[productId]) || 1; // Default to 1
        if (enteredQuantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/cart/add", {
                userId,
                productId,
                quantity: enteredQuantity,
            });
            alert(`Added ${enteredQuantity} ${category === "Personal Care" ? "units" : "kgs"} to cart!`);
        } catch (error) {
            console.error("Error adding product to cart:", error.response?.data?.message || error.message);
        }
    };

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                Grocery Shop
            </Typography>
            <Typography variant="h5" gutterBottom>
                Product Categories
            </Typography>
            <Grid container spacing={2}>
                {Object.keys(categories).map((category) => (
                    <Grid item xs={12} sm={6} md={3} key={category}>
                        <Button
                            fullWidth
                            variant="contained"
                            color={selectedCategory === category ? "primary" : "secondary"}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                        {selectedCategory === category && categories[category] && (
                            <Box mt={2} ml={2}>
                                {Object.keys(categories[category]).map((subCategory) => (
                                    <Box
                                        key={subCategory}
                                        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
                                    >
                                        <img
                                            src={categories[category][subCategory][0].imageUrl} // Display the first product's image in the subcategory
                                            alt={subCategory}
                                            style={{ width: "40px", height: "40px", marginRight: "10px" }}
                                        />
                                        <Button
                                            variant="outlined"
                                            color={selectedSubCategory === subCategory ? "primary" : "inherit"}
                                            onClick={() => fetchProducts(category, subCategory)}
                                            style={{ margin: "5px" }}
                                        >
                                            {subCategory}
                                        </Button>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" mt={4} gutterBottom>
                {selectedSubCategory
                    ? `Products in ${selectedCategory} > ${selectedSubCategory}`
                    : selectedCategory
                    ? `Subcategories in ${selectedCategory}`
                    : "Select a Category"}
            </Typography>
            <Grid container spacing={2}>
                {Array.isArray(products) && products.length > 0
                    ? products.map((product) => (
                          <Grid item xs={12} sm={6} md={4} key={product._id}>
                              <Card>
                                  <CardMedia
                                      component="img"
                                      height="140"
                                      image={product.imageUrl} // Assuming each product has an imageUrl
                                      alt={product.name}
                                  />
                                  <CardContent>
                                      <Typography variant="h6">{product.name || "No name available"}</Typography>
                                      <Typography variant="body2">Price: ${product.price}</Typography>
                                      <TextField
                                          type="number"
                                          label={
                                              selectedCategory === "Personal Care" ? "Quantity (units)" : "Weight (kgs)"
                                          }
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          value={quantityInput[product._id] || ""}
                                          onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                          style={{ marginTop: "10px" }}
                                      />
                                      <Button
                                          variant="contained"
                                          color="primary"
                                          fullWidth
                                          startIcon={<AddShoppingCartIcon />}
                                          onClick={() => addToCart(product._id, selectedCategory)}
                                          style={{ marginTop: "10px" }}
                                      >
                                          Add to Cart
                                      </Button>
                                  </CardContent>
                              </Card>
                          </Grid>
                      ))
                    : selectedSubCategory && (
                          <Typography variant="body1" mt={2}>
                              No products available in this subcategory.
                          </Typography>
                      )}
            </Grid>

            <Box mt={4}>
                <Typography variant="h6">View Cart</Typography>
                <Link to="/cart">
                    <Button variant="contained" color="primary">
                        Go to Cart
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default HomePage;
