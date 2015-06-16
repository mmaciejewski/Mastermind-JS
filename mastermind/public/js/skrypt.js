/* jshint jquery: true, devel: true, browser: true */ 

$(function () {
    //alert('Zacznij grę!');
});

$(document).ready(function () {
    
    $('#size').val('');
    $('#dim').val('');
    $('#max').val('');
    
    var ruchy;
 
    $('#btnGraj').click(function () {
        
        var size = $("#size").val();
        var dim = $("#dim").val();
        var max = $("#max").val();
        ruchy = $("#max").val();
   
        //tworze url
        var UrlCreate = function(){
            
            if($('#size').val() !== '' && $('#dim').val() !== '' && $('#max').val() !== ''){
                var url = "/play/size/"+size+"/dim/"+dim+"/max/"+max+"/";
                return url;
            }
        };
        
        //tworze pola do gry
        var generateFields = function(){
            
            for(var i=0; i<size; i++){
            $("#poleWynik").append('<input id="'+i+'">').clone();
            }
            
            $('#btnGraj').hide();
            $('#size').hide();
            $('#dim').hide();
            $('#max').hide();
            $('.label').hide();
            
        };    
        
        $.ajax({
            method: 'GET',
            url: UrlCreate()
            //url: '/play/size/4/dim/5/max/2',
                }).done(function(data){
                    generateFields();
                });
            });  
    
//////////////////// 
    
    //przycisk sprawdzajacy
    $('#sprawdz').click(function(){
       
        var link = "/mark/";
        //var completeLink = true;
        console.log("test");
        
        for(var i = 0; i < $("#size").val(); i++){
            link += $('#' + i).val() + "/";
            //console.log(link);

        }    
        
        
    //sprawdzanie wygranej/przegranej
        var moveCheck = function(retVal){
            
            var el = document.getElementById("ruchyInfo");
            var el2 = document.getElementById("stan");
            
            //zczytuje przekazaną próbe z pól
            var proba = function(){

                for(var i=0; i<$("#size").val(); i++){
                    var content = $('#'+ i).val();
                    $("#stan").append(content +' ');
                }
                    
                
            };

            el2.innerHTML += "Trafiono: " +retVal.perfect+ " idealnie, oraz " +retVal.good+ " z przesunięciem. Próba:" ;
            proba();
            $("#stan").append("<br>");
            
            
            if($("#max").val() != 0){
                
                //alert($("#max").val());             
                ruchy--;
                
                if(el){el.innerHTML = "Pozostało ruchów: " +ruchy;} 
                if(ruchy <= 0){alert("Przekroczono ilosc ruchow! Przegrana!");}

            }
            else{
                
                ruchy++;
                
                if(el){ el.innerHTML = "Wykonano ruchów: " + ruchy; }
                
            }
            
            if(retVal.win === true){
    		alert("Gratulacje! Zwycięstwo");
            }
        };
        
        
        
        
        $.ajax({ 
            method: 'GET',
            url: link
                }).done(function(data){
                    //alert("Załadziało");
                    moveCheck(data.retVal);
                });
        });
       
    });

//String.prototype.repeat = function (num) {
//  return new Array(num + 1).join(this);  
//};+
