angular.module('meanStarterKit') .directive('translateLanguageSelect', function (LocaleService) { 'use strict';

    return {
        restrict: 'A',
        replace: true,
        templateUrl: '../../views/partials/directives/translateLanguageSelect.html',
        controller: function ($scope) {
            $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
            $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
            $scope.visible = $scope.localesDisplayNames &&
            $scope.localesDisplayNames.length > 1;

            $scope.changeLanguage = function (locale) {
                LocaleService.setLocaleByDisplayName(locale);
            };
        }
    };
});