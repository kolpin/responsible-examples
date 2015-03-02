define(['jquery', 'jqueryui', 'touch-punch', 'placeholder'], function ($) {
    return {

        'windowResize': function () {
            var clientw =  $(window).width();
            if (window.mobile || clientw <= 739) {
                $(".mymusic-albums .editbutons").width(clientw-40);
            }
            else {
                $(".mymusic-albums .editbutons").width(300);
            }
        },

        'albumclick': function(e) {
            return false;

        },

        'init': function () {
            $.Placeholder.init({ color : "#aaa" });
            $( ".all-galleries ul li > a" ).click(this.albumclick);

            $( ".all-galleries ul" ).sortable({
                start: function(event,ui){
                    $(ui.item).addClass("hovered");
                },
                stop: function(event,ui){
                    $(ui.item).removeClass("hovered");
                }          
            });     
            $( "#image_list ul" ).sortable({
                placeholder: "image-placeholder",
                start: function(event,ui){
                    $(ui.item).addClass("hovered");
                },                
                stop: function(event,ui){
                    $(ui.item).removeClass("hovered");
                    if($(".myimages-photos").hasClass("editable"))return true;
                    var x = event.pageX;
                    var y = event.pageY;
                    var ul = $(".all-galleries");
                    
                    $(".all-galleries li").removeClass("hovered");
                    $(".all-galleries li").each(function(){
                        if(!(y>=ul.offset().top && y<ul.offset().top+ul.height() &&
                           x>=ul.offset().left && x<ul.offset().left+ul.width()))return;
                        if(
                            y>=$(this).offset().top && y<$(this).offset().top+$(this).height() && 
                            x>=$(this).offset().left && x<$(this).offset().left+$(this).width()
                            ){
                            if(!$(this).hasClass("sel"))$(ui.item).remove();
                        }

                    });
                },
                sort: function(event,ui){
                    if($(".myimages-photos").hasClass("editable"))return true;
                    var x = event.pageX;
                    var y = event.pageY;
                    $(".all-galleries li").removeClass("hovered");
                    $(".all-galleries li").each(function(){
                        if(
                            y>=$(this).offset().top && y<$(this).offset().top+$(this).height() && 
                            x>=$(this).offset().left && x<$(this).offset().left+$(this).width()
                            ){
                            $(this).addClass("hovered");
                        }
                    });
                }

            });
           

            var dropfileswrapp = $(".drag-file");
            dropfileswrapp.ondragover = function() {
                $(this).addClass('hover');
                return false;
            };                
            dropfileswrapp.ondragleave = function() {
                $(this).removeClass('hover');
                return false;
            };
            dropfileswrapp.ondrop = function(event){
                event.preventDefault();
                $(this).removeClass('hover');
                var file = event.dataTransfer.files[0];                
                /* FILE LOAD */

                return false;                
            };


            $("#editAlbum").click(function(){
                $(".all-galleries .editblock").fadeIn();
                $(".all-galleries").addClass("editable");
                $(".mymusic-albums .editbutons .firststep").fadeOut(300,function(){
                    $(".mymusic-albums .editbutons .secondstep").fadeIn(300);
                });

                var overlay = $(".myimages-photos .overlay");
                overlay.width(overlay.parent().width()).height(overlay.parent().height()).fadeIn();
                return false;
            });

            $("#cancelEditAlbum, #saveEditAlbum").click(function(e){
                $(".all-galleries .editblock").fadeOut();
                $(".all-galleries").removeClass("editable");
                $(".mymusic-albums .editbutons .secondstep").fadeOut(300,function(){
                    $(".mymusic-albums .editbutons .firststep").fadeIn(300);
                });
                $(".myimages-photos .overlay").fadeOut();


                if($(this).attr("id")=="saveEditAlbum"){
                    /* ajax save */
                }

                return false;
            });

            $("#editPhotos").click(function(){  
                $(".myimages-photos .editbutons .firststep").fadeOut(300,function(){
                    $(".myimages-photos .editbutons .secondstep").fadeIn(300);
                });

                $("#image_list li .firststep").fadeOut(300,function(){
                    $("#image_list li .secondstep").fadeIn(300);
                    $(".myimages-photos").addClass("editable");
                });      

                var overlay = $(".mymusic-albums .overlay");
                overlay.width(overlay.parent().width()).height(overlay.parent().height()).fadeIn();


                return false;
            });          

            $("#cancelEditPhotos, #saveEditPhotos").click(function(e){
                $(".myimages-photos .editbutons .secondstep").fadeOut(300,function(){
                    $(".myimages-photos .editbutons .firststep").fadeIn(300);
                });
                $("#image_list li .secondstep").fadeOut(300,function(){
                    $("#image_list li .firststep").fadeIn(300);
                    $(".myimages-photos").removeClass("editable");
                });            

                $(".mymusic-albums .overlay").fadeOut();


                if($(this).attr("id")=="saveEditPhotos"){
                    /* ajax save */
                }

                return false;
            });

            $(".rect.fav").click(function(){
                if($(this).hasClass("checked"))$(this).removeClass("checked");
                else $(this).addClass("checked");
                return false;
            });

            //$(window).resize(this.windowResize);
        }        
    };
});