inspectionControllers
    .controller('AppCtrl', function($scope,$state, $ionicModal, $timeout, $ionicHistory,$ionicPopup,$rootScope) {
    
    $scope.show_menu = function() {
        $scope.menumodal.show();
    }

    $ionicModal.fromTemplateUrl('templates/top_menu.html', {
        scope: $scope,
        animation: 'animated fadeInDown'
    }).then(function(menumodal) {
        $scope.menumodal = menumodal;
    });
    $scope.close_top_menu = function() {
        $scope.menumodal.hide();
    };
    $scope.top_menu = function() {
        $scope.menumodal.show();
    };
    
    $scope.logout=function(){
         $scope.menumodal.hide();
        // window.localStorage.start = undefined;
        localStorage.removeItem('start');
        localStorage.removeItem("phoneno");
        location.href="#/login"

    }

    $ionicModal.fromTemplateUrl('templates/bottom_menu.html', {
        scope: $scope
        
       
    }).then(function(bottom_menu) {
        $scope.bottom_menu = bottom_menu;
    });




    $scope.close_bottom_menu = function() {
        $scope.bottom_menu.hide();
    };

    $scope.bottom_menu1 = function() {
        $scope.bottom_menu.show();
    };



    $scope.goback = function() {
        debugger;
        $ionicHistory.goBack();
    }

    $scope.gotoreportbug = function() {
         $scope.bottom_menu.hide();
        $state.go('reportbug')
    }

  //$rootScope.$broadcast('showPopup();')


  $rootScope.phoneno=null;
  /// Popup For Phone No
  $scope.showPopup = function() {
  $scope.data = {};
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="phoneno" id="phoneNo" maxlength="13">',
    title: 'Enter Phone No',
    controller:'AppCtrl',
    subTitle: 'We are collecting your phone no for Twillo Sms,Please enter valid phone no !!',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(phoneno) {
            var phoneNo = document.getElementById("phoneNo").value;
           
            return phoneNo;          
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
     localStorage.setItem("phoneno", res);
  });

  //$timeout(function() {
   //  myPopup.close(); //close the popup after 3 seconds for some reason
  //}, 5000);
 };
    
 

});
