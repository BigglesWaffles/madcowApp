$(window).on('load', function () {
    // code here



    $('#tableftseCon').bootstrapTable({
        showRefresh: true
    });



    $('#tableftseCon').on('post-body.bs.table', function (e) {
        e.stopImmediatePropagation();

        $(".tickerSymbol.tableftseCon").click();

        [].forEach.call(document.querySelectorAll('#tableftse tr'),
            function (el) {
                el.addEventListener('click', function () {
                    [].forEach.call(document.querySelectorAll('#tableftse tr'), function (el) {
                        el.style.background = '#fff';
                    });
                    this.style.background = '#F5F5F5'
                });
            });

        $(".tableftseCon").on("click", function (e) {
             e.stopImmediatePropagation();
             let visibleBigTable = "";
             let visibleSmallTable = "";
             var classnamelist = $(this).attr("class");

             $(".tickerSymbol.tableftseCon").addClass("focus");
             $(".tickerSymbol.tableftseCon").addClass("active");

             $("div.bootstrap-table.bootstrap3").children("div.fixed-table-container").css("border", "none");
             $("div.fixed-table-container.fixed-height").css("border-top", "1px solid #ddd");

             if (classnamelist.includes("tableftseCon")) {
                 visibleBigTable = "#tableftseCon";
                 visibleSmallTable = "tableftse";
             }

             if (!classnamelist.includes("tickerSymbol")) {
                 $(".tickerSymbol.tableftseCon").removeClass("focus");
                 $(".tickerSymbol.tableftseCon").removeClass("active");
             }

    
             $(visibleBigTable).find("table > thead > tr > th").each(function (index) {
                 if (index > 18) {
                     return true;
                 }

                 if (classnamelist.includes($(this).data("field"))) {

                     $(".loader").css("display", "block");
                     $("#bigcontainer1").css("opacity", "0");
                     $("#bigcontainer2").css("opacity", "0");
                     $("#bigcontainer").css("opacity", "0");

                     sortTable2(visibleSmallTable, index, visibleBigTable, $(this).data("field"));

                     return true;
                 }
             });
         });

     });
 


    $("#sectorRisesBut").on("click", function () {
        $(".marginleft").css("bottom", "5px");
        $("#FTSE100But").removeClass("focus");
        $("#FTSE100But").removeClass("active");

        $.get("/routes/allSectors", {
        }, function (sdata) {
            //	alert(JSON.stringify(sdata));
            $(function () {
                $('#tableftseCon').hide();
                $('#tableoversoldCon').hide();
                $('#tablenetnetCon').hide();
                $('#tableftse250Con').hide();
                $('#tablesectorsCon').hide();
                $('#tableftsezzzCon').hide();
                $('#tableftseaimCon').hide();
                $('#sectorRiseCon').show();
                $('#sectorRise').bootstrapTable({
                    data: sdata
                });

            });
        });

    });

    $("#netnet").on("click", function () {

        $(".marginleft").css("bottom", "5px");
        $("#FTSE100But").removeClass("focus");
        $("#FTSE100But").removeClass("active");

        $.get("/routes/netnet", {
        }, function (sdata) {
            //	alert(JSON.stringify(sdata));
            $(function () {

                $('#tableftseCon').hide();
                $('#tableoversoldCon').hide();
                $('#tablenetnetCon').show();
                $('#tableftse250Con').hide();
                $('#tablesectorsCon').hide();
                $('#sectorRiseCon').hide();
                $('#table').bootstrapTable({
                    data: sdata
                });

            });

        });

    });

    $("#FTSE100But").on("click", function () {
        $(".marginleft").css("bottom", "-100px");
        $(".loader").css("display", "block");
        $("#bigcontainer1").css("opacity", "0");
        $("#bigcontainer2").css("opacity", "0");
        $("#bigcontainer").css("opacity", "0");
        getAllData("ftse100");

    });

    $("#FTSE250But").on("click", function () {
        $(".marginleft").css("bottom", "-100px");
         $(".loader").css("display", "block");
         $("#bigcontainer1").css("opacity", "0");
         $("#bigcontainer2").css("opacity", "0");
         $("#bigcontainer").css("opacity", "0");
         getAllData("ftse250");


     });

    $("#FTSEzzzBut").on("click", function () {
        $(".marginleft").css("bottom", "-100px");
        $(".loader").css("display", "block");
        $("#bigcontainer1").css("opacity", "0");
        $("#bigcontainer2").css("opacity", "0");
        $("#bigcontainer").css("opacity", "0");
        getAllData("ftserst");

    });

    $("#FTSEzzzBut").on("click", function () {
        $(".marginleft").css("bottom", "-100px");
         $(".loader").css("display", "block");
         $("#bigcontainer1").css("opacity", "0");
         $("#bigcontainer2").css("opacity", "0");
         $("#bigcontainer").css("opacity", "0");
         getAllData("ftserst");
      
    });



    $("#FTSEaimBut").on("click", function () {
        $(".marginleft").css("bottom", "-100px");
        $(".loader").css("display", "block");
        $("#bigcontainer1").css("opacity", "0");
        $("#bigcontainer2").css("opacity", "0");
        $("#bigcontainer").css("opacity", "0");
        getAllData("ftseaim");

    });


    function sortTable2(xx, sortCol, tablename, colname ) {

  
        var rows = $('#' + xx + ' tbody  tr').get();
    
        rows.sort(function (a, b) {

            

            $(a).children('td').each(function (index) {
                    $(this).css({ 'background-color': '', 'opacity': '' });
            });

             $(b).children('td').each(function (index) {
                 $(this).css({ 'background-color': '', 'opacity': '' });
             });
           
            $(a).children('td').eq(sortCol).css("background-color", "lightgreen");
            $(b).children('td').eq(sortCol).css("background-color", "lightgreen");


            if (colname == "stockName" || colname == "sector" || colname == "bullAdvice" || colname=="tickerSymbol") {

                var A = $(a).children('td').eq(sortCol).text().toUpperCase();
                var B = $(b).children('td').eq(sortCol).text().toUpperCase();
          
                if (colname != "bullAdvice") {
                    if (A < B) {
                        return -1;

                    }
                    if (A > B) {
                        return 1;
                    }
                } else {
                    if (A > B) {
                        return -1;
                    }
                    if (A < B) {
                        return 1;
                    }
                }
                return 0;
            }

            var A = $(a).children('td').eq(sortCol).text().toUpperCase();
            var B = $(b).children('td').eq(sortCol).text().toUpperCase();

            if (colname == "exDividend") {
                A = A.replace(/-/g, "0");
                B = B.replace(/-/g, "0");
            }


            var BB = B.replace("%", "");
            var AA = A.replace("%", "");


            var x = parseFloat(AA).toFixed(2);
            var y = parseFloat(BB).toFixed(2);

            if (x === 0 && y === 0)
                return 1 / y - 1 / x || 0;

            else {
                if (sortCol == 0) {
                    return x - y;
                }
                return y - x;


            }


        });


        $.each(rows, function (index, row) {
            $('#' + xx).children('tbody').append(row);
        });
        $("#bigcontainer1").css("opacity", "100%");
        $("#bigcontainer2").css("opacity", "100%");
        $("#bigcontainer").css("opacity", "100%");
        $(".loader").css("display", "none");
    }

    $("#FTSE100But").click().active;


    function setToolTip() {
        $("th.techsum").children('div.th-inner').attr("data-toggle", "tooltip");
        $("th.techsum").children('div.th-inner').attr("title", "Tech Summary was derived by adding technical signals (ocillators and moving averages) together. The higher the number the more BUY signals there are. So a 2 is a strong buy. A zero is a sell. However I've noticed that sometimes, because this is a day behind, the STRONG BUY can be the time to SELL and a STRONG SELL can be time to BUY. So the meaning is not clear, best used in conjuntion with other info (if use at all)");
        $("th.rsi").children('div.th-inner').attr("data-toggle", "tooltip");
        $("th.rsi").children('div.th-inner').attr("title", "Relative Strength Indicator. A low number indicates that stock is oversold and high is overbought. This indicator in conjunction with others is interesting");
        $("th.peRatio").children('div.th-inner').attr("data-toggle", "tooltip");
        $("th.peRatio").children('div.th-inner').attr("title", "Price Earnings ratio. A low pe means that the company makes a lot of money but the market is currently not putting enough value on that profit. So interesting stocks");
        $('[data-toggle="tooltip"]').tooltip();
     }


     function getAllData(exchange) {


         var routerVal = "";
         if (exchange == "ftse100") {
             routerVal = "routes/ftse100"
             $("#indexTitle").text("FTSE 100");
         }
         if (exchange != "ftse100") {
             $("#FTSE100But").removeClass("focus");
             $("#FTSE100But").removeClass("active");
         }
         if (exchange == "ftse250") {
             routerVal = "routes/ftse250";
             $("#indexTitle").text("FTSE 250");
         }
         if (exchange == "ftserst") {
             routerVal = "routes/ftserst";
             $("#indexTitle").text("FTSE REST (small cap etc)");
         }
         if (exchange == "ftseaim") {
             routerVal = "routes/ftseaim";
             $("#indexTitle").text("AIM");
         }

         $('#tableftse').bootstrapTable('refresh', {
             url: routerVal
         });

         $.get(routerVal, {
         }, function (sdata) {
             //	alert(JSON.stringify(sdata));
             $(function () {
                 $('#tableftseCon').show();
                 $('#tableoversoldCon').hide();
                 $('#tablenetnetCon').hide();
              /*   $('#tableftse250Con').hide();
                 $('#tablesectorsCon').hide();
                 $('#tableftsezzzCon').hide();
                 $('#tableftseaimCon').hide();*/
                 $('#sectorRiseCon').hide();
                 $("#netnetBut").hide();
                 

                 $('#tableftse').bootstrapTable({
                     data: sdata
                 });

                 var abc = ["a", "b", "c"];
                 for (let i = 0; i < abc.length; ++i) {
                     $(".image" + abc[i]).mouseover(function () {
                         $(".image" + abc[i]).css("cursor", "pointer");
                         $(".image" + abc[i] + "BIG").css("cursor", "pointer");
                     });
                     $(".image" + abc[i]).on("click", function (event) {
                         var indexVal = event.target.id;
                         if (indexVal.includes("image" + abc[i] + "BIG")) {
                             indexVal = indexVal.replace("image" + abc[i] + "BIG", "");
                             $('#image' + abc[i] + indexVal).show();
                             $('#' + event.target.id).hide();
                             $('#' + event.target.id).blur();
                             $('#image' + abc[i] + indexVal).focus();
                         } else {
                             indexVal = indexVal.replace("image" + abc[i], "");
                             $('#image' + abc[i] + 'BIG' + indexVal).show();
                             $('#' + event.target.id).hide();
                             $('#' + event.target.id).blur();
                             $('#image' + abc[i] + 'BIG' + indexVal).focus();
                         }
                     });
                 }

                 $("div.bootstrap-table.bootstrap3").children("div.fixed-table-container").css("border", "none");
                 $("div.fixed-table-container.fixed-height").css("border-top", "1px solid #ddd");
                 $(".tickerSymbol.tableftseCon").addClass("focus");
                 $(".tickerSymbol.tableftseCon").addClass("active");
                 sortTable2("tableftse",1, "#tableftseCon", "tickerSymbol");
             
                 setToolTip();

             });

         });

     }

});
