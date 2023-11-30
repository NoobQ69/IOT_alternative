var pillowValues = []; // Mảng chứa các giá trị của pillow1 đến pillow6
var a = 0;
var PillowType = "SittingPillow";
var TimeStamp = "Morning";
var TemperatureSet = 38;
var TemperatureCurrent = 0;
// Time remain for pillow
var toggleButton = document.getElementById('toggleButton');
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

var timeSetup = {hour: 0, minute: 0, second: 0};
var timeNotificationMorning = {hour: 0, minute: 0, second: 0};
var timeNotificationNight = {hour: 0, minute: 0, second: 0};
var timeCurrent = {hour: 0, minute: 0, second: 0};
var IsOn = 0;


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

    if (IsOn === 0) {
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
        changeCircleColor("circle1", "#681dfd94");
        changeCircleColor("circle2", "#681dfd94");
        changeCircleColor("circle3", "#681dfd94");
        changeCircleColor("circle4", "#681dfd94");
        changeCircleColor("circle5", "#681dfd94");
        changeCircleColor("circle6", "#681dfd94");
            
    }
    if (a == 1) {
        document.getElementById("ghe2").innerHTML = "Phát hiện người ngồi";
        document.images['ghe'].src = 'images2/ngoi.png';
        changeCircleColor("circle1", "orange");
        changeCircleColor("circle2", "orange");
        changeCircleColor("circle3", "orange");
        changeCircleColor("circle4", "orange");
        changeCircleColor("circle5", "orange");
        changeCircleColor("circle6", "orange");
    }
}																		

function changeCircleColor(circleId, color) {
    var circle = document.getElementById(circleId);
    circle.style.backgroundColor = color;
}

function sendValueToFirebase(value, pathToSend)
{
    var firebaseRef = firebase.database().ref().child(pathToSend);
    firebaseRef.set(value)
    .then(function () {
        console.log("Send successfully:");
    })
    .catch(function (error) {
        console.log("Lỗi khi gửi dữ liệu:", error);
    });
}

function handleSubmitTime(getValue, format, pathToSend)
{
    var numberValue = getValue.value;
    if (numberValue > format) {
        numberValue = format;
        var alertText = "";
        if (format > 24)
        {
            alertText = "Phút và giây không lớn hơn 59!";
        }
        else 
        {
            alertText = 'Bạn chỉ có thể đặt tối đa là 24 giờ!';
        }
        Swal.fire({
            icon: 'error',
            title: 'Cảnh báo.',
            text: alertText,
            //   footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    if (isValidNumber(numberValue)) {
        // Gửi dữ liệu lên Firebase
        sendValueToFirebase(numberValue, pathToSend);
        getValue.value = "";
    } 
    else {
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
        sendValueToFirebase(numberValue, pathToSend);
        getValue.value = "";
    }
    else {
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
    isSent = 1;
    handleSubmitTime(inputOnTimeNumber, 23, 'Pillow/TimeSet/'+ TimeStamp +'/hour');
});
submitButtonOnTimeMinute.addEventListener('click', function () {
    isSent = 1;
    handleSubmitTime(inputOnTimeNumber2, 59, 'Pillow/TimeSet/'+ TimeStamp +'/minute');
});
submitButtonOnTimeSecond.addEventListener('click', function () {
    isSent = 1;
    handleSubmitTime(inputOnTimeNumber3, 59, 'Pillow/TimeSet/'+ TimeStamp +'/second');
});

submitTempSet.addEventListener('click', () =>{
    handleSubmitTemperature(inputTemperatureSet, 'Pillow/SleepingPillow/BMP280/tempSet');
    setTemperatureIcon();
});

toggleButton.addEventListener('click', function () {
    toggleButton.classList.toggle('on');
    toggleButton.classList.toggle('off');
    var value = toggleButton.classList.contains('on') ? 1 : 0;
    
    if(toggleButton.textContent === "On") {
        console.log("Off");
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
        console.log("On");
        toggleButton.textContent = "On"
        document.images['music1'].src = 'images2/on_music.png';
    }

    // Gửi giá trị đến Firebase
    var firebaseRef = firebase.database().ref().child('Pillow/'+ PillowType +'/SoundOn');
    firebaseRef.set(parseInt(value))
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

var settime = firebase.database().ref('Pillow/SittingPillow/hour');
var settime2 = firebase.database().ref().child('Pillow/SittingPillow/minute');
var settime3 = firebase.database().ref().child('Pillow/SittingPillow/second');
var setOntime = firebase.database().ref().child('Pillow/SleepingPillow/hour');
var setOntime2 = firebase.database().ref().child('Pillow/SleepingPillow/minute');
var setOntime3 = firebase.database().ref().child('Pillow/SleepingPillow/second');
var setNotificationTimeHour = firebase.database().ref().child('Pillow/TimeSet/Morning/hour');
var setNotificationTimeMinute = firebase.database().ref().child('Pillow/TimeSet/Morning/minute');
var setNotificationTimeHour2 = firebase.database().ref().child('Pillow/TimeSet/Night/hour');
var setNotificationTimeMinute2 = firebase.database().ref().child('Pillow/TimeSet/Night/minute');

settime.on('value', snap => {
    timeSetup.hour = parseInt(snap.val());
    document.getElementById("i-time-hour-remain").innerHTML = "Thời gian: " + snap.val() + " giờ";
});
settime2.on('value', snap => {
    timeSetup.minute = parseInt(snap.val());
    document.getElementById("i-time-minute-remain").innerHTML = " : " + snap.val() + " phút";
});
settime3.on('value', snap => {
    timeSetup.second = parseInt(snap.val());
    document.getElementById("i-time-second-remain").innerHTML = " : " + snap.val() + " giây";
});

setOntime.on('value', snap => {
    timeSetup.hour = parseInt(snap.val());
    document.getElementById("i-time-hour-remain").innerHTML = "Thời gian: " + snap.val() + " giờ";
});
setOntime2.on('value', snap => {
    timeSetup.minute = parseInt(snap.val());
    document.getElementById("i-time-minute-remain").innerHTML = " : " + snap.val() + " phút";
});
setOntime3.on('value', snap => {
    timeSetup.minute = parseInt(snap.val());
    document.getElementById("i-time-second-remain").innerHTML = " : " + snap.val() + " giây";
});

setNotificationTimeHour.on('value', snap => {
    timeNotificationMorning.hour = parseInt(snap.val());
    document.getElementById("i-time-hour-notifi").innerHTML = "Thời gian: " + snap.val() + " giờ";
});
setNotificationTimeMinute.on('value', snap => {
    timeNotificationMorning.minute = parseInt(snap.val());
    document.getElementById("i-time-minute-notifi").innerHTML = " : " + snap.val() + " phút";
});
setNotificationTimeHour2.on('value', snap => {
    timeNotificationNight.hour = parseInt(snap.val());
    document.getElementById("i-time-hour-notifi").innerHTML = "Thời gian: " + snap.val() + " giờ";
});
setNotificationTimeMinute2.on('value', snap => {
    timeNotificationNight.minute = parseInt(snap.val());
    document.getElementById("i-time-minute-notifi").innerHTML = " : " + snap.val() + " phút";
});

var isSomeoneSittingOn = firebase.database().ref().child('Pillow/'+ PillowType +'/IsOn');
function resetCurrentTime()
{
    timeCurrent.hour = 0;
    timeCurrent.minute = 0;
    timeCurrent.second = 0;
}

function printCountingTimeFunc()
{
    console.log(timeCurrent.hour);
    console.log(timeCurrent.minute);
    console.log(timeCurrent.second);
}
// Update the count down every 1 second
function countingTime() {
    if (timeCurrent.hour === timeSetup.hour && timeCurrent.minute === timeSetup.minute && timeCurrent.second === timeSetup.second)
    {
        sendValueToFirebase(1, 'Pillow/'+ PillowType +'/Warning');
        clearInterval(count);
    }
    else
    {
        printCountingTimeFunc();

        timeCurrent.second += 1;
        if (timeCurrent.second > 59)
        {
            timeCurrent.second = 0;
            timeCurrent.minute++;
            if (timeCurrent.minute > 59)
            {
                timeCurrent.minute = 0;
                timeCurrent.hour++;
            }
        }
    }
    var printCountingTime = document.getElementById("i-time-counting-value");
    var printCountingTimeBuffer = "";
    if (timeCurrent.hour > 0) {
        printCountingTimeBuffer += timeCurrent.hour + " h"; 
    }
    printCountingTimeBuffer += timeCurrent.minute + " m " + timeCurrent.second +" s";
    printCountingTime.innerHTML = printCountingTimeBuffer;
}

var count = setInterval(countingTime, 1000);

isSomeoneSittingOn.on('value', snap => {
    if (snap.val() === 0)
    {
        IsOn = 0;
        resetCurrentTime();
        clearInterval(count);
        sendValueToFirebase(0, 'Pillow/'+ PillowType +'/Warning');
        checkPillowValues();
    }
    else if (snap.val() === 1)
    {
        IsOn = 1;
        count = setInterval(countingTime, 1000);
        checkPillowValues();
    }
});

var isSent = 1;

var x = setInterval(function() {
  // Get today's date and time
    var now = new Date();

    var seconds = now.getSeconds();
    var minutes = now.getMinutes();
    var hours = now.getHours();

    if (timeNotificationMorning.hour === hours && timeNotificationMorning.minute === minutes) {
        
        if (isSent === 1) {
            isSent = 0;
            sendValueToFirebase(1, 'Pillow/'+ PillowType +'/Notify');
        }
    }
    else if (timeNotificationNight.hour === hours && timeNotificationNight.minute === minutes) {
        if (isSent === 1){
            isSent = 0;
            sendValueToFirebase(2, 'Pillow/'+ PillowType +'/Notify');
        }
    }
    else
    {
        isSent = 1;
    }
}, 1000);
