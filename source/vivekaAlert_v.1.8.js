/*
 * Viveka Alert jQuery Plugin v1.8.0.5
 * Licensed under the MIT license.
 * Copyright 2012 G.Burak Demirezen
*/
(function($){
  $.fn.vivekaAlert = function(text, options){
	  var defaults = {
		  alertFrame : 'alertBox',
		  showContainer:'',
		  time : 3000,
		  width : '',
		  defaultText: 'Bir Hata Oluştu !',
		  multi:false,
		  timeOut: true,
		  reClose:true,
		  buttons:false,
		  buttonsLength:1,
		  image:false,
		  imageSrc:'http://a0.twimg.com/profile_images/1575142700/vivekatw.png',
		  imageSize:[40,40],
		  opacity:'0.8',
		  position:[], // example [20,30] top : 20px , left : 30px
	  },settings = $.extend(defaults,options);
	  
	  var 
	  $element,
	  $buttons,
	  $timeout,
	  $clsStop = 0,
	  $style = {
		  width:settings.width,
		  'margin-bottom':'10px',
		  position:'relative',
		  opacity:0,
		  'margin-left':'-100px',
	  },
	  $image = $('<img width="'+ settings.imageSize[0] +'" height="'+ settings.imageSize[1] +'" class="vivekaImage" src="'+ settings.imageSrc +'"/>');
	  $showContainer = settings.showContainer == '' ? $('body') : $('.' + settings.showContainer).css({'position':'relative'}),
	  $close = createElement('div','close'),
	  $dom = $('.' + settings.alertFrame),
	  $message = typeof text == 'undefined' ? settings.defaultText : text,
	  $vivekaMainFrame = $('.vivekaMainFrame').size() == 0 ? $('<div class="vivekaMainFrame"></div>').css({position: 'absolute',top:settings.position[0],left:settings.position[1]}) : $('.vivekaMainFrame').css({top:settings.position[0],left:settings.position[1]});
	  
	  $showContainer.append($vivekaMainFrame);
	  
	  if(text instanceof Array == false){
		  $element = $('<aside class="'+ settings.alertFrame +'">'+ createText($message) +'</aside>');
		  $element.css($style);
		  $element.append($close);
		  settings.image == true ? $element.append($image): '';
	  };
	  
	  if(settings.buttons){
		for(i=0; i<settings.buttonsLength; i++){
			$buttons = createElement('a','customBtn'+i);
			$($buttons).attr('href','#').html(i);
			$element.append($buttons);
		}
	  };
	  
	  $.array = function(text,options){
		  var i = 0,
		  stopAnimate = setInterval(function(){
			  $.fn.vivekaAlert(text[i],options);
			  i++;
			  if(text.length == i)
			  clearInterval(stopAnimate);
		  },250);
	  };
	  
	  $.show = function(){
		  $vivekaMainFrame.append($element); 
		  $element.animate({
			'opacity':settings.opacity,
			'margin-left':'0',
			},{
			  duration:350,
			  specialEasing: {
			  width: 'linear',
			}
		  });
	  };
		  
	  $.multiAlert = function(){
		  $.show();
	  };
	  
	  if(!settings.multi){
		if($dom.length <= 0)
			$.show();
		else{
			$dom.fadeOut('fast',function(){
				$(this).remove();
				$.show();
			});
		}
	  }else{
		  if(text instanceof Array == false)
			  $.multiAlert();
		  else
		  $.array(text,options);
	  };
	  
	  if(settings.timeOut){	
		$timeout = setTimeout(function(){
			$clsStop = $timeout;
			$($element).animate({
				'opacity':'0'
				},{
				duration:4000,
				complete: function() {
					$(this).slideUp('fast',function(){
						$(this).remove();
					});
				}
			});
		},settings.time);
	  };
	  
	  $.close = function (e) {
		  $(e.target).closest('.' + settings.alertFrame).animate({
			  opacity:0,
			  },{
			  duration:350,
			  complete: function(){
				  $(this).slideUp('fast',function(){
					  $(this).remove();
				  });
			  }
		  });
	  };
	  
	  $.fn.vivekaAlert.allClose = function(){
		  $('.vivekaMainFrame').fadeOut('fast',function(){
			  $(this).remove();
		  });
	  };

	  $($close).click(function(e){
		  $.close(e);
	  });
	  
	  $($element).mouseenter(function(){
		  clearTimeout($timeout);
		  if($clsStop > 0)
		  {
		  	$(this).stop().css({'opacity':settings.opacity});
		  }
	  });
	  
	  $($element).mouseleave(function(){
		if(settings.timeOut && settings.reClose){	
		  $timeout = setTimeout(function(){
			  $clsStop = $timeout;
			  $($element).animate({
				  'opacity':'0'
				  },{
				  duration:4000,
				  complete: function() {
					  $(this).slideUp('fast',function(){
						  $(this).remove();
					  });
				  }
			  });
		  },settings.time);
		}
	  });
	  
	  function createText(text) {
		  var temp, returnText = '',first,total;
		  if(text != ''){
			temp = text.split('->');
			if(temp.length > 1)
			{
			  for(i in temp){
				  if(parseInt(i) != temp.length -1)
				  {
					returnText += '<p class="paragraph">'+ temp[i] +'</p><p class="vivekaSeperator"></p>'; 
				  }
				  else
				  {
				  	returnText += '<p class="paragraph">'+ temp[i] +'</p>';
				  }
			  }
			}else{
				returnText += '<p class="paragraph">'+ temp[0] +'</p>';
			}
			return returnText;
		  }
	  };
	  
	  function createElement(Dom,Class,Id,Style){
		  var $element = document.createElement(Dom);
		  if(Id)
			  $element.id = Id;
		  if(Class)
			  $element.className = Class;
		  if(Style)
			  $element.style.cssText = Style;
		  return $element;	
	  };
  };
  
})(jQuery);