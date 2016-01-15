angular.module('meanStarterKit').factory('UserService', ['$http', function($http){
    return {
        // get all nerds
        get: function(query){
            return $http.get('/api/users', {params: {query: query}});
        },
        // create a nerd
        create: function(userData){
            return $http.post('/api/register', userData);
        },
        // delete a nerd
        delete: function(userId){
            console.log(userId);
            return $http.delete('/api/users/'+userId);
        }
    };
}]);