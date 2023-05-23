document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  checkConnection();
  GetAuthorizationHeader();
}

function checkConnection() {
  var networkState = navigator.connection.type;
  if (networkState === Connection.NONE) {
    alert("沒有網路連線...");
    navigator.app.exitApp(); // 離開應用程式
  }
}

var trainData = "";
var trainNow = "";
var mrtDataArray = "";
var mrtDataArray2 = "";
var mrtDataArray3 = "";
var mrtDataArray4 = "";
var mrtDataArray5 = "";
var busDataArray = "";
var busLiveArray = "";
var busLineDataArray = "";
var tokenTime = "";
var accessTokenDataA = "";
var bus_count = 0;

function GetAuthorizationHeader() {
  const parameter = {
    grant_type: "client_credentials",
    client_id: "A8206018-d602d7c8-7fbf-403f",
    client_secret: "a85cb90f-41c3-484a-8d79-0b8f85ce1fce",
  };

  let auth_url =
    "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

  $.ajax({
    type: "POST",
    url: auth_url,
    crossDomain: true,
    dataType: "JSON",
    data: parameter,
    async: true,
    success: function (data) {
      const accessTokenData = JSON.parse(JSON.stringify(data));
      accessTokenDataA = accessTokenData;
      GetApiResponse_mrt_1(accessTokenData);
      GetApiResponse_mrt_2(accessTokenData);
      GetApiResponse_mrt_3(accessTokenData);
      GetApiResponse_mrt_4(accessTokenData);
      GetApiResponse_mrt_5(accessTokenData);
    },
    error: function (xhr, textStatus, thrownError) {},
  });
}
var startStation = "";
var endStation = "";
var userDate = "";
var userTime = "";
var userTimeHour = "";
var userTimeMinute = "";

document
  .getElementById("trainSubmitForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    startStation = document.getElementById("startStation").value;
    endStation = document.getElementById("endStation").value;
    userDate = document.getElementById("userDate").value;
    userTime = document.getElementById("userTime").value;
    if (userDate != null && userTime != null) {
      var userTimeArray = userTime.split(":");
      userTimeHour = userTimeArray[0];
      userTimeMinute = userTimeArray[1];
      GetApiResponse_train_1(accessTokenDataA);
      GetApiResponse_train_2(accessTokenDataA);
    }
    if (startStation === endStation) {
      navigator.notification.alert("起站及迄站不可相同");
    } else if (userDate == "") {
      navigator.notification.alert("請輸入日期");
    } else if (userTime == "") {
      navigator.notification.alert("請輸入時間");
    }
  });

function GetApiResponse_train_1(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url:
        "https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/DailyTrainTimetable/OD/Inclusive/" +
        startStation +
        "/to/" +
        endStation +
        "/" +
        userDate +
        "?%24format=JSON",
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        trainData = Data;
        updateTrain();
        console.log("trainData", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

function GetApiResponse_train_2(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: "https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/TrainLiveBoard?%24top=100&%24format=JSON",
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        trainNow = Data;
        updateTrain();
        console.log("trainNow", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}

function GetApiResponse_mrt_1(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: "https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/S2STravelTime/TRTC?%24top=200&%24format=JSON" /*北捷*/,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        mrtDataArray = Data;
        /* updateMrt(); */
        console.log("mrtDataArray", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
function GetApiResponse_mrt_2(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: "https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/S2STravelTime/TYMC?%24top=50&%24format=JSON" /*桃捷*/,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        mrtDataArray2 = Data;
        /* updateMrt(); */
        console.log("mrtDataArray2", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
function GetApiResponse_mrt_3(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: "https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/S2STravelTime/TMRT?%24top=50&%24format=JSON" /*中捷*/,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        mrtDataArray3 = Data;
        /* updateMrt(); */
        console.log("mrtDataArray3", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
function GetApiResponse_mrt_4(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: "https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/S2STravelTime/KRTC?%24top=50&%24format=JSON" /*高捷*/,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        mrtDataArray4 = Data;
        /* updateMrt(); */
        console.log("mrtDataArray4", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
function GetApiResponse_mrt_5(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url: "https://tdx.transportdata.tw/api/basic/v2/Rail/Metro/S2STravelTime/KLRT?%24top=50&%24format=JSON" /*高輕*/,
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        mrtDataArray5 = Data;
        updateMrt();
        console.log("mrtDataArray5", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
var userBusLine = "";
var userBusBigCity = "";
document
  .getElementById("busSubmitForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    userBusLine = document.getElementById("busLine").value;
    userBusBigCity = document.getElementById("busBigCity").value;
    if (userBusLine == "") {
      navigator.notification.alert("請輸入路線");
    } else {
      $("#busBigCityList").empty();
      $("#busList").empty();
      bus_count = 0;
      GetApiResponse_bus_1(accessTokenDataA);
      if (bus_count != 1) {
        GetApiResponse_bus_2(accessTokenDataA);
        GetApiResponse_bus_3(accessTokenDataA);
      }
    }
  });

function GetApiResponse_bus_1(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url:
        "https://tdx.transportdata.tw/api/basic/v2/Bus/DailyTimeTable/InterCity/" +
        userBusLine +
        "?%24format=JSON",
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: false,
      success: function (Data) {
        busDataArray = Data;
        if (busDataArray.length != 0) {
          updateBus();
          bus_count = 1;
        }
        console.log("busDataArray", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
function GetApiResponse_bus_2(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url:
        "https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeNearStop/City/" +
        userBusBigCity +
        "/" +
        userBusLine +
        "?%24format=JSON" +
        userBusLine +
        "?%24format=JSON",
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        busLiveArray = Data;
        updateBus_2();
        console.log("busLiveArray", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
      },
    });
  }
}
function GetApiResponse_bus_3(accesstoken) {
  if (accesstoken != undefined) {
    $.ajax({
      type: "GET",
      url:
        "https://tdx.transportdata.tw/api/basic/v2/Bus/StopOfRoute/City/" +
        userBusBigCity +
        "/" +
        userBusLine +
        "?%24format=JSON",
      headers: {
        authorization: "Bearer " + accesstoken.access_token,
      },
      async: true,
      success: function (Data) {
        busLineDataArray = Data;
        if (userBusBigCity == "no") {
          navigator.notification.alert("請選擇縣市");
        }
        if (busLineDataArray.length == 0) {
          navigator.notification.alert(
            "該路線公車不屬於此縣市，請選擇'正確'縣市"
          );
        } else if (
          Array.isArray(busLineDataArray) &&
          busLineDataArray.length != 0
        ) {
          updateBus_2();
        }
        console.log("busLineDataArray", Data);
      },
      error: function (xhr, textStatus, thrownError) {
        console.log("errorStatus:", textStatus);
        console.log("Error:", thrownError);
        navigator.notification.alert("請選擇縣市");
      },
    });
  }
}

var updateGetTrainAPI = setInterval(function () {
  if (userBusLine != "") {
    GetApiResponse_train_2(accessTokenDataA);
  }
}, 60000);
var updateGetMrtAPI = setInterval(function () {
  GetApiResponse_mrt_1(accessTokenDataA);
  GetApiResponse_mrt_2(accessTokenDataA);
  GetApiResponse_mrt_3(accessTokenDataA);
  GetApiResponse_mrt_4(accessTokenDataA);
  GetApiResponse_mrt_5(accessTokenDataA);
}, 80000000);
var updateGetBusAPI = setInterval(function () {
  if (userTime != "") {
    GetApiResponse_bus_2(accessTokenDataA);
  }
}, 60000);

var updateToken = setInterval(function () {
  GetAuthorizationHeader();
}, 86000000);

$("#sure_btn_1").click(function () {
  $("#sure_btn_1").fadeOut(1000);
  setTimeout(function () {
    $("#sure_btn_2").fadeOut(500);
    $("first_page_div").fadeOut(500);
  }, 300);
  setTimeout(function () {
    $("#first").fadeOut(1000);
  }, 700);
  setTimeout(function () {
    $("#home").fadeIn(1000);
  }, 1700);
});

var btn_2_count = 0;
$("#sure_btn_2").click(function () {
  btn_2_count++;
  if (btn_2_count == 1) {
    navigator.app.exitApp();
  }
  /* $("#sure_btn_2").fadeOut(1000);
  setTimeout(function () {
    $("#first").fadeOut(1000);
  }, 700);
  setTimeout(function () {
    $("#first").fadeIn(1000);
    $("#sure_btn_2").fadeIn(1000);
  }, 1700); */
});

$("#train_home_img").click(function () {
  $("#home").fadeOut(700);
  setTimeout(function () {
    $("#train").fadeIn(1000);
  }, 700);
});
$("#bus_home_img").click(function () {
  $("#home").fadeOut(700);
  setTimeout(function () {
    $("#bus").fadeIn(1000);
  }, 700);
});
$("#mrt_home_img").click(function () {
  $("#home").fadeOut(700);
  setTimeout(function () {
    $("#mrt").fadeIn(1000);
  }, 700);
});

$(".back").click(function () {
  $("#train").fadeOut(200);
  $("#mrt").fadeOut(200);
  $("#bus").fadeOut(200);
  setTimeout(function () {
    $("#home").fadeIn(1000);
  }, 700);
});

var onClick = 0;
$(document).on("click", "li h2", function () {
  if (onClick == 0) {
    $(this).siblings("div").fadeIn(1000);
    $(this).css({ "background-color": "lightblue" });
    onClick = 1;
  } else if (onClick == 1) {
    $("li div").fadeOut(1000);
    $(this).css({ "background-color": "transparent" });
    onClick = 0;
  }
});

function updateTrain() {
  $("#trainList").empty();
  $("#dayTitle").empty();
  var h1 = $("<h1>");
  var trainDate = trainNow.UpdateTime.substring(0, 10);
  var trainLiveBoardsArray = trainNow.TrainLiveBoards;
  var trainTimetablesArray = trainData.TrainTimetables;

  h1.append(
    $("<div>").html(
      '<i class="fa-solid fa-calendar-days"></i>&nbsp&nbsp' +
        trainDate +
        '&nbsp&nbsp<i class="fa-solid fa-calendar-days"></i>'
    )
  );
  $("#dayTitle").append(h1);

  var trainNo = "";
  var direction = "";
  var trainTypeName = "";
  var tripHeadSign = "";
  var startingStationName = "";
  var endingStationName = "";
  var dailyFlag = "";
  var suspendedFlag = "";

  for (let i = 0; i < trainTimetablesArray.length; i++) {
    var arrivalTime_first = trainTimetablesArray[i].StopTimes[0].ArrivalTime;
    var arrivalTime_firstArray = arrivalTime_first.split(":");
    var arrivalTime_firstHour = arrivalTime_firstArray[0];
    var arrivalTime_firstMinute = arrivalTime_firstArray[1];

    if (
      userTimeHour < arrivalTime_firstHour ||
      (userTimeHour === arrivalTime_firstHour &&
        userTimeMinute < arrivalTime_firstMinute) ||
      (userTimeHour > arrivalTime_firstHour && arrivalTime_firstHour <= 4)
    ) {
      var li = $("<li>");
      trainNo = trainTimetablesArray[i].TrainInfo.TrainNo;
      direction = trainTimetablesArray[i].TrainInfo.Direction;
      trainTypeName = trainTimetablesArray[i].TrainInfo.TrainTypeName.Zh_tw;
      tripHeadSign = trainTimetablesArray[i].TrainInfo.TripHeadSign;
      startingStationName =
        trainTimetablesArray[i].TrainInfo.StartingStationName.Zh_tw;
      endingStationName =
        trainTimetablesArray[i].TrainInfo.EndingStationName.Zh_tw;
      dailyFlag = trainTimetablesArray[i].TrainInfo.DailyFlag;
      suspendedFlag = trainTimetablesArray[i].TrainInfo.SuspendedFlag;

      li.append(
        $("<h2>")
          .html(
            "車次:" +
              trainNo +
              "&nbsp&nbsp[" +
              trainTypeName +
              "]&nbsp&nbsp" +
              '<i class="fa-regular fa-square-caret-down"></i>'
          )
          .css({ padding: "10px", border: "2px solid" })
      );
      li.append(
        $("<div>")
          .html(
            "[" +
              startingStationName +
              "]-[" +
              endingStationName +
              "]&nbsp&nbsp&nbsp" +
              '<i class="fa-solid fa-paw"></i>' +
              tripHeadSign +
              '<i class="fa-solid fa-paw"></i>' +
              "&nbsp&nbsp" +
              (direction == 0 ? "[北上]" : "[南下]")
          )
          .css({ "font-weight": "800" })
      );
      li.append(
        $("<div>").html(
          '<i class="fa-regular fa-square-caret-right"></i>' +
            "是否每日行駛: " +
            (dailyFlag == 1 ? "是" : "否")
        )
      );
      li.append(
        $("<div>").html(
          '<i class="fa-regular fa-square-caret-right"></i>' +
            "今日是否停駛: " +
            (suspendedFlag == 1 ? "是" : "否")
        )
      );

      var stopTimesArray = trainTimetablesArray[i].StopTimes;
      var arrivalTime_end =
        trainTimetablesArray[i].StopTimes[stopTimesArray.length - 1]
          .ArrivalTime;
      var arrivalPlace =
        stopTimesArray[stopTimesArray.length - 1].StationName.Zh_tw;
      li.append(
        $("<div>")
          .html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "預計抵達[" +
              arrivalPlace +
              "]時間為[" +
              arrivalTime_end +
              "]"
          )
          .css({ color: "red" })
      );

      var stationName = "";
      var arrivalTime = "";
      var departureTime = "";
      var passCount = 0;
      for (let j = 0; j < stopTimesArray.length; j++) {
        stationName = stopTimesArray[j].StationName.Zh_tw;
        arrivalTime = stopTimesArray[j].ArrivalTime;
        departureTime = stopTimesArray[j].DepartureTime;
        var passStationName = "";
        for (let k = 0; k < trainLiveBoardsArray.length; k++) {
          if (trainNo === trainLiveBoardsArray[k].TrainNo) {
            passStationName = trainLiveBoardsArray[k].StationName.Zh_tw;
          }
        }
        if (passCount == 0) {
          if (passStationName === "") {
            li.append(
              $("<div>")
                .html(
                  '<i class="fa-regular fa-square-caret-right"></i>' +
                    '<i class="fa-solid fa-rectangle-xmark"></i>' +
                    "目前列車尚未發車" +
                    '<i class="fa-solid fa-rectangle-xmark"></i>'
                )
                .css({ color: "blue" })
            );
          } else {
            li.append(
              $("<div>")
                .html(
                  '<i class="fa-solid fa-rectangle-xmark"></i>' +
                    "目前列車已從[" +
                    passStationName +
                    "]離站" +
                    '<i class="fa-solid fa-rectangle-xmark"></i>'
                )
                .css({ color: "blue" })
            );
          }
          li.append(
            $("<div>").html(
              '<i class="fa-regular fa-square-caret-right"></i>' + "沿途停靠:"
            )
          );
          passCount = 1;
        }
        if (passStationName === stationName) {
          li.append(
            $("<div>")
              .html(
                '<i class="fa-solid fa-rectangle-xmark"></i>' +
                  "<b>已離站</b>" +
                  '<i class="fa-solid fa-rectangle-xmark"></i>' +
                  stationName +
                  "-" +
                  arrivalTime +
                  "進站-" +
                  departureTime +
                  "離站"
              )
              .css({ overflow: "scroll", color: "red" })
          );
        } else {
          li.append(
            $("<div>")
              .html(
                stationName +
                  "-" +
                  arrivalTime +
                  "進站-" +
                  departureTime +
                  "離站"
              )
              .css({ overflow: "scroll" })
          );
        }
      }

      $("#trainList").append(li);
    }
  }
  $("#trainList").listview("refresh");
}

function updateMrt() {
  $("#mrtList").empty();
  //111111111
  for (let i = 0; i < mrtDataArray.length; i++) {
    var li = $("<li>");
    var lineObj = mrtDataArray[i];
    var lineId = lineObj.LineID;
    switch (lineId) {
      case "BL":
        lineId = "台北捷運板南線";
        break;
      case "BR":
        lineId = "台北捷運文湖線";
        break;
      case "G":
        lineId = "台北捷運松山新店線";
        break;
      case "O":
        lineId = "台北捷運中和新蘆線";
        break;
      case "R":
        lineId = "台北捷運淡水信義線";
        break;
      case "Y":
        lineId = "台北捷運環狀線";
        break;
      default:
        break;
    }
    var routeId = lineObj.RouteID;
    var travelTimesArray = lineObj.TravelTimes;

    var travelTimesName = "";
    for (let j = 0; j < travelTimesArray.length; j++) {
      var fromStationName = travelTimesArray[j].FromStationName.Zh_tw;
      var toStationName = travelTimesArray[j].ToStationName.Zh_tw;
      var runTime = travelTimesArray[j].RunTime;
      travelTimesName +=
        "由[" +
        fromStationName +
        "]站至[" +
        toStationName +
        "]站需時: " +
        Math.floor(runTime / 60) +
        "分" +
        (runTime % 60) +
        "秒<br>";
    }
    li.append(
      $("<h2>")
        .html(
          lineId +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "justify-content": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );
    li.append(
      $("<div>").html(
        '<i class="fa-regular fa-square-caret-right"></i>' +
          "路線編號: " +
          routeId
      )
    );
    li.append(
      $("<div>")
        .html(
          '<i class="fa-regular fa-square-caret-right"></i>' +
            "各站間運行時間: <br>" +
            travelTimesName
        )
        .css({ overflow: "scroll" })
    );
    $("#mrtList").append(li);
  }
  //222222222
  for (let i = 0; i < mrtDataArray2.length; i++) {
    var li = $("<li>");
    var lineObj = mrtDataArray2[i];
    var lineId = lineObj.LineID;
    switch (lineId) {
      case "A":
        lineId = "桃園機場捷運線";
        break;
      default:
        break;
    }
    var routeId = lineObj.RouteID;
    var travelTimesArray = lineObj.TravelTimes;

    var travelTimesName = "";
    for (let j = 0; j < travelTimesArray.length; j++) {
      var fromStationName = travelTimesArray[j].FromStationName.Zh_tw;
      var toStationName = travelTimesArray[j].ToStationName.Zh_tw;
      var runTime = travelTimesArray[j].RunTime;
      travelTimesName +=
        "由[" +
        fromStationName +
        "]站至[" +
        toStationName +
        "]站需時: " +
        Math.floor(runTime / 60) +
        "分" +
        (runTime % 60) +
        "秒<br>";
    }
    li.append(
      $("<h2>")
        .html(
          lineId +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "justify-content": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );
    li.append(
      $("<div>").html(
        '<i class="fa-regular fa-square-caret-right"></i>' +
          "路線編號: " +
          routeId
      )
    );
    li.append(
      $("<div>")
        .html(
          '<i class="fa-regular fa-square-caret-right"></i>' +
            "各站間運行時間: <br>" +
            travelTimesName
        )
        .css({ overflow: "scroll" })
    );
    $("#mrtList").append(li);
  }
  //333333333
  for (let i = 0; i < mrtDataArray3.length; i++) {
    var li = $("<li>");
    var lineObj = mrtDataArray3[i];
    var lineId = lineObj.LineID;
    switch (lineId) {
      case "G":
        lineId = "台中捷運綠線";
        break;
      default:
        break;
    }
    var routeId = lineObj.RouteID;
    var travelTimesArray = lineObj.TravelTimes;

    var travelTimesName = "";
    for (let j = 0; j < travelTimesArray.length; j++) {
      var fromStationName = travelTimesArray[j].FromStationName.Zh_tw;
      var toStationName = travelTimesArray[j].ToStationName.Zh_tw;
      var runTime = travelTimesArray[j].RunTime;
      travelTimesName +=
        "由[" +
        fromStationName +
        "]站至[" +
        toStationName +
        "]站需時: " +
        Math.floor(runTime / 60) +
        "分" +
        (runTime % 60) +
        "秒<br>";
    }
    li.append(
      $("<h2>")
        .html(
          lineId +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "justify-content": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );
    li.append(
      $("<div>").html(
        '<i class="fa-regular fa-square-caret-right"></i>' +
          "路線編號: " +
          routeId
      )
    );
    li.append(
      $("<div>")
        .html(
          '<i class="fa-regular fa-square-caret-right"></i>' +
            "各站間運行時間: <br>" +
            travelTimesName
        )
        .css({ overflow: "scroll" })
    );
    $("#mrtList").append(li);
  }
  //444444444
  for (let i = 0; i < mrtDataArray4.length; i++) {
    var li = $("<li>");
    var lineObj = mrtDataArray4[i];
    var lineId = lineObj.LineID;
    switch (lineId) {
      case "O":
        lineId = "高雄捷運橘線";
        break;
      case "R":
        lineId = "高雄捷運紅線";
        break;
      default:
        break;
    }
    var routeId = lineObj.RouteID;
    var travelTimesArray = lineObj.TravelTimes;

    var travelTimesName = "";
    for (let j = 0; j < travelTimesArray.length; j++) {
      var fromStationName = travelTimesArray[j].FromStationName.Zh_tw;
      var toStationName = travelTimesArray[j].ToStationName.Zh_tw;
      var runTime = travelTimesArray[j].RunTime;
      travelTimesName +=
        "由[" +
        fromStationName +
        "]站至[" +
        toStationName +
        "]站需時: " +
        Math.floor(runTime / 60) +
        "分" +
        (runTime % 60) +
        "秒<br>";
    }
    li.append(
      $("<h2>")
        .html(
          lineId +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "justify-content": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );
    li.append(
      $("<div>").html(
        '<i class="fa-regular fa-square-caret-right"></i>' +
          "路線編號: " +
          routeId
      )
    );
    li.append(
      $("<div>")
        .html(
          '<i class="fa-regular fa-square-caret-right"></i>' +
            "各站間運行時間: <br>" +
            travelTimesName
        )
        .css({ overflow: "scroll" })
    );
    $("#mrtList").append(li);
  }
  //555555555
  for (let i = 0; i < mrtDataArray5.length; i++) {
    var li = $("<li>");
    var lineObj = mrtDataArray5[i];
    var lineId = lineObj.LineID;
    switch (lineId) {
      case "C":
        lineId = "高雄輕軌線";
        break;
      default:
        break;
    }
    var routeId = lineObj.RouteID;
    var travelTimesArray = lineObj.TravelTimes;

    var travelTimesName = "";
    for (let j = 0; j < travelTimesArray.length; j++) {
      var fromStationName = travelTimesArray[j].FromStationName.Zh_tw;
      var toStationName = travelTimesArray[j].ToStationName.Zh_tw;
      var runTime = travelTimesArray[j].RunTime;
      travelTimesName +=
        "由[" +
        fromStationName +
        "]站至[" +
        toStationName +
        "]站需時: " +
        Math.floor(runTime / 60) +
        "分" +
        (runTime % 60) +
        "秒<br>";
    }
    li.append(
      $("<h2>")
        .html(
          lineId +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "justify-content": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );
    li.append(
      $("<div>").html(
        '<i class="fa-regular fa-square-caret-right"></i>' +
          "路線編號: " +
          routeId
      )
    );
    li.append(
      $("<div>")
        .html(
          '<i class="fa-regular fa-square-caret-right"></i>' +
            "各站間運行時間: <br>" +
            travelTimesName
        )
        .css({ overflow: "scroll" })
    );
    $("#mrtList").append(li);
  }
  $("#mrtList").listview("refresh");
}

function updateBus() {
  $("#busList").empty();
  var h1 = $("<h1>");
  var div = $("<div>");
  var busNowTime = new Date();
  var busNowHour = busNowTime.getHours();
  var busNowMinute = busNowTime.getMinutes();
  var busDate = busDataArray[0].BusDate.substring(0, 10);

  h1.append(
    $("<div>").html(
      '<i class="fa-solid fa-calendar-days"></i>&nbsp&nbsp' +
        busDate +
        '&nbsp&nbsp<i class="fa-solid fa-calendar-days"></i>'
    )
  );
  div.append(
    $("<div>")
      .html("藍字為[已]過站&nbsp&nbsp&nbsp&nbsp&nbsp紅字為[未]過站")
      .css({
        display: "grid",
        "justify-content": "center",
        "background-image": "linear-gradient(to right, #0900ff, #ff0000 100%)",
        color: "white",
        "font-size": "large",
        "font-weight": "600",
        "border-radius": "10%",
      })
  );
  $("#busList").append(h1);
  $("#busList").append(div);

  for (let i = 0; i < busDataArray.length; i++) {
    var li = $("<li>");
    var routeName = busDataArray[i].RouteName.Zh_tw;
    var operatorName = busDataArray[i].OperatorCode;
    var direction = busDataArray[i].Direction;
    var timetablesArray = busDataArray[i].Timetables;

    li.append(
      $("<h2>")
        .html(
          "路線編號: " +
            routeName +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "justify-content": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );
    li.append(
      $("<div>").html(
        '<i class="fa-regular fa-square-caret-right"></i>' +
          "營運業者: " +
          operatorName
      )
    );

    for (let j = 0; j < timetablesArray.length; j++) {
      var stopName = "";
      var StopTimesArray = timetablesArray[j].StopTimes;
      var tripID = timetablesArray[j].TripID;

      if (j == 0) {
        var firstStop = StopTimesArray[0].StopName.Zh_tw;
        var endStop = StopTimesArray[StopTimesArray.length - 1].StopName.Zh_tw;
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "由 [" +
              firstStop +
              "] 開往 [" +
              endStop +
              "]<br>" +
              '<i class="fa-regular fa-square-caret-right"></i>' +
              "方向: " +
              (direction == 1 ? "返程" : "去程")
          )
        );
      }
      li.append(
        $("<div>").html(
          '<i class="fa-regular fa-square-caret-right"></i>' + "班次: " + tripID
        )
      );
      for (let k = 0; k < StopTimesArray.length; k++) {
        stopName = StopTimesArray[k].StopName.Zh_tw;
        var arrivalTime = StopTimesArray[k].ArrivalTime;
        var departureTime = StopTimesArray[k].DepartureTime;
        var finalTime = StopTimesArray[StopTimesArray.length - 1].DepartureTime;
        if (k == 0) {
          var finalTimeArray = finalTime.split(":");
          var finalTimeHour = finalTimeArray[0];
          var finalTimeMinute = finalTimeArray[1];
        }

        var departureTimeArray = departureTime.split(":");
        var departureTimeHour = departureTimeArray[0];
        var departureTimeMinute = departureTimeArray[1];
        var stopAll = "";
        if (
          (busNowHour > departureTimeHour && departureTimeHour > 3) ||
          (busNowHour == departureTimeHour &&
            busNowMinute > departureTimeMinute)
        ) {
          stopAll =
            "<b>[已過]</b>" +
            stopName +
            "-" +
            arrivalTime +
            "進站-" +
            departureTime +
            "離站<br>";
          if (
            busNowHour > finalTimeHour ||
            (busNowHour < finalTimeHour && busNowHour < 3) ||
            (busNowHour == finalTimeHour && busNowMinute > finalTimeMinute)
          ) {
            li.append(
              $("<div>")
                .html(
                  '<i class="fa-regular fa-square-caret-right"></i>' +
                    "本班次今日已於[" +
                    finalTime +
                    "]末班駛離"
                )
                .css({ overflow: "scroll", color: "blue" })
            );
            break;
          } else {
            li.append(
              $("<div>")
                .html(
                  '<i class="fa-regular fa-square-caret-right"></i>' + stopAll
                )
                .css({ overflow: "scroll", color: "blue" })
            );
          }
        } else {
          stopAll =
            stopName + "-" + arrivalTime + "進站-" + departureTime + "離站<br>";
          li.append(
            $("<div>")
              .html(
                '<i class="fa-regular fa-square-caret-right"></i>' + stopAll
              )
              .css({ overflow: "scroll", color: "red" })
          );
        }
      }
    }
    $("#busList").append(li);
  }
  $("#busList").listview("refresh");
}

function updateBus_2() {
  $("#busBigCityList").empty();
  var h1 = $("<h1>");
  var nowTime = new Date();

  h1.append(
    $("<div>").html(
      '<i class="fa-solid fa-calendar-days"></i>&nbsp&nbsp' +
        nowTime.getFullYear() +
        "-" +
        (nowTime.getMonth() + 1) +
        "-" +
        nowTime.getDate() +
        '&nbsp&nbsp<i class="fa-solid fa-calendar-days"></i>'
    )
  );
  $("#busBigCityList").append(h1);

  var subRouteName = "";
  var subRouteID_1 = "";
  for (let i = 0; i < busLineDataArray.length; i++) {
    subRouteName = busLineDataArray[i].SubRouteName.Zh_tw;
    var li = $("<li>");

    li.append(
      $("<h2>")
        .html(
          subRouteName +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "text-align": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );

    subRouteID_1 = busLineDataArray[i].SubRouteID;
    var subRouteID_2 = "";
    var stopName_Live = "";
    for (let k = 0; k < busLiveArray.length; k++) {
      subRouteID_2 = busLiveArray[k].SubRouteID;
      if (subRouteID_1 == subRouteID_2) {
        stopName_Live = busLiveArray[k].StopName.Zh_tw;
      }
    }

    var stopsArray = busLineDataArray[i].Stops;
    var stopName = "";
    for (let j = 0; j < stopsArray.length; j++) {
      stopName = stopsArray[j].StopName.Zh_tw;
      if (stopName == stopName_Live) {
        li.append(
          $("<div>")
            .html(
              '<i class="fa-solid fa-bus-simple">' +
                "進站中" +
                '<i class="fa-solid fa-bus-simple">' +
                "&nbsp&nbsp&nbsp&nbsp&nbsp" +
                stopName
            )
            .css({ color: "red" })
        );
      } else {
        li.append($("<div>").html(stopName));
      }
    }
    $("#busBigCityList").append(li);
  }

  $("#busBigCityList").listview("refresh");
}

var backToTopBtn = document.getElementById("backToTopBtn");
var backToTopBtn2 = document.getElementById("backToTopBtn2");
var backToTopBtn3 = document.getElementById("backToTopBtn3");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
    backToTopBtn2.style.display = "block";
    backToTopBtn3.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
    backToTopBtn2.style.display = "none";
    backToTopBtn3.style.display = "none";
  }
};
backToTopBtn.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
backToTopBtn2.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
backToTopBtn3.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

var oClock1 = document.querySelector(".clock1");
var oClock2 = document.querySelector(".clock2");
var oClock3 = document.querySelector(".clock3");
function addZero(num) {
  if (num >= 10) {
    return num;
  } else {
    return `0${num}`;
  }
}
function updateTime() {
  var now = new Date();
  var time =
    addZero(now.getHours()) +
    ":" +
    addZero(now.getMinutes()) +
    ":" +
    addZero(now.getSeconds());
  oClock1.innerText = time;
  oClock2.innerText = time;
  oClock3.innerText = time;
}
updateTime();
setInterval(function () {
  updateTime();
}, 1000);

/*function updateTrain() {
  $("#trainList").empty();
  var h1 = $("<h1>");
  var trainDate = trainData.TrainDate;
  var trainLiveBoardsArray = trainNow.TrainLiveBoards;
  var trainTimetablesArray = trainData.TrainTimetables;

  h1.append(
    $("<div>").html(
      '<i class="fa-solid fa-calendar-days"></i>&nbsp&nbsp' +
        trainDate +
        '&nbsp&nbsp<i class="fa-solid fa-calendar-days"></i>'
    )
  );
  $("#dayTitle").append(h1);

  var nowTime = new Date();

  for (let i = 0; i < trainTimetablesArray.length; i++) {
    var li = $("<li>");
    var stationObj = trainTimetablesArray[i];
    var trainInfo = stationObj.TrainInfo;
    var stopTimesArray = stationObj.StopTimes;

    var trainNo = trainInfo.TrainNo;
    var direction = trainInfo.Direction;
    var trainNoNum1 = parseInt(trainNo);
    var passStationName = "";
    for (let k = 0; k < trainLiveBoardsArray.length; k++) {
      var trainNoNow = trainLiveBoardsArray[k].TrainNo;
      var trainNoNum2 = parseInt(trainNoNow);
      if (trainNoNum1 == trainNoNum2) {
        passStationName = trainLiveBoardsArray[k].StationName.Zh_tw;
      }
    }

    var trainTypeName = trainInfo.TrainTypeName.Zh_tw;
    var tripHeadSign = trainInfo.TripHeadSign;
    var startingStationName = trainInfo.StartingStationName.Zh_tw;
    var endingStationName = trainInfo.EndingStationName.Zh_tw;
    var dailyFlag = trainInfo.DailyFlag;
    var suspendedFlag = trainInfo.SuspendedFlag;

    var stopStation = "";
    var startTime = "";
    var endTime = "";

    li.append(
      $("<h2>")
        .html(
          "列車車次: " +
            trainNo +
            "&nbsp &nbsp &nbsp" +
            '<i class="fa-regular fa-square-caret-down"></i>'
        )
        .css({
          "justify-content": "center",
          display: "flex",
          border: "1px solid",
          padding: "5px 0",
        })
    );

    for (let j = 0; j < stopTimesArray.length; j++) {
      var stationName = stopTimesArray[j].StationName.Zh_tw;
      startTime = stopTimesArray[0].ArrivalTime;
      endTime = stopTimesArray[stopTimesArray.length - 1].DepartureTime;
      if (j != stopTimesArray.length - 1) {
        stopStation += stationName + "-";
        if ((j != 0 && j % 5 == 0 && j != 5) || j == 4) {
          stopStation += "<br>";
        }
      } else {
        stopStation += stationName;
      }
    }

    var startTimeArray = startTime.split(":");
    var startHour = parseInt(startTimeArray[0]);
    var startMinute = parseInt(startTimeArray[1]);

    var endTimeArray = endTime.split(":");
    var endHour = parseInt(endTimeArray[0]);
    var endMinute = parseInt(endTimeArray[1]);

    var nowHour = nowTime.getHours();
    var nowMinute = nowTime.getMinutes();

    if (
      startHour < endHour ||
      (startHour === endHour && startMinute < endMinute)
    ) {
      // 列車不跨日
      if (
        (nowHour > startHour && nowHour < endHour) ||
        (nowHour === startHour &&
          nowMinute >= startMinute &&
          nowHour < endHour) ||
        (nowHour === endHour && nowMinute < endMinute)
      ) {
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "列車已從[" +
              passStationName +
              "]站駛離。"
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "車種: " +
              trainTypeName
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "行駛方向: " +
              tripHeadSign +
              " [" +
              (direction == 0 ? "順行" : "逆行") +
              "]"
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "起始站: [" +
              startingStationName +
              "] 至 終點站: [" +
              endingStationName +
              "]"
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "沿途停靠: " +
              stopStation
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "是否每日行駛: " +
              (dailyFlag == 1 ? "是" : "否")
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "今日是否停駛: " +
              (suspendedFlag == 1 ? "是" : "否")
          )
        );
        li.append(
          $("<div>")
            .html(
              '<i class="fa-regular fa-square-caret-right"></i>' + "時刻表:<br>"
            )
            .css("overflow", "scroll")
        );
        for (let o = 0; o < stopTimesArray.length; o++) {
          var stationName = stopTimesArray[o].StationName.Zh_tw;
          var arrivalTime = stopTimesArray[o].ArrivalTime;
          var departureTime = stopTimesArray[o].DepartureTime;
          var stop_arr_dep = "";
          if (passStationName === stationName) {
            stop_arr_dep +=
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              "<b>已離站</b>" +
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>" +
              '<i class="fa-solid fa-train-subway"></i>' +
              "<b>下站停靠</b>" +
              '<i class="fa-solid fa-train-subway"></i>';
            li.append(
              $("<div>")
                .html(stop_arr_dep)
                .css({ overflow: "scroll", color: "red" })
            );
          } else {
            stop_arr_dep +=
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>";
            li.append($("<div>").html(stop_arr_dep).css("overflow", "scroll"));
          }
        }
      } else if (
        nowHour > endHour ||
        (nowHour === endHour && nowMinute >= endMinute)
      ) {
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "本車次今日末班駛離<br>已於[ " +
              endTime +
              " ]在終點站[ " +
              endingStationName +
              " ]離站"
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "是否每日行駛: " +
              (dailyFlag == 1 ? "是" : "否")
          )
        );
        li.append(
          $("<div>")
            .html(
              '<i class="fa-regular fa-square-caret-right"></i>' + "時刻表:<br>"
            )
            .css("overflow", "scroll")
        );
        for (let o = 0; o < stopTimesArray.length; o++) {
          var stationName = stopTimesArray[o].StationName.Zh_tw;
          var arrivalTime = stopTimesArray[o].ArrivalTime;
          var departureTime = stopTimesArray[o].DepartureTime;
          var stop_arr_dep = "";
          if (passStationName === stationName) {
            stop_arr_dep +=
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              "<b>已離站</b>" +
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>" +
              '<i class="fa-solid fa-train-subway"></i>' +
              "<b>下站停靠</b>" +
              stopTimesArray[o + 1].StationName.Zh_tw +
              '<i class="fa-solid fa-train-subway"></i>';
            li.append(
              $("<div>")
                .html(stop_arr_dep)
                .css({ overflow: "scroll", color: "red" })
            );
          } else {
            stop_arr_dep +=
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>";
            li.append($("<div>").html(stop_arr_dep).css("overflow", "scroll"));
          }
        }
      } else {
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "本車次尚未發車<br>預計[ " +
              startTime +
              " ]從[ " +
              startingStationName +
              " ]站發車。"
          )
        );
        li.append(
          $("<div>")
            .html(
              '<i class="fa-regular fa-square-caret-right"></i>' + "時刻表:<br>"
            )
            .css("overflow", "scroll")
        );
        for (let o = 0; o < stopTimesArray.length; o++) {
          var stationName = stopTimesArray[o].StationName.Zh_tw;
          var arrivalTime = stopTimesArray[o].ArrivalTime;
          var departureTime = stopTimesArray[o].DepartureTime;
          var stop_arr_dep = "";
          if (passStationName === stationName) {
            stop_arr_dep +=
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              "<b>已離站</b>" +
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>" +
              '<i class="fa-solid fa-train-subway"></i>' +
              "<b>下站停靠</b>" +
              '<i class="fa-solid fa-train-subway"></i>';
            li.append(
              $("<div>")
                .html(stop_arr_dep)
                .css({ overflow: "scroll", color: "red" })
            );
          } else {
            stop_arr_dep +=
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>";
            li.append($("<div>").html(stop_arr_dep).css("overflow", "scroll"));
          }
        }
      }
    } else if (
      startHour > endHour ||
      (startHour === endHour && startMinute > endMinute)
    ) {
      // 列車跨日
      if (
        (nowHour > startHour && nowHour <= 23) ||
        (nowHour >= 0 && nowHour < endHour) ||
        (nowHour === startHour && nowMinute >= startMinute && nowHour <= 23) ||
        (nowHour === endHour && nowMinute < endMinute && nowHour >= 0)
      ) {
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "列車已從[" +
              passStationName +
              "]站駛離。"
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "車種: " +
              trainTypeName
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "行駛方向: " +
              tripHeadSign
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "起始站: [" +
              startingStationName +
              "] 至 終點站: [" +
              endingStationName +
              "]"
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "沿途停靠: " +
              stopStation
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "是否每日行駛: " +
              (dailyFlag == 1 ? "是" : "否")
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "今日是否停駛: " +
              (suspendedFlag == 1 ? "是" : "否")
          )
        );
        li.append(
          $("<div>")
            .html(
              '<i class="fa-regular fa-square-caret-right"></i>' + "時刻表:<br>"
            )
            .css("overflow", "scroll")
        );
        for (let o = 0; o < stopTimesArray.length; o++) {
          var stationName = stopTimesArray[o].StationName.Zh_tw;
          var arrivalTime = stopTimesArray[o].ArrivalTime;
          var departureTime = stopTimesArray[o].DepartureTime;
          var stop_arr_dep = "";
          if (passStationName === stationName) {
            stop_arr_dep +=
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              "<b>已離站</b>" +
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>" +
              '<i class="fa-solid fa-train-subway"></i>' +
              "<b>下站停靠</b>" +
              '<i class="fa-solid fa-train-subway"></i>';
            li.append(
              $("<div>")
                .html(stop_arr_dep)
                .css({ overflow: "scroll", color: "red" })
            );
          } else {
            stop_arr_dep +=
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>";
            li.append($("<div>").html(stop_arr_dep).css("overflow", "scroll"));
          }
        }
      } else if (
        (nowHour === endHour && nowMinute >= endMinute && nowHour >= 0) ||
        (nowHour < startHour && nowHour >= 0)
      ) {
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "本車次今日末班駛離<br>已於[ " +
              endTime +
              " ]在終點站[ " +
              endingStationName +
              " ]離站"
          )
        );
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "是否每日行駛: " +
              (dailyFlag == 1 ? "是" : "否")
          )
        );
        li.append(
          $("<div>")
            .html(
              '<i class="fa-regular fa-square-caret-right"></i>' + "時刻表:<br>"
            )
            .css("overflow", "scroll")
        );
        for (let o = 0; o < stopTimesArray.length; o++) {
          var stationName = stopTimesArray[o].StationName.Zh_tw;
          var arrivalTime = stopTimesArray[o].ArrivalTime;
          var departureTime = stopTimesArray[o].DepartureTime;
          var stop_arr_dep = "";
          if (passStationName === stationName) {
            stop_arr_dep +=
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              "<b>已離站</b>" +
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>" +
              '<i class="fa-solid fa-train-subway"></i>' +
              "<b>下站停靠</b>" +
              '<i class="fa-solid fa-train-subway"></i>';
            li.append(
              $("<div>")
                .html(stop_arr_dep)
                .css({ overflow: "scroll", color: "red" })
            );
          } else {
            stop_arr_dep +=
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>";
            li.append($("<div>").html(stop_arr_dep).css("overflow", "scroll"));
          }
        }
      } else {
        li.append(
          $("<div>").html(
            '<i class="fa-regular fa-square-caret-right"></i>' +
              "本車次尚未發車<br>預計[ " +
              startTime +
              ne" ]從[ " +
              startingStationName +
              " ]站發車。"
          )
        );
        li.append(
          $("<div>")
            .html(
              '<i class="fa-regular fa-square-caret-right"></i>' + "時刻表:<br>"
            )
            .css("overflow", "scroll")
        );
        for (let o = 0; o < stopTimesArray.length; o++) {
          var stationName = stopTimesArray[o].StationName.Zh_tw;
          var arrivalTime = stopTimesArray[o].ArrivalTime;
          var departureTime = stopTimesArray[o].DepartureTime;
          var stop_arr_dep = "";
          if (passStationName === stationName) {
            stop_arr_dep +=
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              "<b>已離站</b>" +
              '<i class="fa-solid fa-rectangle-xmark"></i>' +
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>" +
              '<i class="fa-solid fa-train-subway"></i>' +
              "<b>下站停靠</b>" +
              '<i class="fa-solid fa-train-subway"></i>';
            li.append(
              $("<div>")
                .html(stop_arr_dep)
                .css({ overflow: "scroll", color: "red" })
            );
          } else {
            stop_arr_dep +=
              stationName +
              "-" +
              arrivalTime +
              "進站-" +
              departureTime +
              "離站<br>";
            li.append($("<div>").html(stop_arr_dep).css("overflow", "scroll"));
          }
        }
      }
    }

    $("#trainList").append(li);
  }
  $("#trainList").listview("refresh");
}*/
