
$(document).ready(function() {
    $(".user_item").on('click', function(){
       $(".user_content_wrap").addClass("open"); 
    });
    $(".backList").on('click', function(){
       $(".user_content_wrap").removeClass("open"); 
    });
    
    $(".search_toggle").on('click', function(){
       $(".product_search_form").toggleClass("open"); 
    });

        
    $('#add_emp_form').validate({ // initialize the plugin
        rules: {
            'first_name' : 'required',
            'last_name' : 'required',
            'email' : 'required',
            'job_title' : 'required',
            'department' : 'required',
        },
        submitHandler: function(form) {

            var post_url = $('#add_emp_form').attr("action"); //get form action url
            var request_method = $('#add_emp_form').attr("method"); //get form GET/POST method
            var form_data = $('#add_emp_form').serialize(); //Encode form elements for submission
            $.ajax({
                url : post_url,
                type: request_method,
                data : form_data
            }).done(function(response){ //
                if(response.status.code == 200){
                    location.reload(); 
                }
            });
        }
    });

    $('#add_dep_form').validate({ // initialize the plugin
        rules: {
            'department_name' : 'required',
            'dep_location' : 'required',
        },
        submitHandler: function(form) {

            var post_url = $('#add_dep_form').attr("action"); //get form action url
            var request_method = $('#add_dep_form').attr("method"); //get form GET/POST method
            var form_data = $('#add_dep_form').serialize(); //Encode form elements for submission
            $.ajax({
                url : post_url,
                type: request_method,
                data : form_data
            }).done(function(response){ //
                if(response.status.code == 200){
                    location.reload(); 
                }
            });
        }
    });

    $('#edit_dep_form').validate({ // initialize the plugin
        rules: {
            'edepartment_name' : 'required',
            'edep_location' : 'required',
        },
        submitHandler: function(form) {

            var post_url = $('#edit_dep_form').attr("action"); //get form action url
            var request_method = $('#edit_dep_form').attr("method"); //get form GET/POST method
            var form_data = $('#edit_dep_form').serialize(); //Encode form elements for submission
            $.ajax({
                url : post_url,
                type: request_method,
                data : form_data
            }).done(function(response){ //
                if(response.status.code == 200){
                    location.reload(); 
                }
            });
        }
    });

    $('#add_location_form').validate({ // initialize the plugin
        rules: {
            'name' : 'required',
        },
        submitHandler: function(form) {

            var post_url = $('#add_location_form').attr("action"); //get form action url
            var request_method = $('#add_location_form').attr("method"); //get form GET/POST method
            var form_data = $('#add_location_form').serialize(); //Encode form elements for submission
            $.ajax({
                url : post_url,
                type: request_method,
                data : form_data
            }).done(function(response){ //
                if(response.status.code == 200){
                    location.reload(); 
                }
            });
        }
    });

    $('#edit_location_form').validate({ // initialize the plugin
        rules: {
            'ename' : 'required',
        },
        submitHandler: function(form) {

            var post_url = $('#edit_location_form').attr("action"); //get form action url
            var request_method = $('#edit_location_form').attr("method"); //get form GET/POST method
            var form_data = $('#edit_location_form').serialize(); //Encode form elements for submission
            $.ajax({
                url : post_url,
                type: request_method,
                data : form_data
            }).done(function(response){ //
                if(response.status.code == 200){
                    location.reload(); 
                }
            });
        }
    });

    $('#edit_emp_form').validate({ // initialize the plugin
        rules: {
            'efirst_name' : 'required',
            'elast_name' : 'required',
            'ejob_information' : 'required',
            'emp_department' : 'required',
            'eemail' : 'required',
        },
        submitHandler: function(form) {

            var post_url = $('#edit_emp_form').attr("action"); //get form action url
            var request_method = $('#edit_emp_form').attr("method"); //get form GET/POST method
            var form_data = $('#edit_emp_form').serialize(); //Encode form elements for submission
            $.ajax({
                url : post_url,
                type: request_method,
                data : form_data
            }).done(function(response){ //
                if(response.status.code == 200){
                    location.reload(); 
                }
            });
        }
    });

    $('#search_listing').validate({ // initialize the plugin
        rules: {
            'efirst_name' : 'required',
        },
        submitHandler: function(form) {

            var post_url = $('#search_listing').attr("action"); //get form action url
            var request_method = $('#search_listing').attr("method"); //get form GET/POST method
            var form_data = $('#search_listing').serialize(); //Encode form elements for submission
            $.ajax({
                url : post_url,
                type: request_method,
                dataType: 'JSON',
                data : form_data
            }).done(function(response){ //
                $('.user_list').html('');
                var a = 0;
                if(response.data.personnel){
                    $.each(response.data.personnel, function( index, value ) {
                        a = a+1;
                        if(index == 0){
                            var activeClass = 'active';
                            var fname = value.firstName;
                            var lname = value.lastName;
                            var fletter = fname.charAt(0).toUpperCase();
                            if(lname){
                                var lletter = lname.charAt(0).toUpperCase();
                            }else{
                                var lletter = '';
                            }
                            var acronym = fletter+''+lletter;
                            $('.etitlewords').html(acronym);
                            $('.ename').html(value.firstName+' '+value.lastName);
                            $('#efirst_name').val(value.firstName);
                            $('#elast_name').val(value.lastName);
                            $('#ejob_information').val(value.jobTitle);
                            $('#eemail').val(value.email);
                            $('#emp_id').val(value.id);
                            $("#edep option[value=" + value.departmentID +"]").attr("selected",true) ;
                        }else{
                            var activeClass = '';
                        }
                        var fname = value.firstName;
                        var lname = value.lastName;
                        var fletter = fname.charAt(0).toUpperCase();
                        if(lname){
                            var lletter = lname.charAt(0).toUpperCase();
                        }else{
                            var lletter = '';
                        }
                        var acronym = fletter+''+lletter;
                        $('.user_list').append('<a class="user_item common-action '+activeClass+'" data-section="edit_emp_section" data-id="'+value.id+'" data-fname="'+value.firstName+'" data-lname="'+value.lastName+'" data-job="'+value.jobTitle+'" data-email="'+value.email+'" data-dep="'+value.departmentID+'" href="javascript:void(0);"><span class="img_text bg-secondary">'+acronym+'</span><div class="info"><span class="name">'+value.firstName+' '+value.lastName+'</span><span class="user_email">'+value.email+'</span></div></a>');
                    });
                }
                if(a == 0){
                    $('.edit_emp_section').hide();
                }else{
                    $('.common-sections').hide();
                    $('.edit_emp_section').show();
                }
                $('.emp_count').html('Personnel('+a+')');
            });
        }
    });

	$.ajax({
        url: "libs/php/getPersonnel.php",
        dataType: 'JSON',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function(response) { 
            console.log('response',response.data.personnel);
            /*************** Employee *********/
            $('.user_list').html('');
            $.each(response.data.department, function( index, value ) {
              $('.emp_department').append('<option value="'+value.dep_id+'">'+value.dep_name+'</option>');
            });

            $.each(response.data.location, function( index, value ) {
              $('.dep_loc_list').append('<option value="'+value.id+'">'+value.name+'</option>');
            });
            var a = 0;
            if(response.data.personnel){
                $.each(response.data.personnel, function( index, value ) {
                    a = a+1;
                    if(index == 0){
                        var activeClass = 'active';
                        var fname = value.firstName;
                        var lname = value.lastName;
                        var fletter = fname.charAt(0).toUpperCase();
                        if(lname){
                            var lletter = lname.charAt(0).toUpperCase();
                        }else{
                            var lletter = '';
                        }
                        var acronym = fletter+''+lletter;
                        $('.etitlewords').html(acronym);
                        $('.ename').html(value.firstName+' '+value.lastName);
                        $('#efirst_name').val(value.firstName);
                        $('#elast_name').val(value.lastName);
                        $('#ejob_information').val(value.jobTitle);
                        $('#eemail').val(value.email);
                        $('#emp_id').val(value.id);
                        $("#edep option[value=" + parseInt(value.departmentID) +"]").attr("selected",true) ;
                    }else{
                        var activeClass = '';
                    }
                    var fname = value.firstName;
                    var lname = value.lastName;
                    var fletter = fname.charAt(0).toUpperCase();
                    if(lname){
                        var lletter = lname.charAt(0).toUpperCase();
                    }else{
                        var lletter = '';
                    }
                    var acronym = fletter+''+lletter;
                    //var acronym = msg.match(/\b(\w)/g).join('').toUpperCase();
                    $('.user_list').append('<a class="user_item common-action '+activeClass+'" data-section="edit_emp_section" data-id="'+value.id+'" data-fname="'+value.firstName+'" data-lname="'+value.lastName+'" data-job="'+value.jobTitle+'" data-email="'+value.email+'" data-dep="'+value.departmentID+'" href="javascript:void(0);"><span class="img_text bg-secondary">'+acronym+'</span><div class="info"><span class="name">'+value.firstName+' '+value.lastName+'</span><span class="user_email">'+value.email+'</span></div></a>');
                });
            }
            if(a == 0){
                $('.edit_emp_section').hide();
            }else{
                $('.common-sections').hide();
                $('.edit_emp_section').show();
            }
            $('.emp_count').html('Personnel('+a+')');
            /*************** Employee *********/

            /*************** Department list *********/
            $('.department_list').html('');
            $.each(response.data.department, function( index, value ) {
              $('.department_list').append('<tr><td>'+(index+1)+'.</td><td><a href="javascript:void(0);" class="per-dep" data-id="'+value.dep_id+'"><h5>'+value.dep_name+' ('+value.loc_name+')</h5></a><span class="location">'+value.loc_name+'</span></td<td class="actionBtn text-right"><a class="btn theme-btn bg-danger delete-dep" data-id="'+value.dep_id+'" href="javascript:void(0);"><i class="fa fa-trash-o"></i></a><a class="btn theme-btn editBtn ml-3 edit-dep" data-id="'+value.dep_id+'" data-name="'+value.dep_name+'" data-location="'+value.loc_id+'" href="javascript:void(0);"><i class="fa fa-pencil"></i></a></td>tr>');
            });
            /*************** Department list *********/

            /*************** Department list *********/
            $('.loc_list').html('');
            $.each(response.data.location, function( index, value ) {
              $('.loc_list').append('<tr><td>'+(index+1)+'.</td><td><h5>'+value.name+'</h5></td><td class="actionBtn text-right"><a class="btn theme-btn bg-danger delete-loc" data-id="'+value.id+'" href="javascript:void(0);"><i class="fa fa-trash-o"></i></a><a class="btn theme-btn editBtn ml-3 edit-loc" data-id="'+value.id+'" data-name="'+value.name+'" href="javascript:void(0);"><i class="fa fa-pencil"></i></a></td></tr>');
            });
            /*************** Department list *********/
        }
    });

    $(document).on('click','.per-dep',function(){
        var attrId = $(this).attr('data-id');
        $(".emp_department option[value=" + parseInt(attrId) +"]").attr("selected",true);
        $('.search_btn2').trigger('click')   
    });

    $(document).on('click','.common-action',function(){
        var attrClass = $(this).attr('data-section');   
        $('.common-sections').hide();
        $('#add_dep_form').show();
        $('#edit_dep_form').hide();
        $('#add_location_form').show();
        $('#edit_location_form').hide();
        $('#add_dep_form').hide();
        $('#add_location_form').hide();
        $('.'+attrClass+'').show(); 
        if(attrClass == 'edit_emp_section')  {
            $('.common-action').removeClass('active');
            $(this).addClass('active');
            var efName = $(this).attr('data-fname'); 
            var elName = $(this).attr('data-lname'); 
            var eJob = $(this).attr('data-job'); 
            var eEmail = $(this).attr('data-email'); 
            var eDep = $(this).attr('data-dep'); 
            var eId = $(this).attr('data-id'); 

            var fletter = efName.charAt(0).toUpperCase();
            if(elName){
                var lletter = elName.charAt(0).toUpperCase();
            }else{
                var lletter = '';
            }
            var acronym = fletter+''+lletter;
            $('.etitlewords').html(acronym);
            $('.ename').html(efName+' '+elName);
            $('#efirst_name').val(efName);
            $('#elast_name').val(elName);
            $('#ejob_information').val(eJob);
            $('#eemail').val(eEmail);
            $('#emp_id').val(eId);
            $("#edep option[value=" + eDep +"]").prop("selected",true) ;
        }
    });

    $(document).on('click','.delete-emp',function(){
        var empid = $('#emp_id').val();   
        if (confirm("Are you sure want to delete!")) {
            $.ajax({
                url: "libs/php/employeeEditDelete.php",
                dataType: 'JSON',
                data: {'action':'delete','deleteid':empid},
                success: function(response) { 
                    if(response.status.code == 200){
                        location.reload(); 
                    }
                }
            });
        } else {
            return false;
        }
    });

    $(document).on('click','.delete-dep',function(){
        var depid = $(this).attr('data-id');   
        if (confirm("Are you sure want to delete!")) {
            $.ajax({
                url: "libs/php/departmentEditDelete.php",
                dataType: 'JSON',
                data: {'action':'delete','deleteid':depid},
                success: function(response) { 
                    if(response.status.code == 200){
                        location.reload(); 
                    }
                }
            });
        } else {
            return false;
        }
    });

    $(document).on('click','.delete-loc',function(){
        var depid = $(this).attr('data-id');   
        if (confirm("Are you sure want to delete!")) {
            $.ajax({
                url: "libs/php/locationEditDelete.php",
                dataType: 'JSON',
                data: {'action':'delete','deleteid':depid},
                success: function(response) { 
                    if(response.status.code == 200){
                        location.reload(); 
                    }
                }
            });
        } else {
            return false;
        }
    });

    $(document).on('click','.edit-dep',function(){
        $('#add_dep_form').hide();
        $('#edit_dep_form').show();
        var id = $(this).attr('data-id'); 
        var name = $(this).attr('data-name'); 
        var location = $(this).attr('data-location'); 
        $('#dep_id').val(id)
        $('#edepartment_name').val(name)
        $("#edep_location option[value=" + location +"]").prop("selected",true) ;
    });
    
    $(document).on('click','.edit-loc',function(){
        $('#add_location_form').hide();
        $('#edit_location_form').show();
        var id = $(this).attr('data-id'); 
        var name = $(this).attr('data-name'); 
        $('#location_id').val(id)
        $('#ename').val(name)
    });

    $(document).on('click','.add-dep',function(){
        $('#edit_dep_form').hide();
        $('#add_dep_form').show();
    });

    $(document).on('click','.add-loc',function(){
        $('#edit_location_form').hide();
        $('#add_location_form').show();
    });

    $(document).on('click','.editProfile',function(){
        $("#efirst_name").attr("readonly", false); 
        $("#elast_name").attr("readonly", false); 
        $("#ejob_information").attr("readonly", false); 
        $("#edep").prop("disabled", false); 
        $("#eemail").attr("readonly", false); 
        $('.editProfile').hide();
        $('.updateProfile').show();
    });
});
