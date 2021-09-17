let add_form = document.querySelector(".adding-form");

function addProduct(new_item) {
    fetch("https://pointof-sale2.herokuapp.com/adding_product/", {
        method: 'POST',
        //  PASS IN A JSON VERSION OF THE new_item
        body: JSON.stringify(new_item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(responce => responce.json())
        .then(data => {
            console.log(data);

        })

}




add_form.addEventListener("submit", e => {
    //  PREVENT THE DEFAULT ACTION OF THE FORM 
    e.preventDefault();

    //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
    let new_item = {
        name: document.querySelector(".add-name").value,
        price: document.querySelector(".add-price").value,
        category: document.querySelector(".add-category").value,
        description: document.querySelector(".add-description").value,
        image: document.querySelector(".add-image").value
    }
    console.log(new_item)
    //  CALL THE addProduct FUNCTION AND PASS IN THE new_item
    addProduct(new_item);
})