var profile;
var tripList;
var driverList;

var mdStakes=["Annapolis","Baltimore","Columbia","Frederick","Seneca","Silver Spring","Suitland","Washington, DC"];
var paStakes=["Altoona","Chambersburg","Pitsburgh"];
var vaStakes=["Annandale","Ashburn","Buena Vista(YSA)","Centreville","Chesapeake","Fredricksburg","Gainesville","McLean","Mt Vernon","Newport News","Oakton","Pembroke","Richmond-Chesterfield","Richmond-Midlothian","Richmond","Roanoke","Stafford","Virginia Beach","Washington DC(YSA)","Winchester","Waynesboro","Woodbridge"];
var wvStakes=["Clarksburg","Martinsburg"];

var temples=['Philadelphia','Columbus']

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
                                'notes':['<strong>Family baptistry priority times on</strong> Fridays 6:00 pm-7:30 pm and Saturdays 12:00 pm-1:30 pm',
                                         '<strong>Reservations: </strong>All living ordinances and baptistry appointments must be scheduled in advance. Reservations are strongly envouraged for all proxy endowments. Endowment reservations will be released to those without reservations 15 minutes prior to the session\'s start time',
                                         '<strong>Temple Clothing: </strong>If needed, temple clothing may be rented at the temple. There is no Distribution Services Center at the Philadelphia Temple. Please visit <a href="store.lds.org">store.lds.org</a> online for your clothing needs.',
                                         '<strong>Dining: </strong>There are no patron dining or vending services at the Philadelphia Temple, but there are many nearby restaurants. Food is not permitted on temple grounds, including the Arrival Center.',
                                         '<strong>Parking: </strong>Garage parking is available. Enter on 18th Street. Ticket should be validated at recommend desk.',
                                         '<strong>Family Names: </strong>You are encouraged to use <a href="familysearch.org">FamilySearch.org</a> to share your family names with the temple, especially if you have a large number of names.',
                                         '<strong>Arrival Center: </strong>The Arrival Center next to the temple is available for non-patron guests waiting for friends and family.',
                                         '<strong>Children: </strong>The Youth Center inside the temple is for children waiting to be sealed to parents or to observe the sealing of siblings to parents.',
                                         '<strong>Electronic Devices: </strong>If you choose to bring an electronic device (such as a camera, phone or tablet) into the temple, it must be turned off and stored inside a locker.',
                                         '<strong>Recommends: </strong>A Temple Recommend from your bishop and stake president is required to enter the temple. A Recommend for Living Ordinances is also needed by members being endowed or sealed to a spouse. Youth must be at least 12 years old to perform temple baptisms and must have a Limited-Use Recommend from their bishop. Males must hold the priesthood.',
                                         '<strong>Languages: </strong>English is available for all endowment sessions. Many languages, including American Sign Language, are availabe upon request:<br />Spanish Endowment Sessions<ul><li>1st and 3rd Saturday of the month: 7:00 am</li><li>2nd and 4th Saturday of the month: 2:30 pm</li></ul>'],
                                'website':'https://www.lds.org/temples/details/philadelphia-pennsylvania-temple?lang=eng'
                                },
                'Columbus':{2018:{'Endowment':{'Tuesday':['11:00 am','1:00 pm','6:00 pm','7:30 pm'],
                                                   'Wednesday':['9:00 am','11:00 am','1:00 pm','6:00 pm','7:30 pm'], 
                                                   'Thursday':['11:00 am','1:00 pm','6:00 pm','7:30 pm'],
                                                   'Friday':['11:00 am','1:00 pm','6:00 pm','7:30 pm'],
                                                   'Saturday':['9:00 am','11:00 am','1:00 pm', '3:00 pm', '5:00 pm']},
                                      'Baptistry':{'Tuesday':['10:00 - 11:00 am','6:30 - 7:30 pm'],
                                                   'Wednesday':['10:00 - 11:00 am','6:30 - 7:30 pm'], 
                                                   'Thursday':['10:00 - 11:00 am','6:30 - 7:30 pm'],
                                                   'Friday':['10:00 - 11:00 am','6:30 - 7:30 pm'],
                                                   'Saturday':['7:30 - 8:30 am','9:30 - 10:30 am','11:30 am - 12:30 pm','1:30 - 2:30 pm','3:30 - 4:30 pm']},
                                      'Closings':['March 20-March 31(Maintenance Closure)','July 4(Independence Day)','September 25-October 6(Maintenance Closure)','November 21-22(Thanksgiving)','December 25-26(Christmas)']
                                     },
                                'phone':'(614)-351-5001',
                                'address':['3870 Gateway Blvd<br />Columbus, OH 43228-9747','https://www.google.com/maps/place/Columbus+Ohio+Temple/@39.9937324,-83.1150495,17z/data=!4m13!1m7!3m6!1s0x883891a5a2f32d5f:0xa1b2442d0db9c04d!2s3870+Gateway+Blvd,+Columbus,+OH+43228!3b1!8m2!3d39.9937283!4d-83.1128608!3m4!1s0x883891a50c45f185:0x3f1ae281f17229b0!8m2!3d39.9940836!4d-83.1132708','<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.65867843366!2d-83.11504948437536!3d39.99373238917973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883891a50c45f185%3A0x3f1ae281f17229b0!2sColumbus+Ohio+Temple!5e0!3m2!1sen!2sus!4v1518479032638" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'],
                                'notes':['<strong>Family baptistry priority times on</strong> Monday through Friday at 10:00 - 11:00 am, Friday 6:30 - 7:30 pm, and Saturdays 11:30 am - 12:30 pm',
                                         '<strong>Living Ordinances: </strong>To schedule an appointment for living ordinances (such as your own endowment, marriage, or sealing), please call the temple.',
                                         '<strong>Temple Clothing: </strong>No temple clothing may be rented at the temple. There is no Distribution Services Center at the Philadelphia Temple. Please visit <a href="store.lds.org">store.lds.org</a> online for your clothing needs.',
                                         '<strong>Dining: </strong>There are no patron dining or vending services at the Columbus Temple. Food is not permitted on temple grounds.',
                                         '<strong>Family Names: </strong>You are encouraged to use <a href="familysearch.org">FamilySearch.org</a> to share your family names with the temple, especially if you have a large number of names.',
                                         '<strong>Electronic Devices: </strong>If you choose to bring an electronic device (such as a camera, phone or tablet) into the temple, it must be turned off and stored inside a locker.',
                                         '<strong>Recommends: </strong>A Temple Recommend from your bishop and stake president is required to enter the temple. A Recommend for Living Ordinances is also needed by members being endowed or sealed to a spouse. Youth must be at least 12 years old to perform temple baptisms and must have a Limited-Use Recommend from their bishop. Males must hold the priesthood.'],
                                'website':'https://www.lds.org/temples/details/columbus-ohio-temple?lang=eng'
                                }
                };

function getTrips(){
    $.get('/api/trips',function(data,status){
        $('#trips tr:not(.header)').remove();
        tripList=data;
        $.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure, Return, Seats, Driver, Reserve
            var stk='templeDest' in trip?trip['templeDest']:'';
            var tmpl='departStake' in trip?trip['departStake']:'';
            var dep=trip['dDate']+(trip['dTime']=='select'?'':', '+trip['dTime']);
            var ret=trip['rDate']+(trip['rTime']=='select'?'':', '+trip['rTime']);
            var seats='passengers' in trip?trip['passengers'].length:'0'+'/'+trip['numSeats'];
            var driver=trip['driver'];
            var disabled=('passengers' in trip?trip['passengers'].length:0)==trip['numSeats']?'disabled':'';

            $('#trips tr:last').after('<tr class="trip"><td>'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip['dDate']+'">'+dep+'</td><td data-return-date="'+trip['rDate']+'">'+ret+'</td><td>'+seats+'</td><td title="'+trip['email']+'" class="driver"><a href="mailto:'+trip['email']+'?Temple%20Trip" target="_top">'+driver+'</a></td><td><input type="button" value="Reserve" class="reserveTrip" data-trip-id="'+index+'" '+disabled+'></td></tr>');
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

    
    $('#temple').empty();
    $('#templeDest').empty();
    $.each(temples,function(index,temple){
        if(temple in templeInfo){
            if(temple=='Philadelphia'){
                $('#temple').append('<option value="'+temple+'" selected>'+temple+'</option>');
                $('#templeDest').append('<option value="'+temple+'" selected>'+temple+'</option>');
            }else{
                $('#temple').append('<option value="'+temple+'">'+temple+'</option>');
                $('#templeDest').append('<option value="'+temple+'">'+temple+'</option>');
            }
        }
    });
    $('#temple').on('change',function(){
        $('#templeDest').val($(this).val());
        fillTempleInfo();

        $('.trip td[data-temple-dest]').removeClass('match');
        var tmpls=$('.trip td[data-temple-dest]')
        $.each(tmpls,function(index,temple){
            if($(this).attr('data-temple-dest')==$('#temple').val())
                $(this).addClass('match')
        });
    });

    $('#departStake').append('<optgroup label="Maryland Stakes">')
    $.each(mdStakes,function(index,stake){
        if(stake=='Seneca')
            $('#departStake').append('<option value="'+stake+'" selected>'+stake+'</option>')
        else
            $('#departStake').append('<option value="'+stake+'">'+stake+'</option>')
    })
    $('#departStake').append('</optgroup>')
    $('#departStake').append('<optgroup label="Pennsylvania Stakes">')
    $.each(paStakes,function(index,stake){
        $('#departStake').append('<option value="'+stake+'">'+stake+'</option>')
    })
    $('#departStake').append('</optgroup>')
    $('#departStake').append('<optgroup label="Virginia Stakes">')
    $.each(vaStakes,function(index,stake){
        $('#departStake').append('<option value="'+stake+'">'+stake+'</option>')
    })
    $('#departStake').append('</optgroup>')
    $('#departStake').append('<optgroup label="West Virginia Stakes">')
    $.each(wvStakes,function(index,stake){
        $('#departStake').append('<option value="'+stake+'">'+stake+'</option>')
    })
    $('#departStake').append('</optgroup>')
    
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
    $('#er').on('click',function(){
        fillEditInfo();
    })
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
    var data=[];
    data.push({name:"userId", value:profile.getId()});
    data.push({name:"name", value:profile.getName()});
    data.push({name:"email", value:profile.getEmail()});
    console.log('sending:'+JSON.stringify(data))
    $.ajax({
        url:'/api/users/add',
        type:'post',
        data:$.param(data),
        statusCode: {
            200: function(response){
                console.log(response);
            },
            500: function(response){
                //response={'readyState','responseText','status','statusText'}
                alert(response['responseText']);
            }
        }
    });
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
    $('#templeClosings').empty();
    $.each(templeInfo[temple][currentYear]['Closings'],function(index,closing){
        $('#templeClosings').append('<li>'+closing+'</li>')
    })
    $('#templeNotes').empty()
    $.each(templeInfo[temple]['notes'],function(index,note){
        $('#templeNotes').append('<p>'+note+'</p>')
    });
}
function fillEditInfo(){
    $.get('/api/users/driver/'+profile.getId(),function(data,status){
        $('#editingDrivingRides tr:not(.header)').remove();
        driverList=data;
        console.log(data);
        /*$.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure,Return,Seats,Edit
            var stk=trip['departStake'];
            var tmpl=trip['templeDest'];
            var dep=trip['dDate']+(trip['dTime']=='select'?'':', '+trip['dTime']);
            var ret=trip['rDate']+(trip['rTime']=='select'?'':', '+trip['rTime']);
            var seats='passengers' in trip?trip['passengers'].length:'0'+'/'+trip['numSeats'];
            var driver=trip['driver'];
            $('#trips tr:last').after('<tr class="trip"><td>'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip['dDate']+'">'+dep+'</td><td data-return-date="'+trip['rDate']+'">'+ret+'</td><td>'+seats+'</td><td><input type="button" value="Edit" class="editTrip" data-trip-id="'+index+'"></td></tr>');
        });*/
        //console.log(JSON.stringify(data));
    });
}