var profile;
var userDetails={};
var tripList;

var language='en';

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

var temples=['Philadelphia','Columbus','Manhattan'];

var hours=["12:00","12:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30"];

var templeInfo={'Philadelphia':{2018:{'Endowment':{'Tuesday':['6:30 pm','8:00 pm'],
                                                   'Wednesday':['10:00 am','11:30 am','6:30 pm','8:00 pm'], 
                                                   'Thursday':['6:30 pm','8:00 pm'],
                                                   'Friday':['10:00 am','11:30 am','6:30 pm','8:00 pm'],
                                                   'Saturday':['7:00 am(Spanish 1st and 3rd Sat)','8:30 am','10:00 am', '11:30 am', '1:00 pm','2:30 pm(Spanish 2nd Sat)']},
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
                                },
                'Manhattan':{2018:{'Endowment':{'Tuesday':['11:00 am','12:30 pm','2:00 pm','6:15 pm','7:45 pm'],
                                                   'Wednesday':['11:00 am','12:30 pm','2:00 pm','6:15 pm','7:45 pm'], 
                                                   'Thursday':['6:30 am','8:00 am','11:00 am','12:30 pm','2:00 pm','6:15 pm','7:45 pm(Spanish 2nd and 4th Thur)'],
                                                   'Friday':['11:00 am','12:30 pm','2:00 pm','4:00 pm','5:30 pm','7:00 pm','8:30 pm'],
                                                   'Saturday':['6:30 am(Spanish)','8:00 am','9:30 am(Spanish)','11:00 am','12:30 pm(Spanish)','2:00 pm', '3:30 pm', '5:00 pm']},
                                      'Baptistry':{'Tuesday':['11:00 am - 12:00 pm','2:30 -3:30 pm','6:00 - 7:45 pm'],
                                                   'Wednesday':['11:00 am - 12:00 pm','2:30 -3:30 pm','6:00 - 7:45 pm'], 
                                                   'Thursday':['7:00 - 7:45 am','11:00 am - 12:00 pm','2:30 -3:30 pm','6:00 - 7:45 pm'],
                                                   'Friday':['11:00 am - 12:00 pm','2:30 -3:30 pm','4:00 - 5:00 pm','6:30 - 8:30 pm'],
                                                   'Saturday':['6:30 am - 12:30 pm','1:30 - 5:00 pm']},
                                      'Closings':['March 31','July 4(Independence Day)','July 23-August 6(Maintenance Closure)','October 6','November 21-22(Thanksgiving)']
                                     },
                                'phone':'(917)-441-8220',
                                'address':['125 Columbus Ave, Fourth Floor<br />New York, NY 10023-6514','https://www.google.com/maps/place/Manhattan+New+York+Temple/@40.7729896,-73.9902794,15z/data=!4m8!1m2!2m1!1smanhattan+temple!3m4!1s0x0:0x98e2f07a82e523fb!8m2!3d40.7729958!4d-73.9817351','<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12086.00565123261!2d-73.99027944277788!3d40.77298959794535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x98e2f07a82e523fb!2sManhattan+New+York+Temple!5e0!3m2!1sen!2sus!4v1519761863570" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'],
                                'notes':['<strong>Living Ordinances: </strong>To schedule an appointment for living ordinances (such as your own endowment, marriage, or sealing), please call the temple.',
                                         '<strong>Temple Clothing: </strong>Clothing rental available',
                                         '<strong>Dining: </strong>There are no patron dining or vending services at the Columbus Temple. Food is not permitted on temple grounds.',
                                         '<strong>Family Names: </strong>You are encouraged to use <a href="familysearch.org">FamilySearch.org</a> to share your family names with the temple, especially if you have a large number of names.',
                                         '<strong>Electronic Devices: </strong>If you choose to bring an electronic device (such as a camera, phone or tablet) into the temple, it must be turned off and stored inside a locker.',
                                         '<strong>Recommends: </strong>A Temple Recommend from your bishop and stake president is required to enter the temple. A Recommend for Living Ordinances is also needed by members being endowed or sealed to a spouse. Youth must be at least 12 years old to perform temple baptisms and must have a Limited-Use Recommend from their bishop. Males must hold the priesthood.'],
                                'website':'https://www.lds.org/temples/details/manhattan-new-york-temple?lang=eng',
                                'photo':'https://mobile-cdn.lds.org/17/a7/17a7a46cb0e9f59b3c5d9409ae7fdd8e7f3fedc1/manhattan_temple_lds.jpg'
                                }
                };
var templeInfoSp={'Philadelphia':{2018:{'Endowment':{'Martes':['6:30 pm','8:00 pm'],
                                                   'Miercoles':['10:00 am','11:30 am','6:30 pm','8:00 pm'], 
                                                   'Jueves':['6:30 pm','8:00 pm'],
                                                   'Viernes':['10:00 am','11:30 am','6:30 pm','8:00 pm'],
                                                   'Sabado':['7:00 am(Spanish 1st and 3rd Sat)','8:30 am','10:00 am', '11:30 am', '1:00 pm','2:30 pm(Spanish 2nd Sat)']},
                                      'Baptistry':{'Martes':['6:00 - 9:30 pm'],
                                                   'Miercoles':['10:30 am - 1:30 pm','6:00 - 9:30 pm'], 
                                                   'Jueves':['6:00 - 9:30 pm'],
                                                   'Viernes':['10:30 am - 1:30 pm','6:00 - 9:30 pm'],
                                                   'Sabado':['7:30 am - 4:30 pm']},
                                      'Closings':['19 de Marzo-2 de Abril(Cierre de Mantenimiento)','4 de Julio(Dia de la Independencia)','17 de Septiembre-1 de Octubre (Cierre de Mantenimiento)','6 de Octubre (Conferencia General)','21-22 de Noviembre (Dia de Accion de Gracias)','25 de Diciembre (Navidad)']
                                     },
                                'phone':'(215)-398-3040',
                                'address':['1739 Vine Street<br />Philadelphia, PA 19103','https://www.google.com/maps/place/1739+Vine+St,+Philadelphia,+PA+19103/@39.9590674,-75.1704057,17z/data=!3m1!4b1!4m5!3m4!1s0x89c6c632c60581e1:0x63c8ff5ad48bf115!8m2!3d39.9590674!4d-75.168217?q=1739+Vine+Street,+Philadelphia,+PA+19103&um=1&ie=UTF-8&sa=X&ved=0ahUKEwij5djRs6HZAhWENd8KHXTfDrUQ_AUICigB','<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.209550692896!2d-75.17040568461795!3d39.959067379420915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c632c60581e1%3A0x63c8ff5ad48bf115!2s1739+Vine+St%2C+Philadelphia%2C+PA+19103!5e0!3m2!1sen!2sus!4v1518473790164" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'],
                                'notes':['<strong>Las familias tienen prioridad</strong> en la Pila Bautismal los Viernes de 6pm a 7:30pm y los Sabado de 12pm a 1:30pm',
                                         '<strong>Reservaciones:</strong> Todas las ordenanzas vivientes y citas para los bautismos deben programarse con anticipación. Se recomiendan fuertemente las reservas para todas las investiduras por poderes. Las reservaciones de la investidura serán dadas a los que no tienen reservaciones 15 minutos antes de empezar la sesión.',
                                         '<strong>Ropa del Templo:</strong> Si necesita, la ropa del templo se puede arrendar en el templo. No hay un centro de distribución al templo de Philadelphia. Por favor visite <> en la Internet por sus necesidades de ropa.',
                                         '<strong>Comida:</strong> No hay servicios de comida en el templo de Philadelphia, pero hay muchos restaurantes cerca. La comida no se permite en el terreno del templo, incluyendo el Centro de Llegada.',
                                         '<strong>Estacionamiento:</strong> Estacionamiento en el garaje está disponible. Entre por 18th Street. Boletos deben ser validados al escritorio de recomendaciones.',
                                         '<strong>Nombres de Familia: </strong>Se le anima usar <a href="familysearch.org">FamilySearch.org</a> para compartir sus nombres de familia con el templo, especialmente si tiene muchos nombres.',
                                         '<strong>Centro de Llegado:</strong> El Centro de Llegado a lado del templo está disponible por los que esperan sus amigos y familia.',
                                         '<strong>Hijos:</strong> El Centro de Jóvenes adentro del templo es para los hijos que están esperando ser sellados a sus padres o para observar el sellamiento de sus hermanos a sus padres.',
                                         '<strong>Dispositivos Electrónicos:</strong> Si elige traer un dispositivo electrónico (tal como una camera, teléfono, o tablet) al templo, tiene que apagarlo y ponérselo adentro del armario.',
                                         '<strong>Recomendaciones:</strong> Una recomendación del templo de su obispo y presidente de estaca es necesario para entrar el templo. Una recomendación para las ordenanzas vivientes también es necesario por los miembros recibiendo las investiduras o siendo sellados a un esposo. Los juventud debe tener al menos 12 años de edad para hacer bautismos del templo y debe tener una recomendación de uso limitado de su obispo. Los varones debe poseer el sacerdocio.',
                                         '<strong>Idiomas:</strong> Inglés es disponible en todas las sesiones de investidura. Muchos idiomas, incluyendo el lenguaje de signos americano, son disponibles a pedido.<br />Las sesiones de investidura en español<ul><li>1ra y 3ra Sábado del mes: 7 am</li><li>2do y 4to Sábado del mes: 2:30pm</li></ul>'],
                                'website':'https://www.lds.org/temples/details/philadelphia-pennsylvania-temple?lang=eng',
                                'photo':'https://mobile-cdn.lds.org/59/16/5916071b741c877495e34b70b5c6443a1a732cc6/philadelphia_pennsylvania_temple_exterior.jpg'
                                },
                'Columbus':{2018:{'Endowment':{'Martes':['11:00 am','1:00 pm','6:00 pm','7:30 pm'],
                                                   'Miercoles':['9:00 am','11:00 am','1:00 pm','6:00 pm','7:30 pm'], 
                                                   'Jueves':['11:00 am','1:00 pm','6:00 pm','7:30 pm'],
                                                   'Viernes':['11:00 am','1:00 pm','6:00 pm','7:30 pm'],
                                                   'Sabado':['9:00 am','11:00 am','1:00 pm', '3:00 pm', '5:00 pm']},
                                      'Baptistry':{'Martes':['10:00 - 11:00 am','6:30 - 7:30 pm'],
                                                   'Miercoles':['10:00 - 11:00 am','6:30 - 7:30 pm'], 
                                                   'Jueves':['10:00 - 11:00 am','6:30 - 7:30 pm'],
                                                   'Viernes':['10:00 - 11:00 am','6:30 - 7:30 pm'],
                                                   'Sabado':['7:30 - 8:30 am','9:30 - 10:30 am','11:30 am - 12:30 pm','1:30 - 2:30 pm','3:30 - 4:30 pm']},
                                      'Closings':['20 de Marzo -31 de Marzo (Cierre de Mantenimiento)','4 de Julio (Dia de la Independencia)','25 de Septiembre-6 de Octubre (Cierre de Mantenimiento)','21-22 de Noviembre (Dia de Accion de Gracias)','25-26 de Diciembre (Navidad)']
                                     },
                                'phone':'(614)-351-5001',
                                'address':['3870 Gateway Blvd<br />Columbus, OH 43228-9747','https://www.google.com/maps/place/Columbus+Ohio+Temple/@39.9937324,-83.1150495,17z/data=!4m13!1m7!3m6!1s0x883891a5a2f32d5f:0xa1b2442d0db9c04d!2s3870+Gateway+Blvd,+Columbus,+OH+43228!3b1!8m2!3d39.9937283!4d-83.1128608!3m4!1s0x883891a50c45f185:0x3f1ae281f17229b0!8m2!3d39.9940836!4d-83.1132708','<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.65867843366!2d-83.11504948437536!3d39.99373238917973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883891a50c45f185%3A0x3f1ae281f17229b0!2sColumbus+Ohio+Temple!5e0!3m2!1sen!2sus!4v1518479032638" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'],
                                'notes':['<strong>Las familias tienen prioridad</strong> en la Pila Bautismal los Lunes a Viernes de 10-11am, los Viernes de 6:30-7:30pm, y los Sábados de 11:30am-12:30pm.',
                                         '<strong>Las Ordenanzas Vivientes:</strong> Para hacer una cita por las ordenanzas vivientes (tal como su propia investidura, matrimonio, o sellamiento), por favor llame el templo.',
                                         '<strong>La Ropa del Templo:</strong> No se puede arrendar la ropa del templo. No hay un Centro de Distribución cerca del templo de Columbus. Por favor visite <a href="store.lds.org">store.lds.org</a> en el internet por sus necesidades de ropa.',
                                         '<strong>Comida: </strong>No hay servicios de comida en el templo de Columbus, pero hay muchos restaurantes cerca. La comida no se permite en el terreno del templo, incluyendo el Centro de Llegada.',
                                         '<strong>Nombres de Familia: </strong>Se le anima usar <a href="familysearch.org">FamilySearch.org</a> para compartir sus nombres de familia con el templo, especialmente si tiene muchos nombres.',
                                         '<strong>Dispositivos Electrónicos:</strong> Si elige traer un dispositivo electrónico (tal como una camera, teléfono, o tablet) al templo, tiene que apagarlo y ponérselo adentro del armario.',
                                         '<strong>Recomendaciones:</strong> Una recomendación del templo de su obispo y presidente de estaca es necesario para entrar el templo. Una recomendación para las ordenanzas vivientes también es necesario por los miembros recibiendo las investiduras o siendo sellados a un esposo. Los juventud debe tener al menos 12 años de edad para hacer bautismos del templo y debe tener una recomendación de uso limitado de su obispo. Los varones debe poseer el sacerdocio.'],
                                'website':'https://www.lds.org/temples/details/columbus-ohio-temple?lang=eng',
                                'photo':'https://mobile-cdn.lds.org/bc/15/bc15b87bf1cf4aba1268814df4ef0cebc4177049/temple_exterior_columbus_ohio.jpg'
                                },
                'Manhattan':{2018:{'Endowment':{'Martes':['11:00 am','12:30 pm','2:00 pm','6:15 pm','7:45 pm'],
                                                   'Miercoles':['11:00 am','12:30 pm','2:00 pm','6:15 pm','7:45 pm'], 
                                                   'Jueves':['6:30 am','8:00 am','11:00 am','12:30 pm','2:00 pm','6:15 pm','7:45 pm(Spanish 2nd and 4th Thur)'],
                                                   'Viernes':['11:00 am','12:30 pm','2:00 pm','4:00 pm','5:30 pm','7:00 pm','8:30 pm'],
                                                   'Sabado':['6:30 am(Spanish)','8:00 am','9:30 am(Spanish)','11:00 am','12:30 pm(Spanish)','2:00 pm', '3:30 pm', '5:00 pm']},
                                      'Baptistry':{'Martes':['11:00 am - 12:00 pm','2:30 -3:30 pm','6:00 - 7:45 pm'],
                                                   'Miercoles':['11:00 am - 12:00 pm','2:30 -3:30 pm','6:00 - 7:45 pm'], 
                                                   'Jueves':['7:00 - 7:45 am','11:00 am - 12:00 pm','2:30 -3:30 pm','6:00 - 7:45 pm'],
                                                   'Viernes':['11:00 am - 12:00 pm','2:30 -3:30 pm','4:00 - 5:00 pm','6:30 - 8:30 pm'],
                                                   'Sabado':['6:30 am - 12:30 pm','1:30 - 5:00 pm']},
                                      'Closings':['31 de Marzo','4 de Julio (Dia de la Independencia)','23 de Julio - 6 de Agosto (Cierre de Mantenimiento)','6 de Octubre','21-22 de Noviembre (Dia de Accion de Gracias)']
                                     },
                                'phone':'(917)-441-8220',
                                'address':['125 Columbus Ave, Fourth Floor<br />New York, NY 10023-6514','https://www.google.com/maps/place/Manhattan+New+York+Temple/@40.7729896,-73.9902794,15z/data=!4m8!1m2!2m1!1smanhattan+temple!3m4!1s0x0:0x98e2f07a82e523fb!8m2!3d40.7729958!4d-73.9817351','<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12086.00565123261!2d-73.99027944277788!3d40.77298959794535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x98e2f07a82e523fb!2sManhattan+New+York+Temple!5e0!3m2!1sen!2sus!4v1519761863570" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'],
                                'notes':['<strong>Las Ordenanzas Vivientes:</strong> Para hacer una cita por las ordenanzas vivientes (tal como su propia investidura, matrimonio, o sellamiento), por favor llame el templo.',
                                         '<strong>La Ropa del Templo:</strong> Se puede arrendar la ropa del templo.',
                                         '<strong>Comida:</strong> No hay servicios de comida en el templo de Manhattan, pero hay muchos restaurantes cerca. La comida no se permite en el terreno del templo, incluyendo el Centro de Llegada.',
                                         '<strong>Nombres de Familia: </strong>Se le anima usar <a href="familysearch.org">FamilySearch.org</a> para compartir sus nombres de familia con el templo, especialmente si tiene muchos nombres.',
                                         '<strong>Dispositivos Electrónicos:</strong> Si elige traer un dispositivo electrónico (tal como una camera, teléfono, o tablet) al templo, tiene que apagarlo y ponérselo adentro del armario.',
                                         '<strong>Recomendaciones:</strong> Una recomendación del templo de su obispo y presidente de estaca es necesario para entrar el templo. Una recomendación para las ordenanzas vivientes también es necesario por los miembros recibiendo las investiduras o siendo sellados a un esposo. Los juventud debe tener al menos 12 años de edad para hacer bautismos del templo y debe tener una recomendación de uso limitado de su obispo. Los varones debe poseer el sacerdocio.'],
                                'website':'https://www.lds.org/temples/details/manhattan-new-york-temple?lang=eng',
                                'photo':'https://mobile-cdn.lds.org/17/a7/17a7a46cb0e9f59b3c5d9409ae7fdd8e7f3fedc1/manhattan_temple_lds.jpg'
                                }
                };

function matchDepartDate(){
    $('.trip td[data-depart-date]').removeClass('match');
    var trips=$('#trips .trip td[data-depart-date]');
    var a=new Date($('#departDate').val());
    $.each(trips,function(index,trip){
        var b=new Date($(this).attr('data-depart-date'));
        if(a.getTime()==b.getTime()){
            $(this).addClass('match');
        }
    });
}
function matchReturnDate(){
    $('.trip td[data-return-date]').removeClass('match');
    var trips=$('#trips .trip td[data-return-date]');
    var a=new Date($('#returnDate').val());
    $.each(trips,function(index,trip){
        var b=new Date($(this).attr('data-return-date'));
        if(a.getTime()==b.getTime()){
            $(this).addClass('match');
        }
    });
}
function matchTemple(){
    $('.trip td[data-temple-dest]').removeClass('match');
    var tmpls=$('#trips .trip td[data-temple-dest]');
    $.each(tmpls,function(index,temple){
        if($(this).attr('data-temple-dest')==$('#temple').val()){
            $(this).addClass('match');
        }
    });
}

function matchStake(){
    $('.trip td[data-stake]').removeClass('match');
    var stakes=$('#trips .trip td[data-stake]');
    $.each(stakes,function(index,temple){
        if($(this).attr('data-stake')==$('#stake').val()){
            $(this).addClass('match');
        }
    });
}

function getTrips(){
    $.get('/api/trips',function(data,status){
        $('#trips tr:not(.header)').remove();
        tripList=data;
        $.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure, Return, Seats, Driver, Reserve
            var stk='templeDest' in trip?trip.departStake:'';
            var tmpl='departStake' in trip?trip.templeDest:'';
            var dep=trip.dDate+(trip.dTime=='select'?'':', '+trip.dTime);
            var ret=trip.rDate+(trip.rTime=='select'?'':', '+trip.rTime);
            var seats=trip.numSeats-('passengers' in trip?trip.passengers.length:0);
            var driver=trip.driver;
            var reserveBtn=language=='en'?'Reserve':'Reservar';
            var disabled=('passengers' in trip?trip.passengers.length:0)==trip.numSeats?'disabled':'';
            if(userDetails.email==trip.email){
                disabled='disabled';
            }
            var ob='mailto:'+trip.email;
            $('#trips tr:last').after('<tr class="trip"><td data-stake="'+stk+'">'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip.dDate+'">'+dep+'</td><td data-return-date="'+trip.rDate+'">'+ret+'</td><td>'+seats+'</td><td class="driver"><a href="'+ob+'" target="_top">'+driver+'</a></td><td><input type="button" value="'+reserveBtn+'" class="reserveTrip" data-trip-id="'+index+'" '+disabled+'></td></tr>');
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
            if (switchcount === 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

$(function(){
    //get the language
    var t= window.location.pathname.substring(1);
    if(t.length==0){
      language='en';
    }else{
      language=t;
    }

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
            data.push({name:'email',value:userDetails.email});
            if(data.length==10){
                data.push({name:'splitCost',value:'off'});
            }
            console.log('sending:'+JSON.stringify(data));
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
                            //alert(response);
                            setSuccess(response+'. If you want to change anything go to the \'Edit A Ride\' tab.');
                        }else if(response.indexOf('You already have scheduled')>=0){
                            //alert(response);
                            setWarning(response)
                        }
                        console.log(response);
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        //alert(response.responseText);
                        setAlert(response.responseText);
                    }
                }
            });
        }
    });
    //update email preferences
    $('#emailSettings').submit(function(e){
        e.preventDefault();
        var data=$('#emailSettings').serializeArray();//form to array
        console.log('serialized:'+JSON.stringify(data));
        $.each($('input[type=checkbox]',this).filter(function(idx){
            return $(this).prop('checked')===false;
        }),
        function(idx,el){
            data.push({'name':$(el).attr('name'),'value':'off'})
        })
        //disabled inputs are not serialized so add now
        //data.push({name:'email',value:userDetails.email});
        /*if(data.length==10){
            data.push({name:'splitCost',value:'off'});
        }*/
        console.log('sending:'+JSON.stringify(data));
        //data.push({name:'splitCost',value:'off'});
        $.ajax({
            url:'/api/users/emailPrefs/'+userDetails.email,
            type:'post',
            data:$.param(data),
            statusCode: {
                200: function(response){
                    /*if(response=='Your ride has been posted'){
                        //clear form
                        $('#dDate').val('');
                        $('#dTime').val('select');
                        $('#rDate').val('');
                        $('#rTime').val('select');
                        $('#numSeats').val(1);
                        //alert(response);
                        setSuccess(response);
                    }else if(response.indexOf('You already have scheduled')>=0){
                        //alert(response);
                        setWarning(response)
                    }*/
                    setSuccess(response);
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    //console.log(response.responseText);
                    setAlert(response.responseText);
                }
            }
        });

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
            $('.alert').hide();
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

    //post ride tab
    $('#pr').on('click',function(){
        if(language=='sp'){
          setInfo('Verifique que el templo esta abierto en las fechas que desea visitar antes de publicar un viaje.\nTambién recuerde llamar para hacer una reservacion antemano.');
        }
        else{
          setInfo('Double check that the temple is open on the dates you\'d like to visit before posting a trip.\nAlso please remember to call to make a reservation beforehand.');
        }
    })
    
    //temple info tab
    $('#ti').on('click',function(){
        fillTempleInfo();
    });
    
    //edit ride tab
    $('#er').on('click',function(){
        fillEditInfo();
    });

    //email preferences tab
    $('#ep').on('click',function(){
        fillEmailPreferences();
    });
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
        $('#editDriverForm').attr('data-trip-id',$(this).attr('data-trip-id'));
        driverDialog.dialog( "open" );
    });
    //kick a passenger on your trip
    $('#driverPassengers').on('click','.kickFromTrip',function(){
        editTripIndex=$(this).attr('data-trip-id');
        var choice=confirm('Are you sure you want to kick this passenger from your trip? You will not have the ability to add them later.');
        if(choice){
            $.ajax({
                url:'/api/trips/'+driverList[editTripIndex]._id+'/'+tripPassengerList[$(this).attr('data-trip-passenger-id')].email,
                type:'DELETE',
                statusCode: {
                    200: function(response){
                        //remove passenger from local list
                        tripPassengerList.splice([$(this).attr('data-trip-passenger-id')],1);
                        fillDriverDialog();
                        //update table in background
                        updateTripsDrivingTable();
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        //console.log('response'+response['responseText']);
                        setAlert(response.responseText);
                    }
                }
            });
        }
    });
    //drop a seat
    $('#editingPassengerRides').on('click','.dropTrip',function(){
        var choice=confirm('Are you sure you want to leave this trip?');
        if(choice){
            $.ajax({
                url:'/api/trips/drop/'+passengerList[$(this).attr('data-trip-id')]._id+'/'+userDetails.email,
                type:'DELETE',
                statusCode: {
                    200: function(response){
                        setSuccess(response);
                        updateTripsPassengerTable();
                    },
                    500: function(response){
                        //response={'readyState','responseText','status','statusText'}
                        //console.log('response'+response['responseText']);
                        setAlert(response.responseText);
                    }
                }
            });
        }
    });
    //reserve a seat
    $('#trips').on('click','.reserveTrip',function(){
        //console.log('should reserve');

        var data=[];
        data.push({name:'email',value:userDetails.email});
        data.push({name:'name',value:userDetails.name});
        $.ajax({
            url:'/api/trips/'+tripList[$(this).attr('data-trip-id')]._id,
            type:'post',
            data:$.param(data),
            statusCode: {
                200: function(response){
                  if(response=='Your seat has been reserved'){
                    setSuccess(response);
                    if(language=='sp'){
                      setInfo('Tiene la responsibilidad de hacer su propia reservacion con el templo.\nPor favor visita la pagina de \'Editar Un Paseo\' para ver cualquier comentarios el conductor ha hecho o hara.');
                    }else{
                      setInfo('You are responsible to make your own temple reservation.\nPlease visit the \'Edit A Ride\' tab to see any comments the driver may make or has made.');
                    }
                  }
                  else{
                    setWarning(response);
                  }
                  getTrips();
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    //console.log('response'+response['responseText']);
                    setAlert(response.responseText);
                }
            }
        });
    });
    //initialize datepickers
    //edit trip datepickers
    $('#driverDepart').datepicker({minDate:0,onSelect:function(date){
        var selDate=new Date(date);
        $('#driverReturn').datepicker('option','minDate',selDate);
    }}).datepicker('setDate',new Date());
    $('#driverReturn').datepicker({minDate:0});
    //main datepickers
    $('#departDate').datepicker({minDate:0,onSelect:function(date){
        var selDate=new Date(date);
        $('#returnDate').datepicker('option','minDate',selDate);
        $('#rDate').datepicker('option','minDate',selDate);
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
        $('#rDate').datepicker('option','minDate',selDate);
    }}).datepicker('setDate',new Date());
    $('#rDate').datepicker({minDate:0}).datepicker('setDate',new Date());
    //manual change datepickers
    $('#departDate').on('keyup',function(){
        if(dateRegex.test($(this).val())){
            matchDepartDate();
        }
    });
    $('#returnDate').on('keyup',function(){
        if(dateRegex.test($(this).val())){
            matchReturnDate();
        }
    });
    //fill time selects
    for(var i=0;i<2;i++){
        var t=i===0?' am':' pm';
        $.each(hours,function(index,value){
            $('#rTime').append($('<option></option>').attr('value',value+t).text(value+t));//hours.length*i+index
            $('#dTime').append($('<option></option>').attr('value',value+t).text(value+t));
            $('#driverDTime').append($('<option></option>').attr('value',value+t).text(value+t));//hours.length*i+index
            $('#driverRTime').append($('<option></option>').attr('value',value+t).text(value+t));
        });
    }
    //email preferences checkboxes
    $('#noEmail').on('click', function() {
        if ($(this).prop('checked')) {
            $('.emailPref').prop('checked', false);
            $('#allEmail').prop('checked', false);
            $('.emailPref').prop("disabled", true);
        } else {
            $('.emailPref').prop("disabled", false);
        }
    });
    $('#allEmail').on('click', function() {
        if ($(this).prop('checked')) {
            $('.emailPref').prop('checked', true);
            $('#noEmail').prop('checked', false);
            $('.emailPref').prop("disabled", false);
        }
    });
    $('.emailPref').on('click', function() {
        var n = $(".emailPref:checked").length;
        if (n == 9) {
            $('#allEmail').prop('checked', true);
        }else if(n==0){
            $('#noEmail').prop('checked', true);
        }else{
            $('#allEmail').prop('checked', false);
        }
    });
    //close alerts
    $('.closebtn').on('click',function(){
        console.log('hit close');
        $(this).parent().hide(600);
    });
    //language select
    $('#langSelect').on('change',function(){
        console.log($(this).val())
        if($(this).val()=='en'){
            window.location.href = "https://templecarpool.com";
            language='en';
        }else if($(this).val()=='sp'){
            window.location.href = "https://templecarpool.com/sp";
            language='sp';
        }
    })
});
function setWarning(msg){
    $('.alert.warning .msg').text(msg);
    $('.alert.warning').show();
    window.scrollTo(0, 0);
}
function setSuccess(msg){
    $('.alert.success .msg').text(msg);
    $('.alert.success').show();
    window.scrollTo(0, 0);
}
function setInfo(msg){
    $('.alert.info .msg').text(msg);
    $('.alert.info').show();
    window.scrollTo(0, 0);
}
function setAlert(msg){
    $('.alert:not(.warning):not(.success):not(.info) .msg').text(msg);
    $('.alert:not(.warning):not(.success):not(.info)').show();
}
function onSignIn(googleUser) {
    profile=googleUser.getBasicProfile();
    userDetails={'name':profile.getName(),'email':profile.getEmail()};
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
    $('#'+choice).show();
    evt.currentTarget.className+=" active";
}
function fillEmailPreferences(){
    $('#userEmail').html(userDetails.email);
    $.get('/api/users/emailPrefs/'+userDetails.email,function(data,status){
        if(data.length==0){
            $('#allEmail').prop('checked',true);
            $('.emailPref').prop('checked',true);
        }else{
            $('.sentence').prop('checked',false);
            $.each( data[0], function( key, value ) {
                //alert( key + ": " + value );
                if(key!='_id' && key!='email' && value=='on'){
                    $('#'+key).prop('checked',true);
                }
            });
        }
        console.log('email pref:'+JSON.stringify(data));
    });
}
function fillTempleInfo(){
    var temple=$('#temple').val();
    $('#templeName').html('<a href="'+templeInfo[temple].website+'">'+temple+'</a>');
    $('#templeAddress').html('<a href="'+templeInfo[temple].address[1]+'">'+templeInfo[temple].address[0]+'</a>');
    $('#templeImage').attr('src',templeInfo[temple].photo);
    $('#templeMap').html(templeInfo[temple].address[2]);
    $('#templePhone').html(templeInfo[temple].phone);
    var currentYear = (new Date()).getFullYear();
    $('#templeClosings').empty();
    $('#templeNotes').empty();
    if(language=='sp'){
        var days=['Martes','Miercoles','Jueves','Viernes','Sabado'];
        $.each(days,function(index,day){
            $('#Endowment-'+day).html(templeInfoSp[temple][currentYear].Endowment[day].toString());
        });
        $.each(days,function(index,day){
            $('#Baptistry-'+day).html(templeInfoSp[temple][currentYear].Baptistry[day].toString());
        });
        $.each(templeInfoSp[temple][currentYear].Closings,function(index,closing){
            $('#templeClosings').append('<li>'+closing+'</li>');
        });
        $.each(templeInfoSp[temple].notes,function(index,note){
            $('#templeNotes').append('<p>'+note+'</p>');
        });
    }else{
        var days=['Tuesday','Wednesday','Thursday','Friday','Saturday'];
        $.each(days,function(index,day){
            $('#Endowment-'+day).html(templeInfo[temple][currentYear].Endowment[day].toString());
        });
        $.each(days,function(index,day){
            $('#Baptistry-'+day).html(templeInfo[temple][currentYear].Baptistry[day].toString());
        });
        $.each(templeInfo[temple][currentYear].Closings,function(index,closing){
            $('#templeClosings').append('<li>'+closing+'</li>');
        });
        $.each(templeInfo[temple].notes,function(index,note){
            $('#templeNotes').append('<p>'+note+'</p>');
        });
    }
}
function fillEditInfo(){
    updateTripsDrivingTable();
    updateTripsPassengerTable();
}
function updateTripsDrivingTable(){
    $.get('/api/users/driver/'+userDetails.email,function(data,status){
        $('#editingDrivingRides tr:not(.header)').remove();
        driverList=data;
        $.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure,Return,Seats,Edit
            var stk=trip.departStake;
            var tmpl=trip.templeDest;
            var dep=trip.dDate+(trip.dTime=='select'?'':', '+trip.dTime);
            var ret=trip.rDate+(trip.rTime=='select'?'':', '+trip.rTime);
            var editBtn=language=='en'?'Edit':'Editar';
            var seats=('passengers' in trip?trip.passengers.length:'0')+'/'+trip.numSeats;
            $('#editingDrivingRides tr:last').after('<tr class="trip"><td>'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip.dDate+'">'+dep+'</td><td data-return-date="'+trip.rDate+'">'+ret+'</td><td>'+seats+'</td><td><input type="button" value="'+editBtn+'" class="editTrip" data-trip-id="'+index+'"></td></tr>');
        });
        //console.log(JSON.stringify(data));
    });
}
function updateTripsPassengerTable(){
    $.get('/api/users/passenger/'+userDetails.email,function(data,status){
        $('#editingPassengerRides tr:not(.header)').remove();
        passengerList=data;
        $.each(data,function(index,trip){
            //console.log('trip '+index.toString()+':'+JSON.stringify(trip))
            //Stake,Temple,Departure,Return,driver,Edit
            var stk=trip.departStake;
            var tmpl=trip.templeDest;
            var dep=trip.dDate+(trip.dTime=='select'?'':', '+trip.dTime);
            var ret=trip.rDate+(trip.rTime=='select'?'':', '+trip.rTime);
            var driver=trip.driver;
            var email=trip.email;
            var dropBtn=language=='en'?'Drop':'Dejo';
            var split='No';
            if(trip.splitCost=='on'){
                split='Yes';
            }
            var com='';
            if(trip.commments){
                com=trip.comments;
            }
            $('#editingPassengerRides tr:last').after('<tr class="trip"><td>'+stk+'</td><td data-temple-dest="'+tmpl+'">'+tmpl+'</td><td data-depart-date="'+trip.dDate+'">'+dep+'</td><td data-return-date="'+trip.rDate+'">'+ret+'</td><td><a href="mailto:'+email+'">'+driver+'</a></td><td>'+split+'</td><td>'+com+'</td><td><input type="button" value="'+dropBtn+'" class="dropTrip" data-trip-id="'+index+'"></td></tr>');
        });
        //console.log(JSON.stringify(data));
    });
}
function fillStakeSelect(selectId){
    $(selectId).append('<optgroup label="Maryland Stakes">');
    $.each(mdStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>');
    });
    $(selectId).append('</optgroup>');
    $(selectId).append('<optgroup label="Pennsylvania Stakes">');
    $.each(paStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>');
    });
    $(selectId).append('</optgroup>');
    $(selectId).append('<optgroup label="Virginia Stakes">');
    $.each(vaStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>');
    });
    $(selectId).append('</optgroup>');
    $(selectId).append('<optgroup label="West Virginia Stakes">');
    $.each(wvStakes,function(index,stake){
        $(selectId).append('<option value="'+stake+'">'+stake+'</option>');
    });
    $(selectId).append('</optgroup>');
}
function fillTempleSelect(selectId){
    $.each(temples,function(index,temple){
        if(temple in templeInfo){
            $(selectId).append('<option value="'+temple+'">'+temple+'</option>');
        }
    });
}
function editDriverTrip(){
    var editValidator = $('#editRideForm').validate();
    if(editValidator.valid()){
        //console.log('should update')
        var data=$('#editRideForm').serializeArray();//form to array
        //update data to match names as post form
        $.each(data,function(i,param){
            if(param.name=='driverStake'){
                data[i].name='departStake';
            }else if(param.name=='driverTemple'){
                data[i].name='templeDest';
            }else if(param.name=='driverDepart'){
                data[i].name='dDate';
            }else if(param.name=='driverDTime'){
                data[i].name='dTime';
            }else if(param.name=='driverReturn'){
                data[i].name='rDate';
            }else if(param.name=='driverRTime'){
                data[i].name='rTime';
            }else if(param.name=='driverSeats'){
                data[i].name='numSeats';
            }else if(param.name=='driverSplitCost'){
                data[i].name='splitCost';
            }else if(param.name=='driverComments'){
                data[i].name='comments';
            }
        });
        console.log('updating for:'+JSON.stringify(driverList[editTripIndex]._id));
        console.log(data.length);
        if(data.length==8){
            data.push({name:'splitCost',value:'off'});
        }
        console.log('sending:'+JSON.stringify(data));
        $.ajax({
            url:'/api/trips/edit/'+driverList[editTripIndex]._id,
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
                    //alert(response);
                    setSuccess(response);
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    //alert(response.responseText);
                    setAlert(response.responseText);
                }
            }
        });
    }
    updateTripsDrivingTable();
    driverDialog.dialog( "close" );
}
function deleteTrip(){
    //console.log('deleting trip:'+$('#editDriverForm').attr('data-trip-id')+' which is '+JSON.stringify(driverList[$('#editDriverForm').attr('data-trip-id')]))
    var choice=confirm('Are you sure you want to Delete this trip?');
    if(choice){
        $.ajax({
            url:'/api/trips/'+driverList[$('#editDriverForm').attr('data-trip-id')]._id,
            type:'DELETE',
            statusCode: {
                200: function(response){
                    fillEditInfo();
                    setSuccess('Your trip has been deleted.')
                },
                500: function(response){
                    //response={'readyState','responseText','status','statusText'}
                    //console.log('response'+response['responseText']);
                    setAlert(response.responseText);
                }
            }
        });
    }
    driverDialog.dialog( "close" );
}
function fillDriverDialog(){
    console.log('should fill with:'+JSON.stringify(driverList[editTripIndex]));
    $('#driverTemple').val(driverList[editTripIndex].templeDest);
    $('#driverStake').val(driverList[editTripIndex].departStake);
    $('#driverDTime').val(driverList[editTripIndex].dTime);
    $('#driverRTime').val(driverList[editTripIndex].rTime);
    $('#driverDepart').val(driverList[editTripIndex].dDate);
    $('#driverReturn').val(driverList[editTripIndex].rDate);
    $('#driverSeats').val(driverList[editTripIndex].numSeats);
    if(driverList[editTripIndex].splitCost=='on'){
        $('#driverSplitCost').prop('checked',true);
    }
    $('#driverComments').val(driverList[editTripIndex].comments);
    if('passengers' in driverList[editTripIndex]){
        tripPassengerList=driverList[editTripIndex].passengers;
        console.log('passengers: '+JSON.stringify(tripPassengerList));
        if(tripPassengerList.length>0){
            $('#driverPassengers').show();
            $('#driverPassengers tr:not(.header)').remove();
            $.each(tripPassengerList,function(i,info){
                //console.log('trip '+i.toString()+':'+JSON.stringify(info))
                //Name,Email,Remove
                var name=info.name;
                var email=info.email;
                $('#driverPassengers tr:last').after('<tr class="trip"><td>'+name+'</td><td>'+email+'</td><td><input type="button" value="Remove" class="kickFromTrip" data-trip-id="'+editTripIndex+'" data-trip-passenger-id="'+i+'"></td></tr>');
            });
        }else{
            $('#driverPassengers').hide();
        }
    }else{
        $('#driverPassengers').hide();
    }
}