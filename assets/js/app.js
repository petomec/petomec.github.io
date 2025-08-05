import { saveAction } from './db.js';

console.log('Petomec загружен');


if ('setAppBadge' in navigator) {
    navigator.setAppBadge(3); // Покажет 3 на иконке
}


document.getElementById('feedBtn').addEventListener('click', async () => {
    const action = {
        type: 'feed',
        timestamp: new Date().toISOString()
    };

    await saveAction(action);

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        const reg = await navigator.serviceWorker.ready;
        await reg.sync.register('sync-actions');
        console.log('Background sync registered');
    } else {
        console.log('SyncManager not supported, sending manually');
        sendActionsToServer(); // fallback
    }
});


document.getElementById('startBtn').addEventListener('click', () => {
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]); // 2 коротких вибрации с паузой
    } else {
        console.log('no vibrate');

    }


    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            new Notification("Petomec скучает по тебе 🐣", {
                body: "Погладь его или накорми!",
                icon: "/icons/icon-192.png"
            });
        }
    });
});



