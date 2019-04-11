﻿define(["config", "common", "e_LayerMenuData", "util", "gl_GardenBuildingAjax"], function (con, com, e_LayerMenuData, util,gl_GardenBuildingAjax) {
    /****************************园区建筑图层****************************/
    return {
        LayerType: null,//选择楼宇
        POIData: null,//POI详情数据
        LastPOI_Clk: null,//鼠标选中POI
        poiListData: new util.HashMap,
        BuildingListData:new util.HashMap,
        GardenLayerType: null,//园区POI属性
        GardenPOIData: null,//园区POI详情数据

        
        //加载园区的建筑信息，在建筑上标注楼号POI
        loadGardenBuilding:function()
        {
            //飞行到园区视角
            require("mainMenu").LayerFlyto(20, function () {
                require("gl_GardenBuilding").loadGardenPOI();
            })
        
        },

        /*****************************************/

        /*************园区图层-start*************/
        //加载园区POI
        loadGardenPOI:function(){
            this.GardenLayerType = require("g_Main").LayerCatalog.Garden;

            require("gl_GardenBuilding").GardenPOIData = e_LayerMenuData.GardenList.Data;

            var areaName = con.AreaName;
            var icon = require("gl_GardenBuilding").GardenLayerType.UnChooseIcon;
            var pois = [];
            for (var i = 0; i < require("gl_GardenBuilding").GardenPOIData.length; i++) {
                var row = require("gl_GardenBuilding").GardenPOIData[i];
                var poiName = "POIIndustryG" + require("gl_GardenBuilding").GardenLayerType.Name + "_" + row.id;//POIIOT_01
                var iconSize = Q3D.vector2(72, 76);
                var pos = row.lng + "," + row.lat + ",21";
                var position = Q3D.vector3(pos.toGlobalVec3d().toLocalPos(areaName));
                var edetailimg = row.edetailimg;

                var poi = { POIName: poiName, Position: position, Text: row.name, Icon: icon, IconSize: iconSize, FontColor: "#00ff00" };
                var node = map.getSceneNode(areaName + "/" + poiName);
                if (node) {map.destroySceneNode(areaName + "/" + poiName);} 

                //
                var options = {
                        Position: position,//封装Vector3对象
                        Orientation: null,//封装Vector3对象
                        OrientationType: Q3D.Enums.nodeOrientationType.Self,
                        Scale: null,//封装Vector3对象
                        POIOptions: {
                            FontSize: 14,
                            FontName: "微软雅黑",
                            FontColor: Q3D.colourValue("#00ff00", 1),//封装ColourValue对象
                            CharScale: 1.0,
                            Text: row.name,
                            Icon: icon,
                            IconSize: iconSize,//封装Vector2对象
                            POILayout: Q3D.Enums.poiLayOut.Bottom,
                            POILayoutCustom: null,	//支持负数，取值0相当于LeftTop，1.0相当于LeftBottom，0.5相当于Left；只对POILayout为LeftCustom、TopCustom、RightCustom、BottomCustom时有效
                            UIType: Q3D.Enums.poiUIType.CameraOrientedKeepSize,
                            IconAlphaEnabled: true,
                            FontOutLine: 0, //同描边有关
                            FontEdgeColor: Q3D.colourValue("#000000", 1),//封装ColourValue对象
                            AlphaTestRef: null,
                            Location: Q3D.Enums.poiImagePositionType.POI_LOCATE_BOTTOM,
                            LocationOffset: null, //当Location为POI_LOCATE_CUSTOM起作用，封装Vector2对象
                            BackFrameBorderSize: null, //同边框有关
                            BackBorderColor: null,//封装ColourValue对象
                            BackFillColor: null,//封装ColourValue对象
                            LabelMargin: null,//封装Vector2对象
                            IconLabelMargin: null,//封装Vector2对象，左右布局X分量有效，上下布局的Y分量有效
                            SpecialTransparent: true,
                            AlwaysOnScreen: true,
                            AbsPriority: null,
                            RelPriority: null,
                        },
                        OnLoaded: function () {//加载结束回调
                            //创建子POI显示
                            require("gl_GardenBuilding").loadGardeninfo(areaName, poiName, edetailimg, row.id);
                        },
                    }
                map.createPOI(areaName + "/" + poiName, options)
            }
        },
        //加载园区详情信息
        loadGardeninfo: function (AreaName, parentName, icon, id)
        {
            var iconSize = Q3D.vector2(404, 250);
            var createOptions = {
                Position: Q3D.vector3(230, -30, 0),
                Orientation: null,
                OrientationType: Q3D.Enums.nodeOrientationType.Self,
                Scale: Q3D.vector3(0.5, 0.5, 0.5),
                POIOptions: {
                    CharScale: 1,
                    Text: "",
                    Icon: icon,
                    IconSize: iconSize,
                    POILayout: Q3D.Enums.poiLayOut.Bottom,
                    UIType: Q3D.Enums.poiUIType.CameraOrientedKeepSize,
                    IconAlphaEnabled: true,
                    Location: Q3D.Enums.poiImagePositionType.POI_LOCATE_BOTTOM,
                    SpecialTransparent: true,
                    AlwaysOnScreen: true,
                    OnLoaded: function () {
                    },
                }
            };
            var poiName = "PoiGardenInfo" + id;
            var node = map.getSceneNode(AreaName, poiName)
            if (node) {map.destroySceneNode(AreaName,poiName);} 

            map.createPOI(AreaName + "/" + parentName + "/" + poiName, createOptions);        
        },
        //隐藏POI
        clearGardenPOI: function () {
            var areaName = con.AreaName;
            if (this.LastPOI_Clk && this.LastPOI_Clk != "") {
                var layername = this.LastPOI_Clk.split('_')[0].replace("POIIndustryG", "");
                var level = this.GardenLayerType.Level;
                var icon = this.GardenLayerType.UnChooseIcon;
                var lastNode = map.getSceneNode(areaName, this.LastPOI_Clk);
                if (lastNode) {
                    lastNode.asPOI().setIcon(icon);
                    //lastNode.setVisible(0);
                }
            }
            this.LastPOI_Clk = "";

            var data = this.GardenPOIData;
            //设置POI隐藏
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    var name = this.GardenLayerType.Name;

                    var poiname = "POIIndustryG" + name + "_" + data[i].id;
                    var node = map.getSceneNode(areaName + "/" + poiname);
                    if (node) {
                        //map.getArea(areaName).destroySceneNode(poiname);
                        node.setVisible(0);
                    }
                }
                this.GardenLayerType = null;
                this.GardenPOIData = null;
            }
        },
        loadGardenDetial:function(nodename){
            this.clearGardenPOI();//隐藏园区POI
            //进入龙头企业视角
            require("mainMenu").LayerFlyto(311, function () {
                require("gl_TopCompany").loadTopCompanyPOI();
                //require("gl_TopCompany").loadTopCompany()

            })
            //加载建筑信息
            require("gl_GardenBuilding").loadBuidingDetail(nodename);
        },
        /*************园区图层-end*************/


        /*************楼宇-start*************/
        //加载楼层信息
        loadBuidingDetail: function (nodename) {
            //获取建筑信息
            var id = nodename.split("_")[1];
            var data = require("gl_GardenBuilding").BuildingListData.get(id);

        },
        loadBuilding: function () {
            require("reset").ClearDivHtmlOnLeftAndRightAndCenter();
            //飞行到园区视角
            require("mainMenu").LayerFlyto(311, function () {
                require("gl_GardenBuilding").loadPOI();
                require("gl_GardenBuilding").showGardenShowWindow();
            })
            //存储楼宇信息到本地
            gl_GardenBuildingAjax.getBuildingListData(function (result) {
                for (var i = 0; i < result.length; i++) {
                    require("gl_GardenBuilding").BuildingListData.put(result[i].id, result[i]);
                }
            })
        },
        //加载楼宇POI
        loadPOI:function(){
            this.LayerType = require("g_Main").LayerCatalog.Building;

            require("gl_GardenBuilding").POIData = e_LayerMenuData.GardenPOI.Data;


            var areaName = con.AreaName;
            var icon = require("gl_GardenBuilding").LayerType.UnChooseIcon;
            var pois = [];
            for (var i = 0; i < require("gl_GardenBuilding").POIData.length; i++) {

                var row = require("gl_GardenBuilding").POIData[i];
                //require("gl_GardenBuilding").poiListData.put(row.id, row);

                var poiName = "POIIndustryG" + require("gl_GardenBuilding").LayerType.Name + "_" + row.id;//POIIOT_01

                var iconSize = Q3D.vector2(41, 45);
                //var Coordinate = com.gcj02towgs84(row.lng, row.lat);//高德坐标转百度坐标
                //var pos = Coordinate + ",0";
                var pos = row.lng + "," + row.lat + ",21";
                var position = Q3D.vector3(pos.toGlobalVec3d().toLocalPos(areaName));

                var poi = { POIName: poiName, Position: position, Text: row.name, Icon: icon, IconSize: iconSize, FontColor: "#00a600" };
                var node = map.getSceneNode(areaName + "/" + poiName);
                if (node) {
                    node.setVisible(1);//显示当前父节点
                } else {
                    pois.push(poi);
                }
            }
            com.InitPois(areaName, pois);
        },
        //隐藏POI
        clearPOI: function () {
            var areaName = con.AreaName;
            if (this.LastPOI_Clk && this.LastPOI_Clk != "") {
                var layername = this.LastPOI_Clk.split('_')[0].replace("POIIndustryG", "");
                var level = this.LayerType.Level;
                var icon = this.LayerType.UnChooseIcon;
                var lastNode = map.getSceneNode(areaName, this.LastPOI_Clk);
                if (lastNode) {
                    lastNode.asPOI().setIcon(icon);
                    //lastNode.setVisible(0);
                }
            }
            this.LastPOI_Clk = "";

            var data = this.POIData;
            //设置POI隐藏
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    var name = this.LayerType.Name;

                    var poiname = "POIIndustryG" + name + "_" + data[i].id;
                    var node = map.getSceneNode(areaName + "/" + poiname);
                    if (node) {
                        map.destroySceneNode(areaName, poiname);
                    }
                }
                this.LayerType = null;
                this.POIData = null;
            }
        },
        //清除园区详情POI
        clearGardenInfo: function () {
            var POIData = e_LayerMenuData.GardenList.Data;
            if (POIData) {
                for (var i = 0; i < POIData.length; i++) {
                    var row = POIData[i];
                    var nodename = "PoiGardenInfo" + row.id;
                    var node = map.getSceneNode(con.AreaName, nodename)
                    if (node) {
                        map.destroySceneNode(con.AreaName, nodename);
                    }
                }
            }
        },
        //加载园区展示窗口
        showGardenShowWindow: function () {
            require("gl_GardenBuilding").CompanyStatisticWindow();
        },
        //入驻企业统计
        CompanyStatisticWindow: function () {
            var option = {
                aniDom: "#left01_01",
                htmlDom: "#left_first_01",
                url: con.HtmlUrl + 'Industry/Garden/CompanyStatistic.html'
            }
            com.UIControlAni(option, function () {
                require("gl_GardenBuilding").loadCompanyInfo();
            });
        },
        //加载企业信息 
        loadCompanyInfo: function () {
            gl_GardenBuildingAjax.getCompanyStatisticsData(function (result) {
                var data = result[0];
                $("#companyTotal").html(data.successedMerchantsProjects);
                $("#totalOutputValue").html(data.outputValue);
                $("#totalPerson").html(data.servicesCount);
            })
        },
        /*************楼宇-start*************/

        Revert: function () {
            this.clearGardenPOI();
            this.clearPOI();
            this.clearGardenInfo();
        }
    }
})