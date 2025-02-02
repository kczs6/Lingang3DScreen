﻿define(["config", "common", "t_EchartAjax", "util"], function (con, com, t_EchartAjax, util) {

    function xData() {//获取近6月日期
        var dataArr = [];
        var data = new Date();
        var year = data.getFullYear();
        data.setMonth(data.getMonth() + 1)//获取到当前月份,设置月份
        for (var i = 0; i < 6; i++) {
            data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
            dataArr.push(data.getMonth() + 1 + '月')
        }
        return dataArr.reverse();
    }
    function MyDate(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            }
            else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        //   day=d.getDate();      s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);//日期类型2019-03-07
        day = d.getDate(); s = year + (mon < 10 ? ('0' + mon) : mon) + (day < 10 ? ('0' + day) : day);//日期类型20190307(字符串)

        return s;

    }
    function MonDayDate(n) {
        var n = n;
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth() + 1;
        var day = d.getDate();
        if (day <= n) {
            if (mon > 1) {
                mon = mon - 1;
            }
            else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        //day = d.getDate(); s = (mon < 10 ? ('0' + mon) : mon) + "月" + (day < 10 ? ('0' + day+'日') : day);//日期类型2019-03-07
        day = d.getDate(); s = mon + "月" + day + "日";
        //day=d.getDate();      s = year+(mon<10?('0'+mon):mon)+(day<10?('0'+day):day);//日期类型20190307(字符串)

        return s;
    }
    //获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }
    return {
        myBigChart: null,//大的图表显示
        //加载图表
        personCarTimer: null,            //人员车辆统计定时器
        personCarTimer2: null,           //人员车辆统计定时器
        personCarTimer3: null,           //人员车辆统计定时器
        personCarTimer4: null,           //人员车辆统计定时器
        //Interval6: null,//游客分析
        //Interval7: null,//游客趋势分析
        //Interval8: null,//舆情分析
        //Interval9: null,//无人机
        //Interval10: null,//交通信息
        //Interval11: null,//人员车辆统计
        //Interval12: null,//停车场使用情况
        //Interval13: null,//近五日事件统计
        myBigChart: null,//大的图表显示
        //加载图表
        personCarTimer: null,            //人员车辆统计定时器
        personCarTimer2: null,           //人员车辆统计定时器
        personCarTimer3: null,           //人员车辆统计定时器
        personCarTimer4: null,           //人员车辆统计定时器
        personCarTimer5: null,           //交通信息定时器
        Interval1: null,                 //交通信息数字定时器        
        Interval2: null,                 //交通信息数字定时器  
        Interval3: null,                 //无人机定时器
        Interval4: null,                 //交通信息数字定时器  
        //Interval6: null,//游客分析
        //Interval7: null,//游客趋势分析
        //Interval8: null,//舆情分析
        //Interval9: null,//无人机
        //Interval10: null,//交通信息
        //Interval11: null,//人员车辆统计
        //Interval12: null,//停车场使用情况
        //Interval13: null,//近五日事件统计

        myChartykfx: null,               //游客分析
        TouristAnalysisData: null,        //游客分析数据

        myChartykqsfx: null,              //游客趋势分析 
        FutureVisitorTrafficData: null,   //游客区域分析数据
        yqfxData: null,                   //舆情分析数据
        wrjData: null,                    //无人机数据
        ykhxData: null,                   //游客分析数据
        tccsyqkData: null,                 //停车场使用情况
        rycltjData: null,                  //人员车辆统计
        rycltjdtData: null,                  //人员车辆统计地铁
        rycltjjcclData: null,              //人员车辆统计进出车辆
        yqsjlbData: null,
        yqsjlbtjData: null,
        myChartyqfx: null,                 //舆情分析
        myChartwrj: null,                  //无人机
        myChartjtxx: null,                 //交通信息 
        myChartrycltj: null,               //人员车辆统计
        myCharttccsyqk: null,              //停车场使用情况
        myChartjwrsjtj: null,             //近五日事件统计
        jwrsjtjData: null,                //近五日事件统计数据
        dtJtxxData: null,                 //地铁数据
        jcgJtxxData: null,                //进出港数据
        tccJtxxData: null,                //停车场数据
        jtxxData: null,                    //交通信息数据

        loadEcharts: function () {
            //alert("loadechart")
            //this.dh();                  //动画
            this.rq();                  //日期
            /*左一*/
            //this.ykfx();                //游客分析
            //this.ykhx();                //游客画像
            //this.ykqsfx();              //游客趋势分析
            //this.yqfx();                //舆情分析
            ///*左二*/
            //this.wrj();                 //无人机
            this.jtxxtj();              //交通信息统计

            //this.yqxxs();               //舆情信息数 话题数
            //this.yqlxtj();              //舆情类型统计

            ////中间
            //this.parkCount();           //园区总数
            //this.parkcount();
            //this.jtxx();                //交通信息 
            ///*右一*/
            //this.rycltj();              //人员车辆统计
            //this.tccsyqk();             //停车场使用情况
            //this.jwrsjtj();             //近五日事件统计

            ///*右二*/
            //this.yqsjlb();              //园区事件列表  园区事件统计

        },

        //显示大的图表
        loadBigChart: function (divname) {
            //if ($("#" + divname).length <= 0) { return false; }


            var url = con.HtmlUrl + 'TourNew/Center_03.html';
            require(['text!' + url], function (template) {
                $("#center_03").html(template);
                $("#center_03").show('drop', 1000);//左侧

                switch (divname) {
                    case "Left_First_02"://游客分析
                        require("t_Echart").bigTouristAnalysis();
                        break;
                    case "Left_First_03"://游客趋势分析
                        require("t_Echart").bigFutureVisitorTraffic();
                        break;
                    case "Left_First_04"://舆情分析
                        require("t_Echart").bigYqfx();
                        break;
                    case "Left_Second_01"://无人机
                        require("t_Echart").bigwrj();
                        break;
                    case "Left_Second_03"://交通信息
                        require("t_Echart").bigJtxx();
                        break;
                    case "Right_First_02"://停车场使用情况
                        require("t_Echart").bigTccsyqk();
                        break;
                    case "Right_First_03"://近五日事件统计
                        require("t_Echart").bigjwrsjtj();
                        break;
                    default:

                }
            })
        },
        //关闭大的图表
        closeBigChart: function () {
            if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
                require("t_Echart").mybigChart.dispose();
            }
            $("#center_03").html("");
        },
        //园区预警指标动画
        dh: function () {
            var mathRandom = 0;
            var yqyjLevelbgTimer = null;

            var yqyjLevelLeftArr = [];
            $(".yqyj-levelbox>.yqyj-level").each(function (index, element) {
                yqyjLevelLeftArr[index] = parseInt($(this).css("left")) / $(this).parent().width() * 100;
            })

            //function yqyjLevelbgFn(num) {
            //    var numLittle = 0;
            //    num = parseInt(Math.random() * 100);

            //    num = num > 20 ? num < 40 ? num : 40 - parseInt(Math.random() * 10) : 20 + parseInt(Math.random() * 10);
            //    yqyjLevelbgTimer = setTimeout(function () {
            //        clearTimeout(yqyjLevelbgTimer);
            //        $(".yqyj-levelbg").width(num + "%");

            //        if (num >= yqyjLevelLeftArr[0]) {
            //            do {
            //                numLittle++;
            //            } while (num > yqyjLevelLeftArr[numLittle])
            //            numLittle--;
            //            $(".yqyj-levelbox>.yqyj-level").eq(numLittle).addClass("active").siblings().removeClass("active");
            //        } 
            //        //else {
            //        //    $(".yqyj-levelbox>.yqyj-level").eq(0).removeClass("active").siblings().removeClass("active");
            //        //}

            //        yqyjLevelbgFn(mathRandom);
            //    }, 1000)

            //}

            //yqyjLevelbgFn(mathRandom);



            // 园区事件统计
            var yqsjNum = 0;
            var yqsjTimer = null;
            var yqsjTranFnTimer = null;

            yqsjFn();

            // 园区事件统计 定时器
            function yqsjFn() {
                yqsjTimer = setTimeout(function () {
                    yqsjNum++;
                    yqsjNum = yqsjNum > 1 ? 0 : yqsjNum;
                    yqsjTranFn(yqsjNum);
                }, 2000)
            }

            function yqsjTranFn(yqsjNum) {
                if (yqsjNum == 0) {
                    $(".yqsj-tabitemul").css({ transform: "translateX(0)" })
                                        .children().eq(0).css({ opacity: 1 })
                                        .siblings().css({ opacity: 0 });
                } else {
                    $(".yqsj-tabitemul").css({ transform: "translateX(-50%)" })
                                        .children().eq(0).css({ opacity: 0 })
                                        .siblings().css({ opacity: 1 });
                }
                $(".yqsj .jtxx-tabbox>.jtxx-tab").eq(yqsjNum).addClass("active").siblings().removeClass("active");

                yqsjTranFnTimer = setTimeout(function () {
                    clearTimeout(yqsjTranFnTimer);
                    yqsjFn()
                }, 500)
            }

            // 点击事件
            $(".yqsj .jtxx-tabbox>.jtxx-tab").each(function (index, element) {
                $(this).click(function () {
                    clearTimeout(yqsjTimer);
                    clearTimeout(yqsjTranFnTimer);
                    yqsjNum = index;

                    yqsjTranFn(yqsjNum);
                })
            })

        },
        //人员车辆统计日期
        rq: function () {
            function MyDate(n) {
                var n = n;
                var d = new Date();
                var year = d.getFullYear();
                var mon = d.getMonth() + 1;
                var day = d.getDate();
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1;
                    }
                    else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                //day = d.getDate(); s = (mon < 10 ? ('0' + mon) : mon) + "月" + (day < 10 ? ('0' + day+'日') : day);//日期类型2019-03-07
                day = d.getDate(); s = mon + "月" + day + "日";
                //day=d.getDate();      s = year+(mon<10?('0'+mon):mon)+(day<10?('0'+day):day);//日期类型20190307(字符串)

                return s;
            }
            $('#rq').empty()
            var html = '';
            html += '<a class="rycltj-datetab">' + MyDate(6) + '</a>';
            html += '<a class="rycltj-datetab">' + MyDate(5) + '</a>';
            html += '<a class="rycltj-datetab">' + MyDate(4) + '</a>';
            html += '<a class="rycltj-datetab">' + MyDate(3) + '</a>';
            html += '<a class="rycltj-datetab">' + MyDate(2) + '</a>';
            html += '<a class="rycltj-datetab">' + MyDate(1) + '</a>';
            html += '<a class="rycltj-datetab">' + MyDate(0) + '</a>';
            $('#rq').html(html)
        },
        //游客分析
        ykfx: function () {
            if ($("#ykfx-chart").length <= 0) { return false; }
            var ykfxChart = document.getElementById('ykfx-chart');
            t_EchartAjax.getTouristAnalysis(function (result) {

                if (require("t_Echart").TouristAnalysisData == null) { return false; }


                var data = require("t_Echart").TouristAnalysisData;
                var ykfxdata = [], ykfxage = [];

                ykfxdata.push(data[1].value, data[0].value, data[2].value, data[3].value, data[4].value, data[5].value);
                ykfxage.push(data[1].name, data[0].name, data[2].name, data[3].name, data[4].name, data[5].name);

                require("t_Echart").myChartykfx = echarts.init(ykfxChart);
                option = {

                    legend: {
                        show: false
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',       //阴影指示器  默认为直线，可选为：'line' | 'shadow'
                        },
                        textStyle: {//默认值，
                            fontSize: 20,//默认值，
                        },
                    },
                    grid: {
                        left: '1%',   // grid 组件离容器左侧的距离。
                        right: '2%',
                        bottom: '2%',
                        height: "90%",
                        containLabel: true   //grid 区域是否包含坐标轴的刻度标签。
                    },
                    xAxis: {
                        type: 'category',
                        data: ykfxage,
                        boundaryGap: ['20%', '20%'],
                        nameTextStyle: {     //  坐标轴标题
                            color: "#00d7fe",
                            fontSize: 16,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 22,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)"
                            }
                        }
                    },
                    yAxis: {
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)",
                            }
                        },
                        //interval :1000,
                        axisLabel: {
                            formatter: function (value, index) {
                                if (value >= 10000 && value < 10000000) {
                                    value = value / 10000 + "万";
                                }
                                return value;
                            },
                            textStyle: {
                                fontSize: 22,
                                color: "#00d7fe",

                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)"
                            }
                        }
                    },
                    series: [
                    {
                        type: 'bar',
                        barWidth: 50,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#04cafc'
                                }, {
                                    offset: 1,
                                    color: '#0e4abc'
                                }]),
                            }
                        },

                        data: ykfxdata,
                    }
                    ]
                };
                //require("t_Echart").myChartykfx.clear();
                require("t_Echart").myChartykfx.setOption(option, true);
            });
        },
        //游客分析（用户年龄分布）
        bigTouristAnalysis: function () {
            $("#bigechartHead").html("游客趋势分析（用户年龄分布）")

            t_EchartAjax.getTouristAnalysis(function (result) {

                if (require("t_Echart").TouristAnalysisData == null) { return false; }
                if ($("#Big-chart").length <= 0) { return false; }

                var data = require("t_Echart").TouristAnalysisData;
                var ykfxdata = [], ykfxage = [];
                for (var i = 0; i < data.length; i++) {
                    ykfxdata.push(data[i].value);
                    ykfxage.push(data[i].name);
                }

                option = {

                    legend: {
                        show: false
                    },
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow',       //阴影指示器  默认为直线，可选为：'line' | 'shadow'
                        },
                        textStyle: {//默认值，
                            fontSize: 35,//默认值，
                        },
                    },
                    grid: {
                        left: '1%',   // grid 组件离容器左侧的距离。
                        right: '2%',
                        bottom: '2%',
                        height: "90%",
                        containLabel: true   //grid 区域是否包含坐标轴的刻度标签。
                    },
                    xAxis: {
                        type: 'category',
                        data: ykfxage,
                        boundaryGap: ['20%', '20%'],
                        nameTextStyle: {     //  坐标轴标题
                            color: "#00d7fe",
                            fontSize: 16,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 35,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)"
                            }
                        }
                    },
                    yAxis: {
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)",
                            }
                        },
                        //interval :1000,
                        axisLabel: {
                            formatter: function (value, index) {
                                if (value >= 10000 && value < 10000000) {
                                    value = value / 10000 + "万";
                                }
                                return value;
                            },
                            textStyle: {
                                fontSize: 35,
                                color: "#00d7fe",
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,.6)"
                            }
                        }
                    },
                    series: [
                    {
                        type: 'bar',
                        barWidth: 120,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#04cafc'
                                }, {
                                    offset: 1,
                                    color: '#0e4abc'
                                }]),
                            }
                        },

                        data: ykfxdata,
                    }
                    ]
                };

                if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
                    require("t_Echart").mybigChart.dispose();
                }
                require("t_Echart").mybigChart = echarts.init(document.getElementById('Big-chart'));
                require("t_Echart").mybigChart.setOption(option);
            });
        },
        //游客画像
        ykhx: function () {
            t_EchartAjax.ykhx(function (result) {

                var data = require("t_Echart").ykhxData;
                var html = '';
                for (var i = 0; i < data.data.length; i++) {
                    html += '<li class="cgq-li">';
                    html += '<div class="item-l" data-text="3"></div>';
                    html += '<div class="item-r"><div class="item-r-name">' + data.data[i].Name + '</div><div class="item-r-data"><span class="testAerial">' + data.data[i].Value + '</span>%</div></div>';
                    html += '</li>';
                }
                $('.ykhx-ul').html(html)
            })

        },
        //游客趋势分析
        ykqsfx: function () {
            var post_data = {
                "Timenow": getNowFormatDate()
            }
            t_EchartAjax.getfutureVisitorTraffic(post_data, function (result) {
                var montharr = xData()
                var data = require("t_Echart").FutureVisitorTrafficData;

                var ykqsfxdata = [23125, 45613, 56465, 116427, 153648], ykqsfxtime = ["11月", "12月", "1月","2月","3月"];
                //for (var i = 0; i < data.length; i++) {
                //    ykqsfxtime.push(data[i].month + "月");
                //    //ykqsfxdata.push(data[i].visnumber);

                //}
                option = {
                    legend: {
                        show: false
                    },
                    color: ['#3398DB'],
                    grid: {
                        left: '5%',   // grid 组件离容器左侧的距离。
                        right: '5%',
                        bottom: '2%',
                        height: "90%",
                        containLabel: true   //grid 区域是否包含坐标轴的刻度标签。
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',

                            label: {
                                show: false,
                            }

                        },
                        textStyle: {//默认值，
                            fontSize: 20,//默认值，
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: ykqsfxtime,
                        boundaryGap: false,
                        nameTextStyle: {
                            color: "#00d7fe",
                            fontSize: 16,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 22,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        }

                    },
                    yAxis: {
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        //interval: 20,
                        axisLabel: {
                            formatter: function (value, index) {
                                if (value >= 10000 && value < 10000000) {
                                    value = value / 10000 + "万";
                                }
                                return value;
                            },
                            textStyle: {
                                fontSize: 22,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)",
                            }
                        }
                    },
                    series: [
                      {
                          type: 'line',
                          //smooth:true,
                          color: "rgba(7,196,230,1)",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: ykqsfxdata
                      }
                    ]
                };

                require("t_Echart").myChartykqsfx = echarts.init(document.getElementById('ykqsfx-chart'));
                //require("t_Echart").myChartykqsfx.clear();
                require("t_Echart").myChartykqsfx.setOption(option, true);

            });
        },
        ///游客趋势分析（当前时间游客趋势分析）
        bigFutureVisitorTraffic: function () {
            $("#bigechartHead").html("游客趋势分析（当前时间游客趋势分析）")
            var post_data = {
                "Timenow": getNowFormatDate()
            }

            if ($("#Big-chart").length <= 0) { return false; }

            t_EchartAjax.getfutureVisitorTraffic(post_data, function (result) {
                var montharr = xData()
                var data = require("t_Echart").FutureVisitorTrafficData;

                var ykqsfxdata = [], ykqsfxtime = [];
                for (var i = 0; i < data.length; i++) {
                    ykqsfxtime.push(data[i].month);
                    ykqsfxdata.push(data[i].visnumber);

                }
                option = {
                    legend: {
                        show: false
                    },
                    color: ['#3398DB'],
                    grid: {
                        left: '1%',   // grid 组件离容器左侧的距离。
                        right: '1%',
                        bottom: '2%',
                        height: "90%",
                        containLabel: true   //grid 区域是否包含坐标轴的刻度标签。
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',

                            label: {
                                show: false,
                            }

                        },
                        textStyle: {//默认值，
                            fontSize: 35,//默认值，
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: ykqsfxtime,
                        boundaryGap: false,
                        nameTextStyle: {
                            color: "#00d7fe",
                            fontSize: 16,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 35,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        }

                    },
                    yAxis: {
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        //interval: 150,
                        axisLabel: {
                            formatter: function (value, index) {
                                if (value >= 10000 && value < 10000000) {
                                    value = value / 10000 + "万";
                                }
                                return value;
                            },
                            textStyle: {
                                fontSize: 35,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)",
                            }
                        }
                    },
                    series: [
                      {
                          type: 'line',
                          //smooth:true,
                          color: "rgba(7,196,230,1)",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: ykqsfxdata
                      }
                    ]
                };
                if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
                    require("t_Echart").mybigChart.dispose();
                }
                require("t_Echart").mybigChart = echarts.init(document.getElementById('Big-chart'));
                require("t_Echart").mybigChart.setOption(option);

            });
        },
        //舆情分析
        yqfx: function () {
            var yqfxChart = document.getElementById('yqfx-chart');
            if ($("#yqfx-chart").length <= 0) { return false; }
            t_EchartAjax.bigyqfx(function (result) {
                if (require("t_Echart").yqfxData == null) { return false; }

                var data = require("t_Echart").yqfxData;
                require("t_Echart").myChartyqfx = echarts.init(yqfxChart);
                option = {
                    tooltip: {
                        show: false,
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: false,
                    },
                    color: ["#e77800", "#5672ed", "#70d958", "#b758d9", "#e7e300", "#1a8fef"],
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '50%',
                            minAngle: 15,//最小角度
                            startAngle: 45, //起始角度
                            center: ["center", "center"],
                            data: [
                                { value: data.data[0].value, name: data.data[0].name },
                                { value: data.data[1].value, name: data.data[1].name },
                                { value: data.data[2].value, name: data.data[2].name },
                                { value: data.data[3].value, name: data.data[3].name },
                                { value: data.data[4].value, name: data.data[4].name },
                                { value: data.data[5].value, name: data.data[5].name }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 20,
                                    length2: 90,
                                    lineStyle: {
                                        width: 2,
                                        color: "#0996d1"
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    fontSize: 20,
                                    formatter: '{b|{b}}{per|{d}}%\n\n',
                                    padding: [0, -90],
                                    //color:"#0996d1",
                                    rich: {
                                        b: {
                                            fontSize: 20,
                                            lineHeight: 36,
                                            //color:"#fff",
                                        },
                                        per: {
                                            fontSize: 20,
                                            // color:"#0996d1",
                                            fontFamily: "Aerial",
                                        },
                                        center: {
                                            position: "center",
                                        }
                                    }
                                }
                            },
                        }
                    ]
                };
                //require("t_Echart").myChartyqfx.clear();
                require("t_Echart").myChartyqfx.setOption(option, true)
            })


        },
        //舆情分析（统计图表）
        bigYqfx: function () {
            $('#bigechartHead').html('舆情分析（统计图表）')
            if ($("#yqfx-chart").length <= 0) { return false; }
            if ($("#Big-chart").length <= 0) { return false; }

            t_EchartAjax.bigyqfx(function (result) {
                if (require("t_Echart").yqfxData == null) { return false; }

                var data = require("t_Echart").yqfxData;
                option = {
                    tooltip: {
                        show: false,
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: false,
                    },
                    color: ["#ce580a", "#08a59c", "#3045c7", "#103698", "#22990a", "#1a8fef"],
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '70%',
                            minAngle: 15,//最小角度
                            startAngle: 45, //起始角度
                            center: ["center", "center"],
                            data: [
                                { value: data.data[0].value, name: data.data[0].name },
                                { value: data.data[1].value, name: data.data[1].name },
                                { value: data.data[2].value, name: data.data[2].name },
                                { value: data.data[3].value, name: data.data[3].name },
                                { value: data.data[4].value, name: data.data[4].name },
                                { value: data.data[5].value, name: data.data[4].name }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            labelLine: {
                                normal: {
                                    length: 20,
                                    length2: 100,
                                    lineStyle: {
                                        width: 2,
                                        color: "#0996d1"
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    fontSize: 35,
                                    formatter: '{b|{b}}{per|{d}}%\n\n',
                                    padding: [0, -90],
                                    //color:"#0996d1",
                                    rich: {
                                        b: {
                                            fontSize: 35,
                                            lineHeight: 36,
                                            //color:"#fff",
                                        },
                                        per: {
                                            fontSize: 35,
                                            // color:"#0996d1",
                                            fontFamily: "Aerial",
                                        },
                                        center: {
                                            position: "center",
                                        }
                                    }
                                }
                            },
                        }
                    ]
                };

                if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
                    require("t_Echart").mybigChart.dispose();
                }
                require("t_Echart").mybigChart = echarts.init(document.getElementById('Big-chart'));
                require("t_Echart").mybigChart.setOption(option);
            })
        },
        //舆情信息数 话题数
        yqxxs: function () {
            $.ajax({
                type: 'POST',
                url: con.InterfaceUrl + 'v1/park/publicSentimentByType',
                cache: false,

                // data:post_data,
                dataType: 'json',
                success: function (data) {
                    ////console.log(data);
                    //if (data == null) { return false;}
                    $('#yqxxs').html(data.data[0].fiCount)
                    $('#rmhts').html(data.data[1].fiCount)
                },
                error: function () {

                }
            })
        },
        //舆情类型统计
        yqlxtj: function () {
            $.ajax({
                type: 'POST',
                url: con.InterfaceUrl + 'v1/park/publicSentiment',
                cache: false,

                // data:post_data,
                dataType: 'json',
                success: function (data) {
                    $('.charttabbox').empty();
                    ////console.log(data);
                    var html = '';
                    html += '<a class="charttab">' + data.data[0].fsProperty + '<span style="color: #22990a;">' + '(' + data.data[0].fsPercent + '%' + ')' + '</span></a>';
                    html += '<a class="charttab">' + data.data[1].fsProperty + '<span style="color: #2961f1;">' + '(' + data.data[1].fsPercent + '%' + ')' + '</span></a>';
                    html += '<a class="charttab">' + data.data[2].fsProperty + '<span style="color: #fb5301;">' + '(' + data.data[2].fsPercent + '%' + ')' + '</span></a>';

                    $('.charttabbox').html(html);
                },
                error: function () {

                }
            })
        },
        //无人机
        wrj: function () {
            this.Interval3 = setInterval(function () {
                if ($("#wrj-chart").length <= 0) { return false; }

                var wrjChart = document.getElementById('wrj-chart');

                t_EchartAjax.getBigwrj(function (data) {

                    var data = require("t_Echart").wrjData;


                    require("t_Echart").myChartwrj = echarts.init(wrjChart);

                    wrjOption = {
                        title: {
                            text: data.wrj_cnt,
                            subtext: '总数',
                            x: 'center',
                            y: '38%',
                            textStyle: {
                                color: '#ea6604',
                                fontSize: 24,
                                fontFamily: "Aerial"
                            },
                            subtextStyle: {
                                color: '#fff',
                                fontSize: 20
                            }
                        },
                        tooltip: {},
                        legend: {
                            show: false
                        },
                        color: ["#09d10e", "#0024fe", "#7d43f3"],
                        series: [
                            {
                                type: 'pie',
                                radius: ['50%', '64%'],
                                center: ["center", "center"],
                                itemStyle: {
                                    borderWidth: 0,
                                    borderColor: "#000",
                                },
                                labelLine: {
                                    normal: {
                                        length: 20,
                                        length2: 80,
                                        lineStyle: {
                                            width: 2,
                                            color: "#0996d1"
                                        }
                                    }
                                },
                                label: {
                                    normal: {
                                        fontSize: 20,
                                        formatter: '{b|{b}}\n{per|{d}}%',
                                        padding: [0, -70],
                                        color: "#0996d1",
                                        rich: {
                                            b: {
                                                fontSize: 20,
                                                lineHeight: 36,
                                                color: "#fff",
                                            },
                                            per: {
                                                fontSize: 20,
                                                color: "#0996d1",
                                                fontFamily: "Aerial",
                                            },
                                            center: {
                                                position: "center",
                                            }
                                        }
                                    }
                                },
                                data: [
                                    { value: data.wrj_flying_cnt, name: '执飞中' },
                                    { value: data.wrj_charging_cnt, name: '充电中' },
                                    { value: data.wrj_lost_cnt + data.wrj_idle_cnt, name: '待命中' }

                                ]
                            }
                        ]
                    };
                    //require("t_Echart").myChartwrj.clear();
                    $("#wrjsx").click(function () {
                        require("t_Echart").myChartwrj.clear()
                        require("t_Echart").wrj()
                        require("t_Echart").myChartwrj.setOption(wrjOption, true)
                    });
                    require("t_Echart").myChartwrj.setOption(wrjOption, true);

                })
            }, 5000);
        },
        //大无人机(统计)
        bigwrj: function () {
            if ($("#wrj-chart").length <= 0) { return false; }
            $("#bigechartHead").html("无人机（统计）")
            var post_data = {
                "count": 10
            }
            t_EchartAjax.getBigwrj(post_data, function (data) {

                var data = require("t_Echart").wrjData;
                wrjOption = {
                    title: {
                        text: data.data[0].wrj_cnt,
                        subtext: '总数',
                        x: 'center',
                        y: '38%',
                        textStyle: {
                            color: '#ea6604',
                            fontSize: 150,
                            fontFamily: "Aerial"
                        },
                        subtextStyle: {
                            color: '#fff',
                            fontSize: 100
                        }
                    },
                    tooltip: {
                        textStyle: {
                            fontSize: 100,
                        }
                    },
                    legend: {
                        show: false
                    },
                    color: ["#09d10e", "#0024fe", "#7d43f3"],
                    series: [
                        {
                            type: 'pie',
                            radius: ['50%', '64%'],
                            center: ["center", "center"],
                            itemStyle: {
                                borderWidth: 0,
                                borderColor: "#000",
                            },
                            labelLine: {
                                normal: {
                                    length: 40,
                                    length2: 100,
                                    lineStyle: {
                                        width: 2,
                                        color: "#0996d1"
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    fontSize: 20,
                                    formatter: '{b|{b}}\n{per|{d}}%',
                                    padding: [0, -70],
                                    color: "#0996d1",
                                    rich: {
                                        b: {
                                            fontSize: 40,
                                            lineHeight: 36,
                                            color: "#fff",
                                        },
                                        per: {
                                            fontSize: 40,
                                            color: "#0996d1",
                                            fontFamily: "Aerial",
                                        },
                                        center: {
                                            position: "center",
                                        }
                                    }
                                }
                            },
                            data: [
                                { value: data.data[0].wrj_flying_cnt, name: '执飞中' },
                                { value: data.data[0].wrj_charging_cnt, name: '充电中' },
                                { value: data.data[0].wrj_idle_cnt, name: '待命中' }
                            ]
                        }
                    ]
                };

                if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
                    require("t_Echart").mybigChart.dispose();
                }
                require("t_Echart").mybigChart = echarts.init(document.getElementById('Big-chart'));
                require("t_Echart").mybigChart.setOption(wrjOption);
            });

        },
        //交通信息统计
        jtxxtj: function () {

            var sum = MyDate(0);//索引查找第一天日期
            t_EchartAjax.getJtxxData(function (data) {
                var data = require("t_Echart").jtxxData;//数据
                try {
                    var dtNumber = data[sum].进港;

                    var jcgNumber = data[sum].出港;

                    var tccNumber = data[sum].停车场;

                    $('#subway').html(dtNumber);
                    $('#car').html(jcgNumber);
                    $('#park').html(tccNumber);

                } catch (error) {

                }
            })
            personCarTimer5 = setInterval(function () {
                var sum = MyDate(0);//索引查找第一天日期
                t_EchartAjax.getJtxxData(function (data) {
                    var data = require("t_Echart").jtxxData;//数据
              
                    var CarRan = Math.round(Math.random() * 1657);
                    var parkRan = Math.round(Math.random() * 663);
                    try {

                        var dtNumber = data[sum].进港;
                        var jcgNumber = data[sum].出港;
                        var tccNumber = data[sum].停车场;
                        $('#subway').html(dtNumber);
                        $('#car').html(jcgNumber);
                        $('#park').html(tccNumber);
                        //com.numberAnimation($('#subway'), dtNumber - 0, dtNumber, 1500);
                        //com.numberAnimation($('#car'), jcgNumber - CarRan, jcgNumber + CarRan, 3000);
                        //com.numberAnimation($('#park'), tccNumber - parkRan, tccNumber + parkRan, 2000);

                    } catch (error) {

                    }
                })
            }, 1000 * 60 * 1); //每分钟刷新一次页面下边显示的数据
            if ($("#car").length > 0) {
                this.Interval1 = setInterval(function () {
                    var jcgNumber = $("#car").html()
                    jcgNumber = jcgNumber.replace(/,/ig, '');
                    var step_values = com.random(0, 10)
                    var current_values = parseInt(jcgNumber) + step_values
                    //if (current_values <= 20) { current_values = 20 }
                    current_values = com.toThousands(current_values)
                    $("#car").html(current_values)
                }, 6400);
            }
            if ($("#park").length > 0) {
                this.Interval2 = setInterval(function () {
                    var tccNumber = $("#park").html()
                    tccNumber = tccNumber.replace(/,/ig, '');
                    var step_values = com.random(0, 10)
                    var current_values = parseInt(tccNumber) + step_values
                    //if (current_values <= 20) { current_values = 20 }
                    current_values = com.toThousands(current_values)
                    $("#park").html(current_values)
                }, 5000);
            }
            if ($("#subway").length > 0) {
                this.Interval4 = setInterval(function () {
                    var tccNumber = $("#subway").html()
                    tccNumber = tccNumber.replace(/,/ig, '');
                    var step_values = com.random(0, 10)
                    var current_values = parseInt(tccNumber) + step_values
                    //if (current_values <= 20) { current_values = 20 }
                    current_values = com.toThousands(current_values)
                    $("#subway").html(current_values)
                }, 5400);
            }
        },
        //大交通信息
        bigJtxx: function () {
            //$("#bigechartHead").html("交通信息（实时人流量）")
            //var rq_data = [];//日期

            //var jtxxdata1 = [], jtxxdata2 = [], jtxxdata3 = [];//地铁，公交，停车场

            //var sum = 6;//索引查找七天前日期
            //var temp = 0, temp1 = 0, temp2 = 0;          //存储总人数的变量
            //var post_data = //申请的数据
            //{
            //    "count": "400",
            //    "date_d": MyDate(sum)
            //}
            //for (var i = 0; i < 7; i++) {
            //    post_data.date_d = MyDate(sum);//将申请的日期更改
            //    rq_data.push(MyDate(sum))    //将日期数存在数组中
            //    sum--;              //日期递增
            //    t_EchartAjax.bigjtxxtj1(post_data, function (data) {


            //        //数据请求成功
            //        for (var i = 0; i < data.data.length; i++) {               //遍历数组人数
            //            temp += data.data[i].cnt                               //temp存储总人数
            //        }
            //        jtxxdata1.push(temp)                                       //将当日总人数存入地铁数组中
            //        tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2);               //向图表传入参数
            //        temp = 0;              
            //    })
            //};

            //sum = 6;

            //for (var i = 0; i < 7; i++) {//循环7次 调用7次当日进出车辆总数
            //    post_data.date_d = MyDate(sum);//将申请的日期更改
            //    sum--;
            //    t_EchartAjax.bigjtxxtj2(post_data, function (data) {                                 
            //        for (var i = 0; i < data.data.length; i++) {
            //            temp1 += data.data[i].cnt
            //        }
            //        jtxxdata2.push(temp1)
            //        tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2);
            //        temp1 = 0;
            //    })
            //};

            //sum = 6;

            //for (var i = 0; i < 7; i++) {//循环7次 调用7次当日停车场总人数
            //    post_data.date_d = MyDate(sum);//将申请的日期更改
            //    sum--;
            //    t_EchartAjax.bigjtxxtj3(post_data, function (data) {

            //        for (var i = 0; i < data.data.length; i++) {
            //            temp2 += data.data[i].cnt
            //        }
            //        jtxxdata3.push(temp2)
            //        ////console.log(temp1 + "temp");

            //        tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2);
            //        temp2 = 0;
            //    })
            //};
            //function tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2)//图表绘制
            //{

            //    option = {
            //        title: {
            //            text: "人/车流量",
            //            left: "1%",
            //            top: "5%",
            //            textStyle: {
            //                fontSize: 35,
            //                color: "#00fddc"
            //            },
            //        },
            //        legend: {
            //            left: '25%',
            //            top: " 5%",
            //            data: ['地铁', '进出港车辆', '停车场'],
            //            icon: 'rect',
            //            itemWidth: 26,
            //            itemHeight: 26,
            //            textStyle: {
            //                fontSize: 35,
            //                color: "#fff"
            //            },
            //        },
            //        color: ['#3398DB'],
            //        grid: {
            //            left: '1%',   // grid 组件离容器左侧的距离。
            //            right: '1%',
            //            bottom: '2%',
            //            height: "76%",
            //            containLabel: true   //grid 区域是否包含坐标轴的刻度标签。
            //        },
            //        tooltip: {
            //            trigger: 'axis',
            //            textStyle:{fontSize:35},
            //            axisPointer: {
            //                type: 'cross',
            //                label: {
            //                    show: false,
            //                }
            //            },
            //        },
            //        xAxis: {
            //            type: 'category',
            //            data: rq_data,
            //            boundaryGap: true,
            //            nameTextStyle: {
            //                color: "#00d7fe",
            //                fontSize: 35,
            //            },
            //            axisTick: {
            //                show: false,
            //            },
            //            axisLine: {
            //                show: true,
            //                lineStyle: {
            //                    color: "rgba(80,172,254,0.5)"
            //                }
            //            },
            //            axisLabel: {
            //                textStyle: {
            //                    fontSize: 35,
            //                    color: "#00d7fe"
            //                }
            //            },
            //            splitLine: {
            //                show: false,
            //                lineStyle: {
            //                    color: "rgba(80,172,254,0.5)"
            //                }
            //            }

            //        },
            //        yAxis: {
            //            axisTick: {
            //                show: false,
            //            },
            //            axisLine: {
            //                show: true,
            //                lineStyle: {
            //                    color: "rgba(80,172,254,0.5)"
            //                }
            //            },
            //            // interval: 1000,
            //            axisLabel: {
            //                textStyle: {
            //                    fontSize: 35,
            //                    color: "#00d7fe"
            //                }
            //            },
            //            splitLine: {
            //                lineStyle: {
            //                    color: "rgba(80,172,254,0.5)",
            //                }
            //            }
            //        },
            //        series: [
            //        {
            //            type: 'line',
            //            color: "rgba(253,238,0,.5)",
            //            lineStyle: {
            //                width: 3,
            //            },
            //            symbolSize: 0,
            //            name: "地铁",
            //            data: jtxxdata1
            //        },
            //        {
            //            type: 'line',
            //            color: "rgba(11,239,215,.5)",
            //            lineStyle: {
            //                width: 3,
            //            },
            //            symbolSize: 0,
            //            name: "进出港车辆",
            //            data: jtxxdata2
            //        },
            //        {
            //            type: 'line',
            //            color: "rgba(195,70,2,.8)",
            //            lineStyle: {
            //                width: 3,
            //            },
            //            symbolSize: 0,
            //            name: "停车场",
            //            data: jtxxdata3
            //        }
            //        ]
            //    };
            //    if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
            //        require("t_Echart").mybigChart.dispose();
            //    }
            //    require("t_Echart").mybigChart = echarts.init(document.getElementById('Big-chart'));
            //    require("t_Echart").mybigChart.setOption(option);
            //}

        },
        //交通信息
        jtxx: function () {  //交通信息-实时人流量
            function MyDate(n) {
                var n = n;
                var d = new Date();
                var year = d.getFullYear();
                var mon = d.getMonth() + 1;
                var day = d.getDate();
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1;
                    }
                    else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                //day = d.getDate(); s = (mon < 10 ? ('0' + mon) : mon) + "月" + (day < 10 ? ('0' + day+'日') : day);//日期类型2019-03-07
                day = d.getDate(); s = mon + "月" + day + "日";
                //day=d.getDate();      s = year+(mon<10?('0'+mon):mon)+(day<10?('0'+day):day);//日期类型20190307(字符串)
                return s;
            }
            var jtxxChart = document.getElementById('jtxx-chart');
            if ($("#jtxx-chart").length <= 0) { return false; }
            t_EchartAjax.getJtxxData(function (data) {
            // var dtData = [0, 0, 0, 0, 0, 0, 0], jcgData = [129116, 137918, 118433, 126314, 121394, 127931, 93626], tccData = [28887, 25124, 15987, 10006, 19017, 19364, 14042];
            var jgclData=[],cgclData=[],tccData=[]
            
            var TempData = 0;
            var data = require("t_Echart").jtxxData;//数据
            try {
                for (var i in data) {
                    jgclData.push(data[i].进港)
                    cgclData.push(data[i].出港)
                    tccData.push(data[i].停车场)
                TempData++
                }
                
                if(TempData>=7){
                    JtxxChartFun(jgclData, cgclData, tccData)
                }
                function JtxxChartFun(jgclData, cgclData, tccData) {
                    jtxxOption = {
                        title: {
                            text: "实时流量",
                            left: "1%",
                            top: "5%",
                            textStyle: {
                                fontSize: 30,
                                color: "#00fddc"
                            },
                        },
                        legend: {
                            left: '25%',
                            top: " 5%",
                            data: ['进港车辆', '出港车辆', '停车场'],
                            icon: 'rect',
                            itemWidth: 26,
                            itemHeight: 26,
                            textStyle: {
                                fontSize: 28,
                                color: "#fff"
                            },
                        },
                        color: ['#3398DB'],
                        grid: {
                            left: '5%',   // grid 组件离容器左侧的距离。
                            right: '5%',
                            bottom: '2%',
                            height: "76%",
                            containLabel: true   //grid 区域是否包含坐标轴的刻度标签。
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    show: false,
                                }

                            },
                        },
                        xAxis: {
                            type: 'category',
                            data: [MyDate(6), MyDate(5), MyDate(4), MyDate(3), MyDate(2), MyDate(1), MyDate(0)],
                            boundaryGap: false,
                            nameTextStyle: {
                                color: "#00d7fe",
                                fontSize: 16,
                            },
                            axisTick: {
                                show: false,
                                //length:2
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(80,172,254,0.5)"
                                }
                            },
                            axisLabel: {
                                //interval: 0,
                                //rotate:40,
                                textStyle: {
                                    fontSize: 18,
                                    color: "#00d7fe"
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: "rgba(80,172,254,0.5)"
                                }
                            }

                        },
                        yAxis: {
                            axisTick: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(80,172,254,0.5)"
                                }
                            },
                            //interval: 1000,
                            axisLabel: {
                                formatter: function (value, index) {
                                    if (value >= 10000 && value < 10000000) {
                                        value = value / 10000 + "万";
                                    }
                                    return value;
                                },
                                textStyle: {
                                    fontSize: 18,
                                    color: "#00d7fe"
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(80,172,254,0.5)",
                                }
                            }
                        },
                        series: [
                          {
                              type: 'line',
                              color: "rgba(253,238,0,.5)",
                              lineStyle: {
                                  width: 3,
                              },
                              symbolSize: 0,
                              name: "进港车辆",
                              data: jgclData
                          },
                          {
                              type: 'line',
                              color: "rgba(11,239,215,.5)",
                              lineStyle: {
                                  width: 3,
                              },
                              symbolSize: 0,
                              name: "出港车辆",
                              data: cgclData
                          },
                          {
                              type: 'line',
                              color: "rgba(195,70,2,.8)",
                              lineStyle: {
                                  width: 3,
                              },
                              symbolSize: 0,
                              name: "停车场",
                              data: tccData
                          }
                        ]
                    };

                    require("t_Echart").myChartjtxx = echarts.init(jtxxChart);
                    //require("t_Echart").myChartjtxx.clear();
                    $("#ssll").click(function () {
                        require("t_Echart").myChartjtxx.clear()
                        require("t_Echart").jtxx()
                        require("t_Echart").jtxxtj()
                         
                     });
                    require("t_Echart").myChartjtxx.setOption(jtxxOption, true);

                }
            } catch (error) {

            }

            })
        },
      
        //在线摄像头
        zxsxt: function () {
            $.ajax({
                type: 'POST',
                url: 'http://47.101.181.131:8091/cameraInfo',
                cache: false,
                // data:post_data,
                dataType: 'json',
                success: function (data) {

                    //data.onTotal              //在线摄像头总数
                    var ball = Math.floor((data.onball / data.onTotal) * 100)              //在线球机摄像头
                    var gun = Math.floor((data.ongun / data.onTotal) * 100)                //在线枪机摄像头
                    var oneagle = Math.ceil((data.oneagle / data.onTotal) * 100)             //在线鹰眼摄像头
                    var html = '';
                    html += '<li class="wrj-l2-li wrj-l2-li1">';
                    html += '<button class=""><div class="testAerial">' + data.onTotal + '</div><span>总数</span></button>';
                    html += '</li>';
                    html += '<li class="wrj-l2-li ">';
                    html += '<div class="piebox"><div class="pie testAerial" style="animation-delay: -' + ball + 's" data-text="' + ball + '%"></div></div>';
                    html += '<div class="piebox-right">';
                    html += '<span> 球机</span>';
                    html += '<div><span class="testAerial">' + data.onball + '</span>台</div>';
                    html += '</div>';
                    html += '</li>';
                    html += '<li class="wrj-l2-li ">';
                    html += '<div class="piebox"><div class="pie testAerial" style="animation-delay: -' + gun + 's" data-text="' + gun + '%"></div></div>';
                    html += '<div class="piebox-right">';
                    html += '<span> 枪机</span>';
                    html += '<div><span class="testAerial">' + data.ongun + '</span>台</div>';
                    html += '</div>';
                    html += '</li>';
                    html += '<li class="wrj-l2-li ">';
                    html += '<div class="piebox"><div class="pie testAerial" style="animation-delay: -' + oneagle + 's" data-text="' + oneagle + '%"></div></div>';
                    html += '<div class="piebox-right">';
                    html += '<span> 鹰眼</span>';
                    html += '<div><span class="testAerial">' + data.oneagle + '</span>台</div>';
                    html += '</div>';
                    html += '</li>';
                    $('#zxsxt').html(html);
                    $("#zxsxtsx").click(function () {
                        require("t_Echart").zxsxt()

                    });
                },
                error: function () {

                }
            })
        },

        //if ($("#jtxx-chart").length <= 0) { return false; }
        //var jtxxChart = document.getElementById('jtxx-chart');
        //var rq_data = [];//日期
        //var jtxxdata1 = [], jtxxdata2 = [], jtxxdata3 = [];//地铁，公交，停车场
        //var sum = 6;//索引查找七天前日期
        //var temp = 0, temp1 = 0, temp2 = 0;          //存储总人数的变量
        //var post_data = //申请的数据
        //{
        //    "count": "400",
        //    "date_d": MyDate(sum)
        //}
        //for (var i = 0; i < 7; i++) { //循环7次 调用7次当日地铁总人数
        //    post_data.date_d = MyDate(sum);//将申请的日期更改
        //    rq_data.push(MyDate(sum))    //将日期数存在数组中
        //    sum--;              //日期递增
        //    $.ajax({
        //        type: 'POST',
        //        url: con.InterfaceUrl + 'v1/park/vehicle/metroStatistic',
        //        cache: false,
        //        async: false, //将ajax异步加载关闭
        //        data: post_data,
        //        dataType: 'json',
        //        success: function (data) {                                     //数据请求成功
        //            for (var i = 0; i < data.data.length; i++) {               //遍历数组人数
        //                temp += data.data[i].cnt                               //temp存储总人数
        //            }
        //            jtxxdata1.push(temp)                                       //将当日总人数存入地铁数组中
        //            ////console.log(temp);
        //            tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2);               //向图表传入参数
        //            temp = 0;
        //            //    return jtxxdata1
        //        },
        //        error: function () {
        //            //console.log('交通信息数据获取错误')
        //        }
        //    })
        //};
        //sum = 6;
        //for (var i = 0; i < 7; i++) {//循环7次 调用7次当日进出车辆总数
        //    post_data.date_d = MyDate(sum);//将申请的日期更改
        //    sum--;
        //    $.ajax({
        //        type: 'POST',
        //        url: con.InterfaceUrl + 'v1/park/vehicle/parkVehicleStatistic',
        //        cache: false,
        //        async: false, //将ajax异步加载关闭
        //        data: post_data,
        //        dataType: 'json',
        //        success: function (data) {
        //            for (var i = 0; i < data.data.length; i++) {
        //                temp1 += data.data[i].cnt
        //            }
        //            jtxxdata2.push(temp1)
        //            tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2);
        //            temp1 = 0;
        //        },
        //        error: function () {
        //            //console.log('交通信息数据获取错误')
        //        }
        //    })
        //};
        //sum = 6;
        //for (var i = 0; i < 7; i++) {//循环7次 调用7次当日停车场总人数
        //    post_data.date_d = MyDate(sum);//将申请的日期更改
        //    sum--;
        //    $.ajax({
        //        type: 'POST',
        //        url: con.InterfaceUrl + 'v1/park/vehicle/parkingLotsStatistic',
        //        cache: false,
        //        async: false, //将ajax异步加载关闭
        //        data: post_data,
        //        dataType: 'json',
        //        success: function (data) {
        //            for (var i = 0; i < data.data.length; i++) {
        //                temp2 += data.data[i].cnt
        //            }
        //            jtxxdata3.push(temp2)
        //            ////console.log(temp1 + "temp");
        //            tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2);
        //            temp2 = 0;
        //        },
        //        error: function () {
        //            //console.log('交通信息数据获取错误')
        //        }
        //    })
        //};
        //tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2);
        //function tb(jtxxdata1, rq_data, jtxxdata3, jtxxdata2)//图表绘制
        //{
        //    require("t_Echart").myChartjtxx = echarts.init(jtxxChart);
        //    jtxxOption = {
        //        title: {
        //            text: "人/车流量",
        //            left: "1%",
        //            top: "5%",
        //            textStyle: {
        //                fontSize: 30,
        //                color: "#00fddc"
        //            },
        //        },
        //        legend: {
        //            left: '25%',
        //            top: " 5%",
        //            data: ['地铁', '进出港车辆', '停车场'],
        //            icon: 'rect',
        //            itemWidth: 26,
        //            itemHeight: 26,
        //            textStyle: {
        //                fontSize: 28,
        //                color: "#fff"
        //            },
        //        },
        //        color: ['#3398DB'],
        //        grid: {
        //            left: '1%',   // grid 组件离容器左侧的距离。
        //            right: '1%',
        //            bottom: '2%',
        //            height: "76%",
        //            containLabel: true   //grid 区域是否包含坐标轴的刻度标签。
        //        },
        //        tooltip: {
        //            trigger: 'axis',
        //            axisPointer: {
        //                type: 'cross',
        //                label: {
        //                    show: false,
        //                }
        //            },
        //        },
        //        xAxis: {
        //            type: 'category',
        //            data: rq_data,
        //            boundaryGap: true,
        //            nameTextStyle: {
        //                color: "#00d7fe",
        //                fontSize: 16,
        //            },
        //            axisTick: {
        //                show: false,
        //            },
        //            axisLine: {
        //                show: true,
        //                lineStyle: {
        //                    color: "rgba(80,172,254,0.5)"
        //                }
        //            },
        //            axisLabel: {
        //                textStyle: {
        //                    //fontSize: 20,
        //                    fontSize: 22,
        //                    color: "#00d7fe"
        //                }
        //            },
        //            splitLine: {
        //                show: false,
        //                lineStyle: {
        //                    color: "rgba(80,172,254,0.5)"
        //                }
        //            }
        //        },
        //        yAxis: {
        //            axisTick: {
        //                show: false,
        //            },
        //            axisLine: {
        //                show: true,
        //                lineStyle: {
        //                    color: "rgba(80,172,254,0.5)"
        //                }
        //            },
        //            // interval: 1000,
        //            axisLabel: {
        //                formatter: function (value, index) {
        //                    if (value >= 10000 && value < 10000000) {
        //                        value = value / 10000 + "万";
        //                    }
        //                    return value;
        //                },
        //                textStyle: {
        //                    fontSize: 22,
        //                    color: "#00d7fe"
        //                }
        //            },
        //            splitLine: {
        //                lineStyle: {
        //                    color: "rgba(80,172,254,0.5)",
        //                }
        //            }
        //        },
        //        series: [
        //        {
        //            type: 'line',
        //            color: "rgba(253,238,0,.5)",
        //            lineStyle: {
        //                width: 3,
        //            },
        //            symbolSize: 0,
        //            name: "地铁",
        //            data: jtxxdata1
        //        },
        //        {
        //            type: 'line',
        //            color: "rgba(11,239,215,.5)",
        //            lineStyle: {
        //                width: 3,
        //            },
        //            symbolSize: 0,
        //            name: "进出港车辆",
        //            data: jtxxdata2
        //        },
        //        {
        //            type: 'line',
        //            color: "rgba(195,70,2,.8)",
        //            lineStyle: {
        //                width: 3,
        //            },
        //            symbolSize: 0,
        //            name: "停车场",
        //            data: jtxxdata3
        //        }
        //        ]
        //    };
        //    //myChartjtxx.clear();
        //    //myChartjtxx.setOption(jtxxOption);
        //    require("t_Echart").myChartjtxx.setOption(jtxxOption);
        //}

      
        /*人员车辆统计*/

        personcarData: new util.HashMap,
        personTotal_xj: function () {
        
            //自动点击
            setTimeout(function () {
                // IE
                if (document.all && $("#ry").length > 0) {
                    document.getElementById("ry").click();
                }
                    // 其它浏览器
                else {
                    var e = document.createEvent("MouseEvents");
                    e.initEvent("click", true, true);
                    document.getElementById("clickMe").dispatchEvent(e);
                }
            }, 10);
            var rqa = $("#rq a");

            $("#ry").click(function () {
                clearInterval(window.personCarTimer2)
                 clearInterval(window.personCarTimer3);
                 clearInterval(window.personCarTimer4);

                 $(this).addClass("active").siblings().removeClass("active");

                 t_EchartAjax.bigrycltj(function () {

                     var datetemp = 6;
                     var dataAll = require("t_Echart").rycltjData;

                     if (!dataAll) { return false; }
                     var sum = "";
                     for (var i = dataAll.length - 1; i >= 0; i--) {
                        sum = MyDate(i);
                        require("t_Echart").personcarData.put(sum, dataAll[i][sum]);
                    }

                    window.personCarTimer2 = setInterval(function () {
                        if (datetemp == 0) {
                            datetemp = 6;
                        }
                        else {
                            datetemp--;
                        }
                        cryFun()
                    }, 60000);


                    cryFun()
                    function cryFun() {
                        var rysum = [];
                        var cysum = [];
                        var key = require("t_Echart").personcarData.keys()[dataAll.length - 1 - datetemp];
                        var data = require("t_Echart").personcarData.get(key);

                        rqa.eq(rqa.length - 1 - datetemp).addClass("active").siblings().removeClass("active");

                        if (data != null) {
                            for (var item in data.入园) {
                                if (Number(item) >= 9 && Number(item) <= 24) {
                                    rysum[Number(item) - 9] = data.入园[item];
                                }
                            }
                            for (var item in data.出园) {

                                if (Number(item) >= 9 && Number(item) <= 24) {
                                    cysum[Number(item) - 9] = data.出园[item];
                                }
                            }
                            //console.log("A:" + datetemp + ":" + rysum)
                            //console.log("B:" + datetemp + ":" + cysum)
                            tb(rysum, cysum);
                        }
                    }

                })
             })

            $("#dt").click(function () {
                clearInterval(window.personCarTimer2)
                 clearInterval(window.personCarTimer3);
                 clearInterval(window.personCarTimer4);

                 $(this).addClass("active").siblings().removeClass("active");

                t_EchartAjax.bigrycltjdt(function () {
                    var dataAll = require("t_Echart").rycltjdtData;
                    if (!dataAll) { return false; }
                    for (var i = dataAll.length - 1; i >= 0; i--) {
                        var sumdt = MyDate(i);
                        require("t_Echart").personcarData.put(sumdt, dataAll[i][sumdt]);
                    }

                    var datetemp = 6;
                    window.personCarTimer3 = setInterval(function () {
                        if (datetemp == 0) {
                            datetemp = 6;
                        }
                        else {
                            datetemp--;
                        }
                        cryFun()
                    }, 60000);

                    cryFun()
                    function cryFun() {
                        var dtsum = [];
                        var key = require("t_Echart").personcarData.keys()[dataAll.length - 1 - datetemp];
                        var data = require("t_Echart").personcarData.get(key);

                        rqa.eq(rqa.length - 1 - datetemp).addClass("active").siblings().removeClass("active");

                        if (data != null) {
                            for (var item in data) {
                                if (/:00$/.test(item) && parseInt(item) >= 9 && parseInt(item) <= 24) {
                                    dtsum[parseInt(item) - 9] = data[item]
                                }
                            }

                           // console.log("A:" + datetemp + ":" + dtsum)
                            //console.log("B:" + datetemp + ":" + cysum)
                            tb(dtsum);
                        }
                    }
                })
            })

            $("#jccl").click(function () {
                 clearInterval(window.personCarTimer2)
                 clearInterval(window.personCarTimer3);
                 clearInterval(window.personCarTimer4);

                 $(this).addClass("active").siblings().removeClass("active");

                 t_EchartAjax.bigrycltjjccl(function () {
                     var dataAll = require("t_Echart").rycltjjcclData;
                     if (!dataAll) { return false; }
                    for (var i = dataAll.length - 1; i >= 0; i--) {
                        var sum = MyDate(i);
                        require("t_Echart").personcarData.put(sum, dataAll[i][sum]);
                    }

                    var datetemp = 6;
                    window.personCarTimer2 = setInterval(function () {
                        if (datetemp == 0) {
                            datetemp = 6;
                        }
                        else {
                            datetemp--;
                        }
                        cryFun()
                    }, 60000);

                    cryFun()
                    function cryFun() {
                        var rysum = [];
                        var cysum = [];
                        var key = require("t_Echart").personcarData.keys()[dataAll.length - 1 - datetemp];
                        var data = require("t_Echart").personcarData.get(key);

                        rqa.eq(rqa.length - 1 - datetemp).addClass("active").siblings().removeClass("active");

                        if (data != null) {
                            for (var item in data.入临港) {
                                if (Number(item) >= 9 && Number(item) <= 24) {
                                    rysum[Number(item) - 9] = data.入临港[item];
                                }
                            }
                            for (var item in data.出临港) {

                                if (Number(item) >= 9 && Number(item) <= 24) {
                                    cysum[Number(item) - 9] = data.出临港[item];
                                }
                            }
                            //console.log("A:" + datetemp + ":" + rysum)
                            //console.log("B:" + datetemp + ":" + cysum)
                            tb(rysum, cysum);
                        }
                    }
                })
             })


            function tb(rycltjdata1, rycltjdata2) {

                if ($("#rycltj-chart").length <= 0) { return false; }
                var rycltjChart = document.getElementById('rycltj-chart');
                require("t_Echart").myChartrycltj = echarts.init(rycltjChart);
                rycltjOption = {
                    legend: {
                        show: false,
                    },
                    color: ['#3398DB'],
                    //backgroundColor: "rgba(74,128,244,.15)",
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '2%',
                        height: "90%",
                        containLabel: true,   //grid 区域是否包含坐标轴的刻度标签。
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                show: false,
                            }
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
                        boundaryGap: false,
                        nameTextStyle: {
                            color: "#00d7fe",
                            fontSize: 16,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 18,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        }
                    },
                    yAxis: {
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        //interval: 1500,
                        axisLabel: {
                            textStyle: {
                                fontSize: 18,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)",
                            }
                        }
                    },
                    series: [
                      {
                          type: 'line',
                          color: "#4085ed",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: rycltjdata1
                      },
                      {
                          type: 'line',
                          color: "#46d1c2",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: rycltjdata2
                      },
                    ]
                };
                $("#renche").click(function () {
                    require("t_Echart").myChartrycltj.clear()
                    require("t_Echart").myChartrycltj.setOption(rycltjOption, true)
                });
                require("t_Echart").myChartrycltj.setOption(rycltjOption, true);
            }
        },
        //停车场使用情况
        tccsyqk: function () {
            function MyDate(n) {
                var n = n;
                var d = new Date();
                var year = d.getFullYear();
                var mon = d.getMonth() + 1;
                var day = d.getDate();
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1;
                    }
                    else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                //day = d.getDate(); s = (mon < 10 ? ('0' + mon) : mon) + "月" + (day < 10 ? ('0' + day+'日') : day);//日期类型2019-03-07
                day = d.getDate(); s = mon + "月" + day + "日";
                //day=d.getDate();      s = year+(mon<10?('0'+mon):mon)+(day<10?('0'+day):day);//日期类型20190307(字符串)

                return s;
            }
            if ($("#wrj-chart").length <= 0) { return false; }

            var tccsyqkChart = document.getElementById('tccsyqk-chart');
            var post_data = {
                "count": "666"
            }
            t_EchartAjax.bigtccsyqk(post_data,function (data) {
                var tccsyqkdata1 = [], tccsyqkdata2 = [], tccsyqkdata3 = [], tccsyqkdata4 = [];
                var data = require("t_Echart").tccsyqkData;
                try {
                    var outer = {};
                    outer["临港大道"] = {};
                    outer["港城新天地"] = {};
                    outer["海昌公园"] = {};
                    outer["雪绒花"] = {};
                    for (var key in data) {
                        var dateItem = data[key];
                        for (var name in dateItem) {
                            if (!outer[name][key]) {
                                outer[name][key] = 0;
                            }
                            outer[name][key] += dateItem[name]
                        }
                    }
                    var hcgy = outer.海昌公园
                    for (var i in hcgy) {
                        tccsyqkdata1.push(hcgy[i])
                    }
                    var xrh = outer.雪绒花
                    for (var i in xrh) {
                        tccsyqkdata2.push(xrh[i])
                    }
                    var lgdd = outer.临港大道
                    for (var i in lgdd) {
                        tccsyqkdata3.push(lgdd[i])
                    }
                    var gcxtd = outer.港城新天地
                    for (var i in gcxtd) {
                        tccsyqkdata4.push(gcxtd[i])
                    }

                    require("t_Echart").myCharttccsyqk = echarts.init(tccsyqkChart);

                    tccsyqkOption = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: [
                            {
                                left: '4%',
                                bottom: " 2%",
                                icon: 'rect',
                                itemWidth: 20,
                                itemHeight: 20,
                                textStyle: {
                                    fontSize: 22,
                                    color: "#0296d4"
                                },
                                data: ['海昌公园停车场']
                            },
                            {
                                left: '27%',
                                bottom: " 2%",
                                icon: 'rect',
                                itemWidth: 20,
                                itemHeight: 20,
                                textStyle: {
                                    fontSize: 22,
                                    color: "#0296d4"
                                },
                                data: ['雪绒花停车场']
                            },
                            {
                                left: '50%',
                                bottom: " 2%",
                                icon: 'rect',
                                itemWidth: 20,
                                itemHeight: 20,
                                textStyle: {
                                    fontSize: 22,
                                    color: "#0296d4"
                                },
                                data: ['临港大道停车场']
                            },
                            {
                                left: '75%',
                                bottom: " 2%",
                                icon: 'rect',
                                itemWidth: 20,
                                itemHeight: 20,
                                textStyle: {
                                    fontSize: 22,
                                    color: "#0296d4"
                                },
                                data: ['港城新天地停车场']
                            },





                        ],
                        grid: {
                            left: '1%',
                            right: '1%',
                            top: '6%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: [MyDate(6), MyDate(5), MyDate(4), MyDate(3), MyDate(2), MyDate(1), MyDate(0)],
                                nameTextStyle: {
                                    color: "#00d7fe",
                                    fontSize: 16,
                                },
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(80,172,254,0.5)"
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontSize: 22,
                                        color: "#00d7fe"
                                    }
                                },
                                splitLine: {
                                    show: false,
                                    lineStyle: {
                                        color: "rgba(80,172,254,0.5)"
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    show: false,
                                },
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(80,172,254,0.5)"
                                    }
                                },
                                //interval: 1000,
                                axisLabel: {
                                    textStyle: {
                                        fontSize: 22,
                                        color: "#00d7fe"
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: "rgba(80,172,254,0.5)",
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '海昌公园停车场',
                                type: 'bar',
                                barWidth: 14,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 3,
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#fffd00'
                                        }, {
                                            offset: 1,
                                            color: '#ff6f02'
                                        }]),
                                    }
                                },
                                data: tccsyqkdata1
                            },
                            {
                                name: '雪绒花停车场',
                                type: 'bar',
                                barWidth: 14,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 3,
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#02fdf6'
                                        }, {
                                            offset: 1,
                                            color: '#00a3ff'
                                        }]),
                                    }
                                },
                                data: tccsyqkdata2
                            },
                            {
                                name: '临港大道停车场',
                                type: 'bar',
                                barWidth: 14,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 3,
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#ace419'
                                        }, {
                                            offset: 1,
                                            color: '#5aad0b'
                                        }]),
                                    }
                                },
                                data: tccsyqkdata3
                            },
                            {
                                name: '港城新天地停车场',
                                type: 'bar',
                                barWidth: 14,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 3,
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#d9d9d9'
                                        }, {
                                            offset: 1,
                                            color: '#808080'
                                        }]),
                                    }
                                },
                                data: tccsyqkdata4
                            }
                        ]
                    };
                    //require("t_Echart").myCharttccsyqk.clear();
                    $("#tcc").click(function () {
                        require("t_Echart").myCharttccsyqk.clear()
                        require("t_Echart").tccsyqk()
                    });
                    require("t_Echart").myCharttccsyqk.setOption(tccsyqkOption, true);
                } catch (error) {

                }

            })
        },
        /*大停车场使用情况*/
        //bigTccsyqk: function () {
        //    $("#bigechartHead").html("停车场使用情况")
        //    var num = 7;
        //    var rq_data = [];
        //    var tccsyqkdata = [], tccsyqkdata1 = [], tccsyqkdata2 = [], tccsyqkdata3 = [], tccsyqkdata4 = [];
        //    for (var a = 0; a < 7; a++) {
        //        num--;
        //        var post_data = {       //将申请的日期更改
        //            "count": "100",
        //            "offset": "0",
        //            "date_d": Number(MyDate(num))
        //        }
        //        rq_data.push(Number(MyDate(num)))    //将日期数存在数组中
        //        t_EchartAjax.bigjtxxtj3(post_data, function (data) {
        //                //    ////console.log(data);
        //                for (var i = 0; i < 4; i++) { tccsyqkdata.push(data.data[i].cnt); }
        //                ////console.log(tccsyqkdata)
        //                if (tccsyqkdata.length == 28) {
        //                    tccsyqkdata1.push(tccsyqkdata[0], tccsyqkdata[1], tccsyqkdata[2], tccsyqkdata[3], tccsyqkdata[4], tccsyqkdata[5], tccsyqkdata[6])
        //                    tccsyqkdata2.push(tccsyqkdata[7], tccsyqkdata[8], tccsyqkdata[9], tccsyqkdata[10], tccsyqkdata[11], tccsyqkdata[12], tccsyqkdata[13])
        //                    tccsyqkdata3.push(tccsyqkdata[14], tccsyqkdata[15], tccsyqkdata[16], tccsyqkdata[17], tccsyqkdata[18], tccsyqkdata[19], tccsyqkdata[20])
        //                    tccsyqkdata4.push(tccsyqkdata[21], tccsyqkdata[22], tccsyqkdata[23], tccsyqkdata[24], tccsyqkdata[25], tccsyqkdata[26], tccsyqkdata[27])
        //                }
        //                option = {
        //                    tooltip: {
        //                        trigger: 'axis',
        //                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        //                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //                        },
        //                        textStyle:{
        //                         fontSize:35
        //                         }
        //                    },
        //                    legend: [
        //                        {
        //                            left: '4%',
        //                            bottom: " 0%",
        //                            icon: 'rect',
        //                            itemWidth: 20,
        //                            itemHeight: 20,
        //                            textStyle: {
        //                                fontSize: 35,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['海昌公园停车场']
        //                        },
        //                        {
        //                            left: '27%',
        //                            bottom: " 0%",
        //                            icon: 'rect',
        //                            itemWidth: 35,
        //                            itemHeight: 35,
        //                            textStyle: {
        //                                fontSize: 35,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['雪绒花停车场']
        //                        },
        //                        {
        //                            left: '50%',
        //                            bottom: " 0%",
        //                            icon: 'rect',
        //                            itemWidth: 35,
        //                            itemHeight: 35,
        //                            textStyle: {
        //                                fontSize: 35,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['临港大道停车场']
        //                        },
        //                        {
        //                            left: '75%',
        //                            bottom: " 0%",
        //                            icon: 'rect',
        //                            itemWidth: 35,
        //                            itemHeight: 35,
        //                            textStyle: {
        //                                fontSize: 35,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['港城新天地停车场']
        //                        },
        //                    ],
        //                    grid: {
        //                        left: '1%',
        //                        right: '1%',
        //                        top: '6%',
        //                        containLabel: true
        //                    },
        //                    xAxis: [
        //                        {
        //                            type: 'category',
        //                            data: rq_data,
        //                            nameTextStyle: {
        //                                color: "#00d7fe",
        //                                fontSize: 35,
        //                            },
        //                            axisTick: {
        //                                show: false,
        //                            },
        //                            axisLine: {
        //                                show: true,
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)"
        //                                }
        //                            },
        //                            axisLabel: {
        //                                textStyle: {
        //                                    fontSize: 35,
        //                                    color: "#00d7fe"
        //                                }
        //                            },
        //                            splitLine: {
        //                                show: false,
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)"
        //                                }
        //                            }
        //                        }
        //                    ],
        //                    yAxis: [
        //                        {
        //                            type: 'value',
        //                            axisTick: {
        //                                show: false,
        //                            },
        //                            axisLine: {
        //                                show: true,
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)"
        //                                }
        //                            },
        //                            //interval: 1000,
        //                            axisLabel: {
        //                                textStyle: {
        //                                    fontSize: 35,
        //                                    color: "#00d7fe"
        //                                }
        //                            },
        //                            splitLine: {
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)",
        //                                }
        //                            }
        //                        }
        //                    ],
        //                    series: [
        //                        {
        //                            name: '海昌公园停车场',
        //                            type: 'bar',
        //                            barWidth: 40,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#fffd00'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#ff6f02'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata1
        //                        },
        //                        {
        //                            name: '雪绒花停车场',
        //                            type: 'bar',
        //                            barWidth: 40,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#02fdf6'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#00a3ff'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata2
        //                        },
        //                        {
        //                            name: '临港大道停车场',
        //                            type: 'bar',
        //                            barWidth: 40,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#ace419'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#5aad0b'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata3
        //                        },
        //                        {
        //                            name: '港城新天地停车场',
        //                            type: 'bar',
        //                            barWidth: 40,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#d9d9d9'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#808080'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata4
        //                        }
        //                    ]
        //                };
        //                if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
        //                    require("t_Echart").mybigChart.dispose();
        //                }
        //                require("t_Echart").mybigChart = echarts.init(document.getElementById('Big-chart'));
        //                require("t_Echart").mybigChart.setOption(option);
        //        })
        //    }
        //},

        /*停车场使用情况*/
        //tccsyqk: function () {
        //    var num = 7;
        //    var rq_data = [];
        //    var tccsyqkdata = [], tccsyqkdata1 = [], tccsyqkdata2 = [], tccsyqkdata3 = [], tccsyqkdata4 = [];
        //    for (var a = 0; a < 7; a++) {
        //        num--;
        //        var post_data = {       //将申请的日期更改
        //            "count": "100",
        //            "offset": "0",
        //            "date_d": Number(MyDate(num))
        //        }
        //        rq_data.push(Number(MyDate(num)))    //将日期数存在数组中
        //        $.ajax({
        //            type: 'POST',
        //            url: con.InterfaceUrl + 'v1/park/vehicle/parkingLotsStatistic',
        //            cache: false,
        //            data: post_data,
        //            dataType: 'json',
        //            success: function (data) {
        //                //    ////console.log(data);
        //                for (var i = 0; i < 4; i++) { tccsyqkdata.push(data.data[i].cnt); }
        //                ////console.log(tccsyqkdata)
        //                if (tccsyqkdata.length == 28) {
        //                    tccsyqkdata1.push(tccsyqkdata[0], tccsyqkdata[1], tccsyqkdata[2], tccsyqkdata[3], tccsyqkdata[4], tccsyqkdata[5], tccsyqkdata[6])
        //                    tccsyqkdata2.push(tccsyqkdata[7], tccsyqkdata[8], tccsyqkdata[9], tccsyqkdata[10], tccsyqkdata[11], tccsyqkdata[12], tccsyqkdata[13])
        //                    tccsyqkdata3.push(tccsyqkdata[14], tccsyqkdata[15], tccsyqkdata[16], tccsyqkdata[17], tccsyqkdata[18], tccsyqkdata[19], tccsyqkdata[20])
        //                    tccsyqkdata4.push(tccsyqkdata[21], tccsyqkdata[22], tccsyqkdata[23], tccsyqkdata[24], tccsyqkdata[25], tccsyqkdata[26], tccsyqkdata[27])
        //                }
        //                if ($("#tccsyqk-chart").length <= 0) { return false; }
        //                var tccsyqkChart = document.getElementById('tccsyqk-chart');
        //                require("t_Echart").myCharttccsyqk = echarts.init(tccsyqkChart);
        //                tccsyqkOption = {
        //                    tooltip: {
        //                        trigger: 'axis',
        //                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        //                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //                        }
        //                    },
        //                    legend: [
        //                        {
        //                            left: '4%',
        //                            bottom: " 2%",
        //                            icon: 'rect',
        //                            itemWidth: 20,
        //                            itemHeight: 20,
        //                            textStyle: {
        //                                fontSize: 22,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['海昌公园停车场']
        //                        },
        //                        {
        //                            left: '27%',
        //                            bottom: " 2%",
        //                            icon: 'rect',
        //                            itemWidth: 20,
        //                            itemHeight: 20,
        //                            textStyle: {
        //                                fontSize: 22,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['雪绒花停车场']
        //                        },
        //                        {
        //                            left: '50%',
        //                            bottom: " 2%",
        //                            icon: 'rect',
        //                            itemWidth: 20,
        //                            itemHeight: 20,
        //                            textStyle: {
        //                                fontSize: 22,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['临港大道停车场']
        //                        },
        //                        {
        //                            left: '75%',
        //                            bottom: " 2%",
        //                            icon: 'rect',
        //                            itemWidth: 20,
        //                            itemHeight: 20,
        //                            textStyle: {
        //                                fontSize: 22,
        //                                color: "#0296d4"
        //                            },
        //                            data: ['港城新天地停车场']
        //                        },
        //                    ],
        //                    grid: {
        //                        left: '1%',
        //                        right: '1%',
        //                        top: '6%',
        //                        containLabel: true
        //                    },
        //                    xAxis: [
        //                        {
        //                            type: 'category',
        //                            data: rq_data,
        //                            nameTextStyle: {
        //                                color: "#00d7fe",
        //                                fontSize: 16,
        //                            },
        //                            axisTick: {
        //                                show: false,
        //                            },
        //                            axisLine: {
        //                                show: true,
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)"
        //                                }
        //                            },
        //                            axisLabel: {
        //                                textStyle: {
        //                                    fontSize: 18,
        //                                    color: "#00d7fe"
        //                                }
        //                            },
        //                            splitLine: {
        //                                show: false,
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)"
        //                                }
        //                            }
        //                        }
        //                    ],
        //                    yAxis: [
        //                        {
        //                            type: 'value',
        //                            axisTick: {
        //                                show: false,
        //                            },
        //                            axisLine: {
        //                                show: true,
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)"
        //                                }
        //                            },
        //                            //interval: 1000,
        //                            axisLabel: {
        //                                textStyle: {
        //                                    fontSize: 18,
        //                                    color: "#00d7fe"
        //                                }
        //                            },
        //                            splitLine: {
        //                                lineStyle: {
        //                                    color: "rgba(80,172,254,0.5)",
        //                                }
        //                            }
        //                        }
        //                    ],
        //                    series: [
        //                        {
        //                            name: '海昌公园停车场',
        //                            type: 'bar',
        //                            barWidth: 14,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#fffd00'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#ff6f02'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata1
        //                        },
        //                        {
        //                            name: '雪绒花停车场',
        //                            type: 'bar',
        //                            barWidth: 14,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#02fdf6'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#00a3ff'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata2
        //                        },
        //                        {
        //                            name: '临港大道停车场',
        //                            type: 'bar',
        //                            barWidth: 14,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#ace419'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#5aad0b'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata3
        //                        },
        //                        {
        //                            name: '港城新天地停车场',
        //                            type: 'bar',
        //                            barWidth: 14,
        //                            itemStyle: {
        //                                normal: {
        //                                    barBorderRadius: 3,
        //                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                                        offset: 0,
        //                                        color: '#d9d9d9'
        //                                    }, {
        //                                        offset: 1,
        //                                        color: '#808080'
        //                                    }]),
        //                                }
        //                            },
        //                            data: tccsyqkdata4
        //                        }
        //                    ]
        //                };
        //                require("t_Echart").myCharttccsyqk.setOption(tccsyqkOption);
        //            },
        //            error: function () {
        //                //console.log('停车场使用情况数据获取错误')
        //            }
        //        })
        //    }
        //},

        /*近五日事件统计*/
        jwrsjtj: function () {
            if ($("#jwrsjtj-chart").length <= 0) { return false; }
            var jwrsjtjChart = document.getElementById('jwrsjtj-chart');
            function MyDate2(n) {
                var n = n;
                var d = new Date();
                var year = d.getFullYear();
                var mon = d.getMonth() + 1;
                var day = d.getDate();
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1;
                    }
                    else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                day = d.getDate(); s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);//日期类型2019-03-07
                //  day = d.getDate(); s = year + (mon < 10 ? ('0' + mon) : mon) + (day < 10 ? ('0' + day) : day);//日期类型20190307(字符串)
                return s;
            }
            var num = 5;
            //五种数据的每日统计
            var jwrsjtjdata1 = [], jwrsjtjdata2 = [], jwrsjtjdata3 = [], jwrsjtjdata4 = [], jwrsjtjdata5 = [];

            var starttime = [];      //请求数据的日期
            var Day = [];
           
            for (var i = 0; i < 5; i++) {
                num--;
                starttime.push(MyDate2(num))
                Day.push(MonDayDate(num))
            }
           
            
            //图表
            t_EchartAjax.getJwrsjtj(function (data) {
                var keyTemp = [];
                
                var data = require("t_Echart").jwrsjtjData;

                for (var key in data)
                {
                    keyTemp.push(key)
                }
              
                for (var i = 0; i < 5; i++) {
                    jwrsjtjdata1.push(data[keyTemp[0]][starttime[i]])
                    jwrsjtjdata2.push(data[keyTemp[1]][starttime[i]])
                    jwrsjtjdata3.push(data[keyTemp[2]][starttime[i]])
                    jwrsjtjdata4.push(data[keyTemp[3]][starttime[i]])
                    jwrsjtjdata5.push(data[keyTemp[4]][starttime[i]])
                }
               
                //if ($("#" + jwrsjtjChart).length <= 0) { return false; }
                var myChartjwrsjtj = echarts.init(jwrsjtjChart);
                require("t_Echart").myChartjwrsjtj = echarts.init(jwrsjtjChart);
                jwrsjtjOption = {
                    legend: [
                         {
                             left: '2%',
                             bottom: " 2%",
                             icon: 'circle',
                             itemWidth: 20,
                             itemHeight: 20,
                             textStyle: {
                                 fontSize: 18,
                                 color: "#0296d4"
                             },
                             data: [keyTemp[0]]
                         },
                         {
                             left: '20%',
                             bottom: " 2%",
                             icon: 'circle',
                             itemWidth: 20,
                             itemHeight: 20,
                             textStyle: {
                                 fontSize: 18,
                                 color: "#0296d4"
                             },
                             data: [keyTemp[1]]
                         },
                         {
                             left: '40%',
                             bottom: " 2%",
                             icon: 'circle',
                             itemWidth: 20,
                             itemHeight: 20,
                             textStyle: {
                                 fontSize: 18,
                                 color: "#0296d4"
                             },
                             data: [keyTemp[2]]
                         },
                         {
                             left: '60%',
                             bottom: " 2%",
                             icon: 'circle',
                             itemWidth: 20,
                             itemHeight: 20,
                             textStyle: {
                                 fontSize: 18,
                                 color: "#0296d4"
                             },
                             data: [keyTemp[3]]
                         },
                         {
                             left: '78%',
                             bottom: " 2%",
                             icon: 'circle',
                             itemWidth: 20,
                             itemHeight: 20,
                             textStyle: {
                                 fontSize: 18,
                                 color: "#0296d4"
                             },
                             data: [keyTemp[4]]
                         },
                    ],
                    color: ['#3398DB'],
                    grid: {
                        left: '5%',
                        right: '5%',
                        top: '6%',
                        containLabel: true,   //grid 区域是否包含坐标轴的刻度标签。
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                show: false,
                            }
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: Day,
                        boundaryGap: false,
                        nameTextStyle: {
                            color: "#00d7fe",
                            fontSize: 16,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontSize: 18,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        }
                    },
                    yAxis: {
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)"
                            }
                        },
                        // interval :5,
                        axisLabel: {
                            textStyle: {
                                fontSize: 18,
                                color: "#00d7fe"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(80,172,254,0.5)",
                            }
                        }
                    },
                    series: [
                      {
                          type: 'line',
                          name: keyTemp[0],
                          color: "#02e32c",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: jwrsjtjdata1
                      },
                      {
                          type: 'line',
                          name: keyTemp[1],
                          color: "#02d8e3",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: jwrsjtjdata2
                      },
                      {
                          type: 'line',
                          name: keyTemp[2],
                          color: "#e3a102",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: jwrsjtjdata3
                      },
                      {
                          type: 'line',
                          name: keyTemp[3],
                          color: "#025ce3",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: jwrsjtjdata4
                      },
                      {
                          type: 'line',
                          name: keyTemp[4],
                          color: "#5702e3",
                          lineStyle: {
                              width: 2,
                          },
                          symbolSize: 10,
                          data: jwrsjtjdata5
                      }
                    ]
                };
                //myChartjwrsjtj.clear();
                //myChartjwrsjtj.setOption(jwrsjtjOption);
                $("#jwrsjtjsx").click(function () {
                    require("t_Echart").myChartjwrsjtj.clear()
                    require("t_Echart").jwrsjtj()
                    require("t_Echart").myChartjwrsjtj.setOption(jwrsjtjOption, true)
                });
                require("t_Echart").myChartjwrsjtj.setOption(jwrsjtjOption);
            })
        },

        /*大近五日事件统计（当前事件）*/
        //bigjwrsjtj: function () {
        //    $("#bigechartHead").html("近五日事件统计（当前事件）")
        //    function MyDate2(n) {
        //        var n = n;
        //        var d = new Date();
        //        var year = d.getFullYear();
        //        var mon = d.getMonth() + 1;
        //        var day = d.getDate();
        //        if (day <= n) {
        //            if (mon > 1) {
        //                mon = mon - 1;
        //            }
        //            else {
        //                year = year - 1;
        //                mon = 12;
        //            }
        //        }
        //        d.setDate(d.getDate() - n);
        //        year = d.getFullYear();
        //        mon = d.getMonth() + 1;
        //        day = d.getDate(); s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);//日期类型2019-03-07
        //        //  day = d.getDate(); s = year + (mon < 10 ? ('0' + mon) : mon) + (day < 10 ? ('0' + day) : day);//日期类型20190307(字符串)
        //        return s;
        //    }
        //    var num = 5;
        //    //五种数据的每日统计
        //    var jwrsjtjdata1 = [], jwrsjtjdata2 = [], jwrsjtjdata3 = [], jwrsjtjdata4 = [], jwrsjtjdata5 = [];
        //    //累计数
        //    var count = 0;
        //    var starttime = [];      //请求数据的日期
        //    var sjtjname = ["停车场爆满", "大客流预警", "拉横幅", "车辆拥堵", "黑车徘徊"]                    //五种数据存起来
        //    for (var i = 0; i < 5; i++) { //循环5次请求5日数据
        //        ////console.log(i)
        //        num--;
        //        starttime.push(MyDate2(num))
        //        var post_data = {
        //            "pageIndex": "1",
        //            "pageSize": "1",
        //            "starttime": starttime[i],        //请求5日数据
        //        }
        //        ajaxFun(i);
        //    }
        //    function ajaxFun(i) {
        //        $.ajax({
        //            type: 'POST',
        //            url: con.InterfaceUrl + 'v1/park/affair/eventNumberByType',   //请求的服务平台地址
        //            cache: false,
        //            async: false, //将ajax异步加载关闭
        //            data: post_data,
        //            dataType: 'json',
        //            success: function (data) {                               //请求成功
        //                for (var j = 0; j < sjtjname.length; j++) {       //循环遍历五种数据 
        //                    ////console.log(data[starttime[i]][sjtjname[j]])
        //                    switch (j) {
        //                        case 0: jwrsjtjdata1.push(data[starttime[i]][sjtjname[j]])//j为0时只将数据车辆拥堵的值存入
        //                            break;
        //                        case 1: jwrsjtjdata2.push(data[starttime[i]][sjtjname[j]])//j为1时只将数据大客流预警的值存入
        //                            break;
        //                        case 2: jwrsjtjdata3.push(data[starttime[i]][sjtjname[j]])//j为2时只将数据黑车徘徊的值存入
        //                            break;
        //                        case 3: jwrsjtjdata4.push(data[starttime[i]][sjtjname[j]])//j为3时只将数据停车场爆满的值存入
        //                            break;
        //                        case 4: jwrsjtjdata5.push(data[starttime[i]][sjtjname[j]])//j为4时只将数据拉横幅的值存入
        //                            break;
        //                    }
        //                    //  ////console.log(data[starttime[i]][sjtjname[j]]+"---------------------");   
        //                    //number[i].push(data[starttime[i]][sjtjname[j]])  
        //                    // numberMap[i].push(data[starttime[i]][sjtjname[j]]);//将每日的五种数据存入number用于图表的数据中
        //                    count++;
        //                }
        //                ////console.log(number[i]);   
        //                if (count == 25) {
        //                    sjtj();
        //                    count = 0;
        //                }
        //            },
        //            error: function () {
        //                //console.log('近五日数据获取错误')
        //            }
        //        })
        //    }
        //    //图表
        //    function sjtj() {
        //        jwrsjtjOption = {
        //            legend: [
        //                 {
        //                     left: '7%',
        //                     bottom: " 0%",
        //                     icon: 'circle',
        //                     itemWidth: 20,
        //                     itemHeight: 20,
        //                     textStyle: {
        //                         fontSize: 30,
        //                         color: "#0296d4"
        //                     },
        //                     data: [sjtjname[0]]
        //                 },
        //                 {
        //                     left: '25%',
        //                     bottom: " 0%",
        //                     icon: 'circle',
        //                     itemWidth: 20,
        //                     itemHeight: 20,
        //                     textStyle: {
        //                         fontSize: 30,
        //                         color: "#0296d4"
        //                     },
        //                     data: [sjtjname[1]]
        //                 },
        //                 {
        //                     left: '45%',
        //                     bottom: " 0%",
        //                     icon: 'circle',
        //                     itemWidth: 20,
        //                     itemHeight: 20,
        //                     textStyle: {
        //                         fontSize: 30,
        //                         color: "#0296d4"
        //                     },
        //                     data: [sjtjname[2]]
        //                 },
        //                 {
        //                     left: '65%',
        //                     bottom: " 0%",
        //                     icon: 'circle',
        //                     itemWidth: 20,
        //                     itemHeight: 20,
        //                     textStyle: {
        //                         fontSize: 30,
        //                         color: "#0296d4"
        //                     },
        //                     data: [sjtjname[3]]
        //                 },
        //                 {
        //                     left: '85%',
        //                     bottom: " 0%",
        //                     icon: 'circle',
        //                     itemWidth: 20,
        //                     itemHeight: 20,
        //                     textStyle: {
        //                         fontSize: 30,
        //                         color: "#0296d4"
        //                     },
        //                     data: [sjtjname[4]]
        //                 },
        //            ],
        //            color: ['#3398DB'],
        //            grid: {
        //                left: '1%',
        //                right: '1%',
        //                top: '6%',
        //                containLabel: true,   //grid 区域是否包含坐标轴的刻度标签。
        //            },
        //            tooltip: {
        //                trigger: 'axis',
        //                axisPointer: {
        //                    type: 'cross',
        //                    label: {
        //                        show: false,
        //                    },
        //                },
        //                textStyle: { fontSize: 35 },
        //            },
        //            xAxis: {
        //                type: 'category',
        //                data: starttime,
        //                boundaryGap: false,
        //                nameTextStyle: {
        //                    color: "#00d7fe",
        //                    fontSize: 30,
        //                },
        //                axisTick: {
        //                    show: false,
        //                },
        //                axisLine: {
        //                    show: true,
        //                    lineStyle: {
        //                        color: "rgba(80,172,254,0.5)"
        //                    }
        //                },
        //                axisLabel: {
        //                    //interval: 0.5,
        //                    textStyle: {
        //                        fontSize: 30,
        //                        color: "#00d7fe"
        //                    }
        //                },
        //                splitLine: {
        //                    show: false,
        //                    lineStyle: {
        //                        color: "rgba(80,172,254,0.5)"
        //                    }
        //                }
        //            },
        //            yAxis: {
        //                axisTick: {
        //                    show: false,
        //                },
        //                axisLine: {
        //                    show: true,
        //                    lineStyle: {
        //                        color: "rgba(80,172,254,0.5)"
        //                    }
        //                },
        //                // interval :5,
        //                axisLabel: {
        //                    textStyle: {
        //                        fontSize: 30,
        //                        color: "#00d7fe"
        //                    }
        //                },
        //                splitLine: {
        //                    lineStyle: {
        //                        color: "rgba(80,172,254,0.5)",
        //                    }
        //                }
        //            },
        //            series: [
        //              {
        //                  type: 'line',
        //                  name: sjtjname[0],
        //                  color: "#02e32c",
        //                  lineStyle: {
        //                      width: 2,
        //                  },
        //                  symbolSize: 30,
        //                  data: jwrsjtjdata1
        //              },
        //              {
        //                  type: 'line',
        //                  name: sjtjname[1],
        //                  color: "#02d8e3",
        //                  lineStyle: {
        //                      width: 2,
        //                  },
        //                  symbolSize: 30,
        //                  data: jwrsjtjdata2
        //              },
        //              {
        //                  type: 'line',
        //                  name: sjtjname[2],
        //                  color: "#e3a102",
        //                  lineStyle: {
        //                      width: 2,
        //                  },
        //                  symbolSize: 30,
        //                  data: jwrsjtjdata3
        //              },
        //              {
        //                  type: 'line',
        //                  name: sjtjname[3],
        //                  color: "#025ce3",
        //                  lineStyle: {
        //                      width: 2,
        //                  },
        //                  symbolSize: 30,
        //                  data: jwrsjtjdata4
        //              },
        //              {
        //                  type: 'line',
        //                  name: sjtjname[4],
        //                  color: "#5702e3",
        //                  lineStyle: {
        //                      width: 2,
        //                  },
        //                  symbolSize: 30,
        //                  data: jwrsjtjdata5
        //              }
        //            ]
        //        };
        //        //myChartjwrsjtj.setOption(jwrsjtjOption);
        //    }
        //    if (require("t_Echart").mybigChart != null && require("t_Echart").mybigChart != "" && require("t_Echart").mybigChart != undefined) {
        //        require("t_Echart").mybigChart.dispose();
        //    }
        //    require("t_Echart").mybigChart = echarts.init(document.getElementById('Big-chart'));
        //    require("t_Echart").mybigChart.setOption(jwrsjtjOption);
        //},
        //园区事件类型分布列表  
        yqsjlblx: function () {
            function MyDate(n) {
                var n = n;
                var d = new Date();
                var year = d.getFullYear();
                var mon = d.getMonth() + 1;
                var day = d.getDate();
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1;
                    }
                    else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                day = d.getDate(); s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);//日期类型2019-03-07
                //day = d.getDate(); s = year + (mon < 10 ? ('0' + mon) : mon) + (day < 10 ? ('0' + day) : day);//日期类型20190307(字符串)

                return s;

            }
            var post_data = {
                "startTime": MyDate(1),
                "endTime": MyDate(0)
            }
            t_EchartAjax.yqsjlblx(post_data, function (result) {
                var data = require("t_Echart").yqsjlblxData;



                
                var htmltotal = '';
                htmltotal += ' <div class="">事件类型：<span class="testAerial">' + data.typeValue + '</span>类</div>';
                htmltotal += '<div class="">事件个数：<span class="testAerial">' + data.total + '</span>个</div>';
                $('#sjlxtotal').html(htmltotal);
                var html = '';
                html += '<li class="yqsj-item active">';
                html += '<div class="yqsj-itemdiv"><span>001</span>' + data.data[0].label + '</div>';
                html += '<ol class="yqsj-itemol">';
                html += '<li class="">' + data.data[0].name + '</li>';
                html += '<li class="">' + data.data[0].content + '</li>';
                html += '</ol>';
                html += '</li>';
                for (var i = 2; i < data.data.length; i++) {
                    html += '<li class="yqsj-item">';
                    html += '<div class="yqsj-itemdiv"><span>00' + i + '</span>' + data.data[i].label + '</div>';
                    html += '<ol class="yqsj-itemol">';
                    html += '<li class="">' + data.data[i].name + '</li>';
                    html += '<li class="">' + data.data[i].content + '</li>';
                    html += '</ol>';
                    html += '</li>';
                }
                $('#sj').html(html);
            })
            $("#jqsjtj").click(function () { require("t_Echart").yqsjlblx ();console.log(园区事件)})
        },
        yqsjlbqy: function () {
            function MyDate(n) {
                var n = n;
                var d = new Date();
                var year = d.getFullYear();
                var mon = d.getMonth() + 1;
                var day = d.getDate();
                if (day <= n) {
                    if (mon > 1) {
                        mon = mon - 1;
                    }
                    else {
                        year = year - 1;
                        mon = 12;
                    }
                }
                d.setDate(d.getDate() - n);
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                day = d.getDate(); s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);//日期类型2019-03-07
                //day = d.getDate(); s = year + (mon < 10 ? ('0' + mon) : mon) + (day < 10 ? ('0' + day) : day);//日期类型20190307(字符串)

                return s;

            }
            var post_data = {
                "startTime": MyDate(1),
                "endTime": MyDate(0)
            }
            t_EchartAjax.yqsjlbqy(post_data, function (result) {
                var data = require("t_Echart").yqsjlbqyData;
                
                var htmltotal2 = '';
                htmltotal2 += ' <div class="">事件类型：<span class="testAerial">' + data.typeValue + '</span>类</div>';
                htmltotal2 += '<div class="">事件个数：<span class="testAerial">' + data.total + '</span>个</div>';
                $('#sjqytotal').html(htmltotal2);
                var html = '';
                html += '<li class="yqsj-item active">';
                html += '<div class="yqsj-itemdiv"><span>001</span>' + data.data[0].content + '</div>';
                html += '<ol class="yqsj-itemol">';
                //html += '<li class="">' + data.data[0].label + '</li>';
                html += '<li class="">' + data.data[0].content + '</li>';
                html += '</ol>';
                html += '</li>';
                for (var i = 2; i < data.data.length; i++) {
                    html += '<li class="yqsj-item">';
                    html += '<div class="yqsj-itemdiv"><span>00' + i + '</span>' + data.data[i].content + '</div>';
                    html += '<ol class="yqsj-itemol">';
                    //html += '<li class="">' + data.data[i].label + '</li>';
                    html += '<li class="">' + data.data[i].content + '</li>';
                    html += '</ol>';
                    html += '</li>';
                }

                $('#sj2').html(html);
            })
        },
        //园区事件统计
        yqsjlbtj: function () {
            var post_data = {
                "startTime": MyDate(1),
                "endTime": MyDate(0)
            }
            t_EchartAjax.yqsjlbtj(post_data, function (result) {
                var data = require("t_Echart").yqsjlbtjData;
                $('.yqsjlb-list').empty();
                var html = '';

                for (var i = 0; i < data.outputData.length; i++) {
                    html += '<li class="yqsjlb-item clearfix">';
                    html += '<div class="item-l"></div>';
                    html += '<div class="item-r">';
                    html += '<div>拍照时间：' + data.outputData[i].sbsj + '</div>';
                    html += '<div>事件类型：' + data.outputData[i].sj + '<span>处置状态：' + data.outputData[i].DICTNAME + '</span></div>';
                    html += '<div>事件详情：' + data.outputData[i].sjms + '。</div>';
                    html += '</div>';
                    html += '</li>';
                }

                $('.yqsjlb-list').html(html);
                for (var i = 0; i < data.outputData.length; i++) {
                    if (data.outputData[i].snapshoturiwithrect == undefined || data.outputData[i].snapshoturiwithrect == "") {
                        $('.yqsjlb-list .item-l').eq(i).css("background-image", "url(../Content/images/yqsjlb-default.png)")
                        $('.yqsjlb-list .item-l').eq(i).css("background-size", "cover")
                    } else if (data.outputData[i].snapshoturiwithrect != undefined) {
                        $('.yqsjlb-list .item-l').eq(i).css("background-image", "url(" + data.outputData[i].snapshoturiwithrect + ")")
                    }

                }

            })
        },
        //园区总统计数（中间列）
        parkCount: function () {
            //    var CarTemp = 0;//园区内车辆数
            //    var wlCarTemp = 0;//未来30分钟车辆
            //    var post_data = {
            //        // "id": "2",
            //        "pageIndex": "1",
            //        "pageSize": "100",
            //        "count": "100",
            //    }
            //    $.ajax({
            //        type: 'POST',
            //        url: con.InterfaceUrl + '/v1/park/getData',
            //        cache: false,
            //        data: post_data,
            //        dataType: 'json',
            //        //async: true, //将ajax异步加载关闭
            //        success: function (data) {
            //            //console.log(data)
            //        },
            //        error: function (err) {
            //            if (err.status == 200) {
            //                var jsonStr = err.responseText.replace("null", '"null"')
            //                showData(JSON.parse(jsonStr))//园区内车辆数
            //                showData2(JSON.parse(jsonStr))//园区内未来30分钟车辆
            //            } else {
            //                ////console.log(err)
            //            }
            //        }
            //    })


            //    function showData(data) {//园区内车辆数
            //        CarTemp += data.currentCarNum.null.total + data.currentCarNum.临港大道.total + data.currentCarNum.海昌公园.total + data.currentCarNum.港城新天地.total + data.currentCarNum.雪绒花路.total

            //        $('#yqncls-center').html(CarTemp);
            //    }
            //    function showData2(data) {//未来30分钟车辆
            //        for (var i = 0; i < data.estimate30mParkVehicleNo.data.length; i++) {
            //            wlCarTemp += data.estimate30mParkVehicleNo.data[i].zycws
            //        }
            //        ////console.log(wlCarTemp)
            //        $('#yqnwlcls-center').html(wlCarTemp);
            //    }
            //    //定时调用
            //    setInterval(function () {
            //        var CarTemp = 0;//园区内车辆数
            //        var wlCarTemp = 0;//未来30分钟车辆
            //        var post_data = {
            //            // "id": "2",
            //            "pageIndex": "1",
            //            "pageSize": "100",
            //            "count": "100",
            //        }
            //        $.ajax({
            //            type: 'POST',
            //            url: con.InterfaceUrl + '/v1/park/getData',
            //            cache: false,
            //            data: post_data,
            //            dataType: 'json',
            //            //async: true, //将ajax异步加载关闭
            //            success: function (data) {

            //            },
            //            error: function (err) {
            //                if (err.status == 200) {
            //                    var jsonStr = err.responseText.replace("null", '"null"')
            //                    showData(JSON.parse(jsonStr))//园区内车辆数
            //                    showData2(JSON.parse(jsonStr))//园区内未来30分钟车辆
            //                } else {
            //                    //console.log(err)
            //                }
            //            }
            //        })
            //        function showData(data) {//园区内车辆数
            //            CarTemp += data.currentCarNum.null.total + data.currentCarNum.临港大道.total + data.currentCarNum.海昌公园.total + data.currentCarNum.港城新天地.total + data.currentCarNum.雪绒花路.total

            //            $('#yqncls-center').html(CarTemp);
            //        }
            //        function showData2(data) {//未来30分钟车辆
            //            for (var i = 0; i < data.estimate30mParkVehicleNo.data.length; i++) {
            //                wlCarTemp += data.estimate30mParkVehicleNo.data[i].zycws
            //            }
            //            ////console.log(wlCarTemp)
            //            $('#yqnwlcls-center').html(wlCarTemp);
            //        }

            //    }, 1000*60*1);

            //},
            //parkcount: function () {

            //    var mydata;
            //    var post_data = {
            //        "count": "5",
            //        "offset": "0"
            //    }
            //    $.ajax({
            //        type: 'POST',
            //        url: 'http://47.101.181.131:8091/v1/park/vehicle/estimate30mVehicleNo',
            //        cache: false,

            //        data: post_data,
            //        dataType: 'json',
            //        success: function (data) {

            //            mydata = data.data[0].zycws + data.data[1].zycws + data.data[2].zycws + data.data[3].zycws
            //            //console.log(mydata);
            //            //require(['animateNumber'], function () {
            //            //    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')//千位分割符
            //            //    $('#bj_StreamTotal')
            //            //       .prop('number', mydata - 200)
            //            //       .animateNumber(
            //            //       {
            //            //           number: mydata,
            //            //           numberStep: comma_separator_number_step
            //            //       },
            //            //       2800
            //            //    );
            //            //});
            //            $('#yqnwlcls-center').html(mydata);

            //        },
            //        error: function () {
            //            //console.log('错误')
            //        }
            //    })

        },

        //清空
        Revert: function () {
            //if (this.Interval6 != null) {
            //    clearInterval(this.Interval6)
            //}
            //if (this.Interval7 != null) {
            //    clearInterval(this.Interval7)
            //}
            //if (this.Interval8 != null) {
            //    clearInterval(this.Interval8)
            //}
            //if (this.Interval9 != null) {
            //    clearInterval(this.Interval9)
            //}
            //if (this.Interval10 != null) {
            //    clearInterval(this.Interval10)
            //}
            //if (this.Interval11 != null) {
            //    clearInterval(this.Interval11)
            //}
            //if (this.Interval12 != null) {
            //    clearInterval(this.Interval12)
            //}
            //if (this.Interval13 != null) {
            //    clearInterval(this.Interval13)
            //}
            if (this.personCarTimer != null) {
                clearInterval(this.personCarTimer)
            }
            if (this.personCarTimer2 != null) {
                clearInterval(this.personCarTimer2)
            }
            if (this.personCarTimer3 != null) {
                clearInterval(this.personCarTimer3)
            }
            if (this.personCarTimer4 != null) {
                clearInterval(this.personCarTimer4)
            }
            if (this.personCarTimer5 != null) {
                clearInterval(this.personCarTimer5)
            }
            if (this.Interval1 != null) {
                clearInterval(this.Interval1)
            }
            if (this.Interval2 != null) {
                clearInterval(this.Interval2)
            }
            if (this.Interval3 != null) {
                clearInterval(this.Interval3)
            }
            if (this.Interval4 != null) {
                clearInterval(this.Interval4)
            }
            //游客趋势分析
            if (require("t_Echart").myChartykqsfx != null && require("t_Echart").myChartykqsfx != "" && require("t_Echart").myChartykqsfx != undefined) {
                require("t_Echart").myChartykqsfx.dispose();
            }
            //舆情分析
            if (require("t_Echart").myChartyqfx != null && require("t_Echart").myChartyqfx != "" && require("t_Echart").myChartyqfx != undefined) {
                require("t_Echart").myChartyqfx.dispose();
            }
            //无人机
            if (require("t_Echart").myChartwrj != null && require("t_Echart").myChartwrj != "" && require("t_Echart").myChartwrj != undefined) {
                require("t_Echart").myChartwrj.dispose();
            }
            //交通信息
            if (require("t_Echart").myChartjtxx != null && require("t_Echart").myChartjtxx != "" && require("t_Echart").myChartjtxx != undefined) {
                require("t_Echart").myChartjtxx.dispose();
            }
            //人员车辆统计
            if (require("t_Echart").myChartrycltj != null && require("t_Echart").myChartrycltj != "" && require("t_Echart").myChartrycltj != undefined) {
                require("t_Echart").myChartrycltj.dispose();
            }
            //停车场使用情况
            if (require("t_Echart").myCharttccsyqk != null && require("t_Echart").myCharttccsyqk != "" && require("t_Echart").myCharttccsyqk != undefined) {
                require("t_Echart").myCharttccsyqk.dispose();
            }
            //近五日事件统计
            if (require("t_Echart").myChartjwrsjtj != null && require("t_Echart").myChartjwrsjtj != "" && require("t_Echart").myChartjwrsjtj != undefined) {
                require("t_Echart").myChartjwrsjtj.dispose();
            }
        },
    }
})