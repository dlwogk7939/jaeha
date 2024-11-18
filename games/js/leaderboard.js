document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const tables = document.querySelectorAll('.leaderboard-table');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        tables.forEach(table => table.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        });
    });
});