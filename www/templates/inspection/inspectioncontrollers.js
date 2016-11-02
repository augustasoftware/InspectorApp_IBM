var db;
inspectionControllers
    .controller('inspection_listCtrl', function($scope, $ionicScrollDelegate, $stateParams, $state, $timeout, $ionicSlideBoxDelegate, inspectionServices) {
        $scope.init = function() {
            $scope.change_view1 = true;
            $scope.change_view2 = false;
            var count = 0;
            inspectionServices.get_inspection_list_json()
                .success(function(response) {
                    $scope.inspection_list = response;
                    $timeout(function() {
                        $ionicSlideBoxDelegate.update();
                    }, 500);
                });
        }
        $scope.$on('$ionicView.enter', function() {
            $scope.change_view1 = true;
            $scope.change_view2 = false;
            $scope.scrollchange = '';
        });

        $scope.slide_increment = function() {
            // count = count + 1;
            $ionicSlideBoxDelegate.next();
        }
        $scope.slideHasChanged = function(index) {
            count = index;
        };
        $scope.slide_decrement = function() {
            // count = count - 1;
            $ionicSlideBoxDelegate.previous();
        }
        $scope.changeview = function(data) {
            if (data == 'list') {
                $scope.shownGroup = null;
                $scope.scrollchange = '';
                $scope.change_view2 = false;
                $timeout(function() { $scope.change_view1 = true; }, 200)
            }
            if (data == 'map') {
                $scope.shownGroup = null;
                $scope.scrollchange = 'height:120px';
                $scope.change_view1 = false;
                $timeout(function() { $scope.change_view2 = true; }, 200)
            }
        }
        $scope.tim = function(group) {

            // $timeout(function(){ $scope.shownGroup = null;},5000)

        }
        $scope.toggleGroup = function(group, index) {

            if (index == 4) {
                console.log("hi");
                $timeout(function() {
                    $ionicScrollDelegate.scrollBottom();
                }, 300)

            }
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
                $scope.tim(group);

            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.goto_inspectionDetail = function(index) {
            $state.go('app.inspection_details', { id: index })
        }

        $scope.init();

    })


    .controller('inspection_detailsCtrl', function($scope, $stateParams, $state, inspectionServices, $rootScope, $cordovaSQLite) {
        
        $scope.create_table = function() {
            db = $cordovaSQLite.openDB({ name: "Inspector.db", location: 'default' });
            console.log(db);
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS InspectionList (id integer primary key AUTOINCREMENT, title text, description text,status text,parentid text )");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS IBMIncident (id integer primary key AUTOINCREMENT, title text, description text,severity text,firstid text, secondid text,image1 blob, image2 blob, image3 blob, image4 blob, image5 blob )");
            $scope.create_data();
        }

        $scope.create_data = function() {
            var query = "SELECT * FROM InspectionList WHERE parentid=?";
            $cordovaSQLite.execute(db, query, [$stateParams.id]).then(function(res) {
                if (res.rows.length > 0) {
                    $rootScope.findCount();
                } else {
                    $scope.remaining = 5;
                    $scope.completed = 0;
                    $scope.inci = 0;
                    // var tle = "Lorem Ipsum Dolor Sit Amet Consectetur Adipis";
                    var tle = [{
                        "id": "1",
                        "title": "At least 4 sales reps on the floor helping customers"
                    }, {
                        "id": "2",
                        "title": "Two Sales rep nearby the check out counter (in view of customers approaching )"
                    }, {
                        "id": "3",
                        "title": "Weekly sales items by the entrances"
                    }, {
                        "id": "4",
                        "title": "Customer bathrooms clean and maintained"
                    }, {
                        "id": "5",
                        "title": "Security personnel actively roaming on the floor"
                    }]


                    for (var i = 0; i <= 4; i++) {
                        var query = "INSERT INTO InspectionList (title, description, status, parentid) VALUES (?,?,?,?)";
                        $cordovaSQLite.execute(db, query, [tle[i].title, tle[i].title, "0", $stateParams.id]).then(function(res) {
                            console.log("insertId: " + res.insertId);
                        }, function(err) {
                            console.error(err);
                        });
                    }
                }
            }, function(err) {
                console.error(JSON.stringify(err));
            });
        }

        $rootScope.findCount = function() {
            var q1 = "SELECT * FROM InspectionList WHERE parentid=? AND status=?";
            var q2 = "SELECT * FROM IBMIncident WHERE firstid=?";
            $cordovaSQLite.execute(db, q1, [$stateParams.id, "0"]).then(function(res) {
                $scope.remaining = res.rows.length;
            }, function(err) {
                console.error(JSON.stringify(err));
            });
            $cordovaSQLite.execute(db, q1, [$stateParams.id, "1"]).then(function(res) {
                $scope.completed = res.rows.length;
            }, function(err) {
                console.error(JSON.stringify(err));
            });
            $cordovaSQLite.execute(db, q2, [$stateParams.id]).then(function(res) {
                $scope.inci = res.rows.length;
            }, function(err) {
                console.error(JSON.stringify(err));
            });
        }

        $scope.$on('$ionicView.enter', function() {
            $rootScope.findCount();
        });
        $scope.init = function() {
            $scope.create_table();
            inspectionServices.get_inspection_list_json()
                .success(function(response) {

                    for (var i = 0; i < response.length; i++) {
                        if ($stateParams.id === response[i].Id) {
                            $scope.inspection_detail = response[i];
                        }
                    }
                });

        }

        $scope.goto_checklist = function() {
            debugger;
            $state.go('app.inspection_checklist', { id: $stateParams.id, detailid: $stateParams.id })
        }
        $scope.init();
    })
    .controller('inspection_checklistCtrl', function($scope, $stateParams, inspectionServices, $cordovaSQLite, $ionicPlatform, $rootScope) {

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.clk = function(a) {
            switch (a) {
                case 'Begin':
                    $scope.btntxt = "Pause";
                    break;
                case 'Pause':
                    $scope.btntxt = "Continue";
                    break;
                case 'Continue':
                    $scope.btntxt = "Pause";
                    break;
                default:
                    break;
            }
        }

        $scope.changeID = function(a) {
            if (a == $scope.curId) {
                $scope.curId = null;
            } else {
                $scope.curId = a;
            }
        }

        $scope.change_status = function(a, b) {
            var update_query = "UPDATE InspectionList SET status = ? WHERE Id = ?";
            $cordovaSQLite.execute(db, update_query, [a, b]).then(function(res) {
                console.log("updateId: " + res);
            }, function(err) {
                console.error(JSON.stringify(err));
            });
        }

        $scope.init = function() {
            $scope.btntxt = "Begin";
        }

        $scope.backdta = function() {
            location.href = "#/app/inspection_list/" + $stateParams.id;
        }

        $scope.load_data = function() {
            $scope.incidents = [];
            $scope.inspection_checklist = [];
            $ionicPlatform.ready(function() {
                db = $cordovaSQLite.openDB({ name: "Inspector.db", location: 'default' });
                var q1 = "SELECT * FROM InspectionList WHERE parentid=?";
                $cordovaSQLite.execute(db, q1, [$stateParams.id]).then(function(res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.inspection_checklist.push(res.rows.item(i));
                            console.log($scope.inspection_checklist);
                        }
                    }
                }, function(err) {
                    console.error(JSON.stringify(err));
                });

                var query = "SELECT * FROM IBMIncident WHERE firstid=?";
                $cordovaSQLite.execute(db, query, [$stateParams.id]).then(function(res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            $scope.incidents.push(res.rows.item(i));
                            console.log($scope.incidents);
                        }
                    } else {
                        console.log("No results found");
                    }
                }, function(err) {
                    console.error(JSON.stringify(err));
                });
            });
            $scope.Parent_id = $stateParams.id;

            // inspectionServices.get_inspection_checklist_json()
            //     .success(function(response) {
            //          $scope.inspection_checklist = response;
            //     });
        }

        $scope.$on('$ionicView.enter', function() {
            $scope.load_data();
        });
        $scope.init();
    });
