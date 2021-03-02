/* footer testimonial carousel start */

$(".testimonials-carousel").slick({
  autoplay: true,
  infinite: true,
  autoplaySpeed: 4500,
  arrows: false,
  centerMode: true,
  slidesToShow: 1,
  slidesToScroll: 1,
});

/* footer testimonial carousel end */

/* Get year - footer - START */
const d = new Date();
const y = d.getFullYear();
$("#year").html(y);
/* Get year - footer - END */
