var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BJIy06hoPv8yITfSyFtpapPpuzBK0T6dU4FnqQMIilyPp56acp8s3Zh7tr4i-tShcwFJVvFcVd3S7SHyHn-hvQw",
    "privateKey": "Bm96E7ZngMpnDFWhcvtoyRVJi3JdBlMRrjAI__VcNvM"
};
 
 
webPush.setVapidDetails(
    'mailto:firlisubhi12@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/cLZV75p2ErY:APA91bEa61xOECNRmVOV-CHvPJaoA_XevZr7rXW2TUajIACZCotkVMYK3rvV5_MYzkg706Yv4udBUOAZB48ksWh6TqVyGXM7NHJcjUMqvIVB3xGb4pSORflNqs7SYWSgOasgYt12_zUK",
    "keys": {
        "p256dh": "BNjjO2ErM9d4dCY5/RQQfmgYqLfN+wl5jq37UxhBh9nbcChMg1b2M1sb6d4aMVzK3nmTPtD7DoyyyRquC5/jE7I=",
        "auth": "Ncf5MCiu6lQb3zqpwxR4mw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '540043360209',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);