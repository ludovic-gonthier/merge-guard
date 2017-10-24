(function () {
  var REGEX = {
    commit: /^(fixup|squash|wip|tmp)!/,
    label: /wip/i,
  };
  var REFRESH_INTERVAL = 1000;

  // Exit if the merge button is not found
  if (!document.querySelectorAll('.btn-group-merge button[type=submit]')[0]) {
    return;
  }

  function refresh() {
    var button = document.querySelectorAll('.btn-group-merge button[type=submit]')[0];
    var commits = document.querySelectorAll('.commit-message .message');
    var labels = document.querySelectorAll('.sidebar-labels .labels .label');
    var disable = []
      .concat(Array.prototype.filter.call(commits, function (commit) {
        return REGEX.commit.test(commit.innerHTML);
      }))
      .concat(Array.prototype.filter.call(labels, function(label) {
        return REGEX.label.test(label.innerHTML);
      }));

    if (button.classList.contains('btn-primary')) {
      if (disable.length) {
        button.innerHTML = 'WIP/fixup! Can\'t merge pull request';
        button.setAttribute('disabled', 'disabled');
      } else {
        button.innerHTML = 'Merge pull request';
        button.removeAttribute('disabled');
      }
    }
  }

  // Do nothing if not on pull-request page
  if (!document.getElementById('partial-pull-merging')) {
    return;
  }

  refresh();

  // refresh every seconds
  setInterval(refresh, REFRESH_INTERVAL);

  console.info('Merge Guard loaded');
})();
