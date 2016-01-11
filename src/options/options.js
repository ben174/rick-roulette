// Saves options to chrome.storage
function save_options() {
  var chambers = document.getElementById('chambers').value;
  var override = !document.getElementById('default').checked;
  chrome.storage.sync.set({
    chambers: chambers,
    override: override
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    chambers: '6',
    override: false
  }, function(items) {
    document.getElementById('chambers').value = items.chambers;
    document.getElementById('default').checked = !items.override;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
