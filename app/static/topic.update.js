$(function () {
    $("form").submit(function (event) {
        event.preventDefault();
        var topicId = $("input[name='title']").attr('id');
        var topicTitle = $("input[name='title']").val();
        var topicContent = $("input[name='content']").val();

        var topicData = {
            "title": topicTitle,
            "content": topicContent
        };

        $.ajax({
            type: "PUT",
            url: "/api/topic/update/"+topicId,
            data: JSON.stringify(topicData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function ()
            {
                alert("Updated topic successfully!");
                window.location.href = "/";
            }
        });
    });
});