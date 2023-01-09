// seletct input fields and other id
const name = document.getElementById("name"),
    TotalAmt = document.getElementById("totalamt"),
    Age = document.getElementById("age"),
    Gender = document.getElementById("gender"),
    bookingButton = document.querySelector(".btn"),
    passengerList = document.getElementById("passenger-list");
ticketPrice = parseInt(window.localStorage.getItem("ticktPrice"));
Passenger = [];

// Add eventlistener
bookingButton.addEventListener("click", function (e) {
    e.preventDefault();

    const passenger = {};
    // If fields are empty, alert will be shown
    if (name.value == "" || Age.value == "" || Gender.value == "") {
        alert("Field tidak boleh kosong");
    } else {
        //   create new table row to show data
        const newRow = document.createElement("tr");

        // Create new passenger name
        const newName = document.createElement("td");
        newName.innerHTML = name.value;
        passenger["name"] = name.value;
        newName.setAttribute("class", "pName");
        newRow.appendChild(newName);

        // Create new passenger Age
        const newNumber = document.createElement("td");
        newNumber.innerHTML = Age.value;
        passenger["age"] = Age.value;
        newNumber.setAttribute("class", "pAge");
        newRow.appendChild(newNumber);

        // Create new passenger gender
        const newFrom = document.createElement("td");
        newFrom.innerHTML = Gender.value;
        passenger["geneder"] = Gender.value;
        newFrom.setAttribute("class", "pGender");
        newRow.appendChild(newFrom);

        if (parseInt(window.localStorage.getItem("counter")) >= parseInt(4)) {
            document.getElementById("addPassngr").style.visibility = "hidden";
        }

        // Create new to Ticket Price
        const newTo = document.createElement("td");
        newTo.setAttribute("class", "pTicket");
        if (Gender.value == "F") {
            newTo.innerHTML = ticketPrice - ticketPrice * 0.25;
            newRow.appendChild(newTo);

            if (parseInt(TotalAmt.value) == 0) {
                TotalAmt.value = ticketPrice - ticketPrice * 0.25;
                localStorage.setItem(
                    "counter",
                    parseInt(window.localStorage.getItem("counter")) + 1
                );
            } else {
                TotalAmt.value =
                    parseInt(TotalAmt.value) +
                    (ticketPrice - ticketPrice * 0.25);
                localStorage.setItem(
                    "counter",
                    parseInt(window.localStorage.getItem("counter")) + 1
                );
            }
        } else if (Age.value <= 12) {
            newTo.innerHTML = ticketPrice * 0.5;
            newRow.appendChild(newTo);

            if (parseInt(TotalAmt.value) == 0) {
                TotalAmt.value = ticketPrice * 0.5;
                localStorage.setItem(
                    "counter",
                    window.localStorage.getItem("counter") + 1
                );
            } else {
                TotalAmt.value = parseInt(TotalAmt.value) + ticketPrice * 0.5;
                localStorage.setItem(
                    "counter",
                    parseInt(window.localStorage.getItem("counter")) +
                        parseInt(1)
                );
            }
        } else if (Age.value >= 60) {
            newTo.innerHTML = ticketPrice * 0.6;
            newRow.appendChild(newTo);

            if (parseInt(TotalAmt.value) == 0) {
                TotalAmt.value = ticketPrice * 0.6;
                localStorage.setItem(
                    "counter",
                    parseInt(window.localStorage.getItem("counter")) + 1
                );
            } else {
                TotalAmt.value = parseInt(TotalAmt.value) + ticketPrice * 0.6;
                localStorage.setItem(
                    "counter",
                    parseInt(window.localStorage.getItem("counter")) + 1
                );
            }
        } else {
            newTo.innerHTML = ticketPrice;
            newRow.appendChild(newTo);

            if (parseInt(TotalAmt.value) == 0) {
                TotalAmt.value = ticketPrice;
                localStorage.setItem(
                    "counter",
                    parseInt(window.localStorage.getItem("counter")) + 1
                );
            } else {
                TotalAmt.value = parseInt(TotalAmt.value) + ticketPrice;
                localStorage.setItem(
                    "counter",
                    parseInt(window.localStorage.getItem("counter")) + 1
                );
            }
        }

        //Delete or Update
        const newButton = document.createElement("td");
        //newButton.setAttribute("onclick","myFunction(this)")
        newButton.setAttribute(
            "style",
            "padding: 0.75rem; display: flex; justify-content: center; align-items: center;"
        );
        newRow.appendChild(newButton);

        const newBtn = document.createElement("button");
        newBtn.innerHTML = "Delete";
        newBtn.setAttribute("class", "btn-danger");
        newBtn.addEventListener("click", function () {
            //For Deleting Entrire Row
            var td = event.target.parentNode;
            var tr = td.parentNode;
            delete Passenger[tr.rowIndex - 1];
            Passenger = Passenger.filter(function (el) {
                return el != null;
            });

            tr.parentNode.removeChild(tr);

            //For Updating Total Amount
            var getTicketPrice = tr.childNodes[3].innerHTML;

            TotalAmt.value = TotalAmt.value - getTicketPrice;
            localStorage.setItem(
                "counter",
                parseInt(window.localStorage.getItem("counter")) - 1
            );

            document.getElementById("addPassngr").style.visibility = "visible";
        });

        newButton.appendChild(newBtn);

        passengerList.appendChild(newRow);
        name.value = "";
        Age.value = "";
    }

    Passenger.push(passenger);
});

function arrayItr() {
    /*PassngerArray.forEach(myFunction);*/

    var trNo = window.localStorage.getItem("trainNo");
    var urltrain = "http://localhost:8085/train/trainData/" + trNo;
    fetch(urltrain, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            dataType: "json",
        },
    })
        .then((response) => response.json())
        .then((data) => getTickitObject(data));

    function getTickitObject(data) {

        if (data != null) {
            var travelDate = window.localStorage.getItem("travelDate");
            let url = "http://localhost:8085/train/trvelDate";

            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    dataType: "json",
                },
                body: JSON.stringify({ travelDate: travelDate }),
            })
                .then((response) => response.json())
                .then((data) => Checkstats(data));

            function Checkstats(data) {
                if (data == "OK") {
                    var url = "http://localhost:8085/train/addPassenger";
                    fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            dataType: "json",
                        },
                        body: JSON.stringify(Passenger),
                    })
                        .then((response) => response.json())
                        .then((data) => console.log(data));
                }
            }
        }
    }
}