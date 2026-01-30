$(window).on('load', function () {
    // code here

    $("#downloadBtn").on("click", function () {
        alert("j");
        alert($("#myJsonBlob").text());


        const blob = new Blob([$("#myJsonBlob").text()], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        a.click();

        URL.revokeObjectURL(url);


        var obj = JSON.parse($("#myJsonBlob").text());
    });

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



    $(".fixed-table-toolbar").find("button").on("click", function () {
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



        var bigTickers = [];
        var timer = 0;
        $('#tableftse tr').each(function (i, row) {

            if ($.trim($("#aa" + i).text()) != "") {
                var curIndex = i;
                var ticker = $.trim($("#aa" + i).text()) + "|" + $("#activebutt").text() + "|" + curIndex;
                var tickera = { "ticker": ticker };
                bigTickers.push(tickera);
            }
        });

        $('#tableftse tr').each(function (i, row) {
            if ($.trim($("#aa" + i).text()) != "") {
                timer = timer + 1500;
                setTimeout(function () {
                    let ticker = bigTickers[0].ticker;
                    let curIndex = ticker.split("|")[2];
                    bigTickers.shift();

                    // alert("ha ha");

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
                }, timer, bigTickers);
            }
        });



    });


    $("#isinBut").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up



        $.get("/routes/isin/" + $("#activebutt").text(), {}, function (sdata) {


            console.log("im in here");

            setTimeout(function () {
                $(".loader").css("opacity", "0");
                $("#bigcontainer1").css("opacity", "1");
                $("#bigcontainer2").css("opacity", "1");
                $("#bigcontainer").css("opacity", "1");
                $("#puppet0But").prop('disabled', false);
            }, 20000); // up


        });



    });

    /*
    $("#isinBut").on("click", function (event) {


        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up


        var timeout = 0;
        //    $.get("/routes/"+$("#activebutt").text()+"?x=err", {}, function (sdata) {
        $.get("/routes/" + $("#activebutt").text() + "?x=NOPE", {}, function (sdata) {
            for (let i = 0; i < sdata.items.length; i++) {
                //    alert(JSON.stringify(sdata));
                timeout = timeout + 4000;
  

              //  $.trim($("#aa" + i).text())


                setTimeout(function () {
                    getProfits(sdata.items[i].isin, $("#activebutt").text());

                }, timeout);

            }
        });



        setTimeout(function () {
            $(".loader").css("opacity", "0");
            $("#bigcontainer1").css("opacity", "1");
            $("#bigcontainer2").css("opacity", "1");
            $("#bigcontainer").css("opacity", "1");
            $("#puppetBut").prop('disabled', false);
        }, 20000); // up

    });

    function getProfits(myIsin, myFile) {

            $.get("/routes/isin?x=" + myIsin + "&y=" + myFile, {}, function (sdata) {
              
            });
       

    }
    */
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


    $("#puppet0But").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up



        $.get("/routes/puppetBalance", {}, function (sdata) {

            console.log("im in here");

            setTimeout(function () {
                $(".loader").css("opacity", "0");
                $("#bigcontainer1").css("opacity", "1");
                $("#bigcontainer2").css("opacity", "1");
                $("#bigcontainer").css("opacity", "1");
                $("#puppet0But").prop('disabled', false);
            }, 20000); // up


        });



    });


    $("#historyBut").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up



        $.get("/routes/history/" + $("#activebutt").text(), {}, function (sdata) {

            console.log("im in here");

            setTimeout(function () {
                $(".loader").css("opacity", "0");
                $("#bigcontainer1").css("opacity", "1");
                $("#bigcontainer2").css("opacity", "1");
                $("#bigcontainer").css("opacity", "1");
                $("#puppet0But").prop('disabled', false);
            }, 20000); // up


        });



    });


    $("#googleBut").on("click", function (event) {

        event.preventDefault();
        //do something
        $(this).prop('disabled', true);

        setTimeout(function () {
            $(".loader").css("opacity", "1");
            $("#bigcontainer1").css("opacity", "0.4");
            $("#bigcontainer2").css("opacity", "0.4");
            $("#bigcontainer").css("opacity", "0.4");
        }, 100); // up



        $.get("/routes/puppetGoogle/" + $("#activebutt").text(), {}, function (sdata) {

            console.log("im in here");

            setTimeout(function () {
                $(".loader").css("opacity", "0");
                $("#bigcontainer1").css("opacity", "1");
                $("#bigcontainer2").css("opacity", "1");
                $("#bigcontainer").css("opacity", "1");
                $("#puppet0But").prop('disabled', false);
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




        //Fix errors  - MAKE FALSE WHEN YOU DONT WANT TO PROCESS
        var errorsFound = "false";
        ///// END OF FIX

        if (errorsFound == "true") {
            var timeout = 0;
            $.get("/routes/" + $("#activebutt").text() + "?x=errBull", {}, function (sdata) {
                for (let i = 0; i < sdata.length; i++) {

                    timeout = timeout + 4000;
                    console.log(timeout);


                    setTimeout(function () {
                        var localTicker = sdata[0].ticker;
                        localTicker = localTicker + "|" + $("#activebutt").text();
                        sdata.shift();

                        $.post("/routes/buySellOne", {
                            localTicker
                        }, function (sdata) {

                            console.log("im in here");



                        })

                    }, timeout, sdata);

                }
            });
        }

        if (errorsFound != "true") {

            //END OF ERROR CHANGE

            var bigTickers = [];
            var timer = 0;
            $('#tableftse tr').each(function (i, row) {

                if ($.trim($("#aa" + i).text()) != "") {
                    var curIndex = i;
                    var ticker = $.trim($("#aa" + i).text()) + "|" + $("#activebutt").text();
                    var tickera = { "ticker": ticker };
                    bigTickers.push(tickera);
                }
            });

            $('#tableftse tr').each(function (i, row) {
                if ($.trim($("#aa" + i).text()) != "") {
                    timer = timer + 4000;
                    setTimeout(function () {
                        let ticker = bigTickers[0].ticker;
                        bigTickers.shift();
                        $.post("/routes/buySellOne", {
                            ticker
                        }, function (sdata) {
                            console.log("im in here");
                        });
                    }, timer, bigTickers);
                }
            });


            setTimeout(function () {
                $(".loader").css("opacity", "0");
                $("#bigcontainer1").css("opacity", "1");
                $("#bigcontainer2").css("opacity", "1");
                $("#bigcontainer").css("opacity", "1");
                $("#techieBut").prop('disabled', false);
            }, 20000); // up


        }

    });

    $("#watchBut").on("click", function () {

        $.ajax({
            url: "/routes/createWatchList/TRD|BT.A|ITV|PSON|MKS|MONY|HIK|SDG|ABDN|ABF|BYG|HSBA|IDG|GSK|INVP|VMUK|STAN",
            type: "GET",
            dataType: "json",
            success: function (sdata) {
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

        //Fix errors  - MAKE FALSE WHEN YOU DONT WANT TO PROCESS
        var errorsFound = "false";
        ///// END OF FIX

        if ($(".errorsOn")[0].checked) {
            errorsFound = "true";
        }

        if (errorsFound == "true") {
            var timeout = 0;
            $.get("/routes/" + $("#activebutt").text() + "?x=errNews", {}, function (sdata) {
                for (let i = 0; i < sdata.length; i++) {

                    timeout = timeout + 4000;
                    console.log(timeout);


                    setTimeout(function () {
                        var localTicker = sdata[0].ticker;
                        sdata.shift();
                        demo(localTicker + "|" + $("#activebutt").text(), 0, "errorFix");

                    }, timeout, sdata);

                }
            });
        }

        if (errorsFound != "true") {
            loopTickers();
        }

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


    async function demo(ticker, curIndex, errorFix) {
        console.log("demo getting called");
        console.log(ticker + "  " + curIndex);

        $.post("/routes/currentNews", {
            ticker
        }, function (sdata) {

            if (errorFix != "errorFix") {
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
                if (ticker == "TRD|ftserst") {
                    //    alert(sdata.percentUp);
                }
                /*
                var string1 = "" + value + "";
                var image = "<img src='/images/arrow_up_green.svg'>";
                if (string1.substring(0, 1) == "-") {
                    return "<img src='/images/arrow_down_red.svg'> <span style='color:red' > " + value + "%</span>";
                }
                if (string1 == "0") {
                    return "&nbsp;&nbsp;&nbsp;&nbsp;" + value + "%";
                }
                return "<img src='/images/arrow_up_green.svg'> <span style='color:green' > " + value + "%</span>";
                */
                //    $("#butt" + curIndex).child().html("<img src='/images/arrow_down_red.svg'> <span style='color:red' > " + sdata.percentUp + "% ");

                console.log("curIndex " + curIndex);
                $("#butt" + curIndex + " span ").css("display", "block");

                if ($("#butt" + curIndex + " span ").length) {
                    // It exists
                    console.log("Element found!");
                } else {
                    // It doesn't exist
                    console.log("Element NOT found.");
                }


                if (sdata.percentUp < 0) {
                    $("#butt" + curIndex).css('display', 'block');
                    $("#butt" + curIndex).attr("style", "color: red;");
                    $("#butt" + curIndex).html('<img src="/images/arrow_down_red.svg" alt="desc"> ' + sdata.percentUp + '% ');
                    $("#butt" + curIndex).css('display', 'block');
                    $("#butt" + curIndex).attr("style", "display: block;color: red;");
                }
                if (sdata.percentUp == 0) {
                    $("#butt" + curIndex).parent().html("<span> &nbsp;  &nbsp;  &nbsp; &nbsp; " + sdata.percentUp + "%</span>");
                }
                if (sdata.percentUp > 0) {
                    $("#butt" + curIndex).css('display', 'block');
                    $("#butt" + curIndex).attr("style", "color: green;");
                    $("#butt" + curIndex).html('<img src="/images/arrow_up_green.svg" alt="desc"> ' + sdata.percentUp + '% ');
                    $("#butt" + curIndex).css('display', 'block');
                    $("#butt" + curIndex).attr("style", "display: block;color: green;");
                }


                $("#news" + curIndex).parent().html("<a target='_blank'  href='" + myArray[0] + "'>" + [bishbashbosh.slice(0, position2), "<br />", billy].join('') + "</a>");
            }

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

            if (colname == "stockName" || colname == "sector" || colname == "bullAdvice" || colname == "tickerSymbol" || colname == "news") {

                var A = $(a).children('td').eq(sortCol).text().toUpperCase();
                var B = $(b).children('td').eq(sortCol).text().toUpperCase();


                if (A == null || A == "" || A == " ") {
                    A = 0;
                }
                if (B == null || B == "" || B == " ") {
                    B = 0;
                }
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

            var BB = BB.replace(",", "");
            var AA = AA.replace(",", "");

            AA = AA.replace(/[\x00-\x1F\x7F-\x9F]/g, '0');
            BB = BB.replace(/[\x00-\x1F\x7F-\x9F]/g, '0');

            if (AA == null || AA == "" || AA == " ") {
                AA = 0;
            }
            if (BB == null || BB == "" || BB == " ") {
                BB = 0;
            }
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
        var searchValues = "";
        if (sector == "tickers") {
            sector = sector + $(".search-input").val().trim();
            searchValues = $(".search-input").val();
        }

        $('#tableftse').bootstrapTable('destroy');
        $("#indexTitle").text(" Share selection criteria (across all indexes): " + sector.replaceAll("%20", " "));
        sector = sector.replace("/", "%2F");
        $.ajax({
            url: "/routes/search/" + sector,
            type: "GET",
            //  data: { "search": sector },
            dataType: "json",
            success: function (sdata) {
                $(function () {


                    const headers = Object.keys(sdata.items[0]);

                    // Convert to CSV rows
                    const csvRows = [];

                    // Add header row
                    csvRows.push(headers.join(","));

                    // Add data rows
                    sdata.items.forEach(obj => {
                        const row = headers.map(header => JSON.stringify(obj[header] ?? ""));
                        csvRows.push(row.join(","));
                    });

                    const csvString = csvRows.join("\n");
                    $("#myJsonBlob").text(csvString);

                   // alert(csvString);






                    $('#tableftseCon').show();
                    $('#tableoversoldCon').hide();
                    $('#tablenetnetCon').hide();
                    $('#sectorRiseCon').hide();
                    $("#netnetBut").hide();

                   

                    $('#tableftse').bootstrapTable('destroy');


                    $('#tableftse').bootstrapTable({
                        data: sdata
                    });
                    $(".no-records-found:last").children("td").text(sdata.count + " companies found that match the criteria");

                    $(".search-input").val(searchValues);
                    $(".search-input.search-input").on('keyup', function () {
                        var searchTerm = $(".search-input").val();
                        var recordCount =0;

                        for (var j = 0, l = $('#tableftse tr').length; j < l; j++) {
                            $("#aa" + j).parent("td").parent("tr").hide();
                        };
                        for (var j = 0, l = $('#tableftse tr').length; j < l; j++) {
                            for (var jj = 0; jj < searchTerm.split(" ").length; jj++) {
                                var searchTerms = searchTerm.split(" ");
                                // alert("searchTerms length " + searchTerms.length);
                                if ($("#aa" + j).parent("td").parent("tr").text().toUpperCase().includes(searchTerms[jj].toUpperCase())) {
                                    $("#aa" + j).parent("td").parent("tr").show();
                                    recordCount = recordCount + 1;
                                }
                            };
                        };


                        if ((recordCount == 1)) {
                            $(".no-records-found:last").children("td").text(recordCount + " company found that match the criteria");
                        } else {
                            $(".no-records-found:last").children("td").text(recordCount + " companies found that match the criteria");
                        }

                    });


                    $(".search-input.search-input").attr("placeholder", "Search for: Name, Ticker, Sector, News or Date");
                   
                    $(".excludeRst").css("display", "");
                    $(".excludeAim").css("display", "");

                    $(".excludeRst").on("click", function () {
                        var tot = sdata.count;
                        if (this.checked) {
                            $(".excludeRst").prop('checked', true);
                            tot = tot - sdata.rstCount;
                            if ($('input.excludeAim').is(':checked')) {
                                tot = tot - sdata.aimCount;
                            }
                            $(".no-records-found:last").children("td").text(tot + " companies found that match the criteria");
                            $(".ftserst").parent("td").parent("tr").hide();
                        } else {
                            $(".excludeRst").prop('checked', false);
                            if ($('input.excludeAim').is(':checked')) {
                                tot = tot - sdata.aimCount;
                            }
                            $(".no-records-found:last").children("td").text(tot + " companies found that match the criteria");
                            $(".ftserst").parent("td").parent("tr").show();
                        }
                    });
                    $(".excludeAim").on("click", function () {
                        var tot = sdata.count;
                        if (this.checked) {
                            $(".excludeAim").prop('checked', true);
                            var tot = tot - sdata.aimCount;
                            if ($('input.excludeRst').is(':checked')) {
                                tot = tot - sdata.rstCount;
                            };
                            $(".aim").parent("td").parent("tr").hide();
                            $(".no-records-found:last").children("td").text(tot + " companies found that match the criteria");
                        } else {
                            $(".excludeAim").prop('checked', false);
                            if ($('input.excludeRst').is(':checked')) {
                                tot = tot - sdata.rstCount;
                            }
                            $(".no-records-found:last").children("td").text(tot + " companies found that match the criteria");
                            $(".aim").parent("td").parent("tr").show();
                        }
                    });




                        $(".imageb").mouseover(function () {
                            $(".imageb").css("cursor", "pointer");
                            $(".imageb").attr("height", "auto");
                            $(".imageb").attr("width", "auto");
                            $(".imagebBIG").css("cursor", "pointer");
                        });
                        $(".imageb").on("click", function (event) {
                            var indexVal = event.target.id;
                            if (indexVal.includes("imagebBIG")) {
                                indexVal = indexVal.replace("imagebBIG", "");
                                $('#imageb' + indexVal).show();
                                $('#' + event.target.id).hide();
                                $('#' + event.target.id).blur();
                                $('#imageb' + indexVal).focus();
                            } else {
                                indexVal = indexVal.replace("imageb", "");
                                $('#imagebBIG' + indexVal).show();
                                $('#' + event.target.id).hide();
                                $('#' + event.target.id).blur();
                                $('#imagebBIG' + indexVal).focus();
                            }
                        });
                    
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
                        columnSelected = 21;
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



                    $("input[data-field='netNet']").click();
                    $("input[data-field='eps']").click();
                    $("input[data-field='sector']").click();
                    console.log("after setting clicks");

                    $(".percentUp").children("span").on("click", function () {


                        $(this).fadeOut("slow", function () {
                            // Animation complete.


                            let ticker = "";

                            let fred2 = ($(this)[0].id).replace("butt", "");
                            let fred = fred2.replace("butt", "");
                            let ftseType = $("#aa" + fred).attr('class');
                            if (!ftseType) {
                                ticker = $("#aa" + fred).text().trim() + "|" + $("#activebutt").text();
                            } else {
                                ticker = $("#aa" + fred).text().trim() + "|" + ftseType;
                            }
                            demo(ticker, fred);

              
                            /*

                           $.post("/routes/currentPercent", {
                                ticker
                            }, function (sdata) {
                                if (sdata.percentUp < 0) {
                                    $("#butt" + fred).parent().html("<span style='color:red' > &nbsp; <img src='/images/arrow_down_red.svg''>  &nbsp; " + sdata.percentUp + "%</span>");
                                }
                                if (sdata.percentUp == 0) {
                                    $("#butt" + fred).parent().html("<span> &nbsp;  &nbsp;  &nbsp; &nbsp; " + sdata.percentUp + "%</span>");
                                }
                                if (sdata.percentUp > 0) {
                                    $("#butt" + fred).parent().html("<span  style='color:green'>  &nbsp; <img src='/images/arrow_up_green.svg'>  &nbsp; " + sdata.percentUp + "%</span>");
                                }
                            });
                            */

                        });  //fade

                    });



                });
                let newPath = '?param1=search/#';  // Ensure it starts with a single "/"
                let currentPath = window.location.pathname.replace(/\/$/, ''); // Remove trailing slash if present

                let finalUrl = currentPath + newPath;
                history.pushState(null, '', finalUrl);
            //   alert('New URL:', window.location.href);

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
            hideExludes();
            $("#indexTitle").text(" current list: FTSE 100");
            $("#indexTitleSort").text('current sort order: ticker');
            $("#FTSE100But").removeClass("focus");
            $("#FTSE100But").removeClass("active");
        }
        if (exchange == "ftse250") {
            hideExludes();
            routerVal = "routes/ftse250";
            $("#indexTitle").text(" current list: FTSE 250");
            $("#indexTitleSort").text('current sort order: ticker');
        }
        if (exchange == "netnet") {
            routerVal = "routes/netnet";
            $("#indexTitle").text(" current list: Netnet stocks");
            $("#indexTitleSort").text('current sort order: ticker');
        }
        if (exchange == "ftserst") {
            hideExludes();
            routerVal = "routes/ftserst";
            $("#indexTitle").text(" current list: FTSE rest");
            $("#indexTitleSort").text('current sort order: ticker');
        }
        if (exchange == "ftseaim") {
            hideExludes();
            routerVal = "routes/ftseaim";
            $("#indexTitle").text(" current list: AIM");
            $("#indexTitleSort").text('current sort order: ticker');
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


                $('#tableftse').on('post-body.bs.table', function () {
                    alert("hi2");
                });

                $('#tableftse').bootstrapTable({
                    data: sdata,
                    onPostBody: function () {
                      //  alert($("th.stockName").width());
                    //    $("#john1").width() = $("th.stockName").width();

                        let width = $("th.stockName").outerWidth() // Get rendered width (including padding/border)
                        $("#john1").outerWidth(width);
                        width = $("th.tickerSymbol").outerWidth();
                        $("#john2").outerWidth(width);
                        width = $("th.news").outerWidth();
                        $("#john4").outerWidth(width);
                        width = $("th.peRatio").outerWidth();
                        $("#john5").outerWidth(width);
                        width = $("th.dividend").outerWidth();
                        $("#john6").outerWidth(width);
                        width = $("th.exDividend").outerWidth();
                        $("#john7").outerWidth(width);
                        width = $("th.bullAdvice").outerWidth();
                        $("#john8").outerWidth(width);
                        width = $("th.profit").outerWidth();
                        $("#john9").outerWidth(width);
                        width = $("th.revenue").outerWidth();
                        $("#john10").outerWidth(width);
                        width = $("th.marketCapitalisation").outerWidth();
                        $("#john11").outerWidth(width);
                        width = $("th.percentUp").outerWidth();
                        $("#john12").outerWidth(width);
                        width = $("th.totalAssets").outerWidth();
                        $("#john13").outerWidth(width);
                        width = $("th.totalLiabiities").outerWidth();
                        $("#john14").outerWidth(width);
                        width = $("th.cash").outerWidth();
                        $("#john15").outerWidth(width);
                        width = $("th.nvv").outerWidth();
                        $("#john16").outerWidth(width);
                        width = $("th.navPercent").outerWidth();
                        $("#john17").outerWidth(width);
                        width = $("th.cashPerCent").outerWidth();
                        $("#john18").outerWidth(width);
                       


                    }
                }).on('post-body.bs.table', function () {
                    alert("hi");
                });

                $(".no-records-found:last").children("td").text(sdata.count + " companies found that match the criteria");

                timeNow(sdata.version);


          
                //  alert(sdata.version);
                $(".search-input.search-input").attr("placeholder", "Search for: Name, Ticker, Sector, News or Date");
               
                $(".search-input.search-input").on('keyup', function () {
                    var searchTerm = $(".search-input").val();
                    var recordCount = 0;
              //      alert("SEARCH INPUT2: " + searchTerm);

                    for (var j = 0, l = $('#tableftse tr').length; j < l; j++) {
                        $("#aa" + j).parent("td").parent("tr").hide();
                    };
                    for (var j = 0, l = $('#tableftse tr').length; j < l; j++) {
                        for (var jj = 0; jj < searchTerm.split(" ").length; jj++) {
                            var searchTerms = searchTerm.split(" ");
                           // alert("searchTerms length " + searchTerms.length);
                            if ($("#aa" + j).parent("td").parent("tr").text().toUpperCase().includes(searchTerms[jj].toUpperCase())) {
                                $("#aa" + j).parent("td").parent("tr").show();
                                recordCount = recordCount + 1;
                            }
                        };
                    };
                    if ((recordCount == 1)) {
                        $(".no-records-found:last").children("td").text(recordCount + " company found that match the criteria");
                    } else {
                        $(".no-records-found:last").children("td").text(recordCount + " companies found that match the criteria");
                    }

                });

                 $("input[data-field='netNet']").click();
                $("input[data-field='eps']").click();
                $("input[data-field='sector']").click();
                


                $(".sector").on("click", function (event) {

                    if ($(this).children("span").children(".imageb[style*='display: none;']").length == 1) {
                        $(this).children("span").children(".imageb").show();
                        $(this).children("span").children(".imagebBIG").hide();
                        $(this).children("span").children(".imagebBIG").blur();
                        $(this).children("span").children(".imageb").focus();
                    } else {
                        $(this).children("span").children(".imagebBIG").show();
                        $(this).children("span").children(".imageb").hide();
                        $(this).children("span").children(".imageb").blur();
                        $(this).children("span").children(".imagebBIG").focus();
                    }
                });

                $("div.bootstrap-table.bootstrap3").children("div.fixed-table-container").css("border", "none");
                $("div.fixed-table-container.fixed-height").css("border-top", "1px solid #ddd");
                let defaultCol = 1;
                let defaultName = "tickerSymbol"
                if (exchange == "netnet") {
                    defaultCol = 21;
                    defaultName = "netNet";
                }
                sortTable2("tableftse", defaultCol, "#tableftseCon", defaultName);


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

                $(".percentUp").children("span").on("click", function () {


                    $(this).fadeOut("slow", function () {
                        // Animation complete.
                        let ticker = "";

                        let fred1 = $(this)[0].id;
                         let fred = fred1.replace("butt", "");

                        let ftseType = $("#aa" + fred).attr('class');
                        if (!ftseType) {
                            ticker = $("#aa" + fred).text().trim() + "|" + $("#activebutt").text();
                        } else {
                            ticker = $("#aa" + fred).text().trim() + "|" +ftseType;
                        }
                        demo(ticker, fred);

                    //    return;

                     /*   $.post("/routes/currentPercent", {
                            ticker
                        }, function (sdata) {
                            if (sdata.percentUp < 0) {
                                $("#butt" + fred).parent().html("<span style='color:red' > &nbsp; <img src='/images/arrow_down_red.svg''>  &nbsp; " + sdata.percentUp + "%</span>");
                            }
                            if (sdata.percentUp == 0) {
                                $("#butt" + fred).parent().html("<span> &nbsp;  &nbsp;  &nbsp; &nbsp; " + sdata.percentUp + "%</span>");
                            }
                            if (sdata.percentUp > 0) {
                                $("#butt" + fred).parent().html("<span  style='color:green'>  &nbsp; <img src='/images/arrow_up_green.svg'>  &nbsp; " + sdata.percentUp + "%</span>");
                            }
                        });
                        */
                    });  //fade



                });
           //     $("input[data-field='netNet']").click();
                //     $("input[data-field='eps']").click();


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

    function hideExludes() {
        $(".excludeRst").css("display", "none");
        $(".excludeAim").css("display", "none");
        $("#excludeRst").prop("checked", false);
        $("#excludeAim").prop("checked", false);
    }


    function timeNow(versionNo) {
        var d = new Date(),
            h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
            m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
            y = d.getFullYear(),
            mon = ('0' + (d.getMonth() + 1)).slice(-2),
            day = String(d.getDate()).padStart(2, '0');
        $("#dateTime").text("     " + y + "-" + mon + "-" + day + " time " + h + ":" + m);
        $("#versionNo").text("  version: " + versionNo);
    }


});
