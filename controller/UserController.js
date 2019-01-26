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

                let btn = this.formEl.querySelector("[type=submit]");

                btn.disabled = true;

                let values = this.getValues();

                if (!values) {
                    return false;
                }

                this.getPhoto().then(
                    (content) => {

                        values.photo = content;

                        this.addLine(values);

                        this.formEl.reset();

                        btn.disabled = false;

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
            var isValid = true;

            [...this.formEl.elements].forEach((field, index) => {
                if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                    field.parentElement.classList.add("has-error");
                    isValid = false;
                    return false;
                }
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

            if (!isValid) {
                return false;
            }

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

            tr.dataset.user = JSON.stringify(dataUser);

            tr.innerHTML = `
    <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
    <td>${dataUser.name}</td>
    <td>${dataUser.email}</td>
    <td>${((dataUser.admin) ? 'Sim' : 'Não')}</td>
    <td>${Utils.dateFormat(dataUser.register)}</td>
    <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
    </td>`;

            this.tableEl.appendChild(tr);

            this.updateCount();

        } //fechando metodo addLine

    updateCount() {

        let numberUsers = 0;
        let numberAdmins = 0;

        [...this.tableEl.children].forEach((e) => {

            numberUsers++;

            let user = JSON.parse(e.dataset.user);

            if (user._admin) numberAdmins++;

            document.getElementById("numberUsers").innerHTML = numberUsers;
            document.getElementById("numberAdmins").innerHTML = numberAdmins;

        });
    }
}