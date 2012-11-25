/** 
 * Prototype base Transparent Message.
 * @copyright Humanized, Inc.
 * @license Attribution-NonCommercial-ShareAlike 2.5
 * @author1 Aza Raskin <aza@humanized.com>
 * @author2 Firejune <to@firejune.com>
 * 
 * <style>
 *   .humanized_msg{
 *    position: absolute; left: 25%; width: 50%;
 *    color: white; background-color: #8CC63F;
 *    font-size: 36pt; text-align: center; 
 *  }
 *
 *  .humanized_msg .round{
 *     border-left: solid 2px white; border-right: solid 2px white;
 *    font-size: 1px; height: 2px;
 *  }
 *
 *  .humanized_msg p{ padding: .3em; display: inline;}
 *  </style>
 */

var transMsg = Class.create();
transMsg.prototype = {
  initialize: function(options){
    this.options = Object.extend({
      opacity: 0.9,
      offset: -150,
      foramt: '<div class="round"></div><p>%s</p><div class="round"></div>',
      effect: null,
      currMsg: ""
    }, options || {});

    this.hideEvents = ['mousedown', 'keydown', 'mouseout'];
    this.mouseAction = this.hideMessage.bindAsEventListener(this);
  },
  loadEvents: function(){
    var unload = this.unloadEvents.bindAsEventListener(this);
    for(var i=0; i < this.hideEvents.length; i++){
      Event.observe(document.body, this.hideEvents[i], this.mouseAction);
    }
    Event.observe(window, 'unload', unload);
  },
  unloadEvents: function(){
    for(var i=0; i < this.hideEvents.length; i++){
      Event.stopObserving(document.body, this.hideEvents[i], this.mouseAction);
    }
    //Element.remove(this.element);
  },
  createMessage: function(){
    this.element = document.createElement('DIV');
    this.element.className = 'humanized_msg';
    Element.hide(this.element);
    if(Prototype.Browser.Gecko){
      Element.setStyle(this.element, {position:'fixed'});
    }
    document.body.appendChild(this.element);
    this.loadEvents();
  },
  hideMessage: function(){
    if (Element.getOpacity(this.element) >= this.options.opacity){
      this.options.effect = new Effect.Fade(this.element, {duration:0.5});
    }
  },
  popMessage:function(message){
    Sound.play('spsacem');
    $(this.element).innerHTML = this.options.foramt.replace("%s", message);
    
    this.options.currMsg = message;
    Element.show(this.element);
  
    var height = Element.getHeight(this.element);
    var top = Position.scrollY()+(Position.getPageSize().window.height/2)-(height/2)+this.options.offset;
    if(Prototype.Browser.Gecko){
      top = (Position.getPageSize().window.height/2)-(height/2)+this.options.offset;
    }
    Element.setStyle(this.element, {top:top+'px'});
    Element.setOpacity(this.element, this.options.opacity);
  },
  showMessage:function(message){
    if(typeof this.element != 'object'){
      this.createMessage();
    }
    this.options.effect = this.options.effect? this.options.effect : '';
    if(this.options.effect != 'null' && this.options.effect.state == "running"){
      this.options.effect.options.afterFinish = function(){
        this.popMessage(message);
      }.bind(this);
    } else {
      this.popMessage(message);
    }
  }
};

transMsg = new transMsg(); // Transparent message initialize

function alert(message) {
	transMsg.showMessage(message);
};
