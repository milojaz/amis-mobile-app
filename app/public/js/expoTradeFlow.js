// INITALIZING FARMERS DATA TABLE / COLLECTION REFERENCE
var connectedRef = firebase.database().ref(".info/connected"); // will holds the offline data
var expoTradeFlowRef = firebase.database().ref('exportTradeFlowData');

// setting the database app persistence for offline cache storage
// FirebaseDatabase.service.setPersistenceEnabled(true);

var offlineData = []

// will store the offline data in an array
var offlineData = [];

// this event listener is listening for a form submit
document.getElementById('exportFlowForm').addEventListener('submit', submitExportTradeForm);

// submitExportTradeForm function
function submitExportTradeForm(e) {

    //preventing the form from submit automatically
    e.preventDefault();

    // getting the values
    var name = getInptValue('name');
    var email = getInptValue('email');
    var address = getInptValue('address');
    var phone = parseInt(getInptValue('phone'));
    var products = getInptValue('products');
    var weight = getInptValue('weight');
    var tonage = getInptValue('tonage');
    var value = parseInt(getInptValue('value'));
    var district = getInptValue('district');
    var region = getInptValue('region');
    var districtFROM = getInptValue('districtFrom');
    var countryTO = getInptValue('countryTO');
    var date = getInptValue('date');

    // connecting to the ref 
    connectedRef.on("value", function(snap) {
        if (snap.val() === true) {
            console.log("connected");
            //calling the send and save data
            
            saveExpoTradeData(name, email, address, phone, products, weight, tonage, value, district, region, districtFROM, countryTO, date);
            
            // resetting the array length
            offlineData.length = 0;

            // show submitAlert
            document.querySelector('.submitAlert').style.display = 'block';

            // hide submitAlert after 3 seconds
            setTimeout(function() {
                document.querySelector('.submitAlert').style.display = 'none';
            }, 10000);
            
        } else {

            console.log("not connected");
            
            offlineData += saveExpoTradeData(name, email, address, phone, products, weight, tonage, value, district, region, districtFROM, countryTO, date);

            console.log("data saved in the cache");

            // show errorAlert
            document.querySelector('.errorAlert').style.display = 'block';

            // hide errorAlert after 3 seconds
            setTimeout(function() {
                document.querySelector('.errorAlert').style.display = 'none';
            }, 10000);
        }
    });

    // clear form
    document.getElementById('exportFlowForm').reset();
}

// function to get form inputs
function getInptValue(id) {
    return document.getElementById(id).value;
}

// SEND AND SAVE DATA TO FIREBASE FUNCTION
function saveExpoTradeData(name, email, address, phone, products, weight, tonage, value, district, region, districtFROM, countryTO, date) {
    var newExpoTradeFlowRef = expoTradeFlowRef.push()

    // setting the new trade flow object
    newExpoTradeFlowRef.set({
        name: name,
        email: email,
        address: address,
        phone: phone,
        products: products,
        weight: weight,
        tonage: tonage,
        value: value,
        district: district,
        region: region,
        districtFrom: districtFROM,
        countryTO: countryTO,
        date: date

    });
}