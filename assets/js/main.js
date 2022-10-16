//api url
const URL_CATEGORY = "https://bl-backend.herokuapp.com/api/categories";
const URL_PRODUCT = "https://bl-backend.herokuapp.com/api/products";
const URL_SEARCH = "https://bl-backend.herokuapp.com/api/search/";

//api request for all categories
function getCategories() {
    fetch(URL_CATEGORY)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                createCategorieItem(data[i])
            }
        })
        .catch(error => console.log("Error: ",error));
}

//api request for all products
function getProducts() {
    fetch(URL_PRODUCT)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                createProductItem(data[i]);
            }
        })
        .catch(error => console.log("Error: ",error));
}

//show products by category(id category)
function getProductsbyCategory() {
    document.addEventListener('click', (e) => {
        const listCards = document.querySelectorAll('.col-md-3');
        if (e.target.closest('.nav-item')) {
            let dataFilter = e.target.getAttribute('data-id');
            for (let j = 0; j < listCards.length; j++) {
                listCards[j].classList.add('d-none');
                if (dataFilter == 0) {
                    listCards[j].classList.remove('d-none');
                }
                else if (listCards[j].getAttribute('data-item') == dataFilter) {
                    listCards[j].classList.remove('d-none');
                }
            }
        }
    })
}

//shows products by user input(product name)
function getSearch() {
    document.addEventListener('keyup', (e) => {
        const container = document.querySelector('.row');
        if (e.target.closest('.form-control')) {
            const val = e.target.value;
            deleteChilds();
            if(val == ''){
                getProducts();
            }
            else{        
                fetch(URL_SEARCH + val)
                .then(res => res.json())
                .then(data => {
                    if(data.length > 0){
                        for (let i = 0; i < data.length; i++) {
                            createProductItem(data[i]);
                        }
                    }
                    else{
                        container.innerHTML = "<h1 class=error >No se encontraron resultados</h1>";
                    }
                    
                })
                .catch(error => console.log("Error: ",error));
            }
        }
    })
}

//capital letter
function capitalLetter(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}

//shows the product categories
function createCategorieItem(data) {
    const ul = document.querySelector('.navbar-nav');

    const li = document.createElement('li');
    li.setAttribute('class', 'nav-item');

    const a = document.createElement('a');
    a.textContent = capitalLetter(data.name);
    
    a.setAttribute('class', 'nav-link');
    a.setAttribute('data-id', data.id);

    li.appendChild(a);
    ul.appendChild(li);
}

//validates if an image is available
function imageAvailable(imgUrl){
    if(imgUrl == null || imgUrl == ''){
        return "./assets/img/no_image.png";
    }
    else{
        return imgUrl;
    }
}

//show all products
function createProductItem(product) {
    const divContainer = document.querySelector('.row');

    const divCol = document.createElement('div');
    divCol.setAttribute('class', 'col-md-3 d-flex');

    divCol.setAttribute('data-item', product.category);

    const divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');


    const img = document.createElement('img');
    img.setAttribute('src',  imageAvailable(product.url_image));
    img.setAttribute('class', 'card-img-top img-fluid');
    img.setAttribute('alt', product.name);

    const divCardBody = document.createElement('div');
    divCardBody.setAttribute('class', 'card-body');

    const h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title');
    h5.textContent = product.name;

    const p = document.createElement('p');
    p.setAttribute('class', 'card-text');

    const small = document.createElement('small');
    small.setAttribute('class', 'text-muted');
    small.textContent = "$"+ product.price;

    p.appendChild(small);

    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);

    divCard.appendChild(img);
    divCard.appendChild(divCardBody);

    divCol.appendChild(divCard);

    divContainer.appendChild(divCol);

}

//remove child nodes
function deleteChilds(){
    const list = document.querySelector('.row');

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

getCategories();
getProducts();
getProductsbyCategory();
getSearch();