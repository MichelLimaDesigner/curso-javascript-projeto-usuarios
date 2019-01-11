class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById("form-user-create");
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();

    }

    onSubmit() {

            this.formEl.addEventListener("submit", event => {

                /* O parametro "event" pega informações sobre o evento, o metedo "preventDefault" serve para cancelar o comportamento 
                padrão do evento, no caso, fazer refresh */
                event.preventDefault();

                this.addLine(this.getValues());

            });

        } //fechando metodo onSubmit

    getValues() {

            let user = {};

            [...this.formEl.elements].forEach((field, index) => {
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

            return new User(
                user.name,
                user.gender,
                user.birth,
                user.country,
                user.email,
                user.password,
                user.photo,
                user.admin
            );

        } //fechando metodo getValues

    addLine(dataUser) {

            let tr = document.createElement("tr");

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

            this.tableEl.appendChild(tr);

        } //fechando metodo addLine
}