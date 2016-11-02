    inspectionControllers
        .controller('speechCtrl', function($scope, $stateParams) {

			
			$scope.data = {
				speechText: ''
			  };
			  $scope.recognizedText = '';
			 
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
			 
			  $scope.record = function() {
				var recognition = new SpeechRecognition();
				recognition.onresult = function(event) {
					if (event.results.length > 0) {
						$scope.recognizedText = event.results[0][0].transcript;
						$scope.$apply()
					}
				};
				recognition.start();
			  };
		 
        })


         

     inspectionControllers
        .factory('speechfcrty', function($scope, $stateParams) {
        var service = {};

      service.record = function () 
        {
        	var recognition = new SpeechRecognition();
				recognition.onresult = function(event) {
					if (event.results.length > 0) {
						$scope.recognizedText = event.results[0][0].transcript;
						$scope.$apply()
					}
				};
				recognition.start();
            
        };

     service.speakText = function () 
        {
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

        return service;
    })