
const btnCart=document.querySelector('#cart-icon')
const cart=document.querySelector('.cart')
const btnClose=document.querySelector('#cart-close')

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});
// (i.e) When click the cart button, the cart list is shown 
//by adding the cart-active class into the cart class which is we are already created 


btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});
// (i.e) When click the cart remove button, the cart list is hidden 
//by removing the cart-active class from the cart class which is we are already created 


document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent()
}

function loadContent(){

//Remove Food Items From Cart
 let btnRemove= document.querySelectorAll('.cart-remove')
btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
});

let qtyElements=document.querySelectorAll('.cart-quantity')
qtyElements.forEach((input)=>{
input.addEventListener('change',changeQnty);
});


let btnAdd=document.querySelectorAll('.add-cart') 
btnAdd.forEach((addbtn)=>{
    addbtn.addEventListener('click',addItem);
});
}

//Remove Item
function removeItem(){
    if(confirm('Are you sure to Remove this Item')){

    //this is for when you add one item to cart,and delete that item
    //- when i am not needed , then again add that particular item to 
    //-cart, it indicates that the product is already added -from the 
    //-notification even i delete that item from the cart, so make sure 
    //-to if i am delete that particular item, it will not notify that
    //-the item is already added to this cart. So delete this from array
    let title= this.parentElement.querySelector('.cart-food-title').innerHTML
    itemList=itemList.filter(ele=>ele.title!==title)
    this.parentElement.remove();
    loadContent();
    }
}
 

//change quantity:
function changeQnty(){
    if (isNaN(this.value)|| this.value < 1) {
        this.value=1;
    }
    loadContent();
}

let itemList=[];
//storing an item into this array for find the duplicates

//Add Item:
function addItem(){
// cart.addClassList.add(this)
let food=this.parentElement;
// console.log(food.querySelector('.food-title').innerHTML);
let title=food.querySelector('.food-title').innerHTML;
let price=food.querySelector('.food-price').innerHTML;
let imageSrc=food.querySelector('.food-image').src;
// console.log(title,price,image);
//Getting all the details such as title,price,image of the products
//-when click the add to cart button


let newProductElement =createCartProducts(title,price,imageSrc);
//new Item will be created by adding that cart details (title,price,image)
//- when click the add to cart button everytime and store this element
//- into one variable

let element=document.createElement('div');
//creating one div tag for our new productelement

element.innerHTML=newProductElement;
//then  aading that new product element into our div tag

let cartBasket=document.querySelector('.cart-content');
//getting that cart-content class for add that new item into our cart-content class. 

cartBasket.append(element);
//by got that cart-content class for already added div tag into this cartcontent class.

loadContent();
//recalling this method for delete and increase the count of the items

let newProduct={title,price,imageSrc}
//when click the add to cart item, the item will come to the cart 
//-then check this new product whether it is original or duplicate by comparig from array

if(itemList.find((ele)=>ele.title==newProduct.title))
    {
        alert("this product is already added into this cart");
    return;
    }
    //return is provided for when you add the item multiple times
    // -it will notify me that the product is already added to the cart,
    //-then after click the ok button on the alert message again that
    //- particulat item is added to the cart, so using this to overcome the problem.
    else{
        itemList.push(newProduct);
    };
//check if the itemlist array already having this added item,give the alert message as already added product
//-if not this  itemlist array not having this added item, can add this item to array

//but,if you remove this newly added item from your cart and again add that particular item,
//-you will get the notification that you already added this item i.e,
//-this will not removed from your array

updateTotal();
}

//after getting all the details of the products putting into 
//-the cart items list by the cart details format
function createCartProducts(title,price,imageSrc){
    return(
    `<div class="cart-box">
    <img src="${imageSrc}" class="cart-img" alt="no im">
    <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
            <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>`);
}

function updateTotal(){
const cartItems= document.querySelectorAll('.cart-box');
const totalValue=document.querySelector('.total-price');

let total=0;
cartItems.forEach(product=>{
   let priceElement= product.querySelector('.cart-price');
let price = parseFloat(priceElement.innerHTML.replace('Rs.',""));
let qty=product.querySelector('.cart-quantity').value;
total+=(price*qty);
product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
});
totalValue.innerHTML='Rs.'+total;


//Item count:
const cartCount= document.querySelector('.cart-count');
let count=itemList.length;
cartCount.innerHTML=count;

if (count== 0) {
    cartCount.style.display='none';
    
}
else{
    cartCount.style.display='block'
}
}

// let itemFound=itemList.find((ele)=>ele.title==newProduct.title)
//     if(itemFound){
//         alert("this product is already added into this cart");
    
    
//     }
//     else{
//         itemList.push(newProduct)
//     };