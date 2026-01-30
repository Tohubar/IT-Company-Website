$(document).ready(function() {
    const $menuToggle = $('.menu-toggle');
    const $navMenu = $('.nav-menu');

    $menuToggle.on('click', function() {
        $navMenu.toggleClass('open');
        $(this).toggleClass('active');
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 20) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
});
