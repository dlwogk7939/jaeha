document.addEventListener('DOMContentLoaded', function() {
    const notificationBell = document.getElementById('notificationBell');
    const notificationDropdown = document.querySelector('.notifications-dropdown');
    const notificationItems = document.querySelectorAll('.notifications-dropdown .dropdown-item');

    notificationBell.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle dropdown visibility
        notificationDropdown.classList.toggle('show');

        const unreadNotifications = Array.from(notificationItems)
            .filter(item => item.classList.contains('unread'))
            .map(item => item.dataset.notificationId);

        if (unreadNotifications.length > 0) {
            try {
                const response = await fetch('/mark-notifications-read', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ notificationIds: unreadNotifications }),
                });

                if (response.ok) {
                    // Update UI to reflect read status
                    unreadNotifications.forEach(id => {
                        const item = document.querySelector(`.dropdown-item[data-notification-id="${id}"]`);
                        if (item) {
                            item.classList.remove('unread');
                            item.classList.add('read');
                        }
                    });

                    // Remove the red dot
                    const redDot = notificationBell.querySelector('.bg-danger');
                    if (redDot) {
                        redDot.remove();
                    }
                }
            } catch (error) {
                console.error('Error marking notifications as read:', error);
            }
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationBell.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
    });
});
