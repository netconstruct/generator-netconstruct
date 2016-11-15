/**
 * <%= serviceName %> service.
 * @description The <%= serviceName %> service
 */
class <%= serviceClassName %>Service {
  /* @ngInject */
  constructor($http) {
    this.$http = $http;
  }
}

export default <%= serviceClassName %>Service;
