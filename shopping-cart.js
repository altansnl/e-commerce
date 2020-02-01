var yourCart = {
    itemsInCart: [],
    priceSum: 0
}

class item {
    constructor(itemNameX, priceX, quantityX, imgUrlX) {
        this.itemName = itemNameX
        this.price = priceX
        this.quantity = quantityX
        this.imgUrl = imgUrlX
    }
}

var items = [new item("White Ceramic \"Begin\" Mug",15.99,1,"imgs/mug1.jpg"),
new item("Black \"Forest\" Mug",17.99,1,"imgs/mug2.jpg"),
new item("Black \"Never Settle\" Mug",13.99,1,"imgs/mug3.jpg"),
new item("Santa Claus Mug",19.99,1,"imgs/mug4.jpg"),
new item("Small Ceramic Mug",11.99,1,"imgs/mug5.jpg"),
new item("Cuba Mug",15.99,1,"imgs/mug6.jpg"),
new item("White \"Encouraging\" Mug",15.99,1,"imgs/mug7.jpg"),
new item("United Kingdom Mug",17.99,1,"imgs/mug8.jpg"),
new item("\"The Adventure Begins\" Mug",17.99,1,"imgs/mug9.jpg")
]

//initializes all items in cart to 0 quantity
function initializeCart(yourCart)
{
    for(var i=0;i<items.length;i++)
    {
        yourCart.itemsInCart.push(new item("",0,0,""))
    }   
}

//calculates the total price of items currently in cart
function calculateTotal(yourCart)
{
    var sum=0
    for(var i=0;i<yourCart.itemsInCart.length;i++)
    {
        sum += yourCart.itemsInCart[i].price * yourCart.itemsInCart[i].quantity
    }      
    yourCart.priceSum = sum
}

//adds an item to the cart
function addToCart(yourCart,id)
{
    var currentItem = items[id]

    //if item was already on cart
    if(yourCart.itemsInCart[id].itemName === items[id].itemName)
    {
        yourCart.itemsInCart[id].quantity++
    }
    else
    {
        yourCart.itemsInCart[id].itemName = items[id].itemName
        yourCart.itemsInCart[id].price = items[id].price
        yourCart.itemsInCart[id].quantity = 1
        yourCart.itemsInCart[id].imgUrl = items[id].imgUrl
    }

    calculateTotal(yourCart)
    updateCartHtml(yourCart);
}

//adds an item to cart, in HTML
function itemToCart(url,name,quantity,price,id)
{
    var itemHTML = "";
    itemHTML += "<div class=\"cart-item\"><span class=\"item-properties\"><span class=\"item-id\">" + id + "</span> <span class=\"cart-buttons mx-2\"> <button class=\"cart-delete\"> <i class=\"fas fa-times\"></i>"
    itemHTML += "</button> </span> <img class=\"cart-img mx-2\" src=\"" + url + "\" alt=\"\" onerror=\"this.onerror=null;this.src=\'imgs/default.png\';\"> <span id=\"cart-description\" class=\"cart-description mx-2\">" + name + " </span></span>"
    itemHTML += "<span class=\"item-checkout\"><span class=\"cart-price mx-2\">" + (price * quantity).toFixed(2) + "$</span>"
    itemHTML += "<span class=\"cart-quantity mx-2\"> <button class=\"button-minus\"> <i class=\"fas fa-minus\"></i></button><input class=\"text-center\" type=\"text\" name=\"name\" value=\"" + quantity + "\">"         
    itemHTML += "<button class=\"button-plus\"><i class=\"fas fa-plus\"></i></button> </span> </span> </div><hr class=\"style-six\">"

    return itemHTML;
}

//updates the HTML of the cart
function updateCartHtml(yourCart)
{
    var cartHTML = "<div id=\"shopping-cart\"> <div class=\"cart-title text-center mt-2\">  Shopping Cart </div> <hr class=\"style-six\">\n"
    var currentItem;

    for(var i=0;i<yourCart.itemsInCart.length;i++)
    {
        if(yourCart.itemsInCart[i].quantity > 0)
        {
            currentItem = yourCart.itemsInCart[i]
            cartHTML += itemToCart(currentItem.imgUrl, currentItem.itemName, currentItem.quantity, currentItem.price, i) + "\n"
        }
    }

    cartHTML += "<div class=\"final-price mb-2\"> <span> <span class=\"total-price\"> Total: " + yourCart.priceSum.toFixed(2) + "$ </span> <button>Order Now</button> </span> </div>\n"

    $("#shopping-cart").replaceWith(cartHTML)
    setCartListeners()
}

//completely clears all items from the cart
function clearCart(yourCart)
{
    for(var i=0;i<yourCart.itemsInCart.length;i++)
    {
        yourCart.itemsInCart[i].itemName = ""
        yourCart.itemsInCart[i].price = 0
        yourCart.itemsInCart[i].quantity = 0
        yourCart.itemsInCart[i].imgUrl = ""
    }
    calculateTotal(yourCart);
    updateCartHtml(yourCart);
    $("#shopping-cart").fadeToggle();
}

//increments the quantity of an item
function quantityIncrement(yourCart,id){
    var currentQuantity = yourCart.itemsInCart[id].quantity;
    if(yourCart.itemsInCart[id].itemName !== "")
    {
        yourCart.itemsInCart[id].quantity = Number(currentQuantity) + 1;
    }
    calculateTotal(yourCart);
    updateCartHtml(yourCart);
    $("#shopping-cart").fadeToggle();
}

//decrement the quantity of an item
function quantityDecrement(yourCart,id){
    var currentQuantity = yourCart.itemsInCart[id].quantity
    if(currentQuantity === 1)
    {
        yourCart.itemsInCart[id].itemName = ""
        yourCart.itemsInCart[id].price = 0
        yourCart.itemsInCart[id].quantity = 0
        yourCart.itemsInCart[id].imgUrl = ""
    }
    else
    {
        yourCart.itemsInCart[id].quantity = currentQuantity - 1;
    }
    calculateTotal(yourCart);
    updateCartHtml(yourCart);
    $("#shopping-cart").fadeToggle();
}

initializeCart(yourCart);

$("#order-tab button").on("click",function(){

    var id = Number($(this).siblings(".id").text())

    $(this).siblings("i").fadeIn("slow").delay(500).fadeOut("slow")

    addToCart(yourCart,id)
    $("#shopping-cart").fadeToggle()
});

//updates the quantity of an item
function updateQuantity(yourCart,itemId,value)
{
    if(value<=0)
    {
        yourCart.itemsInCart[itemId].itemName = ""
        yourCart.itemsInCart[itemId].price = 0
        yourCart.itemsInCart[itemId].quantity = 0
        yourCart.itemsInCart[itemId].imgUrl = ""
    }
    else
    {
        yourCart.itemsInCart[itemId].quantity = value
    }

    calculateTotal(yourCart);
    updateCartHtml(yourCart);
    $("#shopping-cart").fadeToggle();
}


//Event listeners
function setCartListeners(){
    $(".button-minus").on("click",function(){
        var itemId = Number($(this).parent().parent().siblings(".item-properties").children(".item-id").text())
        quantityDecrement(yourCart,itemId)
    })
    
    $(".button-plus").on("click",function(){
        var itemId = Number($(this).parent().parent().siblings(".item-properties").children(".item-id").text())
        quantityIncrement(yourCart,itemId)
    })

    $(".cart-quantity input").change(function(){
        var value = $(this).val()
        var itemId = Number($(this).parent().parent().siblings(".item-properties").children(".item-id").text())

        updateQuantity(yourCart,itemId,value)
    })

    $(".cart-delete").on("click",function(){
        var itemId = Number($(this).parent().siblings(".item-id").text())

        yourCart.itemsInCart[itemId].itemName = ""
        yourCart.itemsInCart[itemId].price = 0
        yourCart.itemsInCart[itemId].quantity = 0
        yourCart.itemsInCart[itemId].imgUrl = ""

        calculateTotal(yourCart);
        updateCartHtml(yourCart);
        $("#shopping-cart").fadeToggle();
    })
}



