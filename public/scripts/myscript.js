var profile;
var userDetails={};
var tripList;

var editTripIndex;
var driverList;
var passengerList;
var tripPassengerList;

var driverDialog,passengerDialog,driverForm,passengerForm;

var dateRegex=/^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/20(1[8-9]|[2-9]\d)$/gm;

var mdStakes=["Annapolis","Baltimore","Columbia","Frederick","Seneca","Silver Spring","Suitland","Washington, DC"];
var paStakes=["Altoona","Chambersburg","Pitsburgh"];
var vaStakes=["Annandale","Ashburn","Buena Vista(YSA)","Centreville","Chesapeake","Fredricksburg","Gainesville","McLean","Mt Vernon","Newport News","Oakton","Pembroke","Richmond-Chesterfield","Richmond-Midlothian","Richmond","Roanoke","Stafford","Virginia Beach","Washington DC(YSA)","Winchester","Waynesboro","Woodbridge"];
var wvStakes=["Clarksburg","Martinsburg"];

var temples=['Philadelphia','Columbus']

var hours=["12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30"];

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
                                         '<strong>Reservations: </strong>All living ordinances and baptistry appointments must be scheduled in advance. Reservations are strongly encouraged for all proxy endowments. Endowment reservations will be released to those without reservations 15 minutes prior to the session\'s start time',
                                         '<strong>Temple Clothing: </strong>If needed, temple clothing may be rented at the temple. There is no Distribution Services Center at the Philadelphia Temple. Please visit <a href="store.lds.org">store.lds.org</a> online for your clothing needs.',
                                         '<strong>Dining: </strong>There are no patron dining or vending services at the Philadelphia Temple, but there are many nearby restaurants. Food is not permitted on temple grounds, including the Arrival Center.',
                                         '<strong>Parking: </strong>Garage parking is available. Enter on 18th Street. Ticket should be validated at recommend desk.',
                                         '<strong>Family Names: </strong>You are encouraged to use <a href="familysearch.org">FamilySearch.org</a> to share your family names with the temple, especially if you have a large number of names.',
                                         '<strong>Arrival Center: </strong>The Arrival Center next to the temple is available for non-patron guests waiting for friends and family.',
                                         '<strong>Children: </strong>The Youth Center inside the temple is for children waiting to be sealed to parents or to observe the sealing of siblings to parents.',
                                         '<strong>Electronic Devices: </strong>If you choose to bring an electronic device (such as a camera, phone or tablet) into the temple, it must be turned off and stored inside a locker.',
                                         '<strong>Recommends: </strong>A Temple Recommend from your bishop and stake president is required to enter the temple. A Recommend for Living Ordinances is also needed by members being endowed or sealed to a spouse. Youth must be at least 12 years old to perform temple baptisms and must have a Limited-Use Recommend from their bishop. Males must hold the priesthood.',
                                         '<strong>Languages: </strong>English is available for all endowment sessions. Many languages, including American Sign Language, are availabe upon request:<br />Spanish Endowment Sessions<ul><li>1st and 3rd Saturday of the month: 7:00 am</li><li>2nd and 4th Saturday of the month: 2:30 pm</li></ul>'],
                                'website':'https://www.lds.org/temples/details/philadelphia-pennsylvania-temple?lang=eng',
                                'photo':'https://mobile-cdn.lds.org/59/16/5916071b741c877495e34b70b5c6443a1a732cc6/philadelphia_pennsylvania_temple_exterior.jpg'
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
                                'website':'https://www.lds.org/temples/details/columbus-ohio-temple?lang=eng',
                                'photo':'https://mobile-cdn.lds.org/bc/15/bc15b87bf1cf4aba1268814df4ef0cebc4177049/temple_exterior_columbus_ohio.jpg'
                                }
                };

function matchDepartDate(){
    $('.trip td[data-depart-date]').removeClass('match');
    var trips=$('.trip td[data-depart-date]')
    a=new Date($('#departDate').val())
    $.each(trips,function(index,trip){
        b=new Date($(this).attr('data-depart-date'))
        if(a.getTime()==b.getTime())
            $(this).addClass('match')
    });
}
function matchReturnDate(){
    $('.trip td[data-return-date]').removeClass('match');
    var trips=$('.trip td[data-return-date]')
    a=new Date($('#returnDate').val())
    $.each(trips,function(index,trip){
        b=new Date($(this).attr('data-depart-date'))
        if(a.getTime()==b.getTime())
            $(this).addClass('match')
    });
}
function matchTemple(){
    $('.trip td[data-temple-dest]').removeClass('match');
    var tmpls=$('.trip td[data-temple-dest]')
    $.each(tmpls,function(index,temple){
        if($(this).attr('data-temple-dest')==$('#temple').val())
            $(this).addClass('match')
    });
}

function matchStake(){
    $('.trip td[data-stake]').removeClass('match');
    var stakes=$('.trip td[data-stake]')
    $.each(stakes,function(index,temple){
        if($(this).attr('data-stake')==$('#stake').val())
            $(this).addClass('match')
    });
}

function getTrips(){
    $.get('/api/trips',function(data,status){
        $('#trips tr:not(.header)').remove();
        tripList=data;
        $.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure, Return, Seats, Driver, Reserve
            var stk='templeDest' in trip?trip['departStake']:'';
            var tmpl='departStake' in trip?trip['templeDest']:'';
            var dep=trip['dDate']+(trip['dTime']=='select'?'':', '+trip['dTime']);
            var ret=trip['rDate']+(trip['rTime']=='select'?'':', '+trip['rTime']);
            var seats=('passengers' in trip?trip['passengers'].length:'0')+'/'+trip['numSeats'];
            var driver=trip['driver'];
            var disabled=('passengers' in trip?trip['passengers'].length:0)==trip['numSeats']?'disabled':'';
            if(userDetails['email']==trip['email']){
                disabled='disabled';
            }
            var ob='mailto:'+trip['email']
            $('#trips tr:last').after('<tr class="trip"><td data-stake="'+stk+'">'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip['dDate']+'">'+dep+'</td><td data-return-date="'+trip['rDate']+'">'+ret+'</td><td>'+seats+'</td><td class="driver"><a href="'+ob+'" target="_top">'+driver+'</a></td><td><input type="button" value="Reserve" class="reserveTrip" data-trip-id="'+index+'" '+disabled+'></td></tr>');
            //$('#trips tr:last .driver a').attr('href',ob)
        });
        matchDepartDate();
        matchReturnDate();
        matchTemple();
        matchStake();
        //console.log(JSON.stringify(data));
    });
}

//from https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("trips");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                  //if so, mark as a switch and break the loop:
                  shouldSwitch= true;
                  break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;      
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

$(function(){
    console.log('ready');

    if(!$('#welcomeMsg').is(":visible")){
        getTrips();
    }

    //Fill temple selects
    $('#temple').empty();
    $('#templeDest').empty();
    fillTempleSelect('#temple');
    fillTempleSelect('#templeDest');
    fillTempleSelect('#driverTemple');
    $('#temple').val('Philadelphia');
    $('#templeDest').val('Philadelphia');

    //Fill stake selects
    $('#stake').empty();
    $('#departStake').empty();
    fillStakeSelect('#stake');
    fillStakeSelect('#departStake');
    fillStakeSelect('#driverStake');
    $('#stake').val('Seneca');
    $('#departStake').val('Seneca');

    //sort trips table
    $('#trips th').on('click',function(){
        sortTable($(this).index());
    });
    
    //temple select change
    $('#temple').on('change',function(){
        $('#templeDest').val($(this).val());
        fillTempleInfo();

        matchTemple();
    });
    
    //stake on change
    $('#stake').on('change',function(){
        $('#departStake').val($(this).val());

        matchStake();
    });
    
    //extra post trip form rules
    var validator = $('#postRideForm').validate({
        rules: {
            dDate: {
                required: true,
                date: true
            },
            rDate: {
                required: true,
                date: true
            }
        }
    });
    //post a ride
    $('#postRideForm').submit(function(e){
        e.preventDefault();
        if(validator.valid()){
            var data=$('#postRideForm').serializeArray();//form to array
            //disabled inputs are not serialized so add now
            data.push({name:'email',value:userDetails['email']});
            if(data.length==10){
                data.push({name:'splitCost',value:'off'});
            }
            console.log('sending:'+JSON.stringify(data))
            $.ajax({
                url:'/api/trips/add',
                type:'post',
                data:$.param(data),
                statusCode: {
                    200: function(response){
                        if(response=='Your ride has been posted'){
                            //clear form
                            $('#dDate').val('');
                            $('#dTime').val('select');
                            $('#rDate').val('');
                            $('#rTime').val('select');
                            $('#numSeats').val(1);
                            alert(response);
                        }else if(response.indexOf('You already have scheduled')>=0){
                            alert(response);
                        }
                        console.log(response);
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        alert(response['responseText']);
                    }
                }
            });
        }
    });

    //Sign out user
    $('.g-signout2').on('click',function(e){
        $('#trips tr:not(.header)').remove();
        userDetails={};
        var auth2=gapi.auth2.getAuthInstance();
        auth2.signOut().then(function(){
            $('.g-signout2').hide();
            //hide content
            $('#content').hide();
            //clear table
            $('#trips tr:not(.header)').remove();
            //show message and signin
            $('#welcomeMsg').show();
            $('.g-signin2').show();
            validator.resetForm();
        });
    });
    
    //find trips tab
    $('#fa').on('click',function(){
        getTrips();
    });
    
    //temple info tab
    $('#ti').on('click',function(){
        fillTempleInfo();
    });
    
    //edit ride tab
    $('#er').on('click',function(){
        fillEditInfo();
    })
    
    //edit driver dialog
    driverDialog=$('#editDriverForm').dialog({
        autoOpen:false,
        height:400,
        width:600,
        modal:true,
        buttons: {
            "Delete Trip": deleteTrip,
            "Save Changes": editDriverTrip,
            Cancel: function() {
                driverDialog.dialog( "close" );
            }
        },
        close:function(){
            driverForm[0].reset();
            //allFields.removeClass('ui-state-error');
        }
    });
    //submit trip change
    driverForm=driverDialog.find('form').on('submit',function(event){
        event.preventDefault();
        editDriverTrip();
    });

    //edit trip details
    $('#editingDrivingRides').on('click','.editTrip',function(){
        console.log('editing:'+JSON.stringify(driverList[$(this).attr('data-trip-id')]));
        editTripIndex=$(this).attr('data-trip-id');
        fillDriverDialog();
        $('#editDriverForm').attr('data-trip-id',$(this).attr('data-trip-id'))
        driverDialog.dialog( "open" );
    });
    //kick a passenger on your trip
    $('#driverPassengers').on('click','.kickFromTrip',function(){
        editTripIndex=$(this).attr('data-trip-id');
        var choice=confirm('Are you sure you want to kick this passenger from your trip? You will not have the ability to add them later.')
        if(choice){
            $.ajax({
                url:'/api/trips/'+driverList[tripIndex]['_id']+'/'+tripPassengerList[$(this).attr('data-trip-passenger-id')]['email'],
                type:'DELETE',
                statusCode: {
                    200: function(response){
                        //remove passenger from local list
                        tripPassengerList.splice([$(this).attr('data-trip-passenger-id')],1)
                        fillDriverDialog();
                        //update table in background
                        updateTripsDrivingTable();
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        console.log('response'+response['responseText']);
                        alert(response['responseText']);
                    }
                }
            });
        }
    })
    //drop a seat
    $('#editingPassengerRides').on('click','.dropTrip',function(){
        var choice=confirm('Are you sure you want to leave this trip?')
        if(choice){
            $.ajax({
                url:'/api/trips/'+passengerList[$(this).attr('data-trip-id')]['_id']+'/'+userDetails['email'],
                type:'DELETE',
                statusCode: {
                    200: function(response){
                        updateTripsPassengerTable();
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        console.log('response'+response['responseText']);
                        alert(response['responseText']);
                    }
                }
            });
        }
    });
    //reserve a seat
    $('#trips').on('click','.reserveTrip',function(){
        console.log('should reserve');
        var choice=true;
        if(tripList[$(this).attr('data-trip-id')]['comments']){
            choice=confirm(tripList[$(this).attr('data-trip-id')]['comments'])
        }
        if(choice){
            var data=[];
            data.push({name:'email',value:userDetails['email']});
            data.push({name:'name',value:userDetails['name']});
            $.ajax({
                url:'/api/trips/'+tripList[$(this).attr('data-trip-id')]['_id'],
                type:'post',
                data:$.param(data),
                statusCode: {
                    200: function(response){
                        alert(response);
                        getTrips();
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        console.log('response'+response['responseText']);
                        alert(response['responseText']);
                    }
                }
            });
        }
    })
    //initialize datepickers
    //edit trip datepickers
    $('#driverDepart').datepicker({minDate:0,onSelect:function(date){
        var selDate=new Date(date);
        $('#driverReturn').datepicker('option','minDate',selDate)
    }}).datepicker('setDate',new Date());
    $('#driverReturn').datepicker({minDate:0});
    //main datepickers
    $('#departDate').datepicker({minDate:0,onSelect:function(date){
        var selDate=new Date(date);
        $('#returnDate').datepicker('option','minDate',selDate)
        $('#rDate').datepicker('option','minDate',selDate)
        $('#rDate').val('');
        $('#dDate').val(date);
        matchDepartDate();
        matchReturnDate();
    }}).datepicker('setDate',new Date());
    $('#returnDate').datepicker({minDate:0,onSelect:function(date){
        $('#rDate').val(date);
        matchReturnDate();
    }}).datepicker('setDate',new Date());
    //post ride datepickers
    $('#dDate').datepicker({minDate:0,onSelect:function(date){
        var selDate=new Date(date);
        $('#rDate').datepicker('option','minDate',selDate)
    }}).datepicker('setDate',new Date());
    $('#rDate').datepicker({minDate:0}).datepicker('setDate',new Date());
    //manual change datepickers
    $('#departDate').on('keyup',function(){
        if(dateRegex.test($(this).val())){
            matchDepartDate();
        }
    })
    $('#returnDate').on('keyup',function(){
        if(dateRegex.test($(this).val())){
            matchReturnDate();
        }
    })
    //fill time selects
    for(var i=0;i<2;i++){
        var t=i==0?' am':' pm';
        $.each(hours,function(index,value){
            $('#rTime').append($('<option></option>').attr('value',value+t).text(value+t));//hours.length*i+index
            $('#dTime').append($('<option></option>').attr('value',value+t).text(value+t));
            $('#driverDTime').append($('<option></option>').attr('value',value+t).text(value+t));//hours.length*i+index
            $('#driverRTime').append($('<option></option>').attr('value',value+t).text(value+t));
        });
    }
});
function onSignIn(googleUser) {
    profile=googleUser.getBasicProfile();
    userDetails={'name':profile.getName(),'email':profile.getEmail()}
    //console.log("ID: "+profile.getId());
    //console.log("Full Name: "+profile.getName());
    $('#driver').val(profile.getName());
    //console.log("Email: "+profile.getEmail());
    $('#email').val(profile.getEmail());
    //var id_token=googleUser.getAuthResponse().id_token;
    //console.log("ID Token: " + id_token);
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
    $('#templeName').html('<a href="'+templeInfo[temple]['website']+'">'+temple+'</a>');
    var currentYear = (new Date).getFullYear();
    $('#templeAddress').html('<a href="'+templeInfo[temple]['address'][1]+'">'+templeInfo[temple]['address'][0]+'</a>');
    $('#templeImage').attr('src',templeInfo[temple]['photo'])
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
    updateTripsDrivingTable();
    updateTripsPassengerTable();
}
function updateTripsDrivingTable(){
    $.get('/api/users/driver/'+userDetails['email'],function(data,status){
        $('#editingDrivingRides tr:not(.header)').remove();
        driverList=data;
        $.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure,Return,Seats,Edit
            var stk=trip['departStake'];
            var tmpl=trip['templeDest'];
            var dep=trip['dDate']+(trip['dTime']=='select'?'':', '+trip['dTime']);
            var ret=trip['rDate']+(trip['rTime']=='select'?'':', '+trip['rTime']);
            var seats=('passengers' in trip?trip['passengers'].length:'0')+'/'+trip['numSeats'];
            $('#editingDrivingRides tr:last').after('<tr class="trip"><td>'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip['dDate']+'">'+dep+'</td><td data-return-date="'+trip['rDate']+'">'+ret+'</td><td>'+seats+'</td><td><input type="button" value="Edit" class="editTrip" data-trip-id="'+index+'"></td></tr>');
        });
        //console.log(JSON.stringify(data));
    });
}
function updateTripsPassengerTable(){
    $.get('/api/users/passenger/'+userDetails['email'],function(data,status){
        $('#editingPassengerRides tr:not(.header)').remove();
        passengerList=data;
        $.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure,Return,driver,Edit
            var stk=trip['departStake'];
            var tmpl=trip['templeDest'];
            var dep=trip['dDate']+(trip['dTime']=='select'?'':', '+trip['dTime']);
            var ret=trip['rDate']+(trip['rTime']=='select'?'':', '+trip['rTime']);
            var driver=trip['driver'];
            var split='No';
            if(trip['splitCost']=='on')
                split='Yes';
            var com='';
            if(trip['commments'])
                com=trip['comments'];
            $('#editingPassengerRides tr:last').after('<tr class="trip"><td>'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip['dDate']+'">'+dep+'</td><td data-return-date="'+trip['rDate']+'">'+ret+'</td><td>'+driver+'</td><td><td>'+split+'</td><td><td>'+com+'</td><td><input type="button" value="Drop" class="dropTrip" data-trip-id="'+index+'"></td></tr>');
        });
        //console.log(JSON.stringify(data));
    });
}
function fillStakeSelect(selectId){
    $(selectId).append('<optgroup label="Maryland Stakes">')
    $.each(mdStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>')
    })
    $(selectId).append('</optgroup>')
    $(selectId).append('<optgroup label="Pennsylvania Stakes">')
    $.each(paStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>')
    })
    $(selectId).append('</optgroup>')
    $(selectId).append('<optgroup label="Virginia Stakes">')
    $.each(vaStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>')
    })
    $(selectId).append('</optgroup>')
    $(selectId).append('<optgroup label="West Virginia Stakes">')
    $.each(wvStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>')
    })
    $(selectId).append('</optgroup>')
}
function fillTempleSelect(selectId){
    $.each(temples,function(index,temple){
        if(temple in templeInfo){
            $(selectId).append('<option value="'+temple+'">'+temple+'</option>');
        }
    });
}
function editDriverTrip(){
    //TODO validate
    var editValidator = $('#postRideForm').validate();
    if(editValidator.valid()){
        console.log('should update')
        var data=$('#editRideForm').serializeArray();//form to array
        //update data to match names as post form
        $.each(data,function(i,param){
            if(param['name']=='driverStake'){
                data[i]['name']='departStake';
            }else if(param['name']=='driverTemple'){
                data[i]['name']='templeDest';
            }else if(param['name']=='driverDepart'){
                data[i]['name']='dDate';
            }else if(param['name']=='driverDTime'){
                data[i]['name']='dTime';
            }else if(param['name']=='driverReturn'){
                data[i]['name']='rDate';
            }else if(param['name']=='driverRTime'){
                data[i]['name']='rTime';
            }else if(param['name']=='driverSeats'){
                data[i]['name']='numSeats';
            }else if(param['name']=='driverSplitCost'){
                data[i]['name']='splitCost';
            }else if(param['name']=='driverComments'){
                data[i]['name']='comments';
            }
        });
        console.log('updating for:'+JSON.stringify(driverList[editTripIndex]['_id']))
        console.log(data.length)
        if(data.length==8){
            data.push({name:'splitCost',value:'off'});
        }
        console.log('sending:'+JSON.stringify(data))
        $.ajax({
            url:'/api/trips/edit/'+driverList[editTripIndex]['_id'],
            type:'post',
            data:$.param(data),
            statusCode: {
                200: function(response){
                    /*$('#dDate').val('');
                    $('#dTime').val('select');
                    $('#rDate').val('');
                    $('#rTime').val('select');
                    $('#numSeats').val(1);*/
                    //alert('successfully update your trip')
                    alert(response);
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    alert(response['responseText']);
                }
            }
        });
    }
    //TODO put/update trip
    //editDriverTrip();
    //TODO update edit table
    //post/put to server
    updateTripsDrivingTable();
    driverDialog.dialog( "close" );
}
function deleteTrip(){
    console.log('deleting trip:'+$('#editDriverForm').attr('data-trip-id')+' which is '+JSON.stringify(driverList[$('#editDriverForm').attr('data-trip-id')]))
    var choice=confirm('Are you sure you want to Delete this trip?')
    if(choice){
        $.ajax({
            url:'/api/trips/'+driverList[$('#editDriverForm').attr('data-trip-id')]['_id'],
            type:'DELETE',
            statusCode: {
                200: function(response){
                    fillEditInfo();
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    console.log('response'+response['responseText']);
                    alert(response['responseText']);
                }
            }
        });
    }
    driverDialog.dialog( "close" );
}
function fillDriverDialog(){
    console.log('should fill with:'+JSON.stringify(driverList[editTripIndex]))
    $('#driverTemple').val(driverList[editTripIndex]['templeDest']);
    $('#driverStake').val(driverList[editTripIndex]['departStake']);
    $('#driverDTime').val(driverList[editTripIndex]['dTime']);
    $('#driverRTime').val(driverList[editTripIndex]['rTime']);
    $('#driverDepart').val(driverList[editTripIndex]['dDate']);
    $('#driverReturn').val(driverList[editTripIndex]['rDate']);
    $('#driverSeats').val(driverList[editTripIndex]['numSeats']);
    if(driverList[editTripIndex]['splitCost']=='on')
        $('#driverSplitCost').prop('checked',true);
    $('#driverComments').val(driverList[editTripIndex]['comments']);
    if('passengers' in driverList[editTripIndex]){
        tripPassengerList=driverList[editTripIndex]['passengers'];
        console.log('passengers: '+JSON.stringify(tripPassengerList));
        if(tripPassengerList.length>0){
            $('#driverPassengers').show();
            $('#driverPassengers tr:not(.header)').remove();
            $.each(tripPassengerList,function(i,info){
                //console.log('trip '+i.toString()+':'+JSON.stringify(info))
                //Name,Email,Remove
                var name=info['name'];
                var email=info['email'];
                $('#driverPassengers tr:last').after('<tr class="trip"><td>'+name+'</td><td>'+email+'</td><td><input type="button" value="Remove" class="kickFromTrip" data-trip-id="'+editTripIndex+'" data-trip-passenger-id="'+i+'"></td></tr>');
            });
        }else{
            $('#driverPassengers').hide();
        }
    }else{
        $('#driverPassengers').hide();
    }
}