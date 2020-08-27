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


      

function contactUs(e) {
        e.preventDefault();
        var URL = "https://gmz7hhman7.execute-api.us-east-1.amazonaws.com/dev/contact-us";
 
             var Namere = /[A-Za-z]{1}[A-Za-z]/;
             if (!Namere.test($("#cname").val())) {
                          alert ("Name can not less than 2 char");
                 return;
             }
 
             if ($("#cemail").val()=="") {
                 alert ("Please enter your email id");
                 return;
             }
 
             var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
             if (!reeamil.test($("#email").val())) {
                 alert ("Please enter valid email address");
                 return;
             }
 
        var cname = $("#cname").val();
        var cemail = $("#cemail").val();
        var csubject = $("#subject").val();
        var cdesc = $("#message").val();
        var cdata = {
           name : cname,
           email : cemail,
           subject  : csubject,
           desc  : cdesc

         };
 
        $.ajax({
          type: "POST",
          url : "https://gmz7hhman7.execute-api.us-east-1.amazonaws.com/dev/contact-us", //   Maybe use URL?
          dataType: "json",
          crossDomain: "true",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(cdata),
 
          
          success: function () {
            // clear form and show a success message
            alert("Response recorded. Thanks for contacting us.");
            document.getElementById("notify-form").reset();
        location.reload();
          },
          error: function () {
            // show an error message
            alert("We are unable to process this request.");
          }});
      }