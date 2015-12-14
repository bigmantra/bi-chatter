define(["https://cdn.socket.io/socket.io-1.3.7.js","index.module"], function (io) {
  'use strict';

  angular
    .module('bm.platform')
    .factory('Socket', function (socketFactory) {

      var chatterIoSocket, chatterSocket;

      chatterIoSocket = io.connect("http://localhost:8000");

      return socketFactory({
        ioSocket: chatterIoSocket
      });

    });

});

