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

        $product.find(".deladd.plus").click(function(){
            var currentAmount  = +$amount.text();
            $amount.text(++currentAmount);
            refreshRight();
        });

        $product.find(".deladd.minus").click(function(){
            var currentAmount  = +$amount.text();
            $amount.text(--currentAmount);
            refreshRight();
        });


        var $text = $product.find(".name");
        var $inputText = $product.find(".changeProductName");


        $product.find(".name").click(function () {
        $text.addClass("changePassive");
        $inputText.addClass("changeActive");
            $inputText.find("input").val($text.text());
            $product.find(".changeProductName input").focus();


            $product.find(".changeProductName input").focusout(function () {
                var inputVal=$inputText.find("input").val();
                $text.text(inputVal);
                $text.removeClass("changePassive");
                $inputText.removeClass("changeActive");
                refreshRight();
            });



        });



        $productList.append($product);
        refreshRight();
    }



    addProduct("Помідори");
    addProduct("Печиво");
    addProduct("Сир");

    var $inputText = $(".text");

    $(".addbutton").click(function(){
        if($inputText.val()!=="") {
            addProduct($(".text").val());

        }

    });

    $(".text").keyup(function(e){
        if(e.which==13) {
            if ($inputText.val() !== "") {
                addProduct($inputText.val());
                $inputText.val("");
            }
        }
    });




});