var profile;
var tripList;
var mdStakes=["Annapolis","Seneca","Baltimore","Columbia","Suitland","Washington, DC","Frederick","Silver Spring"];
var paStakes=["Altoona","Pitsburgh","Chambersburg"];
var vaStakes=["Annandale","Ashburn","Buena Vista(YSA)","Centreville","Chesapeake","Fredricksburg","Gainesville","McLean","Mt Vernon","Washington DC(YSA)","Winchester","Newport News","Oakton","Pembroke","Richmond-Chesterfield","Richmond-Midlothian","Richmond","Roanoke","Stafford","Virginia Beach","Waynesboro","Woodbridge"];
var wvStakes=["Clarksburg","Martinsburg"];

var temples=['Philadelphia']

var templeInfo={'Philadelphia':{2018:{'Endowment':{'Tuesday':['6:30 pm','8:00 pm'],
                                                   'Wednesday':['10:00 am','11:30 am','6:30 pm','8:00 pm'], 
                                                   'Thursday':['6:30 pm','8:00 pm'],
                                                   'Friday':['10:00 am','11:30 am','6:30 pm','8:00 pm'],
                                                   'Saturday':['7:00 am','8:30 am','10:00 am', '11:30 am', '1:00 pm','2:30 pm']},
                                      'Baptistry':{'Tuesday':['6:00 - 9:30 pm'],
                                                   'Wednesday':['10:30 am - 1:30 pm','6:00 - 9:30 pm'], 
                                                   'Thursday':['6:00 - 9:30 pm'],
                                                   'Friday':['10:30 am - 1:30 pm','6:00 - 9:30 pm'],
                                                   'Saturday':['7:30 am - 4:30 pm']},
                                      'Closings':['March 19-April 2(Maintenance Closure)','July 4(Independence Day)','September 17-October 1(Maintenance Closure)','October 6(General Conference)','November 21-22(Thanksgiving)','December 25(Christmas Day)']
                                     },
                                'phone':'(215)-398-3040',
                                'address':['1739 Vine Street<br />Philadelphia, PA 19103','https://www.google.com/maps/place/1739+Vine+St,+Philadelphia,+PA+19103/@39.9590674,-75.1704057,17z/data=!3m1!4b1!4m5!3m4!1s0x89c6c632c60581e1:0x63c8ff5ad48bf115!8m2!3d39.9590674!4d-75.168217?q=1739+Vine+Street,+Philadelphia,+PA+19103&um=1&ie=UTF-8&sa=X&ved=0ahUKEwij5djRs6HZAhWENd8KHXTfDrUQ_AUICigB','<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.209550692896!2d-75.17040568461795!3d39.959067379420915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c632c60581e1%3A0x63c8ff5ad48bf115!2s1739+Vine+St%2C+Philadelphia%2C+PA+19103!5e0!3m2!1sen!2sus!4v1518473790164" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'],
                                'notes':['Family baptistry priority times on Fridays 6:00 pm-7:30 pm and Saturdays 12:00 pm-1:30 pm','All living ordinances and baptistry appointments must be scheduled in advance. Reservations are strongly envouraged for all proxy endowments. Endowment reservations will be released to those without reservations 15 minutes prior to the session\'s start time']
                                }
                                
                };

function getTrips(){
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
            $('#trips tr:last').after('<tr class="trip"><td data-depart-date="'+trip['dDate']+'">'+dep+'</td><td data-return-date="'+trip['rDate']+'">'+ret+'</td><td>'+seats+'</td><td title="'+trip['email']+'" class="driver">'+driver+'<input type="text" hidden value="'+trip['email']+'" /></td><td><input type="button" value="Reserve" class="reserveTrip" data-trip-id="'+index+'" '+disabled+'></td></tr>');
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
}

$(function(){
    console.log('ready');

    if(!$('#welcomeMsg').is(":visible")){
        getTrips();
    }

    
    $('#temple').html();
    $.each(temples,function(index,temple){
        if(temple in templeInfo)
            $('#temple').append('<option value="'+temple+'">'+temple+'</option>')
    });
    //see https://jqueryvalidation.org for info
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
        $('#trips tr:not(.header)').remove();
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
        getTrips();
    });
    $('#ti').on('click',function(){
        fillTempleInfo();
    });
    $('#trips').on('click','.reserveTrip',function(){
    //$('.reserveTrip').on('click',function(){
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
                    getTrips();
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    alert(response['responseText']);
                }
            }
        });
    })
    $('#trips').on('click','.driver',function(){
        $(this)
        document.execCommand('copy');
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
    //TODO add user to user collection
    $('.g-signin2').hide();
    $('#welcomeMsg').hide();
    $('#content').show();
    $('.g-signout2').show();
    getTrips();
    $('#fa').click();
}
function openTab(evt,choice){
    $('.tabContent').hide();
    $('.tablinks').removeClass('active');
    $('#'+choice).show()
    evt.currentTarget.className+=" active";
}
function fillTempleInfo(){
    var temple=$('#temple').val();
    $('#templeName').html(temple);
    var currentYear = (new Date).getFullYear();
    $('#templeAddress').html('<a href="'+templeInfo[temple]['address'][1]+'">'+templeInfo[temple]['address'][0]+'</a>');
    $('#templeMap').html(templeInfo[temple]['address'][2]);
    $('#templePhone').html(templeInfo[temple]['phone']);
    var days=['Tuesday','Wednesday','Thursday','Friday','Saturday'];
    $.each(days,function(index,day){
        $('#Endowment-'+day).html(templeInfo[temple][currentYear]['Endowment'][day].toString())
    })
    $.each(days,function(index,day){
        $('#Baptistry-'+day).html(templeInfo[temple][currentYear]['Baptistry'][day].toString())
    })
    $('#templeClosings').html();
    $.each(templeInfo[temple][currentYear]['Closings'],function(index,closing){
        $('#templeClosings').append('<li>'+closing+'</li>')
    })
    $('#templeNotes').html()
    $.each(templeInfo[temple]['notes'],function(index,note){
        $('#templeClosings').append('<p>'+note+'</p>')
    });
}