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
            var row = $('<tr></tr>');
            row.append($('<td><a href="javascript:showTopic('+rowData["id"]+')">'+rowData["title"]+'</a></td>'));
            row.append($('<td><a href="javascript:editTopic('+rowData["id"]+')">edit</a></td>'));
            row.append($('<td><a href="javascript:deleteTopic('+rowData["id"]+')">delete</a></td>'));
            $('table').append(row);
        });

    }
    function showTopic(topicId) {
        window.location.href = "/topic/show/"+topicId;
    };

    function editTopic(topicId) {
      //to edit a topic
        window.location.href = "/topic/update/"+topicId;
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
