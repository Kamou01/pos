// Username: Kamou01
// Password: 12345

let login_form = document.querySelector(".login-form");
let reg_form = document.querySelector(".register-form");

if (login_form != null) {
    login_form.addEventListener("submit", e => {
        e.preventDefault();

        let user_details = {
            username: document.querySelector(".login-username").value,
            password: document.querySelector(".login-password").value
        }

        console.log(user_details);

        fetch("https://pointof-sale2.herokuapp.com/user_login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_details)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.status_code == 201) {
                    localStorage.setItem("current_user", JSON.stringify(data.current_user))
                    getToken(user_details);

                    window.location.href = "main.html";
                }
            })
    })
}

if (reg_form != null) {
    reg_form.addEventListener("submit", e => {
        //  PREVENT THE DEFAULT ACTION OF THE FORM 
        e.preventDefault();

        //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
        let new_user = {
            first_name: document.querySelector(".register-name").value,
            last_name: document.querySelector(".register-lastname").value,
            username: document.querySelector(".register-username").value,
            password: document.querySelector(".register-password").value,

        }

        console.log(new_user);

        fetch("https://pointof-sale2.herokuapp.com/user-registration/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_user)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                let current_user = data.current_user;
                localStorage.setItem("current_user", JSON.stringify(current_user))
            });
    })
}