// search Train By Source DeSTINATION
var searchTrainForm = document.getElementById("searchTrain");
searchTrainForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchTrainByDestSource();
});
var searchTrainData = {
    Source: null,
    Destination: null,
    TravelDate: null,
};

//var Auth_Token
function searchTrainByDestSource() {
    searchTrainData.Source = searchTrainForm.source.value;
    searchTrainData.Destination = searchTrainForm.dest.value;
    searchTrainData.TravelDate = searchTrainForm.TravelDate.value;
}

// search Train By Train Number
var searchTrainNumberForm = document.getElementById("searchTrainNo");
searchTrainNumberForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchTrain();
});
var TrainformData = {
    trNo: null,
    TravelDate: null,
};

//var Auth_Token
function searchTrain() {
    TrainformData.trNo = searchTrainNumberForm.trNo.value;
    TrainformData.TravelDate = searchTrainNumberForm.jdate.value;

    var trNo = TrainformData.trNo;
    window.localStorage.setItem("travelDate", TrainformData.TravelDate);
    window.localStorage.setItem("trainNo", TrainformData.trNo);
    var url = "http://localhost:8085/train/getTrain/" + trNo;

    window.location.href = url;
}
