//so that the tests won't affect the HTML
function dontChangeHTML(){
    calculateTotal(yourCart);
    updateCartHtml(yourCart);
    $("#shopping-cart").fadeToggle();  
}

QUnit.test("Cart Initialization", function( assert ) {
    var cart = {
        itemsInCart: [],
        priceSum: 0
    }

    initializeCart(cart)

    for(var i=0;i<cart.itemsInCart.length;i++)
    {
        assert.equal(cart.itemsInCart[i].quantity,0)
    }

    dontChangeHTML()
  });


QUnit.test("Total Price Calculation", function( assert ) {
    var test_count = 20
    var expected;
    for(var j=0;j<test_count;j++)
    {
        expected = 0

        var cart = {
            itemsInCart: [],
            priceSum: 0
        }
    
        initializeCart(cart)

        for(var i=0;i<cart.itemsInCart.length;i++)
        {

            var random_quantity =  Math.floor(Math.random() * 5)
            var random_price = Math.floor(Math.random() * 5)
            cart.itemsInCart[i].quantity = Number(random_quantity)
            cart.itemsInCart[i].price = Number(random_price)

            expected = expected + random_quantity * random_price
        }   
    
        calculateTotal(cart)

        assert.equal(cart.priceSum,expected) 
    }

    dontChangeHTML()
  });

  QUnit.test("Add To Cart", function( assert ) {

    var test_count = 5
    var randomId;
    var currentQuantity;

    for(var i=0;i<test_count;i++)
    {
        var cart = {
            itemsInCart: [],
            priceSum: 0
        }
    
        initializeCart(cart)

        randomId = Math.floor(Math.random() * cart.itemsInCart.length)

        addToCart(cart,randomId)

        assert.equal(cart.itemsInCart[randomId].quantity,1)
    }

    dontChangeHTML()
  });

  QUnit.test("Incrementing/Decrementing the Quantity of Items", function( assert ) {

    var cart = {
        itemsInCart: [],
        priceSum: 0
    }

    initializeCart(cart)

    expectedQuantities = []
    for(var i=0;i<items.length;i++)
    {
        expectedQuantities.push(0)
        cart.itemsInCart[i].itemName = " "
    }

    var editCount=500;
    var randomId;
    var randomNum;

    for(var i=0;i<editCount;i++)
    {
        randomId = Math.floor(Math.random() * cart.itemsInCart.length)

        randomNum = Math.floor(Math.random() * 2)
        if(randomNum === 1)
        {
            quantityIncrement(cart,randomId)
            expectedQuantities[randomId]++
        }
        else
        {
            if(cart.itemsInCart[randomId].quantity == 1)
            {
                quantityDecrement(cart,randomId)
                expectedQuantities[randomId]--
                cart.itemsInCart[randomId].itemName = " "
            }
            else if(cart.itemsInCart[randomId].quantity > 1)
            {
                quantityDecrement(cart,randomId)
                expectedQuantities[randomId]--
            }
        }
    }

    for(var i=0;i<items.length;i++)
    {
        assert.equal(cart.itemsInCart[i].quantity,expectedQuantities[i])
    }

    dontChangeHTML()
  });

  QUnit.test("Editing Quantity of Items", function( assert ) {

    var cart = {
        itemsInCart: [],
        priceSum: 0
    }

    initializeCart(cart)

    expectedQuantities = []
    for(var i=0;i<items.length;i++)
    {
        expectedQuantities.push(0)
        cart.itemsInCart[i].itemName = " "
    }

    var editCount=50;
    var randomNumber;
    var randomId;

    for(var i=0;i<editCount;i++)
    {
        randomId = Math.floor(Math.random() * cart.itemsInCart.length)
        randomNum = Math.floor(Math.random() * 100) + 1

        updateQuantity(cart,randomId,randomNum)
        expectedQuantities[randomId] = randomNum
    }

    for(var i=0;i<items.length;i++)
    {
        assert.equal(cart.itemsInCart[i].quantity,expectedQuantities[i])
    }

    dontChangeHTML()
  });


