const CART = {
    KEY: 'Produtos',
    contents: [],
    init(){
        let _contents = localStorage.getItem(CART.KEY);
        if(_contents){
            CART.contents = JSON.parse(_contents);
        }
    },
    async sync(){
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id){
        let match = CART.contents.filter(item=>{
            if(item.id == id)
                return true;
        });
        if(match && match[0])
            return match[0];
    },
    add(id){
        if(CART.find(id)){
            CART.increase(id, 1);
        }else{
            let arr = PRODUCTS.filter(product=>{
                if(product.id == id){
                    return true;
                }
            });
            if(arr && arr[0]){
                let obj = {
                    id: arr[0].id,
                    title: arr[0].title,
                    qty: 1,
                    itemPrice: arr[0].price
                };
                CART.contents.push(obj);
                CART.sync();
            }
        }
    },
    increase(id, qty=1){
        CART.contents = CART.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty + qty;
            return item;
        });
        CART.sync()
    },
    reduce(id, qty=1){
        CART.contents = CART.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty - qty;
            return item;
        });
        CART.contents.forEach(async item=>{
            if(item.id === id && item.qty === 0)
                await CART.remove(id);
        });
        CART.sync()
    },
    remove(id){
        CART.contents = CART.contents.filter(item=>{
            if(item.id !== id)
                return true;

        });
        CART.sync()
    },
    empty(){
        CART.contents = [];
        CART.sync()
    }
};

let PRODUCTS = [];

document.addEventListener('DOMContentLoaded', ()=>{
    getProducts( showProducts, errorMessage );
    CART.init();
    });



function decrementCart(ev){
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.reduce(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);
    if(item){
        qty.textContent = item.qty;
        total();
    }else{
        qty.textContent = '';
    }
}

function getProducts(success, failure){
  fetch('./data.json',{
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   } 
 })
    .then(response=>response.json())
    .then(showProducts)
    .catch(err=>{
        errorMessage(err.message);
    });
}

function showProducts( products ){
    PRODUCTS = products;
    let imgPath = './assents/produtos/';
    let productSection = document.getElementById('products');
    productSection.innerHTML = "";
    products.forEach(product=>{
        let card = document.createElement('div');
        card.className = 'card';
        let img = document.createElement('img');
        img.className = 'imgProd';
        img.alt = product.title;
        img.src = imgPath + product.img;
        card.appendChild(img);
        let title = document.createElement('h2');
        title.textContent = product.title;
        title.id = 'titleProd';
        card.appendChild(title);
        let desc = document.createElement('p');
        desc.textContent = product.desc;
        desc.id = "descProp"
        card.appendChild(desc);
        let price = document.createElement('p');
        let cost = new Intl.NumberFormat('pt-br', 
            {style:'currency', currency:'BRL'}).format(product.price);
        price.textContent = cost;
        price.className = 'price';
        card.appendChild(price);
        let btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = 'Adicionar ao Carrinho';
        btn.setAttribute('data-id', product.id);
        btn.addEventListener('click', addItem);
        card.appendChild(btn);
        let controls = document.createElement('div');
        controls.className = 'controls';
        card.appendChild(controls);
        let plus = document.createElement('span');
        plus.className = 'qtProd';
        plus.textContent = '+';
        plus.setAttribute('data-id', product.id)
        controls.appendChild(plus);
        plus.addEventListener('click', addItem)
        let qty = document.createElement('span');
        qty.textContent = product.qty;
        qty.className = 'qtyProd';
        controls.appendChild(qty);
        let minus = document.createElement('span');
        minus.className = 'qtProd';
        minus.textContent = '-';
        minus.setAttribute('data-id', product.id)
        controls.appendChild(minus);
        minus.addEventListener('click', decrementCart)
        productSection.appendChild(card);
    })
}

function addItem(ev){
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.add(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);
    if(item){
        qty.textContent = item.qty;
        total()
}}

function errorMessage(err){
    console.error(err);
}
function total (){
  const jsonData = window.localStorage.getItem('Produtos');
  const data = JSON.parse(jsonData);
  let calcTotal = data.reduce((sum, a) => { return sum + a.qty; }, 0);
  let div = document.getElementById('carrinho')
  let totalItens = document.createElement('span')
  totalItens.className = 'carrinhoItens'
  totalItens.textContent = calcTotal
  div.appendChild(totalItens)
}
