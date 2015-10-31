function boostrapChatterApp() {

  var tableParentElement = $('.PTChildPivotTable');

  //Bootstrap if not already
  if (!(tableParentElement.attr('bi-chatter-table'))) {

    console.log('New - Attempt to attach angular to View');
    var tableParentElement = $('.PTChildPivotTable');
    tableParentElement.attr('ng-controller', 'MainController as chatter');
    //attach chatter directive - this will make angular loop through table child elements and attach further directives before compile
    tableParentElement.attr('bi-chatter-table', 'true');
    angular.bootstrap($('.PTChildPivotTable')[0], ['biChatter']);
    console.log('Angular Bootstraped!!!');


  }


  document.onload = function () {
    console.log("Document Loaded!!!");
  };

}


function observeChatterSensitiveDOMChanges() {


  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//In Analysis Mode
  var targetElementArray = $(document).find('div[id^=tableView]');

//In Dashboard Mode
  if (targetElementArray.length < 1) {
    targetElementArray = $(document).find('td[id*=tableView]');
  }

  if (targetElementArray.length < 1) {
    targetElementArray = $('.ViewContainer');
  }

//TODO Fix this to handle all tables
  var list = targetElementArray[0];

  console.log(list);

  var observer = new MutationObserver(function (mutations) {
    //mutations.forEach(function(mutation) {
    //  console.log(mutation.type);
    //});

    //TODO Finetune performance - to handle only specific DOM mutations
    if (!(angular.element($('.PTChildPivotTable')).scope())) {
      boostrapChatterApp();

    }

  });

  observer.observe(list, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });


}


//Todo Wrap it in a function to avoid polluting global namespace

