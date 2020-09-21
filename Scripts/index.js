var data = []


function Delete(id) {
    let _confirm = confirm("Deseja realmente excluir o contato?")

    if (_confirm) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].ID == id) {
                data.splice(i, 1)
            }
        }
        TableData()

    }

}

function Edit(id) {
    $("#modalRegister").modal("show")

    data.forEach(function (item) {
        if (item.ID == id) {
            $("#hdID").val(item.ID)
            $("#txtName").val(item.Name)
            $("#txtPhone").val(item.Phone)
            $("#txtEmail").val(item.Email)
        }

    })
}

function TableData() {

    if (Array.isArray(data)) {

        localStorage.setItem("__dados__", JSON.stringify(data))

        $("#tblData tbody").html("")

        data.forEach(function (item) {

            $("#tblData tbody").append(`<tr>
            <td>${item.ID}</td>
            <td>${item.Name}</td>
            <td>${item.Phone}</td>
            <td>${item.Email}</td>
            <td><button type="button" class="btn btn-primary" title="Editar" onclick="javascript:Edit(${item.ID});"><i class="fa fa-edit" /></button></td>
            <td><button type="button" class="btn btn-danger" title="Excluir" onclick="javascript:Delete(${item.ID});"><i class="fa fa-trash" /></button></td>
            </tr>`)
        })
    }
}

$(document).ready(function () {

    data = []
    data = JSON.parse(localStorage.getItem("__dados__"))

    if (data) {
        TableData()

    }

    $("#btnSave").click(function () {



        let _id = $("#hdID").val()
        let Name = $("#txtName").val()
        let Email = $("#txtEmail").val()
        let Phone = $("#txtPhone").val()
        let register = {}

        if (Name == "" || Email == "" || Phone == "") {
            alert("Todos os campos precisam ser preenchidos")
        }
        else {


            register.Name = Name
            register.Email = Email
            register.Phone = Phone

            if (!_id || _id == "0") {
                register.ID = data.length + 1
                data.push(register)
            }
            else {
                data.forEach(function (item) {
                    if (item.ID == _id) {
                        item.Name = Name
                        item.Email = Email
                        item.Phone = Phone

                    }
                })
            }

            if (data == null) {
                register.ID = 1
            }
            else {
                register.ID = data.length + 1
            }


            alert("Contato salvo com sucesso")
            $("#modalRegister").modal("hide")

            $("#hdID").val("0")
            $("#txtName").val("")
            $("#txtEmail").val("")
            $("#txtPhone").val("")


            TableData()
        }
    })
})