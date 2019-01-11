var fields = document.querySelectorAll("#form-user-create [name]");

var user = {};

//Função para adicionar usuários à tabela
function addLine(dataUser) {

    var tr = document.createElement("tr");

    tr.innerHTML = `
    <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
    <td>${dataUser.name}</td>
    <td>${dataUser.email}</td>
    <td>${dataUser.admin}</td>
    <td>${dataUser.birth}</td>
    <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
    </td>`;

    document.querySelector("#table-tbody").appendChild(tr);

}

document.querySelector("#form-user-create").addEventListener("submit", function(event) {

    /* O parametro "event" pega informações sobre o evento, o metedo "preventDefault" serve para cancelar o comportamento 
    padrão do evento, no caso, fazer refresh */
    event.preventDefault();

    fields.forEach((field, index) => {
        if (field.name == "gender") {

            //verificando se o gender está selecionado
            if (field.checked) {

                user[field.name] = field.value;

            }

        } else {

            // Objeto "user" recebe atributos de key e value dos campos de "field" de forma dinamica por meio das "[]"
            user[field.name] = field.value;

        }
    });

    var objectUser = new User(
        user.name,
        user.gender,
        user.birth,
        user.country,
        user.email,
        user.password,
        user.photo,
        user.admin
    );

    console.log(objectUser);

    addLine(objectUser);

});