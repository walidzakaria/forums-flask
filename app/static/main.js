
$.ajax({
    type: "GET",
    url: "/api/topic/all",
    dataType: "json",
    success: function (data) {
        $('body').append(arrayToTable(data));
    }
});

function arrayToTable(tableData) {

    $(tableData).each(function (i, rowData) {
        var row1 = $('<tr id="'+rowData.id+'"></tr>');
        var row2 = $('<tr></tr>');
        row1.append($('<td><a class="view-topic" id="'+rowData.id+'" href="topic/show/'+rowData.id+'">'+rowData.title+'</a></td>'));
        row1.append($('<td><a class="update-topic" id="'+rowData.id+'" href="topic/update/'+rowData["id"]+'">edit</a></td>'));
        row1.append($('<td><a class="delete-topic" id="'+rowData.id+'" href="#">delete</a></td>'));
        row2.append($('<div class="show-topic" id="'+rowData.id+'"></div>'));
        $('table').append(row1);
        $('table').append(row2);
    });

}

$(document).ready(function () {
    $('a').on('click', function (e) {
        e.preventDefault();
        var pageRef = $(this).attr('href');
        var topicID = $(this).attr('id');

        if (this.className == 'add-topic') {
            callAddEdit(pageRef);
        }
        else if (this.className == 'view-topic') {
            callViewTopic(pageRef, topicID);
            viewTopic(topicID);
        } else if (this.className == 'update-topic') {
            callViewTopic(pageRef, topicID);
            updateTopic(topicID);
        }
        else if (this.className == 'delete-topic') {
            deleteTopic(topicID);
            window.reload(true);
        };

    });

});

function callAddEdit(pageRefInput) {
    $.ajax({
        url: pageRefInput,
        type: "GET",
        dataType: "text",
        success: function (response) {

            $('.other-pages').html(response);
            $('.other-pages').css('background-color','lightGrey');
        }
    });
}

function callViewTopic(pageRefInput, id) {
    $.ajax({
        url: pageRefInput,
        type: "GET",
        dataType: "text",
        success: function (response) {

            $('#'+id+'.show-topic').html(response);
            $('.show-topic').css('background-color', 'lightGrey');
        },
    });
}
function viewTopic(id) {
    $.ajax({
        url: "/api/topic/show/"+id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $('h2.topic-title').text(data.title);
            $('p.topic-content').text(data.content);
            $('#'+id+'.show-topic').show(500).css({visibility: "visible"});
        }
    });
};

function updateTopic(id) {
    $.ajax({
        url: "/api/topic/show/"+id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("input[name='title']").val(data.title);
            $("input[name='content']").val(data.content);
            $('#'+id+'.show-topic').show(500).css({visibility: "visible"});
        }
    });
};


function deleteTopic(topicId) {
    $.ajax({
        type: "DELETE",
        url: "/api/topic/delete/"+topicId,
        dataType: "json",
        success: function () {
            alert("Topic deleted successfully!");
            window.location.reload();
        }
    });
};

function hideTopic() {
    $(".show-topic").hide(500).css({visibility: "hidden"});
};

$(".update-form").submit(function () {
    alert("walid");
});
