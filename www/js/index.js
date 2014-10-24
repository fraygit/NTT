/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        $("#statusContent").html('initialize');
        $("#statusContent").html('initialize..');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //$("#statusContent").html('bind events');
        document.addEventListener('deviceready', function(){
            $("#statusContent").html('device ready..');
        }, false);
        document.addEventListener('resume', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        $("#statusContent").html('device ready..');
        app.receivedEvent('deviceready');        
    },

    onResume: function(){
        $("#statusContent").html('resume');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    getDeviceId: function() {
        //var deviceId = window.device.uuid;
        if (window.device != undefined){
            return window.device.uuid;
        }
        return '12345';
    }
};

app.initialize();

var qrcode;

var qrCodeApi = {
    generateCode: function(el, txt){
        qrcode = new QRCode(el, {
            text: txt,
            width: 128,
            height: 128,
            display: '',
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        $('#' + el).children('img').load(function(){
            $('#' + el).children('img').css('display', 'inline');
        });
    },

    clearCode: function(el){
        //qrcode.clear();
        $('#' + el).html('');
    }
};

var module = angular.module('app', ['onsen']);  

module.controller('PageController', function($scope) {
    ons.ready(function() {
        /*
      var content = document.getElementById("testContent");
        content.innerHTML="<ons-button>Another Button</ons-button>";
        ons.compile(content);
        */
        $("#btnStamp").click(function() {
            //var content = document.getElementById("testContent");
            //content.innerHTML=app.getDeviceId();
            //ons.compile(content);
            qrCodeApi.generateCode('qrCodeEl', app.getDeviceId());
            modal.show();
            //setTimeout('modal.hide()', 2000);
          });

      });
  });  

module.controller('ModalController', function($scope) {
    ons.ready(function() {
        $("#modal-close").click(function() {
            modal.hide();
            qrCodeApi.clearCode('qrCodeEl');
          });

      });
  });  


