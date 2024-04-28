/**
 * Button
 * 
 */
var Button = {
  Button: function (options) {
    if (typeof options.cooldown == 'number') {
      this.data_cooldown = options.cooldown;
    }
    this.data_remaining = 0;
    if (typeof options.click == 'function') {
      this.data_handler = options.click;
    }

    var el = $('<div>')
      .attr('id', typeof (options.id) != 'undefined' ? options.id : "BTN_" + Engine.getGuid())
      .addClass('button')
      .text(typeof (options.text) != 'undefined' ? options.text : "button")
      .click(function () {
        if (!$(this).hasClass('disabled')) {
          Button.cooldown($(this));
          $(this).data("handler")($(this));
        }
      })
      .data("handler", typeof options.click == 'function' ? options.click : function () { Engine.log("click"); })
      .data("remaining", 0)
      .data("cooldown", typeof options.cooldown == 'number' ? options.cooldown : 0);

    el.append($("<div>").addClass('cooldown'));

    if (options.cost) {
      var ttPos = options.ttPos ? options.ttPos : "bottom right";
      var costTooltip = $('<div>').addClass('tooltip ' + ttPos);
      for (var k in options.cost) {
        $("<div>").addClass('row_key').text(k).appendTo(costTooltip);
        $("<div>").addClass('row_val').text(options.cost[k]).appendTo(costTooltip);
      }
      if (costTooltip.children().length > 0) {
        costTooltip.appendTo(el);
      }
    }

    if (options.width) {
      el.css('width', options.width);
    }

    return el;
  },

  setDisabled: function (btn, disabled) {
    if (btn) {
      if (!disabled && !btn.data('onCooldown')) {
        btn.removeClass('disabled');
      } else if (disabled) {
        btn.addClass('disabled');
      }
      btn.data('disabled', disabled);
    }
  },

  isDisabled: function (btn) {
    if (btn) {
      return btn.data('disabled') === true;
    }
    return false;
  },

  cooldown: function (btn) {
    var cd = btn.data("cooldown");
    if (cd > 0) {
      $('div.cooldown', btn).stop(true, true).width("100%").animate({ width: '0%' }, cd * 1000, 'linear', function () {
        var b = $(this).closest('.button');
        b.data('onCooldown', false);
        if (!b.data('disabled')) {
          b.removeClass('disabled');
        }
      });
      btn.addClass('disabled');
      btn.data('onCooldown', true);
    }
  },

  clearCooldown: function (btn) {
    $('div.cooldown', btn).stop(true, true);
    btn.data('onCooldown', false);
    if (!btn.data('disabled')) {
      btn.removeClass('disabled');
    }
  }
};
/**
 * engine
 * 
 */
var Engine = {

  /* TODO *** MICHAEL IS A LAZY BASTARD AND DOES NOT WANT TO REFACTOR ***
   * Here is what he should be doing:
   * 	- All updating values (store numbers, incomes, etc...) should be objects that can register listeners to
   * 	  value-change events. These events should be fired whenever a value (or group of values, I suppose) is updated.
   * 	  That would be so elegant and awesome.
   */
  SITE_URL: encodeURIComponent("http://adarkroom.doublespeakgames.com"),
  VERSION: 1.3,
  MAX_STORE: 99999999999999,
  SAVE_DISPLAY: 30 * 1000,
  GAME_OVER: false,

  //object event types
  topics: {},

  Perks: {
    '通臂拳': {
      desc: '提高徒手攻击力',
      notify: '通臂拳'
    },
    '金刚掌': {
      desc: '再次提高徒手攻击力.',
      notify: '金刚掌'
    },
    '降龙十八掌': {
      desc: '两倍攻速+更高攻击力',
      notify: '降龙十八掌'
    },
    '夺命连环三仙剑': {
      desc: '近战武器攻击提高',
      notify: '夺命连环三仙剑'
    },
    '避免饥饿': {
      desc: '两倍挨饿能力',
      notify: '学习如何避免饥饿'
    },
    '避免流失水分': {
      desc: '两倍忍渴能力',
      notify: '学习如何避免流失水分'
    },
    '凌波微步': {
      desc: '躲闪能力加强',
      notify: "凌波微步"
    },
    '兰花佛穴手': {
      desc: '命中率加强',
      notify: '兰花佛穴手'
    },
    '千里眼': {
      desc: '视野扩大',
      notify: '千里眼'
    },
    '潜行术': {
      desc: '降低遇敌概率',
      notify: '潜行术'
    },
    '九阳神功': {
      desc: '进食恢复hp加强',
      notify: '九阳神功'
    }
  },

  options: {
    state: null,
    debug: false,
    log: false
  },

  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );
    this._debug = this.options.debug;
    this._log = this.options.log;

    // Check for HTML5 support
    if (!Engine.browserValid()) {
      window.location = 'browserWarning.html';
    }

    // Check for mobile
    if (Engine.isMobile()) {
      window.location = 'mobileWarning.html';
    }

    if (this.options.state != null) {
      window.State = this.options.state;
    } else {
      Engine.loadGame();
    }

    $('<div>').attr('id', 'locationSlider').appendTo('#main');

    var menu = $('<div>')
      .addClass('menu')
      .appendTo('body');

    $('<span>')
      .addClass('lightsOff menuBtn')
      .text('关灯.')
      .click(Engine.turnLightsOff)
      .appendTo(menu);

    $('<span>')
      .addClass('menuBtn')
      .text('重新来过.')
      .click(Engine.confirmDelete)
      .appendTo(menu);

    // $('<span>')
    // 	.addClass('menuBtn')
    // 	.text('share.')
    // 	.click(Engine.share)
    // 	.appendTo(menu);

    $('<span>')
      .addClass('menuBtn')
      .text('存档.')
      .click(Engine.exportImport)
      .appendTo(menu);



    $('<span><img src="微博1.png"> </span>')
      .addClass('menuBtn')
      .attr('id', 'sss1')
      //.attr('src','微博1.png')
      //.html("<p>test</p>")
      //.html('<img scr="http://bynicki.com/Content/Google-logo.gif" />')
      //.text('u77新浪微博')
      .click(function () { window.open('http://www.dwz.cn/fd8Bo'); })
      //.append('<a id="imalink" href="http://google.com" ><img scr="/img/微博1.png" /> </a>')
      .appendTo(menu);
    // $('<span> <img src="微博1.png" ></span>')
    // 	.addClass('menuBtn')
    // 	//.text('www dd')
    // 	//.click(function() { window.open('http://www.u77.com'); })
    // 	.appendTo(menu);
    //$('<img scr="../img/微博1.png" />').prependTo('#sss1');
    //$('#ss1').append('<a id="imalink" href="http://google.com" ><img scr="img/微博1.png" /> </a>');
    $('<span><img src="腾讯1.png"> </span>')
      .addClass('menuBtn')
      .attr('src', '腾讯1.png')
      .attr('id', 'sss2')

      //.text('QQ空间分享')
      .click(function () { window.open('http://dwz.cn/u77_xhw'); })
      .appendTo(menu);
    // $('<span>')
    // 	.addClass('menuBtn')
    // 	.text('app store.')
    // 	.click(function() { window.open('https://itunes.apple.com/us/app/a-dark-room/id736683061'); })
    // 	.appendTo(menu);	

    $('<span><img src="u77logo.png" height="45px" > </span>')
      .addClass('menuBtn')
      //.text('u77.')u77logo.png
      .click(function () { window.open('http://www.u77.com'); })
      .appendTo(menu);


    // Register keypress handlers
    $('body').off('keydown').keydown(Engine.keyDown);
    $('body').off('keyup').keyup(Engine.keyUp);

    // Register swipe handlers
    swipeElement = $('#outerSlider');
    swipeElement.on('swipeleft', Engine.swipeLeft);
    swipeElement.on('swiperight', Engine.swipeRight);
    swipeElement.on('swipeup', Engine.swipeUp);
    swipeElement.on('swipedown', Engine.swipeDown);

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Engine.handleStateUpdates);

    $SM.init();
    Notifications.init();
    Events.init();
    Room.init();

    if ($SM.get('stores["木头"]')) {
      Outside.init();
    }
    if ($SM.get('stores["罗盘"]', true) > 0) {
      Path.init();
    }
    if ($SM.get('features.location.spaceShip')) {
      Ship.init();
    }

    Engine.travelTo(Room);

  },

  browserValid: function () {
    return location.search.indexOf('ignorebrowser=true') >= 0 || (
      typeof Storage != 'undefined' &&
      !oldIE);
  },

  isMobile: function () {
    return location.search.indexOf('ignorebrowser=true') < 0 &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  },

  saveGame: function () {
    if (typeof Storage != 'undefined' && localStorage) {
      if (Engine._saveTimer != null) {
        clearTimeout(Engine._saveTimer);
      }
      if (typeof Engine._lastNotify == 'undefined' || Date.now() - Engine._lastNotify > Engine.SAVE_DISPLAY) {
        $('#saveNotify').css('opacity', 1).animate({ opacity: 0 }, 1000, 'linear');
        Engine._lastNotify = Date.now();
      }
      localStorage.gameState = JSON.stringify(State);
    }
  },

  loadGame: function () {
    try {
      var savedState = JSON.parse(localStorage.gameState);
      if (savedState) {
        State = savedState;
        $SM.updateOldState();
        Engine.log("loaded save!");
      }
    } catch (e) {
      State = {};
      $SM.set('version', Engine.VERSION);
      Engine.event('progress', 'new game');
    }
  },

  exportImport: function () {
    Events.startEvent({
      title: '导出 / 导入',
      scenes: {
        start: {
          text: ['导入导出游戏, 备份游戏',
            '或者从其他地方导入'],
          buttons: {
            'export': {
              text: '导出',
              onChoose: Engine.export64
            },
            'import': {
              text: '导入',
              nextScene: { 1: 'confirm' },
            },
            'cancel': {
              text: '取消',
              nextScene: 'end'
            }
          }
        },
        'confirm': {
          text: ['确定么?',
            '如果导入存档非法, 存档将丢失.',
            '本过程不可逆.'],
          buttons: {
            'yes': {
              text: '是',
              nextScene: 'end',
              onChoose: Engine.import64
            },
            'no': {
              text: '否',
              nextScene: 'end'
            }
          }
        }
      }
    });
  },

  export64: function () {
    Engine.saveGame();
    var string64 = Base64.encode(localStorage.gameState);
    string64 = string64.replace(/\s/g, '');
    string64 = string64.replace(/\./g, '');
    string64 = string64.replace(/\n/g, '');
    Events.startEvent({
      title: 'Export',
      scenes: {
        start: {
          text: ['导出存档.'],
          textarea: string64,
          buttons: {
            'done': {
              text: '搞定',
              nextScene: 'end'
            }
          }
        }
      }
    });
  },

  import64: function () {
    var string64 = prompt("put the save code here.", "");
    string64 = string64.replace(/\s/g, '');
    string64 = string64.replace(/\./g, '');
    string64 = string64.replace(/\n/g, '');
    var decodedSave = Base64.decode(string64);
    localStorage.gameState = decodedSave;
    location.reload();
  },

  event: function (cat, act) {
    if (typeof ga === 'function') {
      ga('send', 'event', cat, act);
    }
  },

  confirmDelete: function () {
    Events.startEvent({
      title: '消除存档?',
      scenes: {
        start: {
          text: ['彻底重新开始新游戏?'],
          buttons: {
            'yes': {
              text: '是',
              nextScene: 'end',
              onChoose: Engine.deleteSave
            },
            'no': {
              text: '否',
              nextScene: 'end'
            }
          }
        }
      }
    });
  },

  deleteSave: function (noReload) {
    if (typeof Storage != 'undefined' && localStorage) {
      var prestige = Prestige.get();
      window.State = {};
      localStorage.clear();
      Prestige.set(prestige);
    }
    if (!noReload) {
      location.reload();
    }
  },

  share: function () {
    Events.startEvent({
      title: 'Share',
      scenes: {
        start: {
          text: ['bring your friends.'],
          buttons: {
            'facebook': {
              text: 'facebook',
              nextScene: 'end',
              onChoose: function () {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + Engine.SITE_URL, 'sharer', 'width=626,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
              }
            },
            'google': {
              text: 'google+',
              nextScene: 'end',
              onChoose: function () {
                window.open('https://plus.google.com/share?url=' + Engine.SITE_URL, 'sharer', 'width=480,height=436,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no');
              }
            },
            'twitter': {
              text: 'twitter',
              onChoose: function () {
                window.open('https://twitter.com/intent/tweet?text=A%20Dark%20Room&url=' + Engine.SITE_URL, 'sharer', 'width=660,height=260,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
              },
              nextScene: 'end'
            },
            'reddit': {
              text: 'reddit',
              onChoose: function () {
                window.open('http://www.reddit.com/submit?url=' + Engine.SITE_URL, 'sharer', 'width=960,height=700,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no');
              },
              nextScene: 'end'
            },
            'close': {
              text: 'close',
              nextScene: 'end'
            }
          }
        }
      }
    }, { width: '400px' });
  },

  findStylesheet: function (title) {
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i];
      if (sheet.title == title) {
        return sheet;
      }
    }
    return null;
  },

  isLightsOff: function () {
    var darkCss = Engine.findStylesheet('darkenLights');
    if (darkCss != null) {
      if (darkCss.disabled)
        return false;
      return true;
    }
    return false;
  },

  turnLightsOff: function () {
    var darkCss = Engine.findStylesheet('darkenLights');
    if (darkCss == null) {
      $('head').append('<link rel="stylesheet" href="css/dark.css" type="text/css" title="darkenLights" />');
      Engine.turnLightsOff;
      $('.lightsOff').text('开灯.');
    }
    else if (darkCss.disabled) {
      darkCss.disabled = false;
      $('.lightsOff').text('开灯.');
    }
    else {
      $("#darkenLights").attr("disabled", "disabled");
      darkCss.disabled = true;
      $('.lightsOff').text('关灯.');
    }
  },

  // Gets a guid
  getGuid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  activeModule: null,

  travelTo: function (module) {
    if (Engine.activeModule != module) {
      var currentIndex = Engine.activeModule ? $('.location').index(Engine.activeModule.panel) : 1;
      $('div.headerButton').removeClass('selected');
      module.tab.addClass('selected');

      var slider = $('#locationSlider');
      var stores = $('#storesContainer');
      var panelIndex = $('.location').index(module.panel);
      var diff = Math.abs(panelIndex - currentIndex);
      slider.animate({ left: -(panelIndex * 700) + 'px' }, 300 * diff);

      if ($SM.get('stores["木头"]') != undefined) {
        // FIXME Why does this work if there's an animation queue...?
        stores.animate({ right: -(panelIndex * 700) + 'px' }, 300 * diff);
      }

      Engine.activeModule = module;

      module.onArrival(diff);

      if (Engine.activeModule == Room || Engine.activeModule == Path) {
        // Don't fade out the weapons if we're switching to a module
        // where we're going to keep showing them anyway.
        if (module != Room && module != Path) {
          $('div#weapons').animate({ opacity: 0 }, 300);
        }
      }

      if (module == Room || module == Path) {
        $('div#weapons').animate({ opacity: 1 }, 300);
      }



      Notifications.printQueue(module);
    }
  },

  // Move the stores panel beneath top_container (or to top: 0px if top_container
  // either hasn't been filled in or is null) using transition_diff to sync with
  // the animation in Engine.travelTo().
  moveStoresView: function (top_container, transition_diff) {
    var stores = $('#storesContainer');

    // If we don't have a storesContainer yet, leave.
    if (typeof (stores) === 'undefined') return;

    if (typeof (transition_diff) === 'undefined') transition_diff = 1;

    if (top_container === null) {
      stores.animate({ top: '0px' }, { queue: false, duration: 300 * transition_diff });
    }
    else if (!top_container.length) {
      stores.animate({ top: '0px' }, { queue: false, duration: 300 * transition_diff });
    }
    else {
      stores.animate({ top: top_container.height() + 26 + 'px' },
        { queue: false, duration: 300 * transition_diff });
    }
  },

  log: function (msg) {
    if (this._log) {
      console.log(msg);
    }
  },

  updateSlider: function () {
    var slider = $('#locationSlider');
    slider.width((slider.children().length * 700) + 'px');
  },

  updateOuterSlider: function () {
    var slider = $('#outerSlider');
    slider.width((slider.children().length * 700) + 'px');
  },

  getIncomeMsg: function (num, delay) {
    return (num > 0 ? "+" : "") + num + " 每" + delay + "秒";
  },

  keyDown: function (e) {
    if (!Engine.keyPressed && !Engine.keyLock) {
      Engine.pressed = true;
      if (Engine.activeModule.keyDown) {
        Engine.activeModule.keyDown(e);
      }
    }
    return false;
  },

  keyUp: function (e) {
    Engine.pressed = false;
    if (Engine.activeModule.keyUp) {
      Engine.activeModule.keyUp(e);
    }
    else {
      switch (e.which) {
        case 38: // Up
        case 87:
          Engine.log('up');
          break;
        case 40: // Down
        case 83:
          Engine.log('down');
          break;
        case 37: // Left
        case 65:
          if (Engine.activeModule == Ship && Path.tab)
            Engine.travelTo(Path);
          else if (Engine.activeModule == Path && Outside.tab)
            Engine.travelTo(Outside);
          else if (Engine.activeModule == Outside && Room.tab)
            Engine.travelTo(Room);
          Engine.log('left');
          break;
        case 39: // Right
        case 68:
          if (Engine.activeModule == Room && Outside.tab)
            Engine.travelTo(Outside);
          else if (Engine.activeModule == Outside && Path.tab)
            Engine.travelTo(Path);
          else if (Engine.activeModule == Path && Ship.tab)
            Engine.travelTo(Ship);
          Engine.log('right');
          break;
      }
    }

    return false;
  },

  swipeLeft: function (e) {
    if (Engine.activeModule.swipeLeft) {
      Engine.activeModule.swipeLeft(e);
    }
  },

  swipeRight: function (e) {
    if (Engine.activeModule.swipeRight) {
      Engine.activeModule.swipeRight(e);
    }
  },

  swipeUp: function (e) {
    if (Engine.activeModule.swipeUp) {
      Engine.activeModule.swipeUp(e);
    }
  },

  swipeDown: function (e) {
    if (Engine.activeModule.swipeDown) {
      Engine.activeModule.swipeDown(e);
    }
  },

  handleStateUpdates: function (e) {

  }
};

//create jQuery Callbacks() to handle object events 
$.Dispatch = function (id) {
  var callbacks,
    topic = id && Engine.topics[id];
  if (!topic) {
    callbacks = jQuery.Callbacks();
    topic = {
      publish: callbacks.fire,
      subscribe: callbacks.add,
      unsubscribe: callbacks.remove
    };
    if (id) {
      Engine.topics[id] = topic;
    }
  }
  return topic;
};

$(function () {
  Engine.init();
});

/**
 * state_manager
 * 
 */
/*
 * Module for handling States
 * 
 * All states should be get and set through the StateManager ($SM).
 * 
 * The manager is intended to handle all needed checks and error catching.
 * This includes creating the parents of layered/deep states so undefined states
 * do not need to be tested for and created beforehand.
 * 
 * When a state is changed, an update event is sent out containing the name of the state
 * changed or in the case of multiple changes (.setM, .addM) the parent class changed.
 * Event: type: 'stateUpdate', stateName: <path of state or parent state>
 * 
 * Original file created by: Michael Galusha
 */

var StateManager = {

  MAX_STORE: 99999999999999,

  options: {},

  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    //create categories
    var cats = [
      'features',		//big features like buildings, location availability, unlocks, etc
      'stores', 		//little stuff, items, weapons, etc
      'character', 	//this is for player's character stats such as perks
      'income',
      'timers',
      'game', 		//mostly location related: fire temp, workers, population, world map, etc
      'playStats',	//anything play related: play time, loads, etc
      'previous' 		// prestige, score, trophies (in future), achievements (again, not yet), etc
    ];

    for (var which in cats) {
      if (!$SM.get(cats[which])) $SM.set(cats[which], {});
    };

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe($SM.handleStateUpdates);
  },

  //create all parents and then set state
  createState: function (stateName, value) {
    var words = stateName.split(/[.\[\]'"]+/);
    //for some reason there are sometimes empty strings
    for (var i = 0; i < words.length; i++) {
      if (words[i] == '') {
        words.splice(i, 1);
        i--;
      }
    };
    var obj = State;
    var w = null;
    for (var i = 0, len = words.length - 1; i < len; i++) {
      w = words[i];
      if (obj[w] === undefined) obj[w] = {};
      obj = obj[w];
    }
    obj[words[i]] = value;
    return obj;
  },

  //set single state
  //if noEvent is true, the update event won't trigger, useful for setting multiple states first
  set: function (stateName, value, noEvent) {
    var fullPath = $SM.buildPath(stateName);

    //make sure the value isn't over the engine maximum
    if (typeof value == 'number' && value > $SM.MAX_STORE) value = $SM.MAX_STORE;

    try {
      eval('(' + fullPath + ') = value');
    } catch (e) {
      //parent doesn't exist, so make parent
      $SM.createState(stateName, value);
    }

    //stores values can not be negative
    if (stateName.indexOf('stores') == 0 && $SM.get(stateName, true) < 0) {
      eval('(' + fullPath + ') = 0');
      Engine.log('WARNING: state:' + stateName + ' can not be a negative value. Set to 0 instead.');
    }

    if (!noEvent) {
      Engine.saveGame();
      $SM.fireUpdate(stateName);
    }
  },

  //sets a list of states
  setM: function (parentName, list, noEvent) {
    $SM.buildPath(parentName);

    //make sure the state exists to avoid errors,
    if ($SM.get(parentName) == undefined) $SM.set(parentName, {}, true);

    for (var k in list) {
      $SM.set(parentName + '["' + k + '"]', list[k], true);
    }

    if (!noEvent) {
      Engine.saveGame();
      $SM.fireUpdate(parentName);
    }
  },

  //shortcut for altering number values, return 1 if state wasn't a number
  add: function (stateName, value, noEvent) {
    var err = 0;
    //0 if undefined, null (but not {}) should allow adding to new objects
    //could also add in a true = 1 thing, to have something go from existing (true)
    //to be a count, but that might be unwanted behavior (add with loose eval probably will happen anyways)
    var old = $SM.get(stateName, true);

    //check for NaN (old != old) and non number values
    if (old != old) {
      Engine.log('WARNING: ' + stateName + ' was corrupted (NaN). Resetting to 0.');
      old = 0;
      $SM.set(stateName, old + value, noEvent);
    } else if (typeof old != 'number' || typeof value != 'number') {
      Engine.log('WARNING: Can not do math with state:' + stateName + ' or value:' + value + ' because at least one is not a number.');
      err = 1;
    } else {
      $SM.set(stateName, old + value, noEvent); //setState handles event and save
    }

    return err;
  },

  //alters multiple number values, return number of fails
  addM: function (parentName, list, noEvent) {
    var err = 0;

    //make sure the parent exists to avoid errors
    if ($SM.get(parentName) == undefined) $SM.set(parentName, {}, true);

    for (var k in list) {
      if (!$SM.add(parentName + '["' + k + '"]', list[k], true)) err++;
    }

    if (!noEvent) {
      Engine.saveGame();
      $SM.fireUpdate(parentName);
    }
    return err;
  },

  //return state, undefined or 0
  get: function (stateName, requestZero) {
    var whichState = null;
    var fullPath = $SM.buildPath(stateName);

    //catch errors if parent of state doesn't exist
    try {
      eval('whichState = (' + fullPath + ')');
    } catch (e) {
      whichState = undefined;
    }

    //prevents repeated if undefined, null, false or {}, then x = 0 situations
    if ((!whichState || whichState == {}) && requestZero) return 0;
    else return whichState;
  },

  //mainly for local copy use, add(M) can fail so we can't shortcut them
  //since set does not fail, we know state exists and can simply return the object
  setget: function (stateName, value, noEvent) {
    $SM.set(stateName, value, noEvent);
    return eval('(' + $SM.buildPath(stateName) + ')');
  },

  remove: function (stateName, noEvent) {
    var whichState = $SM.buildPath(stateName);
    try {
      eval('(delete ' + whichState + ')');
    } catch (e) {
      //it didn't exist in the first place
      Engine.log('WARNING: Tried to remove non-existant state \'' + stateName + '\'.');
    }
    if (!noEvent) {
      Engine.saveGame();
      $SM.fireUpdate(stateName);
    };
  },

  //creates full reference from input
  //hopefully this won't ever need to be more complicated
  buildPath: function (input) {
    var dot = (input.charAt(0) == '[') ? '' : '.'; //if it starts with [foo] no dot to join
    return 'State' + dot + input;
  },

  fireUpdate: function (stateName, save) {
    var category = $SM.getCategory(stateName);
    if (stateName == undefined) stateName = category = 'all'; //best if this doesn't happen as it will trigger more stuff
    $.Dispatch('stateUpdate').publish({ 'category': category, 'stateName': stateName });
    if (save) Engine.saveGame();
  },

  getCategory: function (stateName) {
    var firstOB = stateName.indexOf('[');
    var firstDot = stateName.indexOf('.');
    var cutoff = null;
    if (firstOB == -1 || firstDot == -1) {
      cutoff = firstOB > firstDot ? firstOB : firstDot;
    } else {
      cutoff = firstOB < firstDot ? firstOB : firstDot;
    }
    if (cutoff == -1) {
      return stateName;
    } else {
      return stateName.substr(0, cutoff);
    }
  },

  //Use this function to make old save games compatible with new version
  updateOldState: function () {
    var version = $SM.get('version');
    if (typeof version != 'number') version = 1.0;
    if (version == 1.0) {
      // v1.1 introduced the Lodge, so get rid of lodgeless hunters
      $SM.remove('outside.workers["捕猎手"]', true);
      $SM.remove('income["捕猎手"]', true);
      Engine.log('upgraded save to v1.1');
      version = 1.1;
    };
    if (version == 1.1) {
      //v1.2 added the Swamp to the map, so add it to already generated maps
      if ($SM.get('world')) {
        World.placeLandmark(15, World.RADIUS * 1.5, World.TILE.SWAMP, $SM.get('world.map'));
      }
      Engine.log('upgraded save to v1.2');
      version = 1.2;
    };
    if (version == 1.2) {
      //StateManager added, so move data to new locations
      $SM.remove('room.fire');
      $SM.remove('room.temperature');
      $SM.remove('room.buttons');
      if ($SM.get('room')) {
        $SM.set('features.location.room', true);
        $SM.set('game.builder.level', $SM.get('room.builder'));
        $SM.remove('room');
      };
      if ($SM.get('outside')) {
        $SM.set('features.location.outside', true);
        $SM.set('game.population', $SM.get('outside.population'));
        $SM.set('game.buildings', $SM.get('outside.buildings'));
        $SM.set('game.workers', $SM.get('outside.workers'));
        $SM.set('game.outside.seenForest', $SM.get('outside.seenForest'));
        $SM.remove('outside');
      };
      if ($SM.get('world')) {
        $SM.set('features.location.world', true);
        $SM.set('game.world.map', $SM.get('world.map'));
        $SM.set('game.world.mask', $SM.get('world.mask'));
        $SM.set('starved', $SM.get('character.starved', true));
        $SM.set('dehydrated', $SM.get('character.dehydrated', true));
        $SM.remove('world');
        $SM.remove('starved');
        $SM.remove('dehydrated');
      };
      if ($SM.get('ship')) {
        $SM.set('features.location.spaceShip', true);
        $SM.set('game.spaceShip.hull', $SM.get('ship.hull', true));
        $SM.set('game.spaceShip.thrusters', $SM.get('ship.thrusters', true));
        $SM.set('game.spaceShip.seenWarning', $SM.get('ship.seenWarning'));
        $SM.set('game.spaceShip.seenShip', $SM.get('ship.seenShip'));
        $SM.remove('ship');
      };
      if ($SM.get('punches')) {
        $SM.set('character.punches', $SM.get('punches'));
        $SM.remove('punches');
      };
      if ($SM.get('perks')) {
        $SM.set('character.perks', $SM.get('perks'));
        $SM.remove('perks');
      };
      if ($SM.get('小偷')) {
        $SM.set('game["小偷"]', $SM.get('小偷'));
        $SM.remove('小偷');
      };
      if ($SM.get('stolen')) {
        $SM.set('game.stolen', $SM.get('stolen'));
        $SM.remove('stolen');
      };
      if ($SM.get('cityCleared')) {
        $SM.set('character.cityCleared', $SM.get('cityCleared'));
        $SM.remove('cityCleared');
      };
      $SM.set('version', 1.3);
    };
  },

  /******************************************************************
   * Start of specific state functions
   ******************************************************************/
  //PERKS
  addPerk: function (name) {
    $SM.set('character.perks["' + name + '"]', true);
    Notifications.notify(null, Engine.Perks[name].notify);
  },

  hasPerk: function (name) {
    return $SM.get('character.perks["' + name + '"]');
  },

  //INCOME
  setIncome: function (source, options) {
    var existing = $SM.get('income["' + source + '"]');
    if (typeof existing != 'undefined') {
      options.timeLeft = existing.timeLeft;
    }
    $SM.set('income["' + source + '"]', options);
  },

  getIncome: function (source) {
    var existing = $SM.get('income["' + source + '"]');
    if (typeof existing != 'undefined') {
      return existing;
    }
    return {};
  },

  collectIncome: function () {
    var changed = false;
    if (typeof $SM.get('income') != 'undefined' && Engine.activeModule != Space) {
      for (var source in $SM.get('income')) {
        var income = $SM.get('income["' + source + '"]');
        if (typeof income.timeLeft != 'number') {
          income.timeLeft = 0;
        }
        income.timeLeft--;

        if (income.timeLeft <= 0) {
          Engine.log('collection income from ' + source);
          if (source == '小偷') $SM.addStolen(income.stores);
          $SM.addM('stores', income.stores, true);
          changed = true;
          if (typeof income.delay == 'number') {
            income.timeLeft = income.delay;
          }
        }
      }
    }
    if (changed) {
      $SM.fireUpdate('income', true);
    };
    Engine._incomeTimeout = setTimeout($SM.collectIncome, 1000);
  },

  //Thieves
  addStolen: function (stores) {
    for (var k in stores) {
      var old = $SM.get('stores["' + k + '"]', true);
      var short = old - stores[k];
      //if they would steal more than actually owned
      if (short < 0) {
        $SM.add('game.stolen["' + k + '"]', (stores[k] * -1) + short);
      } else {
        $SM.add('game.stolen["' + k + '"]', stores[k] * -1);
      }
    };
  },

  startThieves: function () {
    $SM.set('game["小偷"]', 1);
    $SM.setIncome('小偷', {
      delay: 10,
      stores: {
        '木头': -10,
        '毛皮': -5,
        '肉': -5
      }
    });
  },

  //Misc
  num: function (name, craftable) {
    switch (craftable.type) {
      case 'good':
      case 'tool':
      case 'weapon':
      case 'upgrade':
        return $SM.get('stores["' + name + '"]', true);
      case 'building':
        return $SM.get('game.buildings["' + name + '"]', true);
    }
  },

  handleStateUpdates: function (e) {

  }
};

//alias
var $SM = StateManager;
/**
 * header
 * 
 */
/**
 * Module that takes care of header buttons
 */
var Header = {

  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );
  },

  options: {}, // Nothing for now

  canTravel: function () {
    return $('div#header div.headerButton').length > 1;
  },

  addLocation: function (text, id, module) {
    return $('<div>').attr('id', "location_" + id)
      .addClass('headerButton')
      .text(text).click(function () {
        if (Header.canTravel()) {
          Engine.travelTo(module);
        }
      }).appendTo($('div#header'));
  }
};
/**
 * notifications
 * 
 */
/**
 * Module that registers the notification box and handles messages
 */
var Notifications = {

  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    // Create the notifications box
    elem = $('<div>').attr({
      id: 'notifications',
      className: 'notifications'
    });
    // Create the transparency gradient
    $('<div>').attr('id', 'notifyGradient').appendTo(elem);

    elem.appendTo('div#wrapper');
  },

  options: {}, // Nothing for now

  elem: null,

  notifyQueue: {},

  // Allow notification to the player
  notify: function (module, text, noQueue) {
    if (typeof text == 'undefined') return;
    if (text.slice(-1) != ".") text += ".";
    if (module != null && Engine.activeModule != module) {
      if (!noQueue) {
        if (typeof this.notifyQueue[module] == 'undefined') {
          this.notifyQueue[module] = new Array();
        }
        this.notifyQueue[module].push(text);
      }
    } else {
      Notifications.printMessage(text);
    }
    Engine.saveGame();
  },

  printMessage: function (t) {
    var text = $('<div>').addClass('notification').css('opacity', '0').text(t).prependTo('div#notifications');
    text.animate({ opacity: 1 }, 500, 'linear');
  },

  printQueue: function (module) {
    if (typeof this.notifyQueue[module] != 'undefined') {
      while (this.notifyQueue[module].length > 0) {
        Notifications.printMessage(this.notifyQueue[module].shift());
      }
    }
  }
};
/**
 * events
 * 
 */
/**
 * Module that handles the random event system
 */
var Events = {

  _EVENT_TIME_RANGE: [3, 6], // range, in minutes
  _PANEL_FADE: 200,
  _FIGHT_SPEED: 100,
  _EAT_COOLDOWN: 5,
  _MEDS_COOLDOWN: 7,
  STUN_DURATION: 4000,

  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    // Build the Event Pool
    Events.EventPool = new Array().concat(
      Events.Global,
      Events.Room,
      Events.Outside
    );

    Events.eventStack = [];

    Events.scheduleNextEvent();

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Events.handleStateUpdates);
  },

  options: {}, // Nothing for now

  activeEvent: null,
  activeScene: null,
  eventPanel: null,

  loadScene: function (name) {
    Engine.log('loading scene: ' + name);
    Events.activeScene = name;
    var scene = Events.activeEvent().scenes[name];

    // Scene reward
    if (scene.reward) {
      $SM.addM('stores', scene.reward);
    }

    // onLoad
    if (scene.onLoad) {
      scene.onLoad();
    }

    // Notify the scene change
    if (scene.notification) {
      Notifications.notify(null, scene.notification);
    }

    $('#description', Events.eventPanel()).empty();
    $('#buttons', Events.eventPanel()).empty();
    if (scene.combat) {
      Events.startCombat(scene);
    } else {
      Events.startStory(scene);
    }
  },

  startCombat: function (scene) {
    Engine.event('game event', 'combat');
    Events.won = false;
    var desc = $('#description', Events.eventPanel());

    $('<div>').text(scene.notification).appendTo(desc);

    // Draw the wanderer
    Events.createFighterDiv('@', World.health, World.getMaxHealth()).attr('id', 'wanderer').appendTo(desc);

    // Draw the enemy
    Events.createFighterDiv(scene.chara, scene.health, scene.health).attr('id', 'enemy').appendTo(desc);

    // Draw the action buttons
    var btns = $('#buttons', Events.eventPanel());

    var numWeapons = 0;
    for (var k in World.Weapons) {
      var weapon = World.Weapons[k];
      if (typeof Path.outfit[k] == 'number' && Path.outfit[k] > 0) {
        if (typeof weapon.damage != 'number' || weapon.damage == 0) {
          // Weapons that deal no damage don't count
          numWeapons--;
        } else if (weapon.cost) {
          for (var c in weapon.cost) {
            var num = weapon.cost[c];
            if (typeof Path.outfit[c] != 'number' || Path.outfit[c] < num) {
              // Can't use this weapon, so don't count it
              numWeapons--;
            }
          }
        }
        numWeapons++;
        Events.createAttackButton(k).appendTo(btns);
      }
    }
    if (numWeapons == 0) {
      // No weapons? You can punch stuff!
      Events.createAttackButton('拳击').prependTo(btns);
    }

    Events.createEatMeatButton().appendTo(btns);
    if ((Path.outfit['医疗药剂'] || 0) != 0) {
      Events.createUseMedsButton().appendTo(btns);
    }

    // Set up the enemy attack timer
    Events._enemyAttackTimer = setTimeout(Events.enemyAttack, scene.attackDelay * 1000);
  },

  createEatMeatButton: function (cooldown) {
    if (cooldown == null) {
      cooldown = Events._EAT_COOLDOWN;
    }

    var btn = new Button.Button({
      id: 'eat',
      text: '吃腌肉',
      cooldown: cooldown,
      click: Events.eatMeat,
      cost: { '腌肉': 1 }
    });

    if (Path.outfit['腌肉'] == 0) {
      Button.setDisabled(btn, true);
    }

    return btn;
  },

  createUseMedsButton: function (cooldown) {
    if (cooldown == null) {
      cooldown = Events._MEDS_COOLDOWN;
    }

    var btn = new Button.Button({
      id: 'meds',
      text: '使用药剂',
      cooldown: cooldown,
      click: Events.useMeds,
      cost: { '医疗药剂': 1 }
    });

    if ((Path.outfit['医疗药剂'] || 0) == 0) {
      Button.setDisabled(btn, true);
    }

    return btn;
  },

  createAttackButton: function (weaponName) {
    var weapon = World.Weapons[weaponName];
    var cd = weapon.cooldown;
    if (weapon.type == 'unarmed') {
      if ($SM.hasPerk('降龙十八掌')) {
        cd /= 2;
      }
    }
    var btn = new Button.Button({
      id: 'attack_' + weaponName.replace(' ', '-'),
      text: weapon.verb,
      cooldown: cd,
      click: Events.useWeapon,
      cost: weapon.cost
    });
    if (typeof weapon.damage == 'number' && weapon.damage > 0) {
      btn.addClass('weaponButton');
    }

    for (var k in weapon.cost) {
      if (typeof Path.outfit[k] != 'number' || Path.outfit[k] < weapon.cost[k]) {
        Button.setDisabled(btn, true);
        break;
      }
    }

    return btn;
  },

  drawFloatText: function (text, parent) {
    $('<div>').text(text).addClass('damageText').appendTo(parent).animate({
      'bottom': '50px',
      'opacity': '0'
    },
      300,
      'linear',
      function () {
        $(this).remove();
      });
  },

  eatMeat: function () {
    if (Path.outfit['腌肉'] > 0) {
      Path.outfit['腌肉']--;
      World.updateSupplies();
      if (Path.outfit['腌肉'] == 0) {
        Button.setDisabled($('#eat'), true);
      }

      var hp = World.health;
      hp += World.meatHeal();
      hp = hp > World.getMaxHealth() ? World.getMaxHealth() : hp;
      World.setHp(hp);

      if (Events.activeEvent()) {
        var w = $('#wanderer');
        w.data('hp', hp);
        Events.updateFighterDiv(w);
        Events.drawFloatText('+' + World.meatHeal(), '#wanderer .hp');
      }
    }
  },

  useMeds: function () {
    if (Path.outfit['医疗药剂'] > 0) {
      Path.outfit['医疗药剂']--;
      World.updateSupplies();
      if (Path.outfit['医疗药剂'] == 0) {
        Button.setDisabled($('#meds'), true);
      }

      var hp = World.health;
      hp += World.medsHeal();
      hp = hp > World.getMaxHealth() ? World.getMaxHealth() : hp;
      World.setHp(hp);

      if (Events.activeEvent()) {
        var w = $('#wanderer');
        w.data('hp', hp);
        Events.updateFighterDiv(w);
        Events.drawFloatText('+' + World.medsHeal(), '#wanderer .hp');
      }
    }
  },

  useWeapon: function (btn) {
    if (Events.activeEvent()) {
      var weaponName = btn.attr('id').substring(7).replace('-', ' ');
      var weapon = World.Weapons[weaponName];
      if (weapon.type == 'unarmed') {
        if (!$SM.get('character.punches')) $SM.set('character.punches', 0);
        $SM.add('character.punches', 1);
        if ($SM.get('character.punches') == 50 && !$SM.hasPerk('通臂拳')) {
          $SM.addPerk('通臂拳');
        } else if ($SM.get('character.punches') == 150 && !$SM.hasPerk('金刚掌')) {
          $SM.addPerk('金刚掌');
        } else if ($SM.get('character.punches') == 300 && !$SM.hasPerk('降龙十八掌')) {
          $SM.addPerk('降龙十八掌');
        }

      }
      if (weapon.cost) {
        var mod = {};
        var out = false;
        for (var k in weapon.cost) {
          if (typeof Path.outfit[k] != 'number' || Path.outfit[k] < weapon.cost[k]) {
            return;
          }
          mod[k] = -weapon.cost[k];
          if (Path.outfit[k] - weapon.cost[k] < weapon.cost[k]) {
            out = true;
          }
        }
        for (var k in mod) {
          Path.outfit[k] += mod[k];
        }
        if (out) {
          Button.setDisabled(btn, true);
          var validWeapons = false;
          $('.weaponButton').each(function () {
            if (!Button.isDisabled($(this)) && $(this).attr('id') != 'attack_fists') {
              validWeapons = true;
              return false;
            }
          });
          if (!validWeapons) {
            // enable or create the punch button
            var fists = $('#attack_fists');
            if (fists.length == 0) {
              Events.createAttackButton('拳击').prependTo('#buttons', Events.eventPanel());
            } else {
              Button.setDisabled(fists, false);
            }
          }
        }
        World.updateSupplies();
      }
      var dmg = -1;
      if (Math.random() <= World.getHitChance()) {
        dmg = weapon.damage;
        if (typeof dmg == 'number') {
          if (weapon.type == 'unarmed' && $SM.hasPerk('通臂拳')) {
            dmg *= 2;
          }
          if (weapon.type == 'unarmed' && $SM.hasPerk('金刚掌')) {
            dmg *= 3;
          }
          if (weapon.type == 'unarmed' && $SM.hasPerk('降龙十八掌')) {
            dmg *= 2;
          }
          if (weapon.type == 'melee' && $SM.hasPerk('夺命连环三仙剑')) {
            dmg = Math.floor(dmg * 1.5);
          }
        }
      }

      var attackFn = weapon.type == 'ranged' ? Events.animateRanged : Events.animateMelee;
      attackFn($('#wanderer'), dmg, function () {
        if ($('#enemy').data('hp') <= 0 && !Events.won) {
          // Success!
          Events.winFight();
        }
      });
    }
  },

  animateMelee: function (fighter, dmg, callback) {
    var start, end, enemy;
    if (fighter.attr('id') == 'wanderer') {
      start = { 'left': '50%' };
      end = { 'left': '25%' };
      enemy = $('#enemy');
    } else {
      start = { 'right': '50%' };
      end = { 'right': '25%' };
      enemy = $('#wanderer');
    }

    fighter.stop(true, true).animate(start, Events._FIGHT_SPEED, function () {
      var enemyHp = enemy.data('hp');
      var msg = "";
      if (typeof dmg == 'number') {
        if (dmg < 0) {
          msg = 'miss';
          dmg = 0;
        } else {
          msg = '-' + dmg;
          enemyHp -= dmg;
          enemy.data('hp', enemyHp);
          if (fighter.attr('id') == 'enemy') {
            World.setHp(enemyHp);
          }
          Events.updateFighterDiv(enemy);
        }
      } else {
        if (dmg == 'stun') {
          msg = '困住了';
          enemy.data('困住了', true);
          setTimeout(function () {
            enemy.data('困住了', false);
          }, Events.STUN_DURATION);
        }
      }

      Events.drawFloatText(msg, $('.hp', enemy));

      $(this).animate(end, Events._FIGHT_SPEED, callback);
    });
  },

  animateRanged: function (fighter, dmg, callback) {
    var start, end, enemy;
    if (fighter.attr('id') == 'wanderer') {
      start = { 'left': '25%' };
      end = { 'left': '50%' };
      enemy = $('#enemy');
    } else {
      start = { 'right': '25%' };
      end = { 'right': '50%' };
      enemy = $('#wanderer');
    }

    $('<div>').css(start).addClass('bullet').text('o').appendTo('#description')
      .animate(end, Events._FIGHT_SPEED * 2, 'linear', function () {
        var enemyHp = enemy.data('hp');
        var msg = "";
        if (typeof dmg == 'number') {
          if (dmg < 0) {
            msg = 'miss';
            dmg = 0;
          } else {
            msg = '-' + dmg;
            enemyHp -= dmg;
            enemy.data('hp', enemyHp);
            if (fighter.attr('id') == 'enemy') {
              World.setHp(enemyHp);
            }
            Events.updateFighterDiv(enemy);
          }
        } else {
          if (dmg == 'stun') {
            msg = '困住了';
            enemy.data('困住了', true);
            setTimeout(function () {
              enemy.data('困住了', false);
            }, Events.STUN_DURATION);
          }
        }

        Events.drawFloatText(msg, $('.hp', enemy));

        $(this).remove();
        if (typeof callback == 'function') {
          callback();
        }
      });
  },

  enemyAttack: function () {

    var scene = Events.activeEvent().scenes[Events.activeScene];

    if (!$('#enemy').data('困住了')) {
      var toHit = scene.hit;
      toHit *= $SM.hasPerk('凌波微步') ? 0.8 : 1;
      var dmg = -1;
      if (Math.random() <= toHit) {
        dmg = scene.damage;
      }

      var attackFn = scene.ranged ? Events.animateRanged : Events.animateMelee;

      attackFn($('#enemy'), dmg, function () {
        if ($('#wanderer').data('hp') <= 0) {
          // Failure!
          clearTimeout(Events._enemyAttackTimer);
          Events.endEvent();
          World.die();
        }
      });
    }

    Events._enemyAttackTimer =
      setTimeout(Events.enemyAttack, scene.attackDelay * 1000);
  },

  winFight: function () {
    Events.won = true;
    clearTimeout(Events._enemyAttackTimer);
    $('#enemy').animate({ opacity: 0 }, 300, 'linear', function () {
      setTimeout(function () {
        try {
          var scene = Events.activeEvent().scenes[Events.activeScene];
          var desc = $('#description', Events.eventPanel());
          var btns = $('#buttons', Events.eventPanel());
          desc.empty();
          btns.empty();
          $('<div>').text(' ' + scene.enemy + (scene.plural ? ' ' : ' ') + ' 死了.').appendTo(desc);

          Events.drawLoot(scene.loot);

          if (scene.buttons) {
            // Draw the buttons
            Events.drawButtons(scene);
          } else {
            new Button.Button({
              id: 'leaveBtn',
              click: function () {
                var scene = Events.activeEvent().scenes[Events.activeScene];
                if (scene.nextScene && scene.nextScene != 'end') {
                  Events.loadScene(scene.nextScene);
                } else {
                  Events.endEvent();
                }
              },
              text: '离开'
            }).appendTo(btns);

            Events.createEatMeatButton(0).appendTo(btns);
            if ((Path.outfit['医疗药剂'] || 0) != 0) {
              Events.createUseMedsButton(0).appendTo(btns);
            }
          }
        } catch (e) {
          // It is possible to die and win if the timing is perfect. Just let it fail.
        }
      }, 1000);
    });
  },

  drawLoot: function (lootList) {
    var desc = $('#description', Events.eventPanel());
    var lootButtons = $('<div>').attr('id', 'lootButtons');
    for (var k in lootList) {
      var loot = lootList[k];
      if (Math.random() < loot.chance) {
        var num = Math.floor(Math.random() * (loot.max - loot.min)) + loot.min;
        new Button.Button({
          id: 'loot_' + k.replace(' ', '-'),
          text: k + ' [' + num + ']',
          click: Events.getLoot
        }).data('numLeft', num).appendTo(lootButtons);
      }
    }
    $('<div>').addClass('clear').appendTo(lootButtons);
    if (lootButtons.children().length > 1) {
      lootButtons.appendTo(desc);
    }
  },

  dropStuff: function (e) {
    e.stopPropagation();
    var btn = $(this);
    var thing = btn.data('thing');
    var num = btn.data('num');
    var lootButtons = $('#lootButtons');
    Engine.log('dropping ' + num + ' ' + thing);

    var lootBtn = $('#loot_' + thing.replace(' ', '-'), lootButtons);
    if (lootBtn.length > 0) {
      var curNum = lootBtn.data('numLeft');
      curNum += num;
      lootBtn.text(thing + ' [' + curNum + ']').data('numLeft', curNum);
    } else {
      new Button.Button({
        id: 'loot_' + thing.replace(' ', '-'),
        text: thing + ' [' + num + ']',
        click: Events.getLoot
      }).data('numLeft', num).insertBefore($('.clear', lootButtons));
    }
    Path.outfit[thing] -= num;
    Events.getLoot(btn.closest('.button'));
    World.updateSupplies();
  },

  getLoot: function (btn) {
    var name = btn.attr('id').substring(5).replace('-', ' ');
    if (btn.data('numLeft') > 0) {
      var weight = Path.getWeight(name);
      var freeSpace = Path.getFreeSpace();
      if (weight <= freeSpace) {
        var num = btn.data('numLeft');
        num--;
        btn.data('numLeft', num);
        if (num == 0) {
          Button.setDisabled(btn);
          btn.animate({ 'opacity': 0 }, 300, 'linear', function () {
            $(this).remove();
            if ($('#lootButtons').children().length == 1) {
              $('#lootButtons').remove();
            }
          });
        } else {
          // #dropMenu gets removed by this.
          btn.text(name + ' [' + num + ']');
        }
        var curNum = Path.outfit[name];
        curNum = typeof curNum == 'number' ? curNum : 0;
        curNum++;
        Path.outfit[name] = curNum;
        World.updateSupplies();

        // Update weight and free space variables so we can decide
        // whether or not to bring up/update the drop menu.
        weight = Path.getWeight(name);
        freeSpace = Path.getFreeSpace();
      }

      if (weight > freeSpace && btn.data('numLeft') > 0) {
        // Draw the drop menu
        Engine.log('drop menu');
        $('#dropMenu').remove();
        var dropMenu = $('<div>').attr('id', 'dropMenu');
        for (var k in Path.outfit) {
          var itemWeight = Path.getWeight(k);
          if (itemWeight > 0) {
            var numToDrop = Math.ceil((weight - freeSpace) / itemWeight);
            if (numToDrop > Path.outfit[k]) {
              numToDrop = Path.outfit[k];
            }
            if (numToDrop > 0) {
              var dropRow = $('<div>').attr('id', 'drop_' + k.replace(' ', '-'))
                .text(k + ' x' + numToDrop)
                .data('thing', k)
                .data('num', numToDrop)
                .click(Events.dropStuff);
              dropRow.appendTo(dropMenu);
            }
          }
        }
        dropMenu.appendTo(btn);
        btn.one("mouseleave", function () {
          $('#dropMenu').remove();
        });
      }
    }
  },

  createFighterDiv: function (chara, hp, maxhp) {
    var fighter = $('<div>').addClass('fighter').text(chara).data('hp', hp).data('maxHp', maxhp);
    $('<div>').addClass('hp').text(hp + '/' + maxhp).appendTo(fighter);
    return fighter;
  },

  updateFighterDiv: function (fighter) {
    $('.hp', fighter).text(fighter.data('hp') + '/' + fighter.data('maxHp'));
  },

  startStory: function (scene) {
    // Write the text
    var desc = $('#description', Events.eventPanel());
    for (var i in scene.text) {
      $('<div>').text(scene.text[i]).appendTo(desc);
    }

    if (scene.textarea) {
      $('<textarea>').val(scene.textarea).appendTo(desc);
    }

    // Draw any loot
    if (scene.loot) {
      Events.drawLoot(scene.loot);
    }

    // Draw the buttons
    Events.drawButtons(scene);
  },

  drawButtons: function (scene) {
    var btns = $('#buttons', Events.eventPanel());
    for (var id in scene.buttons) {
      var info = scene.buttons[id];
      var b = new Button.Button({
        id: id,
        text: info.text,
        cost: info.cost,
        click: Events.buttonClick
      }).appendTo(btns);
      if (typeof info.available == 'function' && !info.available()) {
        Button.setDisabled(b, true);
      }
    }

    Events.updateButtons();
  },

  updateButtons: function () {
    var btns = Events.activeEvent().scenes[Events.activeScene].buttons;
    for (var bId in btns) {
      var b = btns[bId];
      var btnEl = $('#' + bId, Events.eventPanel());
      if (typeof b.available == 'function' && !b.available()) {
        Button.setDisabled(btnEl, true);
      } else if (b.cost) {
        var disabled = false;
        for (var store in b.cost) {
          var num = Engine.activeModule == World ? Path.outfit[store] : $SM.get('stores["' + store + '"]', true);
          if (typeof num != 'number') num = 0;
          if (num < b.cost[store]) {
            // Too expensive
            disabled = true;
            break;
          }
        }
        Button.setDisabled(btnEl, disabled);
      }
    }
  },

  buttonClick: function (btn) {
    var info = Events.activeEvent().scenes[Events.activeScene].buttons[btn.attr('id')];
    // Cost
    var costMod = {};
    if (info.cost) {
      for (var store in info.cost) {
        var num = Engine.activeModule == World ? Path.outfit[store] : $SM.get('stores["' + store + '"]', true);
        if (typeof num != 'number') num = 0;
        if (num < info.cost[store]) {
          // Too expensive
          return;
        }
        costMod[store] = -info.cost[store];
      }
      if (Engine.activeModule == World) {
        for (var k in costMod) {
          Path.outfit[k] += costMod[k];
        }
        World.updateSupplies();
      } else {
        $SM.addM('stores', costMod);
      }
    }

    if (typeof info.onChoose == 'function') {
      info.onChoose();
    }

    // Reward
    if (info.reward) {
      $SM.addM('stores', info.reward);
    }

    Events.updateButtons();

    // Notification
    if (info.notification) {
      Notifications.notify(null, info.notification);
    }

    // Next Scene
    if (info.nextScene) {
      if (info.nextScene == 'end') {
        Events.endEvent();
      } else {
        var r = Math.random();
        var lowestMatch = null;
        for (var i in info.nextScene) {
          if (r < i && (lowestMatch == null || i < lowestMatch)) {
            lowestMatch = i;
          }
        }
        if (lowestMatch != null) {
          Events.loadScene(info.nextScene[lowestMatch]);
          return;
        }
        Engine.log('ERROR: no suitable scene found');
        Events.endEvent();
      }
    }
  },

  // Makes an event happen!
  triggerEvent: function () {
    if (Events.activeEvent() == null) {
      var possibleEvents = [];
      for (var i in Events.EventPool) {
        var event = Events.EventPool[i];
        if (event.isAvailable()) {
          possibleEvents.push(event);
        }
      }

      if (possibleEvents.length == 0) {
        Events.scheduleNextEvent(0.5);
        return;
      } else {
        var r = Math.floor(Math.random() * (possibleEvents.length));
        Events.startEvent(possibleEvents[r]);
      }
    }

    Events.scheduleNextEvent();
  },

  triggerFight: function () {
    var possibleFights = [];
    for (var i in Events.Encounters) {
      var fight = Events.Encounters[i];
      if (fight.isAvailable()) {
        possibleFights.push(fight);
      }
    }

    var r = Math.floor(Math.random() * (possibleFights.length));
    Events.startEvent(possibleFights[r]);
  },

  activeEvent: function () {
    if (Events.eventStack && Events.eventStack.length > 0) {
      return Events.eventStack[0];
    }
    return null;
  },

  eventPanel: function () {
    return Events.activeEvent().eventPanel;
  },

  startEvent: function (event, options) {
    if (event) {
      Engine.event('game event', 'event');
      Engine.keyLock = true;
      Events.eventStack.unshift(event);
      event.eventPanel = $('<div>').attr('id', 'event').addClass('eventPanel').css('opacity', '0');
      if (options != null && options.width != null) {
        Events.eventPanel().css('width', options.width);
      }
      $('<div>').addClass('eventTitle').text(Events.activeEvent().title).appendTo(Events.eventPanel());
      $('<div>').attr('id', 'description').appendTo(Events.eventPanel());
      $('<div>').attr('id', 'buttons').appendTo(Events.eventPanel());
      Events.loadScene('start');
      $('div#wrapper').append(Events.eventPanel());
      Events.eventPanel().animate({ opacity: 1 }, Events._PANEL_FADE, 'linear');
    }
  },

  scheduleNextEvent: function (scale) {
    var nextEvent = Math.floor(Math.random() * (Events._EVENT_TIME_RANGE[1] - Events._EVENT_TIME_RANGE[0])) + Events._EVENT_TIME_RANGE[0];
    if (scale > 0) { nextEvent *= scale; }
    Engine.log('next event scheduled in ' + nextEvent + ' minutes');
    Events._eventTimeout = setTimeout(Events.triggerEvent, nextEvent * 60 * 1000);
  },

  endEvent: function () {
    Events.eventPanel().animate({ opacity: 0 }, Events._PANEL_FADE, 'linear', function () {
      Events.eventPanel().remove();
      Events.activeEvent().eventPanel = null;
      Events.eventStack.shift();
      Engine.log(Events.eventStack.length + ' events remaining');
      Engine.keyLock = false;
      // Force refocus on the body. I hate you, IE.
      $('body').focus();
    });
  },

  handleStateUpdates: function (e) {
    if (e.category == 'stores' && Events.activeEvent() != null) {
      Events.updateButtons();
    }
  }
};
/**
 * room
 * 
 */
/**
 * Module that registers the simple room functionality
 */
var Room = {
  // times in (minutes * seconds * milliseconds)
  _FIRE_COOL_DELAY: 5 * 60 * 1000, // time after a stoke before the fire cools
  _ROOM_WARM_DELAY: 30 * 1000, // time between room temperature updates
  _BUILDER_STATE_DELAY: 0.5 * 60 * 1000, // time between builder state updates
  _STOKE_COOLDOWN: 10, // cooldown to stoke the fire
  _NEED_WOOD_DELAY: 15 * 1000, // from when the stranger shows up, to when you need wood

  fire: null,
  temperature: null,
  buttons: {},

  Craftables: {
    '陷阱': {
      button: null,
      maximum: 10,
      availableMsg: '工人说她能制作可以捕获活的猎物的陷阱',
      buildMsg: '更多的陷阱能捕获更多的猎物',
      maxMsg: "更多数量的陷阱已经不能带来益处",
      type: 'building',
      cost: function () {
        var n = $SM.get('game.buildings["陷阱"]', true);
        return {
          '木头': 10 + (n * 10)
        };
      }
    },
    '筐子': {
      button: null,
      maximum: 1,
      availableMsg: '工人说她能制作收集木头的筐子',
      buildMsg: '软筐能容纳更多的木头',
      type: 'building',
      cost: function () {
        return {
          '木头': 30
        };
      }
    },
    '木屋': {
      button: null,
      maximum: 20,
      availableMsg: "工人说会有更多的迷路者来到这里, 他们也会加入我们.",
      buildMsg: '工人在森林里搭起一座木屋.',
      maxMsg: '没有空间建造木屋了.',
      type: 'building',
      cost: function () {
        var n = $SM.get('game.buildings["木屋"]', true);
        return {
          '木头': 100 + (n * 50)
        };
      }
    },
    '猎人小屋': {
      button: null,
      maximum: 1,
      availableMsg: '我们的村民只要有了工具, 他们就能去打猎',
      buildMsg: '猎人小屋就坐落在村子口',
      type: 'building',
      cost: function () {
        return {
          '木头': 200,
          '毛皮': 10,
          '肉': 5
        };
      }
    },
    '贸易栈': {
      button: null,
      maximum: 1,
      availableMsg: "有了贸易栈你就能很灵活的调度物资",
      buildMsg: "游牧民族们可以有地方落脚了",
      type: 'building',
      cost: function () {
        return {
          '木头': 400,
          '毛皮': 100
        };
      }
    },
    '制革坊': {
      button: null,
      maximum: 1,
      availableMsg: "工人说皮革很有用, 我们的村民能搞定.",
      buildMsg: '游牧民族们可以有地方落脚了',
      type: 'building',
      cost: function () {
        return {
          '木头': 500,
          '毛皮': 50
        };
      }
    },
    '腌肉坊': {
      button: null,
      maximum: 1,
      availableMsg: "工人说如果不腌制, 鲜肉很快就会腐烂, 她有办法.",
      buildMsg: '工人很快建成了腌制房, 她很想吃腊肉, 川味的.',
      type: 'building',
      cost: function () {
        return {
          '木头': 600,
          '肉': 50
        };
      }
    },
    '工具房': {
      button: null,
      maximum: 1,
      availableMsg: "工人说如果有合适的工具, 她能做的更好",
      buildMsg: "工具间总算完工了, 工人兴奋极了",
      type: 'building',
      cost: function () {
        return {
          '木头': 800,
          '皮革': 100,
          '鳞片': 10
        };
      }
    },
    '炼钢炉': {
      button: null,
      maximum: 1,
      availableMsg: "工人说只要有合适的工具, 村名可以炼钢",
      buildMsg: "炼钢炉起, 雾霾就来了",
      type: 'building',
      cost: function () {
        return {
          '木头': 1500,
          '铁': 100,
          '煤': 100
        };
      }
    },
    '军械库': {
      button: null,
      maximum: 1,
      availableMsg: "工人说稳定的武器和弹药供应是必要的",
      buildMsg: "军械库完成! 武器入库.",
      type: 'building',
      cost: function () {
        return {
          '木头': 3000,
          '钢': 100,
          '硫磺': 50
        };
      }
    },
    '火炬': {
      button: null,
      type: 'tool',
      buildMsg: '用以驱散黑暗的火炬',
      cost: function () {
        return {

          '木头': 1,
          '布匹': 1
        };
      }
    },
    '水袋': {
      //'水袋': {
      button: null,
      type: 'upgrade',
      maximum: 1,
      buildMsg: '水袋..就是用来放水的, 可惜容量小了点',
      cost: function () {
        return {
          '皮革': 50
        };
      }
    },
    '水桶': {
      button: null,
      type: 'upgrade',
      maximum: 1,
      buildMsg: '木桶可以存放不少的水, 探险能持续更久',
      cost: function () {
        return {

          '皮革': 100,
          '铁': 20
        };
      }
    },
    '水箱': {
      button: null,
      type: 'upgrade',
      maximum: 1,
      buildMsg: '你再也不会缺水了.',
      cost: function () {
        return {

          '铁': 100,
          '钢': 50
        };
      }
    },


    '骨枪': {
      //'bone spear': {
      button: null,
      type: 'weapon',
      buildMsg: "这枪有点糙, 但是用来突刺已经足够了",
      cost: function () {
        return {
          '木头': 100,
          '牙齿': 5
        };
      }
    },
    '旅行包': {
      button: null,
      type: 'upgrade',
      maximum: 1,
      buildMsg: '载得更多意味着更长更远的野外探险',
      cost: function () {
        return {
          '皮革': 200
        };
      }
    },
    '货车': {
      button: null,
      type: 'upgrade',
      maximum: 1,
      buildMsg: '货车可以载很多的物资供给',
      cost: function () {
        return {
          '木头': 500,
          '铁': 100
        };
      }
    },
    '大货车': {
      button: null,
      type: 'upgrade',
      maximum: 1,
      buildMsg: '超级大货车可以装载一切',
      cost: function () {
        return {
          '木头': 1000,
          '铁': 200,
          '钢': 100
        };
      }
    },
    '皮甲': {
      type: 'upgrade',
      maximum: 1,
      buildMsg: "皮革的确不是太牢固, 但总好过布料.",
      cost: function () {
        return {
          '皮革': 200,
          '鳞片': 20
        };
      }
    },
    '铁甲': {
      type: 'upgrade',
      maximum: 1,
      buildMsg: "铁比皮结实",
      cost: function () {
        return {
          '皮革': 200,
          '铁': 100
        };
      }
    },
    '钢甲': {
      type: 'upgrade',
      maximum: 1,
      buildMsg: "钢又比铁更牢固",
      cost: function () {
        return {
          '皮革': 200,
          '钢': 100
        };
      }
    },
    '铁剑': {
      button: null,
      type: 'weapon',
      buildMsg: "铁剑很尖锐, 在野外提供给我们足够的保护.",
      cost: function () {
        return {
          '木头': 200,
          '皮革': 50,
          '铁': 20
        };
      }
    },
    '钢剑': {
      button: null,
      type: 'weapon',
      buildMsg: "钢剑很锋利, 很可怕.",
      cost: function () {
        return {
          '木头': 500,
          '皮革': 100,
          '钢': 20
        };
      }
    },
    '步枪': {
      type: 'weapon',
      buildMsg: "黑火药和子弹, 好复古的感觉.",
      cost: function () {
        return {
          '木头': 200,
          '钢': 50,
          '硫磺': 50
        };
      }
    }
  },

  TradeGoods: {
    '鳞片': {
      type: 'good',
      cost: function () {
        return {
          '毛皮': 150
        };
      }
    },
    '牙齿': {
      type: 'good',
      cost: function () {
        return {
          '毛皮': 300
        };
      }
    },
    '铁': {
      type: 'good',
      cost: function () {
        return {
          '毛皮': 150,
          '鳞片': 50
        };
      }
    },
    '煤': {
      type: 'good',
      cost: function () {
        return {
          '毛皮': 200,
          '牙齿': 50
        };
      }
    },
    '钢': {
      type: 'good',
      cost: function () {
        return {
          '毛皮': 300,
          '鳞片': 50,
          '牙齿': 50
        };
      }
    },
    '医疗药剂': {
      type: 'good',
      cost: function () {
        return {
          '鳞片': 50, '牙齿': 30
        };
      }
    },
    '子弹': {
      type: 'good',
      cost: function () {
        return {
          '鳞片': 10
        };
      }
    },
    '燃料电池': {
      type: 'good',
      cost: function () {
        return {
          '鳞片': 10,
          '牙齿': 10
        };
      }
    },
    '链球': {
      type: 'weapon',
      cost: function () {
        return {
          '牙齿': 10
        };
      }
    },
    '手雷': {
      type: 'weapon',
      cost: function () {
        return {
          '鳞片': 100,
          '牙齿': 50
        };
      }
    },
    '刺刀': {
      type: 'weapon',
      cost: function () {
        return {
          '鳞片': 500,
          '牙齿': 250
        };
      }
    },
    '外星合金': {
      type: 'good',
      cost: function () {
        return {
          '毛皮': 1500,
          '鳞片': 750,
          '牙齿': 300
        };
      }
    },
    '罗盘': {
      type: 'upgrade',
      maximum: 1,
      cost: function () {
        return {
          '毛皮': 400,
          '鳞片': 20,
          '牙齿': 10
        };
      }
    }
  },

  MiscItems: {
    '镭射枪': {
      type: 'weapon'
    }
  },

  name: "Room",
  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    if (Engine._debug) {
      this._ROOM_WARM_DELAY = 5000;
      this._BUILDER_STATE_DELAY = 5000;
      this._STOKE_COOLDOWN = 0;
      this._NEED_WOOD_DELAY = 5000;
    }

    if (typeof $SM.get('features.location.room') == 'undefined') {
      $SM.set('features.location.room', true);
      $SM.set('game.builder.level', -1);
    }

    Room.temperature = this.TempEnum.Cold;
    Room.fire = this.FireEnum.Dead;


    // Create the room tab
    this.tab = Header.addLocation("冰冷漆黑的木屋", "room", Room);

    // Create the Room panel
    this.panel = $('<div>')
      .attr('id', "roomPanel")
      .addClass('location')
      .appendTo('div#locationSlider');

    Engine.updateSlider();

    // Create the light button
    new Button.Button({
      id: 'lightButton',
      text: '点火',
      click: Room.lightFire,
      cooldown: Room._STOKE_COOLDOWN,
      width: '80px',
      //cost: {'木头': 1}
      cost: { '木头': 5 }
    }).appendTo('div#roomPanel');

    // Create the stoke button
    new Button.Button({
      id: 'stokeButton',
      text: "添加木头",
      click: Room.stokeFire,
      cooldown: Room._STOKE_COOLDOWN,
      width: '80px',
      cost: { '木头': 1 }
    }).appendTo('div#roomPanel');

    // Create the stores container
    $('<div>').attr('id', 'storesContainer').appendTo('div#roomPanel');

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Room.handleStateUpdates);

    Room.updateButton();
    Room.updateStoresView();
    Room.updateIncomeView();
    Room.updateBuildButtons();

    Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
    Room._tempTimer = setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);

    /*
     * Builder states:
     * 0 - Approaching
     * 1 - Collapsed
     * 2 - Shivering
     * 3 - Sleeping
     * 4 - Helping
     */
    if ($SM.get('game.builder.level') >= 0 && $SM.get('game.builder.level') < 3) {
      Room._builderTimer = setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
    }
    if ($SM.get('game.builder.level') == 1 && $SM.get('stores["木头"]', true) < 0) {
      setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
    }
    setTimeout($SM.collectIncome, 1000);

    Notifications.notify(Room, "木屋 " + Room.temperature.text);
    Notifications.notify(Room, "火堆 " + Room.fire.text);
  },

  options: {}, // Nothing for now

  onArrival: function (transition_diff) {
    Room.setTitle();
    if (Room.changed) {
      Notifications.notify(Room, "火堆 " + Room.fire.text);
      Notifications.notify(Room, "木屋 " + Room.temperature.text);
      Room.changed = false;
    }
    if ($SM.get('game.builder.level') == 3) {
      $SM.add('game.builder.level', 1);
      $SM.setIncome('工人', {
        delay: 10,
        stores: { '木头': 2 }
      });
      Room.updateIncomeView();
      Notifications.notify(Room, "陌生人围坐在火堆旁, 她说她会帮忙建造建筑或者制造物件工具.");
    }

    Engine.moveStoresView(null, transition_diff);
  },

  TempEnum: {
    fromInt: function (value) {
      for (var k in this) {
        if (typeof this[k].value != 'undefined' && this[k].value == value) {
          return this[k];
        }
      }
      return null;
    },
    Freezing: { value: 0, text: '极度深寒' },
    Cold: { value: 1, text: '很冷' },
    Mild: { value: 2, text: '不冷不热' },
    Warm: { value: 3, text: '温暖' },
    Hot: { value: 4, text: '很热' }
  },

  FireEnum: {
    fromInt: function (value) {
      for (var k in this) {
        if (typeof this[k].value != 'undefined' && this[k].value == value) {
          return this[k];
        }
      }
      return null;
    },
    Dead: { value: 0, text: '熄灭了' },
    Smoldering: { value: 1, text: '冒烟了' },
    Flickering: { value: 2, text: '有火苗了' },
    Burning: { value: 3, text: '燃烧中' },
    Roaring: { value: 4, text: '熊熊燃烧中' }
  },

  setTitle: function () {
    var title = Room.fire.value < 2 ? "小黑屋" : "温暖的木屋";
    if (Engine.activeModule == this) {
      document.title = title;
    }
    $('div#location_room').text(title);
  },

  updateButton: function () {
    var light = $('#lightButton.button');
    var stoke = $('#stokeButton.button');
    if (Room.fire.value == Room.FireEnum.Dead.value && stoke.css('display') != 'none') {
      stoke.hide();
      light.show();
      if (stoke.hasClass('disabled')) {
        Button.cooldown(light);
      }
    } else if (light.css('display') != 'none') {
      stoke.show();
      light.hide();
      if (light.hasClass('disabled')) {
        Button.cooldown(stoke);
      }
    }

    if (!$SM.get('stores["木头"]')) {
      light.addClass('free');
      stoke.addClass('free');
    } else {
      light.removeClass('free');
      stoke.removeClass('free');
    }
  },

  _fireTimer: null,
  _tempTimer: null,
  lightFire: function () {
    var wood = $SM.get('stores["木头"]');
    if (wood < 5) {
      Notifications.notify(Room, "木头不足, 无法生火");
      Button.clearCooldown($('#lightButton.button'));
      return;
    } else if (wood > 4) {
      $SM.set('stores["木头"]', wood - 5);
    }
    Room.fire = Room.FireEnum.Burning;
    Room.onFireChange();
  },

  stokeFire: function () {
    var wood = $SM.get('stores["木头"]');
    if (wood === 0) {
      Notifications.notify(Room, "木头用光了");
      Button.clearCooldown($('#stokeButton.button'));
      return;
    }
    if (wood > 0) {
      $SM.set('stores["木头"]', wood - 1);
    }
    if (Room.fire.value < 4) {
      Room.fire = Room.FireEnum.fromInt(Room.fire.value + 1);
    }
    Room.onFireChange();
  },

  onFireChange: function () {
    if (Engine.activeModule != Room) {
      Room.changed = true;
    }
    Notifications.notify(Room, "火堆 " + Room.fire.text, true);
    if (Room.fire.value > 1 && $SM.get('game.builder.level') < 0) {
      $SM.set('game.builder.level', 0);
      Notifications.notify(Room, "火堆的光芒映过窗户射进了茫茫黑暗");
      setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
    }
    window.clearTimeout(Room._fireTimer);
    Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
    Room.updateButton();
    Room.setTitle();
  },

  coolFire: function () {
    var wood = $SM.get('stores["木头"]');
    if (Room.fire.value <= Room.FireEnum.Flickering.value &&
      $SM.get('game.builder.level') > 3 && wood > 0) {
      Notifications.notify(Room, "工人给火堆添加木头", true);
      $SM.set('stores["木头"]', wood - 1);
      Room.fire = Room.FireEnum.fromInt(Room.fire.value + 1);
    }
    if (Room.fire.value > 0) {
      Room.fire = Room.FireEnum.fromInt(Room.fire.value - 1);
      Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
      Room.onFireChange();
    }
  },

  adjustTemp: function () {
    var old = Room.temperature.value;
    if (Room.temperature.value > 0 && Room.temperature.value > Room.fire.value) {
      Room.temperature = Room.TempEnum.fromInt(Room.temperature.value - 1);
      Notifications.notify(Room, "木屋 " + Room.temperature.text, true);
    }
    if (Room.temperature.value < 4 && Room.temperature.value < Room.fire.value) {
      Room.temperature = Room.TempEnum.fromInt(Room.temperature.value + 1);
      Notifications.notify(Room, "木屋 " + Room.temperature.text, true);
    }
    if (Room.temperature.value != old) {
      Room.changed = true;
    }
    Room._tempTimer = setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);
  },

  unlockForest: function () {
    $SM.set('stores["木头"]', 4);
    Outside.init();
    Notifications.notify(Room, "外面寒风呼啸");
    Notifications.notify(Room, "木头快烧完了");
    Engine.event('progress', 'outside');
  },

  updateBuilderState: function () {
    var lBuilder = $SM.get('game.builder.level');
    if (lBuilder == 0) {
      Notifications.notify(Room, "一个衣衫褴褛的陌生人跌撞进门, 摔倒在墙角");
      lBuilder = $SM.setget('game.builder.level', 1);
      setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
    }
    else if (lBuilder < 3 && Room.temperature.value >= Room.TempEnum.Warm.value) {
      var msg = "";
      switch (lBuilder) {
        case 1:
          msg = "陌生人冻得发抖并且胡言乱语不知所云.";
          break;
        case 2:
          msg = "陌生人缩在墙角并不再发抖, 呼吸也平静下来了.";
          break;
      }
      Notifications.notify(Room, msg);
      if (lBuilder < 3) {
        lBuilder = $SM.setget('game.builder.level', lBuilder + 1);
      }
    }
    if (lBuilder < 3) {
      setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
    }
    Engine.saveGame();
  },

  updateStoresView: function () {
    var stores = $('div#stores');
    var weapons = $('div#weapons');
    var needsAppend = false, wNeedsAppend = false, newRow = false;
    if (stores.length == 0) {
      stores = $('<div>').attr({
        id: 'stores'
      }).css('opacity', 0);
      needsAppend = true;
    }
    if (weapons.length == 0) {
      weapons = $('<div>').attr({
        id: 'weapons'
      }).css('opacity', 0);
      wNeedsAppend = true;
    }
    for (var k in $SM.get('stores')) {

      var type = null;
      if (Room.Craftables[k]) {
        type = Room.Craftables[k].type;
      } else if (Room.TradeGoods[k]) {
        type = Room.TradeGoods[k].type;
      } else if (Room.MiscItems[k]) {
        type = Room.MiscItems[k].type;
      }

      var location;
      switch (type) {
        case 'upgrade':
          // Don't display upgrades on the Room screen
          continue;
        case 'weapon':
          location = weapons;
          break;
        default:
          location = stores;
          break;
      }

      var id = "row_" + k.replace(' ', '-');
      var row = $('div#' + id, location);
      var num = $SM.get('stores["' + k + '"]');

      if (typeof num != 'number' || isNaN(num)) {
        // No idea how counts get corrupted, but I have reason to believe that they occassionally do.
        // Build a little fence around it!
        num = 0;
        $SM.set('stores["' + k + '"]', 0);
      }


      // thieves?
      if (typeof $SM.get('game["小偷"]') == 'undefined' && num > 5000 && $SM.get('features.location.world')) {
        $SM.startThieves();
      }

      if (row.length == 0 && num > 0) {
        row = $('<div>').attr('id', id).addClass('storeRow');
        $('<div>').addClass('row_key').text(k).appendTo(row);
        $('<div>').addClass('row_val').text(Math.floor(num)).appendTo(row);
        $('<div>').addClass('clear').appendTo(row);
        var curPrev = null;
        location.children().each(function (i) {
          var child = $(this);
          var cName = child.attr('id').substring(4).replace('-', ' ');
          if (cName < k && (curPrev == null || cName > curPrev)) {
            curPrev = cName;
          }
        });
        if (curPrev == null) {
          row.prependTo(location);
        } else {
          row.insertAfter(location.find('#row_' + curPrev.replace(' ', '-')));
        }
        newRow = true;
      } else if (num >= 0) {
        $('div#' + row.attr('id') + ' > div.row_val', location).text(Math.floor(num));
      }
    }

    if (needsAppend && stores.children().length > 0) {
      stores.appendTo('div#storesContainer');
      stores.animate({ opacity: 1 }, 300, 'linear');
    }

    if (wNeedsAppend && weapons.children().length > 0) {
      weapons.appendTo('div#storesContainer');
      weapons.animate({ opacity: 1 }, 300, 'linear');
    }

    if (newRow) {
      Room.updateIncomeView();
    }

    if ($("div#outsidePanel").length) {
      Outside.updateVillage();
    }
  },

  updateIncomeView: function () {
    var stores = $('div#stores');
    if (stores.length == 0 || typeof $SM.get('income') == 'undefined') return;
    $('div.storeRow', stores).each(function (index, el) {
      el = $(el);
      $('div.tooltip', el).remove();
      var tt = $('<div>').addClass('tooltip bottom right');
      var storeName = el.attr('id').substring(4).replace('-', ' ');
      for (var incomeSource in $SM.get('income')) {
        var income = $SM.get('income["' + incomeSource + '"]');
        for (var store in income.stores) {
          if (store == storeName && income.stores[store] != 0) {
            $('<div>').addClass('row_key').text(incomeSource).appendTo(tt);
            $('<div>')
              .addClass('row_val')
              .text(Engine.getIncomeMsg(income.stores[store], income.delay))
              .appendTo(tt);
          }
        }
      }
      if (tt.children().length > 0) {
        tt.appendTo(el);
      }
    });
  },

  buy: function (buyBtn) {
    var thing = $(buyBtn).attr('buildThing');
    var good = Room.TradeGoods[thing];
    var numThings = $SM.get('stores["' + thing + '"]', true);
    if (numThings < 0) numThings = 0;
    if (good.maximum <= numThings) {
      return;
    }

    var storeMod = {};
    var cost = good.cost();
    for (var k in cost) {
      var have = $SM.get('stores["' + k + '"]', true);
      if (have < cost[k]) {
        Notifications.notify(Room, k + " 不足");
        return false;
      } else {
        storeMod[k] = have - cost[k];
      }
    }
    $SM.setM('stores', storeMod);

    Notifications.notify(Room, good.buildMsg);

    $SM.add('stores["' + thing + '"]', 1);

    if (thing == '罗盘') {
      Path.openPath();
    }
  },

  build: function (buildBtn) {
    var thing = $(buildBtn).attr('buildThing');
    if (Room.temperature.value <= Room.TempEnum.Cold.value) {
      Notifications.notify(Room, "工人在发抖");
      return false;
    }
    var craftable = Room.Craftables[thing];

    var numThings = 0;
    switch (craftable.type) {
      case 'good':
      case 'weapon':
      case 'tool':
      case 'upgrade':
        numThings = $SM.get('stores["' + thing + '"]', true);
        break;
      case 'building':
        numThings = $SM.get('game.buildings["' + thing + '"]', true);
        break;
    }

    if (numThings < 0) numThings = 0;
    if (craftable.maximum <= numThings) {
      return;
    }

    var storeMod = {};
    var cost = craftable.cost();
    for (var k in cost) {
      var have = $SM.get('stores["' + k + '"]', true);
      if (have < cost[k]) {
        Notifications.notify(Room, "缺乏 " + k);
        return false;
      } else {
        storeMod[k] = have - cost[k];
      }
    }
    $SM.setM('stores', storeMod);

    Notifications.notify(Room, craftable.buildMsg);

    switch (craftable.type) {
      case 'good':
      case 'weapon':
      case 'upgrade':
      case 'tool':
        $SM.add('stores["' + thing + '"]', 1);
        break;
      case 'building':
        $SM.add('game.buildings["' + thing + '"]', 1);
        break;
    }
  },

  needsWorkshop: function (type) {
    return type == 'weapon' || type == 'upgrade' || type == 'tool';
  },

  craftUnlocked: function (thing) {
    if (Room.buttons[thing]) {
      return true;
    }
    if ($SM.get('game.builder.level') < 4) return false;
    var craftable = Room.Craftables[thing];
    if (Room.needsWorkshop(craftable.type) && $SM.get('game.buildings["工具房"]', true) == 0) return false;
    var cost = craftable.cost();

    //show button if one has already been built
    if ($SM.get('game.buildings["' + thing + '"]') > 0) {
      Room.buttons[thing] = true;
      return true;
    }
    // Show buttons if we have at least 1/2 the wood, and all other components have been seen.
    if ($SM.get('stores["木头"]', true) < cost['木头'] * 0.5) {
      return false;
    }
    for (var c in cost) {
      if (!$SM.get('stores["' + c + '"]')) {
        return false;
      }
    }

    Room.buttons[thing] = true;
    //don't notify if it has already been built before
    if (!$SM.get('game.buildings["' + thing + '"]')) {
      Notifications.notify(Room, craftable.availableMsg);
    }
    return true;
  },

  buyUnlocked: function (thing) {
    if (Room.buttons[thing]) {
      return true;
    } else if ($SM.get('game.buildings["贸易栈"]', true) > 0) {
      if (thing == '罗盘' || typeof $SM.get('stores["' + thing + '"]') != 'undefined') {
        // Allow the purchase of stuff once you've seen it
        return true;
      }
    }
    return false;
  },

  updateBuildButtons: function () {
    var buildSection = $('#buildBtns');
    var needsAppend = false;
    if (buildSection.length == 0) {
      buildSection = $('<div>').attr('id', 'buildBtns').css('opacity', 0);
      needsAppend = true;
    }

    var craftSection = $('#craftBtns');
    var cNeedsAppend = false;
    if (craftSection.length == 0 && $SM.get('game.buildings["工具房"]', true) > 0) {
      craftSection = $('<div>').attr('id', 'craftBtns').css('opacity', 0);
      cNeedsAppend = true;
    }

    var buySection = $('#buyBtns');
    var bNeedsAppend = false;
    if (buySection.length == 0 && $SM.get('game.buildings["贸易栈"]', true) > 0) {
      buySection = $('<div>').attr('id', 'buyBtns').css('opacity', 0);
      bNeedsAppend = true;
    }

    for (var k in Room.Craftables) {
      craftable = Room.Craftables[k];
      var max = $SM.num(k, craftable) + 1 > craftable.maximum;
      if (craftable.button == null) {
        if (Room.craftUnlocked(k)) {
          var loc = Room.needsWorkshop(craftable.type) ? craftSection : buildSection;
          craftable.button = new Button.Button({
            id: 'build_' + k,
            cost: craftable.cost(),
            text: k,
            click: Room.build,
            width: '80px',
            ttPos: loc.children().length > 10 ? 'top right' : 'bottom right'
          }).css('opacity', 0).attr('buildThing', k).appendTo(loc).animate({ opacity: 1 }, 300, 'linear');
        }
      } else {
        // refresh the tooltip
        var costTooltip = $('.tooltip', craftable.button);
        costTooltip.empty();
        var cost = craftable.cost();
        for (var k in cost) {
          $("<div>").addClass('row_key').text(k).appendTo(costTooltip);
          $("<div>").addClass('row_val').text(cost[k]).appendTo(costTooltip);
        }
        if (max && !craftable.button.hasClass('disabled')) {
          Notifications.notify(Room, craftable.maxMsg);
        }
      }
      if (max) {
        Button.setDisabled(craftable.button, true);
      } else {
        Button.setDisabled(craftable.button, false);
      }
    }

    for (var k in Room.TradeGoods) {
      good = Room.TradeGoods[k];
      var max = $SM.num(k, good) + 1 > good.maximum;
      if (good.button == null) {
        if (Room.buyUnlocked(k)) {
          good.button = new Button.Button({
            id: 'build_' + k,
            cost: good.cost(),
            text: k,
            click: Room.buy,
            width: '80px'
          }).css('opacity', 0).attr('buildThing', k).appendTo(buySection).animate({ opacity: 1 }, 300, 'linear');
        }
      } else {
        // refresh the tooltip
        var costTooltip = $('.tooltip', good.button);
        costTooltip.empty();
        var cost = good.cost();
        for (var k in cost) {
          $("<div>").addClass('row_key').text(k).appendTo(costTooltip);
          $("<div>").addClass('row_val').text(cost[k]).appendTo(costTooltip);
        }
        if (max && !good.button.hasClass('disabled')) {
          Notifications.notify(Room, good.maxMsg);
        }
      }
      if (max) {
        Button.setDisabled(good.button, true);
      } else {
        Button.setDisabled(good.button, false);
      }
    }

    if (needsAppend && buildSection.children().length > 0) {
      buildSection.appendTo('div#roomPanel').animate({ opacity: 1 }, 300, 'linear');
    }
    if (cNeedsAppend && craftSection.children().length > 0) {
      craftSection.appendTo('div#roomPanel').animate({ opacity: 1 }, 300, 'linear');
    }
    if (bNeedsAppend && buildSection.children().length > 0) {
      buySection.appendTo('div#roomPanel').animate({ opacity: 1 }, 300, 'linear');
    }
  },

  handleStateUpdates: function (e) {
    if (e.category == 'stores') {
      Room.updateStoresView();
      Room.updateBuildButtons();
    } else if (e.category == 'income') {
      Room.updateStoresView();
      Room.updateIncomeView();
    } else if (e.stateName.indexOf('game.buildings') == 0) {
      Room.updateBuildButtons();
    }
  }
};

/**
 * outside
 * 
 */
/**
 * Module that registers the outdoors functionality
 */
var Outside = {
  name: "Outside",

  _GATHER_DELAY: 60,
  _TRAPS_DELAY: 90,
  _POP_DELAY: [0.5, 3],

  _INCOME: {
    'gatherer': {
      //tim test should be 10 1
      delay: 10,
      stores: {
        '木头': 1
      }
    },
    '捕猎手': {
      delay: 10,
      stores: {
        '毛皮': 0.5,
        '肉': 0.5
      }
    },
    '兽夹制作者': {
      delay: 10,
      stores: {
        '肉': -1,
        '诱饵': 1
      }
    },
    '制革工': {
      delay: 10,
      stores: {
        '毛皮': -5,
        '皮革': 1
      }
    },
    '腌肉者': {
      delay: 10,
      stores: {
        '肉': -5,
        '木头': -5,
        '腌肉': 1
      }
    },
    '铁矿工': {
      delay: 10,
      stores: {
        '腌肉': -1,
        '铁': 1
      }
    },
    '煤矿工': {
      delay: 10,
      stores: {
        '腌肉': -1,
        '煤': 1
      }
    },
    '硫磺矿工': {
      delay: 10,
      stores: {
        '腌肉': -1,
        '硫磺': 1
      }
    },
    '熔炼工': {
      delay: 10,
      stores: {
        '铁': -1,
        '煤': -1,
        '钢': 1
      }
    },
    '军械师': {
      delay: 10,
      stores: {
        '钢': -1,
        '硫磺': -1,
        '子弹': 1
      }
    }
  },

  TrapDrops: [
    {
      rollUnder: 0.5,
      name: '毛皮',
      message: '破碎的皮毛'
    },
    {
      rollUnder: 0.75,
      name: '肉',
      message: '小片的肉'
    },
    {
      rollUnder: 0.85,
      name: '鳞片',
      message: '奇怪的鳞片'
    },
    {
      rollUnder: 0.93,
      name: '牙齿',
      message: '残缺的牙齿'
    },
    {
      rollUnder: 0.995,
      name: '布匹',
      message: '破烂的布料'
    },
    {
      rollUnder: 1.0,
      name: '护身符',
      message: '一个粗糙的护身符'
    }
  ],

  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    if (Engine._debug) {
      this._GATHER_DELAY = 0;
      this._TRAPS_DELAY = 0;
    }

    // Create the outside tab
    this.tab = Header.addLocation("A Silent Forest", "outside", Outside);

    // Create the Outside panel
    this.panel = $('<div>').attr('id', "outsidePanel")
      .addClass('location')
      .appendTo('div#locationSlider');

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Outside.handleStateUpdates);

    if (typeof $SM.get('features.location.outside') == 'undefined') {
      $SM.set('features.location.outside', true);
      if (!$SM.get('game.buildings')) $SM.set('game.buildings', {});
      if (!$SM.get('game.population')) $SM.set('game.population', 0);
      if (!$SM.get('game.workers')) $SM.set('game.workers', {});
    }

    this.updateVillage();
    Outside.updateWorkersView();

    Engine.updateSlider();

    // Create the gather button
    new Button.Button({
      id: 'gatherButton',
      text: "收集木头",
      click: Outside.gatherWood,
      cooldown: Outside._GATHER_DELAY,
      width: '80px'
    }).appendTo('div#outsidePanel');
  },

  getMaxPopulation: function () {
    return $SM.get('game.buildings["木屋"]', true) * 4;
  },

  increasePopulation: function () {
    var space = Outside.getMaxPopulation() - $SM.get('game.population');
    if (space > 0) {
      var num = Math.floor(Math.random() * (space / 2) + space / 2);
      if (num == 0) num = 1;
      if (num == 1) {
        Notifications.notify(null, '一个生人在夜晚到来.');
      } else if (num < 5) {
        Notifications.notify(null, '一个长途跋涉的家庭搬入了一个木屋.');
      } else if (num < 10) {
        Notifications.notify(null, '一小群人抵达了, 个个瘦骨嶙峋.');
      } else if (num < 30) {
        Notifications.notify(null, '一大队人群抵达, 带来了磨难与希望.');
      } else {
        Notifications.notify(null, "小村已成为小镇, 热闹非凡, 言语无法形容.");
      }
      Engine.log('population increased by ' + num);
      $SM.add('game.population', num);
    }
    Outside.schedulePopIncrease();
  },

  killVillagers: function (num) {
    $SM.add('game.population', num * -1);
    if ($SM.get('game.population') < 0) {
      $SM.set('game.population', 0);
    }
    var remaining = Outside.getNumGatherers();
    if (remaining < 0) {
      var gap = -remaining;
      for (var k in $SM.get('game.workers')) {
        var num = $SM.get('game.workers["' + k + '"]');
        if (num < gap) {
          gap -= num;
          $SM.set('game.workers["' + k + '"]', 0);
        } else {
          $SM.add('game.workers["' + k + '"]', gap * -1);
          break;
        }
      }
    }
  },

  schedulePopIncrease: function () {
    var nextIncrease = Math.floor(Math.random() * (Outside._POP_DELAY[1] - Outside._POP_DELAY[0])) + Outside._POP_DELAY[0];
    Engine.log('next population increase scheduled in ' + nextIncrease + ' minutes');
    Outside._popTimeout = setTimeout(Outside.increasePopulation, nextIncrease * 60 * 1000);
  },

  updateWorkersView: function () {
    var workers = $('div#workers');

    // If our population is 0 and we don't already have a workers view,
    // there's nothing to do here.
    if (!workers.length && $SM.get('game.population') == 0) return;

    var needsAppend = false;
    if (workers.length == 0) {
      needsAppend = true;
      workers = $('<div>').attr('id', 'workers').css('opacity', 0);
    }

    var numGatherers = $SM.get('game.population');
    var gatherer = $('div#workers_row_gatherer', workers);

    for (var k in $SM.get('game.workers')) {
      var workerCount = $SM.get('game.workers["' + k + '"]');
      var row = $('div#workers_row_' + k.replace(' ', '-'), workers);
      if (row.length == 0) {
        row = Outside.makeWorkerRow(k, workerCount);

        var curPrev = null;
        workers.children().each(function (i) {
          var child = $(this);
          var cName = child.attr('id').substring(12).replace('-', ' ');
          if (cName != 'gatherer') {
            if (cName < k && (curPrev == null || cName > curPrev)) {
              curPrev = cName;
            }
          }
        });
        if (curPrev == null && gatherer.length == 0) {
          row.prependTo(workers);
        }
        else if (curPrev == null) {
          row.insertAfter(gatherer);
        }
        else {
          row.insertAfter(workers.find('#workers_row_' + curPrev.replace(' ', '-')));
        }

      } else {
        $('div#' + row.attr('id') + ' > div.row_val > span', workers).text(workerCount);
      }
      numGatherers -= workerCount;
      if (workerCount == 0) {
        $('.dnBtn', row).addClass('disabled');
        $('.dnManyBtn', row).addClass('disabled');
      } else {
        $('.dnBtn', row).removeClass('disabled');
        $('.dnManyBtn', row).removeClass('disabled');
      }
    }

    if (gatherer.length == 0) {
      gatherer = Outside.makeWorkerRow('gatherer', numGatherers);
      gatherer.prependTo(workers);
    } else {
      $('div#workers_row_gatherer > div.row_val > span', workers).text(numGatherers);
    }

    if (numGatherers == 0) {
      $('.upBtn', '#workers').addClass('disabled');
      $('.upManyBtn', '#workers').addClass('disabled');
    } else {
      $('.upBtn', '#workers').removeClass('disabled');
      $('.upManyBtn', '#workers').removeClass('disabled');
    }


    if (needsAppend && workers.children().length > 0) {
      workers.appendTo('#outsidePanel').animate({ opacity: 1 }, 300, 'linear');
    }
  },

  getNumGatherers: function () {
    var num = $SM.get('game.population');
    for (var k in $SM.get('game.workers')) {
      num -= $SM.get('game.workers["' + k + '"]');
    }
    return num;
  },

  makeWorkerRow: function (name, num) {
    var row = $('<div>')
      .attr('id', 'workers_row_' + name.replace(' ', '-'))
      .addClass('workerRow');
    $('<div>').addClass('row_key').text(name).appendTo(row);
    var val = $('<div>').addClass('row_val').appendTo(row);

    $('<span>').text(num).appendTo(val);

    if (name != 'gatherer') {
      $('<div>').addClass('upManyBtn').appendTo(val).click([10], Outside.increaseWorker);
      $('<div>').addClass('upBtn').appendTo(val).click([1], Outside.increaseWorker);
      $('<div>').addClass('dnBtn').appendTo(val).click([1], Outside.decreaseWorker);
      $('<div>').addClass('dnManyBtn').appendTo(val).click([10], Outside.decreaseWorker);
    }

    $('<div>').addClass('clear').appendTo(row);

    var tooltip = $('<div>').addClass('tooltip bottom right').appendTo(row);
    var income = Outside._INCOME[name];
    for (var s in income.stores) {
      var r = $('<div>').addClass('storeRow');
      $('<div>').addClass('row_key').text(s).appendTo(r);
      $('<div>').addClass('row_val').text(Engine.getIncomeMsg(income.stores[s], income.delay)).appendTo(r);
      r.appendTo(tooltip);
    }

    return row;
  },

  increaseWorker: function (btn) {
    var worker = $(this).closest('.workerRow').children('.row_key').text();
    if (Outside.getNumGatherers() > 0) {
      var increaseAmt = Math.min(Outside.getNumGatherers(), btn.data);
      Engine.log('increasing ' + worker + ' by ' + increaseAmt);
      $SM.add('game.workers["' + worker + '"]', increaseAmt);
    }
  },

  decreaseWorker: function (btn) {
    var worker = $(this).closest('.workerRow').children('.row_key').text();
    if ($SM.get('game.workers["' + worker + '"]') > 0) {
      var decreaseAmt = Math.min($SM.get('game.workers["' + worker + '"]') || 0, btn.data);
      Engine.log('decreasing ' + worker + ' by ' + decreaseAmt);
      $SM.add('game.workers["' + worker + '"]', decreaseAmt * -1);
    }
  },

  updateVillageRow: function (name, num, village) {
    var id = 'building_row_' + name.replace(' ', '-');
    var row = $('div#' + id, village);
    if (row.length == 0 && num > 0) {
      row = $('<div>').attr('id', id).addClass('storeRow');
      $('<div>').addClass('row_key').text(name).appendTo(row);
      $('<div>').addClass('row_val').text(num).appendTo(row);
      $('<div>').addClass('clear').appendTo(row);
      var curPrev = null;
      village.children().each(function (i) {
        var child = $(this);
        if (child.attr('id') != 'population') {
          var cName = child.attr('id').substring(13).replace('-', ' ');
          if (cName < name && (curPrev == null || cName > curPrev)) {
            curPrev = cName;
          }
        }
      });
      if (curPrev == null) {
        row.prependTo(village);
      } else {
        row.insertAfter('#building_row_' + curPrev.replace(' ', '-'));
      }
    } else if (num > 0) {
      $('div#' + row.attr('id') + ' > div.row_val', village).text(num);
    } else if (num == 0) {
      row.remove();
    }
  },

  updateVillage: function (ignoreStores) {
    var village = $('div#village');
    var population = $('div#population');
    var needsAppend = false;
    if (village.length == 0) {
      needsAppend = true;
      village = $('<div>').attr('id', 'village').css('opacity', 0);
      population = $('<div>').attr('id', 'population').appendTo(village);
    }

    for (var k in $SM.get('game.buildings')) {
      if (k == '陷阱') {
        var numTraps = $SM.get('game.buildings["' + k + '"]');
        var numBait = $SM.get('stores["诱饵"]', true);
        var traps = numTraps - numBait;
        traps = traps < 0 ? 0 : traps;
        Outside.updateVillageRow(k, traps, village);
        Outside.updateVillageRow('上饵陷阱', numBait > numTraps ? numTraps : numBait, village);
      } else {
        if (Outside.checkWorker(k)) {
          Outside.updateWorkersView();
        }
        Outside.updateVillageRow(k, $SM.get('game.buildings["' + k + '"]'), village);
      }
    }

    population.text('人口 ' + $SM.get('game.population') + '/' + this.getMaxPopulation());

    var hasPeeps;
    if ($SM.get('game.buildings["木屋"]', true) == 0) {
      hasPeeps = false;
      village.addClass('noHuts');
    } else {
      hasPeeps = true;
      village.removeClass('noHuts');
    }

    if (needsAppend && village.children().length > 1) {
      village.appendTo('#outsidePanel');
      village.animate({ opacity: 1 }, 300, 'linear');
    }

    if (hasPeeps && typeof Outside._popTimeout == 'undefined') {
      Outside.schedulePopIncrease();
    }

    this.setTitle();

    if (!ignoreStores && Engine.activeModule === Outside && village.children().length > 1) {
      $('#storesContainer').css({ top: village.height() + 26 + 'px' });
    }
  },

  checkWorker: function (name) {
    var jobMap = {
      '猎人小屋': ['捕猎手', '兽夹制作者'],
      '制革坊': ['制革工'],
      '腌肉坊': ['腌肉者'],
      '铁矿': ['铁矿工'],
      '煤矿': ['煤矿工'],
      '硫磺矿': ['硫磺矿工'],
      '炼钢炉': ['熔炼工'],
      '军械库': ['军械师']
    };

    var jobs = jobMap[name];
    var added = false;
    if (typeof jobs == 'object') {
      for (var i = 0, len = jobs.length; i < len; i++) {
        var job = jobs[i];
        if (typeof $SM.get('game.buildings["' + name + '"]') == 'number' &&
          typeof $SM.get('game.workers["' + job + '"]') != 'number') {
          Engine.log('adding ' + job + ' to the workers list');
          $SM.set('game.workers["' + job + '"]', 0);
          added = true;
        }
      }
    }
    return added;
  },

  updateVillageIncome: function () {
    for (var worker in Outside._INCOME) {
      var income = Outside._INCOME[worker];
      var num = worker == 'gatherer' ? Outside.getNumGatherers() : $SM.get('game.workers["' + worker + '"]');
      if (typeof num == 'number') {
        var stores = {};
        if (num < 0) num = 0;

        var tooltip = $('.tooltip', 'div#workers_row_' + worker.replace(' ', '-'));
        tooltip.empty();
        var needsUpdate = false;
        var curIncome = $SM.getIncome(worker);
        for (var store in income.stores) {
          stores[store] = income.stores[store] * num;
          if (curIncome[store] != stores[store]) needsUpdate = true;
          var row = $('<div>').addClass('storeRow');
          $('<div>').addClass('row_key').text(store).appendTo(row);
          $('<div>').addClass('row_val').text(Engine.getIncomeMsg(stores[store], income.delay)).appendTo(row);
          row.appendTo(tooltip);
        }
        if (needsUpdate) {
          $SM.setIncome(worker, {
            delay: income.delay,
            stores: stores
          });
        }
      }
    }
    Room.updateIncomeView();
  },

  updateTrapButton: function () {
    var btn = $('div#trapsButton');
    if ($SM.get('game.buildings["陷阱"]', true) > 0) {
      if (btn.length == 0) {
        new Button.Button({
          id: 'trapsButton',
          text: "检查陷阱",
          click: Outside.checkTraps,
          cooldown: Outside._TRAPS_DELAY,
          width: '80px'
        }).appendTo('div#outsidePanel');
      } else {
        Button.setDisabled(btn, false);
      }
    } else {
      if (btn.length > 0) {
        Button.setDisabled(btn, true);
      }
    }
  },

  setTitle: function () {
    var numHuts = $SM.get('game.buildings["木屋"]', true);
    var title;
    if (numHuts == 0) {
      title = "静谧森林";
    } else if (numHuts == 1) {
      title = "孤单的木屋";
    } else if (numHuts <= 4) {
      title = "小型村庄";
    } else if (numHuts <= 8) {
      title = "标准村庄";
    } else if (numHuts <= 14) {
      title = "大型村庄";
    } else {
      title = "喧嚣热闹的小镇";
    }

    if (Engine.activeModule == this) {
      document.title = title;
    }
    $('#location_outside').text(title);
  },

  onArrival: function (transition_diff) {
    Outside.setTitle();
    if (!$SM.get('game.outside.seenForest')) {
      Notifications.notify(Outside, "天空阴沉, 朔风野大");
      $SM.set('game.outside.seenForest', true);
    }
    Outside.updateTrapButton();
    Outside.updateVillage(true);

    Engine.moveStoresView($('#village'), transition_diff);
  },

  gatherWood: function () {
    Notifications.notify(Outside, "干枯的灌木和树枝把树林的地面弄得一团糟");
    var gatherAmt = $SM.get('game.buildings["筐子"]', true) > 0 ? 50 : 10;
    $SM.add('stores["木头"]', gatherAmt);
  },

  checkTraps: function () {
    var drops = {};
    var msg = [];
    var numTraps = $SM.get('game.buildings["陷阱"]', true);
    var numBait = $SM.get('stores["诱饵"]', true);
    var numDrops = numTraps + (numBait < numTraps ? numBait : numTraps);
    for (var i = 0; i < numDrops; i++) {
      var roll = Math.random();
      for (var j in Outside.TrapDrops) {
        var drop = Outside.TrapDrops[j];
        if (roll < drop.rollUnder) {
          var num = drops[drop.name];
          if (typeof num == 'undefined') {
            num = 0;
            msg.push(drop.message);
          }
          drops[drop.name] = num + 1;
          break;
        }
      }
    }
    var s = '陷阱可能会带来 ';
    for (var i = 0, len = msg.length; i < len; i++) {
      if (len > 1 && i > 0 && i < len - 1) {
        s += ", ";
      } else if (len > 1 && i == len - 1) {
        s += " 和 ";
      }
      s += msg[i];
    }

    var baitUsed = numBait < numTraps ? numBait : numTraps;
    drops['诱饵'] = -baitUsed;

    Notifications.notify(Outside, s);
    $SM.addM('stores', drops);
  },

  handleStateUpdates: function (e) {
    if (e.category == 'stores') {
      Outside.updateVillage();
    } else if (e.stateName.indexOf('game.workers') == 0
      || e.stateName.indexOf('game.population') == 0) {
      Outside.updateVillage();
      Outside.updateWorkersView();
      Outside.updateVillageIncome();
    };
  }
};
/**
 * world
 * 
 */
var World = {

  RADIUS: 30,
  VILLAGE_POS: [30, 30],
  TILE: {
    VILLAGE: 'A',
    IRON_MINE: 'I',
    COAL_MINE: 'C',
    SULPHUR_MINE: 'S',
    FOREST: ';',
    FIELD: ',',
    BARRENS: '.',
    ROAD: '#',
    HOUSE: 'H',
    CAVE: 'V',
    TOWN: 'O',
    CITY: 'Y',
    OUTPOST: 'P',
    SHIP: 'W',
    BOREHOLE: 'B',
    BATTLEFIELD: 'F',
    SWAMP: 'M',
    CACHE: 'U'
  },
  TILE_PROBS: {},
  LANDMARKS: {},
  STICKINESS: 0.5, // 0 <= x <= 1
  LIGHT_RADIUS: 2,
  BASE_WATER: 10,
  MOVES_PER_FOOD: 2,
  MOVES_PER_WATER: 1,
  DEATH_COOLDOWN: 120,
  FIGHT_CHANCE: 0.20,
  BASE_HEALTH: 10,
  BASE_HIT_CHANCE: 0.8,
  MEAT_HEAL: 8,
  MEDS_HEAL: 20,
  FIGHT_DELAY: 3, // At least three moves between fights
  NORTH: [0, -1],
  SOUTH: [0, 1],
  WEST: [-1, 0],
  EAST: [1, 0],

  Weapons: {
    '拳击': {
      verb: '拳击',
      type: 'unarmed',
      damage: 1,
      cooldown: 2
    },
    '骨枪': {
      verb: '突',
      type: 'melee',
      damage: 2,
      cooldown: 2
    },
    '铁剑': {
      verb: '挥击',
      type: 'melee',
      damage: 4,
      cooldown: 2
    },
    '钢剑': {
      verb: '猛击',
      type: 'melee',
      damage: 6,
      cooldown: 2
    },
    '刺刀': {
      verb: '刺',
      type: 'melee',
      damage: 8,
      cooldown: 2
    },
    '步枪': {
      verb: '射击',
      type: 'ranged',
      damage: 5,
      cooldown: 1,
      cost: { '子弹': 1 }
    },
    '镭射枪': {
      verb: '引爆',
      type: 'ranged',
      damage: 8,
      cooldown: 1,
      cost: { '燃料电池': 1 }
    },
    '手雷': {
      verb: '投掷',
      type: 'ranged',
      damage: 15,
      cooldown: 5,
      cost: { '手雷': 1 }
    },
    '链球': {
      verb: '纠缠',
      type: 'ranged',
      damage: 'stun',
      cooldown: 15,
      cost: { '链球': 1 }
    }
  },

  name: 'World',
  options: {}, // Nothing for now
  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    // Setup probabilities. Sum must equal 1.
    World.TILE_PROBS[World.TILE.FOREST] = 0.15;
    World.TILE_PROBS[World.TILE.FIELD] = 0.35;
    World.TILE_PROBS[World.TILE.BARRENS] = 0.5;

    // Setpiece definitions
    World.LANDMARKS[World.TILE.OUTPOST] = { num: 0, minRadius: 0, maxRadius: 0, scene: '哨站', label: '前&nbsp;哨&nbsp;战' };
    World.LANDMARKS[World.TILE.IRON_MINE] = { num: 1, minRadius: 5, maxRadius: 5, scene: '铁矿', label: '铁&nbsp;矿' };
    World.LANDMARKS[World.TILE.COAL_MINE] = { num: 1, minRadius: 10, maxRadius: 10, scene: '煤矿', label: '煤&nbsp;矿' };
    World.LANDMARKS[World.TILE.SULPHUR_MINE] = { num: 1, minRadius: 20, maxRadius: 20, scene: '硫磺矿', label: '硫&nbsp;磺&nbsp;矿' };
    World.LANDMARKS[World.TILE.HOUSE] = { num: 10, minRadius: 0, maxRadius: World.RADIUS * 1.5, scene: '废屋', label: '废&nbsp;弃&nbsp;的&nbsp;房&nbsp;屋' };
    World.LANDMARKS[World.TILE.CAVE] = { num: 5, minRadius: 3, maxRadius: 10, scene: '洞穴', label: '洞&nbsp;穴' };
    World.LANDMARKS[World.TILE.TOWN] = { num: 10, minRadius: 10, maxRadius: 20, scene: '小镇', label: '弃&nbsp;镇' };
    World.LANDMARKS[World.TILE.CITY] = { num: 20, minRadius: 20, maxRadius: World.RADIUS * 1.5, scene: '城镇', label: '弃&nbsp;城' };
    World.LANDMARKS[World.TILE.SHIP] = { num: 1, minRadius: 28, maxRadius: 28, scene: '飞船', label: '坠&nbsp;毁&nbsp;的&nbsp;星&nbsp;际&nbsp;飞&nbsp;船' };
    World.LANDMARKS[World.TILE.BOREHOLE] = { num: 10, minRadius: 15, maxRadius: World.RADIUS * 1.5, scene: '巨坑', label: '巨&nbsp;坑' };
    World.LANDMARKS[World.TILE.BATTLEFIELD] = { num: 5, minRadius: 18, maxRadius: World.RADIUS * 1.5, scene: '战场', label: '古&nbsp;战&nbsp;场' };
    World.LANDMARKS[World.TILE.SWAMP] = { num: 1, minRadius: 15, maxRadius: World.RADIUS * 1.5, scene: '沼泽', label: '泥&nbsp;泞&nbsp;沼&nbsp;泽' };

    // Only add the cache if there is prestige data
    if ($SM.get('previous.stores')) {
      World.LANDMARKS[World.TILE.CACHE] = { num: 1, minRadius: 10, maxRadius: World.RADIUS * 1.5, scene: '临时', label: '小&nbsp;黑&nbsp;屋' };
    }

    if (typeof $SM.get('features.location.world') == 'undefined') {
      $SM.set('features.location.world', true);
      $SM.setM('game.world', {
        map: World.generateMap(),
        mask: World.newMask()
      });
    }

    // Create the World panel
    this.panel = $('<div>').attr('id', "worldPanel").addClass('location').appendTo('#outerSlider');

    // Create the shrink wrapper
    var outer = $('<div>').attr('id', 'worldOuter').appendTo(this.panel);

    // Create the bag panel
    $('<div>').attr('id', 'bagspace-world').append($('<div>')).appendTo(outer);
    $('<div>').attr('id', 'backpackTitle').appendTo(outer);
    $('<div>').attr('id', 'backpackSpace').appendTo(outer);
    $('<div>').attr('id', 'healthCounter').appendTo(outer);

    Engine.updateOuterSlider();

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(World.handleStateUpdates);
  },

  clearDungeon: function () {
    Engine.event('progress', 'dungeon cleared');
    World.state.map[World.curPos[0]][World.curPos[1]] = World.TILE.OUTPOST;
    World.drawRoad();
  },

  drawRoad: function () {
    var findClosestRoad = function (startPos) {
      // We'll search in a spiral to find the closest road tile
      // We spiral out along manhattan distance contour
      // lines to ensure we draw the shortest road possible.
      // No attempt is made to reduce the search space for
      // tiles outside the map.
      var searchX, searchY, dtmp,
        x = 0,
        y = 0,
        dx = 1,
        dy = -1;
      for (var i = 0; i < Math.pow(World.getDistance(startPos, World.VILLAGE_POS) + 2, 2); i++) {
        searchX = startPos[0] + x;
        searchY = startPos[1] + y;
        if (0 < searchX && searchX < World.RADIUS * 2 && 0 < searchY && searchY < World.RADIUS * 2) {
          // check for road
          var tile = World.state.map[searchX][searchY];
          if (
            tile === World.TILE.ROAD ||
            (tile === World.TILE.OUTPOST && !(x === 0 && y === 0)) || // outposts are connected to roads
            tile === World.TILE.VILLAGE // all roads lead home
          ) {
            return [searchX, searchY];
          }
        }
        if (x === 0 || y === 0) {
          // Turn the corner
          dtmp = dx;
          dx = -dy;
          dy = dtmp;
        }
        if (x === 0 && y <= 0) {
          x++;
        } else {
          x += dx;
          y += dy;
        }
      }
      return World.VILLAGE_POS;
    };
    var closestRoad = findClosestRoad(World.curPos);
    var xDist = World.curPos[0] - closestRoad[0];
    var yDist = World.curPos[1] - closestRoad[1];
    var xDir = Math.abs(xDist) / xDist;
    var yDir = Math.abs(yDist) / yDist;
    var xIntersect, yIntersect;
    if (Math.abs(xDist) > Math.abs(yDist)) {
      xIntersect = closestRoad[0];
      yIntersect = closestRoad[1] + yDist;
    } else {
      xIntersect = closestRoad[0] + xDist;
      yIntersect = closestRoad[1];
    }

    for (var x = 0; x < Math.abs(xDist); x++) {
      if (World.isTerrain(World.state.map[closestRoad[0] + (xDir * x)][yIntersect])) {
        World.state.map[closestRoad[0] + (xDir * x)][yIntersect] = World.TILE.ROAD;
      }
    }
    for (var y = 0; y < Math.abs(yDist); y++) {
      if (World.isTerrain(World.state.map[xIntersect][closestRoad[1] + (yDir * y)])) {
        World.state.map[xIntersect][closestRoad[1] + (yDir * y)] = World.TILE.ROAD;
      }
    }
    World.drawMap();
  },

  updateSupplies: function () {
    var supplies = $('div#bagspace-world > div');

    if (!Path.outfit) {
      Path.outfit = {};
    }

    // Add water
    var water = $('div#supply_water');
    if (World.water > 0 && water.length == 0) {
      water = World.createItemDiv('water', World.water);
      water.prependTo(supplies);
    } else if (World.water > 0) {
      $('div#supply_water', supplies).text('水:' + World.water);
    } else {
      water.remove();
    }

    var total = 0;
    for (var k in Path.outfit) {
      var item = $('div#supply_' + k.replace(' ', '-'), supplies);
      var num = Path.outfit[k];
      total += num * Path.getWeight(k);
      if (num > 0 && item.length == 0) {
        item = World.createItemDiv(k, num);
        if (k == '腌肉' && World.water > 0) {
          item.insertAfter(water);
        } else if (k == '腌肉') {
          item.prependTo(supplies);
        } else {
          item.appendTo(supplies);
        }
      } else if (num > 0) {
        $('div#' + item.attr('id'), supplies).text(k + ':' + num);
      } else {
        item.remove();
      }
    }

    // Update label
    var t = '口袋';
    if ($SM.get('stores["旅行包"]', true) > 0) { //tim mark, in case of bug
      t = '旅行包';
    }
    $('#backpackTitle').text(t);

    // Update bagspace
    $('#backpackSpace').text('行囊空间 ' + Math.floor(Path.getCapacity() - total) + '/' + Path.getCapacity());
  },

  setWater: function (w) {
    World.water = w;
    if (World.water > World.getMaxWater()) {
      World.water = World.getMaxWater();
    }
    World.updateSupplies();
  },

  setHp: function (hp) {
    if (typeof hp == 'number' && !isNaN(hp)) {
      World.health = hp;
      if (World.health > World.getMaxHealth()) {
        World.health = World.getMaxHealth();
      }
      $('#healthCounter').text('hp: ' + World.health + '/' + World.getMaxHealth());
    }
  },

  createItemDiv: function (name, num) {
    var div = $('<div>').attr('id', 'supply_' + name.replace(' ', '-'))
      .addClass('supplyItem')
      .text(name + ':' + num);

    return div;
  },

  moveNorth: function () {
    Engine.log('North');
    if (World.curPos[1] > 0) World.move(World.NORTH);
  },

  moveSouth: function () {
    Engine.log('South');
    if (World.curPos[1] < World.RADIUS * 2) World.move(World.SOUTH);
  },

  moveWest: function () {
    Engine.log('West');
    if (World.curPos[0] > 0) World.move(World.WEST);
  },

  moveEast: function () {
    Engine.log('East');
    if (World.curPos[0] < World.RADIUS * 2) World.move(World.EAST);
  },

  move: function (direction) {
    var oldTile = World.state.map[World.curPos[0]][World.curPos[1]];
    World.curPos[0] += direction[0];
    World.curPos[1] += direction[1];
    World.narrateMove(oldTile, World.state.map[World.curPos[0]][World.curPos[1]]);
    World.lightMap(World.curPos[0], World.curPos[1], World.state.mask);
    World.drawMap();
    World.doSpace();
    if (World.checkDanger()) {
      if (World.danger) {
        Notifications.notify(World, '离村子很远了, 这样极其危险');
      } else {
        Notifications.notify(World, '总算安全了');
      }
    }
  },

  keyDown: function (event) {
    switch (event.which) {
      case 38: // Up
      case 87:
        World.moveNorth();
        break;
      case 40: // Down
      case 83:
        World.moveSouth();
        break;
      case 37: // Left
      case 65:
        World.moveWest();
        break;
      case 39: // Right
      case 68:
        World.moveEast();
        break;
      default:
        break;
    }
  },

  swipeLeft: function (e) {
    World.moveWest();
  },

  swipeRight: function (e) {
    World.moveEast();
  },

  swipeUp: function (e) {
    World.moveNorth();
  },

  swipeDown: function (e) {
    World.moveSouth();
  },

  click: function (event) {
    var map = $('#map'),
      // measure clicks relative to the centre of the current location
      centreX = map.offset().left + map.width() * World.curPos[0] / (World.RADIUS * 2),
      centreY = map.offset().top + map.height() * World.curPos[1] / (World.RADIUS * 2),
      clickX = event.pageX - centreX,
      clickY = event.pageY - centreY;
    if (clickX > clickY && clickX < -clickY) {
      World.moveNorth();
    }
    if (clickX < clickY && clickX > -clickY) {
      World.moveSouth();
    }
    if (clickX < clickY && clickX < -clickY) {
      World.moveWest();
    }
    if (clickX > clickY && clickX > -clickY) {
      World.moveEast();
    }
  },

  checkDanger: function () {
    World.danger = typeof World.danger == 'undefined' ? false : World.danger;
    if (!World.danger) {
      if (!$SM.get('stores["铁甲"]', true) > 0 && World.getDistance() >= 8) {
        World.danger = true;
        return true;
      }
      if (!$SM.get('stores["钢甲"]', true) > 0 && World.getDistance() >= 18) {
        World.danger = true;
        return true;
      }
    } else {
      if (World.getDistance() < 8) {
        World.danger = false;
        return true;
      }
      if (World.getDistance < 18 && $SM.get('stores["铁甲"]', true) > 0) {
        World.danger = false;
        return true;
      }
    }
    return false;
  },

  useSupplies: function () {
    World.foodMove++;
    World.waterMove++;
    // Food
    var movesPerFood = World.MOVES_PER_FOOD;
    movesPerFood *= $SM.hasPerk('避免饥饿') ? 2 : 1;
    if (World.foodMove >= movesPerFood) {
      World.foodMove = 0;
      var num = Path.outfit['腌肉'];
      num--;
      if (num == 0) {
        Notifications.notify(World, '腌肉消耗殆尽');
      } else if (num < 0) {
        // Starvation! Hooray!
        num = 0;
        if (!World.starvation) {
          Notifications.notify(World, '人是铁饭是钢, 饥饿如山一般压来');
          World.starvation = true;
        } else {
          $SM.set('character.starved', $SM.get('character.starved', true));
          $SM.add('character.starved', 1);
          if ($SM.get('character.starved') >= 10 && !$SM.hasPerk('避免饥饿')) {
            $SM.addPerk('避免饥饿');
          }
          World.die();
          return false;
        }
      } else {
        World.starvation = false;
        World.setHp(World.health + World.meatHeal());
      }
      Path.outfit['腌肉'] = num;
    }
    // Water
    var movesPerWater = World.MOVES_PER_WATER;
    movesPerWater *= $SM.hasPerk('避免流失水分') ? 2 : 1;
    if (World.waterMove >= movesPerWater) {
      World.waterMove = 0;
      var water = World.water;
      water--;
      if (water == 0) {
        Notifications.notify(World, '水已耗尽');
      } else if (water < 0) {
        water = 0;
        if (!World.thirst) {
          Notifications.notify(World, '口舌生烟, 干渴如斯');
          World.thirst = true;
        } else {
          $SM.set('character.dehydrated', $SM.get('character.dehydrated', true));
          $SM.add('character.dehydrated', 1);
          if ($SM.get('character.dehydrated') >= 10 && !$SM.hasPerk('避免流失水分')) {
            $SM.addPerk('避免流失水分');
          }
          World.die();
          return false;
        }
      } else {
        World.thirst = false;
      }
      World.setWater(water);
      World.updateSupplies();
    }
    return true;
  },

  meatHeal: function () {
    return World.MEAT_HEAL * ($SM.hasPerk('九阳神功') ? 2 : 1);
  },

  medsHeal: function () {
    return World.MEDS_HEAL;
  },

  checkFight: function () {
    World.fightMove = typeof World.fightMove == 'number' ? World.fightMove : 0;
    World.fightMove++;
    if (World.fightMove > World.FIGHT_DELAY) {
      var chance = World.FIGHT_CHANCE;
      chance *= $SM.hasPerk('潜行术') ? 0.5 : 1;
      if (Math.random() < chance) {
        World.fightMove = 0;
        Events.triggerFight();
      }
    }
  },

  doSpace: function () {
    var curTile = World.state.map[World.curPos[0]][World.curPos[1]];

    if (curTile == World.TILE.VILLAGE) {
      World.goHome();
    } else if (typeof World.LANDMARKS[curTile] != 'undefined') {
      if (curTile != World.TILE.OUTPOST || !World.outpostUsed()) {
        Events.startEvent(Events.Setpieces[World.LANDMARKS[curTile].scene]);
      }
    } else {
      if (World.useSupplies()) {
        World.checkFight();
      }
    }
  },

  getDistance: function (from, to) {
    from = from || World.curPos;
    to = to || World.VILLAGE_POS;
    return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
  },

  getTerrain: function () {
    return World.state.map[World.curPos[0]][World.curPos[1]];
  },

  narrateMove: function (oldTile, newTile) {
    var msg = null;
    switch (oldTile) {
      case World.TILE.FOREST:
        switch (newTile) {
          case World.TILE.FIELD:
            msg = "落叶, 枯草, 黄沙, 响铃.";
            break;
          case World.TILE.BARRENS:
            msg = "朽木, 废土, 狂沙, 死地.";
            break;
        }
        break;
      case World.TILE.FIELD:
        switch (newTile) {
          case World.TILE.FOREST:
            msg = "树木仅存于地平线, 绿草远不是落木枯叶的敌手.";
            break;
          case World.TILE.BARRENS:
            msg = "枯草地, 褐连天.";
            break;
        }
        break;
      case World.TILE.BARRENS:
        switch (newTile) {
          case World.TILE.FIELD:
            msg = "贫瘠之地嵌在死海一般的枯草地中, 随着干燥的微风摇摆不定.";
            break;
          case World.TILE.FOREST:
            msg = "粗大的树干从贫地中崛起, 形成坚实的树墙, 他们的巨大枝杈扭曲在一起, 仿佛苍穹一般.";
            break;
        }
        break;
    }
    if (msg != null) {
      Notifications.notify(World, msg);
    }
  },

  newMask: function () {
    var mask = new Array(World.RADIUS * 2 + 1);
    for (var i = 0; i <= World.RADIUS * 2; i++) {
      mask[i] = new Array(World.RADIUS * 2 + 1);
    }
    World.lightMap(World.RADIUS, World.RADIUS, mask);
    return mask;
  },

  lightMap: function (x, y, mask) {
    var r = World.LIGHT_RADIUS;
    r *= $SM.hasPerk('千里眼') ? 2 : 1;
    World.uncoverMap(x, y, r, mask);
    return mask;
  },

  uncoverMap: function (x, y, r, mask) {
    mask[x][y] = true;
    for (var i = -r; i <= r; i++) {
      for (var j = -r + Math.abs(i); j <= r - Math.abs(i); j++) {
        if (y + j >= 0 && y + j <= World.RADIUS * 2 &&
          x + i <= World.RADIUS * 2 &&
          x + i >= 0) {
          mask[x + i][y + j] = true;
        }
      }
    }
  },

  applyMap: function () {
    var x = Math.floor(Math.random() * (World.RADIUS * 2) + 1);
    var y = Math.floor(Math.random() * (World.RADIUS * 2) + 1);
    World.uncoverMap(x, y, 5, $SM.get('game.world.mask'));
  },

  generateMap: function () {
    var map = new Array(World.RADIUS * 2 + 1);
    for (var i = 0; i <= World.RADIUS * 2; i++) {
      map[i] = new Array(World.RADIUS * 2 + 1);
    }
    // The Village is always at the exact center
    // Spiral out from there
    map[World.RADIUS][World.RADIUS] = World.TILE.VILLAGE;
    for (var r = 1; r <= World.RADIUS; r++) {
      for (var t = 0; t < r * 8; t++) {
        var x, y;
        if (t < 2 * r) {
          x = World.RADIUS - r + t;
          y = World.RADIUS - r;
        } else if (t < 4 * r) {
          x = World.RADIUS + r;
          y = World.RADIUS - (3 * r) + t;
        } else if (t < 6 * r) {
          x = World.RADIUS + (5 * r) - t;
          y = World.RADIUS + r;
        } else {
          x = World.RADIUS - r;
          y = World.RADIUS + (7 * r) - t;
        }

        map[x][y] = World.chooseTile(x, y, map);
      }
    }

    // Place landmarks
    for (var k in World.LANDMARKS) {
      var landmark = World.LANDMARKS[k];
      for (var i = 0; i < landmark.num; i++) {
        var pos = World.placeLandmark(landmark.minRadius, landmark.maxRadius, k, map);
        if (k == World.TILE.SHIP) {
          var dx = pos[0] - World.RADIUS, dy = pos[1] - World.RADIUS;
          var horz = dx < 0 ? '西' : '东';
          var vert = dy < 0 ? '北' : '南';
          if (Math.abs(dx) / 2 > Math.abs(dy)) {
            World.dir = horz;
          } else if (Math.abs(dy) / 2 > Math.abs(dx)) {
            World.dir = vert;
          } else {
            World.dir = vert + horz;
          }
        }
      }
    }

    return map;
  },

  placeLandmark: function (minRadius, maxRadius, landmark, map) {

    var x = World.RADIUS, y = World.RADIUS;
    while (!World.isTerrain(map[x][y])) {
      var r = Math.floor(Math.random() * (maxRadius - minRadius)) + minRadius;
      var xDist = Math.floor(Math.random() * r);
      var yDist = r - xDist;
      if (Math.random() < 0.5) xDist = -xDist;
      if (Math.random() < 0.5) yDist = -yDist;
      x = World.RADIUS + xDist;
      if (x < 0) x = 0;
      if (x > World.RADIUS * 2) x = World.RADIUS * 2;
      y = World.RADIUS + yDist;
      if (y < 0) y = 0;
      if (y > World.RADIUS * 2) y = World.RADIUS * 2;
    }
    map[x][y] = landmark;
    return [x, y];
  },

  isTerrain: function (tile) {
    return tile == World.TILE.FOREST || tile == World.TILE.FIELD || tile == World.TILE.BARRENS;
  },

  chooseTile: function (x, y, map) {

    var adjacent = [
      y > 0 ? map[x][y - 1] : null,
      y < World.RADIUS * 2 ? map[x][y + 1] : null,
      x < World.RADIUS * 2 ? map[x + 1][y] : null,
      x > 0 ? map[x - 1][y] : null
    ];

    var chances = {};
    var nonSticky = 1;
    for (var i in adjacent) {
      if (adjacent[i] == World.TILE.VILLAGE) {
        // Village must be in a forest to maintain thematic consistency, yo.
        return World.TILE.FOREST;
      } else if (typeof adjacent[i] == 'string') {
        var cur = chances[adjacent[i]];
        cur = typeof cur == 'number' ? cur : 0;
        chances[adjacent[i]] = cur + World.STICKINESS;
        nonSticky -= World.STICKINESS;
      }
    }
    for (var t in World.TILE) {
      var tile = World.TILE[t];
      if (World.isTerrain(tile)) {
        var cur = chances[tile];
        cur = typeof cur == 'number' ? cur : 0;
        cur += World.TILE_PROBS[tile] * nonSticky;
        chances[tile] = cur;
      }
    }

    var list = [];
    for (var t in chances) {
      list.push(chances[t] + '' + t);
    }
    list.sort(function (a, b) {
      var n1 = parseFloat(a.substring(0, a.length - 1));
      var n2 = parseFloat(b.substring(0, b.length - 1));
      return n2 - n1;
    });

    var c = 0;
    var r = Math.random();
    for (var i in list) {
      var prob = list[i];
      c += parseFloat(prob.substring(0, prob.length - 1));
      if (r < c) {
        return prob.charAt(prob.length - 1);
      }
    }

    return World.TILE.BARRENS;
  },

  markVisited: function (x, y) {
    World.state.map[x][y] = World.state.map[x][y] + '!';
  },

  drawMap: function () {
    var map = $('#map');
    if (map.length == 0) {
      map = new $('<div>').attr('id', 'map').appendTo('#worldOuter');
      // register click handler
      map.click(World.click);
    }
    var mapString = "";
    for (var j = 0; j <= World.RADIUS * 2; j++) {
      for (var i = 0; i <= World.RADIUS * 2; i++) {
        var ttClass = "";
        if (i > World.RADIUS) {
          ttClass += " left";
        } else {
          ttClass += " right";
        }
        if (j > World.RADIUS) {
          ttClass += " top";
        } else {
          ttClass += " bottom";
        }
        if (World.curPos[0] == i && World.curPos[1] == j) {
          mapString += '<span class="landmark">@<div class="tooltip ' + ttClass + '">你</div></span>';
        } else if (World.state.mask[i][j]) {
          var c = World.state.map[i][j];
          switch (c) {
            case World.TILE.VILLAGE:
              mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">小&nbsp;黑&nbsp;屋</div></span>';
              break;
            default:
              if (typeof World.LANDMARKS[c] != 'undefined' && (c != World.TILE.OUTPOST || !World.outpostUsed(i, j))) {
                mapString += '<span class="landmark">' + c + '<div class="tooltip' + ttClass + '">' + World.LANDMARKS[c].label + '</div></span>';
              } else {
                if (c.length > 1) {
                  c = c[0];
                }
                mapString += c;
              }
              break;
          }
        } else {
          mapString += '&nbsp;';
        }
      }
      mapString += '<br/>';
    }
    map.html(mapString);
  },

  die: function () {
    if (!World.dead) {
      World.dead = true;
      Engine.log('player death');
      Engine.event('game event', 'death');
      Engine.keyLock = true;
      // Dead! Discard any world changes and go home
      Notifications.notify(World, '整个世界都在消散');
      World.state = null;
      Path.outfit = {};
      $('#outerSlider').animate({ opacity: '0' }, 600, 'linear', function () {
        $('#outerSlider').css('left', '0px');
        $('#locationSlider').css('left', '0px');
        $('#storesContainer').css({ 'top': '0px', 'right': '0px' });
        Engine.activeModule = Room;
        $('div.headerButton').removeClass('selected');
        Room.tab.addClass('selected');
        setTimeout(function () {
          Room.onArrival();
          $('#outerSlider').animate({ opacity: '1' }, 600, 'linear');
          Button.cooldown($('#embarkButton'));
          Engine.keyLock = false;
        }, 2000);
      });
    }
  },

  goHome: function () {
    // Home safe! Commit the changes.
    $SM.setM('game.world', World.state);
    if (World.state.sulphurmine && $SM.get('game.buildings["硫磺矿"]', true) == 0) {
      $SM.add('game.buildings["硫磺矿"]', 1);
      Engine.event('progress', '硫磺矿');
    }
    if (World.state.ironmine && $SM.get('game.buildings["铁矿"]', true) == 0) {
      $SM.add('game.buildings["铁矿"]', 1);
      Engine.event('progress', '铁矿');
    }
    if (World.state.coalmine && $SM.get('game.buildings["煤矿"]', true) == 0) {
      $SM.add('game.buildings["煤矿"]', 1);
      Engine.event('progress', '煤矿');
    }
    if (World.state.ship && !$SM.get('features.location.spaceShip')) {
      Ship.init();
      Engine.event('progress', 'ship');
    }
    World.state = null;

    // Clear the embark cooldown
    var btn = Button.clearCooldown($('#embarkButton'));
    if (Path.outfit['腌肉'] > 0) {
      Button.setDisabled(btn, false);
    }

    for (var k in Path.outfit) {
      $SM.add('stores["' + k + '"]', Path.outfit[k]);
      if (World.leaveItAtHome(k)) {
        Path.outfit[k] = 0;
      }
    }

    $('#outerSlider').animate({ left: '0px' }, 300);
    Engine.activeModule = Path;
    Path.onArrival();
  },

  leaveItAtHome: function (thing) {
    return thing != '腌肉' && thing != '子弹' && thing != '燃料电池' && thing != '护身符' && thing != '医疗药剂'
      && typeof World.Weapons[thing] == 'undefined' && typeof Room.Craftables[thing] == 'undefined';
  },

  getMaxHealth: function () {
    if ($SM.get('stores["钢甲"]', true) > 0) {
      return World.BASE_HEALTH + 35;
    } else if ($SM.get('stores["铁甲"]', true) > 0) {
      return World.BASE_HEALTH + 15;
    } else if ($SM.get('stores["皮甲"]', true) > 0) {
      return World.BASE_HEALTH + 5;
    }
    return World.BASE_HEALTH;
  },

  getHitChance: function () {
    if ($SM.hasPerk('兰花佛穴手')) {
      return World.BASE_HIT_CHANCE + 0.1;
    }
    return World.BASE_HIT_CHANCE;
  },

  getMaxWater: function () {
    //World.BASE_WATER = 100;


    if ($SM.get('stores["水箱"]', true) > 0) {
      return World.BASE_WATER + 50;  //tim test, 原本50
    } else if ($SM.get('stores["水桶"]', true) > 0) {   //tim mark, in case of bug  stores.cask 
      return World.BASE_WATER + 20;
    } else if ($SM.get('stores["水袋"]', true) > 0) {  //same here
      return World.BASE_WATER + 10;
    }
    return World.BASE_WATER;
  },

  outpostUsed: function (x, y) {
    x = typeof x == 'number' ? x : World.curPos[0];
    y = typeof y == 'number' ? y : World.curPos[1];
    var used = World.usedOutposts[x + ',' + y];
    return typeof used != 'undefined' && used == true;
  },

  useOutpost: function () {
    Notifications.notify(null, '水又装满了');
    World.setWater(World.getMaxWater());
    // Mark this outpost as used
    World.usedOutposts[World.curPos[0] + ',' + World.curPos[1]] = true;
  },

  onArrival: function () {
    Engine.keyLock = false;
    // Explore in a temporary world-state. We'll commit the changes if you return home safe.
    World.state = $.extend(true, {}, $SM.get('game.world'));
    World.setWater(World.getMaxWater());
    World.setHp(World.getMaxHealth());
    World.foodMove = 0;
    World.waterMove = 0;
    World.starvation = false;
    World.thirst = false;
    World.usedOutposts = {};
    World.curPos = World.copyPos(World.VILLAGE_POS);
    World.drawMap();
    World.setTitle();
    World.dead = false;
    $('div#bagspace-world > div').empty();
    World.updateSupplies();
    $('#bagspace-world').width($('#map').width());
  },

  setTitle: function () {
    document.title = '贫瘠之地';
  },

  copyPos: function (pos) {
    return [pos[0], pos[1]];
  },

  handleStateUpdates: function (e) {

  }
};

/**
 * path
 * 
 */
var Path = {

  DEFAULT_BAG_SPACE: 10,

  // Everything not in this list weighs 1
  Weight: {
    '骨枪': 2,
    '铁剑': 3,
    '钢剑': 5,
    '步枪': 5,
    '子弹': 0.1,
    '燃料电池': 0.2,
    '镭射枪': 5,
    '链球': 0.5
  },

  name: 'Path',
  options: {}, // Nuthin'
  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    // Init the World
    World.init();

    // Create the path tab
    this.tab = Header.addLocation("探索者尘路", "path", Path);

    // Create the Path panel
    this.panel = $('<div>').attr('id', "pathPanel")
      .addClass('location')
      .appendTo('div#locationSlider');

    // Add the outfitting area
    var outfitting = $('<div>').attr('id', 'outfitting').appendTo(this.panel);
    $('<div>').attr('id', 'bagspace').appendTo(outfitting);

    // Add the embark button
    new Button.Button({
      id: 'embarkButton',
      text: "出发",
      click: Path.embark,
      width: '80px',
      cooldown: World.DEATH_COOLDOWN
    }).appendTo(this.panel);

    Path.outfit = {};

    Engine.updateSlider();

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Path.handleStateUpdates);
  },

  openPath: function () {
    Path.init();
    Engine.event('progress', 'path');
    Notifications.notify(Room, '罗盘指向 ' + World.dir);
  },

  getWeight: function (thing) {
    var w = Path.Weight[thing];
    if (typeof w != 'number') w = 1;

    return w;
  },

  getCapacity: function () {
    if ($SM.get('stores["大货车"]', true) > 0) {		//same  
      return Path.DEFAULT_BAG_SPACE + 60;   //tim test, should be 60
    } else if ($SM.get('stores["货车"]', true) > 0) { 			//same
      return Path.DEFAULT_BAG_SPACE + 30;
    } else if ($SM.get('stores["旅行包"]', true) > 0) {  //tim mark, in case of bug stores.rucksack
      return Path.DEFAULT_BAG_SPACE + 10;
    }
    return Path.DEFAULT_BAG_SPACE;
  },

  getFreeSpace: function () {
    var num = 0;
    if (Path.outfit) {
      for (var k in Path.outfit) {
        var n = Path.outfit[k];
        if (isNaN(n)) {
          // No idea how this happens, but I will fix it here!
          Path.outfit[k] = n = 0;
        }
        num += n * Path.getWeight(k);
      }
    }
    return Path.getCapacity() - num;
  },

  updatePerks: function () {
    if ($SM.get('character.perks')) {
      var perks = $('#perks');
      var needsAppend = false;
      if (perks.length == 0) {
        needsAppend = true;
        perks = $('<div>').attr('id', 'perks');
      }
      for (var k in $SM.get('character.perks')) {
        var id = 'perk_' + k.replace(' ', '-');
        var r = $('#' + id);
        if ($SM.get('character.perks["' + k + '"]') && r.length == 0) {
          r = $('<div>').attr('id', id).addClass('perkRow').appendTo(perks);
          $('<div>').addClass('row_key').text(k).appendTo(r);
          $('<div>').addClass('tooltip bottom right').text(Engine.Perks[k].desc).appendTo(r);
        }
      }

      if (needsAppend && perks.children().length > 0) {
        perks.appendTo(Path.panel);
      }

      if (Engine.activeModule === Path) {
        $('#storesContainer').css({ top: perks.height() + 26 + 'px' });
      }
    }
  },

  updateOutfitting: function () {
    var outfit = $('div#outfitting');

    if (!Path.outfit) {
      Path.outfit = {};
    }

    // Add the armour row
    var armour = "none";
    if ($SM.get('stores["钢甲"]', true) > 0)
      armour = "钢甲";
    else if ($SM.get('stores["铁甲"]', true) > 0)
      armour = "铁甲";
    else if ($SM.get('stores["皮甲"]', true) > 0)
      armour = "皮甲";
    var aRow = $('#armourRow');
    if (aRow.length == 0) {
      aRow = $('<div>').attr('id', 'armourRow').addClass('outfitRow').prependTo(outfit);
      $('<div>').addClass('row_key').text('防护装甲').appendTo(aRow);
      $('<div>').addClass('row_val').text(armour).appendTo(aRow);
      $('<div>').addClass('clear').appendTo(aRow);
    } else {
      $('.row_val', aRow).text(armour);
    }

    // Add the water row
    var wRow = $('#waterRow');
    if (wRow.length == 0) {
      wRow = $('<div>').attr('id', 'waterRow').addClass('outfitRow').insertAfter(aRow);
      $('<div>').addClass('row_key').text('水').appendTo(wRow);
      $('<div>').addClass('row_val').text(World.getMaxWater()).appendTo(wRow);
      $('<div>').addClass('clear').appendTo(wRow);
    } else {
      $('.row_val', wRow).text(World.getMaxWater());
    }


    var space = Path.getFreeSpace();
    var total = 0;
    // Add the non-craftables to the craftables
    var carryable = $.extend({
      '腌肉': { type: 'tool' },
      '子弹': { type: 'tool' },
      '手雷': { type: 'weapon' },
      '链球': { type: 'weapon' },
      '镭射枪': { type: 'weapon' },
      '燃料电池': { type: 'tool' },
      '刺刀': { type: 'weapon' },
      '护身符': { type: 'tool' },
      '医疗药剂': { type: 'tool' }
    }, Room.Craftables);

    for (var k in carryable) {
      var store = carryable[k];
      var have = $SM.get('stores["' + k + '"]');
      var num = Path.outfit[k];
      num = typeof num == 'number' ? num : 0;
      var numAvailable = $SM.get('stores["' + k + '"]', true);
      var row = $('div#outfit_row_' + k.replace(' ', '-'), outfit);
      if ((store.type == 'tool' || store.type == 'weapon') && have > 0) {
        total += num * Path.getWeight(k);
        if (row.length == 0) {
          row = Path.createOutfittingRow(k, num);

          var curPrev = null;
          outfit.children().each(function (i) {
            var child = $(this);
            if (child.attr('id').indexOf('outfit_row_') == 0) {
              var cName = child.attr('id').substring(11).replace('-', ' ');
              if (cName < k && (curPrev == null || cName > curPrev)) {
                curPrev = cName;
              }
            }
          });
          if (curPrev == null) {
            row.insertAfter(wRow);
          }
          else {
            row.insertAfter(outfit.find('#outfit_row_' + curPrev.replace(' ', '-')));
          }
        } else {
          $('div#' + row.attr('id') + ' > div.row_val > span', outfit).text(num);
          $('div#' + row.attr('id') + ' .tooltip .numAvailable', outfit).text(numAvailable - num);
        }
        if (num == 0) {
          $('.dnBtn', row).addClass('disabled');
          $('.dnManyBtn', row).addClass('disabled');
        } else {
          $('.dnBtn', row).removeClass('disabled');
          $('.dnManyBtn', row).removeClass('disabled');
        }
        if (num >= numAvailable || space < Path.getWeight(k)) {
          $('.upBtn', row).addClass('disabled');
          $('.upManyBtn', row).addClass('disabled');
        } else if (space >= Path.getWeight(k)) {
          $('.upBtn', row).removeClass('disabled');
          $('.upManyBtn', row).removeClass('disabled');
        }
      } else if (have == 0 && row.length > 0) {
        row.remove();
      }
    }

    // Update bagspace
    $('#bagspace').text('容量 ' + Math.floor(Path.getCapacity() - total) + '/' + Path.getCapacity());

    if (Path.outfit['腌肉'] > 0) {
      Button.setDisabled($('#embarkButton'), false);
    } else {
      Button.setDisabled($('#embarkButton'), true);
    }
  },

  createOutfittingRow: function (name, num) {
    var row = $('<div>').attr('id', 'outfit_row_' + name.replace(' ', '-')).addClass('outfitRow');
    $('<div>').addClass('row_key').text(name).appendTo(row);
    var val = $('<div>').addClass('row_val').appendTo(row);

    $('<span>').text(num).appendTo(val);
    $('<div>').addClass('upBtn').appendTo(val).click([1], Path.increaseSupply);
    $('<div>').addClass('dnBtn').appendTo(val).click([1], Path.decreaseSupply);
    $('<div>').addClass('upManyBtn').appendTo(val).click([10], Path.increaseSupply);
    $('<div>').addClass('dnManyBtn').appendTo(val).click([10], Path.decreaseSupply);
    $('<div>').addClass('clear').appendTo(row);

    var numAvailable = $SM.get('stores["' + name + '"]', true);
    var tt = $('<div>').addClass('tooltip bottom right').appendTo(row);
    $('<div>').addClass('row_key').text('重量').appendTo(tt);
    $('<div>').addClass('row_val').text(Path.getWeight(name)).appendTo(tt);
    $('<div>').addClass('row_key').text('库存').appendTo(tt);
    $('<div>').addClass('row_val').addClass('numAvailable').text(numAvailable).appendTo(tt);

    return row;
  },

  increaseSupply: function (btn) {
    var supply = $(this).closest('.outfitRow').children('.row_key').text().replace('-', ' ');
    Engine.log('increasing ' + supply + ' by up to ' + btn.data);
    var cur = Path.outfit[supply];
    cur = typeof cur == 'number' ? cur : 0;
    if (Path.getFreeSpace() >= Path.getWeight(supply) && cur < $SM.get('stores["' + supply + '"]', true)) {
      var maxExtraByWeight = Math.floor(Path.getFreeSpace() / Path.getWeight(supply));
      var maxExtraByStore = $SM.get('stores["' + supply + '"]', true) - cur;
      var maxExtraByBtn = btn.data;
      Path.outfit[supply] = cur + Math.min(maxExtraByBtn, Math.min(maxExtraByWeight, maxExtraByStore));
      Path.updateOutfitting();
    }
  },

  decreaseSupply: function (btn) {
    var supply = $(this).closest('.outfitRow').children('.row_key').text().replace('-', ' ');
    Engine.log('decreasing ' + supply + ' by up to ' + btn.data);
    var cur = Path.outfit[supply];
    cur = typeof cur == 'number' ? cur : 0;
    if (cur > 0) {
      Path.outfit[supply] = Math.max(0, cur - btn.data);
      Path.updateOutfitting();
    }
  },

  onArrival: function (transition_diff) {
    Path.setTitle();
    Path.updateOutfitting();
    Path.updatePerks();

    Engine.moveStoresView($('#perks'), transition_diff);
  },

  setTitle: function () {
    document.title = '探索者尘路';
  },

  embark: function () {
    for (var k in Path.outfit) {
      $SM.add('stores["' + k + '"]', -Path.outfit[k]);
    }
    World.onArrival();
    $('#outerSlider').animate({ left: '-700px' }, 300);
    Engine.activeModule = World;
  },

  handleStateUpdates: function (e) {
    if (e.category == 'character' && e.stateName.indexOf('character.perks') == 0 && Engine.activeModule == Path) {
      Path.updatePerks();
    };
  }
};
/**
 * ship
 * 
 */
/**
 * Module that registers the starship!
 */
var Ship = {
  LIFTOFF_COOLDOWN: 120,
  ALLOY_PER_HULL: 1,
  ALLOY_PER_THRUSTER: 1,
  BASE_HULL: 0,
  BASE_THRUSTERS: 1,

  name: "Ship",
  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    if (!$SM.get('features.location.spaceShip')) {
      $SM.set('features.location.spaceShip', true);
      $SM.setM('game.spaceShip', {
        hull: Ship.BASE_HULL,
        thrusters: Ship.BASE_THRUSTERS
      });
    }

    // Create the Ship tab
    this.tab = Header.addLocation("古老的飞船", "ship", Ship);

    // Create the Ship panel
    this.panel = $('<div>').attr('id', "shipPanel")
      .addClass('location')
      .appendTo('div#locationSlider');

    Engine.updateSlider();

    // Draw the hull label
    var hullRow = $('<div>').attr('id', 'hullRow').appendTo('div#shipPanel');
    $('<div>').addClass('row_key').text('外壳:').appendTo(hullRow);
    $('<div>').addClass('row_val').text($SM.get('game.spaceShip.hull')).appendTo(hullRow);
    $('<div>').addClass('clear').appendTo(hullRow);

    // Draw the thrusters label
    var engineRow = $('<div>').attr('id', 'engineRow').appendTo('div#shipPanel');
    $('<div>').addClass('row_key').text('引擎:').appendTo(engineRow);
    $('<div>').addClass('row_val').text($SM.get('game.spaceShip.thrusters')).appendTo(engineRow);
    $('<div>').addClass('clear').appendTo(engineRow);

    // Draw the reinforce button
    new Button.Button({
      id: 'reinforceButton',
      text: '加固船身',
      click: Ship.reinforceHull,
      width: '100px',
      cost: { '外星合金': Ship.ALLOY_PER_HULL }
    }).appendTo('div#shipPanel');

    // Draw the engine button
    new Button.Button({
      id: 'engineButton',
      text: '升级引擎',
      click: Ship.upgradeEngine,
      width: '100px',
      cost: { '外星合金': Ship.ALLOY_PER_THRUSTER }
    }).appendTo('div#shipPanel');

    // Draw the lift off button
    var b = new Button.Button({
      id: 'liftoffButton',
      text: '飞向火星',
      click: Ship.checkLiftOff,
      width: '100px',
      cooldown: Ship.LIFTOFF_COOLDOWN
    }).appendTo('div#shipPanel');

    if ($SM.get('game.spaceShip.hull') <= 0) {
      Button.setDisabled(b, true);
    }

    // Init Space
    Space.init();

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Ship.handleStateUpdates);
  },

  options: {}, // Nothing for now

  onArrival: function (transition_diff) {
    Ship.setTitle();
    if (!$SM.get('game.spaceShip.seenShip')) {
      Notifications.notify(Ship, '在大量机械残骸中, 古老的飞船停在岩石上, 已经等待得太久了.');
      $SM.set('game.spaceShip.seenShip', true);
    }

    Engine.moveStoresView(null, transition_diff);
  },

  setTitle: function () {
    if (Engine.activeModule == this) {
      document.title = "一艘古老的星际飞船";
    }
  },

  reinforceHull: function () {
    if ($SM.get('stores["外星合金"]', true) < Ship.ALLOY_PER_HULL) {
      Notifications.notify(Ship, "外星合金 不足");
      return false;
    }
    $SM.add('stores["外星合金"]', -Ship.ALLOY_PER_HULL);
    $SM.add('game.spaceShip.hull', 1);
    if ($SM.get('game.spaceShip.hull') > 0) {
      Button.setDisabled($('#liftoffButton', Ship.panel), false);
    }
    $('#hullRow .row_val', Ship.panel).text($SM.get('game.spaceShip.hull'));
  },

  upgradeEngine: function () {
    if ($SM.get('stores["外星合金"]', true) < Ship.ALLOY_PER_THRUSTER) {
      Notifications.notify(Ship, "外星合金 不足");
      return false;
    }
    $SM.add('stores["外星合金"]', -Ship.ALLOY_PER_THRUSTER);
    $SM.add('game.spaceShip.thrusters', 1);
    $('#engineRow .row_val', Ship.panel).text($SM.get('game.spaceShip.thrusters'));
  },

  getMaxHull: function () {
    return $SM.get('game.spaceShip.hull');
  },

  checkLiftOff: function () {
    if (!$SM.get('game.spaceShip.seenWarning')) {
      Events.startEvent({
        title: '真的准备离开了么?',
        scenes: {
          'start': {
            text: [
              "总算要离开这个失落之地了, 永远不回头!"
            ],
            buttons: {
              'fly': {
                text: '起飞',
                onChoose: function () {
                  $SM.set('game.spaceShip.seenWarning', true);
                  Ship.liftOff();
                },
                nextScene: 'end'
              },
              'wait': {
                text: '再考虑下',
                onChoose: function () {
                  Button.clearCooldown($('#liftoffButton'));
                },
                nextScene: 'end'
              }
            }
          }
        }
      });
    } else {
      Ship.liftOff();
    }
  },

  liftOff: function () {
    $('#outerSlider').animate({ top: '700px' }, 300);
    Space.onArrival();
    Engine.activeModule = Space;
  },

  handleStateUpdates: function (e) {

  }
};
/**
 * space
 * 
 */
/**
 * Module that registers spaaaaaaaaace!
 */
var Space = {
  SHIP_SPEED: 3,
  BASE_ASTEROID_DELAY: 500,
  BASE_ASTEROID_SPEED: 1500,
  FTB_SPEED: 60000,
  STAR_WIDTH: 3000,
  STAR_HEIGHT: 3000,
  NUM_STARS: 200,
  STAR_SPEED: 60000,
  FRAME_DELAY: 100,

  stars: null,
  backStars: null,
  ship: null,
  lastMove: null,
  done: false,
  shipX: null,
  shipY: null,

  hull: 0,

  name: "Space",
  init: function (options) {
    this.options = $.extend(
      this.options,
      options
    );

    // Create the Space panel
    this.panel = $('<div>').attr('id', "spacePanel")
      .addClass('location')
      .appendTo('#outerSlider');

    // Create the ship
    Space.ship = $('<div>').text("@").attr('id', 'ship').appendTo(this.panel);

    // Create the hull display
    var h = $('<div>').attr('id', 'hullRemaining').appendTo(this.panel);
    $('<div>').addClass('row_key').text('外壳: ').appendTo(h);
    $('<div>').addClass('row_val').appendTo(h);

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(Space.handleStateUpdates);
  },

  options: {}, // Nothing for now

  onArrival: function () {
    Space.done = false;
    Engine.keyLock = false;
    Space.hull = Ship.getMaxHull();
    Space.altitude = 0;
    Space.setTitle();
    Space.updateHull();

    Space.up =
      Space.down =
      Space.left =
      Space.right = false;

    Space.ship.css({
      top: '350px',
      left: '350px'
    });
    Space.startAscent();
    Space._shipTimer = setInterval(Space.moveShip, 33);
  },

  setTitle: function () {
    if (Engine.activeModule == this) {
      var t;
      if (Space.altitude < 10) {
        t = "Troposphere";
      } else if (Space.altitude < 20) {
        t = "Stratosphere";
      } else if (Space.altitude < 30) {
        t = "Mesosphere";
      } else if (Space.altitude < 45) {
        t = "Thermosphere";
      } else if (Space.altitude < 60) {
        t = "Exosphere";
      } else {
        t = "Space";
      }
      document.title = t;
    }
  },

  getSpeed: function () {
    return Space.SHIP_SPEED + $SM.get('game.spaceShip.thrusters');
  },

  updateHull: function () {
    $('div#hullRemaining div.row_val', Space.panel).text(Space.hull + '/' + Ship.getMaxHull());
  },

  createAsteroid: function (noNext) {
    var r = Math.random();
    var c;
    if (r < 0.2)
      c = '#';
    else if (r < 0.4)
      c = '$';
    else if (r < 0.6)
      c = '%';
    else if (r < 0.8)
      c = '&';
    else
      c = 'H';

    var x = Math.floor(Math.random() * 700);
    var a = $('<div>').addClass('asteroid').text(c).appendTo('#spacePanel').css('left', x + 'px');
    a.data({
      xMin: x,
      xMax: x + a.width(),
      height: a.height()
    });
    a.animate({
      top: '740px'
    }, {
      duration: Space.BASE_ASTEROID_SPEED - Math.floor(Math.random() * (Space.BASE_ASTEROID_SPEED * 0.65)),
      easing: 'linear',
      progress: function () {
        // Collision detection
        var t = $(this);
        if (t.data('xMin') <= Space.shipX && t.data('xMax') >= Space.shipX) {
          var aY = t.css('top');
          aY = parseFloat(aY.substring(0, aY.length - 2));

          if (aY <= Space.shipY && aY + t.data('height') >= Space.shipY) {
            // Collision
            Engine.log('collision');
            t.remove();
            Space.hull--;
            Space.updateHull();
            if (Space.hull == 0) {
              Space.crash();
            }
          }
        }
      },
      complete: function () {
        $(this).remove();
      }
    });
    if (!noNext) {

      // Harder
      if (Space.altitude > 10) {
        Space.createAsteroid(true);
      }

      // HARDER
      if (Space.altitude > 20) {
        Space.createAsteroid(true);
        Space.createAsteroid(true);
      }

      // HAAAAAARDERRRRR!!!!1
      if (Space.altitude > 40) {
        Space.createAsteroid(true);
        Space.createAsteroid(true);
      }

      if (!Space.done) {
        setTimeout(Space.createAsteroid, 1000 - (Space.altitude * 10));
      }
    }
  },

  moveShip: function () {
    var x = Space.ship.css('left');
    x = parseFloat(x.substring(0, x.length - 2));
    var y = Space.ship.css('top');
    y = parseFloat(y.substring(0, y.length - 2));

    var dx = 0, dy = 0;

    if (Space.up) {
      dy -= Space.getSpeed();
    } else if (Space.down) {
      dy += Space.getSpeed();
    }
    if (Space.left) {
      dx -= Space.getSpeed();
    } else if (Space.right) {
      dx += Space.getSpeed();
    }

    if (dx != 0 && dy != 0) {
      dx = dx / Math.sqrt(2);
      dy = dy / Math.sqrt(2);
    }

    if (Space.lastMove != null) {
      var dt = Date.now() - Space.lastMove;
      dx *= dt / 33;
      dy *= dt / 33;
    }

    x = x + dx;
    y = y + dy;
    if (x < 10) {
      x = 10;
    } else if (x > 690) {
      x = 690;
    }
    if (y < 10) {
      y = 10;
    } else if (y > 690) {
      y = 690;
    }

    Space.shipX = x;
    Space.shipY = y;

    Space.ship.css({
      left: x + 'px',
      top: y + 'px'
    });

    Space.lastMove = Date.now();
  },

  startAscent: function () {
    if (Engine.isLightsOff()) {
      var body_color = '#272823';
      var to_color = '#EEEEEE';
    }
    else {
      var body_color = '#FFFFFF';
      var to_color = '#000000';
    }

    $('body').addClass('noMask').css({ backgroundColor: body_color }).animate({
      backgroundColor: to_color
    }, {
      duration: Space.FTB_SPEED,
      easing: 'linear',
      progress: function () {
        var cur = $('body').css('background-color');
        var s = 'linear-gradient(rgba' + cur.substring(3, cur.length - 1) + ', 0) 0%, rgba' +
          cur.substring(3, cur.length - 1) + ', 1) 100%)';
        $('#notifyGradient').attr('style', 'background-color:' + cur + ';background:-webkit-' + s + ';background:' + s);
      },
      complete: Space.endGame
    });
    Space.drawStars();
    Space._timer = setInterval(function () {
      Space.altitude += 1;
      if (Space.altitude % 10 == 0) {
        Space.setTitle();
      }
      if (Space.altitude > 60) {
        clearInterval(Space._timer);
      }
    }, 1000);

    Space._panelTimeout = setTimeout(function () {
      if (Engine.isLightsOff())
        $('#spacePanel, .menu').animate({ color: '#272823' }, 500, 'linear');
      else
        $('#spacePanel, .menu').animate({ color: 'white' }, 500, 'linear');
    }, Space.FTB_SPEED / 2);

    Space.createAsteroid();
  },

  drawStars: function (duration) {
    var starsContainer = $('<div>').attr('id', 'starsContainer').appendTo('body');
    Space.stars = $('<div>').css('bottom', '0px').attr('id', 'stars').appendTo(starsContainer);
    var s1 = $('<div>').css({
      width: Space.STAR_WIDTH + 'px',
      height: Space.STAR_HEIGHT + 'px'
    });
    var s2 = s1.clone();
    Space.stars.append(s1).append(s2);
    Space.drawStarAsync(s1, s2, 0);
    Space.stars.data('speed', Space.STAR_SPEED);
    Space.startAnimation(Space.stars);

    Space.starsBack = $('<div>').css('bottom', '0px').attr('id', 'starsBack').appendTo(starsContainer);
    s1 = $('<div>').css({
      width: Space.STAR_WIDTH + 'px',
      height: Space.STAR_HEIGHT + 'px'
    });
    s2 = s1.clone();
    Space.starsBack.append(s1).append(s2);
    Space.drawStarAsync(s1, s2, 0);
    Space.starsBack.data('speed', Space.STAR_SPEED * 2);
    Space.startAnimation(Space.starsBack);
  },

  startAnimation: function (el) {
    el.animate({ bottom: '-3000px' }, el.data('speed'), 'linear', function () {
      $(this).css('bottom', '0px');
      Space.startAnimation($(this));
    });
  },

  drawStarAsync: function (el, el2, num) {
    var top = Math.floor(Math.random() * Space.STAR_HEIGHT) + 'px';
    var left = Math.floor(Math.random() * Space.STAR_WIDTH) + 'px';
    $('<div>').text('.').addClass('star').css({
      top: top,
      left: left
    }).appendTo(el);
    $('<div>').text('.').addClass('star').css({
      top: top,
      left: left
    }).appendTo(el2);
    if (num < Space.NUM_STARS) {
      setTimeout(function () { Space.drawStarAsync(el, el2, num + 1); }, 100);
    }
  },

  crash: function () {
    if (Space.done) return;
    Engine.keyLock = true;
    Space.done = true;
    clearInterval(Space._timer);
    clearInterval(Space._shipTimer);
    clearTimeout(Space._panelTimeout);
    if (Engine.isLightsOff())
      var body_color = '#272823';
    else
      var body_color = '#FFFFFF';
    // Craaaaash!
    $('body').removeClass('noMask').stop().animate({
      backgroundColor: body_color
    }, {
      duration: 300,
      progress: function () {
        var cur = $('body').css('background-color');
        var s = 'linear-gradient(rgba' + cur.substring(3, cur.length - 1) + ', 0) 0%, rgba' +
          cur.substring(3, cur.length - 1) + ', 1) 100%)';
        $('#notifyGradient').attr('style', 'background-color:' + cur + ';background:-webkit-' + s + ';background:' + s);
      },
      complete: function () {
        Space.stars.remove();
        Space.starsBack.remove();
        Space.stars = Space.starsBack = null;
        $('#starsContainer').remove();
        $('body').attr('style', '');
        $('#notifyGradient').attr('style', '');
        $('#spacePanel').attr('style', '');
      }
    });
    $('.menu').animate({ color: '#666' }, 300, 'linear');
    $('#outerSlider').animate({ top: '0px' }, 300, 'linear');
    Engine.activeModule = Ship;
    Ship.onArrival();
    Button.cooldown($('#liftoffButton'));
    Engine.event('progress', 'crash');
  },

  endGame: function () {
    if (Space.done) return;
    Engine.event('progress', 'win');
    Space.done = true;
    clearInterval(Space._timer);
    clearInterval(Space._shipTimer);
    clearTimeout(Engine._saveTimer);
    clearTimeout(Outside._popTimeout);
    clearTimeout(Engine._incomeTimeout);
    clearTimeout(Events._eventTimeout);
    clearTimeout(Room._fireTimer);
    clearTimeout(Room._tempTimer);
    for (var k in Room.Craftables) {
      Room.Craftables[k].button = null;
    }
    for (var k in Room.TradeGoods) {
      Room.TradeGoods[k].button = null;
    }
    delete Outside._popTimeout;

    $('#hullRemaining', Space.panel).animate({ opacity: 0 }, 500, 'linear');
    Space.ship.animate({
      top: '350px',
      left: '240px'
    }, 3000, 'linear', function () {
      setTimeout(function () {
        Space.ship.animate({
          top: '-100px'
        }, 200, 'linear', function () {
          // Restart everything! Play FOREVER!
          $('#outerSlider').css({ 'left': '0px', 'top': '0px' });
          $('#locationSlider, #worldPanel, #spacePanel, #notifications').remove();
          $('#header').empty();
          setTimeout(function () {
            $('body').stop();
            if (Engine.isLightsOff())
              var container_color = '#EEE';
            else
              var container_color = '#000';
            $('#starsContainer').animate({
              opacity: 0,
              'background-color': container_color
            }, {
              duration: 2000,
              progress: function () {
                var cur = $('body').css('background-color');
                var s = 'linear-gradient(rgba' + cur.substring(3, cur.length - 1) + ', 0) 0%, rgba' +
                  cur.substring(3, cur.length - 1) + ', 1) 100%)';
                $('#notifyGradient').attr('style', 'background-color:' + cur + ';background:-webkit-' + s + ';background:' + s);
              },
              complete: function () {
                Engine.GAME_OVER = true;

                Score.save();
                Prestige.save();

                $('<center>')
                  .addClass('centerCont')
                  .appendTo('body');
                $('<span>')
                  .addClass('endGame')
                  .text('本局游戏积分: ' + Score.calculateScore())
                  .appendTo('.centerCont')
                  .animate({ opacity: 1 }, 1500);
                $('<br />')
                  .appendTo('.centerCont');
                $('<span>')
                  .addClass('endGame')
                  .text('总计游戏积分: ' + Prestige.get().score)
                  .appendTo('.centerCont')
                  .animate({ opacity: 1 }, 1500);
                $('<br />')
                  .appendTo('.centerCont');
                $('<br />')
                  .appendTo('.centerCont');
                $('#starsContainer').remove();
                $('#content, #notifications').remove();
                $('<span>')
                  .addClass('endGame endGameRestart')
                  .text('重新开始游戏')
                  .click(Engine.confirmDelete)
                  .appendTo('.centerCont')
                  .animate({ opacity: 1 }, 1500);
                Engine.options = {};
                Engine.deleteSave(true);
              }
            });
          }, 2000);
        });
      }, 2000);
    });
  },

  keyDown: function (event) {
    switch (event.which) {
      case 38: // Up
      case 87:
        Space.up = true;
        Engine.log('up on');
        break;
      case 40: // Down
      case 83:
        Space.down = true;
        Engine.log('down on');
        break;
      case 37: // Left
      case 65:
        Space.left = true;
        Engine.log('left on');
        break;
      case 39: // Right
      case 68:
        Space.right = true;
        Engine.log('right on');
        break;
    }
  },

  keyUp: function (event) {
    switch (event.which) {
      case 38: // Up
      case 87:
        Space.up = false;
        Engine.log('up off');
        break;
      case 40: // Down
      case 83:
        Space.down = false;
        Engine.log('down off');
        break;
      case 37: // Left
      case 65:
        Space.left = false;
        Engine.log('left off');
        break;
      case 39: // Right
      case 68:
        Space.right = false;
        Engine.log('right off');
        break;
    }
  },

  handleStateUpdates: function (e) {

  }
};

/**
 * prestige
 * 
 */
var Prestige = {

  name: 'Prestige',

  options: {},

  init: function (options) {
    this.options = $.extend(this.options, options);
  },

  storesMap: [
    { store: '木头', type: 'g' },
    { store: '毛皮', type: 'g' },
    { store: '肉', type: 'g' },
    { store: '铁', type: 'g' },
    { store: '煤', type: 'g' },
    { store: '硫磺', type: 'g' },
    { store: '钢', type: 'g' },
    { store: '腌肉', type: 'g' },
    { store: '鳞片', type: 'g' },
    { store: '牙齿', type: 'g' },
    { store: '皮革', type: 'g' },
    { store: '诱饵', type: 'g' },
    { store: '火炬', type: 'g' },
    { store: '布匹', type: 'g' },
    { store: '骨枪', type: 'w' },
    { store: '铁剑', type: 'w' },
    { store: '钢剑', type: 'w' },
    { store: '刺刀', type: 'w' },
    { store: '步枪', type: 'w' },
    { store: '镭射枪', type: 'w' },
    { store: '子弹', type: 'a' },
    { store: '燃料电池', type: 'a' },
    { store: '手雷', type: 'a' },
    { store: '链球', type: 'a' }
  ],

  getStores: function (reduce) {
    var stores = [];

    for (var i in this.storesMap) {
      var s = this.storesMap[i];
      stores.push($SM.get('stores["' + s.store + '"]', true) /
        (reduce ? this.randGen(s.type) : 1));
    }

    return stores;
  },

  get: function () {
    return {
      stores: $SM.get('previous.stores'),
      score: $SM.get('previous.score')
    };
  },

  set: function (prestige) {
    $SM.set('previous.stores', prestige.stores);
    $SM.set('previous.score', prestige.score);
  },

  save: function () {
    $SM.set('previous.stores', this.getStores(true));
    $SM.set('previous.score', Score.totalScore());
  },

  collectStores: function () {
    var prevStores = $SM.get('previous.stores');
    if (prevStores != null) {
      var toAdd = {};
      for (var i in this.storesMap) {
        var s = this.storesMap[i];
        toAdd[s.store] = prevStores[i];
      }
      $SM.addM('stores', toAdd);

      // Loading the stores clears em from the save
      prevStores.length = 0;
    }
  },

  randGen: function (storeType) {
    switch (storeType) {
      case 'g':
        return Math.floor(Math.random() * 10);
      case 'w':
        return Math.floor(Math.floor(Math.random() * 10) / 2);
      case 'a':
        return Math.ceil(Math.random() * 10 * Math.ceil(Math.random() * 10));
      default:
        return 1;
    }
  }

};

/**
 * scoring
 * 
 */
var Score = {

  name: 'Score',

  options: {},

  init: function (options) {
    this.options = $.extend(this.options, options);
  },

  calculateScore: function () {
    var scoreUnadded = Prestige.getStores(false);
    var fullScore = 0;
    fullScore = fullScore + scoreUnadded[0] * 1;
    fullScore = fullScore + scoreUnadded[1] * 1.5;
    fullScore = fullScore + scoreUnadded[2] * 1;
    fullScore = fullScore + scoreUnadded[3] * 2;
    fullScore = fullScore + scoreUnadded[4] * 2;
    fullScore = fullScore + scoreUnadded[5] * 3;
    fullScore = fullScore + scoreUnadded[6] * 3;
    fullScore = fullScore + scoreUnadded[7] * 2;
    fullScore = fullScore + scoreUnadded[8] * 2;
    fullScore = fullScore + scoreUnadded[9] * 2;
    fullScore = fullScore + scoreUnadded[10] * 2;
    fullScore = fullScore + scoreUnadded[11] * 1.5;
    fullScore = fullScore + scoreUnadded[12] * 1;
    fullScore = fullScore + scoreUnadded[13] * 1;
    fullScore = fullScore + scoreUnadded[14] * 10;
    fullScore = fullScore + scoreUnadded[15] * 30;
    fullScore = fullScore + scoreUnadded[16] * 50;
    fullScore = fullScore + scoreUnadded[17] * 100;
    fullScore = fullScore + scoreUnadded[18] * 150;
    fullScore = fullScore + scoreUnadded[19] * 150;
    fullScore = fullScore + scoreUnadded[20] * 3;
    fullScore = fullScore + scoreUnadded[21] * 3;
    fullScore = fullScore + scoreUnadded[22] * 5;
    fullScore = fullScore + scoreUnadded[23] * 4;
    fullScore = fullScore + $SM.get('stores["外星合金"]', true) * 10;
    fullScore = fullScore + Ship.getMaxHull() * 50;
    return Math.floor(fullScore);
  },

  save: function () {
    $SM.set('playStats.score', Score.calculateScore());
  },

  totalScore: function () {
    return $SM.get('previous.score', true) + Score.calculateScore();
  }
};
/**
 * events/global
 * 
 */
/**
 * Events that can occur when any module is active (Except World. It's special.)
 **/
Events.Global = [
  { /* The Thief */
    title: '小偷',
    isAvailable: function () {
      return (Engine.activeModule == Room || Engine.activeModule == Outside) && $SM.get('game["小偷"]') == 1;
    },
    scenes: {
      'start': {
        text: [
          '村名们从储藏室拖出了一个肮脏的家伙.',
          "他的家人偷走了一些物资.",
          '他应该被绞死以示惩罚.'
        ],
        notification: '一个小偷被抓住了',
        buttons: {
          'kill': {
            text: '吊死他',
            nextScene: { 1: 'hang' }
          },
          'spare': {
            text: '释放他',
            nextScene: { 1: 'spare' }
          }
        }
      },
      'hang': {
        text: [
          '村名们把小偷吊死在了储藏室前面.',
          '在强大的压力下, 丢失的物资很快就被退回来了.'
        ],
        onLoad: function () {
          $SM.set('game["小偷"]', 2);
          $SM.remove('income["小偷"]');
          $SM.addM('stores', $SM.get('game.stolen'));
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'spare': {
        text: [
          "小偷感谢不杀之恩, 他说再也不偷了.",
          "他在离开之前把他的那些偷偷摸摸的技巧分享给了大家."
        ],
        onLoad: function () {
          $SM.set('game["小偷"]', 2);
          $SM.remove('income["小偷"]');
          $SM.addPerk('潜行术');
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  }
];
/**
 * events/room
 * 
 */
/**
 * Events that can occur when the Room module is active
 **/
Events.Room = [
  { /* The Nomad  --  Merchant */
    title: '游牧帐篷',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('stores.毛皮', true) > 0;
    },
    scenes: {
      'start': {
        text: [
          '一个游牧贸易团进入了视野, 他们携带了很多粗糙的麻线袋, 装满了货物.',
          "他们没有说他们从那里来, 显然也不会一直呆在这里."
        ],
        notification: '一个游牧帐篷抵达并寻求贸易',
        buttons: {
          'buyScales': {
            text: '购买 鳞片',
            cost: { '毛皮': 100 },
            reward: { '鳞片': 1 }
          },
          'buyTeeth': {
            text: '购买 牙齿',
            cost: { '毛皮': 200 },
            reward: { '牙齿': 1 }
          },
          'buyBait': {
            text: '购买 诱饵',
            cost: { '毛皮': 5 },
            reward: { '诱饵': 1 },
            notification: '带诱饵的陷阱更有效.'
          },
          'buyCompass': {
            available: function () {
              return $SM.get('stores["罗盘"]', true) < 1;
            },
            text: '购买 罗盘',
            cost: { '毛皮': 300, '鳞片': 15, '牙齿': 5 },
            reward: { '罗盘': 1 },
            notification: '罗盘看上去很旧, 布满了灰尘, 但是依旧工作良好.',
            onChoose: Path.openPath
          },
          'goodbye': {
            text: '再见',
            nextScene: 'end'
          }
        }
      }
    }
  }, { /* Noises Outside  --  gain wood/fur */
    title: '噪音',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('stores["木头"]');
    },
    scenes: {
      'start': {
        text: [
          '嘈杂声穿墙入耳.',
          "不知道发生了什么事."
        ],
        notification: '怪的声音穿墙而来',
        buttons: {
          'investigate': {
            text: '调查',
            nextScene: { 0.3: 'stuff', 1: 'nothing' }
          },
          'ignore': {
            text: '无视',
            nextScene: 'end'
          }
        }
      },
      'nothing': {
        text: [
          '模糊的身影移动着进入了黑暗.',
          '噪音消失了.'
        ],
        buttons: {
          'backinside': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'stuff': {
        reward: { '木头': 100, '毛皮': 10 },
        text: [
          '一大捆用毛皮绑着的木头躺在门槛上.',
          '黑夜再次趋于宁静.'
        ],
        buttons: {
          'backinside': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  { /* Noises Inside  --  trade wood for better good */
    title: '噪音',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('stores["木头"]');
    },
    scenes: {
      start: {
        text: [
          '摩擦声从储藏室内传来.',
          '一定有什么东西在那.'
        ],
        notification: '有东西在储藏室',
        buttons: {
          'investigate': {
            text: '调查',
            nextScene: { 0.5: '鳞片', 0.8: '牙齿', 1: '布匹' }
          },
          'ignore': {
            text: '忽略',
            nextScene: 'end'
          }
        }
      },
      '鳞片': {
        text: [
          '一些木头不见了.',
          '地上有很多细小的鳞片'
        ],
        onLoad: function () {
          var numWood = $SM.get('stores["木头"]', true);
          numWood = Math.floor(numWood * 0.1);
          if (numWood == 0) numWood = 1;
          var numScales = Math.floor(numWood / 5);
          if (numScales == 0) numScales = 1;
          $SM.addM('stores', { '木头': -numWood, '鳞片': numScales });
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      '牙齿': {
        text: [
          '一些木头丢失了.',
          '地面流下了一些破碎的牙齿'
        ],
        onLoad: function () {
          var numWood = $SM.get('stores["木头"]', true);
          numWood = Math.floor(numWood * 0.1);
          if (numWood == 0) numWood = 1;
          var numTeeth = Math.floor(numWood / 5);
          if (numTeeth == 0) numTeeth = 1;
          $SM.addM('stores', { '木头': -numWood, '牙齿': numTeeth });
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      '布匹': {
        text: [
          '丢失了一些木头.',
          '地上有很多碎步屑'
        ],
        onLoad: function () {
          var numWood = $SM.get('stores["木头"]', true);
          numWood = Math.floor(numWood * 0.1);
          if (numWood == 0) numWood = 1;
          var numCloth = Math.floor(numWood / 5);
          if (numCloth == 0) numCloth = 1;
          $SM.addM('stores', { '木头': -numWood, '布匹': numCloth });
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  { /* The Beggar  --  trade fur for better good */
    title: '乞丐',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('stores["毛皮"]');
    },
    scenes: {
      start: {
        text: [
          '来了一个乞丐.',
          '乞求能给他一点暖和身子的皮毛.'
        ],
        notification: '来了一个乞丐',
        buttons: {
          '50furs': {
            text: '给 50',
            cost: { '毛皮': 50 },
            nextScene: { 0.5: '鳞片', 0.8: '牙齿', 1: '布匹' }
          },
          '100furs': {
            text: '给 100',
            cost: { '毛皮': 100 },
            nextScene: { 0.5: '牙齿', 0.8: '鳞片', 1: '布匹' }
          },
          'deny': {
            text: '撵走他',
            nextScene: 'end'
          }
        }
      },
      '鳞片': {
        reward: { '鳞片': 20 },
        text: [
          '乞丐感激异常.',
          '留下一堆20的鳞片.'
        ],
        buttons: {
          'leave': {
            text: '再见',
            nextScene: 'end'
          }
        }
      },
      '牙齿': {
        reward: { '牙齿': 20 },
        text: [
          '乞丐感激异常.',
          '留下一堆20的牙齿.'
        ],
        buttons: {
          'leave': {
            text: '再见',
            nextScene: 'end'
          }
        }
      },
      '布匹': {
        reward: { '布匹': 20 },
        text: [
          '乞丐感激异常.',
          '留下一堆20的布料.'
        ],
        buttons: {
          'leave': {
            text: '再见',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* Mysterious Wanderer  --  wood gambling */
    title: '神秘流浪者',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('stores["木头"]');
    },
    scenes: {
      start: {
        text: [
          '一个流浪汉带着一个空筐子来到了木屋, 说如果能给她一些木头带走, 他之后会带来更多.',
          "工人不知道他是否值得信任."
        ],
        notification: '一个神秘的流浪汉抵达',
        buttons: {
          '100wood': {
            text: '给 100',
            cost: { '木头': 100 },
            nextScene: { 1: '100wood' }
          },
          '500wood': {
            text: '给 500',
            cost: { '木头': 500 },
            nextScene: { 1: '500wood' }
          },
          'deny': {
            text: '撵走他',
            nextScene: 'end'
          }
        }
      },
      '100wood': {
        text: [
          '流浪汉离开了, 筐子满载木头'
        ],
        onLoad: function () {
          if (Math.random() < 0.5) {
            setTimeout(function () {
              $SM.add('stores["木头"]', 300);
              Notifications.notify(Room, '流浪女回来了, 带回来了300的木头.');
            }, 60 * 1000);
          }
        },
        buttons: {
          'leave': {
            text: '再见',
            nextScene: 'end'
          }
        }
      },
      '500wood': {
        text: [
          '流浪汉离开了, 筐子满载木头'
        ],
        onLoad: function () {
          if (Math.random() < 0.3) {
            setTimeout(function () {
              $SM.add('stores["木头"]', 1500);
              Notifications.notify(Room, '流浪女回来了, 带回来了1500的木头.');
            }, 60 * 1000);
          }
        },
        buttons: {
          'leave': {
            text: '再见',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* Mysterious Wanderer  --  fur gambling */
    title: '神秘流浪者',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('stores["毛皮"]');
    },
    scenes: {
      start: {
        text: [
          '一个流浪女带着一个空筐子来到了木屋, 说如果能给她一些皮毛带走, 她之后会带来更多.',
          "工人不知道她是否值得信任."
        ],
        notification: '一个神秘的流浪女抵达',
        buttons: {
          '100fur': {
            text: '给 100',
            cost: { '毛皮': 100 },
            nextScene: { 1: '100fur' }
          },
          '500fur': {
            text: '给 500',
            cost: { '毛皮': 500 },
            nextScene: { 1: '500fur' }
          },
          'deny': {
            text: '撵走她',
            nextScene: 'end'
          }
        }
      },
      '100fur': {
        text: [
          '流浪女离开了, 筐子满载皮毛'
        ],
        onLoad: function () {
          if (Math.random() < 0.5) {
            setTimeout(function () {
              $SM.add('stores["毛皮"]', 300);
              Notifications.notify(Room, '流浪女回来了, 带回来了300的皮毛.');
            }, 60 * 1000);
          }
        },
        buttons: {
          'leave': {
            text: '再见',
            nextScene: 'end'
          }
        }
      },
      '500fur': {
        text: [
          '流浪女离开了, 筐子满载皮毛'
        ],
        onLoad: function () {
          if (Math.random() < 0.3) {
            setTimeout(function () {
              $SM.add('stores["毛皮"]', 1500);
              Notifications.notify(Room, '流浪女回来了, 带回来了1500的皮毛');
            }, 60 * 1000);
          }
        },
        buttons: {
          'leave': {
            text: '再见',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* The Scout  --  Map Merchant */
    title: '侦察兵',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('features.location.world');
    },
    scenes: {
      'start': {
        text: [
          "这个侦察兵说她已经去过所有的地图了.",
          "她愿意谈谈地图, 当然不是免费的."
        ],
        notification: '一个侦察兵在夜幕中到来',
        buttons: {
          'buyMap': {
            text: '购买地图',
            cost: { '毛皮': 200, '鳞片': 10 },
            notification: '地图包含大地图的一角',
            onChoose: World.applyMap
          },
          'learn': {
            text: '学习侦察',
            cost: { '毛皮': 1000, '鳞片': 50, '牙齿': 20 },
            available: function () {
              return !$SM.hasPerk('千里眼');
            },
            onChoose: function () {
              $SM.addPerk('千里眼');
            }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* The Wandering Master */
    title: '大师',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('features.location.world');
    },
    scenes: {
      'start': {
        text: [
          '一个年老的流浪汉出现了',
          '他微笑着青请求寄宿过夜.'
        ],
        notification: '一个年老的流浪汉出现了',
        buttons: {
          'agree': {
            text: '同意',
            cost: {
              '腌肉': 100,
              '毛皮': 100,
              '火炬': 1
            },
            nextScene: { 1: 'agree' }
          },
          'deny': {
            text: '撵走他',
            nextScene: 'end'
          }
        }
      },
      'agree': {
        text: [
          '作为交换, 老流浪汉分享了他的智慧.'
        ],
        buttons: {
          'evasion': {
            text: '逃脱术',
            available: function () {
              return !$SM.hasPerk('凌波微步');
            },
            onChoose: function () {
              $SM.addPerk('凌波微步');
            },
            nextScene: 'end'
          },
          'precision': {
            text: '精准术',
            available: function () {
              return !$SM.hasPerk('兰花佛穴手');
            },
            onChoose: function () {
              $SM.addPerk('兰花佛穴手');
            },
            nextScene: 'end'
          },
          'force': {
            text: '力量大师',
            available: function () {
              return !$SM.hasPerk('降龙十八掌');
            },
            onChoose: function () {
              $SM.addPerk('降龙十八掌');
            },
            nextScene: 'end'
          },
          'nothing': {
            text: '无视',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* The Sick Man */
    title: '病人',
    isAvailable: function () {
      return Engine.activeModule == Room && $SM.get('stores["医疗药剂"]', true) > 0;
    },
    scenes: {
      'start': {
        text: [
          "一个男人躬着身, 咳嗽.",
          "他乞求一些治疗药剂."
        ],
        notification: '一个病人蹒跚而至',
        buttons: {
          'help': {
            text: '给 1 治疗药剂',
            cost: { '医疗药剂': 1 },
            notification: '这个男人狼吞虎咽喝掉了治疗药剂',
            nextScene: { 0.1: 'alloy', 0.3: 'cells', 0.5: '鳞片', 1.0: 'nothing' }
          },
          'ignore': {
            text: '撵他走',
            nextScene: 'end'
          }
        }
      },
      'alloy': {
        text: [
          "这个男人很感激.",
          '他留下了他的反馈.',
          '在他旅行中获得的一些奇怪的金属.'
        ],
        onLoad: function () {
          $SM.add('stores["外星合金"]', 1);
        },
        buttons: {
          'bye': {
            text: '再见',
            nextScene: 'end'
          }
        }
      },
      'cells': {
        text: [
          "这个男人很感激.",
          '他留下了他的反馈.',
          '在他旅行中获得的一些奇怪的发光盒子.'
        ],
        onLoad: function () {
          $SM.add('stores["燃料电池"]', 3);
        },
        buttons: {
          'bye': {
            text: '再见',
            nextScene: 'end'
          }
        }
      },
      '鳞片': {
        text: [
          "这个男人很感激.",
          '他留下了他的反馈.',
          '在他旅行中获得的一些鳞片.'
        ],
        onLoad: function () {
          $SM.add('stores["鳞片"]', 5);
        },
        buttons: {
          'bye': {
            text: '再见',
            nextScene: 'end'
          }
        }
      },
      'nothing': {
        text: [
          "这个男人感谢异常, 挥手告别, 留下一根毛."
        ],
        buttons: {
          'bye': {
            text: '再见',
            nextScene: 'end'
          }
        }
      }
    }
  }
];

/**
 * events/outside
 * 
 */
/**
 * Events that can occur when the Outside module is active
 **/
Events.Outside = [
  { /* Ruined traps */
    title: '破损的陷阱',
    isAvailable: function () {
      return Engine.activeModule == Outside && $SM.get('game.buildings["陷阱"]', true) > 0;
    },
    scenes: {
      'start': {
        text: [
          '一些陷阱已经严重损毁.',
          '巨大的足印导向森林.'
        ],
        onLoad: function () {
          var numWrecked = Math.floor(Math.random() * $SM.get('game.buildings["陷阱"]', true)) + 1;
          $SM.add('game.buildings["陷阱"]', -numWrecked);
          Outside.updateVillage();
          Outside.updateTrapButton();
        },
        notification: '一些陷阱损坏了',
        buttons: {
          'track': {
            text: '追踪足迹',
            nextScene: { 0.5: 'nothing', 1: 'catch' }
          },
          'ignore': {
            text: '忽略',
            nextScene: 'end'
          }
        }
      },
      'nothing': {
        text: [
          '踪迹消失了...',
          '森林再次归于宁静.'
        ],
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'catch': {
        text: [
          '在离开村子的不远处发现了一只巨大的野兽, 它的皮毛覆满了暗淡的血液.',
          '在武器面前, 它已经没什么抵抗力了.'
        ],
        reward: {
          '毛皮': 100,
          '肉': 100,
          '牙齿': 10
        },
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* Sickness */
    title: '疾病',
    isAvailable: function () {
      return Engine.activeModule == Outside &&
        $SM.get('game.population', true) > 10 &&
        $SM.get('game.population', true) < 50 &&
        $SM.get('stores["医疗药剂"]', true) > 0;
    },
    scenes: {
      'start': {
        text: [
          '疾病在村子里面传播.',
          '急需医疗药剂.'
        ],
        buttons: {
          'heal': {
            text: '1 医疗药剂',
            cost: { '医疗药剂': 1 },
            nextScene: { 1: 'healed' }
          },
          'ignore': {
            text: '置之不理',
            nextScene: { 1: 'death' }
          }
        }
      },
      'healed': {
        text: [
          '疾病被即时控制了.'
        ],
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'death': {
        text: [
          '疾病蔓延在整个村庄.',
          '天天都有人死去.',
          '黑夜总是伴随着惊声尖叫.'
        ],
        onLoad: function () {
          var numKilled = Math.floor(Math.random() * 20) + 1;
          Outside.killVillagers(numKilled);
        },
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* Plague */
    title: '瘟疫',
    isAvailable: function () {
      return Engine.activeModule == Outside && $SM.get('game.population', true) > 50 && $SM.get('stores["医疗药剂"]', true) > 0;
    },
    scenes: {
      'start': {
        text: [
          '一场可怕的瘟疫在村子里面迅速蔓延开.',
          '急需治疗药剂.'
        ],
        buttons: {
          'heal': {
            text: '5 治疗药剂',
            cost: { '医疗药剂': 5 },
            nextScene: { 1: 'healed' }
          },
          'ignore': {
            text: '置之不理',
            nextScene: { 1: 'death' }
          }
        }
      },
      'healed': {
        text: [
          '瘟疫不制止了.',
          '我们只失去了几个人.',
          '我们埋葬了这些死者.'
        ],
        onLoad: function () {
          var numKilled = Math.floor(Math.random() * 5) + 2;
          Outside.killVillagers(numKilled);
        },
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'death': {
        text: [
          '瘟疫席卷了整个村庄.',
          '尖叫恐惧声响彻了整个黑夜.',
          '死亡也许是更好的归宿.'
        ],
        onLoad: function () {
          var numKilled = Math.floor(Math.random() * 80) + 10;
          Outside.killVillagers(numKilled);
        },
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* Beast attack */
    title: '猛兽袭击',
    isAvailable: function () {
      return Engine.activeModule == Outside && $SM.get('game.population', true) > 0;
    },
    scenes: {
      'start': {
        text: [
          '一群野兽冲出了森林奔向村庄.',
          '战斗短暂而血腥, 兽群最终被击退了.',
          '村名们放弃了追击, 集体悼念了死去的人.'
        ],
        onLoad: function () {
          var numKilled = Math.floor(Math.random() * 10) + 1;
          Outside.killVillagers(numKilled);
        },
        reward: {
          '毛皮': 100,
          '肉': 100,
          '牙齿': 10
        },
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },

  { /* Soldier attack */
    title: '武装冲突',
    isAvailable: function () {
      return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.cityCleared');;
    },
    scenes: {
      'start': {
        text: [
          '一声枪响穿透树林.',
          '武装精良的士兵冲突森林, 向我们的人开火.',
          '在冲突后, 几个村名死亡, 随即武装人员就离开了.'
        ],
        onLoad: function () {
          var numKilled = Math.floor(Math.random() * 40) + 1;
          Outside.killVillagers(numKilled);
        },
        reward: {
          '子弹': 10,
          '腌肉': 50
        },
        buttons: {
          'end': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  }
];

/**
 * events/encounters
 * 
 */
/**
 * Events that can occur when wandering around the world
 **/
Events.Encounters = [
  /* Tier 1 */
  { /* Snarling Beast */
    title: '咆哮的野兽',
    isAvailable: function () {
      return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FOREST;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '暴怒野兽',
        chara: 'B',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        loot: {
          '毛皮': {
            min: 1,
            max: 3,
            chance: 1
          },
          '肉': {
            min: 1,
            max: 3,
            chance: 1
          },
          '牙齿': {
            min: 1,
            max: 3,
            chance: 0.8
          }
        },
        notification: '一只咆哮的野兽从草丛中串起'
      }
    }
  },
  { /* Gaunt Man */
    title: '一个落魄的人',
    isAvailable: function () {
      return World.getDistance() <= 10 && World.getTerrain() == World.TILE.BARRENS;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '落魄者',
        chara: 'G',
        damage: 2,
        hit: 0.8,
        attackDelay: 2,
        health: 6,
        loot: {
          '布匹': {
            min: 1,
            max: 3,
            chance: 0.8
          },
          '牙齿': {
            min: 1,
            max: 2,
            chance: 0.8
          },
          '皮革': {
            min: 1,
            max: 2,
            chance: 0.5
          }
        },
        notification: '一个疯狂的家伙出现了'
      }
    }
  },
  { /* Strange Bird */
    title: '一只怪鸟',
    isAvailable: function () {
      return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FIELD;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '怪鸟',
        chara: 'B',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 4,
        loot: {
          '鳞片': {
            min: 1,
            max: 3,
            chance: 0.8
          },
          '牙齿': {
            min: 1,
            max: 2,
            chance: 0.5
          },
          '肉': {
            min: 1,
            max: 3,
            chance: 0.8
          }
        },
        notification: '一只怪鸟略过平原'
      }
    }
  },
  /* Tier 2*/
  { /* Shivering Man */
    title: '一个瑟瑟发抖的人',
    isAvailable: function () {
      return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '抖人',
        chara: 'S',
        damage: 5,
        hit: 0.5,
        attackDelay: 1,
        health: 20,
        loot: {
          '布匹': {
            min: 1,
            max: 1,
            chance: 0.2
          },
          '牙齿': {
            min: 1,
            max: 2,
            chance: 0.8
          },
          '皮革': {
            min: 1,
            max: 1,
            chance: 0.2
          },
          '医疗药剂': {
            min: 1,
            max: 3,
            chance: 0.7
          }
        },
        notification: '一个瑟瑟发抖的人接近中, 看上去力量无穷'
      }
    }
  },
  { /* Man-eater */
    title: '一个食人族',
    isAvailable: function () {
      return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FOREST;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '食人族',
        chara: 'E',
        damage: 3,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          '毛皮': {
            min: 5,
            max: 10,
            chance: 1
          },
          '肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '牙齿': {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        notification: '一只巨大的生物接近了, 爪子上鲜血淋漓'
      }
    }
  },
  { /* Scavenger */
    title: '一个清道夫',
    isAvailable: function () {
      return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '清道夫',
        chara: 'S',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '铁': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.1
          }
        },
        notification: '一个清道夫快速接近中, 想要偷袭'
      }
    }
  },
  { /* Huge Lizard */
    title: '一直饥饿的蜥蜴',
    isAvailable: function () {
      return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FIELD;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '蜥蜴',
        chara: 'L',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          '鳞片': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '牙齿': {
            min: 5,
            max: 10,
            chance: 0.5
          },
          '肉': {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        notification: '草丛扑出一只巨大的蜥蜴'
      }
    }
  },
  /* Tier 3*/
  { /* Feral Terror */
    title: '一个恐怖生物',
    isAvailable: function () {
      return World.getDistance() > 20 && World.getTerrain() == World.TILE.FOREST;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '恐怖生物',
        chara: 'F',
        damage: 6,
        hit: 0.8,
        attackDelay: 1,
        health: 45,
        loot: {
          '毛皮': {
            min: 5,
            max: 10,
            chance: 1
          },
          '肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '牙齿': {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        notification: '一只野兽, 比想象中更大更狂野'
      }
    }
  },
  { /* Soldier */
    title: '一个士兵',
    isAvailable: function () {
      return World.getDistance() > 20 && World.getTerrain() == World.TILE.BARRENS;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '士兵',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.2
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.1
          }
        },
        notification: '一个士兵从沙漠那边开火'
      }
    }
  },
  { /* Sniper */
    title: '一个狙击手',
    isAvailable: function () {
      return World.getDistance() > 20 && World.getTerrain() == World.TILE.FIELD;
    },
    scenes: {
      'start': {
        combat: true,
        enemy: '狙击手',
        chara: 'S',
        damage: 15,
        hit: 0.8,
        attackDelay: 4,
        health: 30,
        ranged: true,
        loot: {
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.2
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.1
          }
        },
        notification: '一声枪响, 远远得传来'
      }
    }
  }
];

/**
 * events/setpieces
 * 
 */
/**
 * Events that only occur at specific times. Launched manually.
 **/
Events.Setpieces = {
  "哨站": { /* Friendly Outpost */
    title: '一个前哨战(友善)',
    scenes: {
      'start': {
        text: [
          '一个庇护所.'
        ],
        notification: '一个野外的庇护所.',
        loot: {
          '腌肉': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        onLoad: function () {
          World.useOutpost();
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "沼泽": { /* Swamp */
    title: '一个烟雾迷茫的沼泽',
    scenes: {
      'start': {
        text: [
          '腐烂的芦苇漂浮在沼泽上.',
          '一个孤单的青蛙静静的蹲坐在淤泥上.'
        ],
        notification: '污浊溃烂的气息弥漫在空气中.',
        buttons: {
          'enter': {
            text: '进入',
            nextScene: { 1: 'cabin' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'cabin': {
        text: [
          '沼泽深处有一个覆满苔藓的小屋.',
          '一个年老的流浪汉在里面, 看似精神恍惚.'
        ],
        buttons: {
          'talk': {
            cost: { '护身符': 1 },
            text: '对话',
            nextScene: { 1: 'talk' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'talk': {
        text: [
          '流浪者点头拿过了护身符.',
          '他说有一次带领着一个大团队抵达了一个新世界.',
          '但是未知事物带来的破坏毁灭了那个团队, 剩余的人忍饥挨饿痛苦异常.',
          '现在轮到他了, 流落在这里深深的忏悔....'
        ],
        onLoad: function () {
          $SM.addPerk('九阳神功');
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "洞穴": { /* Cave */
    title: '一个潮湿的洞穴',
    scenes: {
      'start': {
        text: [
          '洞穴的入口宽而深.',
          "无法看清内部的清醒."
        ],
        notification: '这里的地面到处都是裂痕, 就好像一条条古老的大地伤痕',
        buttons: {
          'enter': {
            text: '进入一探',
            cost: { '火炬': 1 }, //tim mark in case of bug
            nextScene: { 0.3: 'a1', 0.6: 'a2', 1: 'a3' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },

      'a1': {
        combat: true,
        enemy: '野兽',
        chara: 'B',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        notification: '一头受惊的野兽正要捍卫自己的巢穴',
        loot: {
          '毛皮': {
            min: 1,
            max: 10,
            chance: 1
          },
          '牙齿': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'b1', 1: 'b2' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'a2': {
        text: [
          '洞穴已经小的没有落脚之地了.',
          "墙壁很潮湿并覆满了苔藓"
        ],
        buttons: {
          'continue': {
            text: '挤进去',
            nextScene: { 0.5: 'b2', 1: 'b3' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'a3': {
        text: [
          '一个老旧的营地呈现在你面前.',
          '灰黑的睡袋被褥都撕裂开了, 布满了灰尘.'
        ],
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 1
          },
          '火炬': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '皮革': {
            min: 1,
            max: 5,
            chance: 0.3
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'b3', 1: 'b4' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'b1': {
        text: [
          '一个流浪者的尸体躺在一个小穴里面.',
          "尸体高度腐烂, 一些肢体已经不见了.",
          "鬼知道还剩下些什么有用东西."
        ],
        loot: {
          '铁剑': {
            min: 1,
            max: 1,
            chance: 1
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '火炬': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'c1' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'b2': {
        text: [
          '火炬熄灭在潮湿的空气中',
          '黑暗再度来袭'
        ],
        notification: '火炬熄灭了',
        buttons: {
          'continue': {
            text: '继续前进',
            cost: { '火炬': 1 },
            nextScene: { 1: 'c1' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'b3': {
        combat: true,
        enemy: '野兽',
        chara: 'B',
        damage: 1,
        hit: 0.8,
        attackDelay: 1,
        health: 5,
        notification: '一个受惊的野兽正要保护它的巢穴',
        loot: {
          '毛皮': {
            min: 1,
            max: 3,
            chance: 1
          },
          '牙齿': {
            min: 1,
            max: 2,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'c2' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'b4': {
        combat: true,
        enemy: '洞穴蜥蜴',
        chara: 'L',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 6,
        notification: '一头洞穴蜥蜴向你攻击',
        loot: {
          '鳞片': {
            min: 1,
            max: 3,
            chance: 1
          },
          '牙齿': {
            min: 1,
            max: 2,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'c2' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'c1': {
        combat: true,
        enemy: '野兽',
        chara: 'B',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: '一头巨大的野兽冲出黑暗',
        loot: {
          '毛皮': {
            min: 1,
            max: 3,
            chance: 1
          },
          '牙齿': {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end1', 1: 'end2' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'c2': {
        combat: true,
        enemy: '蜥蜴',
        chara: 'L',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: '一只巨大的蜥蜴躺在地上',
        loot: {
          '鳞片': {
            min: 1,
            max: 3,
            chance: 1
          },
          '牙齿': {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.7: 'end2', 1: 'end3' }
          },
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'end1': {
        text: [
          '一只大型动物的巢穴就在洞穴的后方.'
        ],
        onLoad: function () {
          World.clearDungeon();
        },
        loot: {
          '肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '毛皮': {
            min: 5,
            max: 10,
            chance: 1
          },
          '鳞片': {
            min: 5,
            max: 10,
            chance: 1
          },
          '牙齿': {
            min: 5,
            max: 10,
            chance: 1
          },
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'end2': {
        text: [
          '一个小型供给点隐藏在洞穴后方.'
        ],
        loot: {
          '布匹': {
            min: 5,
            max: 10,
            chance: 1
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 1
          },
          '铁': {
            min: 5,
            max: 10,
            chance: 1
          },
          '腌肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '钢': {
            min: 5,
            max: 10,
            chance: 0.5
          },
          '链球': {
            min: 1,
            max: 3,
            chance: 0.3
          },
          '医疗药剂': {
            min: 1,
            max: 4,
            chance: 0.15
          }
        },
        onLoad: function () {
          World.clearDungeon();
        },
        buttons: {
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      },
      'end3': {
        text: [
          '一个老旧的包裹嵌在石头后方, 满布灰尘.'
        ],
        loot: {
          '钢剑': {
            min: 1,
            max: 1,
            chance: 1
          },
          '链球': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '医疗药剂': {
            min: 1,
            max: 3,
            chance: 0.3
          }
        },
        onLoad: function () {
          World.clearDungeon();
        },
        buttons: {
          'leave': {
            text: '离开洞穴',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "小镇": { /* Town */
    title: '一个沙漠小镇',
    scenes: {
      'start': {
        text: [
          '一个小型社区坐落在前方, 房子都烧焦残破了.',
          "路灯都破烂锈迹斑斑, 这个地方失去光明很旧了."
        ],
        notification: "小镇废弃在前方, 里面的居民已经死了很久了",
        buttons: {
          'enter': {
            text: '探索',
            nextScene: { 0.3: 'a1', 0.7: 'a3', 1: 'a2' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },

      'a1': {
        text: [
          "学校房屋的玻璃窗都没有碎掉, 但是都被熏黑了.",
          '大门吱吱不停的摇曳在残风中.'
        ],
        buttons: {
          'enter': {
            text: '进入',
            nextScene: { 0.5: 'b1', 1: 'b2' },
            cost: { '火炬': 1 }  //tim tag in case of bug
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },

      'a2': {
        combat: true,
        enemy: '暴徒',
        chara: 'T',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        notification: '街头有埋伏.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'b3', 1: 'b4' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'a3': {
        text: [
          "前方有一坐建筑物.",
          '在肮脏的窗子后面有一个绿十字.'
        ],
        buttons: {
          'enter': {
            text: '进入',
            nextScene: { 0.5: 'b5', 1: 'end5' },
            cost: { '火炬': 1 } //tim mark, in case of bug
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'b1': {
        text: [
          '生锈的锁柜里面有一些供给品.'
        ],
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 1
          },
          '火炬': {
            min: 1,
            max: 3,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.3
          },
          '医疗药剂': {
            min: 1,
            max: 3,
            chance: 0.05
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c1', 1: 'c2' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'b2': {
        combat: true,
        enemy: '清道夫',
        chara: 'S',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        notification: '一个清道夫就在门里面.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c2', 1: 'c3' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'b3': {
        combat: true,
        enemy: '野兽',
        chara: 'B',
        damage: 3,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          '牙齿': {
            min: 1,
            max: 5,
            chance: 1
          },
          '毛皮': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        notification: '有一头野兽坐在杂草丛生的公园内.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c4', 1: 'c5' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'b4': {
        text: [
          '一个撞翻的大篷车中的物件洒落在整个街道.',
          "拾荒者已经扫荡过一遍了, 但是应该还找得到一些有用的东西."
        ],
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '火炬': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.3
          },
          '医疗药剂': {
            min: 1,
            max: 3,
            chance: 0.1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c5', 1: 'c6' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'b5': {
        combat: true,
        enemy: '疯徒',
        chara: 'M',
        damage: 6,
        hit: 0.3,
        attackDelay: 1,
        health: 10,
        loot: {
          '布匹': {
            min: 2,
            max: 4,
            chance: 0.3
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.9
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.4
          }
        },
        notification: '一个疯子尖叫着攻击你.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.3: 'end5', 1: 'end6' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'c1': {
        combat: true,
        enemy: '暴徒',
        chara: 'T',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        notification: '一个暴徒走出了阴影.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'd1' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'c2': {
        combat: true,
        enemy: '野兽',
        chara: 'B',
        damage: 3,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          '牙齿': {
            min: 1,
            max: 5,
            chance: 1
          },
          '毛皮': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        notification: '一头野兽冲突了已经空荡荡的教室.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'd1' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'c3': {
        text: [
          '在通过体育馆大门的时候, 脚步声清晰可闻.',
          '火炬照亮了走廊.',
          '脚步声停了下来.'
        ],
        buttons: {
          'continue': {
            text: '进入',
            nextScene: { 1: 'd1' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'c4': {
        combat: true,
        enemy: '野兽',
        chara: 'B',
        damage: 4,
        hit: 0.8,
        attackDelay: 1,
        health: 25,
        loot: {
          '牙齿': {
            min: 1,
            max: 5,
            chance: 1
          },
          '毛皮': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        notification: '通过噪声可以感觉到另外一头野兽, 在树林里面.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'd2' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'c5': {
        text: [
          "有什么事情在下边的路上引起了骚动.",
          "可能是战斗."
        ],
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'd2' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'c6': {
        text: [
          '一个装满食物的小篮子隐藏在公园的长椅下, 上面还有个纸条.',
          "看不懂写的什么."
        ],
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'd2' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'd1': {
        combat: true,
        enemy: '清道夫',
        chara: 'S',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 1
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '钢剑': {
            min: 1,
            max: 1,
            chance: 0.5
          }
        },
        notification: '一个惊慌的清道夫尖叫着闯过了大门.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end1', 1: 'end2' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'd2': {
        combat: true,
        enemy: '警员',
        chara: 'V',
        damage: 6,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 1
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '钢剑': {
            min: 1,
            max: 1,
            chance: 0.5
          }
        },
        notification: "一个男人站在死去的流浪汉边上, 意识到他不是唯一的人类.",
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end3', 1: 'end4' }
          },
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'end1': {
        text: [
          '清道夫有一个小营地在学校里面.',
          '收集的各种垃圾散落在地面上, 就好像是从天上下下来的.'
        ],
        onLoad: function () {
          World.clearDungeon();
        },
        loot: {
          '钢剑': {
            min: 1,
            max: 1,
            chance: 1
          },
          '钢': {
            min: 5,
            max: 10,
            chance: 1
          },
          '腌肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '链球': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.3
          }
        },
        buttons: {
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'end2': {
        text: [
          "清道夫似乎一直在寻找各种物资.",
          "不好意思, 我笑纳了."
        ],
        onLoad: function () {
          World.clearDungeon();
        },
        loot: {
          '煤': {
            min: 5,
            max: 10,
            chance: 1
          },
          '腌肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '皮革': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'end3': {
        text: [
          "流浪汉身体下有一些东西, 手上也抓着很多, 闪闪发光.",
          "真值得一杀."
        ],
        onLoad: function () {
          World.clearDungeon();
        },
        loot: {
          '步枪': {
            min: 1,
            max: 1,
            chance: 1
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'end4': {
        text: [
          "以牙还牙相当公平.",
          "无往而不利.",
          "骨头捡起来之后发现了一些小东西."
        ],
        onLoad: function () {
          World.clearDungeon();
        },
        loot: {
          '腌肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '铁': {
            min: 5,
            max: 10,
            chance: 1
          },
          '火炬': {
            min: 1,
            max: 5,
            chance: 1
          },
          '链球': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.1
          }
        },
        buttons: {
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'end5': {
        text: [
          '抽屉里面有一些治疗药剂.'
        ],
        onLoad: function () {
          World.clearDungeon();
        },
        loot: {
          '医疗药剂': {
            min: 2,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      },
      'end6': {
        text: [
          '诊所已经被洗劫一空.',
          '只有污浊的尘土依旧.'
        ],
        onLoad: function () {
          World.clearDungeon();
        },
        buttons: {
          'leave': {
            text: '离开小镇',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "城镇": { /* City */
    title: '一座诅咒之城',
    scenes: {
      'start': {
        text: [
          '一个可怜的高速公路标志坐落在这座曾经的大城市的入口.',
          "曾经壮观的高塔就好比是野兽的身体突出部位一般诡异.",
          '可能有一些有用的东西在里面.'
        ],
        notification: "一个破损的高塔指向天际",
        buttons: {
          'enter': {
            text: '探索',
            nextScene: { 0.2: 'a1', 0.5: 'a2', 0.8: 'a3', 1: 'a4' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'a1': {
        text: [
          '街道都是空的.',
          '空气飘满了灰尘, 任凭风吹雨打.'
        ],
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'b1', 1: 'b2' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'a2': {
        text: [
          '橙色的交通警示标记平方在街道上, 不过都破烂得不行了.',
          '灯光闪烁在建筑的缝隙中.'
        ],
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'b3', 1: 'b4' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'a3': {
        text: [
          '一直巨大的棚屋延绵穿过了街区.',
          '一张张灰黑布满血迹的脸从小破屋里面伸出来.'
        ],
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'b5', 1: 'b6' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'a4': {
        text: [
          '一个废弃的医院坐落在前方.'
        ],
        buttons: {
          'enter': {
            text: '进入',
            cost: { '火炬': 1 },
            nextScene: { 0.5: 'b7', 1: 'b8' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b1': {
        text: [
          '塔的内部似乎保存完整.',
          '烧烂的汽车壳子挡住了入口.',
          '大多数的落地窗户被捣毁了.'
        ],
        buttons: {
          'enter': {
            text: '进入',
            nextScene: { 0.5: 'c1', 1: 'c2' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b2': {
        combat: true,
        notification: '一个巨大的蜥蜴打破了老地铁站的宁静.',
        enemy: '蜥蜴',
        chara: 'L',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          '鳞片': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '牙齿': {
            min: 5,
            max: 10,
            chance: 0.5
          },
          '肉': {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        buttons: {
          'descend': {
            text: '拜访',
            nextScene: { 0.5: 'c2', 1: 'c3' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b3': {
        notification: '枪响在街道上产生回声.',
        combat: true,
        enemy: '狙击手',
        chara: 'S',
        damage: 15,
        hit: 0.8,
        attackDelay: 4,
        health: 30,
        ranged: true,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c4', 1: 'c5' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b4': {
        notification: '士兵在建筑之间战斗, 奔跑和射击.',
        combat: true,
        enemy: '士兵',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c5', 1: 'c6' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b5': {
        notification: '一个看上去挺斯文的人挡住去路并挑衅.',
        combat: true,
        enemy: '斯文禽兽',
        chara: 'M',
        damage: 1,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '皮革': {
            min: 1,
            max: 1,
            chance: 0.2
          },
          '医疗药剂': {
            min: 1,
            max: 3,
            chance: 0.05
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c7', 1: 'c8' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b6': {
        text: [
          '除了低垂的眼帘.',
          '这个人很旧以前就被杀死了.'
        ],
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'c8', 1: 'c9' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b7': {
        text: [
          '空荡的走廊.',
          '清道夫已经把这搜刮干净了.'
        ],
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.3: 'c12', 0.7: 'c10', 1: 'c11' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'b8': {
        notification: '一个老人挥舞着手术刀冲了过来.',
        combat: true,
        enemy: '老家伙',
        chara: 'M',
        damage: 3,
        hit: 0.5,
        attackDelay: 2,
        health: 10,
        loot: {
          '腌肉': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '医疗药剂': {
            min: 1,
            max: 2,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.3: 'c13', 0.7: 'c11', 1: 'end15' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },
      'c1': {
        notification: '一个暴徒等在另外一边墙那.',
        combat: true,
        enemy: '暴徒',
        chara: 'T',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 30,
        loot: {
          '钢剑': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          '腌肉': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'd1', 1: 'd2' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c2': {
        notification: '一头咆哮着的野兽从车后面跳出来.',
        combat: true,
        enemy: '野兽',
        chara: 'B',
        damage: 2,
        hit: 0.8,
        attackDelay: 1,
        health: 30,
        loot: {
          '肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '毛皮': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '牙齿': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'd2' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c3': {
        text: [
          '地铁站上方的街道已经被摧毁了.',
          '一些光线照射到阴霾的尘土中.',
          '前方传来一些声响.'
        ],
        buttons: {
          'enter': {
            text: '调查',
            cost: { '火炬': 1 },
            nextScene: { 0.5: 'd2', 1: 'd3' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c4': {
        text: [
          '好像前方有一个营地.',
          '生锈的链条东拉西扯的.',
          '大火灾庭院前燃烧.'
        ],
        buttons: {
          'enter': {
            text: '继续前进',
            nextScene: { 0.5: 'd4', 1: 'd5' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c5': {
        text: [
          '前方传来更多的声响.',
          '肯定有什么事情发生了.'
        ],
        buttons: {
          'enter': {
            text: '继续前进',
            nextScene: { 1: 'd5' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c6': {
        text: [
          '风中传来枪响.',
          '前方街道闪光连连.'
        ],
        buttons: {
          'enter': {
            text: '继续前进',
            nextScene: { 0.5: 'd5', 1: 'd6' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c7': {
        text: [
          '越来越多的人挤过来了.',
          '有人扔出一块石头.'
        ],
        buttons: {
          'enter': {
            text: '继续前进',
            nextScene: { 0.5: 'd7', 1: 'd8' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c8': {
        text: [
          '一个简易车间被安置在路边.',
          '店主坚强的站在边上.'
        ],
        loot: {
          '钢剑': {
            min: 1,
            max: 1,
            chance: 0.8
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          '子弹': {
            min: 1,
            max: 8,
            chance: 0.25
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.01
          },
          '医疗药剂': {
            min: 1,
            max: 4,
            chance: 0.5
          }
        },
        buttons: {
          'enter': {
            text: '继续前进',
            nextScene: { 1: 'd8' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c9': {
        text: [
          '很多肉条晒在路边.',
          '人们纷纷后退, 躲闪着眼光.'
        ],
        loot: {
          '腌肉': {
            min: 5,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'enter': {
            text: '继续前进',
            nextScene: { 0.5: 'd8', 1: 'd9' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c10': {
        text: [
          '有人反锁了手术室的门.'
        ],
        buttons: {
          'enter': {
            text: '继续前进',
            nextScene: { 0.2: 'end12', 0.6: 'd10', 1: 'd11' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c11': {
        notification: '老人们的蜗居就在这间病房.',
        combat: true,
        enemy: '一群难民',
        plural: true,
        chara: 'SSS',
        damage: 2,
        hit: 0.7,
        attackDelay: 0.5,
        health: 40,
        loot: {
          '腌肉': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '布匹': {
            min: 3,
            max: 8,
            chance: 0.8
          },
          '医疗药剂': {
            min: 1,
            max: 3,
            chance: 0.3
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'end10' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c12': {
        notification: '一群蜥蜴在角落里.',
        combat: true,
        enemy: '一群蜥蜴',
        plural: true,
        chara: 'LLL',
        damage: 4,
        hit: 0.7,
        attackDelay: 0.7,
        health: 30,
        loot: {
          '肉': {
            min: 3,
            max: 8,
            chance: 1
          },
          '牙齿': {
            min: 2,
            max: 4,
            chance: 1
          },
          '鳞片': {
            min: 3,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'end10' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'c13': {
        text: [
          '肉条挂在房间里面风干.'
        ],
        loot: {
          '腌肉': {
            min: 3,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end10', 1: 'end11' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd1': {
        notification: '楼梯尽头有一个巨大的鸟巢.',
        combat: true,
        enemy: '怪鸟',
        chara: 'B',
        damage: 5,
        hit: 0.7,
        attackDelay: 1,
        health: 45,
        loot: {
          '肉': {
            min: 5,
            max: 10,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end1', 1: 'end2' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd2': {
        text: [
          "这里碎片密布.",
          "可能在碎片中会有一些有用的东西."
        ],
        loot: {
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '钢': {
            min: 1,
            max: 10,
            chance: 0.8
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.01
          },
          '布匹': {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'end2' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd3': {
        notification: '一大群老鼠冲入隧道.',
        combat: true,
        enemy: '一群老鼠',
        plural: true,
        chara: 'RRR',
        damage: 1,
        hit: 0.8,
        attackDelay: 0.25,
        health: 60,
        loot: {
          '毛皮': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '牙齿': {
            min: 5,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end2', 1: 'end3' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd4': {
        notification: '一个高大的男人挥舞着刺刀进行攻击.',
        combat: true,
        enemy: '老兵',
        chara: 'V',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 45,
        loot: {
          '刺刀': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end4', 1: 'end5' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd5': {
        notification: '第二个士兵开火了.',
        combat: true,
        enemy: '士兵',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'end5' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd6': {
        notification: '一个蒙面士兵持枪站在角落',
        combat: true,
        enemy: '民兵',
        chara: 'C',
        ranged: true,
        damage: 3,
        hit: 0.9,
        attackDelay: 2,
        health: 55,
        loot: {
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end5', 1: 'end6' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd7': {
        notification: '人群涌动.',
        combat: true,
        enemy: '一群难民',
        plural: true,
        chara: 'SSS',
        damage: 2,
        hit: 0.7,
        attackDelay: 0.5,
        health: 40,
        loot: {
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '牙齿': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end7', 1: 'end8' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd8': {
        notification: '小年轻拿了根树枝就跳出来了.',
        combat: true,
        enemy: '洗剪吹',
        chara: 'Y',
        damage: 2,
        hit: 0.7,
        attackDelay: 1,
        health: 45,
        loot: {
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '牙齿': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'end8' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd9': {
        notification: '有个人坚守在小木屋的门口.',
        combat: true,
        enemy: '难民',
        chara: 'S',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '牙齿': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 0.5: 'end8', 1: 'end9' }
          },
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'd10': {
        notification: '在门后的一个畸形人进行攻击.',
        combat: true,
        enemy: '畸形人',
        chara: 'D',
        damage: 8,
        hit: 0.6,
        attackDelay: 2,
        health: 40,
        loot: {
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '牙齿': {
            min: 2,
            max: 2,
            chance: 1
          },
          '钢': {
            min: 1,
            max: 3,
            chance: 0.6
          },
          '鳞片': {
            min: 2,
            max: 3,
            chance: 0.1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'end14' }
          }
        }
      },

      'd11': {
        notification: '门只要开了一点, 几百个触手就涌过来.',
        combat: true,
        enemy: '满天触手',
        plural: true,
        chara: 'TTT',
        damage: 2,
        hit: 0.6,
        attackDelay: 0.5,
        health: 60,
        loot: {
          '肉': {
            min: 10,
            max: 20,
            chance: 1
          }
        },
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'end13' }
          }
        }
      },

      'end1': {
        text: [
          '鸟儿都喜欢闪亮的东西.',
          '它们的巢里面经常有好东西.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '子弹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '链球': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.5
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end2': {
        text: [
          '没什么东西了.',
          '清道夫已经来过这里了.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '火炬': {   //tim mark, incase of bug
            min: 1,
            max: 5,
            chance: 0.8
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.5
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end3': {
        text: [
          '隧道通向一个平台.',
          '残破的墙壁.',
          '肢体和供给散落在墙壁两旁.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '镭射枪': {
            min: 1,
            max: 1,
            chance: 0.3
          },
          '燃料电池': {
            min: 1,
            max: 5,
            chance: 0.3
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.3
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },


      'end4': {
        text: [
          '小型军事哨站补给充分.',
          '武器弹药整理的排列在储藏室的地上.',
          '跟以往一样的致命.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '步枪': {
            min: 1,
            max: 1,
            chance: 1
          },
          '子弹': {
            min: 1,
            max: 10,
            chance: 1
          },
          '手雷': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end5': {
        text: [
          '搜索尸体会得到一些物资.',
          '路上会遇到更多的尸体的.',
          '该离开了.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '步枪': {
            min: 1,
            max: 1,
            chance: 1
          },
          '子弹': {
            min: 1,
            max: 10,
            chance: 1
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '医疗药剂': {
            min: 1,
            max: 4,
            chance: 0.1
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end6': {
        text: [
          '小型定居点已经烧了一阵子了.',
          '透过火焰仍可看到在燃烧的尸体.',
          "还有时间取得一些物资."
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '镭射枪': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          '燃料电池': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '腌肉': {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },


      'end7': {
        text: [
          '剩下的居民四处逃逸, 他们的物资都被抛下了.',
          "还能找到一些有用的东西, 虽然不多."
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '钢剑': {
            min: 1,
            max: 1,
            chance: 0.8
          },
          '燃料电池': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '腌肉': {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end8': {
        text: [
          '那个年轻的居民背着的是帆布包.',
          "里面有一些旅行用品和几个装饰品",
          "没别的了."
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '钢剑': {
            min: 1,
            max: 1,
            chance: 0.8
          },
          '链球': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '腌肉': {
            min: 1,
            max: 10,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end9': {
        text: [
          '小木屋内, 一个孩子在哭.',
          "有几个行李靠在墙边.",
          "没有东西了."
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '链球': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end10': {
        text: [
          '腐烂和死亡的气息弥漫在手术室.',
          "有一些东西散落在地上.",
          '没有其他东西了.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '燃料电池': {
            min: 1,
            max: 1,
            chance: 0.3
          },
          '医疗药剂': {
            min: 1,
            max: 5,
            chance: 0.3
          },
          '牙齿': {
            min: 3,
            max: 8,
            chance: 1
          },
          '鳞片': {
            min: 4,
            max: 7,
            chance: 0.9
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end11': {
        text: [
          '一个朴素的药箱在走廊尽头.',
          "医院里面已经没什么了."
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '燃料电池': {
            min: 1,
            max: 1,
            chance: 0.2
          },
          '医疗药剂': {
            min: 3,
            max: 10,
            chance: 1
          },
          '牙齿': {
            min: 1,
            max: 2,
            chance: 0.2
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end12': {
        text: [
          '肯定有人一直储备东西在这里.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '燃料电池': {
            min: 1,
            max: 3,
            chance: 0.2
          },
          '医疗药剂': {
            min: 3,
            max: 10,
            chance: 0.5
          },
          '子弹': {
            min: 2,
            max: 8,
            chance: 1
          },
          '火炬': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '手雷': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          '外星合金': {
            min: 1,
            max: 2,
            chance: 0.8
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end13': {
        text: [
          '恐怖触手被几百了.',
          '里面到处都是遇难者的尸体.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '钢剑': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 2,
            chance: 0.3
          },
          '牙齿': {
            min: 2,
            max: 8,
            chance: 1
          },
          '布匹': {
            min: 3,
            max: 6,
            chance: 0.5
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.1
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end14': {
        text: [
          '扭曲的男人死了.',
          '手术室有很多奇怪的设备.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '燃料电池': {
            min: 2,
            max: 5,
            chance: 0.8
          },
          '医疗药剂': {
            min: 3,
            max: 12,
            chance: 1
          },
          '布匹': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '钢': {
            min: 2,
            max: 3,
            chance: 0.3
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.3
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      },

      'end15': {
        text: [
          '这个老人有一些有趣的小收藏.'
        ],
        onLoad: function () {
          World.clearDungeon();
          $SM.set('game.cityCleared', true);
        },
        loot: {
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.8
          },
          '医疗药剂': {
            min: 1,
            max: 4,
            chance: 1
          },
          '腌肉': {
            min: 3,
            max: 7,
            chance: 1
          },
          '链球': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '毛皮': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        buttons: {
          'leave': {
            text: '离开城市',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "废屋": { /* Abandoned House */
    title: '一所老房子',
    scenes: {
      'start': {
        text: [
          '一所老房子依旧留存着, 白色的外墙泛黄脱落.',
          '门开着.'
        ],
        notification: '老房子好比是一座对时代的纪念碑一般',
        buttons: {
          'enter': {
            text: '进入一探',
            nextScene: { 0.25: 'medicine', 0.5: 'supplies', 1: 'occupied' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'supplies': {
        text: [
          '房子虽然被废弃了, 但是还有一些东西.',
          '水井里面依旧有水.'
        ],
        onLoad: function () {
          World.markVisited(World.curPos[0], World.curPos[1]);
          World.setWater(World.getMaxWater());
          Notifications.notify(null, '水满了');
        },
        loot: {
          '腌肉': {
            min: 1,
            max: 10,
            chance: 0.8
          },
          '皮革': {
            min: 1,
            max: 10,
            chance: 0.2
          },
          '布匹': {
            min: 1,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'medicine': {
        text: [
          '房子已经被洗劫一空了.',
          '但是地板下面还有一些医疗用品.'
        ],
        onLoad: function () {
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        loot: {
          '医疗药剂': {
            min: 2,
            max: 5,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'occupied': {
        combat: true,
        enemy: '难民',
        chara: 'S',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        notification: '一个男人占据着大厅, 手持大刀',
        onLoad: function () {
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        loot: {
          '腌肉': {
            min: 1,
            max: 10,
            chance: 0.8
          },
          '皮革': {
            min: 1,
            max: 10,
            chance: 0.2
          },
          '布匹': {
            min: 1,
            max: 10,
            chance: 0.5
          }
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "战场": { /* Discovering an old battlefield */
    title: '遗落战场',
    scenes: {
      'start': {
        text: [
          '很久以前的大战.',
          '双方的高科技造成了如此壮观的景象.'
        ],
        onLoad: function () {
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        loot: {
          '步枪': {
            min: 1,
            max: 3,
            chance: 0.5
          },
          '子弹': {
            min: 5,
            max: 20,
            chance: 0.8
          },
          '镭射枪': {
            min: 1,
            max: 3,
            chance: 0.3
          },
          '燃料电池': {
            min: 5,
            max: 10,
            chance: 0.5
          },
          '手雷': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '外星合金': {
            min: 1,
            max: 1,
            chance: 0.3
          }
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "巨坑": { /* Admiring a huge borehole */
    title: '一个巨坑',
    scenes: {
      'start': {
        text: [
          '一个巨大的深坑切入地表.',
          '他们拿走所需, 拍拍屁股.',
          '通过悬崖边依旧能看清庞大的废弃场.'
        ],
        onLoad: function () {
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        loot: {
          '外星合金': {
            min: 1,
            max: 3,
            chance: 1
          }
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "飞船": { /* Finding a way off this rock */
    title: '破损的飞船',
    scenes: {
      'start': {
        onLoad: function () {
          World.markVisited(World.curPos[0], World.curPos[1]);
          World.drawRoad();
          World.state.ship = true;
        },
        text: [
          '尘土和灰烬之下流露出熟悉的各种曲线. ',
          "很幸运当地人不会机械.",
          '飞船可以被修复.'
        ],
        buttons: {
          'leavel': {
            text: '打捞',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "硫磺矿": { /* Clearing the Sulphur Mine */
    title: '一座硫磺矿',
    scenes: {
      'start': {
        text: [
          "军队已经驻扎在矿井入口了.",
          '巡逻兵挎着步枪.'
        ],
        notification: '军队已经驻扎在矿井入口了',
        buttons: {
          'attack': {
            text: '攻击',
            nextScene: { 1: 'a1' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'a1': {
        combat: true,
        enemy: '士兵',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        notification: '一个士兵发现并开火了.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'a2' }
          },
          'run': {
            text: '逃跑',
            nextScene: 'end'
          }
        }
      },
      'a2': {
        combat: true,
        enemy: '士兵',
        ranged: true,
        chara: 'D',
        damage: 8,
        hit: 0.8,
        attackDelay: 2,
        health: 50,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '子弹': {
            min: 1,
            max: 5,
            chance: 0.5
          },
          '步枪': {
            min: 1,
            max: 1,
            chance: 0.2
          }
        },
        notification: '第二个士兵加入战斗.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'a3' }
          },
          'run': {
            text: '逃跑',
            nextScene: 'end'
          }
        }
      },
      'a3': {
        combat: true,
        enemy: '老兵',
        chara: 'V',
        damage: 10,
        hit: 0.8,
        attackDelay: 2,
        health: 65,
        loot: {
          '刺刀': {
            min: 1,
            max: 1,
            chance: 0.5
          },
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: '一个头发花白的士兵加入战斗, 挥舞着刺刀.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'cleared' }
          }
        }
      },
      'cleared': {
        text: [
          '军队已经被清除.',
          '矿坑现在可以工作了.'
        ],
        notification: '硫磺矿解除危险了',
        onLoad: function () {
          World.drawRoad();
          World.state.sulphurmine = true;
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "煤矿": { /* Clearing the Coal Mine */
    title: '一座煤矿',
    scenes: {
      'start': {
        text: [
          '矿坑入口篝火很旺.',
          '有人带着武器驻守在那.'
        ],
        notification: '这座老矿坑没有被遗弃',
        buttons: {
          'attack': {
            text: '攻击',
            nextScene: { 1: 'a1' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'a1': {
        combat: true,
        enemy: '壮汉',
        chara: 'M',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: '一个人加入战斗攻击',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'a2' }
          },
          'run': {
            text: '逃跑',
            nextScene: 'end'
          }
        }
      },
      'a2': {
        combat: true,
        enemy: '壮汉',
        chara: 'M',
        damage: 3,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          '腌肉': {
            min: 1,
            max: 5,
            chance: 0.8
          },
          '布匹': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: '一个人加入战斗',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'a3' }
          },
          'run': {
            text: '逃跑',
            nextScene: 'end'
          }
        }
      },
      'a3': {
        combat: true,
        enemy: 'chief',
        chara: 'C',
        damage: 5,
        hit: 0.8,
        attackDelay: 2,
        health: 20,
        loot: {
          '腌肉': {
            min: 5,
            max: 10,
            chance: 1
          },
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '铁': {
            min: 1,
            max: 5,
            chance: 0.8
          }
        },
        notification: '只有老大还在.',
        buttons: {
          'continue': {
            text: '继续前进',
            nextScene: { 1: 'cleared' }
          }
        }
      },
      'cleared': {
        text: [
          '营地依旧, 还有火焰燃烧的声音.',
          '矿坑安全了.'
        ],
        notification: '矿坑解除危险了',
        onLoad: function () {
          World.drawRoad();
          World.state.coalmine = true;
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },
  "铁矿": { /* Clearing the Iron Mine */
    title: '一个铁矿',
    scenes: {
      'start': {
        text: [
          '一个老矿坑在哪, 生锈的工具被乱丢.',
          '各种白骨散落一地, 上面还有深深的齿痕.',
          '黑暗中传来野性的咆哮.'
        ],
        notification: '通向矿坑的小路',
        buttons: {
          'enter': {
            text: '进入一探',
            nextScene: { 1: 'enter' },
            cost: { '火炬': 1 }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'enter': {
        combat: true,
        enemy: '兽女',
        chara: 'M',
        damage: 4,
        hit: 0.8,
        attackDelay: 2,
        health: 10,
        loot: {
          '牙齿': {
            min: 5,
            max: 10,
            chance: 1
          },
          '鳞片': {
            min: 5,
            max: 10,
            chance: 0.8
          },
          '布匹': {
            min: 5,
            max: 10,
            chance: 0.5
          }
        },
        notification: '一个巨大的生物出现, 肌肉大到爆',
        buttons: {
          'leave': {
            text: '离开',
            nextScene: { 1: 'cleared' }
          }
        }
      },
      'cleared': {
        text: [
          '野兽死了.',
          '矿坑安全了.'
        ],
        notification: '矿坑解除危险了',
        onLoad: function () {
          World.drawRoad();
          World.state.ironmine = true;
          World.markVisited(World.curPos[0], World.curPos[1]);
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  },

  "临时": { /* Cache - contains some of supplies from previous game */
    title: '一个毁灭的村庄',
    scenes: {
      'start': {
        text: [
          '毁灭的村子到处都是灰尘.',
          '破烂的尸体到处都是.'
        ],
        notification: '被烧焦的尸体挂在空中.',
        buttons: {
          'enter': {
            text: '进入',
            nextScene: { 1: 'underground' }
          },
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      },
      'underground': {
        text: [
          '一个木屋处理在村子中心.',
          '里面还有一些物资.'
        ],
        buttons: {
          'take': {
            text: '拿走',
            nextScene: { 1: 'exit' }
          }
        }
      },
      'exit': {
        text: [
          '前代人的痕迹就在这里了.',
          '是时候采摘果实了.'
        ],
        onLoad: function () {
          World.markVisited(World.curPos[0], World.curPos[1]);
          Prestige.collectStores();
        },
        buttons: {
          'leave': {
            text: '离开',
            nextScene: 'end'
          }
        }
      }
    }
  }
};

/**
 * 
 * 
 */