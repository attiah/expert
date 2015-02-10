$(function () {
    $("#menu1").enhanceWithin().popup();
    $("#menu2").enhanceWithin().popup();
    $("#menu3").enhanceWithin().popup();
    $("#menu4").enhanceWithin().popup();

    $('#phone').filter_input({ regex: '[0-9]' });
    $('#username').filter_input({ regex: '[a-zA-Z ]' });
    $('#email').filter_input({ regex: '[a-zA-Z@._0-9]' });
    
});



$(document).on("pagecreate", "#Patient", function () {
    patientsend('list');
});
$(document).on("pagecreate", "#Interval", function () {
    Intervalsend('list');
});
$(document).on("pagecreate", "#Doctor", function () {
    dsend('list');
});


$(document).on("pagecreate", "#Appointment", function () {
    loadDoctor();
    loadInterVal();
    asend('list');
});

$(document).on("pagecreate", "#PSearch", function () {
    loadfile();
    lsend('list');
});

$(document).on("pagecreate", "#pAppointment", function () {

    plsend('list');
});


$(document).on("pagecreate", "#Search", function () {

    adminsend('list');
});

$(document).on("pagecreate", "#docAppointment", function () {

    docsend('list');
});
//----------------------------------
var toast = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'  data-theme='a'><h3>" + msg + "</h3></div>")
.css({ display: "block",
    opacity: 0.90,
    position: "fixed",
    padding: "7px",
    color:"#666666",
    "background-color":"#FFFFFF",
    "text-align": "center",
    width: "270px",
    left: ($(window).width() - 284) / 2,
    top: $(window).height() / 2
})
.appendTo($.mobile.pageContainer).delay(1500)
.fadeOut(500, function () {
    $(this).remove();
});
}

//------------------------
function testdata() 
{
    try {
        
        var name = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        var bdate = document.getElementById("bdate").value;
        var chks = 0;
        if(document.getElementById("chks").checked) chks=1;
        var chkp =0;
        if(document.getElementById("chkp").checked ) chkp=1;
        var chkd =0;
        if(document.getElementById("chkd").checked) chkd=1;

        if (name == "") {
            toast("please input Paitent name ");
            return;
        }
        if (email == "") {
            toast("please input Paitent email ");
            return;
        }

        if (phone == "") {
            toast("please input Paitent phone ");
            return;
        }
        if (pasword == "") {
            toast("please input Paitent password ");
            return;
        }
        if (bdate == "") {
            toast("please input patient Brithdate ");
            return;
        }
        if (phone.length != 10) {
            toast("Please input phone number in 10 numbers");
            return;
        }
        if (phone.substring(0, 2) != "05") {
            toast("input phone incorrect format and start with 05");
            return;
        }
      

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            toast("input Email incorrect format ");
            return;
        }
        
        $.ajax({
            type: "POST",
            url: "register.aspx",
            data: {  name: name, phone: phone, email: email, pass: pasword,chks:chks, chkp:chkp,chkd:chkd,bdate:bdate },
            success: OnSuccessCall,
            error: OnErrorCall
        });
    }
    catch (e) { toast(e); }

}
function OnSuccessCall(response) 
{
    
    var arr = response.split("/++/");
    alert(arr[0]);
}


function OnErrorCall(response) {
    toast(response.status + "  " + response.statusText);
}


//==================================================

//------------------------
function testLogin() {
    try {
        var id = document.getElementById("cid").value;
        var pasword = document.getElementById("cpass").value;

        if (id == "") {
            toast("please input user id ");
            return;
        }
       
        if (pasword == "") {
            toast("please input user password ");
            return;
        }
       
        $.ajax({
            type: "POST",
           url: "Login.aspx",
            data: { id: id, pass: pasword },
            success: OnSuccessLogin,
            error: OnErrorLogin
        });
    }
    catch (e) { toast(e); }

}
function OnSuccessLogin(response) {

    var arr = response.split("/++/");
    toast(arr[0]);
    var id = document.getElementById("cid").value;
    document.getElementById("userid").value = id;
    
    if (arr[1] == "1") 
    {
        document.getElementById("userlogin").value = "1";
        $.mobile.changePage("#ahome", { role: "page" });
    }
    else if (arr[1] == "2") {
       
        document.getElementById("userlogin").value = "2";
        $.mobile.changePage("#chome", { role: "page" });
    }
    else if (arr[1] == "3") {
        document.getElementById("userlogin").value = "3";
        $.mobile.changePage("#phome", { role: "page" });
    }
}


function OnErrorLogin(response) {
    toast(response.status + "  " + response.statusText);
}


//===============================================

function clearpatient() {

    document.getElementById("pid").value = "";
    document.getElementById("pname").value = "";
    document.getElementById("pemail").value = "";
    document.getElementById("pphone").value = "";
    document.getElementById("ppassword").value = "";
    document.getElementById("pbdate").value = "";
    document.getElementById("pchks").checked = false;
    document.getElementById("pchkp").checked = false;
    document.getElementById("pchkd").checked = false;

}
function addpatient() {

    var id = document.getElementById("pid").value;
    var name = document.getElementById("pname").value;
    var email = document.getElementById("pemail").value;
    var phone = document.getElementById("pphone").value;
    var pasword = document.getElementById("ppassword").value;
    var bdate = document.getElementById("pbdate").value;
    
    if (name == "") {
        toast("please input patient name ");
        return;
    }
    if (email == "") {
        toast("please input patient email ");
        return;
    }

    if (phone == "") {
        toast("please input patient phone ");
        return;
    }
    if (pasword == "") {
        toast("please input patient password ");
        return;
    }
    if (bdate == "") {
        toast("please input patient Brithdate ");
        return;
    }
    if (phone.length != 10) {
        toast("Please input phone number in 10 numbers");
        return;
    }
    if (phone.substring(0, 2) != "05") {
        toast("input phone incorrect format and start with 05");
        return;
    }
    if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
        toast("input Email incorrect format ");
        return;
    }
    patientsend('add');

}
function updatepatient() {
    var id = document.getElementById("pid").value;
    var name = document.getElementById("pname").value;
    var email = document.getElementById("pemail").value;
    var phone = document.getElementById("pphone").value;
    var pasword = document.getElementById("ppassword").value;
    var bdate = document.getElementById("pbdate").value;
    if (id == "") {
        toast("please input patient id ");
        return;
    }
    if (name == "") {
        toast("please input patient name ");
        return;
    }
    if (email == "") {
        toast("please input patient email ");
        return;
    }

    if (phone == "") {
        toast("please input patient phone ");
        return;
    }
    if (pasword == "") {
        toast("please input patient password ");
        return;
    }
    if (bdate == "") {
        toast("please input patient Brithdate ");
        return;
    }
    if (phone.length != 10) {
        toast("Please input phone number in 10 numbers");
        return;
    }
    if (phone.substring(0, 2) != "05") {
        toast("input phone incorrect format and start with 05");
        return;
    }
    if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
        toast("input Email incorrect format ");
        return;
    }
    patientsend('update');
}
function Displaypatient(id, name, phone, email, bdate,chks,chkp,chkd,password) {
    document.getElementById("pold").value = id;
    document.getElementById("pid").value = id;
    document.getElementById("pname").value = name;
    document.getElementById("pphone").value = phone;
    document.getElementById("pemail").value = email;
    document.getElementById("ppassword").value = password;
    document.getElementById("pbdate").value = bdate;
    document.getElementById("pchks").checked = false;
    document.getElementById("pchkp").checked = false;
    document.getElementById("pchkd").checked = false;

    if (chks == 1) document.getElementById("pchks").checked = true;
    if (chkp == 1) document.getElementById("pchkp").checked = true;
    if (chkd == 1) document.getElementById("pchkd").checked = true;
}
function deletepatient(id) {
    document.getElementById("pold").value = id;

    var answer = confirm('are you sure ?');
    if (answer) {
        patientsend('delete');
    }
}
function patientsend(mode) {
    try {
       
        var id = document.getElementById("pid").value;
        var name = document.getElementById("pname").value;
        var phone = document.getElementById("pphone").value;
        var email = document.getElementById("pemail").value;
        var pass = document.getElementById("ppassword").value;
        var old = document.getElementById("pold").value;
        var bdate = document.getElementById("bdate").value;
        var chks = 0;
        if (document.getElementById("chks").checked) chks = 1;
        var chkp = 0;
        if (document.getElementById("chkp").checked) chkp = 1;
        var chkd = 0;
        if (document.getElementById("chkd").checked) chkd = 1;

        $.ajax({
            type: "POST",
            url: "patient.aspx",
            data: { mode: mode, id: id, name: name, phone: phone, email: email, pass: pass, old: old,chks:chks,chkp:chkp,chkd:chkd,bdate:bdate },
            success: OnSuccesspatient,
            error: OnErrorpatient
        });
    }
    catch (e) { toast(e); }
}
function OnSuccesspatient(response) {
    try {

        var arr = response.split("/++/");
        //alert(arr[2]);
        if (arr[0] == "1") {
            toast(arr[1]);
        }
        
        var lines = arr[2].split("//");
        $('#patientdata').empty();
        for (var i = 0; i < lines.length - 1; i++) 
        {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> File Number  : ' + data[0] + '</h2><h2> Patient Name : ' + data[1] + '</h2><h2> Patient Phone : ' + data[2] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:Displaypatient(\'' + data[0] + '\',\'' + data[1] + '\',\'' + data[2] + '\',\'' + data[3] + '\',\'' + data[4] + '\',\'' + data[5] + '\',\'' + data[6] + '\',\'' + data[7] + '\',\'' + data[8] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:deletepatient(\'' + data[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#patientdata');
        }
        $('#patientdata').listview().listview('refresh');
    } catch (e) {toast(e); }
}


function OnErrorpatient(response) {
    toast(response.status + "  " + response.statusText);
}

//----------------- Interval 



//===============================================
function clearI() 
{
    
    document.getElementById("iid").value = "";
    document.getElementById("iname").value = "";
}

function addInterval() 
{

    var id = document.getElementById("iid").value;
    var name = document.getElementById("iname").value;

    if (name == "") 
    {
        toast("please input Interval name ");
        return;
    }
    Intervalsend('add');

}
function updateInterval()
 {
    var id = document.getElementById("iid").value;
    var name = document.getElementById("iname").value;
    if (id == "") {
        toast("please select  Interval id ");
        return;
    }
    if (name == "") {
        toast("please input Interval name ");
        return;
    }
    Intervalsend('update');
}
function DisplayInterval(id, name) {
   
    document.getElementById("iold").value = id;
    document.getElementById("iid").value = id;
    document.getElementById("iname").value = name;
}
function deleteInterval(id) {
    document.getElementById("iold").value=id
    var answer = confirm('are you sure ?');
    if (answer) {
        Intervalsend('delete');
    }
}
function Intervalsend(mode) 
{
    try {
        var old = document.getElementById("iold").value;
        var id = document.getElementById("iid").value;
        var name = document.getElementById("iname").value;
        $.ajax({
            type: "POST",
            url: "Interval.aspx",
            data: { mode: mode, id: id, name: name ,old:old},
            success: OnSuccessInterval,
            error: OnErrorInterval
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessInterval(response) 
{
    try {
        var arr = response.split("/++/");
        if (arr[0] == "1") {
            toast(arr[1]);
        }
        
        var lines = arr[2].split("//");
        $('#Intervaldata').empty();


        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> Interval ID : ' + data[0] + '</h2><h2> Interval Name : ' + data[1] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:DisplayInterval(\'' + data[0] + '\',\'' + data[1] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:deleteInterval(\'' + data[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#Intervaldata');
        }
        $('#Intervaldata').listview().listview('refresh');
      
    }
    catch (e) { toast(e); }
}


function OnErrorInterval(response) 
{
    toast(response.status + "  " + response.statusText);
}

//===============================================



//===============================================

function cleard() {

    document.getElementById("did").value = "";
    document.getElementById("dname").value = "";
    document.getElementById("dphone").value = "";
    document.getElementById("dpassword").value = "";


}
function addd() {

    var id = document.getElementById("did").value;
    var name = document.getElementById("dname").value;
    var phone = document.getElementById("dphone").value;
    var pasword = document.getElementById("dpassword").value;
    var note = document.getElementById("dnote").value;

    if (name == "") {
        toast("please input Doctor name ");
        return;
    }
    if (id == "") {
        toast("please input Doctor ID ");
        return;
    }

    if (phone == "") {
        toast("please input Doctor phone ");
        return;
    }
    if (pasword == "") {
        toast("please input Doctor password ");
        return;
    }
    if (phone.length != 10) {
        toast("Please input phone number in 10 numbers");
        return;
    }
    if (phone.substring(0, 2) != "05") {
        toast("input phone incorrect format and start with 05");
        return;
    }
    if (note=="") {
        toast("input Doctor description");
        return;
    }
    
    dsend('add');

}
function updated() {
    var id = document.getElementById("did").value;
    var name = document.getElementById("dname").value;
    var phone = document.getElementById("dphone").value;
    var pasword = document.getElementById("dpassword").value;
    var note = document.getElementById("dnote").value;
    if (id == "") {
        toast("please input Doctor id ");
        return;
    }
    if (name == "") {
        toast("please input Doctor name ");
        return;
    }
   

    if (phone == "") {
        toast("please input Doctor phone ");
        return;
    }
    if (pasword == "") {
        toast("please input Doctor password ");
        return;
    }
  
    if (phone.length != 10) {
        toast("Please input phone number in 10 numbers");
        return;
    }
    if (phone.substring(0, 2) != "05") {
        toast("input phone incorrect format and start with 05");
        return;
    }
    if (note == "") {
        toast("input Doctor description");
        return;
    }
    dsend('update');
}
function Displayd(id, name, phone, note, password) {
    document.getElementById("dold").value = id;
    document.getElementById("did").value = id;
    document.getElementById("dname").value = name;
    document.getElementById("dphone").value = phone;
    document.getElementById("dpassword").value = password;
    document.getElementById("dnote").value=note;
}
function deleted(id) {
    document.getElementById("dold").value = id;

    var answer = confirm('are you sure ?');
    if (answer) {
        dsend('delete');
    }
}
function dsend(mode) {
    try {

        var id = document.getElementById("did").value;
        var name = document.getElementById("dname").value;
        var phone = document.getElementById("dphone").value;
        var pass = document.getElementById("dpassword").value;
        var old = document.getElementById("dold").value;
        var note = document.getElementById("dnote").value;
        $.ajax({
            type: "POST",
            url: "doctor.aspx",
            data: { mode: mode, id: id, name: name, phone: phone,  pass: pass, old: old,note:note },
            success: OnSuccessd,
            error: OnErrord
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessd(response) {
    try {

        var arr = response.split("/++/");
        //alert(arr[2]);
        if (arr[0] == "1") {
            toast(arr[1]);
        }

        var lines = arr[2].split("//");
        $('#ddata').empty();
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> Doctor ID  : ' + data[0] + '</h2><h2> Doctor Name : ' + data[1] + '</h2><h2> Doctor Phone : ' + data[2] + '</h2><h2> Description : ' + data[3] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:Displayd(\'' + data[0] + '\',\'' + data[1] + '\',\'' + data[2] + '\',\'' + data[3] + '\',\'' + data[4] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:deleted(\'' + data[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#ddata');
        }
        $('#ddata').listview().listview('refresh');
    } catch (e) { toast(e); }
}


function OnErrord(response) {
    toast(response.status + "  " + response.statusText);
}
//=========================

//===================================
function loadDoctor() {
    try {
        var id = document.getElementById("did").value;
        var name = document.getElementById("dname").value;
        var phone = document.getElementById("dphone").value;
        var pass = document.getElementById("dpassword").value;
        var old = document.getElementById("dold").value;
        var note = document.getElementById("dnote").value;
        $.ajax({
            type: "POST",
            url: "doctor.aspx",
            data: { mode: 'list', id: id, name: name, phone: phone, pass: pass, old: old, note: note },
            success: OnSuccessload,
            error: OnErrorload
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessload(response) {
    try {

        var arr = response.split("/++/");
        if (arr[0] == "1") {
            toast(arr[1]);
        }
       
        var lines = arr[2].split("//");
        $('#cmbd').empty();

        $('#cmbd').append('<option value="0">Select Doctor</option>');
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('#cmbd').append('<option value="' + data[0] + '">' + data[1] + '</option>');
        }
        $("#cmbd").selectmenu('refresh', true);
    }
    catch (e) { toast(e); }
}


function OnErrorload(response) {
    toast(response.status + "  " + response.statusText);
}


//===================================
function loadInterVal() {
    try {
        var id = document.getElementById("iid").value;
        var name = document.getElementById("iname").value;
        var old = document.getElementById("dold").value;
     
        $.ajax({
            type: "POST",
            url: "Interval.aspx",
            data: { mode: 'list', id: id, name: name, old: old },
            success: OnSuccessiv,
            error: OnErroriv
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessiv(response) {
    try {

        var arr = response.split("/++/");
        if (arr[0] == "1") {
            toast(arr[1]);
        }

        var lines = arr[2].split("//");
        $('#cmbi').empty();

        $('#cmbi').append('<option value="0">Select Interval</option>');
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('#cmbi').append('<option value="' + data[0] + '">' + data[1] + '</option>');
        }
        $("#cmbi").selectmenu('refresh', true);
    }
    catch (e) { toast(e); }
}


function OnErroriv(response) {
    toast(response.status + "  " + response.statusText);
}



//===============================================

function cleara() {

    document.getElementById("aid").value = "";
    document.getElementById("cmbi").value = "0";
    document.getElementById("cmbd").value = "0";
    document.getElementById("ano").value = "";
    document.getElementById("adate").value = "";
}
function adda() {

    var id = document.getElementById("aid").value;
    var date = document.getElementById("adate").value;
    var dno = document.getElementById("cmbd").value;
    var ino = document.getElementById("cmbi").value;
    var no = document.getElementById("ano").value;
    if (dno == "0" || dno == "") {
        toast("please Select  Doctor  ");
        return;
    }
    if (ino == "0" || ino == "") {
        toast("please Select  Interval  ");
        return;
    }
    if (date == "") {
        toast("please select appointment Date");
        return;
    }
   

    
    if (no == "") {
        toast("please input patient Number ");
        return;
    }
    
    asend('add');

}
function updatea() {
    var id = document.getElementById("aid").value;
    var date = document.getElementById("adate").value;
    var dno = document.getElementById("cmbd").value;
    var ino = document.getElementById("cmbi").value;
    var no = document.getElementById("ano").value;
    if (date == "") {
        toast("please select appointment id");
        return;
    }

    
    if (dno == "0" || dno == "") {
        toast("please Select  Doctor  ");
        return;
    }
    if (ino == "0" || ino == "") {
        toast("please Select  Interval  ");
        return;
    }
    if (date == "") {
        toast("please select appointment Date");
        return;
    }
    if (no == "") {
        toast("please input patient Number ");
        return;
    }
    
    asend('update');
}
function Displaya(id, date, doctor, interval, no) {
  
    document.getElementById("aold").value = id;
    document.getElementById("aid").value = id;
    document.getElementById("cmbd").value = doctor;
    document.getElementById("cmbi").value = interval;
    document.getElementById("adate").value = date;
    document.getElementById("ano").value = no;
}
function deletea(id) {
    document.getElementById("aold").value = id;

    var answer = confirm('are you sure ?');
    if (answer) {
        asend('delete');
    }
}
function asend(mode) {
    try {

        var id = document.getElementById("aid").value;
        var adate = document.getElementById("adate").value;
        var dno = document.getElementById("cmbd").value;
        var ino = document.getElementById("cmbi").value;
        var ano = document.getElementById("ano").value;
        var old = document.getElementById("aold").value;
        
        $.ajax({
            type: "POST",
            url: "appointmet.aspx",
            data: { mode: mode, id: id, adate: adate, dno: dno, ino: ino, old: old, ano: ano },
            success: OnSuccessa,
            error: OnErrora
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessa(response) {
    try {

        var arr = response.split("/++/");
       
        if (arr[0] == "1") {
            toast(arr[1]);
        }
        //alert(arr[2]);
        var lines = arr[2].split("//");
        $('#adata').empty();
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> Appointment ID  : ' + data[0] + '</h2><h2> Doctor Name : ' + data[6] + '</h2><h2> Appointment Interval : ' + data[5] + '</h2><h2> Appointment Date : ' + data[1] + '</h2><h2> Patient Number  : ' + data[4] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:Displaya(\'' + data[0] + '\',\'' + data[1] + '\',\'' + data[2] + '\',\'' + data[3] + '\',\'' + data[4] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:deletea(\'' + data[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#adata');
        }
        $('#adata').listview().listview('refresh');

    } catch (e) { toast(e); }
}


function OnErrora(response) {
    toast(response.status + "  " + response.statusText);
}
//=========================

function lsend(mode) {
    try {

        var id = document.getElementById("puser").value;
        var adate = document.getElementById("pdate").value;
        var ino = document.getElementById("pinterval").value;
        var old = document.getElementById("userid").value;
        var dsc = document.getElementById("txtdes").value;
        $.ajax({
            type: "POST",
            url: "listp.aspx",
            data: { mode: mode, id: id, adate: adate, ino: ino,dsc:dsc, old: old },
            success: OnSuccessl,
            error: OnErrorl
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessl(response) {
    try {

        var arr = response.split("/++/");
        document.getElementById("txtdes").value = "";
        if (arr[0] == "1") {
            toast(arr[1]);
        }
        //alert(arr[2]);
        var lines = arr[2].split("//");
        $('#ldata').empty();
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> Appointment ID  : ' + data[0] + '</h2><h2> Doctor Name : ' + data[6] + '</h2><h2> Appointment Interval : ' + data[5] + '</h2><h2> Appointment Date : ' + data[1] + '</h2><h2> Free Number  : ' + data[4] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:Displayl(\'' + data[1] + '\',\'' + data[2] + '\',\'' + data[3] + '\')" class="ui-btn ui-btn-inline   ">Reservation</a> </div>').appendTo('#ldata');
        }
        $('#ldata').listview().listview('refresh');
        uploadObj.startUpload();
    } catch (e) { toast(e); }
}


function OnErrorl(response) {
    toast(response.status + "  " + response.statusText);
}
//=========================

function Displayl( date, doctor, interval)
 {
    document.getElementById("puser").value = doctor;
    document.getElementById("pinterval").value = interval;
    document.getElementById("pdate").value = date;
    var dsc = document.getElementById("txtdes").value;
    if (dsc == "") {
        alert("please input description");
        return;
    }
    lsend('add');
}

//================================

function plsend(mode) {
    try {

        var id = document.getElementById("puser").value;
        var adate = document.getElementById("pdate").value;
        var ino = document.getElementById("pinterval").value;
        var old = document.getElementById("userid").value;

        $.ajax({
            type: "POST",
            url: "listlp.aspx",
            data: { mode: mode, id: id, adate: adate, ino: ino, old: old },
            success: OnSuccesslp,
            error: OnErrorlp
        });
    }
    catch (e) { toast(e); }
}
function OnSuccesslp(response) {
    try {
        
        var arr = response.split("/++/");

        if (arr[0] == "1") {
            toast(arr[1]);
        }

        var lines = arr[2].split("//");
        $('#lpdata').empty();
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> Appointment ID  : ' + data[0] + '</h2><h2> Doctor Name : ' + data[6] + '</h2><h2> Appointment Interval : ' + data[5] + '</h2><h2> Appointment Date : ' + data[1] + '</h2> <h2> Decription Case   : ' + data[7] + '</h2><div class="ui-grid-b"><img src=\'myfile/' + data[8] + '\' /></div><div data-role="controlgroup" data-type="horizontal"><a href="javascript:Displaylp(\'' + data[1] + '\',\'' + data[2] + '\',\'' + data[3] + '\')" class="ui-btn ui-btn-inline   ">Cancle</a> </div>').appendTo('#lpdata');
        }
        $('#lpdata').listview().listview('refresh');
    } catch (e) { toast(e); }
}


function OnErrorlp(response) {
    toast(response.status + "  " + response.statusText);
}
//=========================

function Displaylp(date, doctor, interval) {
    document.getElementById("puser").value = doctor;
    document.getElementById("pinterval").value = interval;
    document.getElementById("pdate").value = date;
    plsend('delete');
}
//===========================================

//================================

function adminsend(mode) {
    try {

        var id = document.getElementById("puser").value;
        var adate = document.getElementById("pdate").value;
        var ino = document.getElementById("pinterval").value;
        var old = document.getElementById("adminp").value;

        $.ajax({
            type: "POST",
            url: "adminlist.aspx",
            data: { mode: mode, id: id, adate: adate, ino: ino, old: old },
            success: OnSuccessladmin,
            error: OnErrorladmin
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessladmin(response) {
    try {

        var arr = response.split("/++/");

        if (arr[0] == "1") {
            toast(arr[1]);
        }
        //alert(arr[2]);
        var lines = arr[2].split("//");
        $('#admindata').empty();
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> Appointment ID  : ' + data[0] + '</h2><h2> Doctor Name : ' + data[6] + '</h2><h2> Appointment Interval : ' + data[5] + '</h2><h2> Appointment Date : ' + data[1] + '</h2><h2> Patient Name : ' + data[4] + '</h2><h2> Description Case : ' + data[8] + '</h2> <img src=\'myfile/' + data[9] + '\' /><div data-role="controlgroup" data-type="horizontal"><a href="javascript:Displayadmin(\'' + data[1] + '\',\'' + data[2] + '\',\'' + data[3] + '\',\'' + data[7] + '\')" class="ui-btn ui-btn-inline   ">Cancle</a> </div>').appendTo('#admindata');
        }
        $('#admindata').listview().listview('refresh');
    } catch (e) { toast(e); }
}


function OnErrorladmin(response) {
    toast(response.status + "  " + response.statusText);
}
//=========================

function Displayadmin(date, doctor, interval, pid) {
   
    document.getElementById("puser").value = doctor;
    document.getElementById("pinterval").value = interval;
    document.getElementById("pdate").value = date;
    document.getElementById("adminp").value = pid;
    adminsend('delete');
}
//===========================================

function docsend(mode) {
    try {

        var id = document.getElementById("userid").value;
        var adate = document.getElementById("pdate").value;
        var ino = document.getElementById("pinterval").value;
        var old = document.getElementById("adminp").value;

        $.ajax({
            type: "POST",
            url: "doclist.aspx",
            data: { mode: mode, id: id, adate: adate, ino: ino, old: old },
            success: OnSuccessdoc,
            error: OnErrordoc
        });
    }
    catch (e) { toast(e); }
}
function OnSuccessdoc(response) {
    try {

        var arr = response.split("/++/");

        if (arr[0] == "1") {
            toast(arr[1]);
        }
        //alert(arr[2]);
        var lines = arr[2].split("//");
        $('#docdata').empty();
        for (var i = 0; i < lines.length - 1; i++) {
            var data = lines[i].split(",");
            $('<li data-icon="false">').append('<h2> Appointment ID  : ' + data[0] + '</h2><h2> Appointment Interval : ' + data[5] + '</h2><h2> Appointment Date : ' + data[1] + '</h2><h2> Patient Name : ' + data[4] + '</h2><h2> Description Case : ' + data[8] + '</h2><img src=\'myfile/' + data[9] + '\' />').appendTo('#docdata');
        }
        $('#docdata').listview().listview('refresh');
    } catch (e) { toast(e); }
}


function OnErrordoc(response) {
    toast(response.status + "  " + response.statusText);
}
//=========================

function Displaydoc(date, doctor, interval, pid) {

    document.getElementById("puser").value = doctor;
    document.getElementById("pinterval").value = interval;
    document.getElementById("pdate").value = date;
    document.getElementById("adminp").value = pid;
    docsend('delete');
}
//===========================================

function loadfile() {
    $("#mainfile").empty();
    $("#mainfile").append("<div id='fileuploader' >Upload </div>");
    showload();
}

var uploadObj;

function showload() {


    uploadObj = $("#fileuploader").uploadFile({
        url: "Upload.ashx",
        fileName: "myfile",
        dragDrop: true,
        multiple: false,
        autoSubmit: false,
        formData: {},
        dataType: 'json',
        maxFileSize: 1024 * 5120,

        onSuccess: function (files, data, xhr) {
            alert("The File is send");
        },
                dynamicFormData: function () {
                    var dno = document.getElementById("puser").value;
                    var adate = document.getElementById("pdate").value;
                    var ino = document.getElementById("pinterval").value;
                    var id = document.getElementById("userid").value;
                    var data = { adate: adate, dno: dno,ino:ino, id:id }
                    return data;
                },

        showStatusAfterSuccess: false
        //--------------
    });

}

