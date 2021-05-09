$("#stickbtn").click( function () {

  $("#sticker").css("display","none");
  
}) 


$(document).ready(function(){



  var owloptions={
    dots:false,
    rtl:true,
    responsive:{
    0:{
      items:1,
    },
    480:{
      items:2,
    },
    768:{
      items:3,
    },
    992:{
      items:4,
    },
   1200:{
      items:5,
    }
  }
  };
$.ajax({
    url:"https://fakestoreapi.com/products?sort=desc",
    success:function(res){

      var cart_items = localStorage.getItem("cart_items");
      if(cart_items){
        cart_items = JSON.parse(cart_items)
      }

      res.forEach(element => {

        var objFromCart= cart_items && cart_items.find((obj,index )=>{

          return obj.id == element.id;
        })

        $("#fav-products").append(`
            <div  class=" product p-1 ">
                <img src="${element.image}" alt="" class="imgcarousel ">
                <div > ${element.title}</div>
              <div class=" row mt-1  ">
                <div class=" col-md-12 ">
                <h6 class="bold"> ${element.price} تومان</h6>     
                </div>
                <div class="col-md-12 ">
                `+(objFromCart ? 
                `<p class="cartControl  ">
                <i class="fas fa-plus add" data-cart-id="${element.id}"></i> 
                <span>${objFromCart.count}</span>
                <i class="fas fa-minus remove" data-cart-id="${element.id}"></i>
                 </p>` :
                 `<button data-id="${element.id}" class="btn btn-outline-dark w-100 btn-sm btncarousel">افزودن به سبد</button> `)
                  +`
                </div>     
              </div>
            </div>
                
        `)
      });
      $(".owl-carousel").owlCarousel(owloptions);
    },
    
  });

  $("#fav-products").on("click", ".btncarousel",function(){

    var productId = Number($(this).attr("data-id"));
    var productName =$(this).parent().parent().prev().text();
    var productImg =$(this).parent().parent().prev().prev().attr("src");
    var productPrice =$(this).parent().prev().text();

    var product ={
      id:productId,
      name:productName,
      img:productImg,
      price:productPrice,
      count:1
    };
 
    var count=1;
    var products;
    const cart_items = localStorage.getItem("cart_items");

    if(cart_items == null){

      products= [product];

    }else {
          products=JSON.parse(cart_items);
            products.push(product);

            
          }

          var buttonParent= $(this).parent();

          $(this).remove();
          $(buttonParent).append(`
            <p class="cartControl  ">
                <i class="fas fa-plus add " data-cart-id="${productId}"></i> 
                <span>${count}</span>
                <i class="fas fa-minus remove"  data-cart-id="${productId}" ></i>
                 </p>
          `)
          localStorage.setItem("cart_items",JSON.stringify(products));
  })

 
  $("#fav-products").on("click",".remove,.add",function(){
    
    var cart_products = JSON.parse(localStorage.getItem("cart_items")) ;
    var id = $(this).attr("data-cart-id");

    var index= cart_products.findIndex(function(product){
      return product.id ==id;
    })

    if($(this).hasClass("add")){

      cart_products[index].count = cart_products[index].count + 1;
      $(this).next().text( cart_products[index].count );

    }
    else{

      if(cart_products[index].count == 1){
       var productId =cart_products[index].id;

       cart_products= cart_products.filter(function(item){
          return productId !== item.id;
       })

       var grandpa= $(this).parent().parent();
       $(this).parent().remove();
       $(grandpa).append(`<button data-id="${productId}" class="btn btn-outline-dark w-100 btn-sm btncarousel">افزودن به سبد</button>`);


      }else{
        cart_products[index].count = cart_products[index].count - 1;

      }

      $(this).prev().text( cart_products[index].count );
     
    }

    localStorage.setItem("cart_items",JSON.stringify(cart_products))
  })

  $(window).scroll(function(){
    if( $(window).scrollTop()>280){

      $("#fixnav").addClass("fixnav");

    }else{
      $("#fixnav").removeClass("fixnav");
    }
  })
})


