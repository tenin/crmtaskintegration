var taskID = window.localStorage.getItem('tskid');
var username = window.localStorage.getItem('username');
var password = window.localStorage.getItem('password');


var call = {
    username: username,
    password: password,
    status: true,
    timestamp: new Date().getTime(),
    module: "OM_WorkOrders",
    action: "view",
    record: taskID
}

var request = $.ajax({
    url: "http://demos.esrinea.com:8080/alkancrm/index.php?entryPoint=esriRestManager",
    method: "GET",
    crossdomain: true,
    datatype: 'JSON',
    data: { requeststr: btoa(JSON.stringify(call)) }
});

request.done(function (msg) {

    var result = JSON.parse(atob(msg));
    console.log(result);
    var count = 0;
    $.each(result, function (i, item) {
        if (i == "data") {
           $('#post').append('<div>' + item.name.value + "<br />" + item.date_entered.value + "<br />" + item.description.value + "<br />" + item.om_om_sites_om_workorders_1_name[0].value + '<br /><select id="myselect"></select><hr /></div>');
            $.each(item.status_c.list, function (i, item) {
                $('#myselect').append($('<option>', { value: i }).text(item));
            });
            $('#myselect').val(item.status_c.value);
        }    
        console.log(i);
        console.log(item);
        count++;
    });
});

request.fail(function (jqXHR, textStatus) {
    alert('fail');
});

$('#back').click(function () {
    window.location.href = "index.html";
    localStorage.removeItem('tskid');
});

$('#save').click(function () {
   
    var call = {
        username: username,
        password: password,
        status: true,
        timestamp: new Date().getTime(),
        module: "OM_WorkOrders",
        action: "update",
        record: taskID,
        arrayOfFields: { status_c: $('#myselect option:selected').val() }
    }

    var request = $.ajax({
        url: "http://demos.esrinea.com:8080/alkancrm/index.php?entryPoint=esriRestManager",
        method: "GET",
        crossdomain: true,
        datatype: 'JSON',
        data: { requeststr: btoa(JSON.stringify(call)) }
    });

    request.done(function (msg) {
        window.location.href = "index.html";
        localStorage.removeItem('tskid');       
    });

    request.fail(function (jqXHR, textStatus) {
        alert('fail');
    });    
});