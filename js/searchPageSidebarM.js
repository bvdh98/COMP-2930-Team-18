 $(document).ready(function () {
     
     $("#sidebar1").mCustomScrollbar({
         theme: "minimal"
     });

     $('#dismiss1, .overlay').on('click', function () {
         $('#sidebar1').removeClass('active');
         $('.overlay').removeClass('active');


     });

     $('#sidebarCollapse1').on('click', function () {
         $('#sidebar1').addClass('active');
         $('.overlay').addClass('active');
         $('.collapse.in').toggleClass('in');
         $('a[aria-expanded=true]').attr('aria-expanded', 'false');



     });
 });
