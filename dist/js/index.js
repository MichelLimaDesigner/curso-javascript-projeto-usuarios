var fields = document.querySelectorAll("#form-user-create [name]");

fields.forEach((field, index) => {
    if (field.name == "gender") {
        console.log("gender");
        if (field.checked) {
            console.log("SIM");
        } else {
            console.log("NÂO");
        }
    } else {
        console.log(field + " " + field.name);
    }
});