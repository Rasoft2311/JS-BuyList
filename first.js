$(function(){


    var template=$(".template").html();
    var $productList= $(".table-left");

    var rightTemplate = $(".rightTemplate").html();
    var $rightUnbought = $(".whatsleft");
    var $rightBought=$(".whatssold");

    function editAnimated($item, fn){
        $item.fadeOut(200,function(){
            fn();
            $item.fadeIn(200);
        });

    }


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
                    if($from.hasClass("unbought"))rightProduct.find(".vertic").removeClass("alreadyBought");
                    if($from.hasClass("bought"))rightProduct.find(".vertic").addClass("alreadyBought");
                    $to.append(rightProduct);




            });

        }

        addToRight($(".table-left .product.unbought"),$rightUnbought);
        addToRight($(".table-left .product.bought"),$rightBought);




    }






    function addProduct(name) {

        var $product = $(template);
        var productName = $product.find(".name");
        productName.text(name);

        var amount = 1;
        var $amount = $product.find(".number");
        $amount.text(amount);

        $product.find(".deladd.minus").attr("disabled", "true");

        $product.find(".buyProduct").click(function () {
            editAnimated($product, function () {
                $product.find(".name").addClass("alreadyBought");
                $product.removeClass("unbought");
                $product.addClass("bought");
                refreshRight();
            });

        });

        $product.find(".notBought").click(function () {
            editAnimated($product, function () {
                $product.find(".name").removeClass("alreadyBought");
                $product.removeClass("bought");
                $product.addClass("unbought");
                refreshRight();
            });


        });

        $product.find(".delete").click(function () {
            $product.slideUp(300, function () {
                $product.remove();
            });

            refreshRight();
        });

        $product.find(".deladd.plus").click(function () {
            editAnimated($amount, function () {
                var currentAmount = +$amount.text();
                $amount.text(++currentAmount);
                refreshRight();
                if (+$amount.text() >= 1) $product.find(".deladd.minus").removeAttr("disabled");
            });

        });

        $product.find(".deladd.minus").click(function () {
            editAnimated($amount, function () {

                var currentAmount = +$amount.text();
                $amount.text(--currentAmount);
                refreshRight();
                if (+$amount.text() === 1) $product.find(".deladd.minus").attr("disabled", "true");
            });

        });


        var $text = $product.find(".name");
        var $inputText = $product.find(".changeProductName");





        $text.click(function () {
            if(!$text.hasClass("alreadyBought")) {

                $text.addClass("changePassive");
                $inputText.addClass("changeActive");
                $inputText.find("input").val($text.text());
                $product.find(".changeProductName input").focus();


                $product.find(".changeProductName input").focusout(function () {
                    var inputVal = $inputText.find("input").val();
                    $text.text(inputVal);
                    $text.removeClass("changePassive");
                    $inputText.removeClass("changeActive");
                    refreshRight();
                });
            }




        });




        $productList.append($product);
        $product.hide();
        $product.slideDown(300);


        refreshRight();
    }

    setTimeout(function(){
        addProduct("Помідори");

    },15);

    setTimeout(function(){
        addProduct("Печиво");

    },100);

    setTimeout(function(){
        addProduct("Сир");

    },200);



    var $inputText = $(".text");

    $(".addbutton").click(function(){
        if($inputText.val()!=="") {
            addProduct($(".text").val());
            $inputText.val("");
            $(".text").focus();
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