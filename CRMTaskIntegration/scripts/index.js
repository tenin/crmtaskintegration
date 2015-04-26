var username = window.localStorage.getItem('username');
var password = window.localStorage.getItem('password');

var call = {
    username: username,
    password: password,
    status : true,
    timestamp: new Date().getTime(),
    module : "OM_WorkOrders",
    action : "viewall"
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
            for (var i = 0; i < item.length; i++) {
                $('#post').append('<div id="' + item[i].record + '" onclick="myfunction(this.id)">' + item[i].name.value + "<br />" + item[i].date_entered.value + "<hr /></div>");
            }
        }
        
        console.log(i);
        console.log(item);
        count++;
    });
});

request.fail(function (jqXHR, textStatus) {

});

function myfunction(message) {
    window.localStorage.setItem('tskid', message);
    window.location.href = 'task.html';
}
$('#logout').click(function () {
    localStorage.clear();
    window.location.href = "Login.html";
});
