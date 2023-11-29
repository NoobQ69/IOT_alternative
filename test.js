
var submitButton = document.getElementById('submitButton');
var toggleSettimeButton = document.getElementById('toggle-settime-button');

// Add click event listener to the button
toggleSettimeButton.addEventListener('click', function() {
  // Toggle the text between "morning" and "night"
    if (toggleSettimeButton.textContent === 'Morning') {
        toggleSettimeButton.textContent = "Night";
    } else {
        toggleSettimeButton.textContent = "Morning";
    }
});

function isValidNumber(value) {
    return /^\d+$/.test(value);
}

submitButton.addEventListener('click', function () {
    var numberValue = inputNumber.value;
    if (numberValue > 23) {
        numberValue = 23;
        Swal.fire({
            icon: 'error',
            title: 'Cảnh báo.',
            text: 'Bạn chỉ có thể đặt tối đa là 24 giờ',
            //   footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    if (isValidNumber(numberValue)) {
        // Gửi dữ liệu lên Firebase
        // var firebaseRef = firebase.database().ref().child('input_pillow1/hour');
        // firebaseRef.set(numberValue)
        //     .then(function () {
        //         // Đặt lại giá trị của ô nhập liệu thành chuỗi rỗng
        //         inputNumber.value = "";
        //     })
        //     .catch(function (error) {
        //         console.log("Lỗi khi gửi dữ liệu:", error);
        //     });
    } else {
        console.log("Giá trị không hợp lệ");
    }
});

submitButton2.addEventListener('click', function () {
    var numberValue2 = inputNumber2.value;
    if (numberValue2 > 59) {
        numberValue2 = 59;
        Swal.fire({
            icon: 'error',
            title: 'Cảnh báo.',
            text: 'Bạn chỉ có thể đặt tối đa là 60 phút',
            //   footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    if (isValidNumber2(numberValue2)) {
        // Gửi dữ liệu lên Firebase
        // var firebaseRef = firebase.database().ref().child('input_pillow1/min');

        // firebaseRef.set(numberValue2)
        //     .then(function () {
        //         // Đặt lại giá trị của ô nhập liệu thành chuỗi rỗng
        //         inputNumber2.value = "";
        //     })
        //     .catch(function (error) {
        //         console.log("Lỗi khi gửi dữ liệu:", error);
        //     });
    } else {
        console.log("Giá trị không hợp lệ");
    }
});


toggleButton.addEventListener('click', function () {
    toggleButton.classList.toggle('on');
    toggleButton.classList.toggle('off');

    var value = toggleButton.classList.contains('on') ? '1' : '0';
    toggleButton.textContent = value === '1' ? 'On' : 'Off';
    if(value==0){
        document.images['music1'].src = 'images2/off_music.png';

        // Swal.fire({
        //     icon: 'error',
        //     title: 'CHÚ Ý',
        //     text: 'Khi bạn tắt âm thanh bạn sẽ không thể nghe được cảnh báo trên thiết bị',
        //     //   footer: '<a href="">Why do I have this issue?</a>'
        // })
    }
    else{
        document.images['music1'].src = 'images2/on_music.png';
    }

    // Gửi giá trị đến Firebase
    // var firebaseRef = firebase.database().ref().child('music/data');
    // firebaseRef.set(value)
    //     .then(function () {
    //         console.log("Đã gửi giá trị thành công:", value);
    //     })
    //     .catch(function (error) {
    //         console.log("Lỗi khi gửi giá trị:", error);
    //     });
});