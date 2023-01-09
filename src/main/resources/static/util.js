// register API call
var regform = document.getElementById("regform");
regform.addEventListener("submit", function (e) {
    e.preventDefault();

    newpass = regform.passwd.value;
    cnfPass = regform.cnfpasswd.value;

    if (newpass == cnfPass) {
        Bool = CheckLength(newpass);
        if (Bool) {
            register();
        } else {
            alert("Password harus memiliki panjang minimal 8 karakter");
        }
    } else {
        alert("Password tidak cocok. Silakan coba lagi");
    }
});

// Change Password API Call
function CheckLength(NewPassword) {
    if (NewPassword.length < 8) {
        return false;
    } else {
        return true;
    }
}

function register() {
    const userdata = {};
    userdata["email"] = regform.Email.value;
    userdata["password"] = regform.passwd.value;

    var urlreg = "http://localhost:8085/register";

    fetch(urlreg, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            dataType: "json",
        },
        body: JSON.stringify(userdata),
    })
        .then((response) => response.json())
        .then((data) => CheckRegister(data));

    function CheckRegister(data) {
        console.log(data);
        if (data == "OK") {
            window.location.href = "http://localhost:8085";
        } else {
            alert("Email sudah terdaftar. Silakan menggunakan email baru");
        }
    }
}

// search Train By Source Destination
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

    todayDate = new Date();
    selectedDate = new Date(searchTrainData.TravelDate);

    if (todayDate > selectedDate) {
        alert("Pilih tanggal mendatang");
    } else {
        window.localStorage.setItem("travelDate", searchTrainData.TravelDate);
        var urltrainsearch =
            "http://localhost:8085/searchTrain/" +
            searchTrainData.Source +
            "/" +
            searchTrainData.Destination;
        window.location.href = urltrainsearch;
    }
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

    todayDate = new Date();
    selectedDate = new Date(TrainformData.TravelDate);

    if (todayDate > selectedDate) {
        alert("Pilih tanggal mendatang");
    } else {
        window.localStorage.setItem("travelDate", TrainformData.TravelDate);
        window.localStorage.setItem("trainNo", TrainformData.trNo);
        var url = "http://localhost:8085/train/getTrain/" + trNo;

        window.location.href = url;
    }
}
