var db;
inspectionControllers
    .controller('addincidentCtrl', function($scope, $stateParams, $ionicActionSheet, $ionicLoading, $cordovaCamera, $ionicPopup, $cordovaSQLite, $cordovaFile, $cordovaImagePicker,$ionicHistory,$ionicModal,addincidentService) {
       
        var recognition = null;


        $scope.init = function() {
            $scope.stat = "";
            $scope.rpt = [];
            $scope.picData = [];
            // $scope.images = [];
            $scope.image1 = "";
            $scope.image2 = "";
            $scope.image3 = "";
            $scope.image4 = "";
            $scope.image5 = "";
           // db = $cordovaSQLite.openDB({ name: "Inspector.db", location: 'default' });
            // console.log(db);
            
        }

        $scope.execute = function() {
            var query = "INSERT INTO IBMIncident (title, description, severity, firstid, secondid,image1,image2,image3,image4,image5) VALUES (?,?,?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [$scope.rpt.title, $scope.recognizedText, $scope.stat, $stateParams.pid, $stateParams.id, $scope.image1, $scope.image2, $scope.image3, $scope.image4, $scope.image5]).then(function(res) {
                // console.log("insertId: " + res.insertId);
                $scope.post_report();
            }, function(err) {
                // console.error(err);
            });
        };

        $scope.assignimage = function() {
            debugger;
            var phoneValid = localStorage.getItem("phoneno");
             
             if (($scope.picData.length > 0) && (phoneValid)) {    
                 angular.forEach($scope.picData, function(value, key) {
                    if (key == 0) {
                        $scope.image1 = value;//dataURItoBlob(value);
                    } else if (key == 1) {
                        $scope.image2 = value;//dataURItoBlob(value);
                    } else if (key == 2) {
                        $scope.image3 = value;//dataURItoBlob(value);
                    } else if (key == 3) {
                        $scope.image4 = value;//dataURItoBlob(value);
                    } else if (key == 4) {
                        $scope.image5 = value;//dataURItoBlob(value);
                    }

                    if ($scope.picData.length - 1 == key) {
                        $scope.execute();
                    }
                }) 

                $scope.smssend();
             }
             else{
                debugger;
                var alertPopup = $ionicPopup.alert({
                title: 'alert',
                template: '1.Please Add phoneNo in Main Menu 2.Please add atleast one inicident Snap !!'
            });
            alertPopup.then(function(res) {
                // location.href="#/app/inspection_list";
                //$ionicHistory.goBack();
            });
             }
           
           
        }

        $scope.gobackinci = function() {
        
        $ionicHistory.goBack();
        }

        $scope.stateChange = function(a) {
            $scope.stat = a;
        }

        $scope.post_report = function() {
            $scope.rpt = [];
            $scope.picData = [];
            $scope.stat = "";
            $scope.images = [];
            $scope.image1 = "";
            $scope.image2 = "";
            $scope.image3 = "";
            $scope.image4 = "";
            $scope.image5 = "";
            var alertPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Incident has been Saved successfully.'
            });
            alertPopup.then(function(res) {
                // location.href="#/app/inspection_list";
                $ionicHistory.goBack();
            });

        }

        $scope.showit = function() {
            if ($scope.picData.length <= 5) {
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
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Warning',
                    template: 'Your cannot add more than 5 images.'
                });
            }
        }

        $scope.removeItem = function(a) {
            $scope.picData.splice(a, 1);
        }
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
                // $scope.blobfunction($scope.imgURI);
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
                // $scope.blobfunction($scope.imgURI);                
            }, function(err) {});
        }


        $scope.SavePicture = function(imageData) {
            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
                createFileEntry(fileURI);
            }

            function createFileEntry(fileURI) {
                window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
            }

            // 5
            function copyFile(fileEntry) {
                var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                var newName = makeid() + name;
                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                        fileEntry.copyTo(
                            fileSystem2,
                            newName,
                            onCopySuccess,
                            fail
                        );
                    },
                    fail);
            }

            function onCopySuccess(entry) {
                $scope.$apply(function() {
                    $scope.images.push(entry.nativeURL);
                });
            }

            function fail(error) {
                // console.log("fail: " + error);
            }

            function makeid() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }
        }

        function dataURItoBlob(dataURI, callback) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            // var bb = new BlobBuilder();
            // bb.append(ab);
            var blob = new Blob([ab]);
            // console.log(blob);
            return blob;
        }


    $ionicModal.fromTemplateUrl('templates/speech_menu.html', {
    scope: $scope
    }).then(function(check) {
        $scope.check = check;
    });

    $scope.close_speech_menu = function() {
     if (null!=recognition) {
      recognition.stop();
      //recognition == null;
  }
    $scope.check.hide();
    };

   
    $scope.speech_menu = function() {
    debugger;
    $scope.check.show();
    $scope.Speech();
    };

    $scope.data = {speechText: ''};
    $scope.recognizedText = '';

    $scope.Speech = function()
    {
    //    if (null==recognition) {
    //      recognition = new SpeechRecognition();
    //  }
    //             recognition.onresult = function(event) {
    //                 if (event.results.length > 0) {
    //                     $scope.recognizedText = event.results[0][0].transcript;
    //                     $scope.$apply()
    //                 }
    //             };

    // recognition.lang = "en-US";
    //             recognition.start();
                WatsonSDK.SpeechToText.recognize(function(data){
                // data
                if(data.iscompleted === WatsonSDK.Constants.YES) {
                    // connection closed, ready for another round of speech recognition
                    return;
                }

                if(data.isfinal === WatsonSDK.Constants.YES) {
                    // last transcript is returned
                }
                // evaluate the transcription
                $scope.recognizedText = data.message;
                $scope.$apply();
                //console.log(data.message);
                alert(data.message);
            }, function(error){
               // alert(data.message);
                // error
            });
     }

   
             
              $scope.speakText = function() {
                TTS.speak({
                       text: $scope.data.speechText,
                       locale: 'en-GB',
                       rate: 1.5
                   }, function () {
                       // Do Something after success
                   }, function (reason) {
                       // Handle the error case
                   });
              };
     


    $scope.smssend = function(){
        debugger;
        var phoneParams = localStorage.getItem("phoneno");
    var model = 
    {
        "title":$scope.message = $scope.rpt.title,
        "phoneno": $scope.phoneno= phoneParams,
    }
      addincidentService.sendsmsurl(model).then(function(responce){
        debugger;
      $scope.data = responce;
      });
    }  

    $scope.init();

    });


    inspectionControllers.service('addincidentService', function($http) {
    
    return {

        sendsmsurl:sendsmsurl
      }
      function sendsmsurl (model)

      {
            return $http.get('http://inspectorapp.mybluemix.net/message/' + '+1' + model.phoneno +'/From Isnpector Application : Successfully updated new incident with title of :'+ model.title  );
      }

          
    })