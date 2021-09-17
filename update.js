let update_form = document.querySelector(".update-form");

//  ON SUBMISSION OF THE edit_form, RUN THE FOLLOWING CODE
update_form.addEventListener("submit", e => {
    //  PREVENT THE DEFAULT ACTION OF THE FORM 
    e.preventDefault();

    //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
    let updated_item = {
        name: document.querySelector(".update-name").value,
        price: document.querySelector(".update-price").value,
        description: document.querySelector(".update-description").value,
        category: document.querySelector(".update-category").value,
        image: document.querySelector(".update-image").value
    }

    //  CALL THE updateProduct FUNCTION AND PASS IN THE updated_item
    updateProduct(updated_item);
})

function updateProduct(updated_item) {
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