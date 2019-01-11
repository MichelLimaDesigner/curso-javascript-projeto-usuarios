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

                let values = this.getValues();

                this.getPhoto().then(
                    (content) => {

                        values.photo = content;

                        this.addLine(values);

                    },
                    (e) => {
                        console.error(e);
                    });

            });

        } //fechando metodo onSubmit


    getPhoto() {

            return new Promise((resolve, reject) => {

                let fileReader = new FileReader();

                let elements = [...this.formEl.elements].filter(item => {

                    if (item.name === 'photo') {
                        return item
                    }

                });

                let file = elements[0].files[0];

                fileReader.onload = () => {

                    resolve(fileReader.result);

                }

                fileReader.onerror = (e) => {

                    reject(e)

                }

                if (file) {
                    fileReader.readAsDataURL(file);
                } else {
                    resolve("dist/img/boxed-bg.jpg");
                }

            });

        } // fechamento do metodo getPhoto

    getValues() {

            let user = {};

            [...this.formEl.elements].forEach((field, index) => {
                if (field.name == "gender") {
                    //verificando se o gender está selecionado
                    if (field.checked) {
                        user[field.name] = field.value;
                    }
                } else if (field.name == "admin") {
                    if (field.checked) {
                        user[field.name] = field.checked;
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
    <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
    <td>${dataUser.name}</td>
    <td>${dataUser.email}</td>
    <td>${((dataUser.admin) ? 'Sim' : 'Não')}</td>
    <td>${dataUser.birth}</td>
    <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
    </td>`;

            this.tableEl.appendChild(tr);

        } //fechando metodo addLine
}