$('#carousel1').owlCarousel({
    loop:true,
    margin:30,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    }
})

$('#carousel2').owlCarousel({
    loop:true,
    margin:30,
    dots: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
