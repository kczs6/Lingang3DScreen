﻿define(["config"], function (con) {
    return {
        //无人车行驶路线
        UmmannedCarTrajectoryData: {
            "1": [
            {  pos: "121.906903,30.867405,-0.000702" },
            {  pos: "121.905401,30.868723,-0.000702" },
            {  pos: "121.904587,30.868110,-0.000702" },
            {  pos: "121.904439,30.867898,-0.000214" },
            ],
            "2": [
            {  pos: "121.905811,30.865251,-0.000214" },
            {  pos: "121.905982,30.865251,-0.000702" },
            {  pos: "121.906771,30.865849,-0.001190" },
            { pos: "121.907005,30.866037,-0.001190" },
            { pos: "121.907277,30.866255,-0.001190" },
            { pos: "121.906711,30.866766,-0.001190" },
            ],
        },
        UmmannedCarDrivingRoute: [
            {
            "1": { pos: "121.906903,30.867405,-0.000702" },
            "2": { pos: "121.905401,30.868723,-0.000702" },
            "3": { pos: "121.904587,30.868110,-0.000702" },
            "4": { pos: "121.904439,30.867898,-0.000214" },

            "5": { pos: "121.903703,30.867269,-0.000214" },
            "6": { pos: "121.903768,30.867058,-0.000214" },
            "7": { pos: "121.905811,30.865251,-0.000214" },
            "8": { pos: "121.905982,30.865251,-0.000702" },
            "9": { pos: "121.906771,30.865849,-0.001190" },
            "10": { pos: "121.907005,30.866037,-0.001190" },

            "11": { pos: "121.907277,30.866255,-0.001190" },
            "12": { pos: "121.906711,30.866766,-0.001190" },
            "13": { pos: "121.907182,30.867167,-0.001190" },
            "14": { pos: "121.906978,30.867361,-0.001190" },            

            
            /*
              */
        },
        {
            //3，10
            "15": { pos: "121.904587,30.868110,-0.000702" },//3
            "16": { pos: "121.907005,30.866037,-0.001190" },//10
        },
        {
            //4，9
            "17": { pos: "121.904439,30.867898,-0.000214" },//4
            "18": { pos: "121.906771,30.865849,-0.001190" },//9
        },
        ],

    }
})



