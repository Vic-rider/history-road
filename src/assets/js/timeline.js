/*
 Timeline jQuery Plugin
 2014 ukhom.com
 Author: Clem
 */

// Disable f***ing safari bounce effect on iPad & iPhone

var tc = document.getElementById('js-timeline-wrapper');
if(tc) {
	tc.ontouchmove = function(event){
		event.preventDefault();
	};
}

// Listen for orientation changes
window.addEventListener("orientationchange", function() {
    window.location.replace(window.location.href);
}, false);

// Timeline Incoming Animation

$(document).ready(function() {

    if  ($('html').hasClass('no-touch'))   {

        var _lastPeriodId = $.cookie('BDFlastPeriodId');
        var _currentPeriodId = $('body').attr('data-num-periode');


        $('.timeline-container')
            .css('left', '100px')
            .css('opacity', '0');

        if(_currentPeriodId < _lastPeriodId ) {
            $('.flat-transition')
                .css('right', '-30%')
                .css('left', 'inherit');

            $('.timeline-container').css('left', '-100px');
        }

        setTimeout(function() {
            $('.flat-transition')
                .css('height', '100%')
                .animate({width: '0%'}, 1000, 'easeInOutExpo', function() {
                $('.flat-transition').remove();
            });

            $('.timeline-container').addClass('pep-active').animate({left: '0px', opacity: 1}, 1000, 'easeOutQuad', function(){
                $('.timeline-container').addClass('pep-ease');
                $('.track-container').addClass('pep-ease');
            });
        }, 500);

        $.cookie('BDFlastPeriodId', _currentPeriodId, { expires: 1, path: '/' });
        $.removeCookie('BDFarticleDirection', 'left',  { expires: 1, path: '/' });
    }
});

;(function($){



    $.fn.timeline = function(sett){

        /* VARIABLES */

        /**
         * Object settings
         *
         * @type Array
         */
        var settings = {};


        /**
         * Main timeline container
         *
         * @type Object
         */
        var element = $(this);

        /**
         * Timeline container size
         *
         * @type int
         */
        var timelineWidth =  0;
        var timelineHeight =  0;

        /**
         * Track container size
         *
         * @type int
         */
        var trackWidth =  0;
        var trackHeight =  0;

        /**
         * Timeline max right scroll
         *
         * @type int
         */
        var timelineMaxLeftPosition = 0;

        /**
         * Track max right scroll
         *
         * @type int
         */
        var trackMaxLeftPosition = 0;

        /**
         * Track / Timeline ratio
         *
         * @type int
         */
        var trackTimelineRadio = 0;


        /**
         * Track / Timeline ratio
         *
         * @type bool
         */
        var lastEventIsDrag = false;

        /**
         * Mobile device version
         *
         * @type bool
         */
        var isMobile = false;


        /**
         * Touch device version
         *
         * @type bool
         */
        var isTouch = false;

        /**
         * Default timeine orientation
         *
         * @type str
         */
        var defaultAxis = 'x';

        /**
         * Window width
         *
         * @type int
         */
        var windowWidth = 0;

        /**
         * Window height
         *
         * @type int
         */
        var windowHeight = 0;

        var positionLeftTimeline = 0;
        var positionLeftTrack = 0;

        var positionTopTrack = 0;
        var positionTopTimeline = 0;

        var realWidthSliderTimeline = 0;
        var realWidthSliderTrack = 0;

        var realHeightSliderTimeline = 0;
        var realHeightSliderTrack = 0;

        var coefTl = 0;
        var coefTr = 0;

        var $pep_timeline;
        var $pep_track;

        var diffTimeline = 0;
        var diffTrack = 0;

        var to;

        /**
         * Timeline Easing enabling
         *
         * @type int
         */
        var shouldEase = true;

        settings = $.extend({}, $.fn.timeline.defaults, sett);


        /**
         * Instanciate plugin
         *
         * @private
         */
        function _build() {

            windowWidth = $(window).width();
            windowHeight = $(window).height();

            if(windowWidth < 769) {
                isMobile = true;
                defaultAxis = 'y';
            } else {
                isMobile = false;
                defaultAxis = 'x'
            }

            if($('html').hasClass('touch')) {
                isTouch = true;
                $(settings.timelineContainer).css('overflow', 'hidden');
            }

            if (($('html').hasClass('ie9')) || ($('html').hasClass('lt-ie9'))) {
                shouldEase = false;
            }

            _constructTimeline();
            _init();
            _events();

            if(defaultAxis == 'y') {
                _timelineY();
            } else {
                _timelineX();
            }

            setTimeout(function() {
                _itemPosition();
            }, 1000);
        }


        /**
         * Fill variable
         *
         * @private
         */
        function _init() {


            if(defaultAxis == 'x') {


                $(settings.timelineContainer).find('li').first().css('width', windowWidth / 2 + 'px');
                $(settings.timelineContainer).find('li').last().css('width', windowWidth / 2 + 'px');

                $(settings.trackContainer).find('li').first().css('width', windowWidth / 2 + 'px');
                $(settings.trackContainer).find('li').last().css('width', windowWidth / 2 + 'px');

                _setTimelineWidth();
                _setTrackWidth();

                /* Set max right scroll pixel size */
                trackTimelineRadio = (timelineWidth - $(window).width()) / (trackWidth - $(window).width());

                /* Set max right scroll pixel size */
                timelineMaxLeftPosition = parseFloat('-' + timelineWidth) + $(window).width() + 400;
                trackMaxLeftPosition = parseFloat('-' + trackWidth) + $(window).width();

            } else {

                $(settings.timelineContainer).css('height','auto').css('width','100%').css('left', 0);
                $(settings.trackContainer).css('height','auto').css('width','100px');


                //$(settings.timelineContainer).find('li').first().css('height', (windowHeight / 2) - 45 + 'px');
                $(settings.timelineContainer).find('li').last().css('height', (windowHeight / 2) - 45 + 'px');
                $(".bottom-snap:before").css('top', windowHeight / 2 + 'px');

                $(settings.trackContainer).find('li').first().css('height', (windowHeight / 2) - 45 + 'px');
                $(settings.trackContainer).find('li').last().css('height', (windowHeight / 2)  + 45 + 'px');

                _setTrackHeight();
                _setTimelineHeight();

                /* Set max right scroll pixel size */
                trackTimelineRadio = (timelineHeight - windowHeight / (trackHeight - windowHeight ));

                /* Set max right scroll pixel size */
                timelineMaxLeftPosition = parseFloat('-' + timelineWidth) + $(window).width() + 400;
                trackMaxLeftPosition = parseFloat('-' + trackWidth) + $(window).width();
            }
        }

        /**
         * Set timeline width & store value to global var
         *
         * @private
         */
        function _setTimelineWidth() {

            /* Set timeline width */
            timelineWidth =  $(settings.timelineContainer).find(' > ul').width();

            $(settings.timelineContainer).css('width', (timelineWidth + windowWidth) + 'px');
        }

        /**
         * Set track width & store value to global var
         *
         * @private
         */
        function _setTrackWidth() {

            trackWidth = 0;
            $(settings.trackItems).each(function() {
                trackWidth +=  ($(this).width());
            });

            $(settings.trackContainer).css('width', trackWidth + 'px');
        }

        /**
         * Set timeline width & store value to global var
         *
         * @private
         */
        function _setTimelineHeight() {

            /* Set timeline width */
            //timelineHeight = windowHeight;
            timelineHeight =  $(settings.timelineContainer).find(' > ul').height();
            $(settings.timelineContainer).css('height', timelineHeight + 'px');
        }

        /**
         * Set track width & store value to global var
         *
         * @private
         */
        function _setTrackHeight() {
            trackHeight = 0;
            $(settings.trackItems).each(function() {
                trackHeight +=  ($(this).outerHeight());
            });

            $(settings.trackContainer).css('height', trackHeight + 'px');
        }

        /**
         * Contruct timeline and items positionning
         *
         * @private
         */
        function _constructTimeline() {
            if(!$(settings.timelineContainer).hasClass('built')) {
                var j=1;
                var nbcol=1;

                $(settings.timelineContainer).find(settings.timelineItem).each(function(i) {
                    $(this).addClass('col'+nbcol);

                    if($(this).find(settings.timelineItemContent).length > 1) {
                        j++;
                    }

                    // If next item is Slide content, close column.
                    if($(this).next().hasClass('intercalaire')) {
                        j = 3;
                    }

                    // If current item is Slide content, close column with nothing else in.
                    if($(this).hasClass('intercalaire')) {
                        j = 3;
                    }

                    // If there are more than 3 items in column, close it.
                    if(j >= 3) {
                        j = 0;
                        nbcol++;
                    }
                    j++;
                });

                for(var i=1; i <= nbcol; i++) {
                    if ( $(settings.timelineContainer).find('li.col' + i).length > 0) {
                        $(settings.timelineContainer).find('li.col' + i).wrapAll('<ul class="timeline-column">');

                        $(settings.timelineContainer).find('li.col' + i).each(function(i) {
                            $(this).addClass('index-' + i);
                        });
                    }
                }

                $('ul.timeline-column').wrapAll('<li class="items-container">');
                $(settings.timelineContainer).addClass('built');
            }
        }

        /**
         * Run timeline configuration with pep jquery plugin
         *
         * @private
         */
        function _timelineX() {

            realWidthSliderTimeline = timelineWidth - windowWidth;
            realWidthSliderTrack = trackWidth - windowWidth;

            coefTl = realWidthSliderTrack / realWidthSliderTimeline;
            coefTr = realWidthSliderTimeline / realWidthSliderTrack;

            diffTimeline = 0;
            diffTrack = 0;

            var shouldPreventDefault = true;

            if( isTouch ) {
                shouldPreventDefault = false;
                shouldEase = false;
            }


            /* Load pep plugin for timeline & track
            /* ---------------------------------- */

            $pep_timeline = $(settings.timelineContainer).pep({
                axis: defaultAxis,
                useCSSTranslation: false,
                shouldPreventDefault: shouldPreventDefault,
                allowDragEventPropagation: false,
                shouldEase: shouldEase,
                constrainTo: [0, 0, 0, (timelineWidth - element.width()) * -1],

                start: function() {
                    $('.timeline-container').css('opacity', 1);
                    $(settings.timelineContainer).addClass('disable-animation');
                    positionLeftTimeline = parseInt($(settings.timelineContainer).css('left'));
                    var defautlTlPos = positionLeftTimeline * coefTl;
                    var currentTlPos = parseInt($(settings.trackContainer).css('left'));
                    diffTrack = currentTlPos - defautlTlPos;

                    lastEventIsDrag = true;

                },
                easing: function () {

                    if((shouldEase) && (lastEventIsDrag)){
                        _moveTimelineCallback();
                    }
                },
                drag: function () {
                    _moveTimelineCallback();
                },

                stop: function() {
                    $(settings.timelineContainer).removeClass('disable-animation');
                    setTimeout(function() {lastEventIsDrag = false;}, 100);
                },
                rest: function() {
                    lastEventIsDrag = false;
                }
            });

            $pep_track = $(settings.trackContainer).pep({
                axis: defaultAxis,
                useCSSTranslation: false,
                shouldPreventDefault: shouldPreventDefault,
                allowDragEventPropagation: false,
                shouldEase: shouldEase,
                constrainTo: [0, 0, 0, (trackWidth - element.width()) * -1 ],
                start: function() {
                    $(settings.trackContainer).addClass('disable-animation');
                    clearTimeout(to);
                    lastEventIsDrag = true;

                    positionLeftTrack = parseInt($(settings.trackContainer).css('left'));
                    var defaultTrPos = positionLeftTrack * coefTr;
                    var currentTrPos = parseInt($(settings.timelineContainer).css('left'));
                    diffTimeline = currentTrPos - defaultTrPos;
                },
                easing: function() {
                    if((shouldEase) && (lastEventIsDrag)){
                        _moveTracklineCallback();
                    }
                },
                drag : function () {
                    _moveTracklineCallback();
                },
                stop: function () {
                    if(!isTouch) {
                        $(settings.trackContainer).removeClass('disable-animation');
                        lastEventIsDrag = false;
                        /*to = setTimeout(function () {
                        }, 100);*/
                    } else {
                        lastEventIsDrag = false;
                    }
                },
                rest: function() {
                    lastEventIsDrag = false;
                }
            }).css('top', 0);



        }


        /**
         * Set timeline drag & ease event  (DESKTOP)
         *
         * @private
         */
        function _moveTimelineCallback() {


            $(settings.trackContainer).removeClass('disable-animation');

            positionLeftTimeline = parseInt($(settings.timelineContainer).css('left'));
            var defaultTlPos = positionLeftTimeline * coefTl;

            var trackPos = defaultTlPos + diffTrack;

            if (positionLeftTimeline <= -(realWidthSliderTimeline)) {
                $(settings.timelineContainer).css('left',  -(realWidthSliderTimeline)  + 'px');
                trackPos =  -(realWidthSliderTrack);
            }
            if (positionLeftTimeline >= 0) {
                $(settings.timelineContainer).css('left', '0px');
                trackPos = 0;
            }

            if (trackPos <= -(realWidthSliderTrack)) {
                trackPos =  -(realWidthSliderTrack);
            }

            $(settings.trackContainer).css({left:  trackPos  + 'px'});
        }

        /**
         * Set Track drag & ease event (DESKTOP)
         *
         * @private
         */
        function _moveTracklineCallback() {

            $(settings.timelineContainer).removeClass('disable-animation');


            $('.tooltip').fadeOut(200);

            positionLeftTrack = parseInt($(settings.trackContainer).css('left'));

            var defaultTrPos = ( positionLeftTrack * coefTr ) + diffTimeline;

            if ((defaultTrPos > 0) || (positionLeftTrack >= 0)) {
                defaultTrPos = 0;
            }
            if ((defaultTrPos <= -(realWidthSliderTimeline)) && (defaultTrPos < 0)){
                defaultTrPos = -(realWidthSliderTimeline)
            }

            $(settings.timelineContainer).css('left', (defaultTrPos) + 'px');
        }


        /**
         * Run timeline configuration with pep jquery plugin
         *
         * @private
         */
        function _timelineY() {

            realHeightSliderTimeline = timelineHeight - windowHeight;
            realHeightSliderTrack = trackHeight - windowHeight;

            coefTl = realHeightSliderTrack / realHeightSliderTimeline;
            coefTr = realHeightSliderTimeline / realHeightSliderTrack;

            var shouldPreventDefault = true;
            if( isTouch ) {
                shouldPreventDefault = false;
            }

            /* Load pep plugin for timeline & track
             /* ---------------------------------- */

            $pep_timeline = $(settings.timelineContainer).pep({
                axis: defaultAxis,
                useCSSTranslation: false,
                shouldPreventDefault: shouldPreventDefault,
                shouldEase: false,
                constrainTo: [ (timelineHeight - element.height()) * -1,0, 0, 0 ],
                drag: function () {
                    _moveTimelineCallbackY();
                },
                stop: function() {
                    lastEventIsDrag = false;
                }
            });

            $pep_track = $(settings.trackContainer).pep({
                axis: defaultAxis,
                useCSSTranslation: false,
                shouldPreventDefault: shouldPreventDefault,
                shouldEase: false,
                constrainTo: [ (trackHeight - element.height()) * -1,0, 0, 0 ],
                drag: function () {
                    to = setTimeout(function() {lastEventIsDrag = true; }, 500);
                    _moveTracklineCallbackY()
                },
                stop: function() {
                    lastEventIsDrag = false;
                }
            }).css('left', 0).css('top', 0);

        }


        /**
         * Set timeline drag & ease event  (MOBILE)
         *
         * @private
         */
        function _moveTimelineCallbackY() {

            positionTopTimeline = parseInt($(settings.timelineContainer).css('top'));
            var defautlTlPos = positionTopTimeline * coefTl;

            var trackPos = defautlTlPos + diffTrack;

            if (positionTopTimeline <= -(realHeightSliderTimeline)) {
                $(settings.timelineContainer).css('top',  -(realHeightSliderTimeline)  + 'px');
                trackPos =  -(realHeightSliderTrack);
            }

            if (trackPos <= -(realHeightSliderTrack)) {
                trackPos =  -(realHeightSliderTrack);
            }

            if (positionTopTimeline >= 0) {
                $(settings.timelineContainer).css('top', '0px');
                trackPos = 0;
            }

            $(settings.trackContainer).css({top:  trackPos  + 'px'});
        }

        /**
         * Set Track drag & ease event (MOBILE)
         *
         * @private
         */
        function _moveTracklineCallbackY() {
            positionTopTrack = parseInt($(settings.trackContainer).css('top'));

            var defautlTrPos = ( positionTopTrack * coefTr ) + diffTimeline;

            if ((defautlTrPos > 0) || (positionTopTrack >= 0)) {
                defautlTrPos = 0;
            }
            if ((defautlTrPos <= -(realHeightSliderTimeline)) && (defautlTrPos < 0)){
                defautlTrPos = -(realHeightSliderTimeline)
            }

            $(settings.timelineContainer).css('top', (defautlTrPos) + 'px');
        }

        function _itemPosition() {
            var _slug = $.cookie('BDF-url');
            if (_slug) {
                _slug = _slug.substr(1, _slug.length);

                var timelineItem = $(settings.timelineContainer).find('a[href$="' + _slug + '"]').parents('li');
                var _id = timelineItem.attr('data-timeline');
                var _elt = $(settings.trackContainer).find('a[data-track=' + _id + ']');

                $.removeCookie('BDF-url');

                _trackEventClick(_elt, 500);
            }
        }

        /**
         * Set Track & timeline position on selected track item
         * Click & Dop events
         *
         * @private
         */
        function _trackEventClick(elt, delay) {

            if( (!$(elt).hasClass(settings.trackBeforeClass)) && (!$(elt).hasClass(settings.trackAfterClass)) ) {

                var _id = $(elt).attr('data-track');
                var _trackPosition = 0;
                var _target = 0;

                if ($(elt).length > 0) {
                    if(!isMobile) {
                        _trackPosition = $(elt).position().left;

                        var _targetItem = $(settings.timelineContainer).find('li[data-timeline=' + _id + ']');

                        if(_targetItem.hasClass('intercalaire')) {
                            _target = _targetItem.position().left + 315;
                        } else if(_targetItem.hasClass('intro-container'))  {
                            _target = windowWidth/2 ;
                        } else {
                            _target = _targetItem.find(settings.timelineItemContent).position().left + 39;
                        }

                        if ((!$('html').hasClass('ie9')) && (!$('html').hasClass('lt-ie9')) ) {
                            $(settings.timelineContainer).stop(true, true).css({'left': -(_target - windowWidth/2 ) + 'px'});
                            $(settings.trackContainer).stop(true, true).css({'left': -(_trackPosition - windowWidth/2 ) + 'px'});
                        } else {
                            $(settings.timelineContainer).animate({'left': -(_target - windowWidth/2 ) + 'px'}, delay, 'easeOutQuad');
                            $(settings.trackContainer).animate({'left': -(_trackPosition - windowWidth/2 ) + 'px'}, delay, 'easeOutQuad');
                        }


                        clearTimeout(to);
                        lastEventIsDrag = false;

                    } else {
                        var timelineItem = $(settings.timelineContainer).find('li[data-timeline=' + _id + ']').find(settings.timelineItemContent);
                        _target = timelineItem.position().top + (timelineItem.height() / 2);
                        _trackPosition = $(elt).parent().position().top - 5;

                        var _newTimeLinePos = -(_target - windowHeight/2 );
                        var _newTrackLinePos = -(_trackPosition - windowHeight/2 );

                        if(_newTrackLinePos > 0) {
                            _newTrackLinePos = 0;
                        }

                        if(_newTimeLinePos > 0) {
                            _newTimeLinePos = 0;
                        }

                        $(settings.timelineContainer).stop(true, true).animate({'top': _newTimeLinePos + 'px'}, 1000, 'easeOutQuad');
                        setTimeout(function() {$(settings.trackContainer).animate({'top': _newTrackLinePos + 'px'}, 500, 'easeOutQuad');}, 100);
                    }
                }
            }
        }

        /**
         * Handle plugin events
         *
         * @private
         */
        function _events() {

            /* Scroll event
            /* ---------------------------------- */

            $.fn.wheel = function (callback) {
                return this.each(function () {
                    $(this).on('mousewheel DOMMouseScroll', function (e) {

                        e.delta = null;
                        if (e.originalEvent) {
                            if (e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta / -40;
                            if (e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
                            if (e.originalEvent.detail) e.delta = e.originalEvent.detail;
                        }

                        if (typeof callback == 'function') {
                            callback.call(this, e);
                        }
                    });
                });
            };

            var isFirstWheel = false;

            if ((!isMobile) && (!isTouch)) {
                $('body').wheel(function (e) {
                    e.preventDefault();

                    if(!isFirstWheel) {
                        positionLeftTimeline = parseInt($(settings.timelineContainer).css('left'));
                        var defautlTlPos = positionLeftTimeline * coefTl;
                        var currentTlPos = parseInt($(settings.trackContainer).css('left'));
                        diffTrack = currentTlPos - defautlTlPos;

                        isFirstWheel = true;
                    }

                    $(settings.timelineContainer).addClass('disable-animation');
                    $(settings.trackContainer).addClass('disable-animation');

                    var _posLeft = $(settings.timelineContainer).position().left;
                    var _posCurr = (e.delta) + _posLeft;

                    var _posTrack = (_posCurr * coefTl) + diffTrack;

                    if (_posCurr > 0) {
                        isFirstWheel = false;
                        _posCurr = 0;
                        _posTrack = 0;
                    }

                    if(_posTrack > 0) {
                        _posTrack = 0;
                    }

                    if ((_posCurr <= -(realWidthSliderTimeline)) && (_posCurr < 0)){
                        isFirstWheel = false;
                        _posCurr = -(realWidthSliderTimeline);
                        _posTrack = -(realWidthSliderTrack);
                    }

                    if((_posTrack <= -(realWidthSliderTrack)) && (_posTrack < 0)) {
                        _posTrack = -(realWidthSliderTrack);
                    }

                    $(settings.timelineContainer).css({'left': _posCurr + 'px'});
                    $(settings.trackContainer).css({'left': _posTrack  + 'px'});
                });
            }


            /* Track line item click event
            /* ---------------------------------- */

            $(settings.trackContainer).find('a').not('.period-after, .period-before').unbind('click').click(function(e) {
                if(!isMobile) {
                    $(settings.timelineContainer).removeClass('disable-animation');
                    isFirstWheel = false;

                    if (!lastEventIsDrag) {
                        _trackEventClick(this, 1000);
                    }
                }
                return false;
            });

            if (isMobile) {
                $(settings.trackContainer).find('a').not('.period-after, .period-before').unbind('tap').on('tap',function(e) {
                        if (!lastEventIsDrag) {
                            _trackEventClick(this, 1000);
                        };
                        clearTimeout(to);
                        lastEventIsDrag = false;
                });
            }



            /* Timeline item click event
            /* ---------------------------------- */

            $(settings.timelineContainer).find('li.item a').unbind().click(function(e) {

                isFirstWheel = false;

                if (lastEventIsDrag) {
                    return false;
                } else {

                    if((!isMobile) && (!isTouch)) {
                        e.stopPropagation();

                        var _id = $(this).parents('li').attr('data-timeline');
                        var _elt = $(settings.trackContainer).find('a[data-track=' + _id + ']');
                        var _idPeriod = $('body').attr('data-num-periode');
                        var _url = $(this).attr('href');


                        _trackEventClick(_elt, 300);

                        setTimeout(function() {
                            pageTransition(_idPeriod, 'center', 500, function() {
                                $('.flat-transition').animate({'background-color': '#fff'},300, function(){
                                    window.location.href = _url;
                                });
                            });
                        }, 500);

                        return false;
                    }
                }
            });

            /* Window resize event
            /* ---------------------------------- */

            var rtime = new Date(1, 1, 2000, 12,00,00);
            var timeout = false;
            var delta = 200;

            $(window).unbind().resize(function(e) {
                rtime = new Date();
                if (timeout === false) {
                    timeout = true;
                    setTimeout(resizeend, delta);
                }
            });

            function resizeend() {
                if (new Date() - rtime < delta) {
                    setTimeout(resizeend, delta);
                } else {
                    timeout = false;
                    $('body').unbind('mousewheel');
                    $.pep.unbind( $pep_timeline );
                    $.pep.unbind( $pep_track );

                    $(settings.timelineContainer).css('width','40000px');
                    $(settings.trackContainer).css('width','40000px');

                    _build();
                }
            }
        }

        //    Entry point
        if ( (!$('html').hasClass('ie9')) && (!$('html').hasClass('lt-ie9')) ){
	        $(window).ready(function() {
	        	_build();
	        });
	    } else {
			_build();
	    }

        $(window).on('scroll', function(e) {
            e.stopPropagation();
            return false;
        });
    };


    /**
     * Default settings & merge array
     *
     * @type Array
     */
    $.fn.timeline.defaults = {
        timelineContainer :     '.timeline-container',
        timelineItems :         '.timeline-container li',
        timelineItem :          'li.item',
        timelineItemContent :   '.item-container',
        trackContainer :        '.track-container',
        trackItems :            '.track-container li',
        trackBeforeClass :      'period-before',
        trackAfterClass :       'period-after'
    };


})(jQuery);


$(function () {
    if( $('.timeline-wrapper').length > 0) {
        $('.timeline-wrapper').timeline();
    }
    if( $('.theme-main-container').length > 0) {
        $('.theme-main-container').timeline();
    }
    $(window).trigger('resize');
});
