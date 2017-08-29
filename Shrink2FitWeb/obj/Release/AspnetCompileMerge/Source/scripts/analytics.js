// Mixpanel analytics init
$(function() {
    // mixpanel.init("938f550c7d5bc8b27f1860116d4b698c");
});


function trackEvent(name, properties) {
    // mixpanel.track(name, properties);
}

function trackEvent(name) {
    // mixpanel.track(name, properties);
}

function afterRegisterAnalyticsHandler(email, userId) {
    /*
    mixpanel.register({
        "email": email,
        "userId": userId,
    });
    mixpanel.people.set({ "email": email, "userId": userId });
    mixpanel.alias(userId);
    */
}

function afterLoginAnalyticsHandler(email, userId) {
    /*
    mixpanel.register({
        "email": email,
        "userId": userId,
    });

    mixpanel.people.set({ "email": email, "userId": userId });
    mixpanel.identify(userId);
    */
}
