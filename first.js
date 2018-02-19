$(function(){


    var template=$(".template").html();
    var $productList= $(".table-left");

    var rightTemplate = $(".rightTemplate").html();
    var $rightUnbought = $(".whatsleft");
    var $rightBought=$(".whatssold");


    function refreshRight(){


        $rightUnbought.html("");
        $rightBought.html("");

        function addToRight($from,$to){

            $from.each(function(i,item){
                var $item = $(item);
                var rightProduct = $(rightTemplate);
                var amount = $item.find(".number").text();
                var name = $item.find(".name").text();
                rightProduct.find(".vertic").text(name);
                rightProduct.find(".vertic.red").text(amount);

                $to.append(rightProduct);

            });

        }

        addToRight($(".table-left .product.unbought"),$rightUnbought);
        addToRight($(".table-left .product.bought"),$rightBought);




    }



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
            refreshRight();
        });

        $product.find(".notBought").click(function(){
            $product.removeClass("bought");
            $product.addClass("unbought");
            refreshRight();
        });

        $product.find(".delete").click(function(){
            $product.remove();
            refreshRight();
        });



        $productList.append($product);
        refreshRight();
    }



    addProduct("Помідори");
    addProduct("Печиво");
    addProduct("Сир");




});