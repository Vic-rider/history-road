// Place any jQuery/helper plugins in here.
tabColor = ["#24a3ce", "#f39c11", "#24a28e", "#e9313d", "#c15c9a"];

/* Foundation */
$(document).foundation();


/* svg.js */
window.onload = function () {

    $num = 0;
    $('.illustration-container-js').each(function() {
        var _w = 150;
        var _h = 150;

        /* Item 001 */
        var draw = SVG('drawing-item'+$num).size(_w, _h);

        /* import image */
        var img = draw.image($("body").attr("data-src")+'/media/images/resize/h210_'+$(this).attr("data-thumb"), _w, _h);
        /* création d'un rectangle de couleur */
        var rect = draw.rect(_w, _h).attr({fill: tabColor[$("body").attr("data-num-periode")], 'fill-opacity': 0.5, 'class': 'rect'});

        /* formes qui serviront de masques */
        var poly = draw.polygon('89,0 110,64 55,103 0,64 21,0').fill({ color: '#fff' });
        var poly2 = draw.polygon('89,0 110,64 55,103 0,64 21,0').fill({ color: '#fff' });

        /* applications des masques */
        img.maskWith(poly);
        rect.maskWith(poly2);

        $('#drawing-item'+$num+" svg image").attr("x", "-21");
        $('#drawing-item'+$num+" svg image").attr("y", "-27");

        $num++;
    });

    $('.illustration-container-js-big').each(function() {
        var _w = 150;
        var _h = 150;

        /* Item 001 */
        var draw = SVG('drawing-item'+$num).size(_w, _h);

        /* import image */
        var img = draw.image($("body").attr("data-src")+'/media/images/resize/s700_'+$(this).attr("data-thumb"), _w, _h);

        /* création d'un rectangle de couleur */
        var rect = draw.rect(_w, _h).attr({fill: tabColor[$("body").attr("data-num-periode")], 'fill-opacity': 0, 'class': 'rect'});

        /* formes qui serviront de masques */
        var poly = draw.polygon('121,0 150,87 74.8,146 0,87 28.5,0').fill({ color: '#fff' });
        var poly2 = draw.polygon('121,0 150,87 74.8,146 0,87 28.5,0').fill({ color: '#fff' });

        /* applications des masques */
        img.maskWith(poly);
        rect.maskWith(poly2);

        $num++;
    });


    if($(window).width() < 769) {
        _drawHpSVGMobile();
    } else {
        _drawHpSVG();
    }

    $(window).resize(function() {
        $('#drawing-1, #drawing-2, #drawing-3, #drawing-4, #drawing-5, #drawing-6, #drawing-mobile-1, #drawing-mobile-2, #drawing-mobile-3, #drawing-mobile-4, #drawing-mobile-5, #drawing-mobile-6').html('');
        if($(window).width() < 769) {
            _drawHpSVGMobile();
        } else {
            _drawHpSVG();
        }
    });

    var _click_animate = false;

    function _drawHpSVG () {

        var _w = Math.ceil(($(window).width() * 18.5) / 100);

        var _w_theme = $(window).width() - ($('.bloc-nav-hp').not('.last').length * _w);
        $('.bloc-nav-hp').not('.last').width(_w);
        $('.bloc-nav-hp.last').width(_w_theme);

        var _h = $(window).height();

        var _img_w = 380;
        var _img_h = 1080;

        var _fill_color = "#fff";

        var _delay = 150;
        var _hover_coord = [[0,_h], [0,_h], [_w, _h], [_w, _h]];
        var _click_first_coord = [[0,_h], [0, _w], [_w,  _w], [_w, _h]];
        var _click_second_coord = [[0,_h], [0, 0], [_w,  0], [_w, _h]];

        var _default_coord_A = [[0,_h], [0, _w], [_w ,  (_w - 120)], [_w, _h]];
        var _default_coord_B = [[0,_h], [0, (_w - 120)], [_w, _w], [_w, _h]];
        var _default_coord_C = [[0,_h], [0, _w], [_w, (_w - 80)], [_w, _h]];
        var _default_coord_D = [[0,_h], [0, (_w - 80)], [_w , (_w - 20)], [_w, _h]];
        var _default_coord_E = [[0,_h], [0, (_w - 20)], [_w, (_w - 100)], [_w, _h]];

        var _default_coord_theme_hover = [[_w_theme,_h], [0, _h], [0, _h], [_w_theme, _h]];
        var _default_coord_theme = [[_w_theme,_h], [0, _h], [0, (_w - 100)], [_w_theme, (_w - 40)]];


        /* Masque hp 01 */
        var draw = SVG('drawing-1').size(_w, _h);
        var imgA = draw.image('media/images/bg-hp-01-nb.jpg', _img_w, _img_h);
        var polyA = draw.polygon(_default_coord_A).fill({ color: _fill_color });
        imgA.maskWith(polyA);

        /* Masque hp 02 */
        var draw = SVG('drawing-2').size(_w, _h);
        var imgB = draw.image('media/images/bg-hp-02-nb.jpg', _img_w, _img_h);
        var polyB = draw.polygon(_default_coord_B).fill({ color: _fill_color });
        imgB.maskWith(polyB);

        /* Masque hp 03 */
        var draw = SVG('drawing-3').size(_w, _h);
        var imgC = draw.image('media/images/bg-hp-03-nb.jpg', _img_w, _img_h);
        var polyC = draw.polygon(_default_coord_C).fill({ color: _fill_color });
        imgC.maskWith(polyC);

        /* Masque hp 04 */
        var draw = SVG('drawing-4').size(_w, _h);
        var imgD = draw.image('media/images/bg-hp-04-nb.jpg', _img_w, _img_h);
        var polyD = draw.polygon(_default_coord_D).fill({ color: _fill_color });
        imgD.maskWith(polyD);

        /* Masque hp 05 */
        var draw = SVG('drawing-5').size(_w, _h);
        var imgE = draw.image('media/images/bg-hp-05-nb.jpg', _img_w, _img_h);
        var polyE = draw.polygon(_default_coord_E).fill({ color: _fill_color });
        imgE.maskWith(polyE);

        /* Masque hp theme */
        var draw = SVG('drawing-6').size(_w_theme, _h);
        var imgF = draw.image('media/images/bg-hp-theme-nb.jpg', _w_theme, _img_h);
        var polyF = draw.polygon(_default_coord_theme).fill({ color: _fill_color });
        imgF.maskWith(polyF);

        _svgHover('.period-01 .period-link', polyA, _default_coord_A, _hover_coord, _delay );
        _svgHover('.period-02 .period-link', polyB, _default_coord_B, _hover_coord, _delay );
        _svgHover('.period-03 .period-link', polyC, _default_coord_C, _hover_coord, _delay );
        _svgHover('.period-04 .period-link', polyD, _default_coord_D, _hover_coord, _delay );
        _svgHover('.period-05 .period-link', polyE, _default_coord_E, _hover_coord, _delay );

        _svgHover('.theme', polyF, _default_coord_theme, _default_coord_theme_hover, _delay );

        $('.period-link').click(function(e) {

            _click_animate = true;

            var _url = $(this).attr('href');

            polyA.animate(300).plot(_click_first_coord);
            polyB.animate(300).plot(_click_first_coord);
            polyC.animate(300).plot(_click_first_coord);
            polyD.animate(300).plot(_click_first_coord);
            polyE.animate(300).plot(_click_first_coord);

            setTimeout(function() {
                polyA.animate(300, '>', 0).plot(_click_second_coord);
                polyB.animate(300, '>', 100).plot(_click_second_coord);
                polyC.animate(300, '>', 200).plot(_click_second_coord);
                polyD.animate(300, '>', 300).plot(_click_second_coord);
                polyE.animate(300, '>', 400).plot(_click_second_coord);
            }, 300);

            $.cookie('BDFlastPeriodId', '0', { expires: 1, path: '/' });

            var _idPeriod = $(this).attr('data-num-periode');

            $('body > section').delay(800).animate({opacity: 0}, 750, 'easeOutQuad');

            pageTransition(_idPeriod, 'left', 1000, function() {
                window.location.href = _url;
            });

            return false;
        });

    }

    function _svgHover(selector, poly,  default_coord, hover_coord, delay ) {
        $(selector).hover(function() {
            if(!_click_animate) {
                poly.animate(delay).plot(hover_coord);
            }
        }, function() {
            if(!_click_animate) {
                poly.animate(delay).plot(default_coord);
            }
        });
    }


    /*Génération de masque svg pour le menu de la page d'accueil en version mobile*/
    function _drawHpSVGMobile () {

        var _w =$(window).width();
        var _w_theme = _w;

        var _h = $('.period-mob-01').height();

        var _img_w = 768;
        var _img_h = 200;

        var _fill_color = "#fff";

        var _default_coord_A = [[0,_h], [0, 0], [(_w - 120), 0], [(_w - 70), _h]];        
        var _default_coord_B = [[0,_h], [0, 0], [(_w - 70), 0], [(_w - 90), _h]];
        var _default_coord_C = [[0,_h], [0, 0], [(_w - 90), 0], [(_w - 70), _h]];
        var _default_coord_D = [[0,_h], [0, 0], [(_w - 70), 0], [(_w - 110), _h]];
        var _default_coord_E = [[0,_h], [0, 0], [(_w - 110), 0], [(_w - 50), _h]];
        var _default_coord_theme = [[0,_h], [0, 0], [(_w - 50), 0], [(_w - 100), _h]];


        /* Masque hp mobile 01 */
        var draw = SVG('drawing-mobile-1').size(_w, _h);
        var imgA = draw.image('media/images/bg-menu-mobile-01-nb.jpg', _img_w, _img_h);
        var polyA = draw.polygon(_default_coord_A).fill({ color: _fill_color });
        imgA.maskWith(polyA);


        /* Masque hp mobile 02 */
        var draw = SVG('drawing-mobile-2').size(_w, _h);
        var imgB = draw.image('media/images/bg-menu-mobile-02-nb.jpg', _img_w, _img_h);
        var polyB = draw.polygon(_default_coord_B).fill({ color: _fill_color });
        imgB.maskWith(polyB);

        /* Masque hp mobile 03 */
        var draw = SVG('drawing-mobile-3').size(_w, _h);
        var imgC = draw.image('media/images/bg-menu-mobile-03-nb.jpg', _img_w, _img_h);
        var polyC = draw.polygon(_default_coord_C).fill({ color: _fill_color });
        imgC.maskWith(polyC);

        /* Masque hp mobile 04 */
        var draw = SVG('drawing-mobile-4').size(_w, _h);
        var imgD = draw.image('media/images/bg-menu-mobile-04-nb.jpg', _img_w, _img_h);
        var polyD = draw.polygon(_default_coord_D).fill({ color: _fill_color });
        imgD.maskWith(polyD);

        /* Masque hp mobile 05 */
        var draw = SVG('drawing-mobile-5').size(_w, _h);
        var imgE = draw.image('media/images/bg-menu-mobile-05-nb.jpg', _img_w, _img_h);
        var polyE = draw.polygon(_default_coord_E).fill({ color: _fill_color });
        imgE.maskWith(polyE);


        /* Masque hp mobile theme */
        var draw = SVG('drawing-mobile-6').size(_w_theme, _h);
        var imgF = draw.image('media/images/bg-menu-mobile-theme-nb.jpg', _img_w, _img_h);
        var polyF = draw.polygon(_default_coord_theme).fill({ color: _fill_color });
        imgF.maskWith(polyF);
    }

};


/* fancybox */
/* Affiche les médias de la page articles avec un helper */
$(document).ready(function() {
    $(".fancybox-thumb").fancybox({
        prevEffect	: 'none',
        nextEffect	: 'none',
        autoSize : true,
        scrolling : 'auto',
        preload   : true,
        helpers	: {
            media : {},
            title	: {
                type: 'outside'
            },
            thumbs	: {
                width	: 74,
                height	: 74
            }
        },
        beforeShow: function(){
            setTimeout(function() {
                $('#fancybox-thumbs ul li a').each(function(index) {
                    console.log($(this).has("img").length);
                    if($(this).has("img").length == 0){
                        $(this).addClass("icon-media-play");
                        $(this).append("<img src='../media/images/resize/w150_"+$("body").attr("data-period")+".jpg' />")
                        $(this).css("font-size", "50px");
                    }
                });
            }, 500);

            var href = this.href;
            n = href.search("player.ina.fr");
            if(n != -1){
                this.width = 620;
                this.maxHeight = 370;
            }
        }
    });

});



/* bxslider */
/* slider pour permettre aux thumbnail de la page article de rester accessible sur une ligne */
$('.bxslider').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true,
    maxSlides: 6,
    slideWidth: 150,
    controls: true,
    pager: false
});


/* mCustomScrollbar */
/* permet d'afficher le contenu de la page article en cas de long contenu mais pas sous 1024px */
(function($){
    
    $(window).load(function(){
        var windowHeight = $(window).height();

        if ($(window).width() > 1024) {
            $(".content-to-scroll").mCustomScrollbar({
                axis:"y",
                setHeight: windowHeight -90
            });
        }
    });
})(jQuery);


/* Facebook */
window.fbAsyncInit = function() {
    FB.init({
        appId      : '1672488422978020',
        xfbml      : true,
        version    : 'v2.2'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function streamPublish(pTitle, pCaption, pDescription, pImage, pLink) {
    FB.ui(
        {
            method: 'stream.publish',
            attachment: {
                name: 			pTitle,
                caption: 		pCaption,
                description: 	pDescription,
                href: 			pLink,
                media: [{
                    'type': 'image',
                    'src': pImage,
                    'href': pLink,
                    'expanded_width': 90,
                    'expanded_height': 90
                }]
            },
            action_links: [
                {
                    text: "Visiter",
                    href: pLink
                }
            ]
        },
        function(response){
            $.ajax({ });
        });
};

