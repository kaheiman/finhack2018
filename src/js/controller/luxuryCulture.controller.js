app.controller('luxuryCultureController', ['$scope', 'textAngularManager', '$filter', 'luxuryCultureService', 'Upload', '$log', 'commonService', '$window', '$mdDialog', '$mdToast', '$mdDateLocale',
	function ($scope, textAngularManager, $filter, luxuryCultureService, Upload, $log, commonService, $window, $mdDialog, $mdToast, $mdDateLocale) {

		$mdDateLocale.formatDate = function (date) {
			return moment(date).format('YYYY-MM-DD');
		};
		var date = new Date();
		var vm = $scope;
		var token = $window.localStorage.getItem("token");
		var host = $window.localStorage.getItem("host");
		const toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};
		//variables
		vm.query = {
			filter: {
				all: '',
				id: '',
				title: '',
				time_stamp: ''
			},
			order: 'id',
			limit: 15,
			page: 1
		};
		vm.filter = {
			show: false
		};
		vm.itemSelection = {
			"numberOfItems": 10,
			"choice": [10, 15, 20, 25, 30]
		};
		vm.newCoverImg = null;
		vm.newLuxuryCulture = {
			userGroups: {
				white: [],
				black: []
			}
		};
		vm.cultureList = [
			{id: 1456, title: "White bread", rates: 2, publish_date: "09:00", quantity: "3/30", price: "$3"},
			{id: 2369, title: "Brown bread", rates: 4, publish_date: "11:30", quantity: "14/20", price: "$2.5"},
			{id: 5413, title: "Whole grain bread", rates: 3, publish_date: "13:05", quantity: "11/25", price: "$3"},
			{id: 4678, title: "Croissant", rates: 1, publish_date: "13:20", quantity: "15/40", price: "$2"},
			{id: 3213, title: "Bagel", rates: 5, publish_date: "14:10", quantity: "33/40", price: "$1"},
			{id: 8960, title: "Donut", rates: 3, publish_date: "14:30", quantity: "20/40", price: "$1"},
			{id: 5689, title: "Rolls", rates: 4, publish_date: "15:45", quantity: "25 / 40", price: "$1"},
			{id: 6780, title: "Swiss Roll", rates: 2, publish_date: "16:25", quantity: "23 / 40", price: "$1.5"},
		];
		vm.permission = [];
		//function
		vm.submit = submit;
		vm.remove = remove;
		vm.removeFilter = removeFilter;
		vm.showToast = showToast;
		vm.translate = translate;
		vm.edit = edit;

		vm.rating1 = 3;
		vm.rating2 = 2;
		vm.rating3 = 4;   		
		// activate();

		function activate() {
			if (token == undefined || token == null) {
				$window.location.href = '/#!/login';
			}
			vm.newLuxuryCulture.publishDate = moment(date).format('YYYY-MM-DD');
			commonService.getUserPermission(token, host)
				.then(function (result) {
					if (result.data.success) vm.permissions = result.data;
				})
				.catch(function (err) {
					console.log(err);
				});
			commonService.getProductGroup(token, host)
				.then(function (msg) {
					if (msg.data.success) vm.productGroups = msg.data.productGroup;
				})
				.catch(function (err) {
					console.log(err);
				});
			commonService.getUserGroup(token, host)
				.then(function (msg) {
					if (msg.data.success) vm.userGroups = msg.data.userGroup;
				})
				.catch(function (err) {
					console.log(err);
				});
			luxuryCultureService.getLuxuryCulture(null, token, host)
				.then(function (msg) {
					if (msg.data.success) vm.cultureList = msg.data.culture;
				})
				.catch(function (err) {
					console.log(err)
				});
		}

		function showToast(text) {
			$mdToast.show(
				$mdToast.simple()
				.textContent(text)
				.position(Object.keys(toastPosition)
					.filter(function (pos) {
						return toastPosition[pos];
					})
					.join(' '))
				.hideDelay(2000)
			);
		}

		function submit(lcForm) {
			if (!lcForm.$valid || !vm.newLuxuryCulture.content || vm.newLuxuryCulture.content == "") {
				showToast("You are not finish input this from!");
			} else if (vm.newLuxuryCulture.content.includes("data:image")) {
				showToast("Please use the upload image function.");
			} else {
				vm.newLuxuryCulture.publishDate = moment(vm.newLuxuryCulture.publishDate).format('YYYY-MM-DD');
				luxuryCultureService.createLuxuryCulture(vm.newLuxuryCulture, vm.newCoverImg, token, host)
					.then(function (msg) {
						if (msg.data.success) {
							$window.location.href = '/#!/luxuryCulture';
						} else {
							showToast("Oops Something error.");
						}
					})
					.catch(function (err) {
						console.log(err);
					});
			}
		}

		function remove(id) {
			var index = null;
			vm.cultureList.map(function (item, idx) {
				if (item.id == id) index = idx;
			});
			var confirm = $mdDialog.confirm()
				.title('Would you like to delete this Luxury Culture?')
				.textContent('You will not be able to recover this file.')
				.ariaLabel('Lucky day')
				.ok('Delete!')
				.cancel('Cancel');
			$mdDialog.show(confirm).then(function () {
				luxuryCultureService.deleteLuxuryCulture(id, token, host)
					.then(function (msg) {
						if (msg.data.success) {
							vm.cultureList.splice(index, 1);
							showToast('Delete Successful!');
						}
					})
					.catch(function (err) {
						console.log(err);
					});
			}, function () {
				showToast('Delete Cancel.');
			});
		}

		function removeFilter() {
			vm.filter.show = false;
			vm.search.$ = "";
		}

		function translate(id, language) {
			$mdDialog.show({
				controller: mdDialogTranslateLuxuryCultureCtrl,
				templateUrl: 'translate.luxuryCulture.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				locals: {
					luxuryCulture: vm.luxuryCulture,
					language: vm.language,
					translate: vm.translate
				},
				fullscreen: false // Only for -xs, -sm breakpoints.
			});

			function mdDialogTranslateLuxuryCultureCtrl($scope, $mdDialog, luxuryCultureService) {
				var vm = $scope;
				vm.language = language;
				vm.luxuryCulture = {};
				vm.translate = {};

				vm.closeDialog = closeDialog;
				vm.saveEdit = saveEdit;
				luxuryCultureService.getLuxuryCulture(id, token, host).then(function (msg) {
					if (msg.data.success) {
						vm.luxuryCulture = msg.data.culture[0];
						vm.luxuryCultureTranslation = msg.data.luxuryCultureTranslation;
						var created = false;
						for (var lang in vm.luxuryCultureTranslation) {
							if (vm.luxuryCultureTranslation[lang].language == language) {
								vm.translate = {
									"title": vm.luxuryCultureTranslation[lang].title,
									"content": vm.luxuryCultureTranslation[lang].content,
									"language": vm.luxuryCultureTranslation[lang].language
								};
								created = true;
							}
						}
						if (created == false) {
							vm.translate = {
								"title": vm.luxuryCulture.title,
								"content": vm.luxuryCulture.content,
								"language": language
							};
						}
					}
				});

				function closeDialog() {
					$mdDialog.hide();
					showToast("Edit Cancel.");
				}

				function saveEdit() {
					vm.editLuxuryCulture = {
						"luxuryCulture": vm.luxuryCulture,
						"translate": []
					};
					vm.editLuxuryCulture.translate.push(vm.translate);
					luxuryCultureService.editLuxuryCulture(id, vm.editLuxuryCulture, null, token, host)
						.then(function (msg) {
							if (msg.data.success) {
								showToast("Edit Daily Challenge Quiz Successful.");
							}
						})
						.catch(function (err) {
							console.log(err);
							showToast("Error: Save Unsuccessful.");
						});
					$mdDialog.hide();
				}
			}
		}

		function edit(id) {
			$mdDialog.show({
				controller: mdDialogeEditDailyChallengeQuizCtrl,
				templateUrl: 'edit.luxuryCulture.html',
				parent: angular.element(document.body),
				clickOutsideToClose: true,
				locals: {
					luxuryCulture: vm.luxuryCulture,
					// language: vm.language,
					translate: vm.translate,
					productGroups: vm.productGroups,
					userGroups: vm.userGroups
				},
				fullscreen: false // Only for -xs, -sm breakpoints.
			});

			function mdDialogeEditDailyChallengeQuizCtrl($scope, $mdDialog, luxuryCultureService) {
				var vm = $scope;
				// vm.language = language;
				vm.luxuryCulture = {};
				vm.translate = [];

				vm.closeDialog = closeDialog;
				vm.saveEdit = saveEdit;
				luxuryCultureService.getLuxuryCulture(id, token, host).then(function (msg) {
					if (msg.data.success) {
						vm.luxuryCulture = msg.data.culture[0];
						vm.luxuryCultureTranslation = msg.data.luxuryCultureTranslation;
						// var created = false;
						vm.translate.push({
							"title": vm.luxuryCulture.title,
							"content": vm.luxuryCulture.content,
							"language": "EN"
						});
						for (var lang in vm.luxuryCultureTranslation) {
							vm.translate.push({
								"title": vm.luxuryCultureTranslation[lang].title,
								"content": vm.luxuryCultureTranslation[lang].content,
								"language": vm.luxuryCultureTranslation[lang].language
							});
						}
						commonService.getProductGroup(token, host)
							.then(function (msg) {
								if (msg.data.success) vm.productGroups = msg.data.productGroup;
							})
							.catch(function (err) {
								console.log(err);
							});
						commonService.getUserGroup(token, host)
							.then(function (msg) {
								if (msg.data.success) vm.userGroups = msg.data.userGroup;
							})
							.catch(function (err) {
								console.log(err);
							});
					}
				});

				function closeDialog() {
					$mdDialog.hide();
					showToast("Edit Cancel.");
				}

				function saveEdit(lcForm) {
					var err = false;
					for (var i in vm.translate) {
						if (vm.translate[i].title == "" || vm.translate[i].content == "" || vm.translate[i].content.includes("data:image")) err = true;
					}
					if (!lcForm.$valid || err == true) {
						console.log('Make sure the content is correct.');
					} else {
						vm.editLuxuryCulture = {
							"luxuryCulture": vm.luxuryCulture,
							"translate": []
						};
						vm.luxuryCulture.content_html = vm.translate[0].content;
						vm.luxuryCulture.title = vm.translate[0].title;
						var temp = angular.copy(vm.translate);
						temp.splice(0, 1);
						vm.editLuxuryCulture.translate = temp;

						luxuryCultureService.editLuxuryCulture(id, vm.editLuxuryCulture, null, token, host)
							.then(function (msg) {
								if (msg.data.success) {
									showToast("Edit Daily Challenge Quiz Successful.");
									$mdDialog.hide();
								}
							})
							.catch(function (err) {
								console.log(err);
								showToast("Error: Save Unsuccessful.");
							});
					}

				}
			}
		}
	}
]);