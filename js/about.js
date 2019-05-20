 $(document).ready(function() {
            $("#appStory").on('click', function(){
                $("#story, #R1, #R2, #R3, #R4, #R5").toggle(200);
          });
            $("#R1").on('click', function(){
                $("#appStory, #bioB, #R2, #R3, #R4, #R5").toggle(200);
          });
            $("#R2").on('click', function(){
                $("#appStory, #bioG, #R1, #R3, #R4, #R5").toggle(200);
          });
            $("#R3").on('click', function(){
                $("#appStory, #bioJ, #R2, #R1, #R4, #R5").toggle(200);
          });
            $("#R4").on('click', function(){
                $("#appStory, #bioR, #R2, #R3, #R1, #R5").toggle(200);
          });
            $("#R5").on('click', function(){
                $("#appStory, #bioS, #R2, #R3, #R4, #R1").toggle(200);
          });
        })