window.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.btn-danger');
  const productContainer = document.querySelector('#product-list-container');

  elements.forEach(element => {
    element.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('producttid'); // Correction de l'attribut
      if (!productId) {
        console.error('Product ID not found!');
        return;
      }

      axios.delete(`/products/${productId}`) // Utilisation correcte de productId
        .then(response => {
          if (response.data) {
            productContainer.innerHTML = response.data; // Met à jour le conteneur
          } else {
            console.error('No data in the response.');
          }
        })
        .catch(err => {
          console.error('Error deleting the product:', err);
        });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');
  const quantityInput = document.getElementById('quantity');

  decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value, 10);
    quantityInput.value = currentValue + 1;
  });
});