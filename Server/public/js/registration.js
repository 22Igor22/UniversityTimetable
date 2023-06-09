let loginCheck = false;
let passwordCheck = false;
let repeatCheck = false;

function checkLogin(str) {
    document.getElementById("error").innerHTML = "";
    if(str.length < 4)
    {
        document.getElementById("errorInput").innerHTML = "Login must be more than 4 characters";
        loginCheck = false;
    }
    else
    {
        document.getElementById("errorInput").innerHTML = "";
        loginCheck = true;
    }
}

function checkPassword(str) {
    document.getElementById("error").innerHTML = "";
    if (str.length < 4) {
        document.getElementById("errorInput").innerHTML = "Password must be more than 4 characters";
        passwordCheck = false;
        return;
    } else {
        document.getElementById("errorInput").innerHTML = "";
        passwordCheck = true;
    }
}

function checkGroupID(str) {
    document.getElementById("error").innerHTML = "";
    if (0 < parseInt(str, 10) && parseInt(str, 10) < 10) {
        document.getElementById("errorInput").innerHTML = "";
        groupIDCheck = true
    } else {
        document.getElementById("errorInput").innerHTML = "Non-existent group";
        groupIDCheck = false
    }
}

const registUser = () =>{
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let groupID = document.getElementById("groupID").value;
    if(loginCheck&&passwordCheck&&groupIDCheck){
        fetch("https://UniversityTimetable:5000/auth/register", /*TODO link*/{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    login : login,
                    password: password,
                    groupID: groupID
                })
        }).then(response => {return response.json()})
            .then(result => {
                if(result.status === "not ok"){
                    document.getElementById("error").innerHTML = "This login is already taken";
                }
                if(result.status === "ok"){
                    window.location.href = '/auth/login'
                }

            }).catch(err => {
            console.log(err)
        })
    }
    else {
        document.getElementById("error").innerHTML = "Incorrect data entered";
    }

}

document.getElementById('submit_reg').addEventListener("click", registUser)



