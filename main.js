let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')


let mood = 'create'
let tmp;

// console.log(title,price,taxes,ads,discount,total,count,category,submit);

//get total


function getTotal() {

    if (price.value != '') {

        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(144, 0, 0)'
    }
}

//Creat product

if (localStorage.product != null) {

    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}


submit.onclick = function () {

    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if(title.value != '' && price.value != '' && newpro.count < 100 ){
        
        if (mood === 'create') {
            if (newpro.count > 1) {
    
                for (let i = 1; i < newpro.count; i++) {
    
                    datapro.push(newpro)
                }
    
            } else {
    
                datapro.push(newpro)
            }
    
        } else {
            datapro[tmp] = newpro
            mood = 'create';
            submit.innerHTML = 'create'
            count.style.display = 'block'
        }
        cleardata()

    }




    //save localstorage
    localStorage.setItem('product', JSON.stringify(datapro))


    
    showdata()
}


//clear inputs

function cleardata() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';


}

//reads

function showdata() {

    getTotal()
    let table = '';

    for (let i = 0; i < datapro.length; i++) {
        table +=

            `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].Ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button class="btn btn-outline-primary" onclick ="updataData(${i})"  id="Update">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick = "deletedata(${i})" id="Delate">Delate</button></td>
        </tr>
        `
    }


    document.getElementById('tbody').innerHTML = table;

    let btndelate = document.getElementById('delateall')

    if (datapro.length > 0) {

        btndelate.innerHTML = `
        <button class = "Delateme" onclick = "delateall()">  Delate All (${datapro.length})</button>
        `

    } else {
        btndelate.innerHTML = '';
    }

}
showdata()
//delate

function deletedata(i) {


    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata()


}
function delateall() {
    localStorage.clear()
    datapro.splice(0)
    showdata()
}
//count



//update

function updataData(i) {

    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    getTotal()
    count.style.display = 'none'
    title.category = datapro[i].category
    submit.innerHTML = 'Update'
    mood = 'Update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

//search

let searchModd = 'title'

function searchData(value) {

    let table = '';

    if (searchModd == 'title') {

        for (let i = 1  ; i < datapro.length; i++) {

            if (datapro[i].title.includes(value.toLowerCase())) {

                table +=

                    `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].Ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button class="btn btn-outline-primary"  onclick ="updataData(${i})"  id="Update">Update</button></td>
                <td><button class="btn btn-outline-danger" onclick = "deletedata(${i})" id="Delate">Delate</button></td>
                </tr>
                `
            }
        }
    }


    document.getElementById('tbody').innerHTML = table;
}

//clean data

