/* Calcul de hauteurs relative à la hauteur du viewport
************************************************** */
var rtime = new Date(1, 1, 2000, 12, 00, 00);
var timeout = false;
var delta = 100;

$(window).resize(function () {
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
		var windowHeight = $(window).height();

		var timelineHeightDifference = windowHeight - 550; /* 550 = 650px de hauteur mini constaté pour la timeline - 100px de margin-top déjà présent en css */
		var timelineHeightAjustement = timelineHeightDifference / 2;


		$(".bloc-nav-hp").css("height", windowHeight - 50); /* bloc-nav-hp = hauteur du viewport - hauteur de bloc-bottom-container (ici 50px en css cf style.css) */

		if ($('html').hasClass('no-touch')) {
			$(".welcome-container-js").css("height", windowHeight);
		}

		$(".cache-oblique").css("height", windowHeight);

		$(".menu-mobile-container-js").css("height", windowHeight);
		$(".call-to-action-container-js").css("height", windowHeight - 370);
		$(".introduction-section").css("padding-top", windowHeight / 2.8); /* Permet d'ajuster la hauteur de la zone du logo en fonction de la hauteur du viewport */

		if ($(window).width() > 768 && $(window).height() > 550 && $('html').hasClass('no-touch')) {
			$(".timeline-adjustment").css("padding-top", timelineHeightAjustement); /* Permet d'ajuster le centrage de la timeline en fonction de la hauteur du viewport */
		}

		/* Permet d'afficher ou non la petite flèche sous le tittre de l'accueil et de cacher le gros bouton */
		if ($(window).width() < 768 && $(window).height() < 460) {
			$(".btn-arrow-js").show();
			$(".call-to-action-container-js").hide();
		} else {
			$(".btn-arrow-js").hide();
			$(".call-to-action-container-js").show();
		}
	}               
}

window.addEventListener("orientationchange", function () {
	setTimeout(function () {
		if ($(window).width() < 1025 ) {
			$( ".first-media-js" ).css( "height", $(window).height() - 110 ); /* Permet d'afficher le début du titre sur version tactile */
		} else {
			$(".first-media-js").css("height", $(window).height());
		};
		$(".welcome-container-js").css("height", $(window).height());
	}, 300);
}, false);

$(window).load(function () {
	$(".welcome-container-js").css("height", $(window).height());
});



$(function () {
	/* Déclenchement de l'evenement resize
	************************************************** */
	$(window).trigger('resize');

	/* Descend les crédit des images sur la page article si il n'y a qu'une seule Image.
	************************************************** */
	if($(".media-container").attr('data-single') == 'true') {
		$(".first-media .titre").css("bottom", "20px");
	}

	/* Sauvegarde l'etat du son a travers le site
	************************************************** */	
	if(readCookie('BDF-sounds')) {
		if(readCookie('BDF-sounds') == 1) {
			$(".bt-son span").removeClass("icon-son_off").addClass("icon-son_on");
		} else {
			$(".bt-son span").removeClass("icon-son_on").addClass("icon-son_off");
		}
	}


	/* Permet de changer la couleur des icones en header en mobile
    ************************************************** */
	var windowHeight = $(window).height();
	var $document = $(document),
		$element = $('.header-mobile'),
		className = 'change-color';

	$document.scroll(function() {
		if ($document.scrollTop() >= windowHeight) {
			$element.addClass(className);
		} else {
			$element.removeClass(className);
		}
	});
	
	
	/* Force la hauteur à celle du viewport
    ************************************************** */
	$(".win-height-js").css("height", windowHeight);
	

	/* Anchor smooth scroll
    ************************************************** */
	$(document).delegate('a[href*=#]:not([href=#])', 'click','touchstart', function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 800);
				return false;
			}
		}
	});
});

/* Permet de masquer les textes de la zone du logo de la HP au survol des liens principaux
************************************************** */
$('.period-link').hover(
	function () {
		$('.hide-to-over').stop().fadeOut();
	}, function() {
		$('.hide-to-over').stop().fadeIn();
	}
);

/* Permet de zoomer les images de la HP au survol des liens principaux
************************************************** */
$( '.period-link' ).hover(
	function() {
		$(this).stop().parent().addClass('hover-img');
	},function () {
		$(this).stop().parent().removeClass('hover-img');
	}
);





/* Gestion des transitions timeline (aplat de couleur)
 ************************************************** */

$('header nav a, a.period-before, a.period-after, a.back-link').click(function () {

	if ($('html').hasClass('no-touch')) {
		if ($(this).attr('data-num-periode') >= 0) {

			var _idPeriod = $(this).attr('data-num-periode');

			var _url = $(this).attr('href');
			var _direction = 'left';

			if ($(this).hasClass('period-before')) {
				_direction = 'right';
			}
			if ($(this).hasClass('back-link')) {
				_direction = 'right';
				var _period = parseInt(_idPeriod) + 1;
				$.cookie('BDFlastPeriodId', _period, {expires: 1, path: '/'});
			}

			pageTransition(_idPeriod, _direction, 0, function () {
				window.location.href = _url;
			});

			return false;
		}
	}
});

function pageTransition(idPeriod, direction, delay, callback) {

	var _currentPeriodId = $('body').attr('data-num-periode');

	$('.timeline-container').addClass('pep-active');
	$('.track-container').addClass('pep-active');

	if(idPeriod < _currentPeriodId) {
		direction = 'right';
	}

	if($('.flat-transition').length == 0) {
		$('body').css('background-color','#ffffff').append('<div class="flat-transition"><span></span></div>');
	}

	if(direction == 'right') {
		$('.flat-transition')
			.css('right', 'inherit')
			.css('left', '-30%');
	}

	if (direction == 'left') {
		$('.flat-transition')
			.css('left', 'inherit')
			.css('right', '-30%');
	}

	if (direction == 'center') {
		$('.flat-transition')
			.css('left', '50%')
			.css('right', 'inherit');
	}

	if(direction == 'left') {
		$('.timeline-container').delay(delay).animate({left: '-=200px', opacity: 0}, 1000, 'easeOutQuad');
	} else {
		$('.timeline-container').delay(delay).animate({left: '+=200px', opacity: 0}, 1000, 'easeOutQuad');
	}

	//idPeriod = $(elt).attr('data-num-periode');


	var _animateCss = {width: '160%'};

	if (direction == 'center') {
		_animateCss = {width: '160%', left: '-30%'};
	}

	$('.flat-transition')
		.css('width', 0)
		.css('background-color', tabColor[idPeriod])
		.delay(delay)
		.animate(_animateCss, 1000, 'easeInOutExpo', function() {

	});

	if(callback) {
		setTimeout(function() {
			callback();
		}, delay + 1000);
	}

}


/* Gestion des transitions entre les articles
 ************************************************** */

/* OUTGOING TRANSITION */
$('body#article a.prev').click(function() {
	if($('html').hasClass('no-touch')) {
		var _url = $(this).attr('href');
		articleTransition('left', true, 0, function () {
			window.location.href = _url;
		});
		return false;
	}
});

$('body#article a.next').click(function() {
	if($('html').hasClass('no-touch')) {
		var _url = $(this).attr('href');
		articleTransition('right', true, 0, function () {
			window.location.href = _url;
		});
		return false;
	}
});

/* INGOING TRANSITION */
$(window).ready(function() {
	if($('html').hasClass('no-touch')) {
		$('.article-container').css('opacity', 0);
	}
});

$(window).ready(function() {
	if ($(window).width() < 1025 ) {
		$( ".first-media-js" ).css( "height", $(window).height() - 110 ); /* Permet d'afficher le début du titre sur version tactile */
	} else {
		$(".first-media-js").css("height", $(window).height());
	};

	if($('html').hasClass('no-touch')) {
		var _direction = $.cookie('BDFarticleDirection');
		articleTransition(_direction, false, 500);
	}
});



function articleTransition(direction, isOutgoing, delay, callback) {

	$.cookie('BDFarticleDirection', direction,  { expires: 1, path: '/' });

	var _left = '-=100px';
	if(direction == 'left') {
		_left = '+=100px';
	}

	if (isOutgoing) {
		$('.article-container').delay(delay).animate({left:  _left, opacity: 0}, 700, 'easeOutQuad', function() {
			if(callback) {
				callback();
			}
		});
	} else {

		if(direction == 'left') {
			$('.article-container').css('left', '-100px');
		} else {
			$('.article-container').css('left', '100px');
		}

		$('.article-container')
			.delay(delay)
			.animate({left:  0, opacity: 1}, 700, 'easeOutQuad', function() {
			if(callback) {
				callback();
			}
		});
	}
}

/* PINTEREST BUTTON */
$(".btn-pinterest").click(function() {
	window.open('http://pinterest.com/pin/create/button/?url='+$(this).attr("data-url")+'&media='+$(this).attr("data-media")+'&description='+$(this).attr("data-description"),'_blank');
});

/* COOKIE */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

/* COOKIE ALERT BANDEAUX */
$(document).on('close.fndtn.alert-box', function(event) {
	createCookie('BDF', '1','3650');
});

if(readCookie('BDF') == '1') {
	$("#cookiesAlert").css("display","none");
}

/*****SOUND******/
if($("body").attr("data-src")) src = $("body").attr("data-src");
else src = "";

/*ion.sound({
    sounds: [
        {
            name: "00"
        },
        {
            name: "01"
        }, 
        {
            name: "02"
        },
        {
            name: "03"
        },
        {
            name: "04"
        },
        {
            name: "05"
        }
    ],
    volume: 1.0,
    path: src+"/media/sons/",
    preload: true
});
*/
var sonRollOver = "0"+$("body").attr("data-num-periode");

$(".bt-son").click(function() {
	if($(".bt-son span").hasClass("icon-son_on")) {
		$(".bt-son span").removeClass("icon-son_on").addClass("icon-son_off");
		createCookie('BDF-sounds', '0','3650');
	} else {
		$(".bt-son span").removeClass("icon-son_off").addClass("icon-son_on");
		createCookie('BDF-sounds', '1','3650');
	}
});

$(".period-link").mouseenter(function() {
	if($(".bt-son span").hasClass("icon-son_on")) ion.sound.play(sonRollOver);
});

$(".item").mouseenter(function() {
	if($(".bt-son span").hasClass("icon-son_on")) {
		if($("body").attr("data-num-periode") == "6") sonRollOver = "0"+$(this).attr("data-periode");
		ion.sound.play(sonRollOver);
	}
});

$(".tip-top").mouseenter(function() {
	if($(".bt-son span").hasClass("icon-son_on")) {
		if($("body").attr("data-num-periode") == "6") sonRollOver = "0"+$(this).attr("data-periode");
		ion.sound.play(sonRollOver);
	}
});

$(".small-theme-container").mouseenter(function() {
	if($(".bt-son span").hasClass("icon-son_on")) ion.sound.play(sonRollOver);
});

$(".large-theme-container").mouseenter(function() {
	if($(".bt-son span").hasClass("icon-son_on")) ion.sound.play(sonRollOver);
});

/* Désactivation du clic droit sur les images
 ************************************************** */
document.addEventListener("contextmenu", function(e){
	if (e.target.nodeName === "IMG") {
		e.preventDefault();
	}
}, false);