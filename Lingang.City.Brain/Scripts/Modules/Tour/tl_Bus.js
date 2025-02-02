﻿define(["config", "common","t_LayerMenuData"], function (con, com,t_LayerMenuData) {
/****************************公交****************************/
    return {
        LayerType: null,//选择公交
        POIData: null,//POI详情数据
        LastPOI_Clk: null,//鼠标选中POI

        //加载公交Bus
        loadBus: function () {
            this.Revert();
            this.LayerType = require("t_Main").LayerCatalog.Bus;

            //默认视口
            com.LayerFlyto(6)


            var post_data = { "offset": "0", "count": "1000"}
            require("t_LayerMenuAjax").getbusList(post_data, function (result) {
                var areaName = con.AreaName;
                var icon = require("tl_Bus").LayerType.UnChooseIcon;
                var pois = [];
                for (var i = 0; i < require("tl_Bus").POIData.length; i++) {
                    var row = require("tl_Bus").POIData[i];
                    var poiName = "POITour" + require("tl_Bus").LayerType.Name + "_" + row.id;//POIIOT_01
                    var iconSize = Q3D.vector2(54, 44);
                    var zdmc = row.zdmc; //公交站名

                    var jd = row.jd;
                    var wd = row.wd;

                    if (jd != "" && wd != "")
                    {
                        var Coordinate = com.gcj02towgs84(parseFloat(jd), parseFloat(wd));//高德坐标转wgs84
                        var pos = Coordinate + ",0";
                        var position = Q3D.vector3(pos.toGlobalVec3d().toLocalPos(areaName));

                        var poi = { POIName: poiName, Position: position, Text: zdmc, Icon: icon, IconSize: iconSize, FontColor: "#00a600", FontSize:10 };
                        var node = map.getSceneNode(areaName + "/" + poiName);
                        if (node) {
                            node.setVisible(1);//显示当前父节点
                        } else {
                            pois.push(poi);
                        }
                    }
                }
                com.InitPois(areaName, pois);
            });
        },
        //公交点击事件
        loadBusDetial: function (nodeName) {
            var areaName = con.AreaName;
            if (this.LastPOI_Clk && this.LastPOI_Clk != "") {
                var layername = this.LastPOI_Clk.split('_')[0].replace("POITour", "");
                var level = this.LayerType.Level;
                var type = this.LastPOI_Clk.split('_')[1];
                var icon = this.LayerType.List[type].UnChooseIcon;

                var lastNode = map.getSceneNode(areaName, this.LastPOI_Clk);
                if (lastNode) {
                    lastNode.asPOI().setIcon(icon);
                    //lastNode.setVisible(0);
                }
            }

            this.LastPOI_Clk = nodeName;
            var node = map.getSceneNode(areaName, nodeName);
            if (node != null) {
                //Q3D.globalCamera().flyToNode(node, con.ViewOri.toVector3(), 2, function () {
                var poi = node.asPOI();

                var layername = nodeName.split('_')[0].replace("POITour", "");
                var level = this.LayerType.Level;
                var type = nodeName.split('_')[1];
                var icon = this.LayerType.List[type].ChooseIcon;

                poi.setIcon(icon);
                //});
            }
        },
        loadBusLine:function()
        {
            var data = t_LayerMenuData.BusLineData;

            for (var i = 0; i < data.length; i++)
            {
                var status     = data[i].status;
                var id         = data[i].id;
                var linename   = data[i].linename;
                var linecolor  = data[i].linecolor;
                var coordinate = data[i].coordinate;
                var nodename = "Tour_BusLine" + id;
                var lineArray = new Array()
                if (status == 1)
                {
                    var points = coordinate.split("|")
                    
                    //画连接线
                    for (var k = 0; k < points.length; k++) {
                        var pos = points[k]
                        var lng = parseFloat(pos.split(",")[0])
                        var lat = parseFloat(pos.split(",")[1])
                        var hgt = 8
                        var position = Q3D.globalVec3d(lng, lat, hgt).toGlobalPos();

                        var point = Q3D.vector3(Q3D.globalVec3d(lng, lat, hgt).toLocalPos(con.AreaName))
                        lineArray.push(point)
                    }



                    this.createBusLine(linecolor,nodename,lineArray)
                }
            }
        },
        //创建公交路线
        createBusLine: function (linecolor, nodename, lineArray)
        {
            var nodePath = con.AreaName + "/" + nodename;

            var createOptions = {
                //Material: "Material/linered.mtr",
                Material:null,
                SpecialTransparent: true, //设置是否开启特殊透明效果，若开启，则线被物体遮挡时会显示透明效果
                LinePoints: [lineArray], //一维数组,由Vector3坐标组成
                OffsetDist: [],//偏移距离，单位米，用于贝塞尔曲线的控制点计算
                LineOptions: {
                    Subdivision: 20, //设置生成曲线细分程度
                    LineWidth: 10,
                    WrapLen: 10,
                    //以下用于动态创建的材质
                    Color: Q3D.colourValue(linecolor, 1), //线的颜色
                    Alpha: 1, //线的透明度
                },
                OnLineCreated: null
            }

            var linenode = map.getSceneNode(con.AreaName, nodename)
            if (linenode) {
                linenode.setVisible(1)
                //map.destroySceneNode(con.AreaName, nodename)
            } else {
                map.createPolyLine(nodePath, createOptions);
            }        
        },
        //清空公交POI
        clearBusPOI: function () {
            var data = this.POIData;
            var areaName = con.AreaName;
            //设置POI隐藏
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    var name = this.LayerType.Name;

                    var poiname = "POITour" + name + "_" + data[i].id;
                    var node = map.getSceneNode(areaName + "/" + poiname);
                    if (node) {
                        //map.getArea(areaName).destroySceneNode(poiname);
                        node.setVisible(0);
                    }
                }
                this.LayerType = null;
                this.POIData = null;
            }
        },
        //清除公交线路
        clearBusLine:function()
        {
            var data = t_LayerMenuData.BusLineData;
            var areaName = con.AreaName;
            for (var i = 0; i < data.length; i++) {
                var linename = "Tour_BusLine"  + data[i].id;
                var node = map.getSceneNode(areaName + "/" + linename);
                if (node) {
                    node.setVisible(0);
                }
            }      
        },
        //清空公交业务
        Revert: function () {
            this.clearBusPOI();
            this.clearBusLine();
        }
    }
})