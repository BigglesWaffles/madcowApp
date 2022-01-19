$(window).on('load', function () {
    // code here


    $('#tableftseCon').bootstrapTable({
        showRefresh: true
    });

    //$('#tableftse').bootstrapTable('hideColumn', 'netNet');

    $('#tableftse').on('post-body.bs.table', function (e) {
        e.stopImmediatePropagation();

       // $('#tableftse').bootstrapTable('hideColumn', 'sector');

        $(".tableftseCon").parent("div").parent("th").off("click");
        $("#tableftseCon").css("opacity", "1");
        $("#bigcontainer2").css("opacity", "1");

        [].forEach.call(document.querySelectorAll('#tableftse tr'),
            function (el) {
                el.addEventListener('click', function () {
                    [].forEach.call(document.querySelectorAll('#tableftse tr'), function (el) {
                        el.style.background = '#fff';
                    });
                    this.style.background = '#F5F5F5'
                });
            });

        $(".tableftseCon").parent("div").parent("th").on("click", function (e) {
            e.stopImmediatePropagation();
            let visibleBigTable = "";
            let visibleSmallTable = "";
            var classnamelist = $(this).children("div.th-inner").children("span").attr("class");
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
                if (index > 21) {
                    return true;
                }
                $(this).mouseenter(function () {
                    let smallTest = $(this).attr("class");
                    if (smallTest != "day" && smallTest != "week" && smallTest != "years") {
                        $(this).addClass("makedarker");
                    }
                });
                if (classnamelist.includes($(this).data("field"))) {

                    $(".loader").css("opacity", "1");
                    $("#bigcontainer1").css("opacity", "0");
                    $("#bigcontainer2").css("opacity", "0");
                    $("#bigcontainer").css("opacity", "0");
                    $("#indexTitleSort").text('current sort order: ' + $(this).data("field"));

                    sortTable2(visibleSmallTable, index, visibleBigTable, $(this).data("field"));

                    return true;
                }
            });
        });
        $(".tickerSymbol.tableftseCon").parent("div").parent("th").click();

    });

    $(".fixed-table-toolbar").find("button").on("click", function(){
        $(".loader").css("opacity", "0");
        $("#bigcontainer1").css("opacity", "100%");
        $("#bigcontainer2").css("opacity", "100%");
        if (tablename == "#tableftseCon") {
            $("#bigcontainer").css("opacity", "100%");
        } else {
            $("#bigcontainer").css("opacity", "0");
        }
    });

    $("#sectorRisesBut").on("click", function () {

        $("#bigcontainer2").css("opacity", "0");
        $("#bigcontainer").css("opacity", "0");
        $("#indexTitle").text("Which sectors are doing well or badly");
        $(".marginleft").css("bottom", "5px");
        $("#FTSE100But").removeClass("focus");
        $("#FTSE100But").removeClass("active");

        $.get("/routes/allSectors", {
        }, function (sdata) {
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
        $("#bigcontainer2").css("opacity", "0");
        $("#bigcontainer").css("opacity", "0");
        $(".marginleft").css("bottom", "5px");
        $("#FTSE100But").removeClass("focus");
        $("#FTSE100But").removeClass("active");

        $("#indexTitle").text("Net Net stocks in order of netnet-ness as a percentage");
        $.get("/routes/netnet", {
        }, function (sdata) {
 
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






    $("#delayBut").on("click", function () {

        $('#tableftse tr').each(function (i, row) {

            if ($.trim($("#aa" + i).text()) != "") {
                var curIndex = i;

                var ticker = $.trim($("#aa" + i).text());

                $.post("/routes/currentPercent", {
                    ticker
                }, function (sdata) {

                    if (sdata.percentUp < 0) {
                        $("#butt" + curIndex).parent().html("<span style='color:red' > &nbsp; <img src='/images/arrow_down_red.svg''>  &nbsp; " + sdata.percentUp + "%</span>");
                    }
                    if (sdata.percentUp == 0) {
                        $("#butt" + curIndex).parent().html("<span> &nbsp;  &nbsp;  &nbsp; &nbsp; " + sdata.percentUp + "%</span>");
                    }
                    if (sdata.percentUp > 0) {
                        $("#butt" + curIndex).parent().html("<span  style='color:green'>  &nbsp; <img src='/images/arrow_up_green.svg'>  &nbsp; " + sdata.percentUp + "%</span>");
                    }



                });

            }
        });

    });

    $("#FTSE100But").on("click", function () {
        getAllData("ftse100");
    });
    $(".FTSE100But").on("click", function () {
        getAllData("ftse100");
    });
    $("#FTSE250But").on("click", function () {
        getAllData("ftse250");
    });
    $(".FTSE250But").on("click", function () {
        getAllData("ftse250");
    });
    $("#FTSEzzzBut").on("click", function () {
        getAllData("ftserst");
    });
    $(".FTSEzzzBut").on("click", function () {
        getAllData("ftserst");
    });
    $("#FTSEaimBut").on("click", function () {
        getAllData("ftseaim");
    });
    $(".FTSEaimBut").on("click", function () {
        getAllData("ftseaim");
    });
    $(".netnetBut").on("click", function () {
        getAllData("netnet");
    });



    function sortTable2(xx, sortCol, tablename, colname) {


        var rows = $('#' + xx + ' tbody  tr').get();

        rows.sort(function (a, b) {



            $(a).children('td').each(function (index) {
                $(this).css({ 'background-color': '', 'opacity': '' });
            });

            $(b).children('td').each(function (index) {
                $(this).css({ 'background-color': '', 'opacity': '' });
            });

            $(a).children('td').eq(sortCol).css("background-color", "lavender");
            $(b).children('td').eq(sortCol).css("background-color", "lavender");


            if (colname == "stockName" || colname == "sector" || colname == "bullAdvice" || colname == "tickerSymbol") {

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

            if (colname == "peRatio") {
                if (x < 0) {
                    x = (x * -1) * 1000;
                }
                if (y < 0) {
                    y = (y * -1) * 1000;
                }
                if (y == 0) {
                    y = 1000;
                }
                if (x == 0) {
                    x = 1000;
                }
                return x - y;
            }

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
        if (tablename == "#tableftseCon") {
            $("#bigcontainer").css("opacity", "100%");
        } else {
            $("#bigcontainer").css("opacity", "0");
        }
        $(".loader").css("opacity", "0");
        $("button[title='Refresh']").css("display", "none");
        $("#tableftseCon").find("table > thead > tr > th").each(function (index) {
            let smallTest = $(this).attr("class");
            if (smallTest != "day" && smallTest != "week" && smallTest != "years") {
                if ($(this).attr("class").trim() == colname || index == sortCol) {
                    $(this).css("background-color", "#cfe0f2");

                } else {
                    $(this).css("background-color", "lightblue");
                }
                $(this).css('cursor', 'pointer');
            } else {
                $(this).css("background-color", "lightgrey");
            }
            $(this).children("div.th-inner").css("text-align", "center");

        });


    }

    $("#FTSE100But").click().active;


    function setToolTip() {
     //   $("th.techsum").children('div.th-inner').attr("data-toggle", "tooltip");
     //   $("th.techsum").children('div.th-inner').attr("title", "Tech Summary was derived by adding technical signals (ocillators and moving averages) together. The higher the number the more BUY signals there are. So a 2 is a strong buy. A zero is a sell. However I've noticed that sometimes, because this is a day behind, the STRONG BUY can be the time to SELL and a STRONG SELL can be time to BUY. So the meaning is not clear, best used in conjuntion with other info (if use at all)");
     //   $("th.rsi").children('div.th-inner').attr("data-toggle", "tooltip");
     //   $("th.rsi").children('div.th-inner').attr("title", "Relative Strength Indicator. A low number indicates that stock is oversold and high is overbought. This indicator in conjunction with others is interesting");
      //  $("th.peRatio").children('div.th-inner').attr("data-toggle", "tooltip");
      //  $("th.peRatio").children('div.th-inner').attr("title", "Price Earnings ratio. A low pe means that the company makes a lot of money but the market is currently not putting enough value on that profit. So interesting stocks");
      //  $('[data-toggle="tooltip"]').tooltip();
     }


     function getAllData(exchange) {

         $(".marginleft").css("bottom", "-70px");
         $(".loader").css("opacity", "1");
         $("#bigcontainer1").css("opacity", "0");
         $("#bigcontainer2").css("opacity", "0");
         $("#bigcontainer").css("opacity", "0");

         var routerVal = "";
         if (exchange == "ftse100") {
             routerVal = "routes/ftse100"
             $("#indexTitle").text(" current list: FTSE 100");
             $("#indexTitleSort").text('current sort order: ticker' );
         }
         if (exchange != "ftse100") {
             $("#FTSE100But").removeClass("focus");
             $("#FTSE100But").removeClass("active");
         }
         if (exchange == "ftse250") {
             routerVal = "routes/ftse250";
             $("#indexTitle").text(" current list: FTSE 250");
             $("#indexTitleSort").text('current sort order: ticker' );
         }
         if (exchange == "netnet") {
             routerVal = "routes/netnet";
             $("#indexTitle").text(" current list: Netnet stocks");
             $("#indexTitleSort").text('current sort order: ticker');
         }
         if (exchange == "ftserst") {
             routerVal = "routes/ftserst";
             $("#indexTitle").text(" current list: FTSE rest");
             $("#indexTitleSort").text('current sort order: ticker' );
         }
         if (exchange == "ftseaim") {
             routerVal = "routes/ftseaim";
             $("#indexTitle").text(" current list: AIM");
             $("#indexTitleSort").text('current sort order: ticker' );
         }

         $('#tableftse').bootstrapTable('refresh', {
             url: routerVal
         });

         $.get(routerVal, {
         }, function (sdata) {
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
                 let defaultCol = 1;
                 let defaultName = "tickerSymbol"
                 if (exchange == "netnet") {
                     defaultCol = 20;
                     defaultName = "netNet";
                 }
                 sortTable2("tableftse",defaultCol, "#tableftseCon", defaultName);


                 $("#tableftseCon").find("table > thead > tr > th").each(function (index) {
                     $(this).mouseenter(function () {
                         let smallTest = $(this).attr("class");
                         if (smallTest != "day" && smallTest != "week" && smallTest != "years") {
                             $(this).addClass("makedarker");
                         }
                     })
                     $(this).mouseleave(function () {
                         let smallTest = $(this).attr("class");
                         if (smallTest != "day" && smallTest != "week" && smallTest != "years") {
                             $(this).removeClass("makedarker");
                         }
                     })

                 });
                 setToolTip();

             });

         });

    }


    $(".searchBut").on("click", function () {
        var sector = $(this).text();
        $("#indexTitle").text(" current sector (across all indexes): " +sector);
        $.ajax({
            url: "/routes/search",
            type: "POST",
            data: { "search": sector },
            dataType: "json",
            success: function (sdata) {
                $(function () {
                    $('#tableftseCon').show();
                    $('#tableoversoldCon').hide();
                    $('#tablenetnetCon').hide();
                    $('#sectorRiseCon').hide();
                    $("#netnetBut").hide();

                    $('#tableftse').bootstrapTable('destroy');

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
                    sortTable2("tableftse", 1, "#tableftseCon", "tickerSymbol");


                    $("#tableftseCon").find("table > thead > tr > th").each(function (index) {
                        $(this).mouseenter(function () {
                            let smallTest = $(this).attr("class");
                            if (smallTest != "day" && smallTest != "week" && smallTest != "years") {
                                $(this).addClass("makedarker");
                            }
                        })
                        $(this).mouseleave(function () {
                            let smallTest = $(this).attr("class");
                            if (smallTest != "day" && smallTest != "week" && smallTest != "years") {
                                $(this).removeClass("makedarker");
                            }
                        })

                    });

                    setToolTip();

                });

            }
        });

    });

});
