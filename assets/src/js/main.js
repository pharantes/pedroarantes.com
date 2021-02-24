/* global theme_directory */

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

/*  modal open / form submit start */

$("#myModal").on("shown.bs.modal", () => {
  $("#username").trigger("focus");
});

if ($("#hireme").length) {
  $("#submit-form").prop("disabled", false);

  $("#submit-form").on(() => {
    $("#hireme")
      .submit((e) => {
        e.preventDefault();
      })
      .validate({
        rules: {
          username: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          description: {
            required: true,
          },
        },

        messages: {
          username: "Please enter your Name",
          description: "Please enter the description",
          email: "Please enter a valid email address",
        },
        submitHandler: () => {
          let username = $("#username").val();
          let email = $("#email").val();
          let description = $("#description").val();

          let dataurl =
            "&username=" +
            username +
            "&email=" +
            email +
            "&description=" +
            description;

          $("#submit-form").prop("disabled", true);
          $.ajax({
            type: "POST",
            url: theme_directory + "/libs/php/sendmail.php",
            data: dataurl,
            success: function (data) {
              $("#message_contact").html(data);
              $("#hireme").each(() => {
                this.reset();
              });
            },
            beforeSend: function () {
              $(".refresh").fadeIn("fast");
            },
            error: function (data) {
              $("#message_contact").html("Error sending message");
            },
            complete: function () {
              $(".refresh").fadeOut("fast");
              $("#submit-form").prop("disabled", false);
              $(".alert").addClass("block");
            },
          });
          return false;
        },
      });
  });
}
/*  modal open / form submit end */

/* Get year - footer - START */
const d = new Date();
const y = d.getFullYear();
$("#year").html(y);
/* Get year - footer - END */
