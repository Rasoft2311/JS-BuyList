$(function(){


    var template=$(".template").html();
    var $productList= $(".table-left");

    function addProduct(name){

        var $product =$(template);
        var productName=  $product.find(".name");
        productName.text(name);

        var amount = 1;
        var $amount = $product.find(".number");
        $amount.text(amount);

        $product.find(".buyProduct").click(function(){
        $product.removeClass("unbought");
        $product.addClass("bought");
        });

        $product.find(".notBought").click(function(){
            $product.removeClass("bought");
            $product.addClass("unbought");
        });

        $productList.append($product);
    }



    addProduct("Помідори");
    addProduct("Печиво");
    addProduct("Сир");




});