    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict


function notifyUs(e) {
    e.preventDefault();
    var URL = "https://gmz7hhman7.execute-api.us-east-1.amazonaws.com/dev/notify-us";

         // var Namere = /[A-Za-z]{1}[A-Za-z]/;
         // if (!Namere.test($("#name").val())) {
         //              alert ("Name can not less than 2 char");
         //     return;
         // }

         if ($("#email").val()=="") {
             alert ("Please enter your email id");
             return;
         }

         var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
         if (!reeamil.test($("#email").val())) {
             alert ("Please enter valid email address");
             return;
         }

   //  var name = $("#name").val();
    var email = $("#email").val();
    var data = {
       name : "no name",
       client : "wesetrite",
       email : email
     };

    $.ajax({
      type: "POST",
      url : "https://gmz7hhman7.execute-api.us-east-1.amazonaws.com/dev/notify-us", //   Maybe use URL?
      dataType: "json",
      crossDomain: "true",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),

      
      success: function () {
        // clear form and show a success message
        alert("Response recorded. We will notify you once we go LIVE!");
        document.getElementById("notify-form").reset();
    location.reload();
      },
      error: function () {
        // show an error message
        alert("We are unable to process this request.");
      }});
  }
