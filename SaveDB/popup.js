document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveQueryButton');
  const queryInput = document.getElementById('queryInput');
  const queryList = document.getElementById('queryList');

  // Load saved queries on popup open
  loadQueries();

  // Save query button click event
  saveButton.addEventListener('click', function () {
    const query = queryInput.value.trim();
    if (query) {
      saveQuery(query);
      queryInput.value = '';
    }
  });

  // Load queries from storage and display them
  function loadQueries() {
    chrome.storage.local.get(['queries'], function (result) {
      const queries = result.queries || [];
      queryList.innerHTML = '';
      queries.forEach(query => {
        const li = document.createElement('li');
        li.textContent = query;
        queryList.appendChild(li);
      });
    });
  }

  // Save query to storage
  function saveQuery(query) {
    chrome.storage.local.get(['queries'], function (result) {
      const queries = result.queries || [];
      queries.push(query);
      chrome.storage.local.set({ queries: queries }, function () {
        loadQueries();
      });
    });
  }
});
