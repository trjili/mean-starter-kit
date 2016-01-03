angular.module('meanStarterKit').factory('User', ['$http', function($http){
    return {
        // get all nerds
        get: function(){
            return $http.get('/api/users');
        },
        // create a nerd
        create: function(userData){
            return $http.post('/api/users', userData);
        },
        // delete a nerd
        delete: function(userId){
            return $http.delete('/api/users/', userId);
        }
    };
}]);