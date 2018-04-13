/*

How to use

<tooltip>My message</tooltip>
<tooltip hightlight="true">My message</tooltip>
<tooltip hightlight="true" hightlight-element=".form,#mydiv,input[name=email]">My message</tooltip>

<div tooltip="my awesome content">content</div>

*/

function bindTooltip(){

    var TStyle = {
        color                   : '#FFFFFF',
        'font-weight'           : 'bold',
        'background-color'      : 'rgba(60, 64, 76, 0.8)',
        position                : 'fixed',
        top                     : 0,
        left                    : 0,
        padding                 : 15,
        'z-index'               : 999999,
        'max-width'             : 300
    };

    jQuery('tooltip, *[tooltip]').each(function(i, e){
        var highlightElements = null;
        var oldStyleHighlightElements = [];

        var el = jQuery(e);

        if(el.is('tooltip')) {
            var tip = el.html();
            el.html("<span style=\"position: relative;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style=\"cursor: help;position: absolute;top: 4px;left: 1px;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABh0lEQVQ4T53Vu45PURTH8c9I8AIKtyjIPAHVPIBG406YSEiEhBCXSqXUkLhFoiIkEzOY2jsoiEqCcY3KA5hC5Cf7yPF3zt5hlWf99nevvW5nyrCtxgHsxFasK7KveI5FLOD75PGpAd5BXMX6kcu6z19wHvN9XR+4ArdxsgGadOfMGfyIow+88x+wDh7o6T4wz5yrRHYF13ERF0Z0+5PXRJgCvGvkbA2+YS1SmCH7jC0BHsH9Rt4u42aJ7lJFOxvgU+xqAJeLbgabKtrHAX5oiF6XnnyJ7XhWAb4PMLevHBGlcffiBZKj47hbAS63gN3ZPPMTHuJwC9h68hI2F0igGyvApUT4BLsrons4WqBvG8X71YezeFARBhZoLj2GHRXtoa6xc/OGEeE03pTCZcRSmCH7iOluljM2j0aEJ/CqNHZW2ZjtSa/2l8MtnGrkaMx9A2fjnFxfcfwrNEsje/Gv9dXdvg/XGu0RbXJ2rozk78iHNnacqxBwfgHbepsoW7r7BaTdMmV/2E9ys0rZVKrgpQAAAABJRU5ErkJggg==\" /></span>");
        } else {
            var tip = el.attr('tooltip');
        }

        var HtmlClass = "ttp-3kkjso";

        el.unbind().mouseenter(function(e){
            e.preventDefault();

            jQuery('body').append('<div class="' + HtmlClass + '">' + tip + '</div>');
            var tooltip = jQuery('.' + HtmlClass);
            tooltip.css(TStyle);

            var target = null;

            if (jQuery(e.target).find('img').length == 0) {
                target = jQuery(e.target).parent();
            } else {
                target = jQuery(e.target);
            }

            var targetOffsetTop = target.offset().top;
            var targetOffsetLeft = target.offset().left;
            var targetWidth = el.innerWidth();
            var targetHeight = el.innerHeight();

            targetOffsetTop -= jQuery(document).scrollTop();

            var tooltipHeight = tooltip.innerHeight() + 30;
            var tooltipWidth = tooltip.width() + 30;
            var pageWidth = jQuery(window).width();
            var pageHeight = jQuery(window).height();

            var toUse = "";

            // I'll add always 50px to stay "comfortable"
            if (
                (targetOffsetLeft + targetWidth + tooltipWidth + 50) < pageWidth && // if is handled in right
                (targetOffsetTop - tooltipHeight - 50) > 0 // if is handled in top
            ) {
                toUse = "TopRight";
            }
            else if(
                (targetOffsetLeft + targetWidth + tooltipWidth + 50) < pageWidth && // if is handled in right
                (targetOffsetTop + tooltipHeight + 50) < pageHeight // if is handled in bottom
            ) {
                toUse = "BottomRight";
            }
            else if(
                (targetOffsetTop - tooltipHeight - 50) > 0 && // if is handled in top
                (targetOffsetLeft - tooltipWidth - 50) > 0 // if is handled in left
            ) {
                toUse = "TopLeft";
            } else if(
                (targetOffsetTop + tooltipHeight + 50) < pageHeight && // if is handled in bottom
                (targetOffsetLeft - tooltipWidth - 50) > 0 // if is handled in left
            ) {
                toUse = "BottomLeft";
            }

            var design = {};

            if (toUse == "BottomRight") {
                design = {
                    '-webkit-border-radius': 4,
                    '-webkit-border-top-left-radius': 0,
                    '-moz-border-radius': 4,
                    '-moz-border-radius-topleft': 0,
                    'border-radius': 4,
                    'border-top-left-radius': 0
                };

                if(el.is('tooltip')) {
                    design.top = targetOffsetTop + targetHeight;
                    design.left = targetOffsetLeft + targetWidth;
                } else {
                    design.top = targetOffsetTop + targetHeight + 40;
                    design.left = targetOffsetLeft + targetWidth + 30;
                }
            }

            if (toUse == "TopRight") {
                design = {
                    '-webkit-border-radius'             : 4,
                    '-webkit-border-bottom-left-radius' : 0,
                    '-moz-border-radius'                : 4,
                    '-moz-border-radius-bottomleft'     : 0,
                    'border-radius'                     : 4,
                    'border-bottom-left-radius'         : 0
                };

                if(el.is('tooltip')) {
                    design.top = targetOffsetTop - tooltip.innerHeight();
                    design.left = targetOffsetLeft + targetWidth;
                } else {
                    design.top = targetOffsetTop - targetHeight;
                    design.left = targetOffsetLeft + targetWidth + 30;
                }
            }

            if (toUse == "BottomLeft") {
                design = {
                    '-webkit-border-radius'             : 4,
                    '-webkit-border-top-right-radius'   : 0,
                    '-moz-border-radius'                : 4,
                    '-moz-border-radius-topright'       : 0,
                    'border-radius'                     : 4,
                    'border-top-right-radius'           : 0
                };

                if(el.is('tooltip')) {
                    design.top = targetOffsetTop + targetHeight + 30;
                    design.left = targetOffsetLeft - tooltip.width() - 30;
                } else {
                    design.top = targetOffsetTop + targetHeight + 30;
                    design.left = targetOffsetLeft - tooltip.width() - 30;
                }
            }

            if (toUse == "TopLeft") {
                design = {
                    '-webkit-border-radius'             : 4,
                    '-webkit-border-bottom-right-radius': 0,
                    '-moz-border-radius'                : 4,
                    '-moz-border-radius-bottomright'    : 0,
                    'border-radius'                     : 4,
                    'border-bottom-right-radius'        : 0
                };

                if(el.is('tooltip')) {
                    design.top = targetOffsetTop - tooltip.innerHeight();
                    design.left = targetOffsetLeft - tooltip.width() - 30;
                } else {
                    design.top = targetOffsetTop - tooltip.innerHeight() + 30;
                    design.left = targetOffsetLeft - tooltip.width()- 30;
                }
            }

            tooltip.css(design);

            // Highlight
            var highlight = el.attr("highlight");
            if (highlight === 'true') {
                // Changing box color
                tooltip.css({
                    color               : '#000000',
                    'background-color'  : '#FFFFFF'
                });

                el.css({
                    'z-index'       : 999999,
                    'position'      : 'relative'
                });

                // Must highlight the element, creating blur div
                jQuery('body').append('<div id="tooltipHighlight"></div>');
                var highlightData = {
                    position    : 'fixed',
                    top         : 0,
                    left        : 0,
                    width       : 100 + "%",
                    height      : 100 + "%",
                    background  : "#9496a1",
                    opacity     : 0.8,
                    'z-index'   : 99999
                };

                jQuery('#tooltipHighlight').css(highlightData);
            }

            // Highlight elements
            highlightElements = el.attr("highlight-element");

            if(highlightElements && highlightElements.length > 0) {
                var highlightElementsSplit = highlightElements.split(',');
                for (i in highlightElementsSplit) {
                    oldStyleHighlightElements[i] = {
                        zindex   : jQuery(highlightElementsSplit[i]).css('z-index'),
                        position : jQuery(highlightElementsSplit[i]).css('position')
                    };

                    jQuery(highlightElementsSplit[i]).css('z-index', 999999);
                    if (oldStyleHighlightElements[i].position != 'relative' && oldStyleHighlightElements[i].position != 'absolute') {
                        jQuery(highlightElementsSplit[i]).css('position', 'relative');
                    }
                }
            }
        });

        el.bind('mouseleave', function(e) {
            jQuery('.' + HtmlClass + '').remove();
            el.css({
                'z-index'       : 99,
                'position'      : 'unset'
            });

            jQuery('#tooltipHighlight').remove();

            var i = 0;
            if(highlightElements && highlightElements.length > 0) {
                var highlightElementsSplit = highlightElements.split(',');
                for (i in highlightElementsSplit) {
                    jQuery(highlightElementsSplit[i]).css('z-index', oldStyleHighlightElements[i].zindex);
                    jQuery(highlightElementsSplit[i]).css('position', oldStyleHighlightElements[i].position);
                }
            }
        });
    });
}

jQuery(document).ready(function(){
    bindTooltip();
});