// jshint browser:true, jquery: true
// jshint varstmt: false
/* global Handlebars */
/* global Materialize */

var hypertyChat;
var avatar = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';

/*
 * This file loads the Hyperty deployed on the catalogue
 *
 *
 */

let runtime_domain;
let hyperty_domain;
let runtimeURL;

//we are loading the the catalogue urls from config
$(document).ready(function(){
  console.log( "ready!" );
  $.getJSON('/rethink/system.config.json').complete(function(data) {
    console.log('datasdf->', data);
    console.log( "config loaded!" );
    ready(JSON.parse(data.responseText));
  });
});

//setting the urls and adding scritp to html
function ready(config){
  runtime_domain = config["runtime-domain"];
  hyperty_domain = config["hyperty-domain"]

  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function() {
    loadRuntime();
  };
  script.src = 'https://'+runtime_domain+'/.well-known/runtime/rethink.js';
  head.appendChild(script);
  runtimeURL = `hyperty-catalogue://catalogue.${runtime_domain}/.well-known/runtime/Runtime`;

}

/**
 *
 *Some variables for flux control
 */
let RUNTIME;
let groupchatHyperty = null;
const hypertyURI = (hyperty_domain, hyperty) => `hyperty-catalogue://catalogue.${hyperty_domain}/.well-known/hyperty/${hyperty}`;
let toHyperty = null;
let status = 0;
let sent = false;
let reporterLoaded = false;
let firstContactRemote = true;


//loading the runtime
function loadRuntime()
{
  var start = new Date().getTime();
  //Rethink runtime is included in index.html
  rethink.default.install({
    domain: runtime_domain,
    development: false,
    runtimeURL: runtimeURL
  }).then((runtime) => {
    RUNTIME = runtime
    var time = (new Date().getTime()) - start;
    $('.runtime-panel').append('<p>Runtime has been successfully launched in ' + time/1000 +' seconds</p>');
    let collection = $(".loading");
    collection.append('<a onclick="loadHyperty();" class="collection-item">Load a Groupchathyperty</li>') ;
  });
}

//loading the Groupchat hyperty
function loadHyperty(){
  RUNTIME.requireHyperty(hypertyURI(hyperty_domain, 'GroupChat')).then((hyperty) => {
    groupchatHyperty = hyperty;
    hypertyLoaded(hyperty);
/*    $('.runtime-panel').append('<p><b>'
        +' Event: Hyperty '+hyperty.name+' Deployed<br>'+
        '<hr style="border:1px solid;"/></b></p>');*/
    status++;
    if (! reporterLoaded) {
      let collection = $('.collection');
/*      collection.append('<a  onclick="createNewchat();"  class="collection-item">Create new Groupchat</li>') ;
      collection.append('<a  onclick="getMessage();"  class="collection-item">Get Messages</li>') ;*/
      reporterLoaded = true;
    }
    //enableSayHelloToLocal();

  });
}

/*
function createNewchat() {
  var participants = [{email:"leolileoo@gmail.com", domain:"google.com"}];
  hypertyReporter.instance.create("EventGroupchat", participants)
      .then((groupChat)=>{
        groupChat.sendMessage('hi')
            .then((message)=>{
              console.log(message)
            })
      })
}

function getMessage() {
  hypertyReporter.instance.EventGroupchat(toHyperty).then(function(chat) {
    toHyperty.onMessage((message)=>{
      console.log(message)
    });
    console.log(groupChat)
    $('.runtime-panel').append('<p><b>'
        +'Get Messages <br>'+
        '<hr style="border:1px solid;"/></b></p>');
    $('.runtime-panel').append('<p>Observer Url: '+ toHyperty+'</p>');
    let collection = $('.collection');
    let hello = $('.hello-panel');
    hello.addClass('hide');
    /!*    if (!sent) {
     collection.append('<a  onclick="fillSayBye();"  class="collection-item">How to say Bye to a Hyperty.</li>') ;
     sent = true;
     }*!/
  }).catch(function(reason) {
    console.error(reason);
  });
}

function fillSayHelloToRemoteHyperty()
{
  let hello = $('.hello-panel');

  if(firstContactRemote) {
    let sayHelloTo = '<form class="say-hello"> Hyperty URL: <input class="to-hyperty-input" type="text" name="toHyperty"><br><input type="submit" value="Say Hello"></form>'

    hello.append(sayHelloTo);

    $('.say-hello').on('submit', sayHelloToRemoteHyperty);
    firstContactRemote = false;
  }
  else {
    hello.removeClass('hide');
  }

}

function sayHelloToRemoteHyperty(event) {
  event.preventDefault();
  console.log('event->',event);

  let toHypertyForm = $(event.currentTarget);

  toHyperty = toHypertyForm.find('.to-hyperty-input').val();

  console.log(toHyperty);

  hypertyReporter.instance.hello(toHyperty).then(function(helloObject) {
    $('.runtime-panel').append('<p><b>'
        +' Event: Hello sent to Remote Hyperty <br>'+
        '<hr style="border:1px solid;"/></b></p>');
    $('.runtime-panel').append('<p>Observer Url: '+ toHyperty+'</p>');
    let collection = $('.collection');
    let hello = $('.hello-panel');
    hello.addClass('hide');
    /!*    if (!sent) {
     collection.append('<a  onclick="fillSayBye();"  class="collection-item">How to say Bye to a Hyperty.</li>') ;
     sent = true;
     }*!/
  }).catch(function(reason) {
    console.error(reason);
  });
}
/!**
 * Call back after hyperty is loaded
 *!/
function hypertyDeployed(result) {
  let hypertyObserver;

  hypertyObserver = result.instance;

  console.log(hypertyObserver);

  $('.selection-panel').hide();

  $('.runtime-panel').append('<p>Hyperty Observer URL: ' + result.runtimeHypertyURL + '</p>');


};
*/


//////////////////////////////////////////old






function hypertyLoaded(result) {
  let hypertyInfo = '<span class="white-text">' +
                    '<b>Name:</b> ' + result.name + '</br>' +
                    '<b>Status:</b> ' + result.status + '</br>' +
                    '<b>HypertyURL:</b> ' + result.runtimeHypertyURL + '</br>' +
                    '</span>';
  $('.card-panel').html(hypertyInfo);

  hypertyChat = result.instance;

  hypertyChat.onInvite(prepareChat)

  let messageChat = $('.chat');
  messageChat.removeClass('hide');

  let chatSection = $('.chat-section');
  chatSection.removeClass('hide');

  let createBtn = $('.create-room-btn');
  let joinBtn = $('.join-room-btn');

  let createRoomModal = $('.create-chat');
  let createRoomBtn = createRoomModal.find('.btn-create');
  let addParticipantBtn = createRoomModal.find('.btn-add');

  addParticipantBtn.on('click', addParticipantEvent);
  createRoomBtn.on('click', createRoomEvent);
/*  createBtn.on('click', createRoom);*/
}

/*
  Create Room actions
 */
/*function createRoom(event) {
  console.log()
  event.preventDefault();

  let createRoomModal = $('.create-chat');
  let createRoomBtn = createRoomModal.find('.btn-create');
  let addParticipantBtn = createRoomModal.find('.btn-add');

  addParticipantBtn.on('click', addParticipantEvent);
  createRoomBtn.on('click', createRoomEvent);

/!*  createRoomModal.openModal();*!/
}*/

function addParticipantEvent(event) {

  event.preventDefault();

  let createRoomModal = $('.create-chat');
  let participants = createRoomModal.find('.participants-form');
  let countParticipants = participants.length - 1;

  countParticipants++;

  let participantEl = '<div class="row">' +
    '<div class="input-field col s8">' +
    '  <input class="input-email" name="email" id="email-' + countParticipants + '" required aria-required="true" type="text">' +
    '  <label for="email-' + countParticipants + '">Participant Email</label>' +
    '</div>' +
    '<div class="input-field col s4">' +
    '  <input class="input-domain" name="domain" id="domain-' + countParticipants + '" type="text">' +
    '  <label for="domain-' + countParticipants + '">Participant domain</label>' +
    '</div>' +
  '</div>';

  participants.append(participantEl);

}

function createRoomEvent(event) {
  console.log("new chatroom")
  event.preventDefault();

  let createRoomModal = $('.create-chat');
  let participantsForm = createRoomModal.find('.participants-form');

  let participants = [];
  console.log($(participantsForm));
  let serializedObject = $(participantsForm);

  // Prepare the chat
  let name = createRoomModal.find('.input-name').val();
  participants.push({email: "leolileoo@gmail.com", domain: "google.com/stub/8450"});


  console.log(serializedObject);

  if (serializedObject.hasOwnProperty('email')) {

    serializedObject.email.forEach(function(value, index) {
      participants.push({email: value, domain: serializedObject.domain[index]});
    });

  }

  console.log('Participants: ', participants);

  hypertyChat.create(name, participants).then(function(chatGroup) {

    prepareChat(chatGroup);

  }).catch(function(reason) {
    console.error(reason);
  });
}

function prepareChat(chatGroup) {
  console.log('Chat Group Controller: ', chatGroup);
 console.log("PREPARE CHAt WAS CALLLED")
  chatGroup.onMessage(function(message) {
    console.info('new message recived: ', message);
    processMessage(message);
  });


  Handlebars.getTemplate('rethink/chat-section').then(function(html) {
    $('.chat-section').append(html);

    chatManagerReady(chatGroup);


  });

}

function chatManagerReady(chatGroup) {

  let chatSection = $('.chat-section');
  let addParticipantModal = $('.add-participant');
  let btnAdd = addParticipantModal.find('.btn-add');
  let btnCancel = addParticipantModal.find('.btn-cancel');

  let messageForm = chatSection.find('.message-form');
  let textArea = messageForm.find('.materialize-textarea');

  textArea.on('keyup', function(event) {

    if (event.keyCode === 13 && !event.shiftKey) {
      messageForm.submit();
    }

  });

  messageForm.on('submit', function(event) {
    event.preventDefault();

    $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };

    let object = $(this).serializeObject();
    let message = object.message;
    let distance= object.nearest?20:undefined
    chatGroup.sendMessage(message, distance).then(function(result) {
      console.log('message sent', result);
      messageForm[0].reset();
    }).catch(function(reason) {
      console.error('message error', reason);
    });

  });

  btnAdd.on('click', function(event) {
    event.preventDefault();

    let emailValue = addParticipantModal.find('.input-name').val();
    chatGroup.addParticipant(emailValue).then(function(result) {
      console.log('hyperty', result);
    }).catch(function(reason) {
      console.error(reason);
    });

  });

  btnCancel.on('click', function(event) {
    event.preventDefault();
  });

}

function processMessage(message) {

  let chatSection = $('.chat-section');
  let messagesList = chatSection.find('.messages .collection');

  let list = `<li class="collection-item avatar">
    <img src="` + avatar + `" alt="" class="circle">
    <span class="title">` + message.identity.username + `</span>
    <p>` + message.text.replace(/\n/g, '<br>') + `</p>
  </li>`;

  messagesList.append(list);
}

function addParticipant(participant) {

  console.log('ADD PARTICIPANT: ', participant);

  let section = $('.conversations');
  let collection = section.find('.participant-list');
  let collectionItem = '<li class="chip" data-name="' + participant.hypertyResource + '"><img src="' + avatar + '" alt="Contact Person">' + participant.hypertyResource + '<i class="material-icons close">close</i></li>';

  collection.removeClass('center-align');
  collection.append(collectionItem);

  let closeBtn = collection.find('.close');
  closeBtn.on('click', function(e) {
    e.preventDefault();

    let item = $(e.currentTarget).parent().attr('data-name');
    removeParticipant(item);
  });
}

function removeParticipant(item) {
  let section = $('.conversations');
  let collection = section.find('.participant-list');
  let element = collection.find('li[data-name="' + item + '"]');
  element.remove();
}

Handlebars.getTemplate = function(name) {
  console.log(name)

  return new Promise(function(resolve, reject) {

    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
      Handlebars.templates = {};
    } else {
      resolve(Handlebars.templates[name]);
    }

    $.ajax({
      url: name + '.hbs',
      success: function(data) {
        Handlebars.templates[name] = Handlebars.compile(data);
        resolve(Handlebars.templates[name]);
      },

      fail: function(reason) {
        reject(reason);
      }
    });

  });

};
