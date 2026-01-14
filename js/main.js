$(document).ready(function() {
    $('.fa-bars').click(function() {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('load scroll', function() {
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 35) {
            $('.header').css({
                'background': 'rgba(16, 16, 34, 0.95)',
                'box-shadow': '0 0.6rem 1.5rem rgba(0,0,0,0.35)'
            });
        } else {
            $('.header').css({'background': 'transparent','box-shadow': 'none'});
        }
    });
});
