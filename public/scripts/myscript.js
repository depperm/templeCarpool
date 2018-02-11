var profile;
var tripList;
$(function(){
    console.log('ready');

    var mdStakes=["Annapolis","Seneca","Baltimore","Columbia","Suitland","Washington, DC","Frederick","Silver Spring"];
    var paStakes=["Altoona","Pitsburgh","Chambersburg"];
    var vaStakes=["Annandale","Ashburn","Buena Vista(YSA)","Centreville","Chesapeake","Fredricksburg","Gainesville","McLean","Mt Vernon","Washington DC(YSA)","Winchester","Newport News","Oakton","Pembroke","Richmond-Chesterfield","Richmond-Midlothian","Richmond","Roanoke","Stafford","Virginia Beach","Waynesboro","Woodbridge"];
    var wvStakes=["Clarksburg","Martinsburg"];

    var validator = $('#postRideForm').validate();
    $('#postRideForm').submit(function(e){
        e.preventDefault();
        if(validator.valid()){
            var data=$('#postRideForm').serializeArray();//form to array
            data.push({name:"driverId", value:profile.getId()});//add driver id
            console.log('sending:'+JSON.stringify(data))
            $.ajax({
                url:'/api/trips/add',
                type:'post',
                data:$.param(data),
                statusCode: {
                    200: function(response){
                        $('#dDate').val('');
                        $('#dTime').val('select');
                        $('#rDate').val('');
                        $('#rTime').val('select');
                        $('#numSeats').val(1);
                        //alert('successfully posted your trip')
                        alert(response);
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        alert(response['responseText']);
                    }
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
        $.get('/api/trips',function(data,status){
            $('#trips tr:not(.header)').remove();
            tripList=data;
            $.each(data,function(index,trip){
                //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
                //Departure, Return, Seats, Driver, Reserve
                var dep=trip['dDate']+(trip['dTime']=='select'?'':', '+trip['dTime']);
                var ret=trip['rDate']+(trip['rTime']=='select'?'':', '+trip['rTime']);
                var seats='passengers' in trip?trip['passengers'].length:'0'+'/'+trip['numSeats'];
                var driver=trip['driver'];
                var disabled=('passengers' in trip?trip['passengers'].length:0)==trip['numSeats']?'disabled':'';
                $('#trips tr:last').after('<tr class="trip"><td data-depart-date="'+trip['dDate']+'">'+dep+'</td><td data-return-date="'+trip['rDate']+'">'+ret+'</td><td>'+seats+'</td><td>'+driver+'</td><td><input type="button" value="Reserve" class="reserveTrip" data-trip-id="'+index+'" '+disabled+'></td></tr>');
                //$('#trips').append('<tr>...</tr><tr>...</tr><tr>'+seats+'</tr><tr>'+driver+'</tr><tr>...</tr>');
            });
            $('.trip td').removeClass('match');
            var trips=$('.trip td[data-depart-date]')
            $.each(trips,function(index,trip){
                if($(this).attr('data-depart-date')==$('#departDate').val())
                    $(this).addClass('match')
            });
            var trips=$('.trip td[data-return-date]')
            $.each(trips,function(index,trip){
                if($(this).attr('data-return-date')==$('#returnDate').val())
                    $(this).addClass('match')
            });
            //console.log(JSON.stringify(data));
        });
    });
    $('.reserveTrip').on('click',function(){
        $.ajax({
            url:'/api/trips/'+tripList[$(this).attr('data-trip-id')]['_id']+'/'+profile.getId(),
            type:'post',
            //data:$.param(data),
            statusCode: {
                200: function(response){
                    /*$('#dDate').val('');
                    $('#dTime').val('select');
                    $('#rDate').val('');
                    $('#rTime').val('select');
                    $('#numSeats').val(1);*/
                    //alert('successfully posted your trip')
                    alert(response);
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    alert(response['responseText']);
                }
            }
        });
    })

    var hours=["12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30"];
    $('#departDate').datepicker({minDate:0,onSelect:function(date){
        var selDate=new Date(date);
        //var stDate=new Date(selDate.getTime()-86400000);
        $('#returnDate').datepicker('option','minDate',selDate)
        $('#rDate').datepicker('option','minDate',selDate)
        $('#rDate').val('');
        $('#dDate').val(date);
        //update table if visible
        $('.trip td[data-depart-date]').removeClass('match');
        var trips=$('.trip td[data-depart-date]')
        $.each(trips,function(index,trip){
            if($(this).attr('data-depart-date')==$('#departDate').val())
                $(this).addClass('match')
        });
    }}).datepicker('setDate',new Date());
    $('#returnDate').datepicker({minDate:0,onSelect:function(date){
        $('#rDate').val(date);
        //update table if visible
        $('.trip td[data-return-date]').removeClass('match');
        var trips=$('.trip td[data-return-date]')
        $.each(trips,function(index,trip){
            if($(this).attr('data-return-date')==$('#returnDate').val())
                $(this).addClass('match')
        });
    }}).datepicker('setDate',new Date());
    $('#dDate').datepicker({minDate:0,onSelect:function(date){
        var selDate=new Date(date);
        //var stDate=new Date(selDate.getTime()-86400000);
        $('#rDate').datepicker('option','minDate',selDate)
    }}).datepicker('setDate',new Date());
    $('#rDate').datepicker({minDate:0}).datepicker('setDate',new Date());
    for(var i=0;i<2;i++){
        var t=i==0?' am':' pm';
        $.each(hours,function(index,value){
            $('#rTime').append($('<option></option>').attr('value',value+t).text(value+t));//hours.length*i+index
            $('#dTime').append($('<option></option>').attr('value',value+t).text(value+t));
        });
    }
});
function onSignIn(googleUser) {
    profile=googleUser.getBasicProfile();
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
