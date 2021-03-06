var RequestService = window.RequestService;
var TimeoutHttpInterceptor = window.TimeoutHttpInterceptor;

describe('timeout http interceptor', () => {
    var service;

    beforeEach(window.module(($provide) => {
        $provide.service('request', RequestService);
        $provide.service('upload', function() {
            this.isUpload = function() {
                return false;
            };
        });
    }));

    beforeEach(inject(($injector) => {
        service = $injector.invoke(TimeoutHttpInterceptor);
    }));

    xit('monitors requests and stop them after while', inject(($rootScope) => {
        var config = {
            method: 'GET',
            url: 'test'
        };

        expect($rootScope.serverStatus).toBe(0);

        expect(service.request(config)).toBe(config);
        expect(config.timeout).toBeTruthy();

        service.responseError({
            status: null,
            config: config
        });

        expect($rootScope.serverStatus).toBe(1);

        service.responseError({
            status: null,
            config: config
        });

        expect($rootScope.serverStatus > 1).toBe(true);

        service.response({
            status: 200,
            config: config
        });

        expect($rootScope.serverStatus).toBe(0);

        service.request(config);

        service.responseError({status: null, config: config});
        service.responseError({status: 400, config: config});
        expect($rootScope.serverStatus).toBe(0);
    }));
});
