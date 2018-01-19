$(function(){
    console.log('ready');

    var validator = $('#postRideForm').validate();
    $('#postRideForm').submit(function(e){
        e.preventDefault();
        if(validator.valid()){
            $.ajax({
                url:'/postRide',
                type:'post',
                data:$('#postRideForm').serialize(),
                success:function(){
                    //whatever you wanna do after the form is successfully submitted
                    console.log('sent post ride data');
                }
            });
        }
    });

    //console.log('is user signed in: '+GoogleAuth.isSignedIn());
    $('.g-signout2').on('click',function(e){
        console.log('click sign out');
        var auth2=gapi.auth2.getAuthInstance();
        auth2.signOut().then(function(){
            console.log('signed out');
            $('.g-signout2').hide();
            $('#content').hide();//TODO: don't just hide this ALSO empty the table
            $('#welcomeMsg').show();
            $('.g-signin2').show();
            validator.resetForm();
        });
    });
    $('#fa').on('click',function(){
        departDate=$('#departDate').val();
        returnDate=$('#returnDate').val();
        console.log('depart: '+departDate+' return: '+returnDate);
        $.post('/findRide', {
            "departDate":departDate,
            "returnDate":returnDate
        }).done(function(serverResponse){
            console.log('server response: '+serverResponse);
        }).fail(function(xhr,status,error){
            console.log('error posting: '+error+' status: '+status+' xhr: '+JSON.stringify(xhr));
        })
    });
    $('#departDate').on('change',function(){
        $('#dDate').val($('#departDate').val());
    });
    $('#returnDate').on('change',function(){
        $('#rDate').val($('#returnDate').val());
    });

    var hours=["12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30"];
    $('#departDate').datepicker({minDate:0}).datepicker('setDate',new Date());
    $('#returnDate').datepicker({minDate:0}).datepicker('setDate',new Date());
    $('#dDate').datepicker({minDate:0}).datepicker('setDate',new Date());
    $('#rDate').datepicker({minDate:0}).datepicker('setDate',new Date());
    for(var i=0;i<2;i++){
        var t=i==0?' am':' pm';
        $.each(hours,function(index,value){
            $('#rTime').append($('<option></option>').attr('value',hours.length*i+index).text(value+t));
            $('#dTime').append($('<option></option>').attr('value',hours.length*i+index).text(value+t));
        });
    }
});
function onSignIn(googleUser) {
    var profile=googleUser.getBasicProfile();
    console.log("ID: "+profile.getId());
    console.log("Full Name: "+profile.getName());
    $('#driver').val(profile.getName());
    console.log("Email: "+profile.getEmail());
    $('#email').val(profile.getEmail());
    var id_token=googleUser.getAuthResponse().id_token;
    $('.g-signin2').hide();
    $('#welcomeMsg').hide();
    $('#content').show();
    $('.g-signout2').show();
}
function openTab(evt,choice){
    $('.tabContent').hide();
    $('.tablinks').removeClass('active');
    $('#'+choice).show()
    evt.currentTarget.className+=" active";
}
