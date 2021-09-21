let products = []

function getProducts() {
    fetch("https://pointof-sale2.herokuapp.com/view_products/")
        .then(response => response.json())
        .then(data => {
            console.log(data.products)
            let products_list = [];
            products = data.products;
            let products_container = document.querySelector(".product-container");

            // saving products
            localStorage.setItem("products", JSON.stringify(products_list));

            //  clear
            products_container.innerHTML = " ";

            // looping 
            products.forEach(product => {
                products_container.innerHTML += renderProducts(product);
            });
        });
}

function renderProducts(product) {
    console.log(product);
    return `
    <h1>${product.name}</h1>
    <h1>${product.price}</h1>
    <h1>${product.description}</h1>
    <h1>${product.category}</h1>
    <h1>${product.image}</h1>
    <button type="button" class="addto-cart" onclick="addToCart(${product.id})">
      Add to Cart <i class="fas fa-cart-plus"></i>
    </button>
    <button onclick="deleteProduct(${product.id})">delete</button>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#product-${product.id}">
  Update
</button>

<!-- Modal -->
<div class="modal fade" id="product-${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${product.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form
      class="update-form"
      onsubmit="event.preventDefault(); updateProduct(${product.id})"
      id="update-form-${product.id}"
    >
      <div class="updating-name">
        <label for="name" class="name-1"></label>
        <input
          type="text"
          name="name"
          id="update-name-${product.id}"
          class="update-name"
          placeholder="Name"
          value=${product.name}
          
        />
      </div>

      <div class="updating-price">
              <label for="price" class="price"></label>
              <input
                type="text"
                name="price"
                id="update-price-${product.id}"
                class="update-price"
                placeholder="Price"
                value=${product.price}
                
              />
            </div>
  
            <div class="updating-description">
              <label for="description" class="description"></label>
              <input
                type="text"
                name="description"
                id="update-description-${product.id}"
                class="update-description"
                placeholder="Description"
                value=${product.description}
                
              />
            </div>
  
            <div class="updating-category">
              <label for="category" class="category"></label>
              <input
                type="text"
                name="category"
                id="update-category-${product.id}"
                class="update-category"
                placeholder="Category"
                value=${product.category}
                
              />
              
            </div>
            <div class="updating-image">
              <label for="image" class="image"></label>
              <input
                type="text"
                name="image"
                id="update-image-${product.id}"
                class="update-image"
                placeholder="Url link for the Image"
                value=${product.image}
                
              />
              
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onclick="updateProduct(${product.id})">update</button>
      </div>
    </div>
  </div>
</div>
    `
}

getProducts()

function deleteProduct(id) {
    fetch(`https://pointof-sale2.herokuapp.com/delete_product/${id}/`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.reload()
        })


}

function searchFilter(){
  let searchTerm = document.querySelector("#search").value
  console.log(searchTerm)
  console.log(products)
  let foundProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase())
  })
  console.log(foundProducts)
  let container = document.querySelector(".product-container");
  container.innerHTML = ''
  foundProducts.forEach(product => {
            container.innerHTML += renderProducts(product)
        });
}

let update_form = document.querySelector(".update-form");

//  ON SUBMISSION OF THE edit_form, RUN THE FOLLOWING CODE
update_form.addEventListener("submit", e => {
    //  PREVENT THE DEFAULT ACTION OF THE FORM 
    e.preventDefault();

    //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES


    //  CALL THE updateProduct FUNCTION AND PASS IN THE updated_item
    updateProduct(updated_item);
})

function updateProduct(id) {
    let updated_item = {
        name: document.querySelector(`#update-name-${id}`).value,
        price: document.querySelector(`#update-price-${id}`).value,
        description: document.querySelector(`#update-description-${id}`).value,
        category: document.querySelector(`#update-category-${id}`).value,
        image: document.querySelector(`#update-image-${id}`).value
    }
    fetch(`https://pointof-sale2.herokuapp.com/updating_product/${id}/`, {
        method: 'PUT',
        //  PASS IN A JSON VERSION OF THE updated_item
        body: JSON.stringify(updated_item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
}

//creating a cart
let cart = JSON.parse(localStorage.getItem("cart")) || []
// will be filled with fetch call


function addToCart(product_id) {
    //find item in from products
    const itemToAdd = products.find(product => product.id == product_id);
    //put item in cart
    cart.push(itemToAdd)
    //store cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Item added to cart")
}