var pillowValues = []; // Mảng chứa các giá trị của pillow1 đến pillow6
var a = 0;
var PillowType = "SittingPillow";
var TimeStamp = "Morning";
var TemperatureSet = 38;
var TemperatureCurrent = 0;
// Time remain for pillow
var inputNumber = document.getElementById('inputNumber');
var inputNumber2 = document.getElementById('inputNumber2');
var inputNumber3 = document.getElementById('inputNumber3');
var submitButtonHour = document.getElementById('submitButton');
var submitButtonMinute = document.getElementById('submitButton2');
var submitButtonSecond = document.getElementById('submitButton3');

var inputOnTimeNumber = document.getElementById('inputOntimeNumber');
var inputOnTimeNumber2 = document.getElementById('inputOntimeNumber2');
var inputOnTimeNumber3 = document.getElementById('inputOntimeNumber3');
var submitButtonOnTimeHour = document.getElementById('submitOntimeButton');
var submitButtonOnTimeMinute = document.getElementById('submitOntimeButton2');
var submitButtonOnTimeSecond = document.getElementById('submitOntimeButton3');

// Time notification
var toggleSettimeButton = document.getElementById('toggle-settime-button');
var toggleChangePillowButton = document.getElementById('toggle-change-pillow-button');
var getPillowTemperature = document.getElementsByClassName('notification-icon');
var inputTemperatureSet = document.getElementById('i-input-tempset');
var submitTempSet = document.getElementById('i-submit-tempset-button');

const db = firebase.database();
var pillow1 = firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad1');
var pillow2 = firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad2');
var pillow3 = firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad3');
var pillow4 = firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad4');
var pillow5 = firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad5');
var pillow6 = firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad6');


// Lấy giá trị từ Firebase và đặt vào mảng pillowValues
var firebaseRefs = [
    firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad1'),
    firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad2'),
    firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad3'),
    firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad4'),
    firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad5'),
    firebase.database().ref().child('Pillow/SittingPillow/Pads/Pad6')
];

// Lắng nghe sự thay đổi của các giá trị và cập nhật vào mảng pillowValues
firebaseRefs.forEach(function (ref, index) {
    ref.on('value', function (snap) {
        pillowValues[index] = snap.val();
        //console.log(pillowValues[index]);
        checkPillowValues();
    });
});

// Hàm kiểm tra giá trị của các pillow
function checkPillowValues() {
    var allZeros = pillowValues.every(function (value) {
        return value === 0;
    });

    if (allZeros) {
        //console.log("Sai"); // In ra "Sai" nếu tất cả các giá trị đều là 0
        a = 0;
        //console.log(a);
    } else {
        //console.log("Đúng"); // In ra "Đúng" nếu có ít nhất một giá trị khác 0
        a = 1;
        //console.log(a);
    }
    if (a == 0) {
        document.getElementById("ghe2").innerHTML = "Không phát hiện người ngồi";
        document.images['ghe'].src = 'images2/trong.png';
    }
    if (a == 1) {
        document.getElementById("ghe2").innerHTML = "Phát hiện người ngồi";
        document.images['ghe'].src = 'images2/ngoi.png';
    }
}																		

pillow1.on('value', snap => {
    if (snap.val() == 0) {
        changeCircleColor("circle1", "#681dfd94");
    }
    if (snap.val() == 1) {
        changeCircleColor("circle1", "orange");
    }
});

pillow2.on('value', snap => {
    if (snap.val() == 0) {
        changeCircleColor("circle2", "#681dfd94");
    }
    if (snap.val() == 1) {
        changeCircleColor("circle2", "orange");
    }
});
pillow3.on('value', snap => {
    if (snap.val() == 0) {
        changeCircleColor("circle3", "#681dfd94");
    }
    if (snap.val() == 1) {
        changeCircleColor("circle3", "orange");
    }
});
pillow4.on('value', snap => {
    if (snap.val() == 0) {
        changeCircleColor("circle4", "#681dfd94");
    }
    if (snap.val() == 1) {
        changeCircleColor("circle4", "orange");
    }
});
pillow5.on('value', snap => {
    if (snap.val() == 0) {
        changeCircleColor("circle5", "#681dfd94");
    }
    if (snap.val() == 1) {
        changeCircleColor("circle5", "orange");
    }
});
pillow6.on('value', snap => {
    if (snap.val() == 0) {
        changeCircleColor("circle6", "#681dfd94");
    }
    if (snap.val() == 1) {
        changeCircleColor("circle6", "orange");
    }
});

function changeCircleColor(circleId, color) {
    var circle = document.getElementById(circleId);
    circle.style.backgroundColor = color;
}

function handleSubmitTime(getValue, format, pathToSend)
{
    var numberValue = getValue.value;
    if (numberValue > format) {
        numberValue = format;
        Swal.fire({
            icon: 'error',
            title: 'Cảnh báo.',
            text: 'Bạn chỉ có thể đặt tối đa là 24 giờ',
            //   footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    if (isValidNumber(numberValue)) {
        // Gửi dữ liệu lên Firebase
        var firebaseRef = firebase.database().ref().child(pathToSend);
        firebaseRef.set(numberValue)
            .then(function () {
                // Đặt lại giá trị của ô nhập liệu thành chuỗi rỗng
                getValue.value = "";
            })
            .catch(function (error) {
                console.log("Lỗi khi gửi dữ liệu:", error);
            });
    } else {
        console.log("Giá trị không hợp lệ");
    }
}

function handleSubmitTemperature(getValue, pathToSend)
{
    var numberValue = parseInt(getValue.value);
    if (numberValue > 60 || numberValue < 0) {
        numberValue = format;
        Swal.fire({
            icon: 'error',
            title: 'Cảnh báo',
            text: 'Bạn chỉ có thể đặt tối đa là 60 độ C!',
            //   footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    if (isValidNumber(numberValue)) {
        // Gửi dữ liệu lên Firebase
        var firebaseRef = firebase.database().ref().child(pathToSend);
        firebaseRef.set(numberValue)
            .then(function () {
                // Đặt lại giá trị của ô nhập liệu thành chuỗi rỗng
                getValue.value = "";
            })
            .catch(function (error) {
                console.log("Lỗi khi gửi dữ liệu:", error);
            });
    } else {
        console.log("Giá trị không hợp lệ");
    }
}

function isValidNumber(value) {
    return /^\d+$/.test(value);
}


submitButtonHour.addEventListener('click', function () {
    handleSubmitTime(inputNumber, 23, 'Pillow/'+ PillowType +'/hour');
});
submitButtonMinute.addEventListener('click', function () {
    handleSubmitTime(inputNumber2, 59, 'Pillow/'+ PillowType +'/minute');
});
submitButtonSecond.addEventListener('click', function () {
    handleSubmitTime(inputNumber3, 59, 'Pillow/'+ PillowType +'/second');
});


submitButtonOnTimeHour.addEventListener('click', function () {
    handleSubmitTime(inputOnTimeNumber, 23, 'Pillow/TimeSet/'+ TimeStamp +'/hour');
});
submitButtonOnTimeMinute.addEventListener('click', function () {
    handleSubmitTime(inputOnTimeNumber2, 59, 'Pillow/TimeSet/'+ TimeStamp +'/minute');
});
submitButtonOnTimeSecond.addEventListener('click', function () {
    handleSubmitTime(inputOnTimeNumber3, 59, 'Pillow/TimeSet/'+ TimeStamp +'/second');
});

submitTempSet.addEventListener('click', () =>{
    handleSubmitTemperature(inputTemperatureSet, 'Pillow/SleepingPillow/BMP280/tempSet');
    setTemperatureIcon();
});

toggleButton.addEventListener('click', function () {
    var value = toggleButton.classList.contains('On') ? '1' : '0';
    
    if(toggleButton.textContent === "On") {
        toggleButton.textContent = "Off"
        document.images['music1'].src = 'images2/off_music.png';
        
        Swal.fire({
            icon: 'error',
            title: 'CHÚ Ý',
            text: 'Khi bạn tắt âm thanh bạn sẽ không thể nghe được cảnh báo trên thiết bị',
            //   footer: '<a href="">Why do I have this issue?</a>'
        })
    }
    else{
        toggleButton.textContent = "On"
        document.images['music1'].src = 'images2/on_music.png';
    }

    // Gửi giá trị đến Firebase
    var firebaseRef = firebase.database().ref().child('Pillow/'+ PillowType +'/SoundOn');
    firebaseRef.set(value)
        .then(function () {
            console.log("Đã gửi giá trị thành công:", value);
        })
        .catch(function (error) {
            console.log("Lỗi khi gửi giá trị:", error);
        });
});

var getCurrentTemperature = firebase.database().ref().child('Pillow/SleepingPillow/BMP280/temp');
var getSettingTemperature = firebase.database().ref().child('Pillow/SleepingPillow/BMP280/tempSet');

getSettingTemperature.on('value', snap =>{
    TemperatureSet = snap.val();
    document.getElementById("i-temp-set").innerHTML = + snap.val() + " Celcius";
});

function setTemperatureIcon()
{
    if (TemperatureCurrent === 0)
    {
        console.log("No value");
        document.images['temperature-notification'].src = 'images2/normalTempIcon.jpg';
    }
    else if(TemperatureCurrent >= TemperatureSet) {
        console.log("Overheat!");
        document.images['temperature-notification'].src = 'images2/overheatIcon.jpg';
    }
    else if (TemperatureCurrent < 34) { 
        document.images['temperature-notification'].src = 'images2/coolTempIcon.jpg';
        console.log("Underheat");
    }
    else
    {
        console.log("Normal temperature");
        document.images['temperature-notification'].src = 'images2/normalTempIcon.jpg';
    }
}

getCurrentTemperature.on('value', snap => {
    TemperatureCurrent = snap.val();
    setTemperatureIcon();
    document.getElementById("i-temp-current").innerHTML = + snap.val() + " Celcius";
});

// Add click event listener to the button
toggleSettimeButton.addEventListener('click', function() {
  // Toggle the text between "morning" and "night"
    if (toggleSettimeButton.textContent === "Morning") {
        toggleSettimeButton.textContent = "Night";
        TimeStamp = "Night";
    } else {
        toggleSettimeButton.textContent = "Morning";
        TimeStamp = "Morning";
    }
});

toggleChangePillowButton.addEventListener('click', function() {
  // Toggle the text between "morning" and "night"
    if (toggleChangePillowButton.textContent === "For sitting") {
        toggleChangePillowButton.textContent = "For sleeping";
        PillowType = "SleepingPillow";
    } else {
        toggleChangePillowButton.textContent = "For sitting";
        PillowType = "SittingPillow";
    }
});

var settime = firebase.database().ref().child('Pillow/'+ PillowType +'/hour');
var settime2 = firebase.database().ref().child('Pillow/'+ PillowType +'/minute');
var settime3 = firebase.database().ref().child('Pillow/'+ PillowType +'/second');
var setNotificationTimeHour = firebase.database().ref().child('Pillow/TimeSet/'+TimeStamp+'/hour');
var setNotificationTimeMinute = firebase.database().ref().child('Pillow/TimeSet/'+TimeStamp+'/minute');

settime.on('value', snap => {
    document.getElementById("i-time-hour-remain").innerHTML = "Thời gian: " + snap.val() + " giờ";
});
settime2.on('value', snap => {
    document.getElementById("i-time-minute-remain").innerHTML = " : " + snap.val() + " phút";
});
settime3.on('value', snap => {
    document.getElementById("i-time-second-remain").innerHTML = " : " + snap.val() + " giây";
});

setNotificationTimeHour.on('value', snap => {
    document.getElementById("i-time-hour-notifi").innerHTML = "Thời gian: " + snap.val() + " giờ";
});

setNotificationTimeMinute.on('value', snap => {
    document.getElementById("i-time-minute-notifi").innerHTML = " : " + snap.val() + " phút";
});
