require.config({
  baseUrl: '/openwapp/scripts/',
  paths: {
    zeptojs: '/openwapp/components/zepto/zepto.min',
    jquery: '/openwapp/components/zepto/zepto',
    underscore: '/openwapp/components/underscore/underscore-min',
    backbone: '/openwapp/components/backbone/backbone',
    handlebars: '/openwapp/components/handlebars/handlebars.min',
    rtc: 'vendor/ottcomms-rtc-web/rtc',
    libphonenumber: '/openwapp/components/PhoneNumber.js',
    coseme: '/openwapp/components/coseme/dist/coseme',
    emoji: '/openwapp/emoji/emoji',
    fxosrate: '/openwapp/components/fxosRate/fxosrate',
    l10n: '/openwapp/components/fxosRate/l10n'
  },
  shim: {
    'zeptojs': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'rtc/rtc': {
      exports: 'RTC',
      deps: ['rtc/sip', 'rtc/connection']
    },
    'libphonenumber/PhoneNumber': {
      exports: 'PhoneNumber',
      deps: ['utils/PhoneNumberMetaDataUpdates']
    },
    'vendor/async-storage/async-storage': {
      exports: 'asyncStorage'
    },
    'l10n': {
      exports: 'l10n'
    },
    'fxosrate': {
      deps: ['l10n'],
      exports: 'fxosRate'
    },
    'coseme': {
      exports: 'CoSeMe',
      init: function () {
        'use strict';
        var CoSeMe = this.CoSeMe;
        CoSeMe.crypto = this.CryptoJS;
        CoSeMe.common.Logger.disableAll();
        return this.CoSeMe;
      }
    }
  }
});

require([
  'backbone',
  'global',
  'models/auth',
  'collections/contacts',
  'router',
  'models/rtc',
  'models/geoposition',
  'collections/history',
  'templates/helpers',
  'utils/notifications',
  'storage/dbmanager',
  'localisations/translation',
  'localisations/translation-utilities',
  'utils/language',
  'utils/sdmanager',
  'models/background-service'
], function (Backbone, global, Auth, Contacts, Router, Rtc, GeoPosition,
             HistoryCollection, HandlebarsHelpers, Notifications, DbManager,
             Translation, TranslationUtils, Language, SDManager,
             BackgroundService) {
  'use strict';
  Backbone.$ = require('zeptojs');
  global.router = new Router();
  global.auth = new Auth();
  global.geoPosition = new GeoPosition();
  global.rtc = new Rtc();
  global.contacts = new Contacts();
  global.historyCollection = new HistoryCollection();
  global.notifications = new Notifications();
  global.localisation = Translation;
  global.l10nUtils = TranslationUtils;
  global.language = Language.getLanguage();
  global.sdManager = new SDManager();
  global.backgroundService = new BackgroundService();
  global.backgroundService.start();

  HandlebarsHelpers.register();

  Backbone.history.start();
});
