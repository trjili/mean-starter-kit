angular.module('meanStarterKit').factory('UserService', ['$http', function($http){
    return {
        // get all nerds
        get: function(){
            return $http.get('/api/users');
        },
        // create a nerd
        create: function(userData){
            return $http.post('/api/register', userData);
        },
        // delete a nerd
        delete: function(userId){
            return $http.delete('/api/users/', userId);
        }
    };
}]);