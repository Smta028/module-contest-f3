let ipAdd = document.querySelector(".ipAdd");
let ipAdd2 = document.querySelector(".ipAdd2");
let latitude = document.querySelector(".lat");
let longitude = document.querySelector(".long");
let city = document.querySelector(".city")
let region = document.querySelector(".region");
let organisation = document.querySelector(".organisation");
let hostname = document.querySelector(".hostName");
let dataBtn = document.querySelector("#btn");
let firsrPage = document.querySelector(".getData");
let secondPage = document.querySelector(".container");
let zone = document.querySelector(".zone")
let code = document.querySelector(".codePin")
let message = document.querySelector(".message")
let DateTime = document.querySelector(".date");
let postContainer = document.querySelector(".postContainer")
let search = document.querySelector("#search");
let map = document.querySelector("#map")

var IP;
var lat;
var long;
var pin;
var timezone;
var postOffices;

// ***********getting the ip address*************
fetch('https://api.ipify.org?format=json')
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.ip);
        IP = data.ip;
        ipAdd.innerText = data.ip;
        ipAdd2.innerText = data.ip;

    }).catch((e) => {
        console.log("Error while fetching Ip address", e);
    })
    console.log(IP);


// *********getting the info by fetching the api and ***********
dataBtn.addEventListener("click", (e) => {
    fetch(`https://ipinfo.io/${IP}?token=2104c1b8812fbb`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            firsrPage.style.display = "none";
            secondPage.style.display = "block"
            lat = data.loc.split(",")[0]
            long = data.loc.split(",")[1]
            timezone = data.timezone;
            // console.log(timezone);
            // console.log(lat);
            latitude.innerHTML = `${lat}`
            city.innerHTML = `${data.city}`
            longitude.innerHTML = `${long}`
            region.innerHTML = `${data.region}`
            organisation.innerHTML = `${data.org}`
            hostname.innerHTML = `${data.hostname}`
            zone.innerHTML = `${timezone}`
            pin = data.postal;
            // console.log(pin);
            // console.log(lat);
            code.innerHTML = `${pin}`

            // ********setting the lat and long on map**************
            map.setAttribute('src', `https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14&amp&output=embed`);


            // **********creating a function to show time
            getTimeZone()

            // ***************CREATING THE FUNCTION TO GET CARD DETAILS
            getCardDetails()



        })



})

// **************CALLING THE FUNCTION TO DISPLAY TIME

function getTimeZone() {
    let userTime = new Date().toLocaleString("en-US", { timeZone: `${timezone}` });
    DateTime.innerHTML = `${userTime}`
    // console.log(userTime);

}


// **************CALLING THE FUNCTION TO SHOW CARD DETAILS

function getCardDetails() {
    console.log("a");
    fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            // console.log(data[0].Message);
            message.innerHTML = `${data[0].Message}`
            postOffices = data[0].PostOffice
            // console.log(postOffices);


            showCards(postOffices);
            

        })

}


function showCards(postOffices) {

    postContainer.innerHTML="";

    postOffices.map((item) => {
        postContainer.innerHTML += `
            <div class="postDetails">
                        <li>Name : ${item.Name}</li>
                        <li>Branch Type : ${item.BranchType}</li>
                        <li>Delivery Status : ${item.DeliveryStatus}</li>
                        <li>District : ${item.District}</li>
                        <li>Division : ${item.Division} </li>
                    </div>
            `
    })
}




search.addEventListener("input", () => {
    postContainer.innerHTML = "";
    console.log("search")
    let filterArray = postOffices.filter((item) => {
        if (item.Name.toLowerCase().includes(search.value.trim().toLowerCase()) || item.BranchType.toLowerCase().includes(search.value.trim().toLowerCase())) {
            return item;
        }

    })
    console.log(filterArray)

    showCards(filterArray);

})



