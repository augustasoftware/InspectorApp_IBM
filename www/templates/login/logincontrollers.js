inspectionControllers
    .controller('loginCtrl', function($scope, $ionicPopup, $stateParams, $timeout, $state, $rootScope) {
        debugger;
        $scope.login_data = {};
        // $scope.login_data.Email = 'admin';
        // $scope.login_data.Password = 'admin';
        $scope.get_login = function(b) {
            if (b.Email == 'admin' && b.Password == 'admin') {
                debugger;
                $scope.show_loading = true;
                $timeout(function() {
                    $state.go('app.inspection_list');
                    window.localStorage.start = "hi";
                    $scope.show_loading = false;
                    $scope.showPopup();
                    //$scope.$on.showPopup();
                }, 1000);
            } else {
                $ionicPopup.alert({
                    title: 'Alert',
                    template: 'Invalid Username Or Password'
                });

            }

        };

        $rootScope.phoneno = null;
        /// Popup For Phone No
        $scope.showPopup = function() {
            $scope.data = {};
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="phoneno" id="phoneNo" maxlength="13">',
                title: 'Enter Phone No.',
                controller: 'AppCtrl',
                subTitle: 'We are collecting your phone no for Twillo Sms,Please enter valid phone no !!',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' }, {
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
