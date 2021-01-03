window.onload = function () {
    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1655317630-OjZAWEoZ";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let myLiffId = "";

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function (reqResponse) {
                return reqResponse.json();
            })
            .then(function (jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function (error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();

    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
        window.location.href = "../../login.html";
    }
}

/**
* Display data generated by invoking LIFF methods
*/
function displayLiffData() {
    // document.getElementById('isInClient').textContent = liff.isInClient();
    // document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
    if (liff.isLoggedIn()) {
        liff.getProfile()
            .then(profile => {
                document.getElementById('lineusername').textContent = profile.displayName;
                document.getElementById('lineuserpict').src = profile.pictureUrl;
            })
            .catch((err) => {
                console.log('error', err);
            });
    }
}

/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
    } else {
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in an external browser.';
    }
}

function registerButtonHandlers() {
    document.getElementById('openWindowButton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://e-food-court.herokuapp.com', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });

    document.getElementById('closeWindowButton').addEventListener('click', function () {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });

    document.getElementById('liffLoginButton').addEventListener('click', function () {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });

    document.getElementById('liffLogoutButton').addEventListener('click', function () {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    document.getElementById('sendMessageButton').addEventListener('click', function () {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([{
                'type': 'text',
                'text': "Anda telah menggunakan fitur Send Message!"
            }]).then(function () {
                window.alert('Ini adalah pesan dari fitur Send Message');
            }).catch(function (error) {
                window.alert('Error sending message: ' + error);
            });
        }
    });

    // pesan makanan
    document.getElementById('pesan').addEventListener('click', function () {

        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            var totalmkn, totalmnm, totalHarga, makanan1, makanan2, makanan3, minuman1, minuman2, minuman3;
            totalmkn = $("#jmlmkn").html();
            totalmnm = $("#jmlmnm").html();
            totalHarga = $("#hargaTotal").html();
            makanan1 = $("#makanan1-ringkas").html();
            makanan2 = $("#makanan2-ringkas").html();
            makanan3 = $("#makanan3-ringkas").html();
            minuman1 = $("#minuman1-ringkas").html();
            minuman2 = $("#minuman2-ringkas").html();
            minuman3 = $("#minuman3-ringkas").html();

            liff.getProfile()
                .then(profile => {
                    liff.sendMessages([{
                        'type': 'text',
                        'text': `Halo ${profile.displayName}. Selamat datang di e-Food Court, \n\nTerima Kasih telah memesan makanan, \nberikut adalah pesanan anda : \n\n* ${makanan1} Nasi Goreng\n* ${makanan2} Salad Buah\n* ${makanan3} Pie Buah\n* ${minuman1} Jus Lemon\n* ${minuman2} Susu Vanilla\n* ${minuman3} Es Teh\n\nTotal Pesanan : ${totalmkn} Makanan ${totalmnm} Minuman\nTotal Pembayaran : Rp. ${totalHarga}\n\nPesanan anda akan segera diproses.\n\nMohon ditunggu ya!`
                    }]).then(function () {
                        window.alert("Pesanan telah terkirim!");
                    }).catch(function (error) {
                        window.alert("Error sending message : " + error);
                    });
                }).catch((err) => {
                    console.log(err);
                });
        }
    });
}

function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}

/**
* Toggle specified element
* @param {string} elementId The ID of the selected element
*/
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}

