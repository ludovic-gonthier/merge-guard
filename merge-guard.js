(function () {
  var REGEX = {
    commit: /^(fixup|squash|wip|tmp)!/,
    label: /wip/i,
  };

  var observer;
  var config = {
    childList: true,
    subtree: true,
  };

  // Do nothing if not on pull-request page
  if (!document.getElementById('partial-pull-merging')) {
    return;
  }

  function refresh() {
    var button = document.querySelectorAll('.btn-group-merge button[type=submit]')[0];
    var commits = document.querySelectorAll('.commit-message .message');
    var disable = false;
    var labels = document.querySelectorAll('.sidebar-labels .labels .label');

    disable = []
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

  refresh();

  observer = new MutationObserver(refresh);
  observer.observe(document.getElementById('js-repo-pjax-container'), config);

  console.info('Merge Guard loaded');
})();
