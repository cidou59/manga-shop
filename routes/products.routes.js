const router = require('express').Router();
const { productList, productNew, productCreate, productDelete, productEdit, productUpdate, productDetail } = require('../controllers/products.controller');
router.get('/', productList);
router.get('/new', productNew);
router.post('/', productCreate);
router.get('/edit/:productId', productEdit);
router.post('/update/:productId', productUpdate);
router.delete('/:productId', productDelete);
router.get('/:productId', productDetail); // Nouvelle route pour afficher un produit

module.exports = router;