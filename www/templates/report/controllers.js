    inspectionControllers
        .controller('reportCtrl', function($scope, $stateParams) {
            $scope.init = function() {
                $scope.rtab = "none";
                $scope.labels = ["In Progress", "Completed", "Not Started", "Suspended"];
                $scope.data = [100, 100, 100, 0];
                $scope.colours = ['#77BD52', '#4E5BBF', '#C27547', '#F2F2F2'];

                $scope.labels3 = ['Jack Carlson', 'Pamela Wills', 'Lisa Simpson', 'Anna Gordon'];
                $scope.series = ['Series A'];
                $scope.colours3 = [{
                    fillColor: "#E8A471",
                    strokeColor: "#E8A471"
                }];
                $scope.data3 = [
                    [5, 3, 4, 6]
                ];

                // $scope.colours2 = [{                
                //     strokeColor: ['#94A8CC', '#B1FF91', '#535353', '#CEA078']
                // }];
                $scope.colours2 = ['#94A8CC', '#B1FF91', '#535353', '#CEA078'];
                $scope.labels2 = ["2-Jul", "4-Jul", "6-Jul"];
                $scope.series2 = ['Jack Carlson', 'Pamela Willis', 'Lisa Simpson', 'Anna Gordon'];
                $scope.data2 = [
                    [6, 10, 8],
                    [8, 10, 6],
                    [8, 9, 10],
                    [7, 6, 8]
                ];



                $scope.myChartObject = {};

                $scope.myChartObject.type = "ColumnChart";

                $scope.onions = [
                    { v: "Onions" },
                    { v: 3 },
                ];

                $scope.myChartObject.data = [
                    ['Genre', 'Inspection', 'Inspection', { role: 'annotation'}],
                    ['', 3, 5, 'Jack Carlson'],
                    ['', 2.5, 3.5, 'Pamela Willis'],
                    ['', 3, 4, 'Lisa Simpson'],
                    ['', 5.5, 7, 'Anna Gordon']
                ]

                $scope.myChartObject.options = {
                    // 'title': 'How Much Pizza I Ate Last Night',
                    "isStacked": true,
                    "legend": { position: 'none', maxLines: 3 },
                    "bar": { groupWidth: '75%' },
                    "colors": ['#E8A471', '#9AC1EC'],
                    "annotations": {
                        alwaysOutside: 'false',
                        textStyle: {
                            color: 'black', // The color of the text.
                            auraColor: 'transparent', // The color of the text outline.
                            // -ms - transform: rotate(20 deg), /* IE 9 */ 
                            // - webkit - transform: rotate(20 deg), /* Safari */
                            // transform: 'rotate(20 deg)' /* Standard syntax */
                        }
                    }
                };
            }

            $scope.Changetab = function(a) {
                $scope.rtab = a;
            }

            $scope.init();
        })

    .controller('reportbugCtrl', function($scope, $stateParams, $ionicActionSheet, $ionicLoading, $cordovaCamera, $ionicPopup) {
        $scope.init = function() {
            $scope.stat = "";
            $scope.rpt = [];
            $scope.picData = [];
        };

        $scope.stateChange = function(a) {
            $scope.stat = a;
        };

        $scope.post_report = function() {
            $scope.rpt = [];
            $scope.picData = [];
            $scope.stat = "";
            var alertPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Your Problem has been reported successfully.'
            });
            alertPopup.then(function(res) {
                location.href = "#/app/inspection_list";
            });

        };

        $scope.showit = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: ' <b>Camera</b>'
                }, {
                    text: '<b>Photos</b>'
                }],
                titleText: 'Upload From',
                cancelText: 'Cancel',
                cancel: function() {},
                buttonClicked: function(index) {
                    if (index == 0) {
                        $scope.takePic();
                        return true;
                    } else {
                        $scope.selectgalary();
                        return true;
                    }
                }
            });
        };

        $scope.removeItem = function(a) {
            $scope.picData.splice(a, 1);
        };
        $scope.takePic = function() {
            var options = {
                quality: 90,
                destinationType: Camera.DestinationType.DATA_URL, //DATA_URL
                sourceType: Camera.PictureSourceType.CAMERA, //CAMERA
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = imageData;
                $scope.picData.push("data:image/jpeg;base64," + imageData);
                // $scope.newuplod.push("data:image/jpeg;base64," + imageData);
            }, function(err) {});
        }

        $scope.selectgalary = function() {
            var options = {
                quality: 90,
                destinationType: Camera.DestinationType.DATA_URL, //DATA_URL
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //CAMERA
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = imageData;
                $scope.picData.push("data:image/jpeg;base64," + imageData);
                // $scope.newuplod.push("data:image/jpeg;base64," + imageData);
            }, function(err) {});
        }


        $scope.init();
    });
