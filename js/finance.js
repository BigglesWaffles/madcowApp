$(window).on('load', function () {
    // code here


    $('#tableftseCon').bootstrapTable({
        showRefresh: true
    });

    //$('#tableftse').bootstrapTable('hideColumn', 'netNet');

    $('#tableftse').on('post-body.bs.table', function (e) {
        e.stopImmediatePropagation();


        $(".donothing").on("click", function (e) {
            e.stopPropagation();
            return false;
        });

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



            $("#indexTitleSort").text('current sort order: ' + $(this).data("field"));


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

            $(visibleBigTable).find("#tableftse > thead > tr > th").each(function (index) {
                if (index > 21) {
                    return;
                }
                $(this).mouseenter(function () {
                    let smallTest = $(this).attr("class");
                    if (smallTest != "day" && smallTest != "week" && smallTest != "years") {
                        $(this).addClass("makedarker");
                    }
                });
                if (classnamelist.includes($(this).data("field"))) {

                    $(".loader").css("opacity", "1");
                    $("#bigcontainer1").css("opacity", "0.4");
                    $("#bigcontainer2").css("opacity", "0.4");
                    $("#bigcontainer").css("opacity", "0.4");
                    $("#indexTitleSort").text('current sort order: ' + $(this).data("field"));
                    var fred = $(this).data("field");
                    setTimeout(function () {
                        sortTable2(visibleSmallTable, index, visibleBigTable, fred);
                    }, 1000); // update about every second


                  //  sortTable2(visibleSmallTable, index, visibleBigTable, $(this).data("field"));

                }
            });
        });
      //  $(".tickerSymbol.tableftseCon").parent("div").parent("th").click();

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
        $("#activebutt").text("search");
        $("#bigcontainer2").css("opacity", "0.4");
        $("#bigcontainer").css("opacity", "0.4");
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

    $(".donothing").on("click", function (e) {
        e.stopPropagation();
        return false;
    });
         
    $("#netnet").on("click", function () {
        $("#activebutt").text("search");
        $("#bigcontainer2").css("opacity", "0.4");
        $("#bigcontainer").css("opacity", "0.4");
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

    $("#puppetBut").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up



                $.get("/routes/puppet", {}, function (sdata) {

                    console.log("im in here");


                    setTimeout(function () {
                        $(".loader").css("opacity", "0");
                        $("#bigcontainer1").css("opacity", "1");
                        $("#bigcontainer2").css("opacity", "1");
                        $("#bigcontainer").css("opacity", "1");
                        $("#puppetBut").prop('disabled', false);
                    }, 20000); // up


                });

    });


    $("#puppet2But").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up



        $.get("/routes/puppet2", {}, function (sdata) {

                    console.log("im in here");

            setTimeout(function () {
                $(".loader").css("opacity", "0");
                $("#bigcontainer1").css("opacity", "1");
                $("#bigcontainer2").css("opacity", "1");
                $("#bigcontainer").css("opacity", "1");
                $("#puppet2But").prop('disabled', false);
            }, 20000); // up


                });



    });



    $("#techieBut").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up

        $('#tableftse tr').each(function (i, row) {

            if ($.trim($("#aa" + i).text()) != "") {
                var curIndex = i;
                var ticker = $.trim($("#aa" + i).text()) + "|" + $("#activebutt").text();
                $.post("/routes/buySellOne", {
                    ticker
                }, function (sdata) {

                    console.log("im in here");

                    setTimeout(function () {
                        $(".loader").css("opacity", "0");
                        $("#bigcontainer1").css("opacity", "1");
                        $("#bigcontainer2").css("opacity", "1");
                        $("#bigcontainer").css("opacity", "1");
                        $("#techieBut").prop('disabled', false);
                    }, 20000); // up


                });

            }
        });

    });

    $("#newsBut").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up

    
        loopTickers();

        setTimeout(function () {
            $(".loader").css("opacity", "0");
            $("#bigcontainer1").css("opacity", "1");
            $("#bigcontainer2").css("opacity", "1");
            $("#bigcontainer").css("opacity", "1");
            $("#newsBut").prop('disabled', false);
        }, 20000); // up

;

    });




    function waitforme(milisec) {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, milisec);
        })
    }


    async function loopTickers() {


        for (var j = 0, l = $('#tableftse tr').length; j < l; j++) {

            await waitforme(200);
            if ($.trim($("#aa" + j).text()) != "") {
               var curIndex = j;

                var ticker = $.trim($("#aa" + j).text()) + "|" + $("#activebutt").text();

                demo(ticker, curIndex);

            }
        };
        console.log("Loop execution finished!)");
    }

  
    async function demo(ticker, curIndex) {
        console.log("demo getting called");

        $.post("/routes/currentNews", {
            ticker
        }, function (sdata) {


            if (sdata == null) {
                return;
            }
            if (sdata.currentnews == "error") {
                return;
            }
            const myArray = sdata.currentnews.split("|");
            if (myArray[1] == null || myArray[1].length < 2 || myArray[1] == "null") {
                return;
            }
            let bishbashbosh = myArray[1];
            let position2 = bishbashbosh.indexOf(" ");
            let billy = bishbashbosh.slice(position2);
            billy = billy.toLowerCase();
            if (billy.length > 25) {
                billy = billy.substring(0, 26);
            }

            $("#news" + curIndex).parent().html("<a target='_blank'  href='" + myArray[0] + "'>" + [bishbashbosh.slice(0, position2), "<br />", billy].join('') + "</a>");
            
        });
    }

    $("#FTSE100But").on("click", function () {
        getAllData("ftse100");
    });
//    $(".FTSE100But").on("click", function () {
 //       getAllData("ftse100");
 //   });
    $("#FTSE250But").on("click", function () {
        getAllData("ftse250");
    });
//    $(".FTSE250But").on("click", function () {
 //       getAllData("ftse250");
//    });
    $("#FTSEzzzBut").on("click", function () {
        getAllData("ftserst");
    });
 //   $(".FTSEzzzBut").on("click", function () {
 //       getAllData("ftserst");
 //   });
    $("#FTSEaimBut").on("click", function () {
        getAllData("ftseaim");
    });
 //   $(".FTSEaimBut").on("click", function () {
 //       getAllData("ftseaim");
 //   });
    $(".netnetBut").on("click", function () {
        getAllData("netnet");
    });



    function sortTable2(xx, sortCol, tablename, colname) {
        $(".loader").css("opacity", "1");
    //    $("#bigcontainer1").css("opacity", "0");
     //   $("#bigcontainer2").css("opacity", "0");
    //    $("#bigcontainer").css("opacity", "0");


        var rows = $('#' + xx + ' tbody  tr').get();

        rows.sort(function (a, b) {



            $(a).children('td').each(function (index) {
                $(this).css({ 'background-color': '', 'opacity': '' });
                $(this).children("span.aim").parent("td").parent("tr").css("background-color", "#FFF5EE");
                $(this).children("span.ftserst").parent("td").parent("tr").css("background-color", "#e0ffdd");
            });

            $(b).children('td').each(function (index) {
                $(this).children("span.aim").parent("td").parent("tr").css("background-color", "#FFF5EE");
                $(this).children("span.ftserst").parent("td").parent("tr").css("background-color", "#e0ffdd");
                $(this).css({ 'background-color': '', 'opacity': '' });
            });

            $(a).children('td').eq(sortCol).css("background-color", "lavender");
            $(b).children('td').eq(sortCol).css("background-color", "lavender");

            if (colname == "stockName" || colname == "sector" || colname == "bullAdvice" || colname == "tickerSymbol" || colname=="news") {

                var A = $(a).children('td').eq(sortCol).text().toUpperCase();
                var B = $(b).children('td').eq(sortCol).text().toUpperCase();

                if (colname != "bullAdvice" && colname != "news") {
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
                if (sortCol == 0 ) {
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

    function funcRef() {
        var hash = window.location.hash;
        hash = hash.replace("#", "");
        hash = hash.replace("%20", " ");
        if (hash.length > 1) {
            getSectorData(hash);
        } 
    }
    window.addEventListener("hashchange", funcRef, false);


    var hash = window.location.hash;
    hash = hash.replace("#", "");
    hash = hash.replace("%20", " ");
    if (hash.length > 1) {
        getSectorData(hash);
    } else {
        $("#FTSE100But").click().active;
    }


    function setToolTip() {
     //   $("th.navPercentIt").children('div.th-inner').attr("class", "tooltip");
    //    $("th.navPercentIt").children('div.th-inner').attr("data-toggle", "tooltip");
        $("th.naVPercentIt").attr("title", " A-I-L/M = Assets - Intangibles - Liabilities / Mrk Cap ");
        $("th.navPercent").attr("title", " A-L/M = Assets - Liabilities / Mrk Cap ");
     //   $("th.rsi").children('div.th-inner').attr("data-toggle", "tooltip");
     //   $("th.rsi").children('div.th-inner').attr("title", "Relative Strength Indicator. A low number indicates that stock is oversold and high is overbought. This indicator in conjunction with others is interesting");
      //  $("th.peRatio").children('div.th-inner').attr("data-toggle", "tooltip");
      //  $("th.peRatio").children('div.th-inner').attr("title", "Price Earnings ratio. A low pe means that the company makes a lot of money but the market is currently not putting enough value on that profit. So interesting stocks");
        $('[data-toggle="tooltip"]').tooltip();
     }

    function getSectorData(sector) {

        $(".loader").css("opacity", "1");
        $("#bigcontainer1").css("opacity", "0.4");
        $("#bigcontainer2").css("opacity", "0.4");
        $("#bigcontainer").css("opacity", "0.4");
        $("#activebutt").text("search");

        $('#tableftse').bootstrapTable('destroy');
        $("#indexTitle").text(" Share selection criteria (across all indexes): " + sector.replaceAll("%20"," "));
        sector = sector.replace("/", "%2F");
        $.ajax({
            url: "/routes/search/"+sector,
            type: "GET",
            //  data: { "search": sector },
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



                    $(".excludeRst").css("display","");
                    $(".excludeAim").css("display", "");

                    $(".excludeRst").on("click", function () {
                        if (this.checked) {
                            //   $(".aim").parent("td").parent("tr").css("display", "none");
                            $(".ftserst").parent("td").parent("tr").hide();
                        } else {
                            //    $(".aim").parent("td").parent("tr").css("display", "");
                            $(".ftserst").parent("td").parent("tr").show();
                        }
                    });
                    $(".excludeAim").on("click", function () {
                        if (this.checked) {
                         //   $(".aim").parent("td").parent("tr").css("display", "none");
                            $(".aim").parent("td").parent("tr").hide();
                        } else {
                        //    $(".aim").parent("td").parent("tr").css("display", "");
                            $(".aim").parent("td").parent("tr").show();
                        }
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
                    var columnSelected = 1;
                    var columnSelectedText = "tickerSymbol";
                    if (sector.toLowerCase().includes("pe ratio")) {
                        columnSelected = 5;
                        columnSelectedText = "peRatio";
                    }
                    if (sector.toLowerCase().includes("intangibles")) {
                        columnSelected = 19;
                        columnSelectedText = "navPercentIt";
                    }
                    if (sector.toLowerCase().includes("assets - liabilites")) {
                        columnSelected = 18;
                        columnSelectedText = "navPercent";
                    }
                    if (sector.toLowerCase().includes("netnet")) {
                        columnSelected = 20;
                        columnSelectedText = "netNet";
                    }
                    $("div.bootstrap-table.bootstrap3").children("div.fixed-table-container").css("border", "none");
                    $("div.fixed-table-container.fixed-height").css("border-top", "1px solid #ddd");


                    setTimeout(function () {
                        sortTable2("tableftse", columnSelected, "#tableftseCon", columnSelectedText);
                    }, 500); // update about every second
                  //  sortTable2("tableftse", columnSelected, "#tableftseCon", "tickerSymbol");


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

              //      var url_ob = new URL(document.URL);
               //     url_ob.hash = '#blockchain';
                //    var new_url = url_ob.href;
                //    document.location.href = new_url;
                    setToolTip();

                });

            }
        });
    }

     function getAllData(exchange) {

         $(".marginleft").css("bottom", "-70px");
         $(".loader").css("opacity", "1");
         $("#bigcontainer1").css("opacity", "0.4");
         $("#bigcontainer2").css("opacity", "0.4");
         $("#bigcontainer").css("opacity", "0.4");
         $("#activebutt").text(exchange);

         var routerVal = "";
         if (exchange == "ftse100") {
             routerVal = "routes/ftse100"
             $("#indexTitle").text(" current list: FTSE 100");
             $("#indexTitleSort").text('current sort order: ticker' );
         }
         if (exchange == "ftse100") {
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

         $('#tableftse').bootstrapTable('destroy');
      //   alert("stop");

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
                     defaultCol = 21;
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

    $("#selectBox").on("click", function () {

        $(".excludeRst").css("display", "hidden");
        $(".excludeAim").css("display", "hidden");
        $("#excludeRst").prop("checked", false);
        $("#excludeAim").prop("checked", false);
        $(".ftserst").parent("td").parent("tr").show();
        $(".aim").parent("td").parent("tr").show();
    });

    $(".searchBut").on("click", function () {
        getSectorData($(this).text());


    });



});
