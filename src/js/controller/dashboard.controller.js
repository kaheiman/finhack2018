app.controller(
    "dashboardController",
    [
        "$scope",
        "commonService",
        "$window",
        "$mdDialog",
        "$interval",
        function ($scope, commonService, $window, $mdDialog, $interval) {
            var token = $window.localStorage.getItem("token");

            // active();
            var vm = $scope;
            vm.imagePath = '../../img/banana.jpg';
            vm.imagePath1 = '../../img/apple.jpg';
            vm.imagePath2 = '../../img/milk.jpeg';
            vm.imagePath3 = '../../img/pear.png';
            vm.imagePath4 = '../../img/cabbge.jpg';
            vm.imagePath5 = '../../img/carrot.jpg';
            vm.imagePath6 = '../../img/orange_juice.jpeg';
            vm.imagePath7 = '../../img/broccoli.jpg';
            vm.imagePath8 = '../../img/watermelon.jpg';
            vm.background = '../../img/src2.png';

            vm.myad1 = '../../img/logo1.jpg';
            vm.crop = '../../img/crop.png';

            vm.logo1 = '../../img/btn1.1.png';
            vm.logo0 = '../../img/btn1.png';

            vm.speech = '../../img/speech.png';
            vm.speech2 = '../../img/park.png';
            vm.speech3 = '../../img/bike1.png';
            vm.speech4 = '../../img/swim1.png';
            vm.speech5 = '../../img/swim2.png';
            vm.speech6 = '../../img/meal.png';
            vm.recom = '../../img/recommendation.png';
            vm.shadow = '../../img/shadow.png';

            vm.finhack2 = false
            vm.finhack3 = false
            vm.finhack4 = false
            vm.finhack5 = false
            vm.fadeOut = false
            vm.motion = false


            
            vm.logo3 = '../../img/passage.png';
            vm.logo4 = '../../img/fire.png';

            vm.a = '../../img/fin3.png';
            vm.aa = '../../img/aa.png';

            vm.b = '../../img/fin1.png';
            vm.bb = '../../img/bb.png';

            vm.c = '../../img/fin2.png';
            vm.cc = '../../img/cc.png';

            vm.d = '../../img/fin5.png';
            vm.dd = '../../img/dd.png';

            vm.e = '../../img/finhack3.png';
            vm.ee = '../../img/ee.png';

            vm.f = '../../img/finhack4.png';
            vm.ff = '../../img/ff.png';

            vm.g = '../../img/finhack5.png';
            vm.gg = '../../img/gg.png';

            vm.h = '../../img/finhack6.png';
            vm.hh = '../../img/hh.png';

            vm.i = '../../img/finhack7.png';
            vm.ii = '../../img/ii.png';

            vm.j = '../../img/deal.png';
            vm.jj = '../../img/jj.png';

            vm.k = '../../img/k.png';
            vm.kk = '../../img/kk.png';

            vm.l = '../../img/l.png';
            vm.ll = '../../img/ll.png';

            vm.plan1 = '../../img/plan1.png';
            vm.plan2 = '../../img/plan2.png';
            vm.plan3 = '../../img/plan3.png';
            vm.plan4 = '../../img/plan4.png';
            vm.plan5 = '../../img/plan5.png';
            vm.plan6 = '../../img/plan6.png';
            vm.plan7 = '../../img/plan7.png';

            vm.rating1 = 3;
            vm.rating2 = 2;
            vm.rating3 = 4; 
            vm.rating4 = 5;
            vm.rating5 = 1;
            vm.rating6 = 4;
            vm.rating7 = 2;
            vm.rating8 = 2;
            vm.rating9 = 5;


            vm.title = ""; 
            vm.filter1 = false
            vm.filter2 = false
            vm.filter3 = false
            vm.filter4 = false
            vm.filter5 = false
            vm.filter6 = false

            vm.filterlogo = false
            vm.filtera = false
            vm.filterb = false
            vm.filterc = false
            vm.filterd = false
            vm.filtere = false
            vm.filterf = false
            vm.filterg = false
            vm.filterh = false
            vm.filteri = false
            vm.filterj = false
            vm.filterk = false
            vm.filterl = false

            vm.filterp1 = false
            vm.filterp2 = false
            vm.filterp3 = false
            vm.filterp4 = false
            vm.filterp5 = false
            vm.filterp6 = false


            vm.showDarkTheme = true

            vm.simulateQuery = false;
            vm.isDisabled    = false;
        
            // list of `state` value/display objects
            vm.states = loadAll();
            vm.querySearch = querySearch;
            vm.selectedItemChange = selectedItemChange;
            vm.searchTextChange = searchTextChange;
            vm.change = change
            vm.change2 = change2
        
            vm.newState = newState;

            vm.newLuxuryCulture = {
                userGroups: {
                    white: [],
                    black: []
                }
            };   

            vm.cultureList = [
              {id: 1, title: "asdasd", status: 2, publish_date: "2017-03-01", quantity: "33", price: "2 EOS"},
              {id: 1, title: "asdasd", status: 4, publish_date: "2017-03-01", quantity: "26", price: "1.5 EOS"},
              {id: 1, title: "asdasd", status: 3, publish_date: "2017-02-28", quantity: "28", price: "1.54 EOS"},
              {id: 1, title: "asdasd", status: 1, publish_date: "2017-02-27", quantity: "27", price: "1.49 EOS"},
              {id: 1, title: "asdasd", status: 5, publish_date: "2017-02-27", quantity: "39", price: "2.3 EOS"},
              {id: 1, title: "asdasd", status: 3, publish_date: "2017-02-27", quantity: "25", price: "2 EOS"},
              {id: 1, title: "asdasd", status: 4, publish_date: "2017-02-26", quantity: "37", price: "3.7 EOS"},
              {id: 1, title: "asdasd", status: 2, publish_date: "2017-02-25", quantity: "22", price: "3.1 EOS"},
              {id: 1, title: "asdasd", status: 2, publish_date: "2017-02-24", quantity: "28", price: "1.8 EOS"}
            ];            
            
            $scope.theme = 'red';

            var isThemeRed = true;
          
            $interval(function () {
              $scope.theme = isThemeRed ? 'blue' : 'red';
          
              isThemeRed = !isThemeRed;
            }, 2000);
          
            vm.showAdvanced = function(ev) {
              $mdDialog.show({
                controller: DialogController,
                templateUrl: 'create.record.one.html',
                parent: angular.element(document.body),
                locals: {
                  cultureList: vm.cultureList
                },                
                targetEvent: ev,
                clickOutsideToClose:true
              })
              .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
              }, function() {
                $scope.status = 'You cancelled the dialog.';
              });
            };

            function change(x) {
              if (x === 1)
                vm.finhack2 = !vm.finhack2
              if (x === 2)
                vm.finhack3 = !vm.finhack3

                
                // vm.filterp3 = true
                // vm.filterp4 = true
                // vm.filterp5 = true
                // vm.filterp6 = true                
            }
          
            function DialogController($scope, $mdDialog, $interval) {

              var vm = $scope;
              // vm.language = language;


      
              vm.determinateValue = 30;

              // Iterate every 100ms, non-stop and increment
              // the Determinate loader.
              $interval(function() {

                vm.determinateValue += 1;
                if (vm.determinateValue > 100) {
                  vm.determinateValue = 30;
                }

              }, 100);
                  
              vm.cultureList = [
                {id: 1, title: "marcus", status: 2, publish_date: "2017-03-01", quantity: "33", price: "2 EOS"},
                {id: 1, title: "ben", status: 4, publish_date: "2017-03-01", quantity: "26", price: "1.5 EOS"},
                {id: 1, title: "john", status: 3, publish_date: "2017-02-28", quantity: "28", price: "1.54 EOS"},
                {id: 1, title: "lilian", status: 1, publish_date: "2017-02-27", quantity: "27", price: "1.49 EOS"},
                {id: 1, title: "ray", status: 5, publish_date: "2017-02-27", quantity: "39", price: "2.3 EOS"},
                {id: 1, title: "hang", status: 3, publish_date: "2017-02-27", quantity: "25", price: "2 EOS"},
                {id: 1, title: "tiff", status: 4, publish_date: "2017-02-26", quantity: "37", price: "3.7 EOS"},
                {id: 1, title: "lily", status: 2, publish_date: "2017-02-25", quantity: "22", price: "3.1 EOS"},
                {id: 1, title: "gigi", status: 2, publish_date: "2017-02-24", quantity: "28", price: "1.8 EOS"}
              ];   
              
              vm.color = {
                red: Math.floor(Math.random() * 255),
                green: Math.floor(Math.random() * 255),
                blue: Math.floor(Math.random() * 255)
              };      

              vm.activated = true;              
              
              vm.price = {
                red: 0.6
              }
              vm.hide = function() {
                $mdDialog.hide();
              };
          
              vm.cancel = function() {
                $mdDialog.cancel();
              };
          
              vm.answer = function(answer) {
                $mdDialog.hide(answer);
              };
            }            
        
            function newState(state) {
              alert("Sorry! You'll need to create a Constitution for " + state + " first!");
            }
        
            // ******************************
            // Internal methods
            // ******************************
        
            /**
             * Search for states... use $timeout to simulate
             * remote dataservice call.
             */
            function querySearch (query) {
              var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
                  deferred;
              if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
              } else {
                return results;
              }
            }

            function change2 (valid) {
              console.log("change2")
              if (valid)
                vm.b = '../../img/fin2.1.png';
              else
                vm.b = '../../img/fin1.png';
            }
        
            function searchTextChange(text) {
              $log.info('Text changed to ' + text);
            }
        
            function selectedItemChange(item) {
              $log.info('Item changed to ' + JSON.stringify(item));
            }
        
            /**
             * Build `states` list of key/value pairs
             */
            function loadAll() {
              var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                      Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                      Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                      Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                      North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                      South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                      Wisconsin, Wyoming';
        
              return allStates.split(/, +/g).map( function (state) {
                return {
                  value: state.toLowerCase(),
                  display: state
                };
              });
            }
        
            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
        
              return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
              };
        
            }            
            
            function active() {
                // check token
                if (token === undefined || token == null) {
                    $window.location.href = "/#!/login";
                }
            }
        },
    ]
);
