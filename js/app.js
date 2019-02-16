
$( document ).ready(function() {
    
    //Initialize Total price for activities and add to DOM.
    let $total = 0;
    $('<p>Total: </p>').appendTo('.activities'); 
    $('<p id="total-value"></p>').appendTo('.activities');

    //Hide Notifcation on page load
    $('.notification').hide(); 
    $('.cc-notification').hide(); 
    $('.cvv-notification').hide(); 
    $('.zip-notification').hide(); 

    //Default payment selection to Creditcard and hide other options
    $('#paypal').hide();
    $('#bitcoin').hide();
    $('#payment').val('credit card');
    $('[value="select_method"]').prop('disabled',true);


    //Set inital focus on the name feild 
    $('#name').focus();

    // Hide other jobs field on page load
    $('#otherJobLabel').hide();
    $('#otherJob').hide();
    
    // Hide t-shirt color selections on load
    $('#color').hide(); 
    $('#colorLabel').hide(); 
    

    //Show other job label and textfield 
    $('#title').change(function(){
       if ($(this).val() == "other") {
            $('#otherJobLabel').show();
            $('#otherJob').show();
        } else {
            $('#otherJobLabel').hide();
            $('#otherJob').hide();        
        }
    });

    // Update t-shirt colors based on selection
    $('#design').change(function(){
        $('#color').show(); 
        $('#colorLabel').show(); 
        
        if($(this).val() == "js puns"){
            $("#color").html('');
            $("#color").html("<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>");
        }else if (($(this).val() == "heart js")) {
            $("#color option").html('');
            $("#color").html("<option value='tomato'>Tomato</option><option value='steelblue'>Steel Blue</option><option value='dimgrey'>Dim Grey</option>");
        } else if (($(this).val() == "select theme")){
            $('#color').hide(); 
            $('#colorLabel').hide();  
        }
        
    });
    

    //Update payment details based on selection
    $('#payment').on('change', function() {      
        if ($(this).val() == "paypal") { 
            $('#paypal').show();
            $('#credit-card').hide();
            $('#bitcoin').hide();
        } else if ($(this).val() == "bitcoin"){
            $('#paypal').hide();
            $('#credit-card').hide();
            $('#bitcoin').show();
        } else if ($(this).val() == "credit card") {
            $('#paypal').hide();
            $('#credit-card').show();
            $('#bitcoin').hide();
        }

    });

 
    // Real-time validation 
    $('#name').on('input', function() { validateName($('#name'));});
    $('#mail').on('input', function() { validateEmail($('#mail'));});
    $('#cvv').on('input', function() { validateCVV($('#cvv'));});
    $('#zip').on('input', function() { validateZipcode($('#zip'));});
    $('#cc-num').on('input', function() { validateCreditCard($('#cc-num'));});
    $('.activities > #form-field> label > input:checkbox').on('change', function(event) { validateActivities($(this))});


    //Validate Credit Card
    function validateCreditCard(creditcard){
        if (creditcard.val() == "") {    
            showHideNotification('CreditCard Number cannot be empty', true,creditcard);
            creditcard.addClass('input-error');
            return false;
        }else if (regexCreditCard(creditcard) == false) {
            showHideNotification('Creditcard must be 13 to 16 numbers', true, creditcard);
            creditcard.addClass('input-error');
            return false;
        }else {
            showHideNotification('', false,creditcard);
            creditcard.removeClass('input-error');
            return true;
        }
    }

    //Validate CVV
    function validateCVV(CVV){
        if (CVV.val() == "") {    
            showHideNotification('CVV cannot be empty', true, CVV);
            CVV.addClass('input-error');
            return false;
        }else if (regexCVV(CVV) == false) {
            showHideNotification('CVV must be 3 numbers', true, CVV);
            CVV.addClass('input-error');
            return false;
        }else {
            showHideNotification('', false,CVV);
            CVV.removeClass('input-error');
            return true;
        }
    }

    //Validate zipcode
    function validateZipcode(zipcode){
        if (zipcode.val() == "") {    
            showHideNotification('zipcode cannot be empty', true, zipcode);
            zipcode.addClass('input-error');
            return false;
        }else if (regexZipcode(zipcode) == false) {
            showHideNotification('zipcode must be 5 numbers', true, zipcode);
            zipcode.addClass('input-error');
            return false;
        }else {
            showHideNotification('', false,zipcode);
            zipcode.removeClass('input-error');
            return true;
        }
    }

    //Validate Name
    function validateName(name){
        if (name.val() == "") {    
            showHideNotification('Name cannot be empty', true, name);
            name.addClass('input-error');
        }else if (regexName(name) == false) {
            showHideNotification('Name must be within 5 - 20 characters and cannot contain numbers', true, name);
            name.addClass('input-error');
        }else {
            showHideNotification('', false,name);
            name.removeClass('input-error');
        }
    }

    //Validate Eamil
    function validateEmail(email){
        if (email.val() == "") {
            showHideNotification('Email cannot be empty', true, email);
            email.addClass('input-error');
        }else if (regexEmail(email) == false) {
            showHideNotification('Enter a valid email address', true, email);
            email.addClass('input-error');
        }else {
            showHideNotification('', false,email);
            email.removeClass('input-error');
        }
    }

    //Validate Acitivities
    function validateActivities(element){
        if ($('.activities > #form-field> label > input:checkbox:checked').length == 0) {
            $('.activities .notification').text('You must select atleast one activity to register').show();
            $('.activities > #form-field> label > input:checkbox').removeAttr('disabled'); 
            $('.activity-notifcation').remove();          
            $total = 0;
            $('#total-value').text('$' + $total);
            $('.activities > #form-field > legend').addClass('input-error'); 
        } else {
            $('.activities > #form-field > legend').removeClass('input-error');
        if (element.prop('name') == "all" && element.is(':checked')) {
            $total = $total + 200;
           $('#total-value').text('$' + $total);       
        } else if (element.prop('name') == "all" && element.is(':checked') == false) {
            $total = $total - 200;
            $('#total-value').text('$' + $total); 
        } else if (element.prop('name') == "js-frameworks" && element.is(':checked')) {
            $total = $total + 100;
           $('[name="express"]').prop('disabled', true);
           $('.activities > #form-field > .express').append($('<span class="activity-notifcation">(Conflict Javascript frameworks)</span>'));
           $('#total-value').text('$' + $total);       
        } else if (element.prop('name') == "js-frameworks" && element.is(':checked') == false) {
            console.log($('.activities > #form-field > .express'));
            $('[name="express"]').prop('disabled', false);
            $('.activities > #form-field > .express span').remove();
            $total = $total - 100;
            $('#total-value').text('$' + $total); 
        } else if (element.prop('name') == "js-libs" && element.is(':checked')) {
            $('[name="node"]').prop('disabled', true);
            $('.activities > #form-field > .node').append($('<span class="activity-notifcation">(Conflict libraries workshop)</span>'));
            $total = $total + 100;
            $('#total-value').text('$' + $total); 
        } else if (element.prop('name') == "js-libs" && element.is(':checked') == false) {
            $('[name="node"]').prop('disabled', false);
            $('.activities > #form-field > .node span').remove();
            $total = $total - 100;
            $('#total-value').text('$' + $total); 
        } else if (element.prop('name') == "express" && element.is(':checked')) {
            $total = $total + 100;
            $('.activities > #form-field > .js-frameworks').append($('<span class="activity-notifcation">(Conflict Express workshop)</span>'));
           $('[name="js-frameworks"]').prop('disabled', true);
           $('#total-value').text('$' + $total);       
        } else if (element.prop('name') == "express" && element.is(':checked') == false) {
            $('[name="js-frameworks"]').prop('disabled', false);
            $('.activities > #form-field > .js-frameworks span').remove();
            $total = $total - 100;
            $('#total-value').text('$' + $total); 
        } else if (element.prop('name') == "node" && element.is(':checked')) {
            $('.activities > #form-field > .js-libs').append($('<span class="activity-notifcation">(Conflict Node.js workshop)</span>'));
            $total = $total + 100;
           $('[name="js-libs"]').prop('disabled', true);
           $('#total-value').text('$' + $total);       
        } else if (element.prop('name') == "node" && element.is(':checked') == false) {
            $('[name="js-libs"]').prop('disabled', false);
            $('.activities > #form-field > .js-libs span').remove();
            $total = $total - 100;
            $('#total-value').text('$' + $total); 
        } else if (element.prop('name') == "build-tools" && element.is(':checked')) {
            $total = $total + 100;
           $('#total-value').text('$' + $total);       
        } else if (element.prop('name') == "build-tools" && element.is(':checked') == false) {
            $total = $total - 100;
            $('#total-value').text('$' + $total); 
        } else if (element.prop('name') == "npm" && element.is(':checked')) {
            $total = $total + 100;
           $('#total-value').text('$' + $total);       
        } else if (element.prop('name') == "npm" && element.is(':checked') == false) {
            $total = $total - 100;
            $('#total-value').text('$' + $total); 
        } 
        $('.activities .notification').hide();
    }

    }


    // Regex functions
    function regexName(name) {return (/^[a-zA-Z]{5,20}$/.test(name.val()));}
    function regexEmail(email) {return (/[a-zA-Z]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/.test(email.val()));}
    function regexCreditCard(creditcard) {return (/^[0-9]{13,16}$/.test(creditcard.val()));}
    function regexZipcode(zipcode) {return (/^[0-9]{5}$/.test(zipcode.val()));}
    function regexCVV(CVV) {return (/^[0-9]{3}$/.test(CVV.val()));}


    //Show/Hide Error Notifications    
    function showHideNotification(message, flag, element) {
        if (flag) {
            element.next().text(message).show();
            } else {
            $(element).next().hide();  
        }
    }



    // Handling validation on submit button     
    $('#register-form').submit(function(event){

        //Prevent default refresh of the page
        event.preventDefault();
       
        
        validateName($('#name')); //Validate Name
        validateEmail($('#mail')); //Validate Email
        
        //Validate Credit Card Information
        if ($("#payment option:selected").text() == "Credit Card") {
        validateCreditCard($('#cc-num'));
        validateCVV($('#cvv'));
        validateZipcode($('#zip'));
        }

        //Vaidate Activities
        validateActivities();
    });


});


