// service-worker.js

self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: data.icon || '/path/to/default/icon.png', // Opcional: ícone para a notificação
        badge: data.badge || '/path/to/default/badge.png' // Opcional: ícone para o badge
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
