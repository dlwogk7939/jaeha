document.getElementById('practiceButton').addEventListener('click', function() {
    fetch('game/' + gameName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.text();
    })
    .then(data => {
        // Render game HTML
        document.open();
        document.write(data);
        document.close();
    })
    .catch(error => {
      document.getElementById('practiceContainerMessage').textContent = error.error || 'An error occurred. Please try again.';
      document.getElementById('practiceContainer').style.display = 'block';
      document.getElementById('playContainer').style.display = 'none';
      document.getElementById('playResultContainer').style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('playButton');
  const playContainer = document.getElementById('playContainer');
  const practiceContainer = document.getElementById('practiceContainer');
  const leaderboardSelect = document.getElementById('leaderboardSelect');
  const coinCost = document.getElementById('coinCost');
  const playForm = document.getElementById('playForm');
  const playResultContainer = document.getElementById('playResultContainer');
  const playResultContainerMessage = document.getElementById('playResultContainerMessage');

  playButton.addEventListener('click', function() {
      practiceContainer.style.display = 'none';
      playContainer.style.display = 'block';
      playResultContainer.style.display = 'none';
  });

  leaderboardSelect.addEventListener('change', function() {
      if (this.value === 'Global') {
          coinCost.textContent = entryFee;
      } else {
          coinCost.textContent = '0';
      }
  });

  playForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(playForm);
      const leaderboardData = Object.fromEntries(formData.entries());

      fetch('/leaderboard-play/' + gameName, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leaderboardData),
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then(err => { throw err; });
          }
          return response.text();
      })
      .then(data => {
          // Render game HTML
          document.open();
          document.write(data);
          document.close();
      })
      .catch(error => {
          playResultContainerMessage.textContent = error.error || 'An error occurred. Please try again.';
          practiceContainer.style.display = 'none';
          playContainer.style.display = 'none';
          playResultContainer.style.display = 'block';
      });
  });

});

function closeResultContainer() {
  document.getElementById('practiceContainer').style.display = 'none';
  document.getElementById('playContainer').style.display = 'none';
  document.getElementById('playResultContainer').style.display = 'none';
}